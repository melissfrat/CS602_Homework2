const net = require('net');
var hwkVar = module.require('./employeeModule.js');
var colors = module.require('colors');
var util = module.require('util');

var server = net.createServer(
    function (socket) {
        console.log(("Client connection...").red);

        socket.on('end', function () {
            console.log(("Client disconnected...").red);
        });

        // process data from client
        //lookupByLastName <last name>
        //• addEmployee < first name> <last name>
        //    • lookupById <id>
        var msg = " ";
        socket.on('data', function (data) {

            var strCommand = data.toString();
            console.log(("received... " + strCommand).blue);
            var charindex = -1;
            if ((charindex = strCommand.search('lookupByLastName')) > -1) {
                var nameToLookup = strCommand.slice(charindex + 17).trim();
                var nameList = hwkVar.lookupByLastName(nameToLookup);
                msg = JSON.stringify(nameList);
                socket.write(msg);


            }
            else if ((charindex = strCommand.search('addEmployee')) > -1) {
                //trim and split the data portion out to an array
                var nameToLookup = strCommand.slice(charindex + 12).trim().split(' ');
                var idadded = hwkVar.addEmployee(nameToLookup[0], nameToLookup[1]);
                msg = idadded.toString();
                socket.write(msg);
            }
            else if (strCommand.search('lookupById') > -1) {
                var idLookup = strCommand.slice(charindex + 11).trim().parseint();
                var nameList = hwkVar.lookupById(idLookup);
                msg = JSON.stringify(nameList);
                socket.write(msg);

            }
            else
            {
                console.log("Should disconnect");

            }
        });

        // send data to client
    });

// listen for client connections
server.listen(3000, function () {
    console.log("Listening for connections");
});
 