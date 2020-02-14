"use strict";

import Slide from "./Slide.js";

const TheView = {
    props: ["direction", "slide"],
    components: {
        Slide
    },
    // language=HTML
    template: `
        <transition :name="direction">
            <slide :slide="slide.slide" :key="slide.id"></slide>
        </transition>`
};

export default TheView;