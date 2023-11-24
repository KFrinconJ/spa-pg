import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const columns = [
    { name: "NOMBRE", uid: "nombre" },
    { name: "HORAS SEMANALES", uid: "cantidad_horas" },
    { name: "ACCIONES", uid: "acciones" },
];

export const getActividadesList = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/api/v1/actividad`,
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

export const getActividad = async (accessToken, id) => {
    const config = {
        url: `${apiServerUrl}/api/v1/actividad/${id}`,
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
export const updateActividad = async (accessToken, id, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/actividad/${id}`,
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



export const createActividad = async (accessToken, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/actividad`,
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