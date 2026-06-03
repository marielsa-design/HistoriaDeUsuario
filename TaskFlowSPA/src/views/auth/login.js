export function renderLogin() {
  return `
 <main class="grid min-h-screen lg:grid-cols-[1fr_0.95fr]">
  <section class="flex items-center justify-center px-6 py-10">
    <div class="w-full max-w-xl rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/70">
      <div class="flex items-center justify-between">
        <a class="text-xl font-black tracking-tight text-blue-900" href="/src/views/home.html">TaskFlowSPA</a>
        <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          href="/register">Registrarse</a>
      </div>

      <div class="mt-8">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Inicio de sesion</p>
        <h1 class="mt-2 text-4xl font-black tracking-tight text-slate-900">Bienvenido de nuevo</h1>
        <p class="mt-4 text-slate-600">Ingresa a tu espacio de trabajo y continua organizando tus tareas.</p>
      <form class="mt-8 grid gap-5">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="email">Correo</label>
          <input id="email" type="email" placeholder="usuario@taskflow.com"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="password">Contrasena</label>
          <input id="password" type="password" placeholder="Ingresa tu contrasena"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
        </div>
        <a id="form-dashboard" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
          href="/dashboard">
          Entrar al dashboard
        </a>
      </form>
    </div>
  </section>

  <section class="hidden bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-center">
    <div class="mx-auto max-w-lg">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">TaskFlowSPA</p>
      <h2 class="mt-4 text-5xl font-black tracking-tight">Una experiencia limpia para aprender una primera SPA.</h2>
      <ul class="mt-8 space-y-4 text-lg leading-8 text-blue-50">
        <li>Autenticacion simplificada con localStorage.</li>
        <li>Gestion de tareas con enfoque claro y visual.</li>
        <li>Roles y permisos entendibles desde el primer recorrido.</li>
      </ul>
    </div>
  </section>
</main>
`
}


export function setupLoginFrom() {
  const loginForm = document.querySelector("form")
  const loginButton = loginForm?.querySelector('ahref="/dashboard"]')

  if (!loginForm || !loginButton) {
    return
  }

  loginButton.addEventListener("click", async (event) => {
    event.preventDefaulf()
    event.stopPropagation()

    const email = document.getElementById("email")?.value ?? ""
    const password = document.getElementById("password")?.value ?? ""

    try {
      const user = await loginUser({ email, password})

      saveSession(user)
      showSuccessToast("Inicio de sesión correcto.")
      window.history.pushState({}, "", "/dashboard")
      window.dispatchEvent(new PopStateEvent("popstate"))
    } catch (error) {
      showErrorToast(error.message)
    }
  })
}

// export function setupLogin() {
//     window.mostrarTab = function(tab) {
//         const formLogin = document.getElementById("form-login")
//         const formSignup = document.getElementById("form-signup")
//         const tabLogin = document.getElementById("tab-login")
//         const tabSignup = document.getElementById("tab-signup")

//         if (tab === "login") {
//             formLogin.classList.remove("hidden")
//             formSignup.classList.add("hidden")
//             tabLogin.classList.add("text-indigo-600", "border-b-2", "border-indigo-600")
//             tabLogin.classList.remove("text-slate-400")
//             tabSignup.classList.remove("text-indigo-600", "border-b-2", "border-indigo-600")
//             tabSignup.classList.add("text-slate-400")
//         } else {
//             formSignup.classList.remove("hidden")
//             formLogin.classList.add("hidden")
//             tabSignup.classList.add("text-indigo-600", "border-b-2", "border-indigo-600")
//             tabSignup.classList.remove("text-slate-400")
//             tabLogin.classList.remove("text-indigo-600", "border-b-2", "border-indigo-600")
//             tabLogin.classList.add("text-slate-400")
//         }
//     }

//     window.iniciarSesion = function() {
//         const usuario = document.getElementById("login-email").value.trim()
//         const password = document.getElementById("login-password").value.trim()

//         if (usuario === "Marielsa" && password === "1234") {
//             localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Marielsa" }))
//             // ✅ Navega por el router, no por href estático
//             window.history.pushState({}, "", "/dashboard")
//             renderRouter()
//         } else {
//             document.getElementById("login-error").classList.remove("hidden")
//         }
//     }

//     window.registrarse = function() {
//         const nombre = document.getElementById("signup-nombre").value.trim()
//         const usuario = document.getElementById("signup-email").value.trim()
//         const password = document.getElementById("signup-password").value.trim()

//         if (!nombre || !usuario || !password) {
//             document.getElementById("signup-error").classList.remove("hidden")
//             return
//         }

//         const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
//         usuarios.push({ nombre, usuario, password })
//         localStorage.setItem("usuarios", JSON.stringify(usuarios))

//         document.getElementById("signup-error").classList.add("hidden")
//         document.getElementById("signup-success").classList.remove("hidden")
//         setTimeout(() => mostrarTab("login"), 1500)
//     }
// }