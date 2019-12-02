const routes = require('express').Router();
const db = require('../dao/db');
const userDao = require('../dao/userDao');
const bcrypt = require('bcryptjs');


routes.get('/user', (req, res) => {
    userDao.getAllUsers((err, result)=>{
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(result);
    });
});
 routes.get('/user/:id', (req,res) => {
    userDao.getUser(req.params.id, (err, result) => {
        res.setHeader('Content-Type','application/json');
        res.status(200);
        res.send(result);
    });
});
routes.post('/user', (req, response) => {
    const user = req.body;
    // bcrypt.hash(req.body.email, saltRounds, function (err, hash){
    userDao.addUser(user,  (err, result) => {
        if(err){
            console.log(err);
            response.status(400);
            response.send('Add User Failed!');
           
        }
        response.status(201).json(result);
    })
    // })

});
routes.put('/user/:id', (req,res) => {
    const user = req.body;
    user.userId = req.params.id;
    userDao.updateUser(user, (err, result)=>{
        if(err){
            console.log(err);
            res.status(400);
            res.send('Update User Failed!');
        }
        res.status(202);
        res.send(user);
    });
});
routes.delete('/user/:id', (req, res)=> {
    userDao.deleteUser(req.params.id, (err, result)=> {
        if(err) {
            res.status(400);
            res.send('Delete User Failed!');
        }
        res.status(204);
        res.send('Deleted user');
    });
});

module.exports = routes;
