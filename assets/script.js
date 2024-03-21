var current_image_index = 0;
var image_paths = [
    {{image_paths}}
];

function normalize_path(file_path) {
    const parts = file_path.split('/');
    const normalized_parts = [];

    for (const part of parts) {
        if (part === '..') {
            normalized_parts.pop();
        } else if (part !== '.') {
            normalized_parts.push(part);
        }
    }

    const normalized_path = normalized_parts.join('/');

    if (file_path.startsWith('/')) {
        return '/' + normalized_path;
    } else {
        return normalized_path;
    }
}

function open_image_viewer(image_path, prevent_navigation) {
    current_image_index = image_paths.indexOf(normalize_path(image_path));
    update_image_viewer();
    document.querySelector(".image-viewer").style.display = "flex";
    document.body.style.overflow = "hidden";

    if (prevent_navigation) {
        document.querySelector(".nav-arrows").style.display = "none";
    } else {
        document.querySelector(".nav-arrows").style.display = "flex";
    }

    document.addEventListener("keydown", handle_keypress);
}

function close_image_viewer() {
    var img = document.getElementById("viewer-image");
    img.style.transform = "scale(1)";
    document.querySelector(".image-viewer").style.display = "none";
    document.body.style.overflow = "auto";

    document.removeEventListener("keydown", handle_keypress);
}

function navigate_image(event, direction) {
    var img = document.getElementById("viewer-image");
    img.style.transform = "scale(1)";
    event.stopPropagation();
    current_image_index += direction;
    if (current_image_index < 0) {
        current_image_index = image_paths.length - 1;
    } else if (current_image_index >= image_paths.length) {
        current_image_index = 0;
    }
    update_image_viewer();
}

function update_image_viewer() {
    document.getElementById("viewer-image").src = image_paths[current_image_index];
}

function toggle_dark_mode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}

function zoom_image(event) {
    var img = document.getElementById("viewer-image");
    var bounding_rect = img.getBoundingClientRect();

    var x = (event.clientX - bounding_rect.left) / bounding_rect.width;
    var y = (event.clientY - bounding_rect.top) / bounding_rect.height;

    img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    img.style.transform = img.style.transform === "scale(2)" ? "scale(1)" : "scale(2)";

    event.stopPropagation();
}

function handle_keypress(event) {
    if (document.querySelector(".image-viewer").style.display === "flex") {
        switch(event.key) {
            case "ArrowLeft":
                navigate_image(event, -1);
                break;
            case "ArrowRight":
                navigate_image(event, 1);
                break;
            case "Escape":
                close_image_viewer();
                break;
        }
    }
}