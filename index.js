/**
 * GPIO arrays for the template
 * 
 */
const ODD_GPIO = [
    {id: 1, label: "3V3", disabled:true, value:"1"}, 
    {id: 3, label: "GIPO2", disabled:false, value:"3"},
    {id: 5, label: "GIPO3", disabled:false, value:"5"}, 
    {id: 7, label: "GIPO4", disabled:false, value:"7"},
    {id: 9, label: "GND", disabled:true, value:"9"},
    {id: 11, label: "GIPO17", disabled:false, value:"11"},
    {id: 13, label: "GIPO27", disabled:false, value:"13"},
    {id: 15, label: "GPIO22", disabled:false, value:"15"},
    {id: 17, label: "3V3", disabled:true, value:"17"},
    {id: 19, label: "GPIO10", disabled:false, value:"19"},
    {id: 21, label: "GPIO9", disabled:false, value:"21"},
    {id: 23, label: "GPIO11", disabled:false, value:"23"},
    {id: 25, label: "GND", disabled:true, value:"25"},
    {id: 27, label: "GPIO0", disabled:false, value:"27"},
    {id: 29, label: "GPIO5", disabled:false, value:"29"},
    {id: 31, label: "GPIO6", disabled:false, value:"31"},
    {id: 33, label: "GPIO13", disabled:false, value:"33"},
    {id: 35, label: "GPIO19", disabled:false, value:"35"},
    {id: 37, label: "GPIO26", disabled:false, value:"37"},
    {id: 39, label: "GND", disabled:true, value:"39"},
];

const EVEN_GPIO = [
    {id: 2, label:"5V", disabled:true, value:"2"},
    {id: 4, label:"5V", disabled:true, value:"4"},
    {id: 6, label:"GND", disabled:true, value:"6"},
    {id: 8, label:"GPIO14", disabled:false, value:"8"},
    {id: 10,label:"GPIO15", disabled:false, value:"10"},
    {id: 12, label:"GPIO18", disabled:false, value:"12"},
    {id: 14,label:"GND", disabled:true, value:"14"},
    {id: 16,label:"GPIO23", disabled:false, value:"16"},
    {id: 18,label:"GPIO24", disabled:false, value:"18"},
    {id: 20,label:"GND", disabled:true, value:"20"},
    {id: 22,label:"GPIO25", disabled:false, value:"22"},
    {id: 24,label:"GPIO8", disabled:false, value:"24"},
    {id: 26,label:"GPIO7", disabled:false, value:"26"},
    {id: 28,label:"GPIO1", disabled:false, value:"28"},
    {id: 30,label:"GND", disabled:true, value:"30"},
    {id: 32,label:"GPIO12", disabled:false, value:"32"},
    {id: 34,label:"GND", disabled:true, value:"34"},
    {id: 36,label:"GPIO16", disabled:false, value:"36"},
    {id: 38,label:"GPIO20", disabled:false, value:"38"},
    {id: 40,label:"GPIO21", disabled:false, value:"40"},
    
]

/**
 * GPIO CHEKBOX COMPONENTS 
 */
Vue.component('odd-gpio-check', {
    props: ['button'], 
    template: `
    <div class="odd-gpio-check">
    <label for="button.id" > {{ button.label }} </label> 
    <input type="checkbox" 
        id="button.id" 
        v-bind:value="button.value" 
        v-on:change= "$emit('gpio-selected', $event.target.value)" 
        v-bind:disabled="button.disabled">
    </div>
    ` 
});

Vue.component('even-gpio-check', {
    props: ['button'], 
    template: `
    <div class="even-gpio-check">
    <input type="checkbox" 
        id="button.id" 
        v-bind:value="button.value"
        v-on:change= "$emit('gpio-selected', $event.target.value)"
        v-bind:disabled="button.disabled">
    <label for="button.id" > {{ button.label }} </label> 
    </div>
    ` 
});

/**
 * PWM SOFTWARE USER INPUT 
 */
Vue.component('software-pwm',{
    props:['pwmconfig'],
    template: `
    <div class="spwm-input">
    <input type="number"
        min="0"
        max="255">
    <label>Software PWM {{ pwmconfig.number}} configuration for physical GPIO : {{ pwmconfig.id}} </label> 
    </div>
    `
});

/**
 * PWM HARDWARE USER INPUT 
 */
Vue.component('hardware-pwm', {
    props:['pwmconfig'], 
    template:`
    <div class="hpwm-input">
        <label>Frequency
            <input type="number"
                min="0"
                max="125000000">
        </label>

        <label>Duty Cycle
            <input type="number"
                min="0"
                max="100">
        </label>
        <label>Hardware PWM {{ pwmconfig.number}} configuration for physical GPIO : {{ pwmconfig.id}} </label>
    </div>
    `
});

let vm = new Vue({
    el: '#app', 
    data: {
        odd_buttons : ODD_GPIO, 
        even_buttons : EVEN_GPIO,
        checkedGpio:[], 
        submitMessage: "", 
        realtime:null, 
        selectedPage:"gpio", 
        pwmConfiguration: '', 
        software_pwm : [], 
        hardware_pwm: []
    }, 
    methods: {
        submit_buttons: function(event){

            // Check if checkedGpio has at least one element 
            if( typeof this.checkedGpio !== 'undefined' && this.checkedGpio.length >0){
                this.submitMessage = "GPIO(s) have been selected"; 
                // send data to the Raspberry....
            }
            else{
                this.submitMessage = "Please select at least one GPIO"; 
            }

            /*
            Testing fetching data to the server 
            */
            const testJson = {
                id: "373", 
                name:"tutu"
            };

            fetch("http://localhost:3000/", {
                method:"POST", 
                body: JSON.stringify(testJson), 
                headers:{
                    'Accept':'application/json', 
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.error("Error", error))
            .then(response => console.log("Success", response)); 

        }, 
        gpioPage: function(){
            this.selectedPage = "gpio"; 
            this.pwmConfiguration = ""; 
            this.software_pwm = [];
            this.hardware_pwm = [];
        },
        addGpio: function(gpioValue){

            let arrayIndex = this.checkedGpio.indexOf(gpioValue);

            // If it is not on the array we push it, if not we delete it 
            if(arrayIndex == -1){
                this.checkedGpio.push(gpioValue);

                //Handling pwm configuration 
                if(this.pwmConfiguration === 'Software'){
                    this.software_pwm.push({
                        id:gpioValue,
                        number: this.checkedGpio.length
                    });
                }

                if(this.pwmConfiguration === 'Hardware'){
                    this.hardware_pwm.push({
                        id:gpioValue,
                        number: this.checkedGpio.length
                    });
                }
            } 
            else{
                this.checkedGpio.splice(arrayIndex,1);

                // Remove the posible pwm configurations 
                if(this.pwmConfiguration === 'Software'){
                    for(let i= 0; i<this.software_pwm.length; i++){
                        if(this.software_pwm[i].id == gpioValue){ // found the pwm configuration 
                            this.software_pwm.splice(i, 1);  // Delete the pwm configuration object 
                            break;
                        }
                    }
                }

                if(this.pwmConfiguration === 'Hardware'){
                    for(let i= 0; i<this.hardware_pwm.length; i++){
                        if(this.hardware_pwm[i].id == gpioValue){ // found the pwm configuration 
                            this.hardware_pwm.splice(i, 1);  // Delete the pwm configuration object 
                            break;
                        }
                    }
                }

                
            }

            
        }
    }
});