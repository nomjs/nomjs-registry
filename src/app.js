'use strict';

const path = require('path');
const Ravel = require('ravel');

const app = new Ravel();

app.registerParameter('rethink host', true);
app.registerParameter('rethink port', true);
app.registerParameter('rethink db name', true);
app.registerParameter('max package size bytes', true, 10 * 1024 * 1024);

app.modules(path.resolve(__dirname, '/modules'));
app.resources(path.resolve(__dirname, '/resources'));

module.exports = app;
