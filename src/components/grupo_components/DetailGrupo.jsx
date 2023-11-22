import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import NavBar from '../NavBar';
import { useGrupo } from '../../hooks/useGrupos';
export default function DetailCurso() {
    // Obtenemos el id desde los parámetros de la ruta
    const { id } = useParams();

    const { grupo, isLoading } = useGrupo(id)



    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (grupo) {
        console.log(grupo)
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="container mx-auto min-h-screen">

                    <div className="max-w-4xl mx-auto mt-10 bg-gray-800 text-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
                        <div className="md:flex">
                            <div className="p-8">
                                <h1 className="uppercase tracking-wide text-lg font-extrabold">
                                    Detalle del Grupo
                                </h1>
                                <p className="mt-2 text-gray-300">Id: {grupo.id}</p>
                                <p className="mt-2 text-gray-300">Nombre: {grupo.nombre}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

    }

}
