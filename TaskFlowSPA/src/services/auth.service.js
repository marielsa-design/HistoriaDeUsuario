import brcypt from "bcryptjs"
import { findUserByEmail } from "./users.service"


const SESSION_STORAGE_KEY = "taskflowspa.session"

export function saveSession(user) {
    const sessionUser = {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        roles: user.roles ?? [],        
    }

    localStorage.getItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser))
}

export function getSession() {
    const rawSession = localStorage.getItem(SESSION_STORAGE_KEY)

    if (!rawSession) {
        return null
    }

    try {
        return JSON.parse(rawSession)
    } catch {
        return null
    }
}

export function clearSesion() {
    localStorage.removeItem(SESSION_STORAGE_KEY)
}

export async function loginUser({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase()
    const trimmedPassword = password.trim()

    if (!normalizedEmail || !trimmedPassword) {
        throw new Error("Debes ingresar correo y contraseña.")
    }
    
    const user = await findUserByEmail(normalizedEmail)

    if (!user) {
        throw new Error("No existe un usuario con ese correo.")
    }

    const isPasswordValid = await brcypt.compare(trimmedPassword, user.password)

    if (!isPasswordValid) {
        throw new Error("La contraseña es incorrecta.")
    }

    return user
}