require('dotenv').config();

// Required Packages
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const httpsRedirect = require('express-https-redirect');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const _ = require('lodash');

var Finance = require('financejs');
var finance = new Finance();


// Express config
app.use(httpsRedirect());
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public', {
	maxAge: 100000
}));
app.use('/vue-app', express.static(__dirname + '/vue-app'));
app.listen(port, () => console.log(`Listening on port ${port}!`));

// Database
const mongoose = require('mongoose');
const db_config = require(__dirname + '/server/db.js');
mongoose.connect(db_config.url, {
	useNewUrlParser: true
});

const Stations = require(__dirname + '/server/schemas/stations.js');
const Cities = require(__dirname + '/server/schemas/cities.js');

// App Config
const METER_TO_MILES = 0.000621371;
const INCLUDED_FIELD_SETS = require(__dirname + '/server/config/includedFields.js');
const DEFAULT_CITY_CODE = 'moderate';
const DEFAULT_CITY_FIELDS = INCLUDED_FIELD_SETS[DEFAULT_CITY_CODE];

// Express Routes
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

var request_stations_like = function (req, res) {
	var limit = req.query.limit ? Number(req.query.limit) : 10,
		gt = req.query.gt ? Number(req.query.gt) : 64,
		lt = req.query.lt ? Number(req.query.lt) : 64.5,
		param = req.query.param ? req.query.param : 'ann_tavg.amount';

	var search = {};
	if (param === 'all') {
		limit = 0;
	} else {
		search[param] = {
			$gt: gt,
			$lt: lt
		};
	}

	Stations.find(search).limit(limit).find((error, results) => {
		if (error) res.send(error);

		var output = {
			meta: {
				search: search,
				limit: limit
			},
			result_count: results.length,
			results: results
		};

		res.contentType('application/json');
		res.send(JSON.stringify(output));
	});
};

app.get('/api/stations_like', request_stations_like);


var make_numeric_mongoose_keys = ['$gt', '$lt', '$gte', '$lte'];

var prepMatchQuery = function (match) {
	if (!match) return {};
	Object.keys(match).forEach(function (match_key) {
		var match_item = match[match_key];
		if (typeof match_item === 'object') {
			Object.keys(match_item).forEach(function (match_item_key) {
				if (match_item_key.indexOf('$') === 0) {
					if (make_numeric_mongoose_keys.indexOf(match_item_key) > -1) {
						match_item[match_item_key] = Number(match_item[match_item_key]);
					} else {
						delete match_item[match_item_key];
					}
				}
			});
		}
	});
	return match;
};

var snake_to_title_case = function (str) {
	return str.split('_').map(function (item) {
		return item.charAt(0).toUpperCase() + item.substring(1);
	}).join(' ');
};

var format_facet_result = function (facet_result) {
	var facetsArray = [];

	for (const key in facet_result) {
		if (facet_result.hasOwnProperty(key)) {
			var facet_values = facet_result[key];

			var facet = {
				code: key,
				name: snake_to_title_case(key),
				total_count: facet_values.reduce((total_count, facet_value) => {
					total_count += facet_value.count;
					return total_count;
				}, 0)
			};

			facet.values = facet_values.map(function (facet_value) {
				facet_value.percent = facet_value.count / facet.total_count;
				return facet_value;
			});

			facetsArray.push(facet);
		}
	}
	return facetsArray;
};

var request_facets = function (req, res) {

	const facetSettings = require(__dirname + '/server/config/facetSettings.js');
	var match = prepMatchQuery(req.query.match);

	Cities.aggregate(
		[
			{
				'$match': match
			},
			facetSettings.cities
		]
	).exec((error, results) => {
		if (error) res.send(error);

		var facets = results ? format_facet_result(results['0']) : [],
			facet_length = results ? results.length : 0;

		var output = {
			meta: {
				timestamp: new Date().getTime(),
				query: req.query
			},
			result_count: facet_length,
			results: facets,
		};

		res.contentType('application/json');
		res.send(JSON.stringify(output));
	});

};


app.get('/api/facets', request_facets);


