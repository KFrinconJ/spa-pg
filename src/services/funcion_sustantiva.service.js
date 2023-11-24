import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const columns = [
    { name: "NOMBRE", uid: "nombre" },
    { name: "CANTIDAD HORAS", uid: "cantidad_horas" },
    { name: "DEPENDENCIA", uid: "dependencia" },
    { name: "ACCIONES", uid: "acciones" },
];


export const getFuncionesSustantivasList = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/api/v1/funcion-sustantiva`,
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

export const getFuncionSustantiva = async (accessToken, id) => {
    const config = {
        url: `${apiServerUrl}/api/v1/funcion-sustantiva/${id}`,
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
export const updateFuncionSustantiva = async (accessToken, id, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/funcion-sustantiva/${id}`,
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



export const createFuncionSustantiva = async (accessToken, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/funcion-sustantiva`,
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