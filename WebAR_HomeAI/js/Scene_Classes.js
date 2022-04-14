import * as SCENE from "./JS_Classes.js";
import * as RESULT from "./Result_Classes.js";

import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';
import { ConvexGeometry } from 'https://unpkg.com/three@0.126.0/examples/jsm/geometries/ConvexGeometry.js';
import { Line2 } from 'https://unpkg.com/three@0.126.1/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'https://unpkg.com/three@0.126.1/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'https://unpkg.com/three@0.126.1/examples/jsm/lines/LineMaterial.js';

export class SceneHandler {

    constructor() {
        this.uuidGenerator = new SCENE.UUIDGenerator();

        //Stores all added plots with their respective Result-ID
        this.liLoadedPlots = [];

        this.currentPlotIndex = undefined;
    }

    create3DScene(docElement) {
        this.scene3D = new Scene3D(docElement);
        this.scene3D.init();
    }

    create2DScene(docElement) {
        this.scene2D = new Scene2D(docElement);
        this.scene2D.init();
    }

    updateRendererSizes() {
        this.scene2D.updateRendererSize();
        this.scene3D.updateRendererSize();
    }

    addPlot(plot, resultID) {
        if (plot == null) {
            console.log("The Plot/Result you tried to add was null! Maybe the queue from the ResultHandler is empty?")
            return;
        }
        else { 
            if (this.currentPlotIndex == undefined) this.currentPlotIndex = 0;
            
            this.liLoadedPlots.push([plot, resultID]);
            this.scene2D.addPlot(plot, resultID);
            this.scene3D.addPlot(plot, resultID);
        }
    }

    //Returns the Group-Object of the currently viewed Plot
    getCurrentPlot(id) {
        return this.scene3D.getCurrentPlot(id);
    }

    nextPlot() {
        //Get ID of the next Result
        let nextIndex = (this.currentPlotIndex + 1) % this.liLoadedPlots.length;
        let nextPlotAndID = this.liLoadedPlots[nextIndex];
        this.switchToPlot(nextPlotAndID);

        this.currentPlotIndex = nextIndex;
    }

    previousPlot() {
        //Get ID of the next Result
        let nextIndex = (this.currentPlotIndex - 1 + this.liLoadedPlots.length) % this.liLoadedPlots.length;
        let nextPlotAndID = this.liLoadedPlots[nextIndex];
        this.switchToPlot(nextPlotAndID);

        this.currentPlotIndex = nextIndex;
    }

    //Switches to the given Plot
    switchToPlot(plotAndID) {
        this.scene2D.switchToPlot(plotAndID);
        this.scene3D.switchToPlot(plotAndID);
    }
}

export class Scene2D {
    constructor(div_scene) {
        this.div_scene = div_scene;

        this.dicGroups = {};
        this.currentPlotID = null;
        this.plotAmountInScene = 0;
        this.groupNamePrefix = "Group_";

        this.dicViewerSettings = {};
    }

