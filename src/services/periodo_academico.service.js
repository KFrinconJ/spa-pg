import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const columns = [
    { name: "NOMBRE", uid: "nombre" },
    { name: "ACTIVO", uid: "activo" },
    { name: "FECHA INICIO", uid: "fecha_inicio" },
    { name: "FECHA FIN", uid: "fecha_fin" },
    { name: "ACCIONES", uid: "acciones" },
];

export const getPeriodosAcademicosList = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/api/v1/periodo-academico`,
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

export const getPeriodoAcademico = async (accessToken, id) => {
    const config = {
        url: `${apiServerUrl}/api/v1/periodo-academico/${id}`,
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
export const updatePeriodoAcademico = async (accessToken, id, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/periodo-academico/${id}`,
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



export const createPeriodoAcademico = async (accessToken, bodyData) => {
    const config = {
        url: `${apiServerUrl}/api/v1/periodo-academico`,
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