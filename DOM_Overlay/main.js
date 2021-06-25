async function activateXR() {
    //Add a canvas
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl", { xrCompatible: true });

    let xrButton = document.getElementById('xr-button');

    //Three.js initialization
    const scene = new THREE.Scene();

    //Axes Helper
    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);

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
    const session = await navigator.xr.requestSession("immersive-ar", { requiredFeatures: ['hit-test'], optionalFeatures: ['dom-overlay'], domOverlay: { root: document.body } });
    session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, gl)
    });

    if (session) {
        xrButton.innerHTML = "This is a test of a DOM overlay";
        document.getElementById('session-info').innerHTML = "DOM Overlay type: " + session.domOverlayState.type;
    }

    //Create a position reference near the user
    const referenceSpace = await session.requestReferenceSpace('local');
    const viewerSpace = await session.requestReferenceSpace('viewer');

    //Hit testing with user as the origin
    const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

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

            //Render the scene
            renderer.render(scene, camera);
        }
    }
    session.requestAnimationFrame(onXRFrame);
}