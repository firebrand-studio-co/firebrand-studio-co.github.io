function includeHTML() {
    document.querySelectorAll("[data-include]").forEach(async (el) => {
        const file = el.getAttribute("data-include");
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            el.innerHTML = await response.text();
        } catch (error) {
            console.error("Error loading component:", error);
        }
    });
}

// Load components after DOM is ready
document.addEventListener("DOMContentLoaded", includeHTML);
