import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import GrupoForm from './GrupoForm';
import { useGrupo } from '../../hooks/useGrupos';
import NavBar from '../NavBar';

export default function EditGrupo() {
    // Obtenemos el email desde los parámetros de la ruta
    const { id } = useParams();

    const { grupo, isLoading } = useGrupo(id)


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (grupo) {
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="max-w-4xl mx-auto mt-10 shadow-md overflow-hidden md:max-w-2xl">
                    <GrupoForm dataIn={grupo} />
                </div>
            </>
        );

    }

}

