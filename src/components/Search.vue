<template>
    <v-card class="pa-3 ma-3">
        <v-form>
            <v-text-field
                label="Wyszukaj"
                outlined
                v-model="query"
                ref="searchInput"
            ></v-text-field>
        </v-form>
        <div class="d-flex">
            <v-card v-for="result in results" :key="result._id" class="mx-1" :to="'/app/profile/'+result._id">
                <v-card-title class="d-flex flex-column">
                    <v-avatar :color="result | color" size="64">
                        <img :src="result.faces[0].url | api" alt="" v-if="result.faces.length">
                        <span v-else class="white--text">{{ result | initials }}</span>
                    </v-avatar>
                    <div>{{ result.firstname+' '+result.lastname }}</div>
                </v-card-title>
                <v-card-subtitle>
                    {{ result.gender | capitalize }}, {{ result.birthday | age }}
                </v-card-subtitle>
            </v-card>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Search',
    data() {
        return {
            people: [],
            query: ''
        };
    },
    created() {
        axios.get(`${process.env.VUE_APP_API_URL}/people`).then(data => {
            this.people = data.data;
        }).catch(() => {
            //snackbar
        });
    },
    mounted() {
        this.$refs.searchInput.focus();
    },
    methods: {
    },
    computed: {
        results() {
            if(this.query !== '') {
                return this.people.filter(x => {
                    const reg = new RegExp('^'+this.query.toLowerCase());
                    return reg.test(x.firstname.toLowerCase()) || reg.test(x.lastname.toLowerCase());
                });
            } else {
                return [];
            }
        }
    }
}
</script>