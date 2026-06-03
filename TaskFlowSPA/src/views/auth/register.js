import { buttonLink } from "../../components/atoms/buttonLink";
import { crearUsuario } from "../../services/users.service";

export function renderRegister() {
    return `
  <main class="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
    <section class="hidden border-r border-blue-100 bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
      <a class="text-xl font-black tracking-tight" href="/src/views/home.html">TaskFlowSPA</a>
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Nuevo usuario</p>
        <h1 class="mt-4 text-5xl font-black tracking-tight">Crea tu cuenta y empieza a organizar tu flujo.</h1>
        <p class="mt-5 max-w-md text-lg leading-8 text-blue-50">
          Esta vista permite enseñar el registro como parte del alcance funcional antes de llevarlo al flujo SPA
          definitivo.
        </p>
      </div>
      <p class="text-sm text-blue-100">Interfaz base del modulo de autenticacion.</p>
    </section>

    <section class="flex items-center justify-center px-6 py-10">
      <div class="w-full max-w-xl rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/70">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Registro</p>
            <h2 class="mt-2 text-3xl font-black text-slate-900">Crear cuenta</h2>
          </div>
          <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            href="/login">Ya tengo cuenta</a>
        </div>

        <form id="register-form" class="mt-8 grid gap-5">
          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="register-name">Nombre</label>
              <input id="register-name" type="text" placeholder="Ana"
                class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="register-lastname">Apellido</label>
              <input id="register-lastname" type="text" placeholder="Torres"
                class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="register-email">Correo</label>
            <input id="register-email" type="email" placeholder="usuario@taskflow.com"
              class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="register-password">Contraseñaa</label>
              <input id="register-password" type="password" placeholder="Crea una contraseña"
                class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="register-role">Rol</label>
              <select id="register-role"
                class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                <option>USER</option>
                <option>ADMIN</option>
              </select>
            </div>
          </div>

          ${buttonLink("/login", "Crear cuenta")}
        </form>
      </div>
    </section>
  </main>
  `;
}


export function setupRegisterForm() {
  const form = document.querySelector("form");
  const registerButton = form.querySelector("a[href='/src/views/login.html']");
  const registerForm = document.getElementById('register-form')
  
  
  if (!registerForm || !registerButton) {
    return;
  }

  registerButton.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const nombre = document.getElementById("register-name")?.value ?? "";
    const apellido = document.getElementById("register-lastname")?.value ?? "";
    const email = document.getElementById("register-email")?.value ?? "";
    const password = document.getElementById("register-password")?.value ?? "";
    const role = document.getElementById("register-role")?.value ?? "USER";

    try {
      await createUser({ nombre, apellido, email, password, role})
      showSuccessToast("Usuario registrado correctamente.")
      window.history.pushState({}, "", "/login")
      window.diaspatchEvent(new PopStateEvent("popstate"))
    } catch (error) {
      showErrorToast(error.message)
    }
  
  });
}

export function setupRegister() {
  const form = document.getElementById("register-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("register-name")?.value ?? "";
    const apellido = document.getElementById("register-lastname")?.value ?? "";
    const email = document.getElementById("register-email")?.value ?? "";
    const password = document.getElementById("register-password")?.value ?? "";
    const role = document.getElementById("register-role")?.value ?? "";

    try {
      await crearUsuario({ nombre, apellido, email, password, role });
      alert("Usuario creado exitosamente");
      window.location.href = "/src/views/login.html";
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Hubo un error al crear el usuario.");
    }
  });
}