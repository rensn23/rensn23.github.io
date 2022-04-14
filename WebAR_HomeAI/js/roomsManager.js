import * as PARAMETER from "./Parameter_Classes.js"
import { updateRoomRelationships } from "./roomRelationshipManager.js"
import { checkFloatParameter, checkIntParameter, checkWeightParameter } from "./parameterManager.js"

//Global ID
var room_id = 0;

//Rooms Front End
const div_rooms_container = document.getElementById("div_rooms_container");

//Buttons
const btn_add_room = document.getElementById("btn_add_room");
const btn_remove_room = document.getElementById("btn_remove_room");

//OnClick Events
btn_add_room.onclick = function () {
    modal_add_room.style.display = "none";
    fetchNewRoom(parseInt(dropdown_room_type_to_add.value));
}

btn_remove_room.onclick = function () {
    removeRoom();
}

function toggleExpand(e) {
    if (e.target.classList.contains("div-img-room-expand-icon")) return;

    let target = e.target.parentNode.parentNode.parentNode;

    if (target.classList.contains("div-room-expanded")) {
        target.classList.remove("div-room-expanded");
        target.querySelector(".div-room-parameter-grid").style.display = "none";
        target.querySelector(".img-room-expand-icon").src = "./src/images/plus_icon.png";
    }
    else {
        target.classList.add("div-room-expanded");
        target.querySelector(".div-room-parameter-grid").style.display = "grid";
        target.querySelector(".img-room-expand-icon").src = "./src/images/minus_icon.png";
    }
}

function updateRooms() {
    let allRooms = document.getElementsByClassName("div-room");

    for (let room of allRooms) {
        room.onclick = function (e) {
            markRoomAsSelected(e);
        }

        room.querySelector(".div-img-room-expand-icon").onclick = function (e) {
            toggleExpand(e);
        }
    }
}

function markRoomAsSelected(e) {
    if (e.target.classList.contains("div-room-selected")) {
        e.target.classList.remove("div-room-selected");
    }
    else if (e.target.classList.contains("div-room")) {
        let allRooms = document.getElementsByClassName("div-room");

        for (let room of allRooms) {
            room.classList.remove("div-room-selected");
        }

        e.target.classList.add("div-room-selected")
    }
}

//Fetch Template from HTML-File
export function fetchNewRoom(room) {

    let path = "";

    switch (room) {
        case PARAMETER.RoomType.EmptyRoom:
            path = "./src/templates/template_empty_room.html"
            break;
        case PARAMETER.RoomType.Bedroom:
            path = "./src/templates/template_bedroom.html"
            break;
        case PARAMETER.RoomType.Bathroom:
            path = "./src/templates/template_bathroom.html"
            break;
        case PARAMETER.RoomType.ClosetRoom:
            path = "./src/templates/template_closet_room.html"
            break;
        case PARAMETER.RoomType.Pantry:
            path = "./src/templates/template_pantry.html"
            break;
        case PARAMETER.RoomType.StorageRoom:
            path = "./src/templates/template_storage_room.html"
            break;
        case PARAMETER.RoomType.Kitchen:
            path = "./src/templates/template_kitchen.html"
            break;
        case PARAMETER.RoomType.OfficeRoom:
            path = "./src/templates/template_office_room.html"
            break;
        case PARAMETER.RoomType.WorkRoom:
            path = "./src/templates/template_work_room.html"
            break;
        case PARAMETER.RoomType.Balcony:
            path = "./src/templates/template_balcony.html"
            break;
        case PARAMETER.RoomType.LivingRoom:
            path = "./src/templates/template_living_room.html"
            break;
        case PARAMETER.RoomType.DiningRoom:
            path = "./src/templates/template_dining_room.html"
            break;
        case PARAMETER.RoomType.Hallway:
            path = "./src/templates/template_hallway.html"
            break;
        case PARAMETER.RoomType.Staircase:
            path = "./src/templates/template_staircase.html"
            break;
        case PARAMETER.RoomType.ToiletRoom:
            path = "./src/templates/template_toilet_room.html"
            break;
        case PARAMETER.RoomType.GuestRoom:
            path = "./src/templates/template_guest_room.html"
            break;
        case PARAMETER.RoomType.WashingRoom:
            path = "./src/templates/template_washing_room.html"
            break;
        case PARAMETER.RoomType.Garage:
            path = "./src/templates/template_garage.html"
            break;
        default:
            path = "./src/templates/template_empty_room.html"
            break;
    }

    fetch(path)
        .then(r => r.text())
        .then(data => addNewRoom(data));
}

function addNewRoom(data) {
    let newElement = document.createElement('div');
    newElement.id = `div_room_${room_id}`;
    newElement.classList = ["div-room"]
    newElement.innerHTML = data;

    //Come up with a good way to name the rooms in the front end
    newElement.querySelector(".div-room-name").innerHTML = `${dropdown_room_type_to_add.options[dropdown_room_type_to_add.selectedIndex].innerHTML}`
    newElement.querySelector(".room-id").innerHTML = room_id;

    div_rooms_container.appendChild(newElement);
    updateRooms();
    updateRoomRelationships(room_id);

    room_id++;
}

