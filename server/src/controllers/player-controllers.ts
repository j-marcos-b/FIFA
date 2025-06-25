import { Request, Response } from 'express';

export const getPlayers = (req: Request, res: Response) => {
    res.json({msg: 'get Player'})
}

export const getPlayerById = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({msg: `get Player by id ${id}`})
}

export const postPlayer = (req: Request, res: Response) => {
    const { body } = req;

    res.json({
        msg: 'create Player',
        body
    });
}

export const updatePlayer = (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: `update Player with id ${id}`,
        body
    });
}

export const deletePlayer = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({msg: `delete Player with id ${id}`})
}