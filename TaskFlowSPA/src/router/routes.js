import { renderRegister, setupRegisterForm } from "../views/auth/register";
import { renderHome } from "../views/home";
import { renderLogin, setupLogin } from "../views/auth/login";
import { renderDashboard, setupDashboard } from "../views/app/dashboard";
import { renderAdmin, setupAdmin } from "../views/admin/admin";
import { renderNotFound } from "../views/auth/notFound";
import { renderTasks, setupTasksView } from "../views/tasks/task";
import { renderTaskForm, setupTasksFormView } from "../views/tasks/taskForm";

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
    },
    "/tasks": {
        render: renderTasks,
        setup: setupTasksView,
        isAuthorized: true,
    },
    "/task/new": {
        render: renderTaskForm,
        setup: setupTasksFormView,
        isAuthorized: true,
    },
    "/task/edit": {
        render: renderTaskForm,
        setup: setupTasksFormView,
        isAuthorized: true,
    },
    "/admin": {
        render: renderAdmin,
        setup: setupAdmin,
        isAuthorized: true,
        redirectIfNotAuthorized: true
    }
}

export const notFoundView = renderNotFound;