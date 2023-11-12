import NavBar from "../components/NavBar";
import LoadingView from "./LoadingView";

import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { getDbUsuario } from "../services/usuario.service";

import UserCard from "../components/profile_components/UserCard";
import DetailUserForm from "../components/profile_components/DetailUserForm";



export default function Profile() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [userInfo, setUserInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const obtenerUserInfo = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const email = user.email
            const response = await getDbUsuario(accessToken, email);

            if (response.error) {
                console.error("Error al obtener el email del usuario:", response.error);
            } else {
                setUserInfo(response.data);
            }
        } catch (error) {
            console.error(
                "Error al obtener el token de acceso o el email del usuario:",
                error
            );
        }
    };

    // LLamado de la funcion obtener rol
    useEffect(() => {
        obtenerUserInfo().then(() => setIsLoading(false));
    }, [user]);

    if (isLoading) {
        return <LoadingView></LoadingView>; //Renderizar vista de carga
    }


    if (user && userInfo) {
        return (
            <>
                <NavBar></NavBar>
                <div className="container mx-auto min-h-screen">
                    <UserCard userData={user}>
                    </UserCard>

                    <div className="mt-6">
                        <DetailUserForm dataIn={userInfo} />
                    </div>
                </div>
            </>
        );
    }
}
