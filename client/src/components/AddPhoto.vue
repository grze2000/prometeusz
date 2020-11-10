<template>
    <v-card class="pa-3 ma-3">
        <v-row justify="center" align="center">
        <v-col cols="12" md="3">
            <v-file-input
                label="Wybierz zdjęcie"
                v-model="file"
                :loading="loading"
                accept="image/*"
            ></v-file-input>
        </v-col>
        <v-col cols="12" md="2">
            <v-btn
                class="blue"
                dark
                large
                @click="upload()"
                :loading="loading"
            >Prześlij</v-btn>
        </v-col>
        </v-row>
        <v-progress-linear
            v-if="loading"
            :value="uploadProgress"
            color="red"
            height="7"
        ></v-progress-linear>
    </v-card>
</template>

<script>
import axios from 'axios';
import eventBus from '../eventBus';

export default {
    name: 'AddPhoto',
    data() {
        return {
            file: null,
            loading: false,
            uploadProgress: 0
        }
    },
    methods: {
        upload() {
            if(this.file == null) {
                eventBus.$emit('showSnackbar', 'Nie wybrano pliku');
                return;
            }
            this.loading = true;
            let formData = new FormData();
            formData.append('file', this.file);
            axios.post(`${process.env.VUE_APP_API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: event => {
                    this.uploadProgress = event.loaded / event.total * 100;
                }
            }).then(() => {
                this.file = null;
            }).catch(err => {
                eventBus.$emit('showSnackbar', typeof err.response !== 'undefined' ? err.response.data.message : err.message);     
            }).finally(() => {
                this.loading = false;
            });
        }
    }
}
</script>