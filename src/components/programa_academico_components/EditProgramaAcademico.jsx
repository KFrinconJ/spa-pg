import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import { useProgramaAcademico } from '../../hooks/useProgramasAcademicos';
import NavBar from '../NavBar';
import UpdateProgramaAcadmicoForm from './UpdateProgramaAcademicoForm';

export default function EditProgramaAcademico() {
    // Obtenemos el email desde los parámetros de la ruta
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
                <div className="max-w-4xl mx-auto mt-10 shadow-md overflow-hidden md:max-w-2xl">
                    <UpdateProgramaAcadmicoForm dataIn={programaAcademico} />
                </div>
            </>
        );

    }

}

