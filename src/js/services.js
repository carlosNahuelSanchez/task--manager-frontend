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

//Subir Tareas
export const subirTareas = async ({ title, description, isComplete }) => {
    return fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ title, description, isComplete }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
};

export const actualizarTareas = (id, { title, description, isComplete }) => {
    return fetch(API_URL + `/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            description,
            isComplete,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

