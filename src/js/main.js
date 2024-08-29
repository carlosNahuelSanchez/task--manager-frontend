import "../styles/style.css";
import { obtenerTareas, eliminarTareas, subirTareas, actualizarTareas } from "./services";

//Renderizar todas las tareas actuales
const renderTareas = async () => {
    const tareas = await obtenerTareas();
    console.log(tareas);
    const $listaTareas = document.getElementById("lista-tareas");
    $listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const $tareaContenedor = document.createElement("div");
        $tareaContenedor.classList.add("border-2", "border-white", "bg-zinc-950", "px-5", "pt-2", "w-fit", "h-fit", "rounded-lg");

        const $tareaTitulo = document.createElement("p");
        $tareaTitulo.classList.add("w-48", "break-words")
        const $titulo = document.createElement("h3");
        $titulo.classList.add("font-bold", "my-2");
        $titulo.textContent = "Titulo:";
        $tareaTitulo.appendChild($titulo);
        $tareaTitulo.appendChild(document.createTextNode(tarea.title));
        $tareaContenedor.appendChild($tareaTitulo);

        const $tareaDescripcion = document.createElement("p");
        $tareaDescripcion.classList.add("w-80", "break-words")
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
        $botonEliminar.classList.add("bg-red-700", "p-2", "rounded-md", "my-5", "hover:bg-red-950", "transition-all", "mr-2");
        $botonEliminar.addEventListener("click", async () => {
            const $idDeTarea = await tarea.id
            document.getElementById("modalEliminarTarea").classList.remove("hidden")

            const $modalConfirmar = document.getElementById("botonModalConfirmar")
            $modalConfirmar.addEventListener("click", async () => {
                try {
                    await eliminarTareas($idDeTarea);
                    renderTareas();
                } catch (error) {
                    console.error("NO SE PUDO ELIMINAR LA TAREA", error);
                }
                finally {
                    document.getElementById("modalEliminarTarea").classList.add("hidden");
                }
            })
            const $modalCancelar = document.getElementById("botonModalCancelar")
            $modalCancelar.addEventListener("click", async () => {
                document.getElementById("modalEliminarTarea").classList.add("hidden");
            })
        });



        const $botonActualizar = document.createElement("button");
        $botonActualizar.innerText = "Actualizar";
        $botonActualizar.classList.add("bg-zinc-500", "p-2", "rounded-md", "hover:bg-zinc-700", "transition-all");
        $botonActualizar.addEventListener("click", async () => {
            const $idDeTarea = await tarea.id
            document.getElementById("modalActualizarTarea").classList.remove("hidden")

            document.getElementById("tareaNombreNuevo").value = tarea.title;
            document.getElementById("tareaDescripcionNuevo").value = tarea.description;
            document.getElementById("tareaEstadoNuevo").checked = tarea.isComplete;

            const $botonActualizarForm = document.getElementById("botonActualizar")
            $botonActualizarForm.addEventListener("click", async (e) => {
                e.preventDefault()

                const title = document.getElementById("tareaNombreNuevo").value
                const description = document.getElementById("tareaDescripcionNuevo").value
                let isComplete = document.getElementById("tareaEstadoNuevo").checked
                isComplete = isComplete ? 1 : 0;

                try {
                    await actualizarTareas($idDeTarea, { title, description, isComplete });
                    renderTareas();
                } catch (error) {
                    console.error("NO SE PUDO ACTUALIZAR LA TAREA", error);
                }
                finally {
                    document.getElementById("modalActualizarTarea").classList.add("hidden");
                }
            })
            const $botonCancelarActualizar = document.getElementById("botonCancelarActualizar")
            $botonCancelarActualizar.addEventListener("click", async (e) => {
                e.preventDefault()

                document.getElementById("modalActualizarTarea").classList.add("hidden");
            })
        })

        $tareaContenedor.appendChild($botonEliminar);
        $tareaContenedor.appendChild($botonActualizar);
        $listaTareas.appendChild($tareaContenedor);
    });
}


const agregarTarea = async (e) => {
    e.preventDefault()

    const title = document.getElementById("tareaNombre").value
    const description = document.getElementById("tareaDescripcion").value
    let isComplete = document.getElementById("tareaEstado").checked
    isComplete = isComplete ? 1 : 0;

    const nuevaTarea = {
        title: title,
        description: description,
        isComplete: isComplete
    }

    try {
        await subirTareas(nuevaTarea)
        renderTareas()
    } catch (error) {
        console.error("NO SE PUDO AÑADIR LA TAREA", error)
    }
    finally {
        document.getElementById("formularioTarea").reset()
    }
}

const $formularioTareaNueva = document.getElementById("formularioTarea")

$formularioTareaNueva.addEventListener("submit", agregarTarea)

renderTareas()


