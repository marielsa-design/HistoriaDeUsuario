import { getTasks, deleteTask } from "../../services/task.service.js"; 

export function renderTasks() {
  return `
  <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
      <nav class="hidden gap-3 md:flex">
        <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
        <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/tasks">Tareas</a>
        <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
      </nav>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-6 py-10">
    <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight">Mis tareas</h1>
        <p class="mt-4 max-w-2xl text-blue-50">Vista principal para listar, editar y eliminar las tareas del usuario autenticado.</p>
      </div>
      <a id="btn-create-task" class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
        href="/task/new">Crear tarea</a>
    </section>

    <section id="tasks-list" class="mt-8 grid gap-4">
      <p class="text-slate-500">Cargando tareas...</p>
    </section>
  </main>
  `;
}

export async function setupTasksView() {
  const list = document.getElementById("tasks-list");

  // Si por alguna razón cambiamos de vista rápido y el contenedor no existe, frena la ejecución
  if (!list) return;

  try {
    // Petición al endpoint/función que trae las tareas
    const tasks = await getTasks();

    // Validamos si la lista viene vacía
    if (!tasks || tasks.length === 0) {
      list.innerHTML = `<p class="text-slate-500 text-center py-10">No hay tareas aún.</p>`;
      return;
    }

    // Renderizamos las tareas dinámicamente mapeando el array
    list.innerHTML = tasks.map(task => `
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
            <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <span class="inline-block text-xs font-bold uppercase tracking-[0.25em] text-blue-600 mb-2">${task.status}</span>
                    <h2 class="text-2xl font-bold text-slate-900">${task.title}</h2>
                    <p class="mt-3 max-w-2xl text-slate-600">${task.description}</p>
                </div>
                <div class="flex gap-3">
                    <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                        href="/task/edit?id=${task.id}">Editar</a>
                    <button data-id="${task.id}"
                        class="btn-delete rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                        Eliminar
                    </button>
                </div>
            </div>
        </article>
    `).join("");

    // Escuchador de eventos para los botones de eliminar
    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        
        // Ejecutamos la eliminación en el backend/JSON
        await deleteTask(id);
        
        // Volvemos a llamar a la función para refrescar la lista en tiempo real
        setupTasksView();
      });
    });

  } catch (error) {
    console.error("Error cargando la vista de tareas:", error);
    list.innerHTML = `<p class="text-red-500">Error al cargar las tareas. Inténtalo de nuevo.</p>`;
  }
}

// Interceptamos el botón "Crear Tarea"
    const btnCreate = document.getElementById("btn-create-task");
    if (btnCreate) {
      btnCreate.addEventListener("click", (e) => {
        e.preventDefault(); 
        const url = btnCreate.getAttribute("href");
        
        // utilizar la parte de historial del navegador:
        window.history.pushState({}, "", url);
        
      });
    }