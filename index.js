// GPIO CHECKBOX COMPONENTS 
Vue.component('odd-gpio-check', {
    props: ['button'], 
    template: `
    <div class="odd-gpio-check">
    <label for="button.id" > {{ button.label }} </label> 
    <input type="checkbox" id="button.id" v-bind:disabled="button.disabled">
    </div>
    ` 
});

Vue.component('even-gpio-check', {
    props: ['button'], 
    template: `
    <div class="even-gpio-check">
    <label for="button.id" > {{ button.label }} </label> 
    <input type="checkbox" id="button.id" v-bind:disabled="button.disabled">
    </div>
    ` 
});

let vm = new Vue({
    el: '#app', 
    data: {
        odd_buttons : [
            {id: 1, label: "pepe", disabled: false }, 
            {id: 2, label: "toto", disabled: true}
        ], 

        even_buttons : [
            {id: 3, label: "pru", disabled: false }, 
            {id: 4, label: "tyao", disabled: true}
        ]
    }
});