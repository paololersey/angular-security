
import { NextFunction, Request, Response } from "express";

export function checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {

    // if the token jwt contains the right info 
    if(req['userId']){
        next();
    }
    // the cookie was not present, or not valid or expried
    else{
        console.log("403 happened")
        res.sendStatus(403) // no further info for the attacker
    }
}