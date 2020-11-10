<template>
    <div :class="containerClasses">
        <v-card v-for="photo in photos" :key="photo._id" width="200" class="ma-3" :to="'/app/photo/'+photo._id">
            <v-img :src="photo.url | api" height="100"></v-img>
            <v-card-text>
                Nieprzeanalizowane zdjęcie
            </v-card-text>
        </v-card>
        <v-card v-if="unclassifiedFaces > 0" class="ma-3" width="250" to="/app/classify-faces">
            <v-card-title class="text-center" style="word-break: normal">Niesklasyfikowane twarze</v-card-title>
            <v-card-text>Liczba zdjęć oczekujących na klasyfikację: {{ unclassifiedFaces }}</v-card-text>
        </v-card>
        <div class="grey--text" v-if="!this.photos.length && !this.unclassifiedFaces">Brak powiadomień</div>
    </div>
</template>

<script>
import axios from 'axios';
import eventBus from '../eventBus';

export default {
    name: 'Dashboard',
    data() {
        return {
            photos: [],
            unclassifiedFaces: 0
        }
    },
    created() {
        Promise.all([
            axios.get(`${process.env.VUE_APP_API_URL}/photos2?analyzed=false`),
            axios.get(`${process.env.VUE_APP_API_URL}/faces?unclassified=true`)
        ]).then(values => {
            this.photos = values[0].data;
            this.unclassifiedFaces = values[1].data.length;
        }).catch(() => {
            eventBus.$emit('showSnackbar', 'Błąd! Nie udało się wczytać danych');
        });
    },
    computed: {
        containerClasses: function() {
            return {
                'd-flex pa-3 fill-height align-start flex-wrap': true,
                'justify-center align-center': !this.photos.length && !this.unclassifiedFaces
            }
        }
    }
}
</script>