
import { useAuth0 } from "@auth0/auth0-react"
import AdminView from "./rol_views/AdminView"
import { useState, useEffect } from 'react'
import { getUserRol } from "../services/usuario.service"
import DocenteView from "./rol_views/DocenteView"
import DirectorView from "./rol_views/DirectorView"
import LoadingView from "./LoadingView"
import ErrorPage from "./Error"


export default function Dashboard() {

    // Obtener el token del usuario activo
    const { user, getAccessTokenSilently } = useAuth0()
    const [rol, setRol] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const obtenerRol = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const id = user.sub; // 'sub' contiene el ID del usuario en Auth0
            const response = await getUserRol(accessToken, id)

            if (response.error) {
                console.error('Error al obtener el rol del usuario:', response.error);
                setRol([{ name: "None" }])

            } else {
                setRol(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso o el ID del usuario:', error);
        }
    };

    // LLamado de la funcion obtener rol
    useEffect(() => {
        obtenerRol().then(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }


    if (rol == false) {
        return <ErrorPage errorCode={403} errorMessage={"Lo sentimos, aún no se ha asignado un rol a este usuario"}></ErrorPage>
    }
    else {
        const rolUsuario = rol[0].name;
        if (user && rolUsuario == "Administrador") {
            return <AdminView></AdminView>
        }

        if (user && rolUsuario == "Docente") {
            return <DocenteView></DocenteView>
        }

        if (user && rolUsuario == "DP") {
            return <DirectorView></DirectorView>
        }
    }



}