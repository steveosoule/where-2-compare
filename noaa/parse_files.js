'use strict';

var fs = require('fs');
var path = require('path');

var units = require('./units');
var constants = require('./constants');
var file_helpers = require('./file_helpers');

var path_base = '../data/ftp.ncdc.noaa.gov/pub/data/normals/1981-2010/products/';
var file_paths = [
	'precipitation/ann-snow-normal.txt'
];
	// 'precipitation/ann-prcp-normal.txt',

var parse_file_with_info = function(file_info){
	fs.readFile(file_info.full_path, 'utf8', function(err, data){
		if (err) throw err;

		var rows = data.split('\n').filter(r => r.length);

		var results = [];

		if( ['ann', 'djf', 'mam', 'jja', 'son'].includes(file_info.report_period) ){
			results = rows.map(file_helpers.annual_seasonal_row);
		}
		
		console.log(file_info, results.slice(0, 10));
	});
};

file_paths.forEach(function(file_path){
	var file_info = file_helpers.describe_file_path(path_base + file_path);
	parse_file_with_info(file_info);
});

