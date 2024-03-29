import { plot3 } from './js/demoHouse03.js';
import { drawPlot, scene } from './getScene.js';

// Models
const GLTFLOADER = new THREE.GLTFLoader(); // For loading 3D objects


export async function activateXR() {
    drawPlot(plot3);

    // Add canvas
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    let ctx = canvas.getContext("webgl", { xrCompatible: true });

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
        canvas: canvas,
        context: ctx
    });
    renderer.autoClear = false;
    renderer.localClippingEnabled = true;

    // Disable matrix auto updates
    let camera = new THREE.PerspectiveCamera();
    camera.matrixAutoUpdate = false;

    // Initialize WebXR session using "immersive-ar"
    let session = await navigator.xr.requestSession("immersive-ar", { requiredFeatures: ['hit-test'] });
    session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, ctx)
    });


    // Create a position reference near user
    let referenceSpace = await session.requestReferenceSpace('local');
    

    // Render loop for drawing
    const onXRFrame = (time, frame) => {
        // Next draw request
        session.requestAnimationFrame(onXRFrame);

        // Bind graphics framebuffer to base layer framebuffer
        ctx.bindFramebuffer(ctx.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);

        // Retrieve position of device WARNING: "XRFrame.getViewerPose" can return null when tracking is tried to be first established"
        // fixed the var name
        let pose = frame.getViewerPose(referenceSpace);

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