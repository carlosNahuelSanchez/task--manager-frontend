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
        $tareaContenedor.classList.add("border-2", "border-white", "bg-zinc-950", "pt-5","pb-2","pr-24","pl-5", "max-w-72", "h-fit", "rounded-lg");

        const $titulo = document.createElement("span");
        $titulo.classList.add("font-bold");
        $titulo.textContent = "Titulo:";
        const $tareaTitulo = document.createElement("div");
        $tareaTitulo.classList.add("w-48","font-medium","my-2","break-words")
        $tareaTitulo.textContent = tarea.title
        $titulo.appendChild($tareaTitulo);
        $tareaContenedor.appendChild($titulo);

        const $descripcion = document.createElement("span");
        $descripcion.classList.add("font-bold" );
        $descripcion.textContent = "Descripción:";
        const $tareaDescripcion = document.createElement("div");
        $tareaDescripcion.classList.add("w-60","font-medium","my-2","break-words")
        $tareaDescripcion.textContent = tarea.description
        $descripcion.appendChild($tareaDescripcion);
        $tareaContenedor.appendChild($descripcion);

        const $estado = document.createElement("span");
        $estado.classList.add("font-bold" );
        $estado.textContent = "Estado:";
        const $tareaEstado = document.createElement("div");
        $tareaEstado.classList.add("w-48","font-medium","my-2")
        $tareaEstado.textContent = (tarea.isComplete == 0 ? "Incompleto": "Completo")
        if (tarea.isComplete != 0) {
            $tareaDescripcion.classList.add("line-through")
            $tareaTitulo.classList.add("line-through")
        }
        $estado.appendChild($tareaEstado);
        $tareaContenedor.appendChild($estado);
        
        const $contenedorBotones = document.createElement("div")
        $contenedorBotones.classList.add("flex","flex-row")

        const $botonEliminar = document.createElement("button");
        $botonEliminar.innerText = "Eliminar";
        $botonEliminar.classList.add("bg-red-700", "p-2", "rounded-md", "my-5", "hover:bg-red-950", "transition-all", "mr-2");
        $contenedorBotones.appendChild($botonEliminar)
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
        $botonActualizar.classList.add("bg-zinc-500", "p-2","my-5","rounded-md", "hover:bg-zinc-700", "transition-all");
        $contenedorBotones.appendChild($botonActualizar)
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

        $tareaContenedor.appendChild($contenedorBotones);
        $listaTareas.appendChild($tareaContenedor);
    });
}

//Agregar la tarea a través de formulario
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


