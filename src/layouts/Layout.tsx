import { Outlet, useNavigation } from 'react-router-dom'
import Spinner  from '../components/Spinner'

/*

El <Outlet />  es la informacion de cada pagina, aqui deberia ir lo que despliega cada pagina

*/


export default function Layout() {
    const navigation = useNavigation();

  return (
    <>
        <header className='bg-slate-800'>
            <div className='mx-auto max-w-6xl py-10'>
                <h1 className='text-4xl font-extrabold text-white'>
                    Administrador de Productos
                </h1>
            </div>
        </header>
    
        <main className='mt-10 mx-auto max-w-6xl p-10 bg-white shadow'>

            { navigation.state == "loading" ? <Spinner /> : <Outlet /> }
        </main>
    </>
  )
}
