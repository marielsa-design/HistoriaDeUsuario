export async function crearUsuario(usuario) {
    const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error("Error al crear el usuario");
    }
    return await response.json();
}

async function obtenerUsuarios() {
    const response = await fetch("http://localhost:8080/api/users");
    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }
    return await response.json();

    async function obtenerUsuarioPorEmail(email) {
        const response = await fetch(`http://localhost:8080/api/users?email=${email}`);
        if (!response.ok) {
            throw new Error("Error al obtener el usuario por email");
        }
        return await response.json();
    }
}