import {Router} from 'express';
import * as quizController from '../controllers/quiz';
 
const router = Router();
router.post("/save", quizController.postSave);
router.get("/getAll", quizController.getAll);

export default router;