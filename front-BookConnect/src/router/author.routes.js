import {Index, AuthorList, AuthorCreateEdit} from '@/views/author'

export default {
    path: '/author',
    component: Index,
    children: [
        {path: '', component: AuthorList},
        {path: 'create', component: AuthorCreateEdit},
        {path: 'edit/:id', component: AuthorCreateEdit}
    ]
}