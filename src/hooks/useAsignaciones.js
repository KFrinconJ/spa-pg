import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {  getAsignacionesList, getAsignacion } from '../services/asignacion.service'

export const useAsignaciones = () => {
    const [asignacionesList, setAsignacionesList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerAsignaciones = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getAsignacionesList(accessToken)

            if (response.error) {
                console.error('Error al obtener la lista de asignaciones:', response.error);
                setAsignacionesList([{ name: "None" }])
            } else {
                setAsignacionesList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerAsignaciones().then(() => setIsLoading(false))
    }, [])

    return { asignacionesList, isLoading }
}


export const useAsignacion = (id) => {
    const [asignacion, setAsignacion] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerAsignacion = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getAsignacion(accessToken, id)

            if (response.error) {
                console.error('Error al obtener la asignacion:', response.error);
                setAsignacion([{ name: "None" }])
            } else {
                setAsignacion(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerAsignacion().then(() => setIsLoading(false))
    }, [])

    return { asignacion, isLoading }
}
