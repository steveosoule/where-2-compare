// TODO: Zipcode Shape Basis: https://gist.github.com/jefffriesen/6892860
// TODO: ScaleSequential d3.interpolatePlasma https://d3indepth.com/scales/
// TODO: Use webpack
// TODO: Add more facets & details
// TODO: Preference match, score, & display
// TODO: Search near city
// TODO: Search similar cities
// TODO: Fix multi-facet filtering
// TODO: Optimize  UI
// TODO: Leaflet map visualization

let _ = window._;
let axios = window.axios;
let Vue = window.Vue;
let d3 = window.d3;
let topojson = window.topojson;

Vue.filter('percentage', function (value, decimals) {
    if (!value) value = 0;
    if (!decimals) decimals = 0;

    value = value * 100;
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + '%';
});

Vue.filter('numeric', function (value) {
    return Number(value).toLocaleString();
});

Vue.filter('snake_to_title', function (str) {
    str = str.toLowerCase().split('_');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
});

var JSON_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
};

var KEYS_TO_KEEP = ['population', 'population_male', 'population_male_percent', 'population_female', 'population_female_percent', 'median_age', 'median_age_state', 'median_household_income', 'median_household_income_state', 'median_house_value', 'median_house_value_state', 'median_rent', 'cost_of_living_index', 'city_guide_toal_count', 'elevation', 'square_miles', 'foreign_born_percent', 'foreign_born_percent_state', 'mortage_real_estate_tax_cost', 'mortage_real_estate_tax_percent', 'no_mortage_real_estate_tax_cost', 'no_mortage_real_estate_tax_percent', 'latitude', 'longitude', 'daytime_population_change_amount', 'daytime_population_change_percent', 'live_and_work_in_city_amount', 'live_and_work_in_city_percent', 'police_officer_count', 'officer_count', 'officers_per_1000', 'officers_per_1000_state', 'city_wikipedia_profile_link', 'tourist_attraction_count', 'unemployment_rate', 'unemployment_rate_state', 'population_change_1990s_count', 'population_change_1990s_percent', 'earthquakes_likelyhood', 'natural_disaster_count', 'natural_disaster_major_count', 'natural_disaster_emergencies_count', 'hospital_count', 'airport_count', 'amtrak_count', 'neighborhood_count', 'air_aqi', 'air_co', 'air_no2', 'air_so2', 'air_ozone', 'air_pm10', 'air_pm25', 'air_pb', 'healthy_diet_rate', 'healthy_teeth_rate', 'average_bmi', 'people_feel_bad_rate', 'people_not_drinking_alcohol', 'average_hours_of_sleep', 'overweight_people', 'general_health_condition', 'average_condition_of_hearing', 'democratic_10yr_voting_rate', 'republican_10yr_voting_rate', 'other_10yr_voting_rate', 'weather_station_id', 'weather_ann_tmin_amount', 'weather_ann_tavg_amount', 'weather_ann_tmax_amount', 'weather_winter_tmin_amount', 'weather_summer_tmax_amount', 'weather_ann_prcp_amount', 'weather_ann_prcp_avgnds_ge001hi_amount'];
var RED_YELLOW_GREEN_COLOR_RANGE = ['#FF0000', '#FF3300', '#ff6600', '#ff9900', '#FFCC00', '#FFFF00', '#ccff00', '#99ff00', '#66ff00', '#33ff00', '#00FF00'];
var BLUE_TO_RED_COLOR_RANGE = ['#1f00dd', '#0038da', '#008ed7', '#00d4c6', '#00d170', '#00ce1b', '#35cb00', '#85c800', '#c5b700', '#c26700', '#bf1800'];

var AXIOS_CONFIG_JSON = {
    headers: JSON_HEADERS
};

var slugify = function (text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};


