import "../styles/style.css";
import { obtenerTareas, eliminarTareas  } from "./services";

//Renderizar todas las tareas actuales
const renderTareas = async () => {
    const tareas = await obtenerTareas()
    console.log(tareas)
    const $listaTareas = document.getElementById("lista-tareas")
    $listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const $tareaContenedor = document.createElement("div")
        $tareaContenedor.classList.add("tarea");
        const $tareaTitulo = document.createElement("p");
        $tareaTitulo.innerHTML = "<h3>Titulo:</h3>" + tarea.title
        $tareaContenedor.appendChild($tareaTitulo)
        const $tareaDescripcion = document.createElement("p")
        $tareaDescripcion.innerHTML = "<h3>Descripcion:</h3>" + tarea.description
        $tareaContenedor.appendChild($tareaDescripcion)
        const $tareaEstado = document.createElement("p")
        if (tarea.isComplete == 0) {
            $tareaEstado.innerHTML = "<h3>Estado:</h3> Incompleto"
            $tareaContenedor.appendChild($tareaEstado)
        } else {
            $tareaEstado.innerHTML = "<h3>Estado:</h3> Completo"
            $tareaContenedor.appendChild($tareaEstado)
        }
        const $botonEliminar = document.createElement("button")
        $botonEliminar.innerText = "Eliminar"
        $botonEliminar.classList.add("boton-eliminar")
        $botonEliminar.addEventListener("click", async () => {
            try {
                await eliminarTareas(tarea.id)
                renderTareas()
            } catch (error) {
                console.error("NO SE PUDO ELIMINAR LA TAREA")
            }
        })
        $tareaContenedor.appendChild($botonEliminar);

        $listaTareas.appendChild($tareaContenedor)
    });
}


renderTareas()


