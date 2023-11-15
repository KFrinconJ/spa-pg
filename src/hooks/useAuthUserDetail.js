import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getAuthUser } from '../services/usuario.service'

export const useAuthUserDetail = (userId) => {
    const { getAccessTokenSilently } = useAuth0();
    const [authUserInfo, setAuthUserInfo] = useState();
    const [authLoading, setAuthLoading] = useState(true);


    const obtenerAuthUserInfo = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            if (userId) {
                const response = await getAuthUser(accessToken, userId);

                if (response.error) {
                    console.error("Error al obtener el email del usuario:", response.error);
                } else {
                    setAuthUserInfo(response.data);
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
        obtenerAuthUserInfo().then(() => setAuthLoading(false));
    }, [userId]);

    return { authUserInfo, authLoading }
}
