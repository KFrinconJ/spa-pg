import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getDependenciasList, getDependencia } from '../services/dependencia.service'

export const useDependencias = () => {
    const [dependenciasList, setDependenciasList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerDependencias = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getDependenciasList(accessToken)

            if (response.error) {
                console.error('Error al obtener la lista de dependencias:', response.error);
                setDependenciasList([{ name: "None" }])
            } else {
                setDependenciasList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerDependencias().then(() => setIsLoading(false))
    }, [])

    return { dependenciasList, isLoading }
}


export const useDependencia = (id) => {
    const [dependencia, setDependencia] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerDependencia = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getDependencia(accessToken, id)

            if (response.error) {
                console.error('Error al obtener la lista de dependencias:', response.error);
                setDependencia([{ name: "None" }])
            } else {
                setDependencia(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerDependencia().then(() => setIsLoading(false))
    }, [])

    return { dependencia, isLoading }
}
