"use strict";

import Point from "../Point.js";

const diameter = 100;

const Line = {
    props: [
        "rel",
        "selected"
    ],
    model: {
        prop: "selected",
        event: "change"
    },
    methods: {},
    computed: {
        from() {
            const {x, y} = this.rel.from.pos;
            const fx = {
                right: x + diameter,
                left: x,
                top: x + diameter / 2,
                bottom: x + diameter / 2,
            }[this.rel.direction];
            const fy = {
                right: y + diameter / 2,
                left: y + diameter / 2,
                top: y,
                bottom: y + diameter,
            }[this.rel.direction];
            return new Point(fx, fy);
        },
        to() {
            const {x, y} = this.rel.to.pos;
            const tx = {
                right: x,
                left: x + diameter,
                top: x + diameter / 2,
                bottom: x + diameter / 2,
            }[this.rel.direction];
            const ty = {
                right: y + diameter / 2,
                left: y + diameter / 2,
                top: y + diameter,
                bottom: y,
            }[this.rel.direction];
            return new Point(tx, ty);
        },
        style() {
            const dx = this.from.x - this.to.x;
            const dy = this.from.y - this.to.y;
            const width = Math.sqrt(dx ** 2 + dy ** 2);
            const angle = Math.PI + Math.atan2(dy, dx);
            return {
                transform: `rotate(${angle}rad)`,
                width: `${width}px`,
                left: `${this.from.x}px`,
                top: `${this.from.y}px`,
            };
        }
    },
    // language=HTML
    template: `<div :style="style" 
                    class="line" 
                    :class="{selected}"
                    @click="$emit('change', !selected)"></div>`
};

export default Line;