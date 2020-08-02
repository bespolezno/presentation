"use strict";

import Vue from "./vue.esm.js";
import Point from "./Point.js";
import TheRoute from "./components/TheRoute.js";
import TheEditor from "./components/TheEditor.js";
import TheView from "./components/TheView.js";

let counter = localStorage.getItem("counter") || 2;

const oppositeDirection = direction => ({
    left: "right",
    right: "left",
    top: "bottom",
    bottom: "top"
}[direction]);

const rounds = JSON.parse(localStorage.getItem("rounds")) || [
    {
        pos: new Point(100, 200),
        slide: "<h1>Root slide</h1>",
        selected: false,
        id: 1
    },
];
rounds.forEach(el => el.selected = false);
/**
 * В следующий раз выдать всем секторам уникальные идентификаторы для связи в формате [1, 7],
 * где 1 - правый сектор 0 круга, 7 - левый сектор 1 круга.
 * Стороны вычислять по формуле d = x % 4,
 * где d - номер стороны(0 - верх, 1 - право, 2- низ, 3 - лево),
 * x - идентификатор сектора.
 */
const rel = JSON.parse(localStorage.getItem("relations"));
const relations = rel ? rel.map(el => ({
    ...el,
    from: rounds.find(r => r.id === el.from),
    to: rounds.find(r => r.id === el.to),
})) : [];

const data = {
    rounds,
    relations,
    mode: TheRoute,
    draggableSectors: false,
    editSlide: null,
    currentSlide: rounds[0],
    direction: "right"
};

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.config.silent = true;

window.app = new Vue({
    el: "#app",
    data,
    components: {
        TheRoute,
        TheEditor,
        TheView
    },
    methods: {
        createRound(x, y) {
            const round = {
                pos: new Point(x, y),
                slide: `<h1>slide ${counter}</h1>`,
                id: counter++,
                selected: false
            };
            this.rounds.push(round);
            this.saveData();
            return round;
        },
        createRelation(from, to, direction) {
            this.relations.push({from, to, direction, selected: false});
            this.saveData();
        },
        deleteRound(round) {
            if (round.id === 1) return;
            relations
                .filter(el => el.from === round || el.to === round)
                .forEach(el => this.deleteRelation(el));
            rounds.splice(rounds.indexOf(round), 1);
        },
        deleteRelation(relation) {
            relations.splice(relations.indexOf(relation), 1);
        },
        delete() {
            rounds
                .filter(el => el.selected)
                .forEach(el => this.deleteRound(el));
            relations
                .filter(el => el.selected)
                .forEach(el => this.deleteRelation(el));
            this.saveData();
        },
        edit() {
            const slide = rounds.filter(el => el.selected)[0];
            if (!slide) return;
            this.editSlide = slide;
            this.mode = TheEditor;
        },
        view() {
            this.currentSlide = rounds.find(el => el.id === 1);
            this.mode = TheView;
        },
        route() {
            this.mode = TheRoute;
        },
        saveSlide(e) {
            this.editSlide.slide = e;
            this.mode = TheRoute;
            this.editSlide = null;
            this.saveData();
        },
        changeSlide(direction) {
            if (this.mode !== TheView) return;
            const rel = relations.find(el =>
                (el.from === this.currentSlide && el.direction === direction)  ||
                (el.to === this.currentSlide && el.direction === oppositeDirection(direction)));
            if (!rel) return;
            this.direction = direction;
            this.currentSlide = rel.from === this.currentSlide ? rel.to : rel.from;
        },
        saveData() {
            localStorage.setItem("rounds", JSON.stringify(rounds));
            localStorage.setItem("relations", JSON.stringify(relations.map(el => ({
                ...el,
                from: el.from.id,
                to: el.to.id,
            }))));
            localStorage.setItem("counter", counter);
        },
        clear() {
            localStorage.clear();
            window.location.reload();
        }
    },
    mounted() {
        addEventListener("keydown", ({key}) => {
            if (key === "Shift") this.draggableSectors = true;

            const method = {
                "Delete": this.delete,
                "ArrowUp": this.changeSlide.bind(this, "top"),
                "ArrowRight": this.changeSlide.bind(this, "right"),
                "ArrowDown": this.changeSlide.bind(this, "bottom"),
                "ArrowLeft": this.changeSlide.bind(this, "left"),
                1: this.changeSlide.bind(this, "top"),
                2: this.changeSlide.bind(this, "right"),
                3: this.changeSlide.bind(this, "bottom"),
                4: this.changeSlide.bind(this, "left"),
                "Escape": this.route
            }[key] || (() => {});
            method();
        });
        addEventListener("keyup", ({key}) => {
            if (key === "Shift") this.draggableSectors = false;
        });
    }
});