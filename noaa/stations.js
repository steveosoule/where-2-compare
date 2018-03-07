'use strict';

var fs = require('fs');
var path = require('path');


var map_stations = function(row){
	return {
		station_id: row.slice(0, 10).trim(),
		latitude: Number(row.slice(12, 19).trim()),
		longitude: Number(row.slice(21, 29).trim()),
		elevation: Number(row.slice(31, 36).trim()),
		state: row.slice(38, 39).trim(),
		name: row.slice(41, 70).trim(),
		gsnflag: row.slice(72, 74).trim(),
		hcnflag: row.slice(76, 78).trim(),
		wmoid: row.slice(80, 84).trim(),
		method: row.slice(86, 98).trim()
	};
};


var file_path = '../data/ftp.ncdc.noaa.gov/pub/data/normals/1981-2010/station-inventories/allstations.txt';
fs.readFile(file_path, 'utf8', function(err, data){
	if (err) throw err;

	var rows = data.split('\n').filter(r => r.length);
	var stations = rows.map(map_stations);
	console.log(stations.slice(0,5));
});