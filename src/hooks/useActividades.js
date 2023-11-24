import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getActividadesList, getActividad } from '../services/actividad.service'

export const useActividades = () => {
    const [actividadesList, setActividadesList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerActividades = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getActividadesList(accessToken)

            if (response.error) {
                console.error('Error al obtener la lista de actividades:', response.error);
                setActividadesList([{ name: "None" }])
            } else {
                setActividadesList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerActividades().then(() => setIsLoading(false))
    }, [])

    return { actividadesList, isLoading }
}


export const useActividad = (id) => {
    const [actividad, setActividad] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerActividad = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getActividad(accessToken, id)

            if (response.error) {
                console.error('Error al obtener la actividad:', response.error);
                setActividad([{ name: "None" }])
            } else {
                setActividad(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerActividad().then(() => setIsLoading(false))
    }, [])

    return { actividad, isLoading }
}
