import {Index, UserList, Login, Register, UserCreateEdit} from '@/views/user'

export default {
    path: '/user',
    component: Index,
    children: [
        {path: '', component: UserList, meta: {requiresAdmin: true}},
        {path: 'login', component: Login},
        {path: 'register', component: Register},
        {path: 'create', component: UserCreateEdit, meta: {requiresAdmin: true}},
        {path: 'edit/:id(\\d+)', component: UserCreateEdit, meta: {requiresAdmin: true}}
    ]
}
