import { renderTaskForm, setupTasksFormView } from "../../views/tasks/task";

export function renderTaskForm() {
  return `
<body class="min-h-screen bg-sky-50 text-slate-800">
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

  <main class="mx-auto max-w-2xl px-6 py-10">
    <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Formulario</p>
      <h1 id="form-title" class="mt-3 text-4xl font-black tracking-tight">Nueva tarea</h1>
    </section>

    <article class="rounded-3xl border border-blue-100 bg-white p-8 shadow-lg shadow-blue-50">
      <div class="grid gap-5">
        <div>
          <label class="text-sm font-semibold text-slate-700">Título</label>
          <input id="task-title" type="text" placeholder="Título de la tarea"
            class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"/>
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700">Descripción</label>
          <textarea id="task-description" rows="3" placeholder="Descripción de la tarea"
            class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"></textarea>
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700">Estado</label>
          <select id="task-status" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400">
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>
        <p id="form-error" class="hidden text-sm text-red-500">Completa todos los campos.</p>
        <button id="btn-submit"
          class="w-full rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500">
          Guardar tarea
        </button>
      </div>
    </article>
  </main>
</body>
    `
}

export async function setupTasksFormView() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get("id")
  const isEdit = !!id

  if (isEdit) {
    document.getElementById("form-title").textContent = "Editar tarea"
    const tasks = await getTasks()
    const task = tasks.find(t => String(t.id) === String(id))
    if (task) {
      document.getElementById("task-title").value = task.title
      document.getElementById("task-description").value = task.description
      document.getElementById("task-status").value = task.status
    }
  }

  document.getElementById("btn-submit").addEventListener("click", async () => {
    const title = document.getElementById("task-title").value.trim()
    const description = document.getElementById("task-description").value.trim()
    const status = document.getElementById("task-status").value

    if (!title || !description) {
      document.getElementById("form-error").classList.remove("hidden")
      return
    }

    if (isEdit) {
      await updateTask(id, { title, description, status })
    } else {
      await createTask({ title, description, status })
    }

    window.history.pushState({}, "", "/tasks")

    const { renderRouter } = await import("../../router/router")
    renderRouter()
  })
}