<template>
    <div>
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
    </div>
</template>

<script>
import axios from 'axios';

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
                //to-do snackbar
                console.log('Wybierz plik');
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
                this.loading = false;
                console.log('ok');
                
            }).catch(err => {
                this.loading = false;
                console.log(err);
                // to-do snackbar        
            })
        }
    }
}
</script>