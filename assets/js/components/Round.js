"use strict";

import Sector from "./Sector.js";
import Point from "../Point.js";

const diameter = 100;

const oppositeDirection = direction => ({
    left: "right",
    right: "left",
    top: "bottom",
    bottom: "top"
}[direction]);

const Round = {
    props: [
        "round",
        "selected"
    ],
    model: {
        prop: "selected",
        event: "change"
    },
    components: {
        Sector
    },
    computed: {
        styles() {
            return {
                width: `${diameter}px`,
                height: `${diameter}px`,
                left: `${this.round.pos.x}px`,
                top: `${this.round.pos.y}px`,
            };
        }
    },
    methods: {
        drag(e) {
            this.$emit('drag-round', {
                round: this.round,
                offset: new Point(e.offsetX + 1, e.offsetY + 1)
            });
        },
        create(e) {
            this.$emit('create', {
                from: this.round,
                direction: e
            });
        },
        createRelation(e) {
            /**
             * Именно поэтому и нужно изменить формат связей
             */
            const {rounds, relations, createRelation} = this.$root;
            const roundId = +e.dataTransfer.getData("round_id");
            const direction = e.dataTransfer.getData("direction");
            const round = rounds.find(el => el.id === roundId);
            if (!relations.some(el =>
                (el.from === this.round && el.to === round) ||
                (el.from === round && el.to === this.round) ||
                (el.from === this.round && el.direction === direction) ||
                (el.to === round && el.direction === oppositeDirection(direction)) ||
                (el.from === round && el.direction === direction) ||
                (el.to === this.round && el.direction === oppositeDirection(direction))
            )) createRelation(round, this.round, direction);
        }
    },
    // language=HTML
    template: `
        <div @mousedown.self="drag"
             :style="styles"
             class="round"
             :class="{selected}"
             @click="$emit('change', !selected)"
             @dragover.prevent
             @drop="createRelation">
            <Sector v-for="d in ['top', 'left', 'bottom', 'right']"
                    :direction="d" 
                    :key="d"
                    @create="create"/>
        </div>`,
};

export default Round;