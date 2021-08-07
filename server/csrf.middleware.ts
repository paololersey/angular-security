
import { NextFunction, Request, Response } from "express";

export function checkCsrfToken(req: Request, res: Response, next: NextFunction) {

    const csrfToken = req.cookies["CSRF-TOKEN"];

    const csrfHeader = req.headers["x-csrf-token"];
    // if the token jwt contains the right info 
    if(csrfToken && csrfHeader && csrfToken===csrfHeader){
        next();
    }
    // the cookie are not equal, or not valid or expried
    else{
        console.error("403 happened")
        res.sendStatus(403) // no further info for the attacker
    }
}