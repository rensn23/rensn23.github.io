import { SceneHandler } from "./Scene_Classes.js";
import * as RESULT from './Result_Classes.js';
import * as SCENE from './JS_Classes.js';
import { SolutionGenerator } from "./Algorithm/solutionGenerator.js";

//Navigation Arrows
const img_result_navigation_arrow_left = document.getElementById("img_result_navigation_arrow_left");
const img_result_navigation_arrow_right = document.getElementById("img_result_navigation_arrow_right");

img_result_navigation_arrow_left.onclick = function() {
    sceneHandler.previousPlot();
    //spidernetManager.setSpidernet(plotID)
}
img_result_navigation_arrow_right.onclick = function() {
    sceneHandler.nextPlot();
    //spidernetManager.setSpidernet(plotID)
}

//Divs for Three.js scenes
const div_3d_scene = document.getElementById("div_3d_scene");
const div_2d_scene = document.getElementById("div_2d_scene");

//Sections
const div_result_section_rank = document.getElementById("div_result_section_rank");
const div_result_section_radar_chart = document.getElementById("div_result_section_radar_chart");
const div_result_section_3d_viewer = document.getElementById("div_result_section_3d_viewer");
const div_result_section_2d_viewer = document.getElementById("div_result_section_2d_viewer");

//Expand Icons
const div_img_expand_section_radar_chart = document.getElementById("div_img_expand_section_radar_chart");
const div_img_expand_section_3d_viewer = document.getElementById("div_img_expand_section_3d_viewer");
const div_img_expand_section_2d_viewer = document.getElementById("div_img_expand_section_2d_viewer");

div_img_expand_section_radar_chart.onclick = function() {
    setViewToActive(div_result_section_radar_chart);
}
div_img_expand_section_3d_viewer.onclick = function() {
    setViewToActive(div_result_section_3d_viewer);
}
div_img_expand_section_2d_viewer.onclick = function() {
    setViewToActive(div_result_section_2d_viewer);
}

//Shrink Icons
const allShrinkIcons = document.getElementsByClassName("div-img-shrink-icon");

for (let shrinkIcon of allShrinkIcons) {
    shrinkIcon.onclick = closeAllViews;
}

//Scene Handler
const sceneHandler = new SceneHandler();
const resultHandler = new RESULT.ResultHandler();
const solutionGenerator = new SolutionGenerator((string) => {console.log(string)})

let testList = []

resultHandler.addResult(RESULT.demoResult3);
resultHandler.addResult(RESULT.demoResult2);

sceneHandler.create3DScene(div_3d_scene);
sceneHandler.create2DScene(div_2d_scene);

//Add Plot to the scene
addResultToScene(resultHandler.getNextResult());
addResultToScene(resultHandler.getNextResult());

//Updates the renderer of each view
export function updateRenderers() {
    sceneHandler.updateRendererSizes();
}

//Takes the plot from a result and add it to the scene
export function addResultToScene(result) {
    sceneHandler.addPlot(result.plot, result.id);
}

export function getSolutionAndAddToScene(userPlot) {
    //Generate
    solutionGenerator.startGeneration(userPlot, testList);

    setTimeout(()=>{
        solutionGenerator.stopGeneration();

        //Add to sceneHandler
        testList.forEach(plot => {
            let newResult = new RESULT.Result(plot);
            addResultToScene(newResult);
        });
    }, 10000);
}

function setViewToActive(divView) {
    //Disable all other active views, if there are any
    let allViews = document.getElementsByClassName("div-result-section");
    for (let view of allViews) {
        view.classList.remove("state-result-view-active");
        view.classList.add("state-result-view-not-active");
    }

    if (divView != undefined) {
        //Enable view
        divView.classList.remove("state-result-view-not-active");
        divView.classList.add("state-result-view-active");
    }

    sceneHandler.updateRendererSizes();
}

function closeAllViews() {
    //I have absolutely no idea why i need to call this function with undefined, but it works... so /shrug
    setViewToActive(undefined);

    let allViews = document.getElementsByClassName("div-result-section");
    for (let view of allViews) {
        view.classList.remove("state-result-view-active");
        view.classList.remove("state-result-view-not-active");
    }

    sceneHandler.updateRendererSizes();
}