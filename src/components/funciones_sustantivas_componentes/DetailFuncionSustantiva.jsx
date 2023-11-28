import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import NavBar from '../NavBar';
import { useFuncionSustantiva } from '../../hooks/useFuncionesSustantivas';
export default function DetailFuncionSustantiva() {
    // Obtenemos el id desde los parámetros de la ruta
    const { id } = useParams();

    const { funcionSustantiva, isLoading } = useFuncionSustantiva(id)



    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (funcionSustantiva) {
        console.log(funcionSustantiva)
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="container mx-auto min-h-screen">

                    <div className="max-w-4xl mx-auto mt-10 bg-gray-800 text-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
                        <div className="md:flex">
                            <div className="p-8">
                                <h1 className="uppercase tracking-wide text-lg font-extrabold">
                                    Detalle de la funcion sustantiva
                                </h1>
                                <p className="mt-2 text-gray-300">Id: {funcionSustantiva.id}</p>
                                <p className="mt-2 text-gray-300">Nombre: {funcionSustantiva.nombre}</p>
                                <p className="mt-2 text-gray-300">Dependencia: {funcionSustantiva.dependencia}</p>
                                <p className="mt-2 text-gray-300">Actividad: {funcionSustantiva.actividad}</p>
                                <p className="mt-2 text-gray-300">Horas a la Semana: {funcionSustantiva.cantidad_horas}</p>
                                <p className="mt-2 text-gray-300">Descripcion: {funcionSustantiva.descripcion}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

    }

}
