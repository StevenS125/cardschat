var app = require("http").createServer()
var io = module.exports.io = require("socket.io")(app)

const PORT = process.env.PORT || 3001

const Socketmanager = require('./Socketmanager')

io.on('connection', Socketmanager)

app.listen(PORT, () => 
console.log('connect to port:' + PORT))