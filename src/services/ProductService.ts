//import { safeParse } from 'valibot';
//import { safeParse, coerce, number, parse, boolean } from 'valibot';
//import { safeParse, number, parse, boolean } from 'valibot';
import { safeParse } from 'valibot';
import axios from 'axios';
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types";
import { toBoolean } from '../utils';

type ProductData = {
    [k: string]: FormDataEntryValue;  /// Este type viene de seleccionar la opcion de data en en la funcion de action en el NewProduct
}

export async function addProduct(data : ProductData) {
    try {

        ///const result = safeParse(DraftProductSchema, data) // CPara validar 

        const result = safeParse(DraftProductSchema, {  // Con safeDraft
            name: data.name,  // data de name
            price: +data.price  //para convertir el valor a numero se coloca +
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`  // Donde import.meta.env.VITE_API_URL  es una variable de entorno con la parte inicial de la url
            
            /// Tambien se puede hacer el post asi
            /*
                await axios(url, {
                    method: 'POST'
                })
            */

            await axios.post(url, {
                name: result.output.name,  // Para pasar la data
                price: result.output.price
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
   console.log('Add Services')
}



// API para listar producto
export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)  // Informacion del resultado con valibot
        if(result.success) {
            return result.output   /// Retorna la informacion
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)  /// Donde ProductSchema es para un solo objeto
        if(result.success) {
            return result.output   /// Esta es la salida del resultado
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}



export async function updateProduct(data : ProductData, id: Product['id'] ) {
    try {

        /// Funcion que forza que un valor se convierte en un numero
        //const NumberSchema = coerce(number(), Number) 
        /*
        const AvailabilitySchema = coerce(boolean(), Boolean)
        availability: (AvailabilitySchema, data.availability) 
        */


        ///Para validar la informacion
        const result = safeParse(ProductSchema, {  // Se hace de esta forma porque se debe dar formato a las opciones
            id,  /// En este como se llama igual se le coloca la informacion con el mismo valor de id
            name: data.name,
            price: +data.price,  ///parse(NumberSchema, +data.price),    Se puede solucionar con la opcion de  +data.price, pero aqui toma NumberSchema y se le pasa price para convertir el valor
            availability: toBoolean(data.availability.toString()) //// Funcion de utils, se le pasa toString para que lo convierta en string
        })
       

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output) /// Para el put 
        }


    } catch (error) {
        console.log(error)
    }
}


export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}

