var express = require('express');
var _ = require('underscore');
var hwkVar = module.require('./employeeModule.js');
var app = express();

// setup handlebars view engine
var handlebars = require('express-handlebars');

app.engine('handlebars',
    handlebars({ defaultLayout: 'main_logo' }));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// to parse request body
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Use the quotes module
//var quotes = require('./ex04_quotes.js');

// GET request to the homepage
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/id/:id', function (req, res) {

    var nameList = hwkVar.lookupById(parseInt(req.params.id));
    //msg = JSON.stringify(nameList);

    res.format({
        'application/json': function () {
            res.json(nameList);

        },
        'application/xml': function () {
            var dataXml =
                '<?xml version="1.0"?\n<employee id="' + req.params.id + '">\n' +
                '    <firstName>' + nameList.firstName + '</firstName>\n' +
                '    <lastName>' + nameList.lastName + '</lastName>\n' +
                '</employee>';
            res.type('application/xml');
            res.send(dataXml);
        },
        'text/html': function () {
            res.render('employee',
                {
                    id: req.params.id,
                    firstName: nameList.firstName,
                    lastName: nameList.lastName
                });
        }
    });
});

app.get('/lastName/:lastName', function (req, res) {

    var nameList = hwkVar.lookupByLastName(req.params.lastName);
    //msg = JSON.stringify(nameList);

    res.format({
        'application/json': function () {
            res.json(nameList);

        },
        'application/xml': function () {
            var dataXml =
                '<?xml version="1.0"?\n<employees>\n' +
                    nameList.map(function (c) {
                     return '  <employee id="' + c.id + '">\n' +
                '    <firstName>' + c.firstName + '</firstName>\n' +
                '    <lastName>' + c.lastName + '</lastName>\n' +
                '  </employee>';
                }).join('\n') + '\n</employees>\n';
            res.type('application/xml');
            res.send(dataXml);
        },
        'text/html': function () {
            res.render('employeeList',
                {
                    employees: nameList,
                    lastName: req.params.lastName
                });
        }
    });
});
app.get('/addEmployee', function (req, res) {
    res.render('newEmployee');
});
app.post('/addEmployee', function(req, res) {
	var id = hwkVar.addEmployee(req.body.firstName, req.body.lastName);
	res.redirect('/id/' + id); 
});


//app.get('/about', function (req, res) {
//    res.render('about_quote',
//        {
//            quote: quotes.getRandomQuote(),
//            quotes: quotes.getAllQuotes()
//        });
//});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.listen(3000, function () {
    console.log('http://localhost:3000');
});











