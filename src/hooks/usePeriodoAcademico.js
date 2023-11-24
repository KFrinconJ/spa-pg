import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getPeriodosAcademicosList, getPeriodoAcademico } from '../services/periodo_academico.service'

export const usePeriodosAcademicos = () => {
    const [periodosAcademicosList, setPeriodosAcademicosList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerPeriodosAcademicos = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getPeriodosAcademicosList(accessToken)

            if (response.error) {
                console.error('Error al obtener la lista de actividades:', response.error);
                setPeriodosAcademicosList([{ name: "None" }])
            } else {
                setPeriodosAcademicosList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerPeriodosAcademicos().then(() => setIsLoading(false))
    }, [])

    return { periodosAcademicosList, isLoading }
}


export const usePeriodoAcademico = (id) => {
    const [periodoAcademico, setPeriodoAcademico] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerPeriodoAcademico = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getPeriodoAcademico(accessToken, id)

            if (response.error) {
                console.error('Error al obtener la Periodo Academico:', response.error);
                setPeriodoAcademico([{ name: "None" }])
            } else {
                setPeriodoAcademico(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerPeriodoAcademico().then(() => setIsLoading(false))
    }, [])

    return { periodoAcademico, isLoading }
}
