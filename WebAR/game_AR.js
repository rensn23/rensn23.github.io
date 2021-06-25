//Planes
let leftClippingVector;
let leftClippingPlane;
let rightClippingVector;
let rightClippingPlane;
let arrClippingPlanes = [];
let roadAmount = 7;
let roadSpacing;

//Time
let timeBetweenFrames;


//Constants
const GRAY_MATERIAL = new THREE.MeshStandardMaterial({ color: 0x202020 });
const ROAD_MATERIAL = new THREE.MeshStandardMaterial({ color: 0x404040, clippingPlanes: arrClippingPlanes });
const PLAYER_MATERIAL = new THREE.MeshBasicMaterial({ color: 0x000000 });
const ENEMY_MATERIAL = new THREE.MeshBasicMaterial({ color: 0xffffff });
const UNIT_VECTOR_X = new THREE.Vector3(1, 0, 0);
const UNIT_VECTOR_Y = new THREE.Vector3(0, 1, 0);

//Models
const gltfLoader = new THREE.GLTFLoader();  //For loading 3D objects
let ROAD_GEOMETRY;
let DINO_GEOMETRY;
let BIRD_GEOMETRY;
let CACTUS_1x1_GEOMETRY;
let CACTUS_1x2_GEOMETRY;
let CACTUS_2x1_GEOMETRY;
let CACTUS_2x2_GEOMETRY;

let scale = 250;

let arrObjectsToRemove = [];        //List of Objects which get destroyed after frame
let arrCurrentSceneEnemieIDs = [];  //List of Enemies which currently exist in the scene
let arrCurrentGameEnemieIDs = [];   //List of Enemies which currently exist in the game
let arrCurrentRoads = [];           //List of all road segments

let instanceHandler;
let game;

let playerScene = null;     //Player in the 3D-Scene
let playerGame;             //Player in the game

//Reticles/Cursors
let arrow;                  //The "preview" reticle that moves with the camera
let reticle1;
let reticle2;
let direction;              //direction from reticle1 to reticle2
let directionNegated = new THREE.Vector3();         //the opposite direction
let directionScaled = new THREE.Vector3();          //scaled direction for updating road position
let reticleAngle = 0;       //the angle between the direction and the x-axis
let bReticle1Placed = false;
let bReticle2Placed = false;

