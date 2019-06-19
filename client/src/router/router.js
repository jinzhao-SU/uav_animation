import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import Slide from '@/components/slide'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/:index',
            name: 'Map',
            components: {
                main: Map,
                sidepanel: Slide,
            }
        },
        {
            path: '/',
            name: 'Map',
            components: {
                main: Map,
                sidepanel: Slide,
            }
        },
    ]
})