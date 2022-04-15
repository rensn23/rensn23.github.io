import { plot3 } from './js/demoHouse03.js';
import { drawPlot, scene } from './getScene.js';

// Models
const GLTFLOADER = new THREE.GLTFLoader(); // For loading 3D objects

// Reticles
// let reticle;


export async function activateXR() {
    drawPlot(plot3);

    // Add canvas
    const CANVAS = document.createElement("canvas");
    document.body.appendChild(canvas);
    const CTX = canvas.getContext("webgl", { xrCompatible: true });

    // Add white directional light to scene
    function addLight(...pos) {
        let color = 0xFFFFFF;
        let intensity = 1;
        let light = new THREE.DirectionalLight(color, intensity);
        light.position.set(...pos);
        let helper = new THREE.DirectionalLightHelper(light, 0.3);
        scene.add(light);
        light.target = reticle;
    }

    //Ambient Light
    let ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    // WebGLRenderer
    let renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: CANVAS,
        context: CTX
    });
    renderer.autoClear = false;
    renderer.localClippingEnabled = true;

    // Disable matrix auto updates
    let camera = new THREE.PerspectiveCamera();
    camera.matrixAutoUpdate = false;

    // Initialize WebXR session using "immersive-ar"
    let session = await navigator.xr.requestSession("immersive-ar", { requiredFeatures: ['hit-test'], optionalFeatures: ['dom-overlay'], domOverlay: { root: document.getElementById('PATH TO OVERLAY HERE') } });
    session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, CTX)
    });

    if (session) {
        div_dom_overlay.style.display = 'block';
    }

    session.onend = function () {
        div_dom_overlay.style.display = 'none';
    }

    // Create a position reference near user
    let referenceSpace = await session.requestReferenceSpace('local');
    // let viewerSpace = await session.requestReferenceSpace('viewer');

    // Hit testing with user as origin
    let hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

    // GLTFLOADER.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf", function (gltf) {
    //     reticle = gltf.scene;
    //     reticle.visible = false;
    //     scene.add(reticle);
    // })

    // Render loop for drawing
    const onXRFrame = (time, frame) => {
        // Next draw request
        session.requestAnimationFrame(onXRFrame);

        // Bind graphics framebuffer to base layer framebuffer
        CTX.bindFramebuffer(CTX.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);

        // Retrieve position of device WARNING: "XRFrame.getViewerPose" can return null when tracking is tried to be first established"
        let position = frame.getViewerPose(referenceSpace);

        if (pose !== null) {
            let view = pose.views[0];

            let viewport = session.renderState.baseLayer.getViewport(view);
            renderer.setSize(viewport.width, viewport.height);

            // Use the view's transform matrix and projection matrix to configure the THREE.camera.
            camera.matrix.fromArray(view.transform.matrix)
            camera.projectionMatrix.fromArray(view.projectionMatrix);
            camera.updateMatrixWorld(true);

            // Render the scene
            renderer.render(scene, camera)
        }
    }
    session.requestAnimationFrame(onXRFrame);
}