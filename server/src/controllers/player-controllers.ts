import { Request, Response } from 'express';
import Player from '../models/player-models';

export const getPlayers = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 36;
    const offset = Number(req.query.offset) || 0;

    const players = await Player.findAll({ limit, offset });

    res.json(players);
}

export const getPlayerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const player = await Player.findByPk(id);

    if (player) {
        res.json(player);
    } else {
        res.status(404).json({
            msg: `No existe un jugador con el id ${id}`
        });
    }
}

export const postPlayer = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Player.create(body);
        res.status(201).json({
            msg: 'Jugador creado exitosamente',
            body
        });
    }  catch (error) {
        console.error('Error al crear el jugador:', error);
        res.status(500).json({
            msg: 'Error al crear el jugador',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}

export const updatePlayer = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;
    const { id } = req.params;

    try {
        const player = await Player.findByPk(id);
        if (!player) {
            res.status(404).json({ msg: `No existe un jugador con el id ${id}` });
            return;
        }

        await player.update(body);

        res.json({
            msg: `Jugador con id ${id} actualizado`,
            body
        });
    } catch (error) {
        console.error('Error al actualizar el jugador:', error);
        res.status(500).json({
            msg: 'Error al actualizar el jugador',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}


export const deletePlayer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const player = await Player.findByPk(id);
    if (player) {
        await player.destroy();
        res.json({
            msg: `Jugador con id ${id} eliminado`
        });
    } else {
        res.status(404).json({
            msg: `No existe un jugador con el id ${id}`
        });
    }
}
