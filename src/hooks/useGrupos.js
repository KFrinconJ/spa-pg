import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getGruposList, getGrupo } from '../services/grupo.service'

export const useGrupos = () => {
    const [gruposList, setGruposList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerGrupos = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getGruposList(accessToken)

            if (response.error) {
                console.error('Error al obtener la lista de grupos:', response.error);
                setGruposList([{ name: "None" }])
            } else {
                setGruposList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de usuario:', error);
        }
    }

    useEffect(() => {
        obtenerGrupos().then(() => setIsLoading(false))
    }, [])

    return { gruposList, isLoading }
}


export const useGrupo = (id) => {
    const [grupo, setGrupo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerGrupo = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getGrupo(accessToken, id)

            if (response.error) {
                console.error('Error al obtener el grupo:', response.error);
                setGrupo([{ name: "None" }])
            } else {
                setGrupo(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerGrupo().then(() => setIsLoading(false))
    }, [])

    return { grupo, isLoading }
}

