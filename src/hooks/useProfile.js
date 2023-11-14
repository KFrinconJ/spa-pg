import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getDbUsuario } from '../services/usuario.service'

export const useProfile = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [userInfo, setUserInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const obtenerUserInfo = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            if (user) {
                const email = user.email;
                const response = await getDbUsuario(accessToken, email);

                if (response.error) {
                    console.error("Error al obtener el email del usuario:", response.error);
                } else {
                    setUserInfo(response.data);
                }
            }
        } catch (error) {
            console.error(
                "Error al obtener el token de acceso o el email del usuario:",
                error
            );
        }
    };

    useEffect(() => {
        obtenerUserInfo().then(() => setIsLoading(false));
    }, [user]);

    return { userInfo, isLoading }
}
