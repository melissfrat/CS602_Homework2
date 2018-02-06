/**
 * Created by melissafratangeli on 9/13/17.
 */

var _ = require('underscore');
// JavaScript source code
var data = [{ id: 1, firstName: 'John', lastName: 'Smith' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'John', lastName: 'Doe' }];

//exports the lookByIID function
exports.lookupById = function (value) {

    //search the data jason objects for the id pare and return that object
    var returndata = _.findWhere(data, { id: value });

    return (returndata);
};

exports.lookupByLastName = function (lastNameIn) {

    //search the data jason objects for the id pare and return that object
    var returnnamelist = _.where(data, { lastName: lastNameIn });

    return (returnnamelist);

};

exports.addEmployee = function (firstNameIn, lastNameIn) {

    //search the data json objects for the id  and get the array of ids
    var returidlist = _.pluck(data, 'id');

    //loook for max id in the array
    var maxId = _.max(returidlist);

    //add one to id
    maxId++;

    //put the new json object on the json array with input name
    data.push({ id: maxId, firstName: firstNameIn, lastName: lastNameIn });
    return maxId;

};