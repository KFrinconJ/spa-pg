import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;



export const columns = [
    { name: "ID", uid: "id", sortable: false },
    { name: "NOMBRE", uid: "nombre", sortable: true },
    { name: "APELLIDO", uid: "apellido", sortable: true },
    { name: "CEDULA", uid: "cedula" },
    { name: "EMAIL", uid: "email" },
    { name: "ACTIONS", uid: "actions" },
];


export const visible_columns = ["nombre", "role", "email", "acciones"]


export const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
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
