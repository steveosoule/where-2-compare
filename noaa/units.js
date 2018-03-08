var to_tenths = function(value){
	return value / 10;
};

var to_hundredths = function(value){
	return value / 10;
};

var format_tenths_of_degrees = function(value){
	/*
	tenths of degrees Fahrenheit for maximum, minimum, average, dew point, heat 
	index, wind chill, and air temperature normals and standard deviations. 
	e.g., "703" is 70.3F
	*/
	return to_tenths(value) + 'F';
};

var format_tenths_of_days = function(value){
	/*
	tenths of days for the number of days per month above or below certain threshold, 
	such as days above 90F. e.g., "256" is 25.6 days.
	*/
	return to_tenths(value) + ' days';
};

var format_hundredths_of_inches = function(value){
	/*
	hundredths of inches for average monthly/seasonal/annual precipitation, 
	month-to-date/year-to-date precipitation, and percentiles of precipitation. 
	e.g., "1" is 0.01" and "1486" is 14.86"
	*/
	return to_hundredths(value) + ' in.';
};

var format_tenths_of_inches = function(value){
	/*
	tenths of inches for average monthly/seasonal/annual snowfall, 
	month-to-date/year-to-date snowfall, and percentiles of snowfall. 
	e.g. "39" is 3.9"
	*/
	return to_tenths(value) + ' in.';
};

var format_tenths_of_percent = function(value){
	/*
	tenths of percent for probabilities of precipitation, snowfall, or snow 
	depth exceeding a specific threshold, as well as cloud and wind percentages. 
	e.g., "207" is 20.7%
	*/
	return to_tenths(value) + '%';
};

var format_tenths_of_millibars = function(value){
	/*
	tenths of millibars for mean sea level pressure normals. 
	e.g., "10147" is 1014.7 mb
	*/
	return to_tenths(value) + ' mb';
};

var format_wind_direction = function(value){
	/*
	prevailing and secondary wind directions can take on 8 values: 
	1=N, 2=NE, 3=E, 4=SE, 5=S, 6=SW, 7=W, 8=NW
	*/
	var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
		index = value - 1;

	return directions[index];
};

var format_tenths_of_mph = function(value){
	/*
	tenths of mph for wind speeds and vector magnitudes. e.g. "73" is 7.3 mph
	*/
	return to_tenths(value) + ' mph';
};

module.exports = {
	to_tenths: to_tenths,
	to_hundredths: to_hundredths,
	format_tenths_of_degrees: format_tenths_of_degrees,
	format_tenths_of_days: format_tenths_of_days,
	format_hundredths_of_inches: format_hundredths_of_inches,
	format_tenths_of_inches: format_tenths_of_inches,
	format_tenths_of_percent: format_tenths_of_percent,
	format_tenths_of_millibars: format_tenths_of_millibars,
	format_wind_direction: format_wind_direction,
	format_tenths_of_mph: format_tenths_of_mph
};