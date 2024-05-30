import {Index, UserList, Login, Register, UserCreateEdit, UserInfo, ConfigurationUser} from '@/views/user'

export default {
    path: '/user',
    component: Index,
    children: [
        {path: '', component: UserList, meta: {requiresAdmin: true}},
        {path: 'info/:id(\\d+)', name: 'userInfo', component: UserInfo},
        {path: 'login', component: Login},
        {path: 'register', component: Register},
        {path: 'create', component: UserCreateEdit},
        {path: 'edit/:id(\\d+)', name: 'editUser', component: UserCreateEdit, meta: {requiresAdmin: true}},
        {path: 'configuration', component: ConfigurationUser}
    ]
}
