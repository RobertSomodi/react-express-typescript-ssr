import * as async from "async";
import * as crypto from "crypto";
import { default as User, UserModel } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import * as passport from 'passport';
import { IVerifyOptions } from "passport-local";
import * as request from "express-validator";
import * as jwt from 'jsonwebtoken';
import "../config/passport";

export let postLogin = (req: Request, res: Response, next: NextFunction) => {
    req.assert("email", "Email is not valid").isEmail();
    req.assert("password", "Password cannot be blank").notEmpty();
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
  
    const errors = req.validationErrors();
  
    if (errors) {
      req.flash("errors", errors);
      return res.redirect("/");
    }
  
    passport.authenticate("local", (err: Error, user: UserModel, info: IVerifyOptions) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash("errors", info.message);
        // return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
             return next(err); 
        }

        const token = jwt.sign(user.toJSON(), 'some secret');
                let responseJson = {
                        id: user._id,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        email: user.email,
                        jwt: token,
                        role: user.role
                };
        res.send(JSON.stringify(responseJson));
      });
    })(req, res, next);
};

export let postSignup = (req: Request, res: Response, next: NextFunction) => {

    req.assert("email", "Email is not valid").isEmail();
    req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    
    const errors = req.validationErrors();

    if (errors) {
        req.flash("errors", errors);
        return res.redirect("/");
    }

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: 'guest'
        });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
      
        if (err) { return next(err); }
        if(existingUser){
            req.flash("errors", { msg: "Account with that email address already exists." });
            return res.redirect("/");
        }
        user.save((err) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                const token = jwt.sign(user.toJSON(), 'some secret');
                let responseJson = {
                        id: user._id,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        email: user.email,
                        jwt: token,
                        isAuthenticated: true,
                        role: user.role
                };
                res.send(JSON.stringify(responseJson));
            });
        });
    });
}
