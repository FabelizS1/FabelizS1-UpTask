import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
//import Products  from './views/Products'
import Products, { loader as productsLoader, action as updateAvailabilityAction } from './views/Products'
//import NewProduct from './views/NewProduct'
import NewProduct, { action as newProductAction } from './views/NewProduct'  /// Donde newProductAction  es un alias de action
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct'  // Donde con el as se colocan los alias
//import EditProduct, { loader as editProductLoader } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'

export const router = createBrowserRouter([
    {
        path: '/',     /// Primer path    pagina principal
        element: <Layout />,   /// El Layout es un componente
        children: [       ///// Estos son los hijos 
            {
                index: true,   //// Desde el index
                element: <Products />,  /// Este es el elemento que queremos ver
                loader: productsLoader, /// Este es el loader y el lo que hace es mostrar la data de la api como un useEffect
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',   /// Esta es la url de producto
                element: <NewProduct />,   /// Este es el componente del nuevo producto
                action: newProductAction   /// Este es el paso a redireccionar en el Form
            },
            {
                path:'productos/:id/editar', // ROA Pattern - Resource-oriented design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            }, 
            {
                path:'productos/:id/eliminar',
                action: deleteProductAction
            }
        ],
    }
])