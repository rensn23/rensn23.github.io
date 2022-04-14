import { createPlotClass, createHouseClass } from "./parameterManager.js";
import { createRoomArray } from "./roomsManager.js";
import { createRoomRelationshipArray } from "./roomRelationshipManager.js";
import { page_result, switchToPage } from "./pageManager.js";
import { getSolutionAndAddToScene, updateRenderers } from "./sceneHandler.js";
import { Algorithm } from "./Algorithm/algorithm.js";

//Button
const btn_generate_house = document.getElementById("btn_generate_house");

btn_generate_house.onclick = function() {
    generateClasses();
    switchToPage(page_result);
    updateRenderers();
}

export function generateClasses() {
    //Create Plot
    let userPlot = createPlotClass();

    //Add House
    userPlot.addHouse(createHouseClass());

    //Add Rooms
    userPlot.liHouses[0].liRooms = createRoomArray();

    //Add Room Relationships
    userPlot.liHouses[0].liRoomRelationships = createRoomRelationshipArray();

    console.log(userPlot);

    //getSolutionAndAddToScene(userPlot);
    getSolutionAndAddToScene(Algorithm.getSample());

    //return userPlot;
}