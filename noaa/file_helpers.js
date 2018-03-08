var describe_file_path = function(path){
	
	var path_regex = /(\w+)\/(\w+)-(\w+)-(\w+)(-([\w]+))?\.txt/,
		path_parts = path.match(path_regex);

	const [key_path, product, report_period, meteorological_element, statistic, unused, condition] = path_parts;

	return {
		full_path: path,
		key_path: key_path,
		product: product,
		report_period: report_period,
		meteorological_element: meteorological_element,
		statistic: statistic,
		condition: condition
	};
};

var annual_seasonal_row = function(row){
	/*
	A. FORMAT OF ANNUAL/SEASONAL FILES
	   (ann-*.txt, djf-*.txt, mam-*.txt, jja-*.txt, son-*.txt)

	   Each file contains the annual/seasonal values of one parameter at all
	   qualifying stations. There is one record (line) per station.

	   The variables in each record include the following:

	   Variable  Columns  Type
	   ----------------------------
	   STNID       1- 11  Character
	   VALUE      19- 23  Integer
	   FLAG       24- 24  Character
	   ----------------------------

	   These variables have the following definitions:

	   STNID   is the GHCN-Daily station identification code. See the lists in the
			   station-inventories directory.
	   VALUE1  is the annual/seasonal value.
	   FLAG1   is the completeness flag for the annual/seasonal value. See Flags
			   section below.
	*/

	console.log(row)

	return {
		station_id: row.slice(0, 10),
		value: Number(row.slice(18, 23)),
		flag: row.slice(23, 24).trim()
	};
};

var monthly_row = function(row){
	/*
	B. FORMAT OF MONTHLY FILES
	   (mly-*.txt)

	   Each file contains the values of one parameter for each month of the year
	   at all qualifying stations. There is one record per station.

	   The variables in each record include the following:

	   Variable  Columns  Type
	   ----------------------------
	   STNID       1- 11  Character
	   VALUE1     19- 23  Integer
	   FLAG1      24- 24  Character
	   - - - - - - - - - - - - - -
	   VALUE12    96-100  Integer
	   FLAG12    101-101  Character
	   ----------------------------

	   These variables have the following definitions:

	   STNID   is the GHCN-Daily station identification code.
	   VALUE1  is the January value.
	   FLAG1   is the completeness flag for January. See Flags section below.
	   - - - -
	   Value12 is the December value.
	   Flag12  is the completeness flag for December.
	*/

	var result = {
		station_id: row.slice(0, 10),

		jan_value: Number(row.slice(19, 23)),
		jan_flag: row.slice(23, 24),

		feb_value: Number(row.slice(26, 30)),
		feb_flag: row.slice(30, 31),

		mar_value: Number(row.slice(33, 37)),
		mar_flag: row.slice(37, 38),

		apr_value: Number(row.slice(40, 44)),
		apr_flag: row.slice(44, 45),

		may_value: Number(row.slice(47, 51)),
		may_flag: row.slice(51, 52),

		jun_value: Number(row.slice(54, 58)),
		jun_flag: row.slice(58, 59),

		jul_value: Number(row.slice(61, 65)),
		jul_flag: row.slice(65, 66),

		aug_value: Number(row.slice(68, 72)),
		aug_flag: row.slice(72, 73),

		sep_value: Number(row.slice(75, 79)),
		sep_flag: row.slice(79, 80),

		oct_value: Number(row.slice(82, 86)),
		oct_flag: row.slice(86, 87),

		nov_value: Number(row.slice(89, 93)),
		nov_flag: row.slice(93, 94),

		dec_value: Number(row.slice(96, 100)),
		dec_flag: row.slice(100, 101)

	};

	// result.values = [result.jan_value, result.feb_value, result.mar_value, result.apr_value, result.may_value, result.jun_value, result.jul_value, result.aug_value, result.sep_value, result.oct_value, result.nov_value, result.dec_value];
	// result.flags = [result.jan_flag, result.feb_flag, result.mar_flag, result.apr_flag, result.may_flag, result.jun_flag, result.jul_flag, result.aug_flag, result.sep_flag, result.oct_flag, result.nov_flag, result.dec_flag];

	return result;
};

