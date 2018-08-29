import * as mongoose from "mongoose";
import * as types from '../types/model';
import {default as Question, QuestionModel} from './Question';
import {default as Community, CommunityModel} from './Community';

export type QuizModel = mongoose.Document & types.Quiz;

const quizSchema = new mongoose.Schema({
  name: String,
  activeDate: String,
  community: mongoose.Schema.Types.ObjectId
//   community: {type: mongoose.Schema.Types.ObjectId, ref: 'Community'},
//   questions: [Question]
  },  { timestamps: true });


// quizSchema.pre("save", function save(next) {
//     const quiz = this;

//     Community.findOne({ id: quiz.community }, (err, community) => {
//         if (err) { return next(err); }
//         quiz.community = community
//         next();
//     });
// });

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
