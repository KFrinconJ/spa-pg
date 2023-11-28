import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import { usePeriodoAcademico } from '../../hooks/usePeriodoAcademico';
import NavBar from '../NavBar';
import UpdateProgramaAcadmicoForm from './UpdateProgramaAcademicoForm';

export default function EditPeriodoAcademico() {
    // Obtenemos el email desde los parámetros de la ruta
    const { id } = useParams();

    const { periodoAcademico, isLoading } = usePeriodoAcademico(id)


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (periodoAcademico) {
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="max-w-4xl mx-auto mt-10 shadow-md overflow-hidden md:max-w-2xl">
                    <UpdateProgramaAcadmicoForm dataIn={periodoAcademico} />
                </div>
            </>
        );

    }

}

