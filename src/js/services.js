import { API_URL } from "./constants.js";

//Obtener Tareas
export const obtenerTareas = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error("ERROR EN LA RESPUESTA DEL SERVIDOR");
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
    }
};

//Borrar Tareas
export const eliminarTareas = (id) => {
    return fetch(API_URL + `/${id}`, {
        method: "DELETE",
    });
};
