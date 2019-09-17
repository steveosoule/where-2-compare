<template>
  <section class="map">
    <h2>Map</h2>
	<div class="svg-wrapper">
		<svg width="960" height="600">
			<g class="svg-map"></g>
			<!-- <g class="svg-cities">
				<circle
					class="svg-point"
					v-for="city in mapped_cities"
					:key="city._id"
					v-bind:title="city.city_name"
					v-bind:fill="city.color"
					v-bind:r="city.svg_radius"
					v-bind:stroke="city.svg_stroke"
					v-bind:transform="city.svg_transform"
					v-on:click="select_city(city)">
				</circle>
			</g> -->
		</svg>
		<!-- <p show variant="info" v-show="loading" class="svg-loading">
			<span class="fa fa-cog fa-spin fa-fw"></span> Loading...
		</p> -->
	</div>
  </section>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson-client'

export default {
	created() {
    
	},
	data(){
		return {
			// svg
			svg: null,
			svg_width: 1110,
			svg_height: 500,
			radius_method_options: ['population', 'square_miles', 'none'],
			radius_method: 'population',

			// d3
			projection: null,
			path: null
		}
	},
	mounted: function () {
        this.init();
    },
	methods: {
		init(){
			this.prepare_svg();
			this.draw_states();
		},
		prepare_svg() {
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

			d3.json('json/us.json').then(function(topo){
				var states = topojson.feature(topo, topo.objects.counties).features;

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
	}
}
</script>