const DEFAULT_SELECT_FIELDS = ['url', 'city_name', 'state_name', 'state_abbr', 'population', 'population_male_percent', 'population_female_percent', 'median_age', 'zipcodes', 'median_household_income', 'median_household_income_state', 'median_house_value', 'median_house_value_state', 'median_rent', 'races', 'cost_of_living_index', 'ancestries', 'elevation', 'square_miles', 'home_sales_image', 'far_map_image', 'educational_info', 'marital_info', 'foreign_born_percent', 'mortage_real_estate_tax_cost', 'mortage_real_estate_tax_percent', 'no_mortage_real_estate_tax_cost', 'no_mortage_real_estate_tax_percent', 'terra_map_image', 'latitude_num', 'longitude_num', 'location', 'daytime_population_change_percent', 'live_and_work_in_city_percent', 'household_income_image', 'house_value_image', 'crime_index_per_year_avg', 'officers_per_1000', 'unemployment', 'unemployment_state', 'population_change_1990s_percent', 'common_industries', 'temperature_image', 'precipitation_image', 'humidity_image', 'wind_image', 'sunshine_image', 'clouds_image', 'earthquakes_likelyhood', 'natural_disasters_html', 'population_density'];


var merge_stations_into_cities = function (stations, cities) {
	var max_miles_from_city = 0;
	stations.forEach((station, i) => {
		var city = cities[i];		
		city.closest_weather_station = station[0];
		
		if( city.closest_weather_station.calc.miles_from_city > max_miles_from_city ){
			max_miles_from_city = city.closest_weather_station.calc.miles_from_city
		}

		city.weather_ann_tmin_amount = _.get(city.closest_weather_station, 'ann_tmin.amount')
		city.weather_ann_tavg_amount = _.get(city.closest_weather_station, 'ann_tavg.amount')
		city.weather_ann_tmax_amount = _.get(city.closest_weather_station, 'ann_tmax.amount')
		city.weather_winter_tmin_amount = _.get(city.closest_weather_station, 'winter_tmin.amount')
		city.weather_summer_tmax_amount = _.get(city.closest_weather_station, 'summer_tmax.amount')
		city.weather_ann_snow_amount = _.get(city.closest_weather_station, 'ann_snow.amount')
		city.weather_ann_prcp_amount = _.get(city.closest_weather_station, 'ann_prcp.amount')
		city.weather_ann_prcp_avgnds_ge001hi_amount = _.get(city.closest_weather_station, 'ann_prcp_avgnds_ge001hi.amount')
		city.weather_ann_snwd_avgnds_ge001wi_amount = _.get(city.closest_weather_station, 'ann_snwd_avgnds_ge001wi.amount')
	});
	console.log('max_miles_from_city', max_miles_from_city);
	return cities;
};

var send_res_error = function (opts) {
	var output = {
		success: 0,
		error_code: 'query error: ' + opts.code,
		error: opts.error,
		meta: opts.meta,
	};
	opts.res.contentType('application/json');
	opts.res.send(output);
};

var send_res_cities_and_facets = function (opts) {
	opts.meta.time.end = new Date().getTime();
	var output = {
		success: 1,
		meta: opts.meta,
		city_count: opts.cities.length,
		cities: opts.cities,
		facet_count: Object.keys(opts.facets[0]).length,
		facets: opts.facets
	};
	opts.res.contentType('application/json');
	opts.res.send(output);
};

var query_nearest_station_from_city = function(city){
	return Stations.aggregate([{
		'$geoNear': {
			near: city.location,
			key: 'location',
			distanceField: 'calc.miles_from_city',
			distanceMultiplier: METER_TO_MILES,
			spherical: true,
			query: {
				"ann_tmin.amount": {$exists: 1},
				"ann_prcp.amount": {$exists: 1},
				"ann_snow.amount": {$exists: 1},
				"ann_snwd_avgnds_ge001wi.amount": {$exists: 1}
			},
			limit: 1
		}
	}]);
};

var load_and_merge_station_from_cities = function(cities, callback){
	var station_promises = cities.map(query_nearest_station_from_city);
	Promise.all(station_promises).then((station_results) => {
		callback(merge_stations_into_cities(station_results, cities));
	});
};

