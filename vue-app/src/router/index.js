import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import CityList from '@/components/CityList';
import MyMap from '@/components/Map';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/cities',
            name: 'CityList',
            component: CityList
        },
        {
            path: '/map',
            name: 'Map',
            component: MyMap
        }
        /* {
            path: '/cities/:city',
            name: 'City',
            component: City
        } */
    ]
});