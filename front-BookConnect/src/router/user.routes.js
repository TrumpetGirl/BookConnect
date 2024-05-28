import {Index, UserList, Login, Register, UserCreateEdit} from '@/views/user'

export default {
    path: '/user',
    component: Index,
    children: [
        {path: '', component: UserList, meta: {requiresAdmin: true}},
        {path: 'login', component: Login},
        {path: 'register', component: Register},
        {path: 'create', component: UserCreateEdit},
        {path: 'edit/:id(\\d+)', name: 'editUser', component: UserCreateEdit, meta: {requiresAdmin: true}}
    ]
}
