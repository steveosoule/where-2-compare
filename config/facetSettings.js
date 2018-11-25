const generateOutput = function(key) {
    return {
        sum: {
            $sum: key
        },
        max: {
            $max: key
        },
        min: {
            $min: key
        },
        avg: {
            $avg: key
        },
        count: {
            $sum: 1
        }
    };
};

const cities = {
    $facet: {
        state_name: [{
                $group: {
                    _id: '$state_name',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1, _id: -1 }
            }
        ],
        population: [{
            $bucket: {
                groupBy: '$population',
                // https://en.wikipedia.org/wiki/Settlement_hierarchy#Example_of_a_settlement_hierarchy
                boundaries: [0, 100, 1000, 20000, 100000, 300000, 1000000, 3000000, 10000000],
                default: 'Other',
                output: generateOutput('$population')
            }
            // $bucketAuto: {
            // 	groupBy: '$population',
            // 	buckets: 5
            // }
        }],
        median_age: [{
            $bucket: {
                groupBy: '$median_age',
                boundaries: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                output: generateOutput('$median_age')
            }
        }],
        median_household_income: [{
            $bucket: {
                groupBy: '$median_household_income',
                boundaries: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 250000],
                default: 'Other',
                output: generateOutput('$median_household_income')
            }
            // $bucketAuto: {
            // 	groupBy: '$median_household_income',
            // 	buckets: 5
            // }
        }],
        median_house_value: [{
            $bucket: {
                groupBy: '$median_house_value',
                boundaries: [0, 50000, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000],
                default: 'Other',
                output: generateOutput('$median_house_value')
            }
            // $bucketAuto: {
            // 	groupBy: '$median_house_value',
            // 	buckets: 5
            // }
        }],
        median_rent: [{
            $bucket: {
                groupBy: '$median_rent',
                boundaries: [0, 250, 500, 750, 1000, 1250, 1500, 2000, 3000, 4000, 5000],
                default: 'Other',
                output: generateOutput('$median_rent')
            }
        }],
        cost_of_living_index: [{
            $bucket: {
                groupBy: '$cost_of_living_index',
                boundaries: [0, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 200, 300],
                default: 'Other',
                output: generateOutput('$cost_of_living_index')
            }
        }],
        elevation: [{
            $bucket: {
                groupBy: '$elevation',
                boundaries: [-250, 0, 500, 1000, 1500, 5000, 20000],
                default: 'Undefined',
                output: generateOutput('$elevation')
            }
        }],
        square_miles: [{
            $bucket: {
                groupBy: '$square_miles',
                boundaries: [0, 1, 2, 5, 10, 20, 50, 100, 500, 1000],
                default: 'Undefined',
                output: generateOutput('$square_miles')
            }
        }],
        crime_index_per_year_avg: [{
            $bucket: {
                groupBy: '$crime_index_per_year_avg',
                boundaries: [0, 250, 500, 750, 1000, 1500, 2000],
                default: 'Other',
                output: generateOutput('$crime_index_per_year_avg')
            }
            // $bucketAuto: {
            //     groupBy: '$crime_index_per_year_avg',
            //     buckets: 5
            // }
        }],
        natural_disaster_count: [{
            $bucket: {
                groupBy: '$natural_disaster_count',
                boundaries: [0, 3, 5, 10, 15, 20, 25, 30, 50, 100, 200],
                default: 'Other',
                output: generateOutput('$natural_disaster_count')
            }
        }],
        tornado_rate: [{
            $bucket: {
                groupBy: '$tornado_rate',
                boundaries: [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3],
                default: 'Undefined',
                output: generateOutput('$tornado_rate')
            }
        }],
        mortage_real_estate_tax_cost: [{
            $bucketAuto: {
                groupBy: '$mortage_real_estate_tax_cost',
                buckets: 3
            }
        }],
        daytime_population_change_percent: [{
            $bucketAuto: {
                groupBy: '$daytime_population_change_percent',
                buckets: 3
            }
        }],
        live_and_work_in_city_percent: [{
            $bucketAuto: {
                groupBy: '$live_and_work_in_city_percent',
                buckets: 3
            }
        }],
        officers_per_1000: [{
            $bucketAuto: {
                groupBy: '$officers_per_1000',
                buckets: 3
            }
        }],
        tourist_attraction_count: [{
            $bucketAuto: {
                groupBy: '$tourist_attraction_count',
                buckets: 3
            }
        }],
        unemployment_rate: [{
            $bucketAuto: {
                groupBy: '$unemployment_rate',
                buckets: 3
            }
        }],
        population_change_1990s_percent: [{
            $bucketAuto: {
                groupBy: '$population_change_1990s_percent',
                buckets: 3
            }
        }],
        natural_disaster_count: [{
            $bucketAuto: {
                groupBy: '$natural_disaster_count',
                buckets: 3
            }
        }],
        natural_disaster_major_count: [{
            $bucketAuto: {
                groupBy: '$natural_disaster_major_count',
                buckets: 3
            }
        }],
        natural_disaster_emergencies_count: [{
            $bucketAuto: {
                groupBy: '$natural_disaster_emergencies_count',
                buckets: 3
            }
        }],
        air_aqi: [{
            $bucketAuto: {
                groupBy: '$air_aqi',
                buckets: 3
            }
        }],
        healthy_diet_rate: [{
            $bucketAuto: {
                groupBy: '$healthy_diet_rate',
                buckets: 3
            }
        }],
        average_bmi: [{
            $bucketAuto: {
                groupBy: '$average_bmi',
                buckets: 3
            }
        }],
        people_feel_bad_rate: [{
            $bucketAuto: {
                groupBy: '$people_feel_bad_rate',
                buckets: 3
            }
        }],
        general_health_condition: [{
            $bucketAuto: {
                groupBy: '$general_health_condition',
                buckets: 3
            }
        }],
        democratic_10yr_voting_rate: [{
            $bucketAuto: {
                groupBy: '$democratic_10yr_voting_rate',
                buckets: 3
            }
        }],
        republican_10yr_voting_rate: [{
            $bucketAuto: {
                groupBy: '$republican_10yr_voting_rate',
                buckets: 3
            }
        }]
        // TODO: Fix: `unemployment` data
        /* unemployment: [
        	{
        		$bucketAuto: {
        			groupBy: '$unemployment',
        			buckets: 5
        		}
        	}
        ], */
        // TODO: Fix `population_change_1990s_percent` data
        /* population_change_1990s_percent: [{
            $bucket: {
                groupBy: '$population_change_1990s_percent',
                boundaries: [-1000, -500, 0, 500, 1000, 1500, 2000],
                default: 'Other',
                output: generateOutput('$population_change_1990s_percent')
            }
        }] */
    }
};

module.exports = {
    cities: cities
};