var hourly_row = function(row){
	/*
	D. FORMAT OF HOURLY FILES
	   (hly-*.txt)

	   Each file contains the values of one parameter for each hour of the day
	   at all qualifying stations. There is one record per station-calendar day.

	   The variables in each record include the following:

	   Variable  Columns  Type
	   ----------------------------
	   STNID       1- 11  Character
	   MONTH      13- 14  Integer
	   DAY        16- 17  Integer
	   VALUE1     19- 23  Integer
	   FLAG1      24- 24  Character
	   - - - - - - - - - - - - - -
	   VALUE24   180-184  Integer
	   FLAG24    185-185  Character
	   ----------------------------

	   These variables have the following definitions:

	   STNID   is the GHCN-Daily station identification code
	   MONTH   is the month in the 30-year period used. 01=January; 12=December
	   DAY     is the day in the 30-year period used. Varies from 1 to 31 in each
			   record.
	   VALUE1  is the value for the first hour of the day
	   FLAG1   is a completeness flag based on the WMO normals classification, for
			   the first hour of the day. See Flags Section below.
	   - - - -
	   Value24 is the value for last hour of the day.
	   Flag24  is the completeness flag for the last hour of the day
	*/

	var result = {
		station_id: row.slice(0, 10),

		month: row.slice(12, 14),

		day: row.slice(15, 17),

		hour_01: row.slice(18, 23),
		flag_01: row.slice(23, 24),

		hour_02: row.slice(25, 30),
		flag_02: row.slice(30, 31),

		hour_03: row.slice(32, 37),
		flag_03: row.slice(37, 38),

		hour_04: row.slice(39, 44),
		flag_04: row.slice(44, 45),

		hour_05: row.slice(46, 51),
		flag_05: row.slice(51, 52),

		hour_06: row.slice(53, 58),
		flag_06: row.slice(58, 59),

		hour_07: row.slice(60, 65),
		flag_07: row.slice(65, 66),

		hour_08: row.slice(67, 72),
		flag_08: row.slice(72, 73),

		hour_09: row.slice(74, 79),
		flag_09: row.slice(79, 80),

		hour_10: row.slice(81, 86),
		flag_10: row.slice(86, 87),

		hour_11: row.slice(88, 93),
		flag_11: row.slice(93, 94),

		hour_12: row.slice(95, 100),
		flag_12: row.slice(100, 101),

		hour_13: row.slice(102, 107),
		flag_13: row.slice(107, 108),

		hour_14: row.slice(109, 114),
		flag_14: row.slice(114, 115),

		hour_15: row.slice(116, 121),
		flag_15: row.slice(121, 122),

		hour_16: row.slice(123, 128),
		flag_16: row.slice(128, 129),

		hour_17: row.slice(130, 135),
		flag_17: row.slice(135, 136),

		hour_18: row.slice(137, 142),
		flag_18: row.slice(142, 143),

		hour_19: row.slice(144, 149),
		flag_19: row.slice(149, 150),

		hour_20: row.slice(151, 156),
		flag_20: row.slice(156, 157),

		hour_21: row.slice(158, 163),
		flag_21: row.slice(163, 164),

		hour_22: row.slice(165, 170),
		flag_22: row.slice(170, 171),

		hour_23: row.slice(172, 177),
		flag_23: row.slice(177, 178),

		hour_24: row.slice(179, 184),
		flag_24: row.slice(184, 185)

	};

	// result.hours = [result.hour_01, result.hour_02, result.hour_03, result.hour_04, result.hour_05, result.hour_06, result.hour_07, result.hour_08, result.hour_09, result.hour_10, result.hour_11, result.hour_12, result.hour_13, result.hour_14, result.hour_15, result.hour_16, result.hour_17, result.hour_18, result.hour_19, result.hour_20, result.hour_21, result.hour_22, result.hour_23, result.hour_24];
	// result.flags = [result.flag_01, result.flag_02, result.flag_03, result.flag_04, result.flag_05, result.flag_06, result.flag_07, result.flag_08, result.flag_09, result.flag_10, result.flag_11, result.flag_12, result.flag_13, result.flag_14, result.flag_15, result.flag_16, result.flag_17, result.flag_18, result.flag_19, result.flag_20, result.flag_21, result.flag_22, result.flag_23, result.flag_24];

	return result;
};

module.exports = {
	describe_file_path: describe_file_path,
	annual_seasonal_row: annual_seasonal_row,
	monthly_row: monthly_row,
	hourly_row: hourly_row
};