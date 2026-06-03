import { notFoundView, routers } from "./routes";

export function renderRouter() {
    const app = document.getElementById("app");
    const currentPath = window.location.pathname;
    const router = routers[currentPath] ?? { render: notFoundView };

    app.innerHTML = router.render();

    if (router.setup) {
        router.setup();
    }
}

export function initRouter() {
    document.addEventListener("click", (event) => {
        const link = event.target.closest("a");

        if (!link) return;

        const href = link.getAttribute("href");

        if (!href || !href.startsWith("/")) return;

        event.preventDefault();
        window.history.pushState({}, "", href);
        renderRouter();
    });

    window.addEventListener("popstate", renderRouter);
    renderRouter();
}