<template>
    <v-card class="pa-3 ma-3">
        <PersonForm></PersonForm>
    </v-card>
</template>

<script>
import PersonForm from './PersonForm.vue';

export default {
    name: 'AddPerson',
    components: {PersonForm},
    data() {
        return {

        }
    }
}
</script>