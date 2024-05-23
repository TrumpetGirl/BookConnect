import {UserList, ListCreateEdit} from '@/views/list'

export default {
    path: '/list',
    // component: UserList,
    children: [
        {path: '/:idUser', component: UserList},
        {path: 'create', component: ListCreateEdit},
        {path: 'edit/:id', component: ListCreateEdit}
    ]
}