<template>
    <v-container fluid class="white--text fill-height login">
        <v-row align="center" justify="center">
            <v-col cols="12" md="4" sm="6">
                <v-card raised>
                    <v-toolbar class="blue" flat dark>
                        <v-toolbar-title>Logowanie</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text @keyup.enter="login">
                        <v-form ref="loginForm" v-model="valid">
                            <v-text-field
                                v-model="formData.username"
                                label="Nazwa użytkownika"
                                prepend-icon="person"
                                :rules="[v => !!v || 'To pole jest wymagane']"
                                required>
                            </v-text-field>
                            <v-text-field
                                v-model="formData.password"
                                label="Hasło"
                                type="password"
                                prepend-icon="lock"
                                :rules="[v => !!v || 'To pole jest wymagane']"
                                required>
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="blue" depressed dark @click="login" :loading="loading">Zaloguj się</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import eventBus from '../eventBus';

export default {
    name: 'Login',
    data() {
        return {
            formData: {
                username: '',
                password: ''
            },
            valid: false,
            loading: false
        }
    },
    created() {
        const token = localStorage.getItem('token');
        if(token) {
            this.$router.push('/app/dashboard');
        }
    },
    methods: {
        login() {
            this.$refs.loginForm.validate();
            this.loading = true;
            if(this.valid) {
                axios.post(`${process.env.VUE_APP_API_URL}/login`, this.formData).then(response => {
                    localStorage.setItem('token', response.data.token);
                    this.$router.push('/app/dashboard');
                }).catch(err => {
                    eventBus.$emit('showSnackbar', typeof err.response !== 'undefined' ? err.response.data.message : err.message);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    }
}
</script>

<style>
    .login {
        background-image: url('/img/background.jpg');
        background-size: cover;
        background-position: center;
    }
</style>