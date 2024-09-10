import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'   /// Con useLocation  se puedde recuperar el state de la pagina anterior y se puede ver mas abajo
///import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData, useLocation } from 'react-router-dom'   /// Con useLocation  se puedde recuperar el state de la pagina anterior y se puede ver mas abajo
import ErrorMessage from '../components/ErrorMessage'
import { getProductById, updateProduct } from '../services/ProductService'
import { Product } from '../types'
import ProductForm from '../components/ProductForm'




// Se usa LoaderFunctionArgs con Args porque tiene parametros, si no los tuviera se usara LoaderFunction 
 export async function loader({params} : LoaderFunctionArgs) {  /// Donde params son los parametros que se pasan que seria el id:
    
    console.log(params.id)  /// Para ver el parametro

    if(params.id !== undefined) {
        const product = await getProductById(+params.id)  /// Donde + convierte el parametro en numero
        if(!product) {
            return redirect('/')  // redirecciona a la principal
        }
        return product
    }

}

export async function action({request, params} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }

    console.log(params.id)

    if(params.id !== undefined) {
        await updateProduct(data, +params.id)
        return redirect('/')
    }

}


/// Estos son los tipos de datos de Status
const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
]



export default function EditProduct() {

    const product = useLoaderData() as Product   /// Para la informacion del loader
    const error = useActionData() as string 


    //const { state } = useLocation()  /// Asi se recupera la informacion del state , pero este enfoque no es bueno porque si se quiere actualizar no se ve la informacion

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Editar Producto</h2>
                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"  
                method='POST'
            >
            

                { <ProductForm 
                    product={product}
                />}
                






                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>
        
        </>
    )
}