async function activateXR() {

    //Add a canvas
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl", { xrCompatible: true });

    //Three.js initialization
    const scene = new THREE.Scene();

    //Axes Helper
    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);

    //Adds a white directional light to the scene
    function addLight(...pos) {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(...pos);
        scene.add(light);
    }

    //Ambient Light
    const ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    // WebGLRenderer
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: canvas,
        context: gl
    });
    renderer.autoClear = false;
    renderer.localClippingEnabled = true;

    //Disable matrix auto updates from three.js
    const camera = new THREE.PerspectiveCamera();
    camera.matrixAutoUpdate = false;

    //Initialize WebXR session using "immersive-ar"
    const session = await navigator.xr.requestSession("immersive-ar", { requiredFeatures: ['hit-test'] });
    session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, gl)
    });

    //Create a position reference near the user
    const referenceSpace = await session.requestReferenceSpace('local');
    const viewerSpace = await session.requestReferenceSpace('viewer');

    //Hit testing with user as the origin
    const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

    function loadAllModels() {
        //1 Voxel in MagicaVoxel = 0.1 in THREE.js

        //Reticle
        gltfLoader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf", function (gltf) {
            arrow = gltf.scene;
            arrow.visible = false;
            scene.add(arrow);
        })

        //Dino              21x6x21 Voxel
        gltfLoader.load("./src/models/Dino.gltf", function (gltf) {
            DINO_GEOMETRY = gltf.scene.children[0].geometry;
        })

        //Bird              23x21x11 Voxel
        gltfLoader.load("./src/models/Bird.gltf", function (gltf) {
            BIRD_GEOMETRY = gltf.scene.children[0].geometry;
        })

        //Cactus 1x1        9x6x10 Voxel
        gltfLoader.load("./src/models/Cactus_1x1.gltf", function (gltf) {
            CACTUS_1x1_GEOMETRY = gltf.scene.children[0].geometry;
        })

        //Cactus 1x2        12x6x20 Voxel
        gltfLoader.load("./src/models/Cactus_1x2.gltf", function (gltf) {
            CACTUS_1x2_GEOMETRY = gltf.scene.children[0].geometry;
        })

        //Cactus 2x1        19x8x11 Voxel
        gltfLoader.load("./src/models/Cactus_2x1.gltf", function (gltf) {
            CACTUS_2x1_GEOMETRY = gltf.scene.children[0].geometry;
        })

        //Cactus 2x2        22x8x21 Voxel
        gltfLoader.load("./src/models/Cactus_2x2.gltf", function (gltf) {
            CACTUS_2x2_GEOMETRY = gltf.scene.children[0].geometry;
        })

        //Road              100x20x1 Voxel
        gltfLoader.load("./src/models/Road.gltf", function (gltf) {
            ROAD_GEOMETRY = gltf.scene.children[0].geometry;
        })
    }

    loadAllModels();

    function spawnRoads() {
        roadSpacing = 250 / scale;
        for (let i = 0; i < roadAmount; i++) {
            let roadPiece = new THREE.Mesh(ROAD_GEOMETRY, ROAD_MATERIAL);
            roadPiece.scale.set(25 / scale, 25 / scale, 25 / scale);

            let roadPos = new THREE.Vector3((i - 1) * roadSpacing, 0, 0);
            roadPos.applyAxisAngle(UNIT_VECTOR_Y, reticleAngle);
            roadPiece.rotateOnAxis(UNIT_VECTOR_Y, reticleAngle);

            roadPiece.position.x = roadPos.x + reticle1.position.x;
            roadPiece.position.y = roadPos.y + reticle1.position.y;
            roadPiece.position.z = roadPos.z + reticle1.position.z;

            arrCurrentRoads.push(roadPiece);
            scene.add(roadPiece);
        }
    }

    function setClippingPlanes() {
        //Unit Vectors for the planes
        leftClippingVector = new THREE.Vector3(direction.x, direction.y, direction.z);
        leftClippingVector.normalize();
        rightClippingVector = new THREE.Vector3(-direction.x, -direction.y, -direction.z);
        rightClippingVector.normalize();

        //Create Planes
        leftClippingPlane = new THREE.Plane(leftClippingVector, 0);
        rightClippingPlane = new THREE.Plane(rightClippingVector, 0);

        //Calculate signed distance between the plane and the reticle
        let leftClippingPlaneOffset = leftClippingPlane.distanceToPoint(reticle1.position);
        leftClippingPlane.constant = -leftClippingPlaneOffset + (50 / scale);
        rightClippingPlane.constant = leftClippingPlaneOffset + (1050 / scale);

        //arrClippingPlanes.push(leftClippingPlane);
        //arrClippingPlanes.push(rightClippingPlane);
    }

    //Is called when user touches screen
    session.addEventListener("select", (event) => {
        if (!bReticle1Placed) {
            gltfLoader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf", function (gltf) {
                reticle1 = gltf.scene;
                reticle1.position.set(arrow.position.x, arrow.position.y, arrow.position.z)
                reticle1.name = "reticle1";
                scene.add(reticle1);

                //Add Light sources
                addLight(reticle1.position.x - (200 / scale), reticle1.position.y + (300 / scale), reticle1.position.z - (0 / scale));
                addLight(reticle1.position.x - (0 / scale), reticle1.position.y + (200 / scale), reticle1.position.z - (200 / scale));
                addLight(reticle1.position.x + (200 / scale), reticle1.position.y + (300 / scale), reticle1.position.z + (0 / scale));
                addLight(reticle1.position.x + (0 / scale), reticle1.position.y + (200 / scale), reticle1.position.z + (200 / scale));
            })
            bReticle1Placed = true;
        }
        else if (!bReticle2Placed) {
            gltfLoader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf", function (gltf) {
                reticle2 = gltf.scene;
                reticle2.position.set(arrow.position.x, arrow.position.y, arrow.position.z)
                reticle2.name = "reticle2";

                direction = new THREE.Vector3(reticle2.position.x - reticle1.position.x, 0, reticle2.position.z - reticle1.position.z);
                scale = scale / Math.max(1, direction.length() / 1.5);
                direction.normalize();
                directionNegated.copy(direction).negate().normalize().multiplyScalar(1 / scale);

                if (reticle2.position.z < reticle1.position.z) {
                    reticleAngle = UNIT_VECTOR_X.angleTo(direction);
                } else {
                    reticleAngle = -UNIT_VECTOR_X.angleTo(direction);
                }

                arrow.visible = false;

                setClippingPlanes();
            })
            bReticle2Placed = true;
            scene.remove(scene.getObjectByName("reticle1"));
            setTimeout(startGame, 100);
        }
    });

    function startGame() {

        //Create Instance-Handler
        instanceHandler = new InstanceHandler(1, gameLoop);
        instanceHandler.Init();

        //Create an Instance
        game = instanceHandler.GetInstance();

        //Start Instance
        instanceHandler.Start();

        //Add Road Pieces
        spawnRoads();

        timeBetweenFrames = Date.now();
    }

    function gameLoop() {

        //Reset arrays
        arrCurrentGameEnemieIDs = [];
        arrObjectsToRemove = [];

        //Update Roads
        timeBetweenFrames = (Date.now() - timeBetweenFrames) / 1000;
        directionScaled.copy(directionNegated).multiplyScalar(timeBetweenFrames * game.gameHandler.dSpeed);
        arrCurrentRoads.forEach(road => {
            road.position.add(directionScaled);
            let playerToRoadVector = new THREE.Vector3(road.position.x - playerScene.position.x, road.position.y - playerScene.position.y, road.position.z - playerScene.position.z);
            if ((playerToRoadVector.x < 0 && directionNegated.x < 0) || (playerToRoadVector.x >= 0 && directionNegated.x >= 0)) {
                let playerToRoadDistance = playerToRoadVector.length();
                if (playerToRoadDistance >= 2) {
                    let scaledDirection = new THREE.Vector3();
                    scaledDirection.copy(direction);
                    scaledDirection.multiplyScalar(roadAmount * roadSpacing);
                    console.log(scaledDirection);
                    road.position.add(scaledDirection);
                }
            }
        });
        timeBetweenFrames = Date.now();

        //Game plays automatically
        instanceHandler.Act(Predict(instanceHandler.GetState()));

        //Spawn all enemies
        game.gameHandler.arrObstacles.forEach(enemieGame => {

            arrCurrentGameEnemieIDs.push(enemieGame.nObstacleUID);

            if (!arrCurrentSceneEnemieIDs.includes(enemieGame.nObstacleUID)) {

                let newEnemieGeometry;
                let newEnemie;
                let offset = new THREE.Vector3(0, 0, 0);

                switch (enemieGame.nObstacleID) {
                    case 0:     //Cactus 1x1
                        newEnemieGeometry = CACTUS_1x1_GEOMETRY;
                        newEnemie = new THREE.Mesh(newEnemieGeometry, GRAY_MATERIAL);
                        newEnemie.scale.set(25 / scale, 25 / scale, 25 / scale);
                        break;
                    case 1:     //Cactus 1x2
                        newEnemieGeometry = CACTUS_1x2_GEOMETRY;
                        newEnemie = new THREE.Mesh(newEnemieGeometry, GRAY_MATERIAL);
                        newEnemie.scale.set(25 / scale, 25 / scale, 25 / scale);
                        break;
                    case 2:     //Bird Low
                    case 3:     //Bird High
                        newEnemieGeometry = BIRD_GEOMETRY;
                        newEnemie = new THREE.Mesh(newEnemieGeometry, GRAY_MATERIAL);
                        //newEnemie.scale.set(25 * 0.43 / scale, 25 * 0.43 / scale, 25 * 0.43 / scale);
                        newEnemie.scale.set(25 * 0.8 / scale, 25 * 0.8 / scale, 25 * 0.8 / scale);
                        offset.set(0.025, -0.3, -0.025);
                        break;
                    case 4:     //Cactus 2x1
                        newEnemieGeometry = CACTUS_2x1_GEOMETRY;
                        newEnemie = new THREE.Mesh(newEnemieGeometry, GRAY_MATERIAL);
                        newEnemie.scale.set(25 / scale, 25 / scale, 25 / scale);
                        break;
                    case 5:     //Cactus 2x2
                        newEnemieGeometry = CACTUS_2x2_GEOMETRY;
                        newEnemie = new THREE.Mesh(newEnemieGeometry, GRAY_MATERIAL);
                        newEnemie.scale.set(25 / scale, 25 / scale, 25 / scale);
                        break;
                    default:
                        newEnemieGeometry = new THREE.BoxGeometry(enemieGame.dWidth / scale, enemieGame.dHeight / scale, 25 / scale);
                        newEnemie = new THREE.Mesh(newEnemieGeometry, GRAY_MATERIAL);
                        break;
                }

                let enemieGamePos = new THREE.Vector3((enemieGame.v2Pos.dX + (enemieGame.dWidth / 2) + offset.x) / scale, (enemieGame.v2Pos.dY + offset.y) / scale, offset.z);
                enemieGamePos.applyAxisAngle(UNIT_VECTOR_Y, reticleAngle);
                newEnemie.rotateOnAxis(UNIT_VECTOR_Y, reticleAngle);

                newEnemie.position.x = enemieGamePos.x + reticle1.position.x;
                newEnemie.position.y = enemieGamePos.y + reticle1.position.y;
                newEnemie.position.z = enemieGamePos.z + reticle1.position.z;

                newEnemie.name = enemieGame.nObstacleUID.toString();

                arrCurrentSceneEnemieIDs.push(enemieGame.nObstacleUID);
                scene.add(newEnemie);
            }
        });

        //Update the current enemie's positions
        arrCurrentSceneEnemieIDs.forEach(curSceneEnemieID => {
            let curEnemieObject = scene.getObjectByName(curSceneEnemieID.toString());
            if (curEnemieObject === null) return;

            if (!arrCurrentGameEnemieIDs.includes(curSceneEnemieID)) {
                arrObjectsToRemove.push(curSceneEnemieID);
                arrCurrentSceneEnemieIDs.shift();
            } else {
                game.gameHandler.arrObstacles.forEach(enemieGame => {
                    if (curSceneEnemieID == enemieGame.nObstacleUID) {
                        //Create Vector with current enemie position
                        let enemieGamePos = new THREE.Vector3((enemieGame.v2Pos.dX + (enemieGame.dWidth / 2)) / scale, (enemieGame.v2Pos.dY + (enemieGame.dHeight / 2)) / scale, 0);
                        //Turn enemie around the y-axis 
                        enemieGamePos.applyAxisAngle(UNIT_VECTOR_Y, reticleAngle);
                        //Apply the rotated positions
                        curEnemieObject.position.x = enemieGamePos.x + reticle1.position.x;
                        curEnemieObject.position.z = enemieGamePos.z + reticle1.position.z;
                    }
                });
            }
        });

        //Create Player
        if (playerScene === null) {
            //let playerGeometry = new THREE.BoxGeometry(25 / scale, 50 / scale, 25 / scale);
            playerScene = new THREE.Mesh(DINO_GEOMETRY, GRAY_MATERIAL);
            playerScene.scale.set(25 * 0.65 / scale, 1, 25 * 1 / scale);
            playerScene.rotateOnAxis(UNIT_VECTOR_Y, reticleAngle);
            scene.add(playerScene);

            playerGame = game.gameHandler.player;
        }

        //Update Player
        //Create Vector with current player position
        //let playerGamePos = new THREE.Vector3((playerGame.v2Pos.dX + (playerGame.dWidth / 2)) / scale, (playerGame.v2Pos.dY + (playerGame.dHeight / 2)) / scale, 0);
        let playerGamePos = new THREE.Vector3((playerGame.v2Pos.dX + (playerGame.dWidth / 2) + 0.1) / scale, playerGame.v2Pos.dY / scale, 0);
        //Turn player around the y-axis 
        playerGamePos.applyAxisAngle(UNIT_VECTOR_Y, reticleAngle);
        //Apply the rotated positions
        playerScene.position.x = playerGamePos.x + reticle1.position.x;
        playerScene.position.y = playerGamePos.y + reticle1.position.y;
        playerScene.position.z = playerGamePos.z + reticle1.position.z;
        //Update Scale for Ducking/Unducking
        playerScene.scale.y = playerGame.dHeight * 0.60 / scale;

        //Remove all objects
        arrObjectsToRemove.forEach(objectID => {
            scene.remove(scene.getObjectByName(objectID.toString()));
        });
    }

    //Render loop for drawing in AR
    const onXRFrame = (time, frame) => {
        //Next draw request
        session.requestAnimationFrame(onXRFrame);

        //Bind graphics framebuffer to baseLayer framebuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);

        //Retrieve position of the device WARNING: "XRFrame.getViewerPose" can return null when tracking is tried to be first established
        const pose = frame.getViewerPose(referenceSpace);

        if (pose !== null) {
            const view = pose.views[0];

            const viewport = session.renderState.baseLayer.getViewport(view);
            renderer.setSize(viewport.width, viewport.height)

            //Use the view's transform matrix and projection matrix to configure the THREE.camera
            camera.matrix.fromArray(view.transform.matrix);
            camera.projectionMatrix.fromArray(view.projectionMatrix);
            camera.updateMatrixWorld(true);

            if (!bReticle2Placed) {
                const hitTestResults = frame.getHitTestResults(hitTestSource);
                if (hitTestResults.length > 0 && arrow) {
                    const hitPose = hitTestResults[0].getPose(referenceSpace);
                    arrow.visible = true;
                    arrow.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z);
                    arrow.updateMatrixWorld(true);
                }
            }

            //Render the scene
            renderer.render(scene, camera);
        }
    }
    session.requestAnimationFrame(onXRFrame);
}