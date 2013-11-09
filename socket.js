module.exports = function(server){
    var io = require('socket.io').listen(server),
        redis = require('socket.io/node_modules/redis'),
        redisStore = require('socket.io/lib/stores/redis'),
        ip = null,
        port = null,
        store = redis.createClient(port,ip),
        pub = redis.createClient(port,ip),
        sub = redis.createClient(port,ip),
        client = redis.createClient(port,ip);


    io.configure(function(){
        io.set('log level', 2);

        io.set('store',new redisStore({
            redisPub: pub,
            redisSub: sub,
            redisClient: client
        }))
    });

    io.sockets.on('connection', function(socket){
        
    });
}
