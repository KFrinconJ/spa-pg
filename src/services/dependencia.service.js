import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const columns = [
    { name: "NOMBRE", uid: "nombre" },
    { name: "ENCARGADO", uid: "encargado" },
    { name: "ACCIONES", uid: "acciones" },
];

export const getDependenciasList = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/api/v1/dependencia`,
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

export const getDependencia = async (accessToken, id) => {
    const config = {
        url: `${apiServerUrl}/api/v1/dependencia/${id}`,
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

//Actualizar curso de la base de datos
export const updateDependencia = async (accessToken, id, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/dependencia/${id}`,
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



export const createDependencia = async (accessToken, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/dependencia`,
        method: "POST",
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