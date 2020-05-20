<template>
    <div class="fill-height grey lighten-4">
        <v-app-bar
            app
            clipped-left
            class="blue"
            dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Prometeusz</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>power_settings_new</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer app clipped v-model="drawer">
            <v-list-item-group v-model="selected">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Baza danych</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            drawer: true,
            selected: null
        };
    }
}
</script>