import {Router} from 'express';
import * as quizController from '../controllers/quiz';
 
const router = Router();
router.post("/save", quizController.postSave);

export default router;