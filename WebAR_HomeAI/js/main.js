//Imports
import { plot3 } from './demoHouse03.js';
import * as SCENE from "./JS_Classes.js";

import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';
import { ConvexGeometry } from 'https://unpkg.com/three@0.126.0/examples/jsm/geometries/ConvexGeometry.js';
import { Line2 } from 'https://unpkg.com/three@0.126.1/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'https://unpkg.com/three@0.126.1/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'https://unpkg.com/three@0.126.1/examples/jsm/lines/LineMaterial.js';

//Constants
const BORDER_WIDTH = 0.002; //Border Line-thickness

const PLOT_MATERIAL = new THREE.MeshLambertMaterial( { color: 0x7edb3b, opacity: 0.8 , transparent: true } );
const OUTER_WALL_MATERIAL = new THREE.MeshLambertMaterial( { color: 0x242424, opacity: 0.95 , transparent: true } );
const INNER_WALL_MATERIAL = new THREE.MeshLambertMaterial( { color: 0x484848, opacity: 0.95 , transparent: true } );
const FLOOR_MATERIAL = new THREE.MeshLambertMaterial( { color: 0xc79044, opacity: 0.95 , transparent: true } );
const ROOF_MATERIAL = new THREE.MeshLambertMaterial( { color: 0x121212, opacity: 0.95 , transparent: true } );
const BORDER_MATERIAL = new LineMaterial( { color: 0xffffff, linewidth: BORDER_WIDTH } );   //0xdb4e3b
const ROOM_OBJECT_MATERIAL = new THREE.MeshLambertMaterial( { color: 0x2fd7ed, opacity: 0.8 , transparent: true } );
const WINDOW_MATERIAL = new THREE.MeshLambertMaterial( { color: 0xdbdbdb, opacity: 0.8 , transparent: true } );
const DOOR_MATERIAL = new THREE.MeshLambertMaterial( { color: 0xcc5531, opacity: 0.8 , transparent: true } );


//Scene
const scene = new THREE.Scene();

//Camera
//const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000);
camera.position.z = 5;

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#e5e5e5");
renderer.setSize( window.innerWidth, window.innerHeight );

//Add renderer to a HTML-Elememt 
document.querySelector('.body-wrapper').append( renderer.domElement );

//Navigation Controls
const controls = new OrbitControls(camera, renderer.domElement);

//Update Renderer size when window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth , window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

//XYZ Axes
var axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

//Adds a white directional light to the scene
function addLight(...pos) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);
}

//Add Light sources
// addLight(20, 10, 10);
// addLight(-2, -2, 2);
// addLight(10, 8, 5);

var ambientLight = new THREE.AmbientLight( 0xBBBBBB );
scene.add(ambientLight);

//Converts Point Class to Vector3 Class
function pointsToVector3s(points) {
    var vertices = [];
    points.forEach(point => {
        var vertex = new THREE.Vector3(point.x, point.y, point.z);
        vertices.push(vertex);
    });
    return vertices;
}

//Converts Point Class to a list of coordinates
function pointsToPositions(points) {
    var positions = [];
    points.forEach(point => {
        positions.push(point.x, point.y, point.z);
    });
    //Close the border
    positions.push(points[0].x, points[0].y, points[0].z)
    return positions;
}

//Draws the plot + children
function drawPlot(plot)
{
    if (plot === null || plot === undefined) return;
    console.log(plot);

    if (plot.plotSize instanceof SCENE.RectanglePlotSize) {
        var plotGeometry = new THREE.BoxGeometry(plot.plotSize.length, 0.2, plot.plotSize.width);
        var plotMesh = new THREE.Mesh(plotGeometry, PLOT_MATERIAL);
        plotMesh.position.set(plot.plotSize.length / 2, -0.1, plot.plotSize.width / 2);
        scene.add(plotMesh);
    }
    else if (plot.plotSize instanceof SCENE.SquarePlotSize) {
        var plotGeometry = new THREE.BoxGeometry(plot.plotSize.sideLength, 0.2, plot.plotSize.sideLength);
        var plotMesh = new THREE.Mesh(plotGeometry, PLOT_MATERIAL);
        plotMesh.position.set(plot.plotSize.sideLength / 2, -0.1, plot.plotSize.sideLength / 2);
        scene.add(plotMesh);
    }
    else if (plot.plotSize instanceof SCENE.PlotSize) {
        //Do something
        console.log("Plots with \"PlotSize\" cannot be drawn yet");
    }
    else {
        //plotSize is of a wrong type
        console.log("plotSize has to be of the types \"RectanglePlotSize\",\"SquarePlotSize\" or \"PlotSize\"");
    }

    plot.liHouses.forEach(house => {
        drawHouse(house);
    });

}

