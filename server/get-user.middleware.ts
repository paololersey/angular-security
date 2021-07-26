
import { NextFunction, Request, Response } from "express";
import { decodeJwt } from "./security.utils";
export function retrieveUserIdFromRequest(req: Request, res: Response, next: NextFunction) {

    // User extraction
    let jwt = req.cookies["SESSIONID"];
    console.log(req.cookies)
    if (jwt) {
        handleSessionCookie(jwt, req).then(() => {
            console.log("user retrieved successfully");
            next()
        }).catch(err => {
            console.error(err);
            next();
        })

    }
    else {
        next();
    }


}

export async function handleSessionCookie(jwt: string, req: Request) {

    try {
        const payload = await decodeJwt(jwt);
        console.log("payload=" + payload.sub)
        // store in request the user
        req["userId"] = payload.sub;
    }
    catch (err) {
        console.log("Could not extract the user from request: " + err.message);
    }

}