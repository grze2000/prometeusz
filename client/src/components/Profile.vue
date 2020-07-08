<template>
    <v-card v-if="loaded" class="pa-3 ma-3">
        <v-row>
            <v-col cols="12" md="4" class="d-flex justify-center align-center">
                <v-avatar :color="profile | color" size="128">
                    <img :src="profile.faces[0].url | api" alt="" v-if="profile.faces.length">
                    <span v-else class="white--text headline">{{ profile | initials }}</span>
                </v-avatar>
            </v-col>
            <v-col cols="12" md="8">
                <div class="headline py-2">{{ profile.firstname+' '+profile.lastname }}</div>
                <v-row v-if="profile.nickname != null">
                    <v-col cols="12" md="3" class="grey--text">Pseudonim:</v-col>
                    <v-col cols="12" md="9">{{ profile.nickname }}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="3" class="grey--text">Płeć:</v-col>
                    <v-col cols="12" md="9">{{ profile.gender }}</v-col>
                </v-row>
                <v-row v-if="typeof profile.birthday != null">
                    <v-col cols="12" md="3" class="grey--text">Data urodzin:</v-col>
                    <v-col cols="12" md="8">{{ (new Date(profile.birthday)).toLocaleDateString() }} ({{ profile.birthday | age }})</v-col>
                </v-row>
                <v-row v-if="typeof profile.maritalStatus != null">
                    <v-col cols="12" md="3" class="grey--text">Stan cywilny</v-col>
                    <v-col cols="12" md="9">{{ profile.maritalStatus }}</v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12" md="4" class="body-2 text-center">
                <div v-if="profile.website != null">
                    <span class="grey--text">www: </span>
                    <a :href="profile.website" target="_blank">{{ profile.website }}</a>
                </div>
                <div v-if="profile.facebookID != null">
                    <span class="grey--text">Fb ID: </span>
                    {{ profile.facebookID }}
                </div>
            </v-col>
            <v-col cols="12" md="8">
                <v-row v-if="profile.address.city != null || profile.address.postalCode != null || profile.address.streetName != null || profile.address.buildingNumber != null">
                    <v-col cols="12" md="3" class="grey--text">Adres:</v-col>
                    <v-col cols="12" md="9">
                        <div>
                            {{ profile.address.streetName != null ? profile.address.streetName : '' }}
                            {{ (profile.address.city != null && profile.address.streetName == null) ? profile.address.city : '' }}
                            {{ profile.address.buildingNumber != null ? profile.address.buildingNumber : '' }}
                        </div>
                        <div>
                            {{ profile.address.postalCode != null ? profile.address.postalCode : '' }}
                            {{ profile.address.city != null ? profile.address.city : '' }}
                        </div>
                    </v-col>
                </v-row>
                <v-row v-if="profile.address.country != null">
                    <v-col cols="12" md="3" class="grey--text">Kraj:</v-col>
                    <v-col cols="12" md="9">{{ profile.address.country }}</v-col>
                </v-row>
                <v-row v-if="profile.address.hometown != null">
                    <v-col cols="12" md="3" class="grey--text">Miasto rodzinne:</v-col>
                    <v-col cols="12" md="9">{{ profile.address.hometown }}</v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider v-if="profile.phone != null || profile.email != null"></v-divider>
        <v-row>
            <v-col cols="12" md="4" class="body-2 text-center">
            </v-col>
            <v-col cols="12" md="8">
                <v-row v-if="profile.phone != null">
                    <v-col cols="12" md="3" class="grey--text">Numer telefonu:</v-col>
                    <v-col cols="12" md="9">{{ profile.phone }}</v-col>
                </v-row>
                <v-row v-if="profile.email != null">
                    <v-col cols="12" md="3" class="grey--text">Email:</v-col>
                    <v-col cols="12" md="9">{{ profile.email }}</v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="headline text-center py-5">Zdjęcia ({{ profile.photos.length }})</div>
        <v-row>
            <v-col cols="12" md="3" v-for="image in profile.photos" :key="image._id">
                <v-card :to="'/app/photo/'+image._id" outlined min-width="200">
                    <v-img  :src="image.url | api" contain max-height="200"></v-img>
                </v-card>
                
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
import axios from 'axios'

export default {
    name: 'Profile',
    data() {
        return {
            loaded: false,
            profile: {}
        }
    },
    created() {
        axios.get(`${process.env.VUE_APP_API_URL}/people/${this.$route.params.id}`).then(person => {
            this.profile = person.data;
            this.loaded = true;
        }).catch(() => {
            // to-do snackbar
        })
    }
}
</script>