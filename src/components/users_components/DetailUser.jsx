import { useParams } from 'react-router-dom';
import { useUserDetail } from '../../hooks/useUserDetail';
import LoadingView from '../../views/LoadingView';

export default function DetailUser() {
    // Obtenemos el email desde los parámetros de la ruta
    const { email } = useParams();

    const { userInfo, isLoading } = useUserDetail(email)


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (userInfo) {
        // Una vez los datos del usuario están disponibles
        return (
            <div>
                <h1>Detalles del usuario</h1>
                <p>Nombre: {userInfo.nombre}</p>
                <p>Email: {userInfo.email}</p>
                <p>Rol: {userInfo.apellido}</p>
            </div>
        );

    }

}

