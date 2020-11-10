<template>
    <v-stepper v-model="step" class="ma-3">
        <v-stepper-header>
            <v-stepper-step step="1">
                Wybierz operację
            </v-stepper-step>
            <v-stepper-step step="2">
                Wgraj pliki
            </v-stepper-step>
            <v-stepper-step step="3">
                Wyniki operacji
            </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                Wybierz operację:
                <v-overflow-btn v-model="action" :items="actions" label="Wybierz operację"></v-overflow-btn>
                <v-btn @click="nextStep" class="blue" dark>Dalej</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
                <v-file-input
                    label="Wybierz plik"
                    v-model="files"
                    :loading="loading.uploadFile"
                    :multiple="action === 2"
                    :accept="action === 2 ? '.csv' : '.zip'"
                ></v-file-input>
                <v-btn class="blue" @click="uploadFiles" dark>Importuj</v-btn>&nbsp;
                <v-btn class="grey lighten-3" @click="step=1">Wstecz</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3" class="text-center py-10">
                <template v-if="waitingForRespose">
                    <v-progress-circular indeterminate color="blue" size="50"></v-progress-circular>
                    <div class="text-h6 py-3">Wykonywanie operacji...</div>
                </template>
                <template v-else-if="action === 0 || action === 1">
                    <div class="py-2">Zakończono eksport. Możej teraz pobrać utworzone pliki:</div>
                    <v-btn :href="exportFileUrl" class="blue" dark>Pobierz</v-btn>
                </template>
                <template v-else-if="action === 2 || action === 3">
                    <div class="py-2">Zakończono import. Możesz już przeglądać zaimportowane dane w bazie</div>
                    <v-btn href="/app/serach" class="blue" dark>Szukaj w bazie</v-btn>
                </template>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import axios from 'axios'
import eventBus from '../eventBus';

export default {
    name: 'Data',
    data() {
        return {
            loading: {
                uploadFile: false
            },
            actions: [
                { value: 0, text: 'Eksport danych'},
                { value: 1, text: 'Eksport zdjęć'},
                { value: 2, text: 'Import danych'},
                { value: 3, text: 'Import zdjęć'}
            ],
            action: 0,
            step: 1,
            files: null,
            waitingForRespose: false,
            exportFileUrl: ''
        }
    },
    methods: {
        exportData(type) {
            this.waitingForRespose = true;
            axios.get(`${process.env.VUE_APP_API_URL}/export/${type}`).then(res => {
                this.exportFileUrl = `${process.env.VUE_APP_API_URL}/${res.data.file}`;
            }).catch(() => {
                eventBus.$emit('showSnackbar', 'Błąd! Nie udało się wyeksportować danych');
                this.step = 1;
            }).finally(() => {
                this.waitingForRespose = false;
            });
        },
        nextStep() {
            switch(this.action) {
                case 0:
                    this.exportData('data');
                    this.step = 3;
                    break;
                case 1:
                    this.exportData('photos');
                    break;
                case 2:
                    this.step = 2;
                    break;
                case 3:    
                    this.step = 2;
                    break;
            }
        },
        uploadFiles() {
            if(!this.files) {
                return eventBus.$emit('showSnackbar', 'Nie wybrano pliku');
            }
            this.loading.uploadFile = true;
            let formData = new FormData();
            this.files.forEach(file => {
                formData.append('files', file);
            });
            axios.post(`${process.env.VUE_APP_API_URL}/import/${this.action === 2 ? 'data' : 'photos'}`, formData, {
                headers: {
                    'Content-Type': 'undefined'
                }
            }).then(() => {
                this.files = null;
            }).catch(err => {
                eventBus.$emit('showSnackbar', typeof err.response !== 'undefined' ? err.response.data.message : err.message);
            }).finally(() => {
                this.loading.uploadFile = false;
            });
        }
    }
}
</script>