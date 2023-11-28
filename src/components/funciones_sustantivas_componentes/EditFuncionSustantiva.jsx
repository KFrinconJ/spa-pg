import { useParams } from 'react-router-dom';
import LoadingView from '../../views/LoadingView';
import { useFuncionSustantiva } from '../../hooks/useFuncionesSustantivas';
import NavBar from '../NavBar';
import FuncionSustantivaForm from './FuncionSustantivaForm';

export default function EditFuncionSustantiva() {
    // Obtenemos el email desde los parámetros de la ruta
    const { id } = useParams();

    const { funcionSustantiva, isLoading } = useFuncionSustantiva(id)


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (funcionSustantiva) {
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <NavBar></NavBar>
                <div className="max-w-4xl mx-auto mt-10 shadow-md overflow-hidden md:max-w-2xl">
                    <FuncionSustantivaForm dataIn={funcionSustantiva} />
                </div>
            </>
        );

    }

}

