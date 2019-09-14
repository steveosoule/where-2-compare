<template>
    <section class="row">
        <div class="col-12 col-md-12">
            <h1><img src="/favicon.png" class="w2c-logo img-thumbnail"> Where 2 Compare</h1>
            <nav class="btn-group w2c-mobile-nav">
                <router-link to="/map" class="btn btn-sm btn-block btn-secondary">Map</router-link>
                <router-link to="/comparisons" class="btn btn-sm btn-block btn-secondary">Comparisons</router-link>
                <router-link to="/details" class="btn btn-sm btn-block btn-secondary">Details</router-link>
                <!-- <a href="#map" class="btn btn-sm btn-block btn-secondary">Map</a>
                <a href="#filters" class="btn btn-sm btn-block btn-secondary">Filters</a>
                <a href="#list" class="btn btn-sm btn-block btn-secondary">List</a> -->
                <!-- <a href="#detail" class="btn btn-sm btn-block btn-secondary" v-bind:class="{ disabled: !selected_city }">Detail</a>
                <a href="#compare" class="btn btn-sm btn-block btn-secondary" v-bind:class="{ disabled: !sorted_compared_cities_from_ids.length }">Compare</a>
                <a href="#compare-scroll" class="btn btn-sm btn-block btn-secondary" v-bind:class="{ disabled: !sorted_compared_cities_from_ids_grid.length }">Compare Scroll</a>-->
            </nav>
        </div>
    </section>
</template>