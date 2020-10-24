import Search from '../components/Search.vue';
import AddPerson from '../components/AddPerson.vue';
import Profile from '../components/Profile.vue';
import AddPhoto from '../components/AddPhoto.vue';
import Dashboard from '../components/Dashboard.vue';
import PhotoView from '../components/PhotoView.vue';
import ClassifyFaces from '../components/ClassifyFaces.vue';
import Data from '../components/Data.vue';

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
        path: 'classify-faces',
        component: ClassifyFaces
    },
    {
        path: 'data',
        component: Data
    },
    {
        path: '*',
        redirect: '/app/dashboard'
    }
]