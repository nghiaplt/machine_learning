import DetectEverything from "./components/DetectEverything.vue";
import DetectCar from "./components/DetectCar.vue";

import { CAR_URL, EVERY_THING_URL, FOOTBALL_URL } from "./env"

export default [
    {
        path: "/",
        name: 'detect_everything',
        component: DetectEverything,
        meta: {
            detectUrl: EVERY_THING_URL
        }
    },
    {
        path: "/detect-everything",
        name: 'detect_everything',
        component: DetectEverything,
        meta: {
            detectUrl: EVERY_THING_URL
        }
    },
    {
        path: "/detect-car",
        name: 'detect_car',
        component: DetectEverything,
        meta: {
            detectUrl: CAR_URL
        }
    },
    {
        path: "/detect-football",
        name: 'detect_football',
        component: DetectEverything,
        meta: {
            detectUrl: FOOTBALL_URL
        }
    }
];