import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const columns = [
    { name: "NOMBRE", uid: "nombre" },
    { name: "CODIGO", uid: "codigo" },
    { name: "CANTIDAD HORAS", uid: "cantidad_horas" },
    { name: "ACCIONES", uid: "acciones" },
];

export const getCursosList = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/api/v1/curso`,
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