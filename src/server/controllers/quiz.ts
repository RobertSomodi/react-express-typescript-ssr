import * as async from "async";
import * as crypto from "crypto";
import { default as Quiz, QuizModel } from "../models/Quiz";
import {default as Question} from '../models/Question';
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import * as passport from 'passport';
import { IVerifyOptions } from "passport-local";
import * as request from "express-validator";
import * as jwt from 'jsonwebtoken';
import "../config/passport";
import QuizApi from "../../client/api/quizApi";

export let getAll = (req: Request, res: Response, next: NextFunction) => {
    Quiz.find({}, function(err, quizzes) {
        let response = quizzes.map(quiz => {
            return {
                id: quiz.id,
                name: quiz.name,
                activeDate: quiz.activeDate,
                community: quiz.community,
                questions: quiz.questions,
            }
        });
        return res.send(JSON.stringify(response));
    })
};

export let postSave = (req: Request, res: Response, next: NextFunction) => {
    req.assert("name", "Name cannot be blank").notEmpty();
  
    const errors = req.validationErrors();
  
    if (errors) {
      req.flash("errors", errors);
      return res.redirect("/");
    }

    const quiz = new Quiz({
        name: req.body.name,
        activeDate: req.body.activeDate,
        community: req.body.community,
        questions: req.body.questions
    });
    
    Quiz.findOne({ activeDate: quiz.activeDate, community:quiz.community }, (err, existingQuiz) => {
        if (err) { return next(err); }
        if(existingQuiz){
            req.flash("errors", { msg: "Quiz already exists for selected date" });
            return res.redirect("/");
        }

        quiz.save((err) => {
            if (err) { return next(err); }
            res.send(JSON.stringify(quiz));
        });
    });
};
