var express = require('express');
var router = express.Router();
var csv=require('csvtojson')

/* GET home page. */
router.get('/endarea',async function(req, res) {
    const jsonArray= await csv().fromFile("./localdata/end_area.csv");
    res.send(jsonArray);
});

module.exports = router;