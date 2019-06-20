const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cors())


const posts = require('./routes/api/posts')
app.use('/api/posts', posts)

const endArea = require('./routes/uav/endArea')
app.use('/uav/endArea', endArea)
const startArea = require('./routes/uav/startArea')
app.use('/uav/startArea', startArea)
const uav = require('./routes/uav/uav')
app.use('/uav/uav', uav)


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


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Sever started on port http://localhost:${port}`)
})
