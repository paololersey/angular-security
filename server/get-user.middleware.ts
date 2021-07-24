

import { Request, Response, NextFunction } from "express";
import { decodeJwt } from "./security.utils";
export function retrieveUserIdFromRequest(req: Request, res: Response) {

    let jwt = req.cookies("SESSIONID");

    if (jwt) {
        handleSessionCookie(jwt, req).then(() =>  console.log("success")).catch(err => {
            console.error(err);
            // next()
        })

    }
    else {
         // next()
    }

}

export async function handleSessionCookie(jwt: string, req: Request) {

    try {
        const payload = await decodeJwt(jwt);
        req["userId"] = payload.sub;
    }
    catch (err) {
        console.log("Could not extract the user: " + err.message);
    }

}