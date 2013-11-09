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
        }));
    });

    function htmlEscape(text) {
        return text.replace(/&/g, '&amp;').
                    replace(/</g, '&lt;').
                    replace(/"/g, '&quot;').
                    replace(/'/g, '&#039;');
    }

    io.sockets.on('connection', function(socket){
        socket.on('join',function(name){
            name = htmlEscape(name);
            if (!name) {
                name = 'guest';
            }
            
            store.hexists('users', name, function(err,res){
                
            });

            console.log(name + 'join');
        });

        socket.on('message', function(data_obj){
            //{name: name, pic: pic, music: music}
            console.log(data_obj.name + ":" + data_obj.pic);
            socket.broadcast.emit('receivePic',data_obj);
        });

        socket.on('disconnect', function(){
            console.log('disconnect!');
        });

    });
};