import {AuthorList, AuthorCreateEdit} from '@/views/author'

export default {
    path: '/author',
    // component: UserList,
    children: [
        {path: '', component: AuthorList},
        {path: 'create', component: AuthorCreateEdit},
        {path: 'edit/:id', component: AuthorCreateEdit}
    ]
}