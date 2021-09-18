import {Request, Response, NextFunction} from 'express';
import { intersection } from 'lodash';


export function checkIfAuthorized(allowedRoles: string[], req: Request, res: Response, next: NextFunction) {

    const payload = req['user'];
    console.log("jwt payload authorization = " + payload)
    const roles = intersection(payload.roles, allowedRoles);

    if(roles.length>0){
        next();
    }
    else{
        res.sendStatus(403);
    }


}


