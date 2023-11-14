import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getUsersList } from '../services/usuario.service'

export const useUsers = () => {
    const [usersList, setUsersList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerUsuarios = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getUsersList(accessToken)

            if (response.error) {
                console.error('Error al obtener el rol del usuario:', response.error);
                setUsersList([{ name: "None" }])
            } else {
                setUsersList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso o el ID del usuario:', error);
        }
    }

    useEffect(() => {
        obtenerUsuarios().then(() => setIsLoading(false))
    }, [])

    return { usersList, isLoading }
}
