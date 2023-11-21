import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getDbListProgramasAcademicos, getProgramaAcademico } from '../services/programa_academico.service'


export const useProgramasAcademicos = () => {
    const [programaAcademicoList, setProgramaAcademicoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerProgramasAcademicos = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getDbListProgramasAcademicos(accessToken)

            if (response.error) {
                console.error('Error al obtener la lista de programas academicos:', response.error);
                setProgramaAcademicoList([{ name: "None" }])
            } else {
                setProgramaAcademicoList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerProgramasAcademicos().then(() => setIsLoading(false))
    }, [])

    return { programaAcademicoList, isLoading }
}

export const useProgramaAcademico = (snies) => {
    const [programaAcademico, setProgramaAcademico] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerProgramaAcademico = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getProgramaAcademico(accessToken, snies)

            if (response.error) {
                console.error('Error al obtener el programa academico:', response.error);
                setProgramaAcademico([{ name: "None" }])
            } else {
                setProgramaAcademico(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerProgramaAcademico().then(() => setIsLoading(false))
    }, [])

    return { programaAcademico, isLoading }
}
