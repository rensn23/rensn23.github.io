import * as PARAMETER from "./Parameter_Classes.js"
import { checkFloatParameter, checkIntParameter, checkWeightParameter } from "./parameterManager.js"

//Rooms Front End
const div_room_relationships_container = document.getElementById("div_room_relationships_container");

//Buttons
const btn_add_room_relationship = document.getElementById("btn_add_room_relationship");
const btn_remove_room_relationship = document.getElementById("btn_remove_room_relationship");

//OnClick Events
btn_add_room_relationship.onclick = function () {
    addNewRoomRelationship();
}

btn_remove_room_relationship.onclick = function () {
    removeRoomRelationship();
}


//Get data from Room Relationship Template
var template_data_room_relationship;
fetch("./src/templates/template_room_relationship.html")
.then(r => r.text())
.then(data => template_data_room_relationship = data);

function createNewOptionElement(roomID) {
    let newOptionElement = document.createElement('option');
    newOptionElement.classList = [`option-room-${roomID}`];
    newOptionElement.value = roomID;
    newOptionElement.innerHTML = document.getElementById(`div_room_${roomID}`).querySelector(".div-room-name").innerHTML;

    return newOptionElement;
}

export function updateRoomRelationships(addedRoomID = undefined, deletedRoomID = undefined) {
    let allRoomRelationships = document.getElementsByClassName("div-room-relationship");

    //Add onclick event listeners so you can select them
    for (let roomRel of allRoomRelationships) {
        roomRel.onclick = function (e) {
            markRoomRelationshipAsSelected(e);
        }
    }

    //Update Dropdown Values
    let allRoomDropdowns = document.getElementsByClassName("dropdown-room-relationship-value-room");

    for (let roomDropdown of allRoomDropdowns) {
        //If a room was added, append a option element
        if (addedRoomID != undefined) {        
            roomDropdown.appendChild(createNewOptionElement(addedRoomID));
        }
        //If a room was deleted, find the corresponding option elements and remove them
        if (deletedRoomID != undefined) {
            let optionElementsToRemove = document.getElementsByClassName(`option-room-${deletedRoomID}`);
            while (optionElementsToRemove.length > 0) {
                optionElementsToRemove[0].parentNode.removeChild(optionElementsToRemove[0]);
            }
        }
    }
}

function markRoomRelationshipAsSelected(e) {
    if (e.target.classList.contains("div-room-relationship-selected")) {
        e.target.classList.remove("div-room-relationship-selected");
    }
    else if (e.target.classList.contains("div-room-relationship")) {
        let allRoomRelationships = document.getElementsByClassName("div-room-relationship");

        for (let roomRel of allRoomRelationships) {
            roomRel.classList.remove("div-room-relationship-selected");
        }

        e.target.classList.add("div-room-relationship-selected")
    }
}

function addNewRoomRelationship() {
    let newElement = document.createElement('div');
    newElement.classList = ["div-room-relationship"]

    newElement.innerHTML = template_data_room_relationship;

    //Add all the option elements
    let allRooms = document.getElementsByClassName("div-room");
    for (let room of allRooms) {
        newElement.querySelector(".dropdown-room-relationship-value-room1").appendChild(createNewOptionElement(parseInt(room.querySelector(".room-id").innerHTML)));
        newElement.querySelector(".dropdown-room-relationship-value-room2").appendChild(createNewOptionElement(parseInt(room.querySelector(".room-id").innerHTML)));
    }
        
    div_room_relationships_container.appendChild(newElement);
    updateRoomRelationships();
}

function removeRoomRelationship() {
    let roomRelationships = document.getElementsByClassName("div-room-relationship-selected");
    while (roomRelationships.length > 0) {
        roomRelationships[0].parentNode.removeChild(roomRelationships[0]);
    }
}

function getRoomRelationshipParameters(FERoomRelationship) {
    let roomRelParameters = [];

    //0 = RoomID1
    roomRelParameters[0] = checkIntParameter(FERoomRelationship.querySelector(".dropdown-room-relationship-value-room1").value);
    //1 = RoomID2
    roomRelParameters[1] = checkIntParameter(FERoomRelationship.querySelector(".dropdown-room-relationship-value-room2").value);
    //2 = Room Relationship Type
    roomRelParameters[2] = checkIntParameter(FERoomRelationship.querySelector(".dropdown-room-relationship-value-type").value);
    //3 = Relationship Weight
    roomRelParameters[3] = checkWeightParameter(FERoomRelationship.querySelector(".slider-room-relationship-weight").value);

    return roomRelParameters;
}

export function createRoomRelationshipArray() {
    //Insert all rooms into this array once created
    let arrRoomRelationships = [];

    //Loop through all the front end relationships
    let arrAllFERoomRels = document.getElementsByClassName("div-room-relationship");

    for (let FERoomRelationship of arrAllFERoomRels) {
        //Get all parameters
        let roomRelParameters = getRoomRelationshipParameters(FERoomRelationship);

        let roomRelationship = new PARAMETER.RoomRelationship(roomRelParameters[0], roomRelParameters[1], roomRelParameters[2], roomRelParameters[3]);
        arrRoomRelationships.push(roomRelationship);
    }

    return arrRoomRelationships;
}




updateRoomRelationships();