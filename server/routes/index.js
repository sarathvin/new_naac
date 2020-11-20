const Controller = require("../controllers");
const Authorization = require("../policies");
module.exports = (app) => {
//Role API    

app.post('/v1/addRole', Authorization.isAdmin, Controller.role.addRole);

app.get('/v1/listRole', Authorization.isAdmin, Controller.role.listRole);

app.put('/v1/updateRole/:id', Authorization.isAdmin, Controller.role.updateRole);

app.delete('/v1/deleteRole/:id', Authorization.isAdmin, Controller.role.deleteRole);

//User API

app.post('/v1/addUser', Controller.user.addUser);

app.get('/v1/listUser', Controller.user.listUser);

app.put('/v1/updateUser/:id', Controller.user.updateUser);

app.delete('/v1/deleteUser/:id',Controller.user.deleteUser);

//login API

app.post('/v1/loginUser', Controller.login.loginUser);



};