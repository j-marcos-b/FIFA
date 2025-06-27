import { RequestHandler } from 'express';
import Player from '../models/player-models'; // Asegúrate de que el path sea correcto

export const getPlayers: RequestHandler = async (req, res) => {
    try {
        const { limit, offset, name, club, nationality, fifaVersion } = req.query;

        let whereClause: any = {};
        if (name) {
            whereClause.long_name = { [require('sequelize').Op.like]: `%${name}%` };
        }
        if (club) {
            whereClause.club_name = { [require('sequelize').Op.like]: `%${club}%` };
        }
        if (nationality) {
            whereClause.nationality_name = { [require('sequelize').Op.like]: `%${nationality}%` };
        }
        if (fifaVersion) {
            whereClause.fifa_version = fifaVersion;
        }

        const players = await Player.findAll({
            where: whereClause,
            limit: limit ? parseInt(limit as string) : undefined,
            offset: offset ? parseInt(offset as string) : undefined
        });
        res.json(players);
    } catch (error) {
        console.error('Error al obtener jugadores:', error);
        res.status(500).json({ msg: 'Error interno del servidor al obtener jugadores' });
    }
};

export const getPlayerById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findByPk(id);
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ msg: `No existe un jugador con el id ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener jugador por ID:', error);
        res.status(500).json({ msg: 'Error interno del servidor al obtener jugador' });
    }
};

export const postPlayer: RequestHandler = async (req, res) => {
    const { body } = req;
    try {
        await Player.create(body);
        res.json({ msg: 'El jugador fue agregado con éxito' });
    } catch (error) {
        console.error('Error al agregar jugador:', error);
        res.status(500).json({ msg: 'Error interno del servidor al agregar jugador' });
    }
};

export const updatePlayer: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const player = await Player.findByPk(id);
        if (player) {
            await player.update(body);
            res.json({ msg: 'El jugador fue actualizado con éxito' });
        } else {
            res.status(404).json({ msg: `No existe un jugador con el id ${id}` });
        }
    } catch (error) {
        console.error('Error al actualizar jugador:', error);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar jugador' });
    }
};

// Nueva función para obtener la evolución del jugador
export const getPlayerEvolutionData: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        // Primero, obtenemos el nombre completo del jugador usando el ID
        const player = await Player.findByPk(id);

        if (!player) {
            res.status(404).json({ msg: `No se encontró un jugador con el ID ${id}.` });
            return;
        }

        const playerName = player.getDataValue('long_name');

        // Luego, buscamos todas las versiones del jugador con ese nombre
        const evolutionData = await Player.findAll({
            where: {
                long_name: playerName
            },
            order: [['fifa_version', 'ASC']] // Ordenar por versión FIFA
        });

        res.json(evolutionData);
    } catch (error) {
        console.error('Error al obtener la evolución del jugador:', error);
        res.status(500).json({ msg: 'Error interno del servidor al obtener la evolución del jugador.' });
    }
};
