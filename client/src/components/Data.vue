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
                    v-model="file"
                    :loading="loading.uploadFile"
                    multiple
                    accept=".csv"
                ></v-file-input>
                <v-btn class="blue" dark>Importuj</v-btn>&nbsp;
                <v-btn class="grey lighten-3" @click="step=1">Wstecz</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3" class="text-center py-10">
                <template v-if="waitingForRespose">
                    <v-progress-circular indeterminate color="blue" size="50"></v-progress-circular>
                    <div class="text-h6 py-3">Wykonywanie operacji...</div>
                </template>
                <template v-else-if="actions.indexOf(action) === 0 || actions.indexOf(action) === 1">
                    <div class="py-2">Zakończono eksport. Możej teraz pobrać utworzone pliki:</div>
                    <v-btn :href="exportFileUrl" class="blue" dark>Pobierz</v-btn>
                </template>
                <template v-else-if="actions.indexOf(action) === 2 || actions.indexOf(action) === 3">
                    <div class="py-2">Zakończono import. Możesz już przeglądać zaimportowane dane w bazie</div>
                    <v-btn href="/app/serach" class="blue" dark>Szukaj w bazie</v-btn>
                </template>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Data',
    data() {
        return {
            loading: {
                uploadFile: false
            },
            actions: [
                'Eksport danych',
                'Eksport zdjęć',
                'Import danych',
                'Import zdjęć'
            ],
            action: 'Eksport danych',
            step: 1,
            file: null,
            waitingForRespose: false,
            exportFileUrl: ''
        }
    },
    methods: {
        exportData() {
            this.waitingForRespose = true;
            axios.get(`${process.env.VUE_APP_API_URL}/export/data`).then(res => {
                this.exportFileUrl = `${process.env.VUE_APP_API_URL}/${res.data.file}`;
            }).finally(() => {
                this.waitingForRespose = false;
            });
        },
        nextStep() {
            const actionNr = this.actions.indexOf(this.action);
            switch(actionNr) {
                case 0:
                    this.exportData();
                    this.step = 3;
                    break;
                case 1:
                    this.step = 3;
                    break;
                case 2:
                    this.step = 2;
                    break;
                case 3:    
                    this.step = 2;
                    break;
            }
        }
    }
}
</script>