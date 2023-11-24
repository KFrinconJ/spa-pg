import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import NavBar from '../NavBar';
import { useActividad } from '../../hooks/useActividades';
export default function DetailActividad() {
    // Obtenemos el id desde los parámetros de la ruta
    const { id } = useParams();

    const { actividad, isLoading } = useActividad(id)



    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (actividad) {
        console.log(actividad)
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="container mx-auto min-h-screen">

                    <div className="max-w-4xl mx-auto mt-10 bg-gray-800 text-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
                        <div className="md:flex">
                            <div className="p-8">
                                <h1 className="uppercase tracking-wide text-lg font-extrabold">
                                    Detalle de la actividad
                                </h1>
                                <p className="mt-2 text-gray-300">Id: {actividad.id}</p>
                                <p className="mt-2 text-gray-300">Nombre: {actividad.nombre}</p>
                                <p className="mt-2 text-gray-300">Horas a la Semana: {actividad.cantidad_horas}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

    }

}
