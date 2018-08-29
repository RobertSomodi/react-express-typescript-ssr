import * as mongoose from "mongoose";
import * as types from '../types/model';

export type QuestionModel = mongoose.Document & types.Question;

const questionSchema = new mongoose.Schema({
  question: String,
  time: Number,
  choices: Array,
  answerId: Number
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);
export default Question;
