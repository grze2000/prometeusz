<template>
    <div class="fill-height grey lighten-4">
        <v-app-bar
            app
            clipped-left
            class="blue"
            dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Prometeusz <span class="caption ml-1">v.{{ version }}</span></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="logout">
                <v-icon>power_settings_new</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer app clipped v-model="drawer">
            <v-list-item to="/app/dashboard">
                <v-list-item-content>
                    <v-list-item-title>Podsumowanie</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Baza danych</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item dense to="/app/search">
                <v-list-item-content>
                    <v-list-item-title>Wyszukaj w bazie</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item dense to="/app/add">
                <v-list-item-content>
                    <v-list-item-title>Dodaj osobę</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item dense to="/app/add-photo">
                <v-list-item-content>
                    <v-list-item-title>Dodaj zdjęcie</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-navigation-drawer>
        <v-content>
            <router-view></router-view>
        </v-content>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',
    data() {
        return {
            drawer: true,
            selected: null,
            version: process.env.VERSION
        };
    },
    created() {
        const token = localStorage.getItem('token');
        if(!token) {
            this.$router.push('/');
        }
        axios.defaults.headers.common['Authorization'] = token;
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/');
        }
    }
}
</script>