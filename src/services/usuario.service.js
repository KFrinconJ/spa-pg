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



export const getPublicResource = async () => {
    const config = {
        url: `${apiServerUrl}/api/v1/actividad`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
};

export const getListUsuarios = async (accessToken) => {
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

export const getUsuario = async (accessToken) => {
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


export const updateUsuarios = async (accessToken) => {
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
