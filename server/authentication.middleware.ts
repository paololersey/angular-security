import {Request, Response, NextFunction} from 'express';


export function checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {

    if (req['user']) {
        console.log("payload check authentication = " + req['user'])
        next();
    }
    else {
        res.sendStatus(403);
    }


}


