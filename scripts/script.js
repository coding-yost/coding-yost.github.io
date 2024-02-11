import { create_window, create_file, create_home_window, quick_replace, populate_files } from "./window_script.js";

const windows = document.getElementById("windows");
var files_container = document.getElementById("files-container")
const cube_container = document.getElementById("cube-container");
const side = document.getElementById("side1");
const json_file = "JSON/menu.json";
let current_file;

const default_side_display = 
(
    `
        <h1>Codi Yost</h1>
        <ul>
            <li>Software Engineer</li>
            <li>Web Developer</li>
            <li>CSUN Graduate 2024</li>
            <li>Musician</li>
        </ul>
        <i class="fa-solid fa-up-right-from-square" id="expand"></i>
    `
)

const home_logo = (
    `<div class="logo-container" id="home-logo">
        <i class="logo fa-solid fa-house"></i>
        <p class="logo-title">Home</p>
    </div>`
);

async function handle_create_home(json_file) {
    fetch(json_file)
        .then((result) => {
            if (!result.ok) {
                throw new Error
                    (`HTTP error! Status: ${result.status}`);
            }
            return result.json();
        })
        .then((data) => {
            files_container = document.getElementById("files-container")
            files_container.innerHTML = populate_files(data)
            update_containers(data);
            side.innerHTML = default_side_display;
        })
}

const create_home_logo = (json_file) => {
    
    files_container.insertAdjacentHTML("beforeend", home_logo)
    const home_button = document.getElementById("home-logo");
    home_button.addEventListener("click", () => {
        handle_create_home(json_file);
    });
}
const update_containers = (data) => {
    const work_menu = data[0];
    const education_menu = data[1];
    const charity_menu = data[2];
    const other_menu = data[3];

    let work_logo = document.getElementById(`${quick_replace(work_menu.item)}`)
    let education_logo = document.getElementById(`${quick_replace(education_menu.item)}`)
    let charity_logo = document.getElementById(`${quick_replace(charity_menu.item)}`)
    let other_logo = document.getElementById(`${quick_replace(other_menu.item)}`)
    
    work_logo.addEventListener("click", () => {
        windows.innerHTML = create_window(work_menu.item, work_menu.options);
        create_home_logo(json_file);
        current_file = work_menu;
    })
    education_logo.addEventListener("click", () => {
        windows.innerHTML = create_window(education_menu.item, education_menu.options);
        create_home_logo(json_file);
        current_file = education_menu;
    })
    charity_logo.addEventListener("click", () => {
        windows.innerHTML = create_window(charity_menu.item, charity_menu.options);
        create_home_logo(json_file);
        current_file = charity_menu;
    })
    other_logo.addEventListener("click", () => {
        windows.innerHTML = create_window(other_menu.item, other_menu.options);
        create_home_logo(json_file);
        current_file = other_menu;
    })
}

const get_menu_item = (current_file, search) => { // gets the menu item to be fed into make_slide
    return current_file.options.find((element) => element.item == search);
}

const get_notes = (note_array) => {
    var notes = ``
    note_array.forEach(element => {
        notes = notes + `<li>${element}</li>`;     
    });
    return notes;
}

const quick_replace_reverse = (string) => {
    return string.replace(/-/g, " ")
}

const make_side = (item) => {
    return (
        `
            <h2>${item.item}</h2>
            <h3>${item.position}</h3>
            <p>${item.year}</p>
            <div id="notes">
                <ul>
                    ${get_notes(item.notes)}
                </ul>
            </div>
            <div>
                
                <i class="fa-solid fa-up-right-from-square" id="expand"></i>
            <div>
        `
    )
}

windows.addEventListener("click", (e) => {
    if(e.target.classList.contains('logo') || e.target.classList.contains('logo-title')){
        if (side.innerHTML == "") {
            side.innerHTML = default_side_display;
        }
        if(e.target.parentNode.id != 'home-logo'){
            side.innerHTML = make_side(
                get_menu_item(current_file, 
                    quick_replace_reverse(e.target.parentNode.id)
                )
            )
        } else {
            side.innerHTML = default_side_display;
        }
    }
});

handle_create_home(json_file);