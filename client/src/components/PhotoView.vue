<template>
    <v-card class="pa-3 ma-3" v-if="loaded">
        <v-img :src="photo.url | api" height="400" contain></v-img>
        <div v-if="!photo.analyzed" class="text-center my-3">
            <v-alert
                v-if="!analyzing"
                type="warning"
                dense
                class="text-left"
            >Zdjęcie nie zostało przanalizowane! Rozpocznij analizę, aby wyszukać znajdujące się na nim osoby.</v-alert>
            <v-alert
                v-else
                type="success"
                dense
                class="text-left"
            >Analizowanie zdjęcia zostało rozpoczęte</v-alert>
            <v-btn
                class="red"
                dark
                :loading="analyzing"
                @click="analyze"
            >Analizuj zdjęcie</v-btn>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios';
import eventBus from '../eventBus';

export default {
    name: 'PhotoView',
    data() {
        return {
            photo: null,
            loaded: false,
            analyzing: false
        }
    },
    created() {
        axios.get(`${process.env.VUE_APP_API_URL}/photos/${this.$route.params.id}`).then(photo => {
            this.photo = photo.data;
            this.loaded = true;
        }).catch(() => {
            eventBus.$emit('showSnackbar', 'Błąd! Nie udało się wczytać danych');
        });
    },
    methods: {
        analyze() {
            this.analyzing = true;
            axios.post(`${process.env.VUE_APP_API_URL}/analyze/${this.photo._id}`).then(() => {
                this.analyzing = false;
                this.photo.analyzed = true;
            }).catch(err => {
                eventBus.$emit('showSnackbar', typeof err.response !== 'undefined' ? err.response.data.message : err.message);
            })
        }
    }
}
</script>