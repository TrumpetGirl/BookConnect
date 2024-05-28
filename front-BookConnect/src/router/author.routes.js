import {Index, AuthorInfo, AuthorList, AuthorCreateEdit} from '@/views/author'

export default {
    path: '/author',
    component: Index,
    children: [
        {path: '', component: AuthorList, meta: {requiresAdmin: true}},
        {path: 'info/:id(\\d+)', name: 'authorInfo', component: AuthorInfo},
        {path: 'create', component: AuthorCreateEdit},
        {path: 'edit/:id(\\d+)', name: 'editAuthor', component: AuthorCreateEdit, meta: {requiresAdmin: true}}
    ]
}