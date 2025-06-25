import { Router } from "express";
import { deletePlayer, getPlayerById, getPlayers, postPlayer, updatePlayer } from "../controllers/player-controllers";

const router = Router();

router.get('/', getPlayers)
router.get('/:id', getPlayerById)
router.delete('/:id', deletePlayer)
router.post('/', postPlayer)
router.put('/:id', updatePlayer) 

export default router;