import { useParams } from 'react-router-dom';
import { useUserDetail } from '../../hooks/useUserDetail';
import LoadingView from '../../views/LoadingView';
import UpdateUserForm from './UpdateUserForm';
import AuthUpdateUser from './AuthUpdateUser';

export default function EditUser() {
    // Obtenemos el email desde los parámetros de la ruta
    const { email } = useParams();

    const { userInfo, isLoading } = useUserDetail(email)


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    if (userInfo) {
        // Una vez los datos del usuario están disponibles
        return (
            <>
                <UpdateUserForm dataIn={userInfo} />
                <div className="max-w-4xl mx-auto mt-10 shadow-md overflow-hidden md:max-w-2xl">
                    <AuthUpdateUser id={userInfo.id} />
                </div>
            </>
        );

    }

}

