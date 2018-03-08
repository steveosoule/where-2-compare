var annual_seasonal = function(row){
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

    return {
    	station_id: row.slice(0, 10),
    	value: row.slice(18, 22),
    	flag: row.slice(23, 23)
    };
};

var monthly = function(row){
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

module.exports = {
	annual_seasonal: annual_seasonal,
	monthly: monthly
};