const pgp = require("pg-promise")(/*options*/);
require('dotenv').config();

var dbHOST = process.env.NODE_ENV !== 'production'? process.env.DB_SERVER_HOST:process.env.DB_DOCKER_HOST;
var dbPORT = process.env.NODE_ENV !== 'production'? process.env.DB_SERVER_PORT:process.env.DB_DOCKER_PORT;
const connetion = `postgres://postgres:password@${dbHOST}:${dbPORT}/db`
console.log(connetion)
const DBconnect = pgp(connetion);

DBconnect.connect()
  .then(obj =>{
    const serverVersion = obj.client.serverVersion;
    console.log(serverVersion + " Connect Success");
    obj.done();
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });
module.exports = DBconnect;