    init() {
        //Constants
        this.BORDER_WIDTH = 0.002; //Border Line-thickness

        this.PLOT_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x7edb3b, opacity: 0.8, transparent: true });
        this.OUTER_WALL_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x242424, opacity: 0.95, transparent: true });
        this.INNER_WALL_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x484848, opacity: 0.95, transparent: true });
        this.FLOOR_MATERIAL = new THREE.MeshLambertMaterial({ color: 0xc79044, opacity: 0.95, transparent: true });
        this.ROOF_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x121212, opacity: 0.95, transparent: true });
        this.BORDER_MATERIAL = new LineMaterial({ color: 0xffffff, linewidth: this.BORDER_WIDTH });   //0xdb4e3b
        this.ROOM_OBJECT_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x2fd7ed, opacity: 0.8, transparent: true });
        this.WINDOW_MATERIAL = new THREE.MeshLambertMaterial({ color: 0xdbdbdb, opacity: 0.8, transparent: true });
        this.DOOR_MATERIAL = new THREE.MeshLambertMaterial({ color: 0xcc5531, opacity: 0.8, transparent: true });

        //Get height and width of the html container
        this.div_scene_width = this.div_scene.offsetWidth;
        this.div_scene_height = this.div_scene.offsetHeight;

        //Create a new Three.js Scene
        this.scene = new THREE.Scene();
        //Orthographic Camera is used for the 2D Scene
        this.camera = new THREE.OrthographicCamera(this.div_scene_width / -2, this.div_scene_width / 2, this.div_scene_height / 2, this.div_scene_height / -2, -1000, 1000);
        //Need this to be able to rotate?
        this.camera.position.z = 1;


        //Create Renderer and set the size based on the html container
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.div_scene_width, this.div_scene_height);
        this.renderer.setClearColor("#1d8018");
        this.div_scene.appendChild(this.renderer.domElement);

        //Navigation Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.controls.minPolarAngle = 0;
		this.controls.maxPolarAngle = 0;

        //Change these values, depending on the usual houze sizes
        this.controls.maxZoom = 100;
        this.controls.minZoom = 5;

        this.controls.update()

        //XYZ Axes
        this.axesHelper = new THREE.AxesHelper(10);
        this.scene.add(this.axesHelper);

        //Lights    
        this.ambientLight = new THREE.AmbientLight( 0xBBBBBB );
        this.scene.add(this.ambientLight);

        window.addEventListener('resize', () => {
            this.updateRendererSize();
        })

        this.animate();
    }

    updateRendererSize() {
        this.div_scene_width = this.div_scene.offsetWidth;
        this.div_scene_height = this.div_scene.offsetHeight;

        this.renderer.setSize(this.div_scene_width, this.div_scene_height);
        this.camera.aspect = this.div_scene_width / this.div_scene_height;

        this.camera.left = this.div_scene_width / -2;
        this.camera.right = this.div_scene_width / 2;
        this.camera.top = this.div_scene_height / 2;
        this.camera.bottom = this.div_scene_height / -2;

        this.camera.updateProjectionMatrix();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    //Returns the correctly formatted String for finding a Group in the scene
    getGroupNameString(id) {
        return `${this.groupNamePrefix}${id}`;
    }

    addPlot(plot, plotID) {
        this.dicGroups[plotID] = new THREE.Group();
        this.dicGroups[plotID].name = this.getGroupNameString(plotID);

        this.drawPlot(plot, plotID);

        //If there already is a plot, make the newly added plot invisible
        if (this.plotAmountInScene != 0) {
            this.dicGroups[plotID].visible = false;
        }
        else {
            this.currentPlotID = plotID;
        }

        this.scene.add(this.dicGroups[plotID]);

        // if (plotID == 1) {
        //     setTimeout(() => {
        //         this.switchToPlot(1);
        //     }, 5000);

        //     setTimeout(() => {
        //         this.switchToPlot(0);
        //     }, 10000);

        //     setTimeout(() => {
        //         this.switchToPlot(1);
        //     }, 15000);
        // }

        this.plotAmountInScene++;
    }

    saveCurrentViewerSettings() {
        if (this.currentPlotID in this.dicViewerSettings) 
            this.dicViewerSettings[this.currentPlotID].setSettings(this.camera.position.clone(), undefined, undefined, undefined);
        else
            this.dicViewerSettings[this.currentPlotID] = new ViewerSettings2D(this.camera.position.clone(), undefined, undefined, undefined);
    }

    loadViewerSettings(plotID) {
        if (plotID in this.dicViewerSettings == false) {
            console.log("Couldn't load viewer settings. Plot wasn't found.");
            return;
        }

        //console.log(this.dicViewerSettings);
        let viewerSettings = this.dicViewerSettings[plotID];
        
        let pos = viewerSettings.cameraPosition;
        this.camera.position.set(pos.x, pos.y, pos.z);
    }

    //Returns the Group-Object of the currently viewed Plot
    getCurrentPlot() {
        if (this.currentPlotID == null) {
            console.log("There is currently no Plot in the scene")
            return;
        }

        if (this.currentPlotID in this.dicGroups == false) {
            console.log("Couldn't get current plot.")
            return;
        }

        return this.dicGroups[this.currentPlotID];
    }

    //Switches to the given Plot
    switchToPlot(plotAndID) {
        let id = plotAndID[1];
        if (id in this.dicGroups == false) {
            this.addPlot(plotAndID[0]);
            return;
        }

        this.saveCurrentViewerSettings();
    
        //Switch to Plot
        this.dicGroups[this.currentPlotID].visible = false;
        this.dicGroups[id].visible = true;
        this.currentPlotID = id;

        this.loadViewerSettings(this.currentPlotID);
    }

    //Converts Point Class to Vector3 Class
    pointsToVector3s(points) {
        let vertices = [];
        points.forEach(point => {
            let vertex = new THREE.Vector3(point.x, point.y, point.z);
            vertices.push(vertex);
        });
        return vertices;
    }

    //Converts Point Class to a list of coordinates
    pointsToPositions(points) {
        let positions = [];
        points.forEach(point => {
            positions.push(point.x, point.y, point.z);
        });
        //Close the border
        positions.push(points[0].x, points[0].y, points[0].z)
        return positions;
    }

    //Draws the plot + children
    drawPlot(plot, plotID)
    {
        if (plot === null || plot === undefined) return;
        //console.log(plot);

        if (plot.plotSize instanceof SCENE.RectanglePlotSize) {
            let plotGeometry = new THREE.BoxGeometry(plot.plotSize.length, 0.2, plot.plotSize.width);
            let plotMesh = new THREE.Mesh(plotGeometry, this.PLOT_MATERIAL);
            plotMesh.position.set(plot.plotSize.length / 2, -0.1, plot.plotSize.width / 2);
            this.dicGroups[plotID].add(plotMesh);
        }
        else if (plot.plotSize instanceof SCENE.SquarePlotSize) {
            let plotGeometry = new THREE.BoxGeometry(plot.plotSize.sidesLength, 0.2, plot.plotSize.sidesLength);
            let plotMesh = new THREE.Mesh(plotGeometry, this.PLOT_MATERIAL);
            plotMesh.position.set(plot.plotSize.sidesLength / 2, -0.1, plot.plotSize.sidesLength / 2);
            this.dicGroups[plotID].add(plotMesh);
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
            this.drawHouse(house, plotID);
        });

    }

    //Draws the house + children
    drawHouse(house, plotID)
    {
        if (house === null || house === undefined) return;

        house.liWalls.forEach(outerWall => {
            this.drawWall(outerWall, plotID);
        });

        house.liRooms.forEach(room => {
            this.drawRoom(room, plotID);
        });

        house.liRoofs.forEach(roof => {
            this.drawRoof(roof, plotID);
        });

        house.liFloors.forEach(floor => {
            this.drawFloor(floor, plotID);
        });

        house.liRoomObjs.forEach(roomObject => {
            this.drawRoomObject(roomObject, plotID);
        });
    }

    //Draws Room + children
    drawRoom(room, plotID)
    {
        if (room === null || room === undefined) return;

        room.liBorders.forEach(border => {
            this.drawBorder(border, plotID);
        });
    }

    //Draws a Room Object
    drawRoomObject(roomObject, plotID)
    {
        if (roomObject === null || roomObject === undefined) return;

        if (roomObject instanceof SCENE.RoomExit && !(roomObject instanceof SCENE.Door)) return; 

        if (roomObject instanceof SCENE.RoomObject) {
            var roomObjectGeometry = new ConvexGeometry(this.pointsToVector3s(roomObject.liPoints));
        } else {
            console.log(`ERROR, the object with the id "${roomObject.id}" is not a Room-Object!`);
            return;
        }

        if (roomObject instanceof SCENE.Door) {
            var roomObjectMesh = new THREE.Mesh(roomObjectGeometry, this.DOOR_MATERIAL);
        } else if (roomObject instanceof Window) {
            var roomObjectMesh = new THREE.Mesh(roomObjectGeometry, this.WINDOW_MATERIAL);
        } else {
            var roomObjectMesh = new THREE.Mesh(roomObjectGeometry, this.ROOM_OBJECT_MATERIAL);
        }

        this.dicGroups[plotID].add(roomObjectMesh);
    }

    //Draws any wall
    drawWall(wall, plotID)
    {
        if (wall === null || wall === undefined) return;

        if (wall instanceof SCENE.Floor || wall instanceof SCENE.PolyFloor) {
            drawFloor(wall, plotID);
            return;
        }

        if (wall instanceof SCENE.PolyWall) {
            var wallGeometry = new ConvexGeometry(this.pointsToVector3s(wall.liPoints));
        }
        else {
            console.log("ERROR, this type of Wall cannot be drawn yet!");
            return;
        }

        //Check if wall is an InnerWall
        if (wall instanceof SCENE.PolyInnerWall || wall instanceof SCENE.InnerWall) {
            var wallMesh = new THREE.Mesh(wallGeometry, this.INNER_WALL_MATERIAL);
        }
        else {
            var wallMesh = new THREE.Mesh(wallGeometry, this.OUTER_WALL_MATERIAL);
        }

        this.dicGroups[plotID].add(wallMesh);
    }

    //Draws a floor
    drawFloor(floor, plotID)
    {
        if (floor === null || floor === undefined) return;

        if (floor instanceof SCENE.Floor) {
            console.log("ERROR, this type of Floor cannot be drawn yet!")
            return;
        }

        var floorGeometry = new ConvexGeometry(this.pointsToVector3s(floor.liPoints));
        var floorMesh = new THREE.Mesh(floorGeometry, this.FLOOR_MATERIAL);
        this.dicGroups[plotID].add(floorMesh);
    }

    //Draws a roof
    drawRoof(roof, plotID)
    {
        if (roof === null || roof === undefined) return;

        if (roof instanceof SCENE.Roof) {
            console.log("ERROR, this type of Roof cannot be drawn yet!")
            return;
        }

        var roofGeometry = new ConvexGeometry(this.pointsToVector3s(roof.liPoints));
        var roofMesh = new THREE.Mesh(roofGeometry, this.ROOF_MATERIAL);
        this.dicGroups[plotID].add(roofMesh);
    }

    //Draw a border
    drawBorder(border, plotID)
    {
        if (border === null || border === undefined) return;

        var borderGeometry = new LineGeometry();
        borderGeometry.setPositions(this.pointsToPositions(border.liPoints));
        var borderLine = new Line2(borderGeometry, this.BORDER_MATERIAL);

        this.dicGroups[plotID].add(borderLine);
    }
}

