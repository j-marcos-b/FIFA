import { Router } from "express";
import { deletePlayer, getPlayerById, getPlayers, postPlayer } from "../controllers/player-controllers";

const router = Router();

router.get('/', getPlayers)
router.get('/:id', getPlayerById)
router.delete('/:id', deletePlayer)
router.post('/', postPlayer)
router.put('/:id', postPlayer) 

export default router;