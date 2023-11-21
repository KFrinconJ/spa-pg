import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import CursoForm from './CursoForm';
import { useCurso } from '../../hooks/useCursos';
import NavBar from '../NavBar';

export default function EditCurso() {
    // Obtenemos el email desde los parámetros de la ruta
    const { id } = useParams();

    const { curso, isLoading } = useCurso(id)


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (curso) {
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="max-w-4xl mx-auto mt-10 shadow-md overflow-hidden md:max-w-2xl">
                    <CursoForm dataIn={curso} />
                </div>
            </>
        );

    }

}

