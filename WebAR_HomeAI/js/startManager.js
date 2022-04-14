import { RoomType } from "./Parameter_Classes.js"
import { fetchNewRoom } from "./roomsManager.js"

export function startFromScratch() {
    fetchNewRoom(RoomType.EmptyRoom);
    //addNewRoomRelationship();
}

export const HouseTemplates = {
    SmallHouse: 0,
    Apartment: 1
}

export function startFromTemplate(template) {
    switch (template) {
        case HouseTemplates.SmallHouse:
            console.log("Small House");
            break;
        case HouseTemplates.Apartment:
            console.log("Apartment");
            break;
        default:
            console.log("Invalid Template. Chose Option \"Start from Scratch\"");
            fetchNewRoom(RoomType.EmptyRoom);
            break;
    }
}

export function viewHouseWithCode(code) {
    
}

//startFromScratch();