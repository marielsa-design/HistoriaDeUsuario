export function renderDashboard() {
    return `
<body class="min-h-screen bg-sky-50 text-slate-800">
  <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
      <nav class="hidden gap-3 md:flex">
        <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          href="/dashboard">Dashboard</a>
        <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
          href="/tasks">Tareas</a>
        <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
          href="/admin">Admin</a>
      </nav>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-6 py-10">
    <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Bienvenido</p>
      <h1 class="mt-3 text-4xl font-black tracking-tight">Dashboard</h1>
      <p class="mt-4 max-w-2xl text-blue-50">Resumen general de tus tareas y actividad reciente.</p>
    </section>
  </main>
</body>
    `
}

export const setupDashboard = () => {
    
}