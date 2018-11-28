var express = require('express');
var router = express.Router();
var csv=require('csvtojson')

/* GET home page. */
router.get('/startarea',async function(req, res) {
    const jsonArray= await csv().fromFile("./localdata/start_area.csv");
    res.send(jsonArray);
});

module.exports = router;