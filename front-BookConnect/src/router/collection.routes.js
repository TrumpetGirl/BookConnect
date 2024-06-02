import {Index, CollectionView} from '@/views/collection'

export default {
    path: '/collection',
    component: Index,
    children: [
        {path: 'user/:id(\\d+)', name: 'userCollection', component: CollectionView},
    
    ]
}