<template>
    <div class="d-flex pa-3">
        <v-card
            v-for="face of faces"
            :key="face._id"
            class="ma-3 pa-3"
            max-width="250">
            <v-img :src="face.url | api" height="100" contain></v-img>
            <v-card-text>
                <v-form>
                    <v-autocomplete
                        :items="people | list"
                        label="Zindentyfikuj osobę"
                        v-model="face.person"
                    ></v-autocomplete>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn class="error" @click="submit(face._id, face.person, 0)">Odrzuć</v-btn>
                <v-btn class="success" @click="submit(face._id, face.person, 1)">Zapisz</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';
import eventBus from '../eventBus';

export default {
    name: 'ClassifyFaces',
    data() {
        return {
            faces: [],
            people: [],
            test: null
        }
    },
    created() {
        axios.all([
            axios.get(`${process.env.VUE_APP_API_URL}/faces?unclassified=true`),
            axios.get(`${process.env.VUE_APP_API_URL}/people`)
            
        ]).then(axios.spread((...responses) => {
            this.faces = responses[0].data;
            this.people = responses[1].data;
        })).catch(() => {
            eventBus.$emit('showSnackbar', 'Błąd! Nie udało się wczytać danych');
        });
    },
    methods: {
        submit(faceID, personID, status) {
            if((status === 1 && typeof personID !== 'undefined') || status === 0) {
                axios.post(`${process.env.VUE_APP_API_URL}/faces/${faceID}`, {
                    faceID: faceID,
                    personID: personID,
                    status: status
                }).then(() => {
                    const index = this.faces.findIndex(x => x._id == faceID);
                    this.faces.splice(index, 1);
                }).catch(err => {
                    eventBus.$emit('showSnackbar', typeof err.response !== 'undefined' ? err.response.data.message : err.message);
                });
            } else {
                eventBus.$emit('showSnackbar', 'Nie wybrano osoby');
            }
        }
    }
}
</script>