//Draws the house + children
function drawHouse(house)
{
    if (house === null || house === undefined) return;

    house.liWalls.forEach(outerWall => {
        drawWall(outerWall);
    });

    house.liRooms.forEach(room => {
        drawRoom(room);
    });

    house.liRoofs.forEach(roof => {
        drawRoof(roof);
    });

    house.liFloors.forEach(floor => {
        drawFloor(floor);
    });

    house.liRoomObjs.forEach(roomObject => {
        drawRoomObject(roomObject);
    });
}

//Draws Room + children
function drawRoom(room)
{
    if (room === null || room === undefined) return;

    room.liBorders.forEach(border => {
        drawBorder(border);
    });
}

//Draws a Room Object
function drawRoomObject(roomObject)
{
    if (roomObject === null || roomObject === undefined) return;

    if (roomObject instanceof SCENE.RoomExit && !(roomObject instanceof SCENE.Door)) return; 

    if (roomObject instanceof SCENE.RoomObject) {
        var roomObjectGeometry = new ConvexGeometry(pointsToVector3s(roomObject.liPoints));
    } else {
        console.log(`ERROR, the object with the id "${roomObject.id}" is not a Room-Object!`);
        return;
    }

    if (roomObject instanceof SCENE.Door) {
        var roomObjectMesh = new THREE.Mesh(roomObjectGeometry, DOOR_MATERIAL);
    } else if (roomObject instanceof Window) {
        var roomObjectMesh = new THREE.Mesh(roomObjectGeometry, WINDOW_MATERIAL);
    } else {
        var roomObjectMesh = new THREE.Mesh(roomObjectGeometry, ROOM_OBJECT_MATERIAL);
    }

    scene.add(roomObjectMesh);
}

//Draws any wall
function drawWall(wall)
{
    if (wall === null || wall === undefined) return;

    if (wall instanceof SCENE.Floor || wall instanceof SCENE.PolyFloor) {
        drawFloor(wall);
        return;
    }

    if (wall instanceof SCENE.PolyWall) {
        var wallGeometry = new ConvexGeometry(pointsToVector3s(wall.liPoints));
    }
    else {
        console.log("ERROR, this type of Wall cannot be drawn yet!");
        return;
    }

    //Check if wall is an InnerWall
    if (wall instanceof SCENE.PolyInnerWall || wall instanceof SCENE.InnerWall) {
        var wallMesh = new THREE.Mesh(wallGeometry, INNER_WALL_MATERIAL);
    }
    else {
        var wallMesh = new THREE.Mesh(wallGeometry, OUTER_WALL_MATERIAL);
    }
    
    scene.add(wallMesh);
}

//Draws a floor
function drawFloor(floor)
{
    if (floor === null || floor === undefined) return;

    if (floor instanceof SCENE.Floor) {
        console.log("ERROR, this type of Floor cannot be drawn yet!")
        return;
    }

    var floorGeometry = new ConvexGeometry(pointsToVector3s(floor.liPoints));
    var floorMesh = new THREE.Mesh(floorGeometry, FLOOR_MATERIAL);
    scene.add(floorMesh);
}

//Draws a roof
function drawRoof(roof)
{
    if (roof === null || roof === undefined) return;

    if (roof instanceof SCENE.Roof) {
        console.log("ERROR, this type of Roof cannot be drawn yet!")
        return;
    }

    var roofGeometry = new ConvexGeometry(pointsToVector3s(roof.liPoints));
    var roofMesh = new THREE.Mesh(roofGeometry, ROOF_MATERIAL);
    scene.add(roofMesh);
}

//Draw a border
function drawBorder(border)
{
    if (border === null || border === undefined) return;

    var borderGeometry = new LineGeometry();
    borderGeometry.setPositions(pointsToPositions(border.liPoints));
    var borderLine = new Line2(borderGeometry, BORDER_MATERIAL);

    scene.add(borderLine);
}

//Input Field
var jsonStringInput = document.getElementById("jsonStringInput");

//Generate with Json Button
var buttonGenerateJson = document.getElementById("button_generate_json");
buttonGenerateJson.onclick = function() {
    //Get Json string
    let jsonString = jsonStringInput.value;
    //Use API to convert JSON to Object(s)
    let jsonPlot = JSON_CONVERTER.JsonToObject(jsonString);
    //Draw Object(s)
    drawPlot(jsonPlot);
}

//Generate Demo House Button
var buttonGenerateDemohouse = document.getElementById("button_generate_demohouse");
buttonGenerateDemohouse.onclick = function() {
    drawPlot(plot3);
}

//Runs 60x per second
const animate = function() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
};

animate();

export { drawPlot, drawHouse, drawRoom, drawRoomObject, drawWall, drawFloor, drawRoof, drawBorder }