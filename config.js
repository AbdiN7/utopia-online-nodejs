// module.exports = {
//     development: {
//         app: process.env.APP,
//         port: process.env.PORT || 5000,
//         saltingRounds: 10,
//         db_dialect: process.env.DB_DIALECT,
//         db_host:  process.env.DB_HOST,
//         db_port: process.env.DB_PORT,
//         db_name: process.env.DB_USER,
//         db_user: process.env.DB_USER,
//         db_password: process.env.DB_PASSWORD,
//         jwt_encryption: process.env.JWT_ENCRYPTION,
//         jwt_expiration: process.env.JWT_EXPIRATION
//     }
// }
require('dotenv').config();//instatiate environment variables
let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP
CONFIG.port         = process.env.PORT || 5000

CONFIG.db_dialect   = process.env.DB_DIALECT
CONFIG.db_host      = process.env.DB_HOST
CONFIG.db_port      = process.env.DB_PORT
CONFIG.db_name      = process.env.DB_NAME
CONFIG.db_user      = process.env.DB_USER
CONFIG.db_password  = process.env.DB_PASSWORD

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION

module.exports = CONFIG;