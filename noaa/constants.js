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

const special_values = {
	'-9999': 'missing or insufficient data; values cannot be computed',
    '-8888': 'date not defined (e.g. February 30, September 31) - used in daily files to achieve fixed-length records',
    '-7777': 'a non-zero value that would round to zero, for variables bound by zero.',
    '-6666': 'parameter undefined; used in precipitation/snowfall/snow depth percentiles when number of nonzero values is insufficient',
    '-5555': 'parameter not available because it was inconsistent with another parameter'
};

const flags = {
	C: 'complete (all 30 years used)',
    S: 'standard (no more than 5 years missing and no more than 3 consecutive years missing among the sufficiently complete years)',
    R: 'representative (observed record utilized incomplete, but value was scaled or based on filled values to be representative of the full period of record)',
    P: 'provisional (at least 10 years used, but not sufficiently complete to be labeled as standard or representative). Also used for parameter values on February 29 as well as for interpolated daily precipitation, snowfall, and snow depth percentiles.',
    Q: 'quasi-normal (at least 2 years per month, but not sufficiently complete to be labeled as provisional or any other higher flag code. The associated value was computed using a pseudonormals approach or derived from monthly pseudonormals.',
    Blank: 'the data value is reported as a special value such as -9999'
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
	'10pctl': 'Climatological 10th percentile',
	'1stdir': 'Prevailing Wind Direction',
	'1stpct': 'Prevailing Wind Percentage',
	'2nddir': 'Secondary Wind Direction',
	'2ndpct': 'Secondary Wind Percentage',
	'25pctl': 'Climatological 25th percentile',
	'50pctl': 'Climatological 50th percentile',
	'75pctl': 'Climatological 75th percentile',
	'90pctl': 'Climatological 90th percentile',
	'avgnds': 'Average Number of Days (followed by a condition)',
	'avgspd': 'Average Wind Speed',
	'baseNN': 'Average of base NN (other than 65F) Heating or Cooling Degree Days',
	'normal': 'Climatological Average',
	'pctall': 'Probability of Occurrence (followed by a condition)',
	'pctbkn': 'Percent Broken (clouds)',
	'pctclm': 'Percent Calm (winds)',
	'pctclr': 'Percent Clear (clouds)',
	'pctfew': 'Percent Few (clouds)',
	'pctovc': 'Percent Overcast (clouds)',
	'pctsct': 'Percent Scattered (clouds)',
	'vctdir': 'Mean Wind Vector Direction',
	'vctspd': 'Mean Wind Vector Magnitude'
};

const conditions = {
	geNNNhi: 'greater than or equal to NNN hundredths of inches',
	geNNNti: 'greater than or equal to NNN tenths of inches',
	geNNNwi: 'greater than or equal to NNN whole inches',
	grthNNN: 'greater than or equal to NNN whole degrees Fahrenheit',
	lsthNNN: 'less than or equal to NNN whole degrees Fahrenheit'
};