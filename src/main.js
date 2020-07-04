import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import VueRandomColor from 'vue-randomcolor';

Vue.config.productionTip = false

Vue.use(VueRandomColor);

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
    const age = (new Date).getFullYear()-(new Date(date)).getFullYear();
    let text = '';
    if(age === 1) {
        text = 'rok';
    } else if([2, 3, 4].includes(age % 10) && Math.floor(age / 10) % 10 !== 1) {
        text = 'lata';
    } else {
        text = 'lat';
    }
    return `${age} ${text}`;
});

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
