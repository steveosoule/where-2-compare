// Schemas: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
const ObjectId = Schema.Types.ObjectId;

var noaa_value_schema = {
	value: String,
	amount: Number,
	flag: String
}

var stationSchema = new Schema({
	_id: ObjectId,

	// Station Details
	station_id: String,	
	latitude: Number,
	longitude: Number,
	location: {
		type: { type: String },
		coordinates: []
	},
	elevation: Number,
	state: String,
	name: String,
	gsnflag: String,
	hcnflag: String,
	wmoid: String,
	method: String,
	
	// Annual Temps
	ann_tavg: noaa_value_schema,
	ann_tmax: noaa_value_schema,
	ann_tmin: noaa_value_schema,
	
	// Annual Heating/Cooling Days
	ann_htdd: noaa_value_schema,
	ann_cldd: noaa_value_schema,

	// Seasons
	winter_tavg: noaa_value_schema,
	winter_tmax: noaa_value_schema,
	winter_tmin: noaa_value_schema,
	
	spring_tavg: noaa_value_schema,
	spring_tmax: noaa_value_schema,
	spring_tmin: noaa_value_schema,

	summer_tavg: noaa_value_schema,
	summer_tmax: noaa_value_schema,
	summer_tmin: noaa_value_schema,
	
	fall_tavg: noaa_value_schema,
	fall_tmax: noaa_value_schema,
	fall_tmin: noaa_value_schema,

	// Precipitation
	ann_snow: noaa_value_schema,
	ann_prcp: noaa_value_schema,

	// Precipitation avgnds
	ann_prcp_avgnds_ge001hi: noaa_value_schema,
	ann_prcp_avgnds_ge010hi: noaa_value_schema,
	ann_prcp_avgnds_ge050hi: noaa_value_schema,
	ann_prcp_avgnds_ge100hi: noaa_value_schema,

	// Snow avgnds
	ann_snow_avgnds_ge001ti: noaa_value_schema,
	ann_snow_avgnds_ge010ti: noaa_value_schema,

	// Snow Depth avgnds
	ann_snwd_avgnds_ge001wi: noaa_value_schema,
	ann_snwd_avgnds_ge003wi: noaa_value_schema,
	ann_snwd_avgnds_ge005wi: noaa_value_schema,
	ann_snwd_avgnds_ge010wi: noaa_value_schema,

	// Winter Pricipitation avgnds
	winter_prcp_avgnds_ge001hi: noaa_value_schema,
	winter_prcp_avgnds_ge010hi: noaa_value_schema,

	// TMAX avgnds
	tmax_avgnds_grth040: noaa_value_schema,
	tmax_avgnds_grth050: noaa_value_schema,
	tmax_avgnds_grth060: noaa_value_schema,
	tmax_avgnds_grth070: noaa_value_schema,
	tmax_avgnds_grth080: noaa_value_schema,
	tmax_avgnds_grth090: noaa_value_schema,
	tmax_avgnds_grth100: noaa_value_schema,
	tmax_avgnds_lsth032: noaa_value_schema,

	// TMIN avgnds
	tmin_avgnds_lsth000: noaa_value_schema,
	tmin_avgnds_lsth010: noaa_value_schema,
	tmin_avgnds_lsth020: noaa_value_schema,
	tmin_avgnds_lsth032: noaa_value_schema,
	tmin_avgnds_lsth040: noaa_value_schema,
	tmin_avgnds_lsth050: noaa_value_schema,
	tmin_avgnds_lsth060: noaa_value_schema,
	tmin_avgnds_lsth070: noaa_value_schema,

}, {timestamps: true});

stationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('station', stationSchema);