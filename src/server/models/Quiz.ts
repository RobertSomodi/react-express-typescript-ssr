import * as mongoose from "mongoose";
import * as types from '../types/model';
import {default as Question, QuestionModel} from './Question';
import {default as Community, CommunityModel} from './Community';

export type QuizModel = mongoose.Document & types.Quiz;

const quizSchema = new mongoose.Schema({
  name: String,
  activeDate: String,
  community: mongoose.Schema.Types.ObjectId,
  questions: [Question]
  },  { timestamps: true });


const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
