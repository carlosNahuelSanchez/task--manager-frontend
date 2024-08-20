import "../styles/style.css";
import { obtenerTareas, eliminarTareas, subirTareas, actualizarTareas } from "./services";

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
                console.error("NO SE PUDO ELIMINAR LA TAREA",error)
            }
        })
        const $botonActualizar = document.createElement("button")
        $botonActualizar.innerText = "Actualizar"
        $botonActualizar.classList.add("boton-actualizar")

        $tareaContenedor.appendChild($botonEliminar);
        $tareaContenedor.appendChild($botonActualizar)
        $listaTareas.appendChild($tareaContenedor)
    });
}

const  agregarTarea =  async (e) => {
    e.preventDefault()

    const title = document.getElementById("tareaNombre").value
    const description = document.getElementById("tareaDescripcion").value
    let isComplete = document.getElementById("tareaEstado").checked
    isComplete = isComplete ? 1 : 0;
    
    const nuevaTarea = {
        title : title,
        description: description,
        isComplete: isComplete
    }

    try {
        await subirTareas(nuevaTarea)
        console.log(typeof(nuevaTarea))
        renderTareas()
    } catch (error) {
        console.error("NO SE PUDO AÑADIR LA TAREA" , error)
    }
}

const $formularioTareaNueva = document.getElementById("formularioTarea")

$formularioTareaNueva.addEventListener("submit",agregarTarea)

renderTareas()


