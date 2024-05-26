import {BookList, BookCreateEdit} from '@/views/book'

export default {
    path: '/book',
    // component: UserList,
    children: [
        {path: '', component: BookList, meta: {requiresAdmin: true}},
        {path: 'create', component: BookCreateEdit},
        {path: 'edit/:id(\\d+)', component: BookCreateEdit, meta: {requiresAdmin: true}}
    ]
}