export class Scene3D {
    constructor(div_scene) {
        this.div_scene = div_scene;

        this.dicGroups = {};
        this.currentPlotID = null;
        this.plotAmountInScene = 0;
        this.groupNamePrefix = "Group_";

        this.dicViewerSettings = {};
    }

    init() {
        //Constants
        this.BORDER_WIDTH = 0.002; //Border Line-thickness

        this.PLOT_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x7edb3b, opacity: 0.8, transparent: true });
        this.OUTER_WALL_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x242424, opacity: 0.95, transparent: true });
        this.INNER_WALL_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x484848, opacity: 0.95, transparent: true });
        this.FLOOR_MATERIAL = new THREE.MeshLambertMaterial({ color: 0xc79044, opacity: 0.95, transparent: true });
        this.ROOF_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x121212, opacity: 0.95, transparent: true });
        this.BORDER_MATERIAL = new LineMaterial({ color: 0xffffff, linewidth: this.BORDER_WIDTH });   //0xdb4e3b
        this.ROOM_OBJECT_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x2fd7ed, opacity: 0.8, transparent: true });
        this.WINDOW_MATERIAL = new THREE.MeshLambertMaterial({ color: 0xdbdbdb, opacity: 0.8, transparent: true });
        this.DOOR_MATERIAL = new THREE.MeshLambertMaterial({ color: 0xcc5531, opacity: 0.8, transparent: true });

        //Get height and width of the html container
        this.div_scene_width = this.div_scene.offsetWidth;
        this.div_scene_height = this.div_scene.offsetHeight;

        //Create a new Three.js Scene
        this.scene = new THREE.Scene();
        //Perspective Camera is used for the 3D Scene
        this.camera = new THREE.PerspectiveCamera(75, this.div_scene_width / this.div_scene_height, 0.1, 1000);

        //Create Renderer and set the size based on the html container
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.div_scene_width, this.div_scene_height, false);
        this.renderer.setClearColor("#e8e8e8");
        this.div_scene.appendChild(this.renderer.domElement);

        //Navigation Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.update();

        //XYZ Axes
        this.axesHelper = new THREE.AxesHelper(10);
        this.scene.add(this.axesHelper);

        //Lights    
        this.ambientLight = new THREE.AmbientLight( 0xBBBBBB );
        this.scene.add(this.ambientLight);

        this.camera.position.z = 5;

        window.addEventListener('resize', () => {
            this.updateRendererSize();
        })

        this.animate();
    }

    updateRendererSize() {
        this.div_scene_width = this.div_scene.offsetWidth;
        this.div_scene_height = this.div_scene.offsetHeight;

        this.renderer.setSize(this.div_scene_width, this.div_scene_height);
        this.camera.aspect = this.div_scene_width / this.div_scene_height;

        this.camera.updateProjectionMatrix();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    //Returns the correctly formatted String for finding a Group in the scene
    getGroupNameString(id) {
        return `${this.groupNamePrefix}${id}`;
    }

    addPlot(plot, plotID) {
        this.dicGroups[plotID] = new THREE.Group();
        this.dicGroups[plotID].name = this.getGroupNameString(plotID);

        this.drawPlot(plot, plotID);

        //If there already is a plot, make the newly added plot invisible
        if (this.plotAmountInScene != 0) {
            this.dicGroups[plotID].visible = false;
        }
        else {
            this.currentPlotID = plotID;
        }

        this.scene.add(this.dicGroups[plotID]);

        // if (plotID == 1) {
        //     setTimeout(() => {
        //         this.switchToPlot(1);
        //     }, 5000);

        //     setTimeout(() => {
        //         this.switchToPlot(0);
        //     }, 10000);

        //     setTimeout(() => {
        //         this.switchToPlot(1);
        //     }, 15000);
        // }

        this.plotAmountInScene++;
    }

    saveCurrentViewerSettings() {
        if (this.currentPlotID in this.dicViewerSettings) {
            this.dicViewerSettings[this.currentPlotID].setSettings(this.camera.position.clone());
        }
        else {
            this.dicViewerSettings[this.currentPlotID] = new ViewerSettings3D(this.camera.position.clone());
        }
    }

    loadViewerSettings(plotID) {
        if (plotID in this.dicViewerSettings == false) {
            console.log("Couldn't load viewer settings. Plot wasn't found.");
            return;
        }

        let viewerSettings = this.dicViewerSettings[plotID];

        let pos = viewerSettings.cameraPosition;
        this.camera.position.set(pos.x, pos.y, pos.z);
    }

    //Returns the Group-Object of the currently viewed Plot
    getCurrentPlot() {
        if (this.currentPlotID == null) {
            console.log("There is currently no Plot in the scene")
            return;
        }

        if (this.currentPlotID in this.dicGroups == false) {
            console.log("Cannot Switch. There is no plot with this ID")
            return;
        }

        return this.dicGroups[this.currentPlotID];
    }

    //Switches to the given Plot
    switchToPlot(plotAndID) {
        let id = plotAndID[1];
        if (id in this.dicGroups == false) {
            this.addPlot(plotAndID[0]);
            return;
        }

        this.saveCurrentViewerSettings();
    
        //Switch to Plot
        this.dicGroups[this.currentPlotID].visible = false;
        this.dicGroups[id].visible = true;
        this.currentPlotID = id;

        this.loadViewerSettings(this.currentPlotID);
    }

    //Converts Point Class to Vector3 Class
    pointsToVector3s(points) {
        let vertices = [];
        points.forEach(point => {
            let vertex = new THREE.Vector3(point.x, point.y, point.z);
            vertices.push(vertex);
        });
        return vertices;
    }

    //Converts Point Class to a list of coordinates
    pointsToPositions(points) {
        let positions = [];
        points.forEach(point => {
            positions.push(point.x, point.y, point.z);
        });
        //Close the border
        positions.push(points[0].x, points[0].y, points[0].z)
        return positions;
    }

    //Draws the plot + children
    drawPlot(plot, plotID)
    {
        if (plot === null || plot === undefined) return;
        //console.log(plot);

        if (plot.plotSize instanceof SCENE.RectanglePlotSize) {
            let plotGeometry = new THREE.BoxGeometry(plot.plotSize.length, 0.2, plot.plotSize.width);
            let plotMesh = new THREE.Mesh(plotGeometry, this.PLOT_MATERIAL);
            plotMesh.position.set(plot.plotSize.length / 2, -0.1, plot.plotSize.width / 2);
            this.dicGroups[plotID].add(plotMesh);
        }
        else if (plot.plotSize instanceof SCENE.SquarePlotSize) {
            let plotGeometry = new THREE.BoxGeometry(plot.plotSize.sidesLength, 0.2, plot.plotSize.sidesLength);
            let plotMesh = new THREE.Mesh(plotGeometry, this.PLOT_MATERIAL);
            plotMesh.position.set(plot.plotSize.sidesLength / 2, -0.1, plot.plotSize.sidesLength / 2);
            this.dicGroups[plotID].add(plotMesh);
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
            this.drawHouse(house, plotID);
        });

    }

    //Draws the house + children
    drawHouse(house, plotID)
    {
        if (house === null || house === undefined) return;

        house.liWalls.forEach(outerWall => {
            this.drawWall(outerWall, plotID);
        });

        house.liRooms.forEach(room => {
            this.drawRoom(room, plotID);
        });

        house.liRoofs.forEach(roof => {
            this.drawRoof(roof, plotID);
        });

        house.liFloors.forEach(floor => {
            this.drawFloor(floor, plotID);
        });

        house.liRoomObjs.forEach(roomObject => {
            this.drawRoomObject(roomObject, plotID);
        });
    }

    //Draws Room + children
    drawRoom(room, plotID)
    {
        if (room === null || room === undefined) return;

        room.liBorders.forEach(border => {
            this.drawBorder(border, plotID);
        });
    }

    //Draws a Room Object
    drawRoomObject(roomObject, plotID)
    {
        if (roomObject === null || roomObject === undefined) return;

        if (roomObject instanceof SCENE.RoomExit && !(roomObject instanceof SCENE.Door)) return; 

        if (roomObject instanceof SCENE.RoomObject) {
            var roomObjectGeometry = new ConvexGeometry(this.pointsToVector3s(roomObject.liPoints));
        } else {
            console.log(`ERROR, the object with the id "${roomObject.id}" is not a Room-Object!`);
            return;
        }

        if (roomObject instanceof SCENE.Door) {
            var roomObjectMesh = new THREE.Mesh(roomObjectGeometry, this.DOOR_MATERIAL);
        } else if (roomObject instanceof Window) {
            var roomObjectMesh = new THREE.Mesh(roomObjectGeometry, this.WINDOW_MATERIAL);
        } else {
            var roomObjectMesh = new THREE.Mesh(roomObjectGeometry, this.ROOM_OBJECT_MATERIAL);
        }

        this.dicGroups[plotID].add(roomObjectMesh);
    }

    //Draws any wall
    drawWall(wall, plotID)
    {
        if (wall === null || wall === undefined) return;

        if (wall instanceof SCENE.Floor || wall instanceof SCENE.PolyFloor) {
            drawFloor(wall, plotID);
            return;
        }

        if (wall instanceof SCENE.PolyWall) {
            var wallGeometry = new ConvexGeometry(this.pointsToVector3s(wall.liPoints));
        }
        else {
            console.log("ERROR, this type of Wall cannot be drawn yet!");
            return;
        }

        //Check if wall is an InnerWall
        if (wall instanceof SCENE.PolyInnerWall || wall instanceof SCENE.InnerWall) {
            var wallMesh = new THREE.Mesh(wallGeometry, this.INNER_WALL_MATERIAL);
        }
        else {
            var wallMesh = new THREE.Mesh(wallGeometry, this.OUTER_WALL_MATERIAL);
        }

        this.dicGroups[plotID].add(wallMesh);
    }

    //Draws a floor
    drawFloor(floor, plotID)
    {
        if (floor === null || floor === undefined) return;

        if (floor instanceof SCENE.Floor) {
            console.log("ERROR, this type of Floor cannot be drawn yet!")
            return;
        }

        var floorGeometry = new ConvexGeometry(this.pointsToVector3s(floor.liPoints));
        var floorMesh = new THREE.Mesh(floorGeometry, this.FLOOR_MATERIAL);
        this.dicGroups[plotID].add(floorMesh);
    }

    //Draws a roof
    drawRoof(roof, plotID)
    {
        if (roof === null || roof === undefined) return;

        if (roof instanceof SCENE.Roof) {
            console.log("ERROR, this type of Roof cannot be drawn yet!")
            return;
        }

        var roofGeometry = new ConvexGeometry(this.pointsToVector3s(roof.liPoints));
        var roofMesh = new THREE.Mesh(roofGeometry, this.ROOF_MATERIAL);
        this.dicGroups[plotID].add(roofMesh);
    }

    //Draw a border
    drawBorder(border, plotID)
    {
        if (border === null || border === undefined) return;

        var borderGeometry = new LineGeometry();
        borderGeometry.setPositions(this.pointsToPositions(border.liPoints));
        var borderLine = new Line2(borderGeometry, this.BORDER_MATERIAL);

        this.dicGroups[plotID].add(borderLine);
    }
}

class ViewerSettings2D {
    constructor(cameraPosition, cameraRotation, cameraZoom, clippingPlane) {
        this.cameraPosition = cameraPosition;
        this.cameraRotation = cameraRotation;
        this.cameraZoom = cameraZoom;
        this.clippingPlane = clippingPlane;
    }

    setSettings(cameraPosition, cameraRotation, cameraZoom, clippingPlane) {
        this.cameraPosition = cameraPosition;
        this.cameraRotation = cameraRotation;
        this.cameraZoom = cameraZoom;
        this.clippingPlane = clippingPlane;
    }
}

class ViewerSettings3D {
    constructor(cameraPosition) {
        this.cameraPosition = cameraPosition;
    }

    setSettings(cameraPosition) {
        this.cameraPosition = cameraPosition;
    }
}