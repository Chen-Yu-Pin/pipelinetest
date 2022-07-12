var express = require('express');
var router = express.Router();
const DBconnect = require("../DBconnect");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/hello",function(req,res,next){
  res.send("<h1>Hello World</h1>")
})

router.post("/postParams",function(req,res){
  const params = req.body.number;
  if(params < 1000) res.send("That's Good Number")
  else res.status(404).send("I don't like this Number")
})

router.get('/company',function(req,res){
  const sql = "SELECT * FROM COMPANY";
  DBconnect.query(sql)
    .then(data=>{
      console.log(data)
      res.send(data)
    })
})

module.exports = router;
