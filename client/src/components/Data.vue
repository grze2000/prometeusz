<template>
    <v-card class="pa-5 ma-3 d-flex flex-row">
        <div style="width: 50%" class="text-center">
            <div class="pb-2">Importuj bazę danych</div>
            <v-btn class="blue" dark>Informacje</v-btn>&emsp;
            <v-btn class="blue" dark>Pliki</v-btn>
        </div>
        <div style="width: 50%" class="text-center">
            <div class="pb-2">Eksportuj bazę danych</div>
            <v-btn class="blue" dark>Informacje</v-btn>&nbsp;
            <v-btn class="blue" dark>Pliki</v-btn>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'Data'
}
</script>