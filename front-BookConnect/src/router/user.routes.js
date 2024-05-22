import {UserList, UserCreateEdit} from '@/views/user'

export default {
    path: '/user',
    // component: UserList,
    children: [
        {path: '', component: UserList},
        {path: 'create', component: UserCreateEdit},
        {path: 'edit/:id', component: UserCreateEdit}
    ]
}
