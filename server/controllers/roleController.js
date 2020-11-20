const Role = require('../../models').role;
module.exports = {

    addRole: async (req, res) => {
        try {
            var data = req.body;
            var roleDetials = await Role.count({ where: { name: data.name } });
            if (roleDetials == 0) {
                var addRoleDetials = await Role.create({ name: data.name });
                // console.log(addRoleDetials);
                res.json(200, { success: true, message: "Role is created"});
            } else {
                res.json({ success: false, message: "Role is already exists" });
            }
        } catch (err) {
            res.json({ error: err });
        }
    },
    listRole: async (req, res) => {
        try {
            var totalRole = await Role.findAll({
                attributes: ['id', 'name']
            }
            );

            // console.log(totalRole);
            res.json(200, { success: true, message: "Data found", result: totalRole });
        } catch (err) {
            res.json({ error: err });
        }
    },
    updateRole: async (req, res) => {
        try {
            var data = req.body;
            var roleId = await Role.findOne({ where: { id: req.params.id } });
            if (roleId) {
                var updateRoleDetials = await Role.update({ name: data.name }, { where: { id: req.params.id } });
                res.json(200, { success: true, message: "Role updated successfully" });
            } else {
                res.json(400, { success: false, message: "Invalid role id" });
            }

        } catch (err) {
            res.json({ error: err });
        }
    },
    deleteRole: async (req, res) => {
        try{
        var data = req.params;
        // var delete_user_role = await User_role.destroy({where: {role_id: data.id}});
        var deletRole = await Role.destroy({ where: { id: req.params.id } });
        if(deletRole){
         res.json(200, { success: true, message: "Role id deleted successfully" });
        }else{
            res.json(400, { success: false, message: "Invalid role id" }); 
        }
        }catch(err) {
            res.json({error: err});
        }
    }
};