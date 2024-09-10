import { ActionFunctionArgs, Link, useLoaderData} from 'react-router-dom'
//import { getProducts } from '../services/ProductService'
import { getProducts, updateProductAvailability } from '../services/ProductService'
import ProductDetails from '../components/ProductDetails';
import { Product } from '../types';
//import { useState } from 'react';



export async function loader() {    /// Loader para mostrar la informacion de los productos y listarlos
  const products = await getProducts()
  return products
  //console.log('desde loader...')
  //return {}
}



export async function action({request} : ActionFunctionArgs) { // Es ActionFunctionArgs porque toma argumentos
    //setDatas(true)
    const data = Object.fromEntries(await request.formData())  // Esta es la data
    await updateProductAvailability(+data.id)  /// Se le pasa el + al inicio para que sea un numero
    //setDatas(false)
    return {}
}

export default function Products() {
//    const [datas, setDatas] = useState(false)


  //   const data = useLoaderData()         useLoaderData() as Product[]
  const data = useLoaderData() as Product[]   // Asi se comunica la informacion del componente con la function loader()

  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
            <Link
                to="productos/nuevo"
                className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
            >
                Agregar Producto
            </Link>
        </div>
  

        <div className="p-2">
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                    <tr>
                        <th className="p-2">Producto</th>
                        <th className="p-2">Precio</th>
                        <th className="p-2">Disponibilidad</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                  {data.map(product => (
                      <ProductDetails
                          key={product.id}
                          product={product}
                          
                      />
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}
