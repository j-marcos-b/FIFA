import { Router } from "express";
import { getPlayerById, getPlayers, postPlayer, updatePlayer } from "../controllers/player-controllers";

const router = Router();

router.get('/', getPlayers)
router.get('/:id', getPlayerById)
router.post('/', postPlayer)
router.put('/:id', updatePlayer) 

export default router;