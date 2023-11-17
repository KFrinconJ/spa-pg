import { useParams } from 'react-router-dom';
import { useUserDetail } from '../../hooks/useUserDetail';
import LoadingView from '../../views/LoadingView';
import NavBar from '../NavBar';
import AccordionUser from './AccordionUser';
export default function DetailUser() {
    // Obtenemos el email desde los parámetros de la ruta
    const { email } = useParams();

    const { userInfo, isLoading } = useUserDetail(email)


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (userInfo) {
        console.log(userInfo)
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="container mx-auto min-h-screen">

                    <div className="max-w-4xl mx-auto mt-10 bg-gray-800 text-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
                        <div className="md:flex">
                            <div className="p-8">
                                <h1 className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
                                    Detalle de {userInfo.email}
                                </h1>
                                <p className="mt-2 text-gray-300">Id: {userInfo.id}</p>
                                <p className="mt-2 text-gray-300">Nombre: {userInfo.nombre}</p>
                                <p className="mt-2 text-gray-300">Apellido: {userInfo.apellido}</p>
                                <p className="mt-2 text-gray-300">Cedula: {userInfo.cedula}</p>
                                <p className="mt-2 text-gray-300">Horas Laborales: {userInfo.horas_laborales}</p>
                                <p className="mt-2 text-gray-300">Programa Academico: {userInfo.programa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto mt-10 shadow-md overflow-hidden md:max-w-2xl">
                        <AccordionUser id={userInfo.id} />
                    </div>
                </div>
            </>
        );

    }

}
