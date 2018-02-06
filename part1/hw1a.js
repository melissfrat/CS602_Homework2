/**
 * Created by melissafratangeli on 9/13/17.
 */

// JavaScript source code
var hwkVar = module.require('./employeeModule.js');
var colors = module.require('colors');
var util = module.require('util');
var lookupId = 2;
var lookupName = 'Smith';

//lookup all smiths in the data
var nameList = hwkVar.lookupByLastName(lookupName);
console.log(("Lookup by Name (" + lookupName + ")").red);

//for all values returned print out the json object
console.dir(nameList, { depth: null, colors: false });

//lookup the id which is currnetly 2 and print out the object
console.log(("\nLookup by id (" + lookupId + ")\n").red +
    JSON.stringify(hwkVar.lookupById(lookupId), null, 0));

console.log(("\nAdding employee William Smith").red);
//add a new employee
hwkVar.addEmployee('William', 'Smith');

nameList = hwkVar.lookupByLastName(lookupName);
console.log(("\nLookup by Name (" + lookupName + ")").red);

//for all values returned print out the json object
console.dir(nameList, { depth: null, colors: false });

//lookup id 2 again
var foundObj = hwkVar.lookupById(lookupId);

//print out the found object
console.log(("\nLookup by id (" + lookupId + ")\n").red +
    JSON.stringify(foundObj, null, 0));

//change the first name of the jason object returned
foundObj.firstName = 'Mary';
console.log(("\nChanging first name...").red);

//lookup th id again and pint out the object
foundObj = hwkVar.lookupById(lookupId);
console.log(("\nLookup by id (" + lookupId + ")\n").red +
    JSON.stringify(foundObj, null, 0));

//get thelist of all smiths again
nameList = hwkVar.lookupByLastName(lookupName);
console.log(("\nLookup by Name (" + lookupName + ")").red);

//for all values returned print out the json object
console.dir(nameList, { depth: null, colors: false });
