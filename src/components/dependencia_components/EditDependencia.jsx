import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import DependenciaForm from './DependenciaForm';
import { useDependencia } from '../../hooks/useDependencias';
import NavBar from '../NavBar';

export default function EditDependencia() {
    // Obtenemos el email desde los parámetros de la ruta
    const { id } = useParams();

    const { dependencia, isLoading } = useDependencia(id)


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (dependencia) {
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="max-w-4xl mx-auto mt-10 shadow-md overflow-hidden md:max-w-2xl">
                    <DependenciaForm dataIn={dependencia} />
                </div>
            </>
        );

    }

}

