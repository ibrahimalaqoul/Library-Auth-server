'use strict';
require('dotenv').config();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET || "my secret";

const UserModel = (Sequelize,DataTypes)=> {
const User = Sequelize.define('user',{
    username:{
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    Email :{
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type : DataTypes.STRING,
        allowNull : false,
    },
    token:{
        type : DataTypes.VIRTUAL,
    },
    role : {
        type : DataTypes.ENUM('admin','libraryman','user'),
        defaultValue : 'user'
    },
    actions : {
        type : DataTypes.VIRTUAL,
        get(){
            const acl = {
                user : ['read'],
                librarryman : ['read','create','update'],
                admin : ['read','create','update','delete'],
            }
            return acl[this.role]
        }
    },
}) 
        User.authenticateBasic = async function(username,password){
            try {
               const user = await this.findOne({where : {username : username}});
               const valid = await bcrypt.compare(password,user.password);
               
               if (valid) {
                let userToken = JWT.sign({username:user.username},SECRET);
                  user.token = userToken;
                  return user;
                
               }else{
                   throw new Error('invalid password');
               }
               
            } catch (error) {
               throw new Error('invalid username',error); 
            }

        }

        User.validateToken = async function(token){

            const inputToken = JWT.verify(token,SECRET);
            const user = await this.findOne({where:{username:inputToken.username}});
            if(user){
                return user;
            }
            throw new Error('invalid Token');
        }



        return User;
}




module.exports = UserModel;