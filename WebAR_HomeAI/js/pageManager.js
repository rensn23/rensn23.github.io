import * as START from "./startManager.js";

//Pages
const page_welcome = document.getElementById("page_welcome");
const page_about = document.getElementById("page_about");
const page_parameters = document.getElementById("page_parameters");
export const page_result = document.getElementById("page_result");
export const page_result_collection = document.getElementById("page_result_collection");
const page_contact = document.getElementById("page_contact");
const page_privacy_policy = document.getElementById("page_privacy_policy");
var current_active_page = page_welcome;

//Navigation-Buttons
const div_learn_more = document.getElementById("div_learn_more");
const btn_start_from_scratch = document.getElementById("btn_start_from_scratch");
const btn_template_house = document.getElementById("btn_template_house");
const btn_template_apartment = document.getElementById("btn_template_apartment");

div_learn_more.onclick = function() {
    switchToPage(page_about);
}
btn_start_from_scratch.onclick = function() {
    switchToPage(page_parameters);
    START.startFromScratch();
}
btn_template_house.onclick = function() {
    switchToPage(page_parameters);
    modal_choose_template.style.display = "none";
    START.startFromTemplate(START.HouseTemplates.SmallHouse)
    //Add template rooms for the small house
}
btn_template_apartment.onclick = function() {
    switchToPage(page_parameters);
    modal_choose_template.style.display = "none";
    START.startFromTemplate(START.HouseTemplates.Apartment)
    //Add template rooms for the apartment
}

//Footer-Links
const footer_buttons_welcome = document.getElementsByClassName("footer-btn-home");
const footer_buttons_about = document.getElementsByClassName("footer-btn-about-us");
const footer_buttons_parameters = document.getElementsByClassName("footer-btn-generate-house");
const footer_buttons_contact = document.getElementsByClassName("footer-btn-our-socials");
const footer_buttons_privacy_policy = document.getElementsByClassName("footer-btn-privacy-policy");
const footer_buttons_disclaimers = document.getElementsByClassName("footer-btn-disclaimers");

for (let element of footer_buttons_welcome) {
    element.onclick = function() {
        switchToPage(page_welcome);
    }
}
for (let element of footer_buttons_about) {
    element.onclick = function() {
        switchToPage(page_about);
    }
}
for (let element of footer_buttons_parameters) {
    element.onclick = function() {
        switchToPage(page_parameters);
    }
}
for (let element of footer_buttons_contact) {
    element.onclick = function() {
        switchToPage(page_contact);
    }
}
for (let element of footer_buttons_privacy_policy) {
    element.onclick = function() {
        switchToPage(page_privacy_policy);
    }
}
for (let element of footer_buttons_disclaimers) {
    element.onclick = function() {
        switchToPage(page_privacy_policy);
        //Scroll to start of disclaimers
    }
}

//Header-Links
const header_buttons_welcome = document.getElementsByClassName("div-header-title-text");
const header_buttons_about = document.getElementsByClassName("div-header-page-about-link");
const header_buttons_contact = document.getElementsByClassName("div-header-page-contact-us-link");
const header_buttons_privacy_policy = document.getElementsByClassName("div-header-page-privacy-policy-link");
const header_buttons_disclaimers = document.getElementsByClassName("div-header-page-disclaimers-link");

for (let element of header_buttons_welcome) {
    element.onclick = function() {
        switchToPage(page_welcome);
    }
}
for (let element of header_buttons_about) {
    element.onclick = function() {
        switchToPage(page_about);
    }
}
for (let element of header_buttons_contact) {
    element.onclick = function() {
        switchToPage(page_contact);
    }
}
for (let element of header_buttons_privacy_policy) {
    element.onclick = function() {
        switchToPage(page_privacy_policy);
    }
}
for (let element of header_buttons_disclaimers) {
    element.onclick = function() {
        switchToPage(page_privacy_policy);
        //Scroll to start of disclaimers
    }
}

function init() {
    switchToPage(page_parameters);
}

export function switchToPage(nextPage) {
    current_active_page.style.display = "none";
    current_active_page = nextPage;
    current_active_page.style.display = "block";
    current_active_page.scrollTop = 0;
}

init();