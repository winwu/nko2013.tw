var io = require('socket.io/node_modules/socket.io-client')
    , port = 3000
    , host = 'http://localhost'
    , socket = io.connect(host + ':' + port);
    
var name = process.argv[2],
    target = process.argv[3];

function log(data){
    console.log(data);
}

socket.on('connect',function(){
    socket.on('error',function(data){
        console.log(data);
    });
       
});




