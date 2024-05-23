import {Index, UserList, Login, Register, UserCreateEdit} from '@/views/user'

export default {
    path: '/user',
    component: Index,
    children: [
        {path: '', component: UserList},
        {path: 'login', component: Login},
        {path: 'register', component: Register},
        {path: 'create', component: UserCreateEdit},
        {path: 'edit/:id', component: UserCreateEdit}
    ]
}
