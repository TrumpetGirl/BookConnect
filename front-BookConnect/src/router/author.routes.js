import {Index, AuthorList, AuthorCreateEdit} from '@/views/author'

export default {
    path: '/author',
    component: Index,
    children: [
        {path: '', component: AuthorList, meta: {requiresAdmin: true}},
        {path: 'create', component: AuthorCreateEdit},
        {path: 'edit/:id(\\d+)', component: AuthorCreateEdit, meta: {requiresAdmin: true}}
    ]
}