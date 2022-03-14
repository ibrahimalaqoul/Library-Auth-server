'use strict';

const base64 = require('base-64');

module.exports = (User) => async (request, response, next) => {
    if (request.headers['authorization']) {
        let basicHeaderParts = request.headers.authorization.split(' ');
        let encodedPart = basicHeaderParts.pop();
        let decoded = base64.decode(encodedPart);
        let [username, password] = decoded.split(':');

        User.authenticateBasic(username, password).then(validUser => {
            request.user = validUser;
            next();
        })
            .catch(error => next(`invalid user ${error}`));

    }
}