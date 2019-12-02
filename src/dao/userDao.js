// const db = require('./db');
// const bcrypt = require('bcryptjs')
// exports.getAllUsers = (cb) => {
//     db.query("select * from utopia.user",
//              (err, res) => cb(err, res));
// };
// exports.getUser = (userId, cb) => {
//     db.query("select * FROM utopia.user where userId = ?",
//              [userId],
//              (err, res) => cb(err, res));
// };
// exports.addUser = (user, cb) => {
//     console.log("EMAIL HAS BEEN ENCRPYTED");
//     bcrypt.hash(user.password, 10, function(err, hash){
//         if(err) console.log(err || "error has occoured");
//         user.password = hash;
//     db.beginTransaction((err) => {
//         console.log("TRANSACTION HAS BEGUN")
//         if(err) cb(err, null);
//         db.query('insert into utopia.user(userFirstName,userLastName, cardNumber, address, phone, email, password) values (?,?,?,?,?,?,?)',
//                  [user.userFirstName, user.userLastName, user.cardNumber,user.address, user.phone, user.email, user.password],
//                  (err, res)=> {
//                      if(err){ throw error;
//                          console.log("ROLLING BACK.....")
//                          db.rollback((err, res)=>cb(err,res));
//                      }
//                      console.log("COMMTING.....")
//                      db.commit((err,res)=> cb(err, res));
//                      console.log("COMMITED ERROR, OR RESOLVE");
//                  }
//                 )
//         }
//     )
//     })
// }


// exports.updateUser = (user, cb) => {
//     console.log(user);
//     db.beginTransaction((err) => {
//         if(err) cb(err, null);
//         db.query('UPDATE utopia.user SET userFirstName = (?), userLastName = (?), cardNumber = (?), address = (?), phone = (?), email  = (?) WHERE userId = (?) ',
//                  [user.userFirstName, user.userLastName, user.cardNumber, user.address, user.phone, user.email, user.userId],
//                  (err, res)=> {
//                      if(err){
//                          db.rollback((err,res)=>cb(err,res));
//                      }
//                      db.commit((err,res)=> cb(err, res));
//                  });
//     });
// };
// exports.deleteUser = (userId, cb) => {
//     db.beginTransaction((err) => {
//         if(err) cb(err, null);
//         db.query('DELETE from utopia.user where userId = (?)',
//                  [userId],
//                  (err, res) => {
//                      if(err){
//                          db.rollback((err, res)=>cb(err,res));
//                      }
//                      db.commit((err,res)=> cb(err, res));
//                  });
//     });
// };
