import "../styles/style.css";
import { obtenerTareas, eliminarTareas, subirTareas} from "./services";

//Renderizar todas las tareas actuales
const renderTareas = async () => {
    const tareas = await obtenerTareas();
    console.log(tareas);
    const $listaTareas = document.getElementById("lista-tareas");
    $listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const $tareaContenedor = document.createElement("div");
        $tareaContenedor.classList.add("border-2", "border-white", "bg-zinc-950", "px-5", "pt-2", "w-96","h-72", "rounded-lg");

        const $tareaTitulo = document.createElement("p");
        const $titulo = document.createElement("h3");
        $titulo.classList.add("font-bold", "my-2");
        $titulo.textContent = "Titulo:";
        $tareaTitulo.appendChild($titulo);
        $tareaTitulo.appendChild(document.createTextNode(tarea.title));
        $tareaContenedor.appendChild($tareaTitulo);

        const $tareaDescripcion = document.createElement("p");
        const $descripcion = document.createElement("h3");
        $descripcion.classList.add("font-bold", "my-2");
        $descripcion.textContent = "Descripcion:";
        $tareaDescripcion.appendChild($descripcion);
        $tareaDescripcion.appendChild(document.createTextNode(tarea.description));
        $tareaContenedor.appendChild($tareaDescripcion);

        const $tareaEstado = document.createElement("p");
        const $estado = document.createElement("h3");
        $estado.classList.add("font-bold", "my-2");
        $estado.textContent = "Estado:";
        $tareaEstado.appendChild($estado);
        $tareaEstado.appendChild(document.createTextNode(tarea.isComplete == 0 ? " Incompleto" : " Completo"));
        $tareaContenedor.appendChild($tareaEstado);

        const $botonEliminar = document.createElement("button");
        $botonEliminar.innerText = "Eliminar";
        $botonEliminar.classList.add("bg-red-700","p-2", "rounded-md", "mt-3", "hover:bg-red-950", "transition-all","mr-2");
        $botonEliminar.addEventListener("click", async () => {
            try {
                await eliminarTareas(tarea.id);
                renderTareas();
            } catch (error) {
                console.error("NO SE PUDO ELIMINAR LA TAREA", error);
            }
        });

        const $botonActualizar = document.createElement("button");
        $botonActualizar.innerText = "Actualizar";
        $botonActualizar.classList.add("bg-zinc-500","p-2", "rounded-md", "mt-3", "hover:bg-zinc-700", "transition-all");

        $tareaContenedor.appendChild($botonEliminar);
        $tareaContenedor.appendChild($botonActualizar);
        $listaTareas.appendChild($tareaContenedor);
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


