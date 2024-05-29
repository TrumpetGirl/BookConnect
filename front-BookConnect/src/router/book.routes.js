import {Index, BookList, BookInfo, BookCreateEdit} from '@/views/book'

export default {
    path: '/book',
    component: Index,
    children: [
        {path: '', component: BookList, meta: {requiresAdmin: true}},
        {path: 'info/:id(\\d+)', name: 'bookInfo', component: BookInfo},
        {path: 'create', component: BookCreateEdit},
        {path: 'edit/:id(\\d+)', name: 'editBook', component: BookCreateEdit, meta: {requiresAdmin: true}}
    ]
}