import {Index, MyCollectionView, UserCollectionView} from '@/views/collection'

export default {
    path: '/collection',
    component: Index,
    children: [
        {path: '', name: 'myCollection', component: MyCollectionView},
        {path: 'user/:userId(\\d+)', name: 'userCollection', component: UserCollectionView}
    ]
}