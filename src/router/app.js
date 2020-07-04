import Search from '../components/Search.vue';
import AddPerson from '../components/AddPerson.vue';
import Profile from '../components/Profile.vue';
import AddPhoto from '../components/AddPhoto.vue';

export default [
    {
        path: 'search',
        component: Search
    },
    {
        path: 'add',
        component: AddPerson
    },
    {
        path: 'profile/:id',
        component: Profile
    },
    {
        path: 'add-photo',
        component: AddPhoto
    },
    {
        path: '*',
        redirect: '/app/search'
    }
]