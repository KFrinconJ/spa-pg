import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getFuncionesSustantivasList, getFuncionSustantiva } from '../services/funcion_sustantiva.service'

export const useFuncionesSustantivas = () => {
    const [funcionesSustantivasList, setFuncionesSustantivasList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerFuncionesSustantivas = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getFuncionesSustantivasList(accessToken)

            if (response.error) {
                console.error('Error al obtener la lista de actividades:', response.error);
                setFuncionesSustantivasList([{ name: "None" }])
            } else {
                setFuncionesSustantivasList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerFuncionesSustantivas().then(() => setIsLoading(false))
    }, [])

    return { funcionesSustantivasList, isLoading }
}


export const useFuncionSustantiva = (id) => {
    const [funcionSustantiva, setFuncionSustantiva] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerFuncionSustantiva = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getFuncionSustantiva(accessToken, id)

            if (response.error) {
                console.error('Error al obtener la Periodo Academico:', response.error);
                setFuncionSustantiva([{ name: "None" }])
            } else {
                setFuncionSustantiva(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerFuncionSustantiva().then(() => setIsLoading(false))
    }, [])

    return { funcionSustantiva, isLoading }
}
