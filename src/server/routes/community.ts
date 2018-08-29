import {Router} from 'express';
import * as communityController from '../controllers/community';
 
const router = Router();
router.post("/save", communityController.postSave);
router.get("/getAll", communityController.getAll);

export default router;