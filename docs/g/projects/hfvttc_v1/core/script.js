var current_image_index = 0;
var image_paths = [
    "images/output_2.png",
    "images/tube_1.jpg",
    "images/supply_1.jpg",
    "images/supply_3.jpg",
    "images/feedback_2.jpg",
    "images/output_4.jpg",
    "images/resonator_2.jpg",
    "images/supply_2.jpg",
    "images/general_4.jpg",
    "images/resonator_3.jpg",
    "images/output_1.png",
    "images/general_8.jpg",
    "images/supply_4.jpg",
    "images/general_9.jpg",
    "images/general_6.jpg",
    "images/general_2.jpg",
    "images/general_1.jpg",
    "images/general_3.jpg",
    "images/feedback_1.jpg",
    "images/resonator_1.jpg",
    "images/general_5.jpg",
    "images/supply_5.jpg",
    "images/general_10.jpg",
    "images/general_7.jpg",
    "images/output_3.jpg",
    "images/embed_image.jpg",
    "images/tube_2.jpg",
    "images/schematic/uzzors2k_hfvttc.png"
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

function instant_scaledown(element) {
    var original_transition  = element.style.transition;
    element.style.transition = "transform 0s";
    element.style.transform  = "scale(1)";
    setTimeout(()=>{
        element.style.transition = original_transition;
    },0);
}

function close_image_viewer() {
    var img = document.getElementById("viewer-image");
    instant_scaledown(img);

    document.querySelector(".image-viewer").style.display = "none";
    document.body.style.overflow = "auto";

    document.removeEventListener("keydown", handle_keypress);
}

function navigate_image(event,direction) {
    var img = document.getElementById("viewer-image");

    instant_scaledown(img);

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

var last_zoom_x = 0;
var last_zoom_y = 0;

function zoom_image(event,instant) {
    var img = document.getElementById("viewer-image");
    var bounding_rect = img.getBoundingClientRect();

    var x = (event.clientX - bounding_rect.left) / bounding_rect.width;
    var y = (event.clientY - bounding_rect.top)  / bounding_rect.height;

    if (img.style.transform === "scale(2)") {
        x = last_zoom_x;
        y = last_zoom_y;
        img.style.transformOrigin = `${x*100}% ${y*100}%`;
        img.style.transform = "scale(1)";
    } else {
        img.style.transformOrigin = `${x*100}% ${y*100}%`;
        img.style.transform = "scale(2)";
        last_zoom_x = x;
        last_zoom_y = y;
    }

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