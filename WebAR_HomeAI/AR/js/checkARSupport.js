if (navigator.xr) {
    navigator.xr.isSessionSupported('immersive-ar')
    .then((isSupported) => {
        if (!isSupported) { 
            let errorMessages = document.getElementsByClassName("div-error-message")
            for (let errorMessage of errorMessages) {
                errorMessage.innerHTML = "WebXR is not supported on this device";
            }
        }
    });
}