function removeRoom() {
    let rooms = document.getElementsByClassName("div-room-selected");
    while (rooms.length > 0) {
        let temp = parseInt(rooms[0].querySelector(".room-id").innerHTML);
        rooms[0].parentNode.removeChild(rooms[0]);
        updateRoomRelationships(undefined, temp);
    }
}

function getRoomParameters(FERoom) { //ToDo: Add more error-proofs for wrong Inputs
    let roomParameters = [];

    //0 = Room Size
    roomParameters[0] = checkFloatParameter(FERoom.querySelector(".inp-parameter-value-room-size").value);
    //1 = Room Size Weight
    roomParameters[1] = checkWeightParameter(FERoom.querySelector(".slider-parameter-weight-room-size").value);
    //2 = Floor Level
    roomParameters[2] = checkIntParameter(FERoom.querySelector(".dropdown-parameter-value-floor-level").value);
    //3 = Room Temperature
    roomParameters[3] = checkFloatParameter(FERoom.querySelector(".inp-parameter-value-room-temperature").value);
    //4 = Room Temperature Weight
    roomParameters[4] = checkWeightParameter(FERoom.querySelector(".slider-parameter-weight-room-temperature").value);
    //5 = Room Illumination Weight
    roomParameters[5] = checkWeightParameter(FERoom.querySelector(".slider-parameter-weight-illumination").value);
    //6 = Roof Type
    roomParameters[6] = checkIntParameter(FERoom.querySelector(".dropdown-parameter-value-roof-type").value);
    //7 = Roof Type Weight
    roomParameters[7] = checkWeightParameter(FERoom.querySelector(".slider-parameter-weight-roof-type").value);
    //8 = Floor Material
    roomParameters[8] = checkIntParameter(FERoom.querySelector(".dropdown-parameter-value-floor-material").value);
    //9 = Floor Material Weight
    roomParameters[9] = checkWeightParameter(FERoom.querySelector(".slider-parameter-weight-floor-material").value);
    //10 = Number of Windows
    roomParameters[10] = checkWeightParameter(FERoom.querySelector(".slider-parameter-weight-window-amount").value);
    //11 = Is Heated
    roomParameters[11] = FERoom.querySelector(".checkbox-parameter-value-is-heated").checked;

    return roomParameters;
}

export function createRoomArray() {
    //Insert all rooms into this array once created
    let arrRooms = [];

    //Loop through all the front end rooms
    let arrAllFERooms = document.getElementsByClassName("div-room");

    for (let FERoom of arrAllFERooms) {
        //Get all parameters
        let roomParameters = getRoomParameters(FERoom);
        let roomType = parseInt(FERoom.querySelector(".room-type").innerHTML)

        //Create a class with all the values from the front end
        let room;
        switch (roomType) {
            case PARAMETER.RoomType.EmptyRoom:
                room = new PARAMETER.EmptyRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.Bedroom:
                room = new PARAMETER.Bedroom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.Bathroom:
                //ToDo: Create Checkbox + CSS
                let parameterHasToilet = FERoom.querySelector(".checkbox-parameter-value-has-toilet").checked;
                room = new PARAMETER.Bathroom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11], parameterHasToilet);
                break;
            case PARAMETER.RoomType.ClosetRoom:
                room = new PARAMETER.ClosetRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.Pantry:
                room = new PARAMETER.Pantry(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.StorageRoom:
                room = new PARAMETER.StorageRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.Kitchen:
                room = new PARAMETER.Kitchen(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.OfficeRoom:
                room = new PARAMETER.OfficeRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.WorkRoom:
                room = new PARAMETER.WorkRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.Balcony:
                room = new PARAMETER.Balcony(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.LivingRoom:
                room = new PARAMETER.LivingRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.DiningRoom:
                room = new PARAMETER.DiningRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.Hallway:
                room = new PARAMETER.Hallway(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.Staircase:
                room = new PARAMETER.Staircase(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11], undefined, undefined);
                break;
            case PARAMETER.RoomType.ToiletRoom:
                room = new PARAMETER.ToiletRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.GuestRoom:
                room = new PARAMETER.GuestRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.WashingRoom:
                room = new PARAMETER.WashingRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            case PARAMETER.RoomType.Garage:
                room = new PARAMETER.Garage(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
            default:
                room = new PARAMETER.EmptyRoom(roomParameters[0], roomParameters[1], roomParameters[2], roomParameters[3], roomParameters[4], roomParameters[5], roomParameters[6], roomParameters[7], roomParameters[8], roomParameters[9], roomParameters[10], undefined, undefined, undefined, undefined, undefined, roomParameters[11]);
                break;
        }

        //Push that class in the "arrRoom" array
        arrRooms.push(room);
    }

    return arrRooms;
}

updateRooms();