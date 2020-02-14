"use strict";

const diameter = 100;

const Sector = {
    props: [
        "direction",
    ],
    methods: {
        async dragStart(e) {
            e.dataTransfer.setData('round_id', this.$parent.round.id);
            e.dataTransfer.setData('direction', this.direction);
        }
    },
    computed: {
        deg() {
            return {top: -45, right: 45, bottom: 135, left: -135}[this.direction];
        },
        val() {
            return {top: 1, right: 2, bottom: 3, left: 4}[this.direction];
        },
        style() {
            return {
                width: `${diameter / 2}px`,
                height: `${diameter / 2}px`,
                transform: `rotate(${this.deg}deg)`,
                zIndex: this.$root.draggableSectors ? 1 : -1
            };
        },
        valStyle() {
            return {
                transform: `rotate(${-this.deg}deg)`,
            };
        }
    },
    // language=HTML
    template: `
        <div draggable="true"
             :style="style"
             class="sector"
             @dragover.stop
             @dragstart="dragStart"
             @click="$emit('create', direction)">
            <span :style="valStyle">{{ val }}</span>
        </div>`
};

export default Sector;