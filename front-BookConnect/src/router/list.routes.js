import {UserList, ListCreateEdit} from '@/views/list'

export default {
    path: '/list',
    // component: UserList,
    children: [
        {path: '/', component: UserList, meta: {requiresAdmin: true}},
        {path: 'create', component: ListCreateEdit},
        {path: 'edit/:id(\\d+)', component: ListCreateEdit, meta: {requiresAdmin: true}}
    ]
}