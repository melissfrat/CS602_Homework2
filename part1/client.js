const net = require('net');
var colors = module.require('colors');
var readline = require('readline');

var colors = module.require('colors');
//create the read interface for interacting with console
var readinterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var GetandSendCommand = function (client) {
    readinterface.question("Enter Command: ", function (line) {
        //send the command to the server
        client.write(line);
        //if we get a bye end the client
        if (line == "bye")
            client.end();
    });
}

var client = net.connect({ port: 3000 }, function () {
    //endicate connection accepted
    console.log(("Connected to server").red);
    //send the first command
    GetandSendCommand(client);


});

client.on('end', function () {
    console.log(("Client disconnected...").red);
});

client.on('data', function (data) {
    //just write out the data the server sends
    console.log((" ...Received \n" + data).blue);
    GetandSendCommand(client);

    //now we have recieved data send another command
//        GetandSendCommand();
//    client.end();
});

client.on('error', function (err) {
    //just write out the data the server sends
    console.log((" ...Received Error \n" + err.message).bgYellow);
    //now we have recieved data send another command
    //    client.end();
});