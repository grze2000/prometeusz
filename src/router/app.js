import Search from '../components/Search.vue';
import AddPerson from '../components/AddPerson.vue';
import Profile from '../components/Profile.vue';
import AddPhoto from '../components/AddPhoto.vue';
import Dashboard from '../components/Dashboard.vue';
import PhotoView from '../components/PhotoView';

export default [
    {
        path: 'dashboard',
        component: Dashboard
    },
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
        path: 'photo/:id',
        component: PhotoView
    },
    {
        path: '*',
        redirect: '/app/dashboard'
    }
]