'use strict';


module.exports = (User) => async(request,response,next) => {
if(request.headers['authorization']){
    let bearerHeaderParts = request.headers.authorization.split(' ');
    let token = bearerHeaderParts.pop();

    User.validateToken(token).then(user => {
        request.user = user;
        next();
    })
    .catch(error => next(`invalid user ${error}`));
}
} 