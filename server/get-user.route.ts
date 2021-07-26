import {Request, Response} from "express";
import {db} from "./database";

export function getUser(req:Request, res:Response) {

    //retrieve the actual user based on JWT content
    const user = db.findUserById(req["userId"]);

    if (user) {
        // not send to frontend all user info!
        //res.status(200).json(user);
        res.status(200).json({email:user.email});
    }
    else {
        res.sendStatus(204);
    }
}
