"use strict";

import Point from "../Point.js";
import Round from "./Round.js";
import BLine from "./Line.js";

const oppositeDirection = direction => ({
    left: "right",
    right: "left",
    top: "bottom",
    bottom: "top"
}[direction]);

export default {
    components: {
        Round,
        BLine
    },
    data: () => ({
        dragging: null,
        offset: new Point(0, 0)
    }),
    methods: {
        drag(e) {
            const {round, offset} = e;
            this.dragging = round;
            this.offset = offset;
        },
        move(e) {
            const dragging = this.dragging;
            if (!dragging) return false;
            let {x, y} = this.offset;
            dragging.pos = new Point(e.pageX - x, e.pageY - y);
        },
        drop(e) {
            const dragging = this.dragging;
            if (!dragging) return false;
            let {x, y} = this.offset;
            dragging.pos = new Point(e.pageX - x, e.pageY - y);
            this.dragging = null;
            this.offset = new Point(0,0);
        },
        create(e) {
            const {createRound, createRelation, relations} = this.$parent;
            const {from, direction} = e;
            if (relations
                .filter(el =>
                    (el.from === from && el.direction === direction) ||
                    (el.to === from && el.direction === oppositeDirection(direction))
                )
                .length !== 0) return;
            const fx = from.pos.x;
            const fy = from.pos.y;
            const [x, y] = {
                top: [fx, fy - 200],
                right: [fx + 200, fy],
                bottom: [fx, fy + 200],
                left: [fx - 200, fy],
            }[direction];
            const to = createRound(x, y);
            createRelation(from, to, direction);
        }
    },
    // language=HTML
    template: `
        <div class="screen" 
             @mousemove="move"
             @mouseup="drop">
            <button @click="$parent.view">View</button>
            <button @click="$parent.edit">Edit</button>
            <button @click="$parent.clear">Clear</button>
            <Round v-for="round in $root.rounds" 
                   v-model="round.selected"
                   :round="round" 
                   :key="round.id"
                   @drag-round="drag"
                   @create="create" />
            <BLine v-for="rel in $root.relations"
                   v-model="rel.selected"
                   :rel="rel" />
        </div>`
};