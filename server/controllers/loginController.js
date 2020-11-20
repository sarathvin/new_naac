const db = require('../../models');
const { Crypt, Compare } = require ('password-crypt');
const jwt = require('jsonwebtoken');
const Secret = 'secretnaac';
module.exports = {
    loginUser : async (req,res) => {
        try{
        var data = req.body;
        var password = data.password;
        var email = data.email;
        var findEmail = await db.user.findOne({where: {email: email}, include: [db.user_role]});
        console.log(findEmail);
        if(!findEmail) {
            res.json({statusCode : 400, apiStatus : false, message : "invalid email"}); 
        }else {
            var userPassword = findEmail.password;
            const isValidPwd = await Compare(Secret, password, userPassword);
            // console.log(userPassword);
            if(isValidPwd==true){
                var userData = {
                    id : findEmail.id,
                    first_name: findEmail.first_name,
                    last_name: findEmail.last_name,
                    mobilenumber: findEmail.phone_number,
                    email: findEmail.email,
                    role: findEmail.role_id
                };
                var token = jwt.sign({id:userData.id, email: userData.email, role: userData.role},'naacsecure');
                res.send({statusCode:200, apiStatus: true, result: userData, Token : token});
            }else{
                res.send({statusCode:203, apiStatus:false, message:'incorrect password'})
            }
        }
    }catch(err){
        res.json(err)
    }
}

};

