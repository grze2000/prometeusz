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
                    ></v-autocomplete>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn class="error">Odrzuć</v-btn>
                <v-btn class="success">Zapisz</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ClassifyFaces',
    data() {
        return {
            faces: [],
            people: []
        }
    },
    created() {
        axios.all([
            axios.get(`${process.env.VUE_APP_API_URL}/faces?unclassified=true`),
            axios.get(`${process.env.VUE_APP_API_URL}/people`)
            
        ]).then(axios.spread((...responses) => {
            this.faces = responses[0].data;
            this.people = responses[1].data;
        })).catch(err => {
            console.log(err);
        });
    }
}
</script>