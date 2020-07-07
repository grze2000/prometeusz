<template>
    <div class="d-flex pa-3">
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
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Dashboard',
    data() {
        return {
            photos: [],
            unclassifiedFaces: 0
        }
    },
    created() {        
        axios.get(`${process.env.VUE_APP_API_URL}/photos2?analyzed=false`).then(photos => {
            this.photos = photos.data;
            
        }).catch(err => {
            console.log(err.message);
            
        });
        axios.get(`${process.env.VUE_APP_API_URL}/faces?unclassified=true`).then(faces => {
            this.unclassifiedFaces = faces.data.length;
        }).catch(err => {
            console.log(err.message);
        });
    }
}
</script>