var current_image_index = 0;
var image_paths = [
    "images/hledame_nazor_converted.jpg",
    "images/mrtvy_pat_converted.jpg",
    "images/nekdo_chcipne_converted.jpg",
    "images/google_converted.jpg",
    "images/drz_picu_converted.jpg",
    "images/boha_converted.jpg",
    "images/pat_no_converted.jpg",
    "images/spam_converted.jpg",
    "images/mama_converted.jpg",
    "images/chces_pesti_converted.jpg",
    "images/5g_converted.jpg",
    "images/openmatter_converted.jpg",
    "images/spim_converted.jpg",
    "images/to_nevychazi_converted.jpg",
    "images/vysmech_converted.jpg",
    "images/loss_converted.jpg",
    "images/koukni_kreten_converted.jpg",
    "images/nezajem_converted.jpg",
    "images/nesmej_se_converted.jpg",
    "images/fakt_nevim_converted.jpg",
    "images/to_je_debil_converted.jpg",
    "images/vietnam_converted.jpg",
    "images/gabcik_converted.jpg",
    "images/matlin_converted.jpg",
    "images/kvalitni_picovina_converted.jpg",
    "images/kokotismus_converted.jpg",
    "images/dobra_praca_converted.jpg",
    "images/jebnu_converted.jpg",
    "images/je_kokot_converted.jpg",
    "images/cos_rekl_converted.jpg",
    "images/salam_converted.jpg",
    "images/zapoj_mozek_converted.jpg",
    "images/operace_converted.jpg",
    "images/kyblik_converted.jpg",
    "images/naposled_converted.jpg",
    "images/mam_se_posrat_converted.jpg",
    "images/chlapci_converted.jpg",
    "images/mountfield_converted.jpg",
    "images/smaz_to_converted.jpg",
    "images/ne_converted.jpg",
    "images/marny_hoch_converted.jpg",
    "images/foceni_converted.jpg",
    "images/vecerka_converted.jpg",
    "images/je_to_zle_converted.jpg",
    "images/netflix_converted.jpg",
    "images/posral_converted.jpg",
    "images/propaganda_converted.jpg",
    "images/trasa_converted.jpg",
    "images/bazin_converted.jpg",
    "images/motor_converted.jpg",
    "images/kokes_converted.jpg",
    "images/psycho_pat_converted.jpg",
    "images/porno_converted.jpg",
    "images/neodvolam_converted.jpg",
    "images/dpydit_converted.jpg",
    "images/papepat_converted.jpg",
    "images/cikani_converted.jpg",
    "images/auto_converted.jpg",
    "images/jitrnice_converted.jpg",
    "images/obraz_nejde_converted.jpg",
    "images/pomoc_converted.jpg",
    "images/co_cumis_converted.jpg",
    "images/nebli_converted.jpg",
    "images/zkurvil_dojebal_converted.jpg",
    "images/drz_hubu_converted.jpg",
    "images/babiccin_recept_converted.jpg",
    "images/telo_converted.jpg",
    "images/flakanec_converted.jpg",
    "images/step_mat_converted.jpg",
    "images/nebud_kokot_converted.jpg"
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