import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import VueRandomColor from 'vue-randomcolor';

Vue.config.productionTip = false

Vue.use(VueRandomColor);

const ageString = date => {
    const age = Math.floor((new Date - new Date(date)) / (1000 * 3600 * 24 * 365.25));
    let text = '';
    if(age === 1) {
        text = 'rok';
    } else if([2, 3, 4].includes(age % 10) && Math.floor(age / 10) % 10 !== 1) {
        text = 'lata';
    } else {
        text = 'lat';
    }
    return `${age} ${text}`;
}

Vue.filter('color', function(x) {
    let string = x.firstname+x.lastname;
    let hash = 0;
    for (var i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#'+("00000".substring(0, 6 - c.length) + c);
});

Vue.filter('initials', function(x) {
    return (x.firstname.charAt(0)+x.lastname.charAt(0)).toUpperCase();
});

Vue.filter('capitalize', function(str) {
    return str.charAt(0).toUpperCase()+str.slice(1);
});

Vue.filter('age', function(date) {
    return ageString(date);
});

Vue.filter('api', function(url) {
    return process.env.VUE_APP_API_URL+url;
});

Vue.filter('list', function(people) {
    return people.map(person => {
        return {value: person._id, text: person.firstname+' '+person.lastname+' ('+ageString(person.birthday)+')'};
    });
});

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
