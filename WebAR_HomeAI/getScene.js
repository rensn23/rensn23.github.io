import * as SCENE from './js/JS_Classes.js';

import { ConvexGeometry } from 'https://unpkg.com/three@0.126.0/examples/jsm/geometries/ConvexGeometry.js';
import { Line2 } from 'https://unpkg.com/three@0.126.1/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'https://unpkg.com/three@0.126.1/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'https://unpkg.com/three@0.126.1/examples/jsm/lines/LineMaterial.js';

const BORDER_WIDTH = 0.002; //Border Line-thickness

const PLOT_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x7edb3b, opacity: 0.8, transparent: true });
const OUTER_WALL_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x242424, opacity: 0.95, transparent: true });
const INNER_WALL_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x484848, opacity: 0.95, transparent: true });
const FLOOR_MATERIAL = new THREE.MeshLambertMaterial({ color: 0xc79044, opacity: 0.95, transparent: true });
const ROOF_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x121212, opacity: 0.95, transparent: true });
const BORDER_MATERIAL = new LineMaterial({ color: 0xffffff, linewidth: BORDER_WIDTH });   //0xdb4e3b
const ROOM_OBJECT_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x2fd7ed, opacity: 0.8, transparent: true });
const WINDOW_MATERIAL = new THREE.MeshLambertMaterial({ color: 0xdbdbdb, opacity: 0.8, transparent: true });
const DOOR_MATERIAL = new THREE.MeshLambertMaterial({ color: 0xcc5531, opacity: 0.8, transparent: true });

//Converts Point Class to Vector3 Class
function pointsToVector3s(points) {
    var vertices = [];
    
    points.forEach(point => {
        var vertex = new THREE.Vector3(point.x / 50, point.y / 50, -point.z / 50);   // look at that a fine scale of 50
        vertices.push(vertex);
    });
    return vertices;
}


//Converts Point Class to a list of coordinates
function pointsToPositions(points) {
    var positions = [];
    points.forEach(point => {
        positions.push(point.x / 50, point.y / 50, -point.z / 50);   // 50 is the scale
    });
    //Close the border
    // scaling is now 50
    positions.push(points[0].x / 50, points[0].y / 50, -points[0].z / 50)
    return positions;
}

export const scene = new THREE.Scene();

//Draws the plot + children
export function drawPlot(plot) {
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
function drawHouse(house) {
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
function drawRoom(room) {
    if (room === null || room === undefined) return;

    room.liBorders.forEach(border => {
        drawBorder(border);
    });
}

//Draws a Room Object
function drawRoomObject(roomObject) {
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
function drawWall(wall) {
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
function drawFloor(floor) {
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
function drawRoof(roof) {
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
function drawBorder(border) {
    if (border === null || border === undefined) return;

    var borderGeometry = new LineGeometry();
    borderGeometry.setPositions(pointsToPositions(border.liPoints));
    var borderLine = new Line2(borderGeometry, BORDER_MATERIAL);

    scene.add(borderLine);
}