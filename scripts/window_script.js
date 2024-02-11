const quick_replace = (string) => {
    return string.replace(/ /g, "-")
}

const create_window = (title, options) => {
    const window = 
    `
    <div class="window-container">
        <div class="sys-bar">
            <div class="close-box"></div>
            <div class="title-bar">
                <div class="lines"><hr></div>
                <p class="title">${title}</p>
                <div class="lines"><hr></div>
            </div>
            <div class="shrink-box">
                <div class="inner-shrink"></div>
            </div>
            <div class="minimize-box">
                <div class="inner-mini"></div>
            </div>
        </div>
        <div class="option-bar"></div>
        <div class="file-box">
            <div class="files-container" id="files-container">
                ${populate_files(options)}
                <div class="logo-container" id="home-logo">
                    <i class="logo fa-solid fa-house"></i>
                    <p class="logo-title">Home</p>
                </div>
            </div>
        </div>
    </div>
    `
    return window;    
}

const create_home_window = (menu) => {
    return `
    <div class="window-container">
        <div class="sys-bar">
            <div class="close-box"></div>
            <div class="title-bar">
                <div class="lines"><hr></div>
                <p class="title">Codi_Yost-Resume</p>
                <div class="lines"><hr></div>
            </div>
            <div class="shrink-box">
                <div class="inner-shrink"></div>
            </div>
            <div class="minimize-box">
                <div class="inner-mini"></div>
            </div>
        </div>
        <div class="option-bar"></div>
        <div class="file-box">
            <div class="files-container">
                ${populate_files(menu)}
            </div>
        </div>
    </div>
    `
}
    
const create_file = (title, file_type) => { 
    if(file_type == "folder"){
        const logo_container = `<div class="logo-container folder-logo" id="${quick_replace(title)}">
            <i class="logo default-logo fa-regular fa-folder"></i>
            <i class="logo hover-logo fa-solid fa-folder"></i>
            <i class="logo click-logo fa-regular fa-folder-open"></i>
            <p class="logo-title">${title}</p>
        </div>`
        return logo_container;
    }
    if(file_type == "text"){
        const logo_container = `<div class="logo-container" id="${quick_replace(title)}">
            <i class="logo default-logo fa-regular fa-file-lines"></i>
            <i class="logo hover-logo fa-solid fa-file-lines"></i>
            <p class="logo-title">${title}</p>
        </div>`
        return logo_container;
    }
    if(file_type == "link"){
        const logo_container = `<div class="logo-container" id="${quick_replace(title)}">
            <i class="logo default-logo fa-regular fa-paper-plane"></i>
            <i class="logo hover-logo fa-solid fa-paper-plane"></i>
            <p class="logo-title">${title}</p>
        </div>`
        return logo_container;
    }
return "";
}

const populate_files = (files) => {
    let menu_items = [];
    files.forEach(element => {
        menu_items.push(create_file(element.item, element.type));
    });
    return menu_items.join('');
} 
export { create_window, create_file, create_home_window, quick_replace, populate_files };