window.vm = new Vue({
    el: '#app',
    data: {
        // app: data
        loading: false,
        cities: null,
        facets: null,

        app_config: {
            enable_weather_images: false
        },

        color_method_options: ['stat', 'preferences', 'party', 'none'],
        color_method: 'stat',
        color_stat: 'cost_of_living_index',
        color_scale: null,
        d3_color_range: d3.scaleLinear().domain(d3.ticks(0, 1, 10)).range(['#999999', '#8BA28B', '#7DAC7D', '#6FB56F', '#61BE61', '#53C753', '#46D146', '#38DA38', '#2AE32A', '#1CEC1C', '#0EF60E', '#00FF00']),


        // app: selections
        selected_city: null,
        detailed_selected_city: null,
        selected_city_duckduckgo_answer: null,
        compared_cities: [],

        // app: search API
        search_city_name: null,
        search_limit: 100,
        search_limit_max: 1000,
        search_offset: 0,
        primary_stats: {},
        // search_sort_prop_options: ['population', 'square_miles', 'elevation', 'cost_of_living_index', 'crime_index_per_year_avg', 'median_household_income', 'median_house_value', 'republican_10yr_voting_rate', 'democratic_10yr_voting_rate'],
        search_sort_prop: 'population',
        search_sort_dir_options: ['asc', 'desc'],
        search_sort_dir: 'desc',

        field_code: 'core',
        field_codes: ['core', 'moderate', 'main', 'all'],

        // app: filter on-page
        filter_query: null,
        filter_limit: 50,
        filter_offset: 0,

        // svg
        svg: null,
        svg_width: 1110,
        svg_height: 500,
        radius_method_options: ['population', 'square_miles', 'none'],
        radius_method: 'population',

        // d3
        projection: null,
        path: null
    },
    beforeMount: function () {
        this.load_compared_cities();
        this.load_user_settings();
    },
    mounted: function () {
        this.init();
    },
    created: function () {
        this.load_cities_from_api_debounced = _.debounce(this.load_cities_from_api, 750);
    },
    watch: {
        max_city_stat: {
            handler: function () {
                var self = this;
                
                // https://d3indepth.com/scales/
                // consider: sacelLinear, scaleQuantize, scaleQuantile and scaleThreshold
                self.color_scale = d3.scaleQuantile().domain(d3.ticks(self.min_city_stat, self.max_city_stat, 11)).range(BLUE_TO_RED_COLOR_RANGE);
            }
        },
        post_data: {
            handler: function () {
                this.load_cities();
            },
            deep: true
        },
        compared_cities: function () {
            var simplified_compared_cities = this.compared_cities.map(function (city) {
                delete city.props;
                return city;
            });
            localStorage.setItem('compared_cities', JSON.stringify(simplified_compared_cities));
        },
        user_settings: function () {
            localStorage.setItem('user_settings', JSON.stringify(this.user_settings));
        },
        selected_city: function (selected_city) {
            this.load_duckduckgo_for_selected_city(selected_city);
            this.load_detailed_selected_city(selected_city);
        },
        filters: {
            handler: function () {
                this.load_cities();
            },
            deep: true
        }
    },
    computed: {
        user_settings: function () {
            return {
                search_city_name: this.search_city_name,
                search_limit: this.search_limit,
                search_sort_prop: this.search_sort_prop,
                search_sort_dir: this.search_sort_dir,
                filter_query: this.filter_query,
                radius_method: this.radius_method,
                color_method: this.color_method,
                color_stat: this.color_stat,
                field_code: this.field_code
            };
        },
        color_stats: function () {
            var self = this;

            var city = _.first(self.cities);

            if (!city) return self.primary_stats;

            var city_keys = Object.keys(city),
                color_stats = {};

            _.forEach(self.primary_stats, function (value, key) {
                if (city_keys.indexOf(key) > -1) {
                    color_stats[key] = value;
                }
            });

            return color_stats;
        },
        search_sort_prop_options: function () {
            if (!this.primary_stats) return [];
            var sort_keys = [];
            for (var key in this.primary_stats) {
                if (this.primary_stats.hasOwnProperty(key)) {
                    var stat = this.primary_stats[key];
                    if (stat.sortable) {
                        sort_keys.push(key);
                    }
                }
            }
            return sort_keys;
        },
        preferences: function () {
            if (!this.mapped_facets) return [];
            return this.mapped_facets.reduce(function (preferences, facet) {
                facet.values.forEach(function (value) {
                    if (value.is_preference) {
                        value.facet_code = facet.code;
                        preferences.push(value);
                    }
                });
                return preferences;
            }, []);
        },
        filters: function () {
            var filters = [];
            if (!this.mapped_facets) return filters;
            this.mapped_facets.forEach(function (facet) {
                facet.values.forEach(function (value) {
                    if (value.is_filter) {
                        value.facet_code = facet.code;
                        filters.push(value);
                    }
                });
            });
            return filters;
        },
        sorted_compared_cities: function () {
            var self = this;
            return this.compared_cities.sort(self.single_sort);
        },
        filtered_cities: function () {
            var self = this;
            if (!self.mapped_cities) {
                return;
            }

            var offset = self.filter_offset,
                limit = self.filter_offset + self.filter_limit;

            var filter_query = new RegExp(self.filter_query, 'i');
            return self.mapped_cities.filter(function (city) {
                if (self.filter_query) {
                    return filter_query.test(city.city_name) || filter_query.test(city.state_name);
                } else {
                    return true;
                }
            }).sort(self.single_sort).slice(offset, limit);
        },
        max_city_stat: function () {
            var self = this;

            if (self.color_method !== 'stat' || !self.color_stat || !self.cities) {
                return;
            }

            return self.cities.reduce(function (max, city) {
                var city_color_stat = city[self.color_stat];
                if (city_color_stat > max) {
                    max = city_color_stat;
                }
                return max;
            }, 0);
        },
        min_city_stat: function () {
            var self = this;

            if (self.color_method !== 'stat' || !self.color_stat || !self.cities) {
                return;
            }

            var min = self.cities.reduce(function (min, city) {
                var city_color_stat = city[self.color_stat];
                if (city_color_stat < min) {
                    min = city_color_stat;
                }
                return min;
            }, Infinity);

            if (min === Infinity) {
                min = 0;
            }

            return min;
        },
        mapped_cities: function () {
            var self = this;
            if (!self.cities) return [];
            return self.cities.map(function (city) {

                city.color = self.determine_city_color(city);
                city.svg_stroke = self.determine_city_stroke(city);
                city.svg_radius = self.determine_city_radius(city);

                // TODO: Move to API
                city.indeed_link = 'https://www.indeed.com/jobs?l=' + encodeURIComponent(city.city_name + ', ' + city.state_abbr); // TODO: add `&q=` for user's job title
                city.zillow_link = 'https://www.zillow.com/homes/' + slugify(city.city_name + ', ' + city.state_abbr) + '/';
                city.zillow_iframe = 'https://www.zillow.com/widgets/search/LargeSearchBoxWidget.htm?did=zillow-large-search-box-iframe-widget&type=iframe&rgname=' + encodeURIComponent(city.city_name + ' ' + city.state_abbr) + '&shvi=yes';
                city.realtor_link = 'https://www.realtor.com/realestateandhomes-search/' + slugify(city.city_name) + '_' + city.state_abbr;
                city.duckduckgo_attribution_link = 'https://duckduckgo.com/?t=where-2-compare&q=' + encodeURIComponent(city.city_name + ' ' + city.state_name);

                city.svg_transform = 'translate(' + self.projection(city.location.coordinates) + ')';
                return city;
            });
        },
        mapped_facets: function () {
            var self = this;
            if (!self.facets) return [];
            return self.facets.map(function (facet) {
                facet.values = facet.values.map(function (value) {
                    if (value.percent) {
                        value.formatted_percent = Math.round(value.percent * 100) + '%';
                    }
                    return value;
                });
                return facet;
            });
        },
        post_data: function () {
            var city_name = this.search_city_name ? this.search_city_name : null,
                sort = this.search_sort || null,
                sort_prop = this.search_sort_prop || null,
                sort_dir = this.search_sort_dir || null,
                limit = Number(this.search_limit || 500),
                offset = Number(this.search_offset || 0),
                field_code = this.field_code || 'core';

            if (limit > this.search_limit_max) {
                offset = 0;
                sort_prop = null;
                sort_dir = null;
            }

            if (!sort && sort_prop && sort_dir) {
                sort = {};
                sort[sort_prop] = sort_dir;
            }

            return {
                city_name: city_name,
                sort: sort,
                limit: limit,
                offset: offset,
                field_code: field_code
            };
        }
    },
    methods: {
        init: function () {
            this.prepare_svg();
            this.draw_states();
            this.load_primary_stats();
            this.load_cities();
            this.load_facets();
        },
        prepare_svg: function () {
            var self = this;

            // Set Projection
            self.projection = d3.geoMercator();

            // Create Path Variable
            self.path = d3.geoPath().projection(self.projection);

            // SVG
            self.svg = d3.select('svg')
                .attr('width', self.svg_width)
                .attr('height', self.svg_height);

            // set projection parameters
            self.projection
                .scale(900)
                .center([-101, 38]);
        },
        draw_states: function () {

            var self = this;

            d3.json('/json/us.json', function (error, topo) {

                var states = topojson.feature(topo, topo.objects.states).features;

                // add states from topojson
                self.svg.select('.svg-map')
                    .append('g')
                    .attr('class', 'svg-states')
                    .selectAll('path')
                    .data(states).enter()
                    .append('path')
                    .attr('class', 'feature')
                    .attr('d', self.path);

                // put boarder around states
                self.svg.select('.svg-map')
                    .append('g')
                    .attr('class', 'svg-state-boarders')
                    .append('path')
                    .datum(topojson.mesh(topo, topo.objects.states, function (a, b) {
                        return a !== b;
                    }))
                    .attr('class', 'mesh')
                    .attr('d', self.path);

            });
        },
        load_cities: function () {
            this.loading = true;
            this.load_cities_from_api_debounced();
        },
        load_primary_stats: function () {
            var self = this;
            axios.get('/json/primary-stats.json').then(function (response) {
                self.primary_stats = response.data;
            });
        },
        load_cities_from_json: function () {
            var self = this;
            axios.get('/json/cities__moderate--all.json').then(function (response) {
                self.loading = false;
                self.cities = response.data.results;
            });
        },
        generate_post_data: function () {
            var self = this;
            var post_data = self.post_data ? _.clone(self.post_data, true) : {};
            post_data.find = this.filters.reduce(function (find, filter) {
                if (typeof filter._id === 'number') {
                    if (filter.min && filter.max)
                        // TODO: let this work for multiples of the same filter.facet_code
                        find[filter.facet_code] = {
                            $gte: filter.min,
                            $lte: filter.max
                        };
                } else if (typeof filter._id === 'string') {
                    if (typeof find[filter.facet_code] === undefined) {
                        find[filter.facet_code] = filter._id;
                    } else {
                        delete find[filter.facet_code];
                        if (!find.$or) {
                            find.$or = [];
                        }
                        var this_find = {};
                        this_find[filter.facet_code] = filter._id;
                        find.$or.push(this_find);
                    }
                }
                return find;
            }, {});
            return post_data;
        },
        load_cities_from_api: function () {
            var self = this;
            var post_data = self.generate_post_data();

            axios.post('/api/cities?field_code=' + post_data.field_code, post_data, AXIOS_CONFIG_JSON).then(function (response) {
                self.loading = false;
                self.cities = response.data.results;
            });
        },
        load_facets: function () {
            this.load_facets_from_api();
        },
        load_facets_from_api: function () {
            var self = this;
            axios.get('/api/facets').then(function (response) {
                self.facets = response.data.results;
            });
        },
        determine_city_color: function (city) {
            var self = this,
                color = 'black';
            if (self.color_method === 'party') {
                if (!city.democratic_10yr_voting_rate || !city.republican_10yr_voting_rate) {
                    return color;
                }
                color = city.democratic_10yr_voting_rate > city.republican_10yr_voting_rate ? 'blue' : 'red';
            } else if (self.color_method === 'preferences') {
                var match_count = 0,
                    unique_preference_codes = [];

                self.preferences.forEach(function (preference) {
                    // TODO: Optimize this by caching it & not doing it per city
                    if (unique_preference_codes.indexOf(preference.facet_code) === -1) {
                        unique_preference_codes.push(preference.facet_code);
                    }

                    var matches = false,
                        city_preference_value = city[preference.facet_code];

                    if (preference.min && preference.max) {
                        matches = city_preference_value >= preference.min && city_preference_value <= preference.max ? true : false;
                    } else {
                        matches = preference._id === city_preference_value ? true : false;
                    }

                    if (matches) {
                        match_count++;
                    }
                });
                var match_rate = match_count / unique_preference_codes.length;
                color = match_rate > 0 ? 'rgba(0,128,0,' + match_rate + ')' : 'rgba(0,0,0,0.1)';
            } else if (self.color_method === 'stat') {
                if (self.color_scale) {
                    color = self.color_scale(city[self.color_stat]);
                }
            }

            return color;
        },
        determine_city_stroke: function (city) {
            return this.compared_cities.find(function (compared) {
                return city._id == compared._id ? 'white' : '';
            });
        },
        determine_city_radius: function (city) {
            var radius;
            // By Square Miles
            if (this.radius_method === 'square_miles') {
                if (city.square_miles) {
                    radius = Math.sqrt((city.square_miles * 0.3) / Math.PI);
                    return radius + 'px';
                } else {
                    return '2px';
                }
            }

            // By Population
            else if (this.radius_method === 'population') {
                if (city.population) {
                    radius = Math.sqrt((city.population * 0.0005) / Math.PI);
                    return radius + 'px';
                } else {
                    return '2px';
                }
            }
            // None
            else {
                return '2px';
            }


        },
        select_city: function (city) {
            this.selected_city = city;
        },
        load_compared_cities: function () {
            // TODO: only save city ids and reload them from server
            var cities = JSON.parse(localStorage.getItem('compared_cities'));
            if (cities) {
                this.compared_cities = cities.sort(this.single_sort);
            }
        },
        load_user_settings: function () {
            var settings = JSON.parse(localStorage.getItem('user_settings'));
            if (settings) {
                this.search_city_name = settings.search_city_name;
                this.search_limit = settings.search_limit;
                this.search_sort_prop = settings.search_sort_prop;
                this.search_sort_dir = settings.search_sort_dir;
                this.filter_query = settings.filter_query;
                this.radius_method = settings.radius_method;
                this.color_method = settings.color_method;
                this.color_stat = settings.color_stat;
                this.field_code = settings.field_code;
            }
        },
        toggle_compare_city: function (selected_city) {
            var found_index = this.compared_cities.findIndex(function (city) {
                return city._id === selected_city._id;
            });

            if (found_index > -1) {
                this.compared_cities.splice(found_index, 1);
            } else {
                this.compared_cities.push(selected_city);
            }
        },
        add_compare_city: function (selected_city) {
            var found_index = this.compared_cities.findIndex(function (city) {
                return city._id === selected_city._id;
            });

            if (found_index === -1) {
                this.compared_cities.push(selected_city);
            }
        },
        single_sort: function (a, b) {
            if (this.search_sort_dir === 'desc') {
                return b[this.search_sort_prop] - a[this.search_sort_prop];
            } else {
                return a[this.search_sort_prop] - b[this.search_sort_prop];
            }
        },
        set_search_sort_prop: function (search_sort_prop) {
            this.search_sort_prop = search_sort_prop;
            if (this.search_sort_prop === search_sort_prop) {
                this.search_sort_dir = this.search_sort_dir === 'asc' ? 'desc' : 'asc';
            }
        },
        load_duckduckgo_for_selected_city: function (selected_city) {
            var self = this;
            if (!selected_city) {
                self.selected_city_duckduckgo_answer = null;
            }

            // https://duckduckgo.com/api
            axios.get('https://api.duckduckgo.com/', {
                params: {
                    t: 'where-2-compare',
                    q: selected_city.city_name + ', ' + selected_city.state_abbr,
                    format: 'json'
                },
                heeader: JSON_HEADERS
            }).then(function (response) {
                self.selected_city_duckduckgo_answer = response.data;
            }).catch(function () {
                self.selected_city_duckduckgo_answer = null;
            });
        },
        load_detailed_selected_city: function (selected_city) {
            var self = this;
            if (!selected_city) {
                self.detailed_selected_city = null;
            }

            axios.get('/api/cities', {
                params: {
                    field_code: 'all',
                    find: {
                        _id: selected_city._id
                    }
                },
                heeader: JSON_HEADERS
            }).then(function (response) {
                if (response.data.result_count === 1) {
                    var data = _.clone(response.data.results[0]);

                    data.props = _.clone(response.data.results[0]);

                    for (var key in data) {
                        if (KEYS_TO_KEEP.indexOf(key) === -1 || typeof data[key] === 'undefined') {
                            delete data.props[key];
                        }
                    }
                    self.detailed_selected_city = data;
                } else {
                    self.detailed_selected_city = null;
                }
            }).catch(function () {
                self.detailed_selected_city = null;
            });
        }
    }
});