var load_weather_and_send_res_cities_and_facets = function (opts) {
	var station_promises = opts.cities.map((city) => {
		return query_nearest_station_from_city(city);
	});

	Promise.all(station_promises).then((station_results) => {
		merge_stations_into_cities(station_results, opts.cities);
		send_res_cities_and_facets({
			res: opts.res,
			meta: opts.meta,
			cities: opts.cities,
			facets: opts.facets
		});
	}).catch((error) => {
		send_res_error({
			res: opts.res,
			meta: opts.meta,
			error: error,
			code: 2
		});
	});
};

/* var load_weather_and_send_res_cities_and_facets = function (opts) {
	var station_promises = opts.cities.map((city) => {
		return Stations.aggregate([{
			'$geoNear': {
				near: city.location,
				distanceField: 'calc.miles_from_city',
				distanceMultiplier: METER_TO_MILES,
				limit: 1
			}
		}]);
	});

	Promise.all(station_promises).then((station_results) => {
		merge_stations_into_cities(station_results, opts.cities);
		send_res_cities_and_facets({
			res: opts.res,
			meta: opts.meta,
			cities: opts.cities,
			facets: opts.facets
		});
	}).catch((error) => {
		send_res_error({
			res: opts.res,
			meta: opts.meta,
			error: error,
			code: 2
		});
	});
}; */

var request_search = function (req, res) {

	const facetSettings = require(__dirname + '/server/config/facetSettings.js');
	var match = prepMatchQuery(req.query.match);

	var limit = req.query.limit ? Number(req.query.limit) : 10,
		offset = req.query.offset ? Number(req.query.offset) : 0,
		sort = req.query.sort ? req.query.sort : {
			population: 'desc'
		},
		select = req.query.select ? req.query.select : DEFAULT_SELECT_FIELDS,
		include_weather = typeof req.query.include_weather === 'string' ? !!Number(req.query.include_weather) : true,
		meta = {
			search: {
				match: match,
				sort: sort,
				limit: limit,
				include_weather: include_weather,
				offset: offset
			},
			time: {
				start: new Date().getTime()
			}
		};

	if (select != DEFAULT_SELECT_FIELDS) {
		meta.select = select;
	}

	Promise.all(
			[
				Cities.aggregate([{
					'$match': match
				}, facetSettings.cities]).exec(),
				Cities.find(match, select).limit(limit).skip(offset).sort(sort)
			])
		.then(([facet_results, city_results]) => {

			var cities = JSON.parse(JSON.stringify(city_results));

			if (include_weather) {
				load_weather_and_send_res_cities_and_facets({
					res: res,
					meta: meta,
					cities: cities,
					facets: facet_results
				});
			} else {
				send_res_cities_and_facets({
					res: res,
					meta: meta,
					cities: cities,
					facets: facet_results
				});
			}
		})
		.catch((error) => {
			send_res_error({
				res: res,
				meta: meta,
				error: error,
				code: 2
			});
		});

};

app.get('/api/search', request_search);

app.get('/api/hello', function(req, res){
	res.contentType('application/json');
	res.send(JSON.stringify({foo: 'bar'}));
});

var request_get_cities = function (req, res) {
	var limit = req.query.limit ? Number(req.query.limit) : 10,
		offset = req.query.offset ? Number(req.query.offset) : 0,
		fields = req.query.fields ? req.query.fields : DEFAULT_CITY_FIELDS,
		find = req.query.find ? JSON.parse(req.query.find) : {},
		field_code = req.query.field_code ? req.query.field_code : null,
		update_stations = req.query.update_stations ? Boolean(req.query.update_stations) : false;

	if (field_code) {
		fields = INCLUDED_FIELD_SETS[field_code];
	}

	Cities.find(find, fields).limit(limit).skip(offset).lean().exec((error, results) => {
		if (error) res.send(error);

		var output = {
			meta: {
				limit: limit,
				offset: offset,
			},
			result_count: results.length,
			results: normalize_cities(results)
		};

		if( update_stations ){
			load_and_merge_station_from_cities(output.results, function(cities){
				output.results = cities;

				res.contentType('application/json');
				res.send(JSON.stringify(output));
			})
		} else {
			res.contentType('application/json');
			res.send(JSON.stringify(output));
		}
	});
};

