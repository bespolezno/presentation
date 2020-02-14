"use strict";

let editor = null;

const TheEditor = {
    async mounted() {
        editor = await ClassicEditor.create(this.$refs.editor);
        editor.setData(this.$parent.editSlide.slide);
    },
    async beforeDestroy() {
        editor.destroy();
    },
    methods: {
        save() {
            this.$emit('save-slide', editor.getData());
        }
    },
    // language=HTML
    template: `
        <div>
            <div ref="editor"></div>
            <button @click="save">Save</button>
        </div>`
};

export default TheEditor;