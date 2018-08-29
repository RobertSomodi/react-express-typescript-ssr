import * as async from "async";
import * as crypto from "crypto";
import { default as Community, CommunityModel } from "../models/Community";
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import * as passport from 'passport';
import { IVerifyOptions } from "passport-local";
import * as request from "express-validator";
import * as jwt from 'jsonwebtoken';
import "../config/passport";

export let getAll = (req: Request, res: Response, next: NextFunction) => {
    Community.find({}, function(err, communities) {
        let response = communities.map(community => {
            return {
                name: community.name,
                id: community.id
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

    const community = new Community({
        name: req.body.name
    });
    Community.findOne({ name: community.name}, (err, existingCommunity) => {
        if (err) { return next(err); }
        if(existingCommunity){
            req.flash("errors", { msg: "Community already exists" });
            return res.redirect("/");
        }

        community.save((err) => {
            if (err) { return next(err); }
            res.send(JSON.stringify(community));
        });
    });
};