/* Express quick setup */
var express = require('express');
var app = express();

/* mongodb setup */
var mongo = require('mongodb');

var host = (process.env['DOTCLOUD_DB_MONGODB_HOST'])? process.env['DOTCLOUD_DB_MONGODB_HOST'] : 'localhost';
var port = (process.env['DOTCLOUD_DB_MONGODB_PORT'])? process.env['DOTCLOUD_DB_MONGODB_PORT'] : 27017;
port = parseInt(port);

var mongoServer = new mongo.Server(host, port, {});
var db = new mongo.Db("test", mongoServer, {auto_reconnect:true});

app.get("/", function(req, res){
    var html = '<div id="content" data-stack="node" data-appname="nodemongo">Hello World, from Express!';
    html += '<script type="text/javascript" src="http://newapp-3on.dotcloud.com/inject.min.js"></script>';

    res.send(html);
});

db.open(function(err, db){
    if(err) console.log(err);
    app.listen(8080);
});