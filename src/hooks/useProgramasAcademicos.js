import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getDbListProgramasAcademicos } from '../services/programa_academico.service'


export const useProgramasAcademicos = () => {
    const [programaAcademicoList, setProgramaAcademicoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerProgramasAcademicos = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getDbListProgramasAcademicos(accessToken)

            if (response.error) {
                console.error('Error al obtener el rol del usuario:', response.error);
                setProgramaAcademicoList([{ name: "None" }])
            } else {
                setProgramaAcademicoList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso o el ID del usuario:', error);
        }
    }

    useEffect(() => {
        obtenerProgramasAcademicos().then(() => setIsLoading(false))
    }, [])

    return { programaAcademicoList, isLoading }
}
