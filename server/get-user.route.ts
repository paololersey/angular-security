import {Request, Response} from "express";
import {db} from "./database";

export function getUser(req:Request, res:Response) {

    //TODO retrieve the actual user based on JWT content
    const user = db.findUserById(req["userId"]);

    if (user) {
        res.status(200).json(user);
    }
    else {
        res.sendStatus(204);
    }
}
