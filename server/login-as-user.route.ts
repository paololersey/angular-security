import { db } from "./database";
import { createSessionToken } from "./security.utils";

export function loginAsUser(req, res) {

    // fake response
    /*res.status(200).json({
        id:1,
        email: "temp@gmail.com",
        roles:["STUDENT"]
    })*/

    const impersonatedUserEmail = req.body.email;

    const impersonatedUser = db.findUserByEmail(impersonatedUserEmail);

    createSessionToken(impersonatedUser).then(token => {
        res.cookie("SESSIONID", token, { httpOnly: true, secure: true });
        res.status(200).json({
            id: impersonatedUser.id,
            email: impersonatedUser.email,
            roles: impersonatedUser.roles
        });
    }

    ).catch(err => {
        console.log("Error tryying to login as a user", err);
        res.sendStatus(500);
    });

}