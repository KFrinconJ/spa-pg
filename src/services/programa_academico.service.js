import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;


export const columns = [
    { name: "NOMBRE", uid: "nombre" },
    { name: "CODIGO SNIES", uid: "codigo_snies" },
    { name: "DIRECTOR", uid: "director" },
    { name: "ACCIONES", uid: "acciones" },
];

export const getDbListProgramasAcademicos = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/api/v1/programa-academico`,
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



export const getProgramaAcademico = async (accessToken, snies) => {
    const config = {
        url: `${apiServerUrl}/api/v1/programa-academico/snies/${snies}`,
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
export const updateProgramaAcademico = async (accessToken, snies, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/programa-academico/snies/${snies}`,
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



export const createProgramaAcademico = async (accessToken, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/programa-academico`,
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