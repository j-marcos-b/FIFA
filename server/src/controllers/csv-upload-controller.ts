import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { parse } from 'fast-csv';
import db from '../db/connection';
import { QueryTypes } from 'sequelize';

const BATCH_SIZE = 1000; // Tamaño del lote para inserción

const COLUMN_ALIASES: { [key: string]: string } = {
  'id': 'player_id',
  'player_face_url': 'player_url'
};

export const uploadCsv = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ msg: 'No se ha subido ningún archivo' });
    return;
  }

  const fileRows: any[] = [];
  const filePath = path.resolve(req.file.path);

  let headersValidated = false;
  let headers: string[] = [];

  const stream = fs.createReadStream(filePath);

  const csvStream = parse({ headers: true, ignoreEmpty: true })
    .on('error', error => {
      console.error('Error al leer CSV:', error);
      res.status(500).json({ msg: 'Error al procesar el archivo CSV' });
      return;
    })
    .on('data', (row) => {
      if (!headersValidated) {
        headers = Object.keys(row);

        // Aplicar alias a los headers
        headers = headers.map(h => COLUMN_ALIASES[h] || h);

        // Validar que al menos player_id y player_url estén presentes
        if (!headers.includes('player_id') || !headers.includes('player_url')) {
          csvStream.destroy();
          fs.unlinkSync(filePath);
          res.status(400).json({ msg: 'Faltan columnas requeridas: player_id o player_url' });
          return;
        }
        headersValidated = true;
      }

      // Aplicar alias a las claves del row
      const mappedRow: any = {};
      Object.keys(row).forEach(key => {
        const mappedKey = COLUMN_ALIASES[key] || key;
        mappedRow[mappedKey] = row[key];
      });

      // Convertir valores vacíos a null y convertir 'Yes'/'No' a booleanos para real_face
      Object.keys(mappedRow).forEach(key => {
        if (mappedRow[key] === '' || mappedRow[key] === undefined) {
          mappedRow[key] = null;
        }
        if (key === 'real_face') {
          if (mappedRow[key] === 'Yes') {
            mappedRow[key] = 1;
          } else if (mappedRow[key] === 'No') {
            mappedRow[key] = 0;
          }
        }
      });

      fileRows.push(mappedRow);

      if (fileRows.length >= BATCH_SIZE) {
        csvStream.pause();
        insertBatch(fileRows.splice(0, BATCH_SIZE))
          .then(() => csvStream.resume())
          .catch(err => {
            console.error('Error al insertar lote:', err);
            csvStream.destroy();
            fs.unlinkSync(filePath);
            res.status(500).json({ msg: 'Error al insertar datos en la base de datos' });
            return;
          });
      }
    })
    .on('end', async () => {
      try {
        if (fileRows.length > 0) {
          await insertBatch(fileRows);
        }
        fs.unlinkSync(filePath);
        res.json({ msg: 'Archivo CSV cargado correctamente' });
      } catch (err) {
        console.error('Error al insertar lote final:', err);
        res.status(500).json({ msg: 'Error al insertar datos en la base de datos' });
      }
    });

  stream.pipe(csvStream);
};

async function insertBatch(rows: any[]) {
  if (rows.length === 0) return;

  // Construir query de inserción masiva con Sequelize
  // Usamos query raw para mayor control y rendimiento
  const columns = Object.keys(rows[0]);
  const values = rows.map(row => columns.map(col => row[col]));

  // Construir placeholders para cada fila
  const placeholders = values.map(
    (_, i) => `(${columns.map((_, j) => `?`).join(', ')})`
  ).join(', ');

  // Aplanar valores para query
  const flatValues = values.flat();

  const query = `
    INSERT INTO fifa_players_db.players_staging (${columns.join(', ')})
    VALUES ${placeholders}
    ON DUPLICATE KEY UPDATE
    ${columns.map(col => `${col} = VALUES(${col})`).join(', ')}
  `;

  await db.query(query, {
    replacements: flatValues,
    type: QueryTypes.INSERT
  });
}
