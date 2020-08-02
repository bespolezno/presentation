"use strict";

import Slide from "./Slide.js";

const TheView = {
    props: ["direction", "slide"],
    components: {
        Slide
    },
    // language=HTML
    template: `<div>
        <transition :name="direction">
            <slide :slide="slide.slide" :key="slide.id"></slide>
        </transition>
    </div>`
};

export default TheView;