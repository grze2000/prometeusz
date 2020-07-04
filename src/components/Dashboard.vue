<template>
    <div class="d-flex">
        <v-card v-for="photo in photos" :key="photo._id" width="200" class="ma-3" :to="'/app/photo/'+photo._id">
            <v-img :src="photo.url | api" height="100"></v-img>
            <v-card-text>
                Nieprzeanalizowane zdjęcie
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Dashboard',
    data() {
        return {
            photos: []
        }
    },
    created() {        
        axios.get(`${process.env.VUE_APP_API_URL}/photos2`).then(photos => {
            this.photos = photos.data;
            
        }).catch(err => {
            console.log(err.message);
            
        });
    }
}
</script>