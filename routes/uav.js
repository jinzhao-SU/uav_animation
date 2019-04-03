var express = require('express');
var router = express.Router();
var csv=require('csvtojson')
const fs   = require('fs');

/* GET home page. */
router.get('/',async function(req, res) {
    // const jsonArray= await csv().fromFile("./localdata/uav_coordinate.csv");
    // res.send(jsonArray);
    const readStream=fs.createReadStream("./localdata/uav_coordinate_light.csv");
    // console.log(csv().fromStream(readStream).pipe(res));
    csv().fromStream(readStream).pipe(res);
});

module.exports = router;