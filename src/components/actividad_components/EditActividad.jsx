import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import ActividadForm from './ActividadForm';
import { useActividad } from '../../hooks/useActividades';
import NavBar from '../NavBar';

export default function EditActividad() {
    // Obtenemos el email desde los parámetros de la ruta
    const { id } = useParams();

    const { actividad, isLoading } = useActividad(id)


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (actividad) {
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="max-w-4xl mx-auto mt-10 shadow-md overflow-hidden md:max-w-2xl">
                    <ActividadForm dataIn={actividad} />
                </div>
            </>
        );

    }

}

