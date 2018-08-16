const ODD_GPIO = [
    {id: 1, label: "3V3", disabled:true}, 
    {id: 3, label: "GIPO2", disabled:false},
    {id: 5, label: "GIPO3", disabled:false}, 
    {id: 7, label: "GIPO4", disabled:false},
    {id: 9, label: "GND", disabled:true},
    {id: 11, label: "GIPO17", disabled:false},
    {id: 13, label: "GIPO27", disabled:false},
    {id: 15, label: "GPIO22", disabled:false},
    {id: 17, label: "3V3", disabled:true},
    {id: 19, label: "GPIO10", disabled:false},
    {id: 21, label: "GPIO9", disabled:false},
    {id: 23, label: "GPIO11", disabled:false},
    {id: 25, label: "GND", disabled:true},
    {id: 27, label: "GPIO0", disabled:false},
    {id: 29, label: "GPIO5", disabled:false},
    {id: 31, label: "GPIO6", disabled:false},
    {id: 33, label: "GPIO13", disabled:false},
    {id: 35, label: "GPIO19", disabled:false},
    {id: 37, label: "GPIO26", disabled:false},
    {id: 39, label: "GND", disabled:true},
];



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
    <input type="checkbox" id="button.id" v-bind:disabled="button.disabled">
    <label for="button.id" > {{ button.label }} </label> 
    </div>
    ` 
});

let vm = new Vue({
    el: '#app', 
    data: {
        odd_buttons : ODD_GPIO, 

        even_buttons : [
            {id: 3, label: "pru", disabled: false }, 
            {id: 4, label: "tyao", disabled: true}
        ]
    }
});