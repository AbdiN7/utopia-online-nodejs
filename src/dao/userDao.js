const db = require('./db');

exports.getAllUsers = (cb) => {
    db.query("select * from utopia.user",
             (err, res) => cb(err, res));
};
exports.getUser = (userId, cb) => {
    db.query("select * FROM utopia.user where userId = ?",
             [userId],
             (err, res) => cb(err, res));
};
exports.addUser = (user, cb) => {
    db.beginTransaction((err) => {
        if(err) cb(err, null);
        db.query('insert into utopia.user(userFirstName,userLastName, cardNumber, address, phone, email) values (?,?,?,?,?,?)',
                 [user.userFirstName, user.userLastName, user.cardNumber,user.address, user.phone, user.email],
                 (err, res)=> {
                     if(err){
                         db.rollback((err, res)=>cb(err,res));
                     }
                     db.commit((err,res)=> cb(err, res));
                 });
    });
};

exports.updateUser = (user, cb) => {
    console.log(user);
    db.beginTransaction((err) => {
        if(err) cb(err, null);
        db.query('UPDATE utopia.user SET userFirstName = (?), userLastName = (?), cardNumber = (?), address = (?), phone = (?), email  = (?) WHERE userId = (?) ',
                 [user.userFirstName, user.userLastName, user.cardNumber, user.address, user.phone, user.email, user.userId],
                 (err, res)=> {
                     if(err){
                         db.rollback((err,res)=>cb(err,res));
                     }
                     db.commit((err,res)=> cb(err, res));
                 });
    });
};
exports.deleteUser = (userId, cb) => {
    db.beginTransaction((err) => {
        if(err) cb(err, null);
        db.query('DELETE from utopia.user where userId = (?)',
                 [userId],
                 (err, res) => {
                     if(err){
                         db.rollback((err, res)=>cb(err,res));
                     }
                     db.commit((err,res)=> cb(err, res));
                 });
    });
};
