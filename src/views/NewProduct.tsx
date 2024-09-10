import { Link, Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom'  // Se tiene la informacion del form cambiandolo por Form 
import ErrorMessage from '../components/ErrorMessage'
import { addProduct } from '../services/ProductService'
import ProductForm from '../components/ProductForm'


/// Esta es la funcion action  que redirecciona en el Form, y se debe llamar en el action
/// Donde se selecciona request para pasar la informacion del formulario
// Siempre pasar ActionFunctionArgs
export async function action({request} : ActionFunctionArgs) { 
    
    /// Donde se usa formData para recuperar la informacion del form, como esta funcion es async se le coloca await

    const data = Object.fromEntries(await request.formData())  /// Con esto se recupera la informacion del formData
    let error = ''


    if(Object.values(data).includes('')) {   /// Validar los campos
        error = 'Todos los campos son obligatorios'
    }

    if(error.length) { // Validar si hay errores
        return error
    }

    await addProduct(data)   // Esta es la funcion que agrega, esto esta en ProductService.ts se usa un await la de abajo no se ejecuta hasta que esta termine

    return redirect('/')  /// Con esto se redirecciona a la pagina principal que es la del listado

    //console.log('desde action...')
    //return {}  //retorna un objeto
}

export default function NewProduct() {


    const error = useActionData() as string   ////Con el hook de useActionData se devuelven los errores desde las funcion action({request}  al componente

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Registrar Producto</h2>
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
            
                {<ProductForm />}


                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        
        </>
    )
}
