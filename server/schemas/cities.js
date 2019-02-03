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

var citySchema = new Schema({
	_id: ObjectId,
	h1: String,
	url: String,
	title: String,
	city_name: String,
	state_name: String,
	state_abbr: String,
	breadcrumbs: Array,
	gallery: Array,
	population: Number,
	population_male: Number,
	population_male_percent: Number,
	population_female: Number,
	population_female_percent: Number,
	median_age: Number,
	median_age_state: Number,
	zipcodes: Array,
	median_household_income: Number,
	median_household_income_state: Number,
	median_house_value: Number,
	median_house_value_state: Number,
	median_rent: Mixed,
	races_image: String,
	races: Array,
	cost_of_living_index: { type: [Number], index: true },
	city_guides: Array,
	ancestries: Array,
	elevation: Mixed,
	square_miles: Mixed,
	home_sales_image: Mixed,
	far_map_image: Mixed,
	educational_info: Array,
	marital_info: Array,
	foreign_born_percent: Number,
	foreign_born_percent_state: Number,
	mortage_real_estate_tax_cost: Number,
	mortage_real_estate_tax_percent: Number,
	no_mortage_real_estate_tax_cost: Number,
	no_mortage_real_estate_tax_percent: Number,
	terra_map_image: Mixed,
	nearest_big_city: String,
	nearest_cities: String,
	permit_histories: Array,
	latitude: String,
	longitude: String,
	latitude_num: Number,
	longitude_num: Number,
	location: {
		type: { type: String },
		coordinates: []
	},
	daytime_population_change_amount: Number,
	daytime_population_change_percent: Number,
	live_and_work_in_city_amount: Number,
	live_and_work_in_city_percent: Number,
	area_code: Mixed,
	household_income_image: String,
	house_value_image: String,
	murders_per_year: {
		count: Array,
		per_capita: Array
	},
	murders_per_year_avg_count: Number,
	murders_per_year_avg_per_capita: Number,
	rapes_per_year: {
		count: Array,
		per_capita: Array
	},
	rapes_per_year_avg_count: Number,
	rapes_per_year_avg_per_capita: Number,
	robberies_per_year: {
		count: Array,
		per_capita: Array
	},
	robberies_per_year_avg_count: Number,
	robberies_per_year_avg_per_capita: Number,
	assaults_per_year: {
		count: Array,
		per_capita: Array
	},
	assaults_per_year_avg_count: Number,
	assaults_per_year_avg_per_capita: Number,
	burglaries_per_year: {
		count: Array,
		per_capita: Array
	},
	burglaries_per_year_avg_count: Number,
	burglaries_per_year_avg_per_capita: Number,
	thefts_per_year: {
		count: Array,
		per_capita: Array
	},
	thefts_per_year_avg_count: Number,
	thefts_per_year_avg_per_capita: Number,
	auto_thefts_per_year: {
		count: Array,
		per_capita: Array
	},
	auto_thefts_per_year_avg_count: Number,
	auto_thefts_per_year_avg_per_capita: Number,
	arsons_per_year: {
		count: Array,
		per_capita: Array
	},
	arsons_per_year_avg_count: Number,
	arsons_per_year_avg_per_capita: Number,
	crime_index_per_year: Array,
	crime_index_per_year_avg: Number,
	police_officer_count: Mixed,
	officer_count: Mixed,
	officers_per_1000: Mixed,
	officers_per_1000_state: Mixed,
	city_wikipedia_profile_link: Array,
	tourist_attractions: Array,
	unemployment: Number,
	unemployment_state: Number,
	population_change_1990s_count: Mixed,
	population_change_1990s_percent: Mixed,
	common_industries: Array,
	temperature_image: String,
	precipitation_image: String,
	humidity_image: String,
	wind_image: String,
	sunshine_image: String,
	clouds_image: String,
	earthquakes_html: String,
	earthquakes_likelyhood: String,
	natural_disasters_html: String,
	population_density: Number,
	weather_station_id: String,
	weather_station: Mixed

}, {timestamps: true});

citySchema.index({ location: "2dsphere" });

citySchema.statics.findByH1 = function(h1, cb) {
  return this.find({ h1: new RegExp(h1, 'i') }, cb);
};

citySchema.statics.findCityState = function(h1, cb) {
  return this.findOne({ h1: new RegExp(h1, 'i') }, cb);
};

module.exports = mongoose.model('cities', citySchema);