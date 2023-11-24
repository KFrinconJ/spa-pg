import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import NavBar from '../NavBar';
import { useDependencia } from '../../hooks/useDependencias';
export default function DetailDependencia() {
    // Obtenemos el id desde los parámetros de la ruta
    const { id } = useParams();

    const { dependencia, isLoading } = useDependencia(id)



    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (dependencia) {
        console.log(dependencia)
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="container mx-auto min-h-screen">

                    <div className="max-w-4xl mx-auto mt-10 bg-gray-800 text-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
                        <div className="md:flex">
                            <div className="p-8">
                                <h1 className="uppercase tracking-wide text-lg font-extrabold">
                                    Detalle de la dependencia:
                                </h1>
                                <p className="mt-2 text-gray-300">Id: {dependencia.id}</p>
                                <p className="mt-2 text-gray-300">Nombre: {dependencia.nombre}</p>
                                <p className="mt-2 text-gray-300">Encargado: {dependencia.encargado}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

    }

}
