import NavBar from "../components/NavBar";
import LoadingView from "./LoadingView";
import { Input, user } from "@nextui-org/react";

import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { getDbUsuario } from "../services/usuario.service";

function ConditionalInput({ userInfo, dbdata, label, placeholder = "", type, disabled = false }) {
    return (
        <>
            {userInfo ? (
                <Input
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    value={dbdata}
                    disabled={disabled}
                />
            ) : (
                <Input type={type} label={label} placeholder={placeholder} />
            )}
        </>
    );
}

function DetailUserForm({ userInfo }) {
    return (
        <>
            <h2 className="text-2xl font-bold mb-2 text-center">Detalles del usuario:</h2>

            <form action="" className="w-full max-w-lg mx-auto mt-5">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        {/* Nombre */}
                        <ConditionalInput
                            userInfo={userInfo}
                            label={"Nombre"}
                            dbdata={userInfo.nombre}
                            type={"text"}
                            placeholder={"Ingresa el Nombre"}
                        ></ConditionalInput>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" >
                        {/* Apellido */}
                        <ConditionalInput
                            userInfo={userInfo}
                            label={"Apellido"}
                            dbdata={userInfo.apellido}
                            type={"text"}
                            placeholder={"Ingresa el Apellido"}
                        ></ConditionalInput>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        {/* Cedula */}
                        <ConditionalInput
                            userInfo={userInfo}
                            label={"Cédula"}
                            dbdata={userInfo.cedula}
                            type={"tel"}
                            placeholder={"Ingresa el número de identificación"}
                        ></ConditionalInput>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        {/* Horas Laborales */}
                        <ConditionalInput
                            userInfo={userInfo}
                            label={"Horas Laborales"}
                            dbdata={userInfo.horas_laborales}
                            type={"text"}
                            disabled={true}
                        ></ConditionalInput>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" >
                        {/* Apellido */}
                        <ConditionalInput
                            userInfo={userInfo}
                            label={"Programa Académico"}
                            dbdata={userInfo.programa}
                            type={"tel"}
                            disabled={true}
                        ></ConditionalInput>
                    </div>
                </div>
            </form>
        </>
    );
}

export default function Profile() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [userInfo, setUserInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const obtenerUserInfo = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const email = user.email; // Email del usuario
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
    }, []);

    if (isLoading) {
        return <LoadingView></LoadingView>; //Renderizar vista de carga
    }

    console.log(userInfo);

    if (user && userInfo) {
        return (
            <>
                <NavBar></NavBar>
                <div className="container mx-auto min-h-screen">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img
                                    className="h-48 w-full object-cover md:w-48"
                                    src={user.picture}
                                    alt="Profile"
                                />
                            </div>
                            <div className="p-8">
                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                    Perfil de usuario
                                </div>
                                <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                                    {user.name}
                                </h2>
                                <p className="mt-2 text-gray-500">{user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <DetailUserForm userInfo={userInfo} />
                    </div>
                </div>
            </>
        );
    }
}
