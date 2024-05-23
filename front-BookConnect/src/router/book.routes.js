import {BookList, BookCreateEdit} from '@/views/book'

export default {
    path: '/book',
    // component: UserList,
    children: [
        {path: '', component: BookList},
        {path: 'create', component: BookCreateEdit},
        {path: 'edit/:id', component: BookCreateEdit}
    ]
}