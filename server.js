'use strict';

var express = require('express');

var app = express();
var port = 3000;

var rantRoutes = express.Router();

// mongoose.connect(process.env.MONGOLAB_URL || 'mongodb://localhost/rant_store');

require('./routes/rant_routes')(rantRoutes);

app.use('/api', rantRoutes);

app.listen(process.env.port || port, function () {
	console.log('server running on port ' + (process.env.PORT || 3000));
});