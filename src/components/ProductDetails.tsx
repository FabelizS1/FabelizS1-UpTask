import { useNavigate, useNavigation, Form, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom'  /// useNavigate es como Link permite ir de una pagina a otra
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService'
import Spinner  from '../components/Spinner'
//import { useMemo } from "react"
//import { useState } from 'react'

type ProductDetailsProps = {
    product: Product
    //datas: boolean
}



export async function action({params} : ActionFunctionArgs) {  /// function action({params} : ActionFunctionArgs)
    if(params.id !== undefined) {  /// Toma el valor del parametro del id
        await deleteProduct(+params.id)  /// Se le pasa el + para pasarlo a numero, para que se ejecute cuando se termine de ejecutar el metodo
        return redirect('/')
    }
}

/*
La parte del boton puede ser asi como se muestra a continuacion y de la forma que se dejo es con el hoook de useNavigate
<Link
   to={`/productos/${product.id}/editar`}
   className='bg-indigo-600'
></Link>


Esta es la forma de ir a otro hook con useNavigate
<button
    onClick={() => navigate(`/productos/${product.id}/editar`)}   Se usa el hook de navigate y se le pasa la url
    className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
>Editar</button>



<button
    onClick={() => navigate(`/productos/${product.id}/editar`, {
        state: {
            product      /// Esta es la informacion que se pasaria a la siguiente pagina
        }
    })}
    className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
>Editar</button>



Aqui se agrega la informacion del action con {`productos/${product.id}/eliminar`} debe ser la misma informacion

className='w-full'
method='POST'
action={`productos/${product.id}/eliminar`}

<Form
    className='w-full'
    method='POST'
    action={`productos/${product.id}/eliminar`}  Este se ejecuta despues del onSubmit
    onSubmit={ (e) => {                          El onSubmit se ejecuta antes que el action de arriba
        if( !confirm('¿Eliminar?') ) {           Mensaje de confirmacion para ver si se ejecuta o no
            e.preventDefault()                  Para evitar que se ejecute la accion
        }
    }}





Donde `${isAvailable ? 'text-black' : 'text-red-600'  es si esta disponible   isAvailable  colocar esta informacion   'text-black'   o     'text-red-600' 
    <fetcher.Form method='POST'>   Aqui se usa fetcher
        <button
            type='submit'
            name='id'
            value={product.id}   Al principio era con {product.availability.toString()} donde se pasa a string con toString luego se cambio a  {product.id} 
            className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
        >
            {isAvailable ? 'Disponible' : 'No Disponible'}
        </button>
        <input typpe="hidden" name="id" value={product.id}/>  Anteriormente era asi para pasar el valor de la disponibilidad y el id
    </fetcher.Form>    

*/


export default function ProductDetails({product} : ProductDetailsProps) {

    const fetcher = useFetcher()     /// Este se usa para actualizar sin tener que ir a otra pagina
    const navigate = useNavigate()   //// Esta es la otra forma de pasar de pagina en vez de con <Link>
    const isAvailable = product.availability    /// Producto disponible


    const navigation = useNavigation()
    const isSubmmiting = navigation.state === "submitting" && navigation.formMethod === "post"


    //const [data, setData] = useState(false) NO
    ///const loadingAvailability =  useMemo(() => true , [product.availability]) NO
    

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                { formatCurrency(product.price) }
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method='POST'>
                    



                    <button
                    type='submit'
                    name='id'
                    value={product.id}
                    className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                >
{isSubmmiting ? 'Cargando...' : 

                    isAvailable ? 'Disponible' : 'No Disponible'}
                </button>



                </fetcher.Form>
                
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">


                
                
                <button
                onClick={() => {navigate(`/productos/${product.id}/editar`)} }
                className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
            >Editar</button>
                
                




                    <Form
                        className='w-full'
                        method='POST'
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={ (e) => {
                            if( !confirm('¿Eliminar?') ) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type='submit'
                            value='Eliminar'
                            className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
