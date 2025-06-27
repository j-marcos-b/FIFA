import { Router } from "express";
import { getPlayerById, getPlayers, postPlayer, updatePlayer, getPlayerEvolutionData } from "../controllers/player-controllers";

// Tipamos explícitamente 'router' como 'Router' de Express
const router: Router = Router();

router.get('/', getPlayers);
router.get('/:id', getPlayerById);
router.post('/', postPlayer);
router.put('/:id', updatePlayer);
router.get('/:id/evolution', getPlayerEvolutionData); // Esta línea debería funcionar correctamente

export default router;
