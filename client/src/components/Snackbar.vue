<template>
    <v-snackbar v-model="show" :timeout="timeout">{{ message }}</v-snackbar>
</template>

<script>
import eventBus from '../eventBus';

export default {
    name: 'Snackbar',
    data() {
        return {
            show: false,
            message: '',
            timeout: 5000
        }
    },
    methods: {
        open(message) {
            this.message = message;
            this.show = true;
        }
    },
    created() {
        eventBus.$on('showSnackbar', msg => this.open(msg));
    }
}
</script>