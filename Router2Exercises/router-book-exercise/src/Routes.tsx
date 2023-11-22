import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
//import { Header } from './Header';
import App from './App';


const router = createBrowserRouter([
    {
        path: '/',
        element:<App/>,
        children:[
            {
                path: 'products',
                element: <ProductsPage/>
            }
        ]
    },
    
]);

export function Routes(){
    return <RouterProvider router = {router}/>
}