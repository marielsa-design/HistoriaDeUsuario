import { renderRegister, setupRegisterForm } from "../views/auth/register";
import { renderHome } from "../views/home";
import { renderLogin, setupLogin } from "../views/auth/login";
import { renderDashboard, setupDashboard } from "../views/app/dashboard";
import { renderAdmin, setupAdmin } from "../views/admin/admin";
import { renderNotFound } from "../views/auth/notFound";
import { renderTasks } from "../views/tasks/task";
import { renderTaskForm } from "../views/tasks/taskForm";

export const routers = {
    "/": { 
        render: renderHome,
        isAuthorized: false
    },
    "/login": {
        render: renderLogin,
        setup: setupLogin,
        isAuthorized: false,
        redirectIfAuthorized: true
    },
    "/register": {
        render: renderRegister,
        setup: setupRegisterForm,
        isAuthorized: false,
        redirectIfAuthorized: true
    },
    "/dashboard": {
        render: renderDashboard,
        setup: setupDashboard,
        isAuthorized: true,
        redirectIfNotAuthorized: true
    },
    "/tasks": {
        render: renderTasks,
        isAuthorized: true,
        redirectIfNotAuthorized: true
    },
    "/task-form": {
        render: renderTaskForm,
        isAuthorized: true,
        redirectIfNotAuthorized: true
    },
    "/admin": {
        render: renderAdmin,
        setup: setupAdmin,
        isAuthorized: true,
        redirectIfNotAuthorized: true
    }
}

export const notFoundView = renderNotFound;