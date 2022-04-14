const ParameterPageScrollState = {
    Plot: 0,
    Budget: 1,
    House: 2,
    HeatingAndEnergy: 3,
    Design: 4,
    Rooms: 5,
    RoomRelationships: 6,
}

var currentScrollState = ParameterPageScrollState.Plot;

//Navbar
const navbar = document.getElementById("navbar");

//Navbar Buttons
const navbarButtons = document.getElementsByClassName("navbar-button");
const btn_category_plot = document.getElementById("btn_category_plot");
const btn_category_budget = document.getElementById("btn_category_budget");
const btn_category_house = document.getElementById("btn_category_house");
const btn_category_heating_and_energy = document.getElementById("btn_category_heating_and_energy");
const btn_category_design = document.getElementById("btn_category_design");
const btn_category_rooms = document.getElementById("btn_category_rooms");
const btn_category_room_relationships = document.getElementById("btn_category_room_relationships");

//Elements to scroll to
const category_section_parameters = document.getElementById("category_section_parameters");
const category_section_rooms = document.getElementById("category_section_rooms");
const category_section_room_relationships = document.getElementById("category_section_room_relationships");

const category_plot = document.getElementById("category_plot");
const category_budget = document.getElementById("category_budget");
const category_house = document.getElementById("category_house");
const category_heating_and_energy = document.getElementById("category_heating_and_energy");
const category_design = document.getElementById("category_design");

btn_category_plot.onclick = function () {
    let offsetTop = category_plot.offsetTop - 100;
    scrollTo(offsetTop);
}

btn_category_budget.onclick = function () {
    let offsetTop = category_budget.offsetTop - 100;
    scrollTo(offsetTop);
}

btn_category_house.onclick = function () {
    let offsetTop = category_house.offsetTop - 100;
    scrollTo(offsetTop);
}

btn_category_heating_and_energy.onclick = function () {
    let offsetTop = category_heating_and_energy.offsetTop - 100;
    scrollTo(offsetTop);
}

btn_category_design.onclick = function () {
    let offsetTop = category_design.offsetTop - 100;
    scrollTo(offsetTop);
}

btn_category_rooms.onclick = function () {
    let offsetTop = category_section_rooms.offsetTop - 100;
    scrollTo(offsetTop);
}

btn_category_room_relationships.onclick = function () {
    let offsetTop = category_section_room_relationships.offsetTop - 100;
    scrollTo(offsetTop);
}

//Parameter Body (Scrollable Element)
const page_parameters_body = document.getElementById("page_parameters_body");

page_parameters_body.onscroll = function () {
    let currentScrollPos = page_parameters_body.scrollTop;

    if (currentScrollPos < category_plot.offsetTop - 50) {
        checkNavbarState(ParameterPageScrollState.Plot);
    } else if (currentScrollPos < category_budget.offsetTop - 50) {
        checkNavbarState(ParameterPageScrollState.Budget);
    } else if (currentScrollPos < category_house.offsetTop - 50) {
        checkNavbarState(ParameterPageScrollState.House);
    } else if (currentScrollPos < category_heating_and_energy.offsetTop - 50) {
        checkNavbarState(ParameterPageScrollState.HeatingAndEnergy);
    } else if (currentScrollPos < category_design.offsetTop - 50) {
        checkNavbarState(ParameterPageScrollState.Design);
    } else if (currentScrollPos < category_section_rooms.offsetTop - 50) {
        checkNavbarState(ParameterPageScrollState.Rooms);
    } else if (currentScrollPos < category_section_room_relationships.offsetTop - 50) {
        checkNavbarState(ParameterPageScrollState.RoomRelationships);
    } 
}

function checkNavbarState(stateToCheck) {
    if (currentScrollState != stateToCheck) {
        currentScrollState = stateToCheck;
        //Set Navbar Button active
        updateNavbarState(stateToCheck);
    }
}

function scrollTo(pos) {
    page_parameters_body.scrollTop = pos;
}

function updateNavbarState(nextScrollState) {
    //Remove class from all buttons
    for (let navbarButton of navbarButtons) {
        navbarButton.classList.remove("navbar-button-active");
    }

    //Set button active
    switch (nextScrollState) {
        case ParameterPageScrollState.Plot:
            btn_category_plot.classList.add("navbar-button-active");
            break;
        case ParameterPageScrollState.Budget:
            btn_category_budget.classList.add("navbar-button-active");
            break;
        case ParameterPageScrollState.House:
            btn_category_house.classList.add("navbar-button-active");
            break;
        case ParameterPageScrollState.HeatingAndEnergy:
            btn_category_heating_and_energy.classList.add("navbar-button-active");
            break;
        case ParameterPageScrollState.Design:
            btn_category_design.classList.add("navbar-button-active");
            break;
        case ParameterPageScrollState.Rooms:
            btn_category_rooms.classList.add("navbar-button-active");
            break;
        case ParameterPageScrollState.RoomRelationships:
            btn_category_room_relationships.classList.add("navbar-button-active");
            break;
        default:
            break;
    }
}

