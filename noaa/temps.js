'use strict';

var fs = require('fs');
var path = require('path');

var temp_symbols = ['tmax', 'tavg', 'tmin'];

var map_temps = function(row){
	var parts = row.split(/\s+/),
		station_id = parts[0],
		stat = parts[1],
		stat_parts = stat.match(/([-]?\d+)(\w+)/),
		stat_amount = Number(stat_parts[1]) / 10,
		stat_flag = stat_parts[2];

	return {
		station_id: station_id,
		value: stat,
		amount: stat_amount,
		flag: stat_flag
	}
};

temp_symbols.forEach(function(temp){
	
	var file_path = '../data/ftp.ncdc.noaa.gov/pub/data/normals/1981-2010/products/temperature/ann-' + temp + '-normal.txt';
	fs.readFile(file_path, 'utf8', function(err, data){
		
		if (err) throw err;

		var rows = data.split('\n').filter(r => r.length);
		var temps = rows.map(map_temps);

		console.log('TEMP:', temp);
		console.log(temps.slice(0,4));
	});
});