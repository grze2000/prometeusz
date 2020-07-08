<template>
    <form action="">
        <v-expansion-panels
            accordion
            flat
        >
            <v-expansion-panel>
                <v-expansion-panel-header>Podstawowe dane</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Imię"
                                outlined
                                required
                                v-model="form.firstname"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Nazwisko"
                                outlined
                                required
                                v-model="form.lastname"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Pseudonim"
                                outlined
                                v-model="form.nickname"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                :items="[{text: 'Mężczyzna', value: 'mężczyzna'}, {text: 'Kobieta', value: 'kobieta'}]"
                                label="Płeć"
                                outlined
                                required
                                v-model="form.gender"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="form.birthday"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="form.birthday"
                                        label="Data urodzenia"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="form.birthday" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(form.birthday)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                outlined
                                label="Stan cywilny"
                                v-model="form.maritalStatus"
                                :items="form.gender != null ? maritalStatus[form.gender] : []"
                                no-data-text="Najpierw wybierz płeć"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>Adres</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Miasto rodzinne"
                                outlined
                                v-model="form.address.hometown"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Miasto"
                                outlined
                                v-model="form.address.city"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Kod pocztowy"
                                outlined
                                v-model="form.address.postalCode"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Ulica"
                                outlined
                                v-model="form.address.streetName"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Numer budynku"
                                outlined
                                v-model="form.address.buildingNumber"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-autocomplete
                                :items="countries"
                                label="Kraj"
                                outlined
                                v-model="form.address.country"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>Kontakt</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Telefon"
                                outlined
                                v-model="form.phone"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Email"
                                type="email"
                                outlined
                                v-model="form.email"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>Inne</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Strona internetowa"
                                outlined
                                v-model="form.website"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Facebook ID"
                                outlined
                                v-model="form.facebookID"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-row class="px-3 pt-5">
            <v-spacer></v-spacer>
            <v-btn class="success" @click="submit()">Dodaj</v-btn>
        </v-row>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PersonForm',
    data() {
        return {
            countries: ['Afganistan', 'Albania', 'Algieria', 'Andora', 'Angola', 'Anguilla', 'Antigua i Barbuda', 'Arabia Saudyjska', 'Argentyna', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbejdżan', 'Bahamy', 'Bahrajn', 'Bangladesz', 'Barbados', 'Belgia', 'Belize', 'Benin', 'Bermudy', 'Bhutan', 'Białoruś', 'Boliwia', 'Bonaire', 'Botswana', 'Bośnia i Hercegowina', 'Brazylia', 'Brunei', 'Brytyjskie Wyspy Dziewicze', 'Burkina Faso', 'Burundi', 'Bułgaria', 'Chile', 'Chiny', 'Chorwacja', 'Curaçao', 'Cypr', 'Czad', 'Czarnogóra', 'Czechy', 'Dania', 'Demokratyczna Republika Konga', 'Dominika', 'Dominikana', 'Dżibuti', 'Egipt', 'Ekwador', 'Erytrea', 'Estonia', 'Etiopia', 'Falklandy', 'Fidżi', 'Filipiny', 'Finlandia', 'Francja', 'Gabon', 'Gambia', 'Ghana', 'Gibraltar', 'Grecja', 'Grenada', 'Grenlandia', 'Gruzja', 'Guam', 'Guernsey', 'Gujana', 'Gujana Francuska', 'Gwadelupa', 'Gwatemala', 'Gwinea', 'Gwinea Bissau', 'Gwinea Równikowa', 'Haiti', 'Hiszpania', 'Holandia', 'Honduras', 'Hongkong', 'Indie', 'Indonezja', 'Irak', 'Iran', 'Irlandia', 'Islandia', 'Izrael', 'Jamajka', 'Japonia', 'Jemen', 'Jersey', 'Jordania', 'Kajmany', 'Kambodża', 'Kamerun', 'Kanada', 'Katar', 'Kazachstan', 'Kenia', 'Kirgistan', 'Kiribati', 'Kolumbia', 'Komory', 'Kongo', 'Korea Południowa', 'Korea Północna', 'Kostaryka', 'Kuba', 'Kuwejt', 'Laos', 'Lesotho', 'Liban', 'Liberia', 'Libia', 'Liechtenstein', 'Litwa', 'Luksemburg', 'Macedonia', 'Madagaskar', 'Majotta', 'Makau', 'Malawi', 'Malediwy', 'Malezja', 'Mali', 'Malta', 'Mariany Północne', 'Maroko', 'Martynika', 'Mauretania', 'Mauritius', 'Meksyk', 'Mikronezja', 'Mjanma', 'Monako', 'Mongolia', 'Montserat', 'Mozambik', 'Mołdawia', 'Namibia', 'Nauru', 'Nepal', 'Niemcy', 'Niger', 'Nigeria', 'Nikaragua', 'Niue', 'Norfolk', 'Norwegia', 'Nowa Kaledonia', 'Nowa Zelandia', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua-Nowa Gwinea', 'Paragwaj', 'Peru', 'Pitcairn', 'Polinezja Francuska', 'Polska', 'Portoryko', 'Portugalia', 'Republika Południowej Afryki', 'Republika Zielonego Przylądka', 'Republika Środkowoafrykańska', 'Reunion', 'Rosja', 'Rumunia', 'Rwanda', 'Saba', 'Sahara Zachodnia', 'Saint Kitts i Nevis', 'Saint Lucia', 'Saint Vincent i Grenadyny', 'Saint-Barthélemy', 'Saint-Martin', 'Saint-Pierre i Miquelon', 'Salwador', 'Samoa', 'Samoa Amerykańskie', 'San Marino', 'Senegal', 'Serbia', 'Seszele', 'Sierra Leone', 'Singapur', 'Sint Eustatius', 'Sint Maarten', 'Somalia', 'Sri Lanka', 'Stany Zjednoczone', 'Strefa Gazy', 'Suazi', 'Sudan', 'Surinam', 'Svalbard', 'Syria', 'Szwajcaria', 'Szwecja', 'Słowacja', 'Słowenia', 'Tadżykistan', 'Tajlandia', 'Tajwan', 'Tanzania', 'Timor Wschodni', 'Togo', 'Tokelau', 'Tonga', 'Trynidad i Tobago', 'Tunezja', 'Turcja', 'Turkmenistan', 'Turks i Caicos', 'Tuvalu', 'Uganda', 'Ukraina', 'Urugwaj', 'Uzbekistan', 'Vanuatu', 'Wallis i Futuna', 'Watykan', 'Wenezuela', 'Wielka Brytania', 'Wietnam', 'Wybrzeże Kości Słoniowej', 'Wyspa Bożego Narodzenia', 'Wyspa Man', 'Wyspy Cooka', 'Wyspy Dziewicze Stanów Zjednoczonych', 'Wyspy Kokosowe', 'Wyspy Marshalla', 'Wyspy Owcze', 'Wyspy Salomona', 'Wyspy Świętego Tomasza i Książęca', 'Węgry', 'Włochy', 'Zachodni Brzeg', 'Zambia', 'Zimbabwe', 'Zjednoczone Emiraty Arabskie', 'Łotwa', 'Święta Helena'],
            maritalStatus: {
                'mężczyzna': ['kawaler', 'kawaler (wolny)', 'kawaler (w związku)', 'żonaty', 'wdowiec', 'rozwiedziony'],
                'kobieta': ['panna', 'panna (wolna)', 'panna (w związku)', 'zamężna', 'wdowa', 'rozwiedziona']
            },
            form: {
                firstname: '',
                lastname: '',
                nickname: null,
                gender: null,
                birthday: null,
                maritalStatus: null,
                address: {
                    city: null,
                    postalCode: null,
                    streetName: null,
                    buildingNumber: null,
                    country: null,
                    hometown: null
                },
                facebookID: null,
                website: null,
                phone: null,
                email: null
            },
            menu: null
        }
    },
    methods: {
        submit() {
            console.log(this.form);
            // to-do: form validation
            axios.post(`${process.env.VUE_APP_API_URL}/people`, this.form).then(person => {
                this.$router.push('/app/profile/'+person._id);
            }).catch(err => {
                // to-do snackbar
                console.error(err);
            })
        }
    }
}
</script>