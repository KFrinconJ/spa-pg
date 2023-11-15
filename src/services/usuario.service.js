import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;


export const columns = [
    { name: "NOMBRE", uid: "name" },
    { name: "ROL", uid: "rol" },
    { name: "EMAIL", uid: "email" },
    { name: "ACCIONES", uid: "acciones" },
];


export const getDbListUsuarios = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/api/v1/usuario`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};


//Obtener usuario de la  base de datos
export const getDbUsuario = async (accessToken, email) => {
    const config = {
        url: `${apiServerUrl}/api/v1/usuario/${email}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};



//Actualizar usuario de la base de datos
export const updateDbUsuario = async (accessToken, email, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/usuario/${email}`,
        method: "PUT",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        data: JSON.stringify(bodyData),
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};


//Obtener rol de usuario del servicio auth0
export const getUserRol = async (accessToken, id) => {
    const config = {
        url: `${apiServerUrl}/auth0/users/${id}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};


//Obtener lista de usuarios
export const getUsersList = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/api/v1/usuario/auth0/users`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};



//Obtener informacion del usuario del servicio auth0
export const getAuthUser = async (accessToken, id) => {
    const config = {
        url: `${apiServerUrl}/api/v1/usuario/auth0/users/${id}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

