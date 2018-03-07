const periods = {
	ann: 'annual',
	djf: 'December, January, February (winter)',
	dly: 'daily',
	hly: 'hourly',
	jja: 'June, July, August (summer)',
	mam: 'March, April, May (spring)',
	mly: 'monthly',
	mtd: 'month-to-date',
	rtp: 'return periods (used for Air Freezing Index)',
	son: 'September, October, November (autumn)',
	ytd: 'year-to-date'
};

const elements = {
	cldd: 'cooling degree days',
	cldh: 'cooling degree hours',
	clod: 'clouds',
	dewp: 'dew point temperature',
	dutr: 'diurnal temperature range',
	hidx: 'heat index',
	htdd: 'heating degree days',
	htdh: 'heating degree hours',
	prcp: 'precipitation',
	pres: 'sea level pressure',
	snow: 'snowfall',
	snwd: 'snow depth',
	tavg: 'daily mean temperature (average of tmax and tmin)',
	temp: 'temperature',
	tmax: 'daily maximum temperature',
	tmin: 'daily minimum temperature',
	wchl: 'wind chill',
	wind: 'wind'
};

const statistics = {
	10pctl: 'Climatological 10th percentile',
	1stdir: 'Prevailing Wind Direction',
	1stpct: 'Prevailing Wind Percentage',
	2nddir: 'Secondary Wind Direction',
	2ndpct: 'Secondary Wind Percentage',
	25pctl: 'Climatological 25th percentile',
	50pctl: 'Climatological 50th percentile',
	75pctl: 'Climatological 75th percentile',
	90pctl: 'Climatological 90th percentile',
	avgnds: 'Average Number of Days (followed by a condition)',
	avgspd: 'Average Wind Speed',
	baseNN: 'Average of base NN (other than 65F) Heating or Cooling Degree Days',
	normal: 'Climatological Average',
	pctall: 'Probability of Occurrence (followed by a condition)',
	pctbkn: 'Percent Broken (clouds)',
	pctclm: 'Percent Calm (winds)',
	pctclr: 'Percent Clear (clouds)',
	pctfew: 'Percent Few (clouds)',
	pctovc: 'Percent Overcast (clouds)',
	pctsct: 'Percent Scattered (clouds)',
	vctdir: 'Mean Wind Vector Direction',
	vctspd: 'Mean Wind Vector Magnitude'
};

const conditions = {
	geNNNhi: 'greater than or equal to NNN hundredths of inches',
	geNNNti: 'greater than or equal to NNN tenths of inches',
	geNNNwi: 'greater than or equal to NNN whole inches',
	grthNNN: 'greater than or equal to NNN whole degrees Fahrenheit',
	lsthNNN: 'less than or equal to NNN whole degrees Fahrenheit'
};