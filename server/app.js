const createError = require('http-errors');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cors())


const endArea = require('./routes/uav/endArea')
app.use('/uav/endArea', endArea)
const startArea = require('./routes/uav/startArea')
app.use('/uav/startArea', startArea)
const uav = require('./routes/uav/uav')
app.use('/uav/uav', uav)
////////////////////base_station///////////
const baseStation = require('./routes/uav/baseStation')
app.use('/uav/baseStation', baseStation)
////////other uav version/////////////
const uavReactive = require('./routes/uav/uav_reactive')
app.use('/uav/uav_reactive', uavReactive)

const uavTP = require('./routes/uav/uav_tp')
app.use('/uav/uav_tp', uavTP)

const uavNOCheck = require('./routes/uav/uav_nocheck')
app.use('/uav/uav_nocheck', uavNOCheck)



// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(__dirname + '/public/'));
//     app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }
if (process.env.NODE_ENV === 'start') {
    console.log('start mode');
} else {
    console.log('production mode');
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

module.exports = app;


// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//     console.log(`Sever started on port http://localhost:${port}`)
// })
