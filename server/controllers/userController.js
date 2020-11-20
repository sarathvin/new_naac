const db = require('../../models');
const { Crypt, Compare } = require('password-crypt');
const Secret = "naacsecret";
module.exports = {

    //add user api
    addUser: async (req, res) => {
        try {
            var data = req.body;
            var query = {}
            query.email = data.email;
            query.password = data.password;
            query.first_name = data.first_name;
            query.last_name = data.last_name;
            query.phone_number = data.phone_number;
            query.role_id = data.role_id;
           
            var UserDetials = await db.user.count({ where: { email: query.email } });
            if (UserDetials == 0) {
                const hashPwd = await Crypt(Secret, query.password);
                query.password = hashPwd
                var addUserDetials = await db.user.create(query);
                if(addUserDetials){
                    var user_id = addUserDetials.id;
                    
                    var addUserRole = await db.user_role.create({user_id, role_id: query.role_id});
                }
                res.json(200, { success: true, message: "New user is created" });
            } else {
                res.json(400, { success: false, message: "the user is already exists" });
            }
        } catch (err) {
            res.json({ error: err });
        }
    },

    listUser: async (req, res) => {
        // try {
            var totalUser = await db.user.findAll({ attributes: ["id","first_name", "last_name", "email", "phone_number"], include: [{model: db.user_role, attributes: ["role_id"]}]});
            res.json(200, { success: true, message: "Data found", result: totalUser });
        // } catch (err) {
        //     res.json({ error: err });
        // }
    },

    updateUser: async (req, res) => {
        try {
            var data = req.body;
            var userId = await db.user.findOne({ where: { id: req.params.id } });
            if (userId) {
                var query = {};
                query.password = data.password;
                query.first_name = data.first_name;
                query.last_name = data.last_name;
                query.phone = data.phone;
                query.role_id = data.role_id;
                var updateRoleDetials = await db.user.update(query, { where: { id: req.params.id }});
                res.json(200, { success: true, message: "User updated successfully" });
            } else {
                res.json(400, { success: false, message: "Invalid User id" });
            }

        } catch (err) {
            res.json({ error: err });
        }
    },

    deleteUser: async (req, res) => {
        try{
        var deletRole = await db.user.destroy({ where: { id: req.params.id } });
        if(deletRole){
            res.json(200, { success: true, message: "User id deleted successfully" });
        }else{
            res.json(400, { success: false, message: "Invalid User id" });
        }
        
        }catch(err) {
            res.json({error: err});
        }
    }

};