// Gpio checkbox vue component 
Vue.component('odd-gpio-check', {
    props: ['button'], 
    template: `
    <div class="odd-gpio-check">
    <label for="button.id" > {{ button.label }} </label> 
    <input type="checkbox" id="button.id" v-bind:disabled="button.disabled">
    </div>
    ` 
});

let vm = new Vue({
    el: '#app', 
    data: {
        buttons : [
            {id: 1, label: "pepe", disabled: false }, 
            {id: 2, label: "toto", disabled: true}
        ]
    }
});