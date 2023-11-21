import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import NavBar from '../NavBar';
import { useProgramaAcademico } from '../../hooks/useProgramasAcademicos';
export default function DetailProgramaAcademico() {
    // Obtenemos el id desde los parámetros de la ruta
    const { snies } = useParams();

    const { programaAcademico, isLoading } = useProgramaAcademico(snies)



    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (programaAcademico) {
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="container mx-auto min-h-screen">

                    <div className="max-w-4xl mx-auto mt-10 bg-gray-800 text-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
                        <div className="md:flex">
                            <div className="p-8">
                                <h1 className="uppercase tracking-wide text-lg font-extrabold">
                                    Detalle del Programa Academico
                                </h1>
                                <p className="mt-2 text-gray-300">Id: {programaAcademico.id}</p>
                                <p className="mt-2 text-gray-300">Nombre: {programaAcademico.nombre}</p>
                                <p className="mt-2 text-gray-300">Codigo SNIES: {programaAcademico.codigo_snies}</p>
                                <p className="mt-2 text-gray-300">Director: {programaAcademico.director}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

    }

}
