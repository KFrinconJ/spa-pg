import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getCursosList , getCurso} from '../services/curso.service'

export const useCursos = () => {
    const [cursosList, setcursosList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerCursos = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getCursosList(accessToken)

            if (response.error) {
                console.error('Error al obtener la lista de cursos:', response.error);
                setcursosList([{ name: "None" }])
            } else {
                setcursosList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerCursos().then(() => setIsLoading(false))
    }, [])

    return { cursosList, isLoading }
}


export const useCurso = (id) => {
    const [curso, serCurso] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { getAccessTokenSilently } = useAuth0()

    const obtenerCursos = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getCurso(accessToken, id)

            if (response.error) {
                console.error('Error al obtener la lista de cursos:', response.error);
                serCurso([{ name: "None" }])
            } else {
                serCurso(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
        }
    }

    useEffect(() => {
        obtenerCursos().then(() => setIsLoading(false))
    }, [])

    return { curso, isLoading }
}