app.get('/api/cities', request_get_cities);

const HOME_LOAD_INTEREST_RATE = 5.5;

var normalize_cities = function(cities){
	return cities.map(function(city){

		city.cost_of_living_index = _.isArray(city.cost_of_living_index) ? city.cost_of_living_index[0] : city.cost_of_living_index;
		city.crime_index_per_year_avg = _.get(city, 'crime_index_per_year_avg');

		if (!(city.crime_index_per_year_avg > 0)){
			city.crime_index_per_year_avg = -999;
		}

		city.weather_ann_tmin_amount = _.get(city, 'weather_station.ann_tmin.amount');
		city.weather_ann_tavg_amount = _.get(city, 'weather_station.ann_tavg.amount');
		city.weather_ann_tmax_amount = _.get(city, 'weather_station.ann_tmax.amount');
		city.weather_winter_tmin_amount = _.get(city, 'weather_station.winter_tmin.amount');
		city.weather_summer_tmax_amount = _.get(city, 'weather_station.summer_tmax.amount');
		city.weather_ann_snow_amount = _.get(city, 'weather_station.ann_snow.amount');
		city.weather_ann_prcp_amount = _.get(city, 'weather_station.ann_prcp.amount');
		city.weather_ann_prcp_avgnds_ge001hi_amount = _.get(city, 'weather_station.ann_prcp_avgnds_ge001hi.amount');
		city.weather_ann_snwd_avgnds_ge001wi_amount = _.get(city, 'weather_station.ann_snwd_avgnds_ge001wi.amount');

		city.republican_10yr_voting_rate = _.get(city, 'republican_10yr_voting_rate');
		city.democratic_10yr_voting_rate = _.get(city, 'democratic_10yr_voting_rate');

		var has_median_household_income = _.has(city, 'median_household_income'),
			has_median_house_value = _.has(city, 'median_house_value'),
			has_house_and_income = has_median_household_income && has_median_house_value;
		
		city.rent_as_percent_of_income = has_median_household_income && _.has(city, 'median_rent') ? city.median_rent / (city.median_household_income / 12) : 0;
		city.years_to_payoff_house_strict = has_house_and_income ? city.median_house_value / city.median_household_income : 0;
		city.years_to_payoff_house_estimated_no_interest = has_house_and_income ? city.median_house_value / (city.median_household_income * 0.25) : 0;
		city.median_house_value_30yr_monthly_payment_at_5_percent_interest = has_median_house_value ? finance.AM(city.median_house_value, HOME_LOAD_INTEREST_RATE, 30, 0) : 0;
		city.median_house_value_15yr_monthly_payment_at_5_percent_interest = has_median_house_value ? finance.AM(city.median_house_value, HOME_LOAD_INTEREST_RATE, 15, 0) : 0;

		if (DEFAULT_CITY_CODE === 'moderate' ){
			delete city.weather_station;
		}

		return city;
	});
};

var request_post_cities = function (req, res) {
	var limit = req.body.limit ? Number(req.body.limit) : 10,
		offset = req.body.offset ? Number(req.body.offset) : 0,
		sort = req.body.sort ? req.body.sort : {},
		find = req.body.find ? req.body.find : {},
		city_name = req.body.city_name ? req.body.city_name : null,
		fields = req.body.fields ? req.body.fields : DEFAULT_CITY_FIELDS,
		field_code = req.query.field_code ? req.query.field_code : null;

	if (field_code) {
		fields = INCLUDED_FIELD_SETS[field_code];
	}

	if (city_name ){
		find.city_name = {
			$regex: new RegExp(city_name, 'i')
		};
	}

	Cities.find(find, fields).limit(limit).skip(offset).sort(sort).lean().exec((error, results) => {
		if (error) {
			res.send(error);
			return;
		}

		var result_count = !results ? 0 : results.length;

		var output = {
			meta: {
				limit: limit,
				offset: offset,
			},
			result_count: result_count,
			results: normalize_cities(results)
		};

		res.contentType('application/json');
		res.send(JSON.stringify(output));
	});
};

app.post('/api/cities', request_post_cities);


// TODO: Proxy API call to ddg to avoid CORS erros
// app.get('api/ddg_answer', function(){})