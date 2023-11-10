
import { useAuth0 } from "@auth0/auth0-react"
import AdminView from "./rol_views/AdminView"
import { useState, useEffect } from 'react'
import { getUserRol } from "../services/usuario.service"
import DocenteView from "./rol_views/DocenteView"
import DirectorView from "./rol_views/DirectorView"

export default function Dashboard() {

    // Obtener el token del usuario activo
    const { user, getAccessTokenSilently } = useAuth0()
    const [rol, setRol] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const obtenerRol = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const id = user.sub; // 'sub' generalmente contiene el ID del usuario en Auth0
            const response = await getUserRol(accessToken, id);

            if (response.error) {
                console.error('Error al obtener el rol del usuario:', response.error);
            } else {
                setRol(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso o el ID del usuario:', error);
        }
    };

    // Luego puedes llamar a la función obtenerRol en un efecto secundario o en un manejador de eventos
    useEffect(() => {
        obtenerRol().then(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>; // Puedes renderizar un componente de carga aquí
    }


    const rolUsuario = rol[0].name;
    console.log(rolUsuario);
    if (user && rolUsuario == "Administrador") {
        return <AdminView></AdminView>
    }

    if (user && rolUsuario == "Docente"){
        return <DocenteView></DocenteView>
    }

    if (user && rolUsuario == "DP"){
        return <DirectorView></DirectorView>
    }



}