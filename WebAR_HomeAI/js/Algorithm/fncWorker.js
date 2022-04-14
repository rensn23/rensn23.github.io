//Onmessage is called if the web worker receives a notification from the main thread
onmessage = function(e) {
    //congert a string to a function.
    let fncWork = eval(e.data.fncWork);
    //parase the parameters.
    let params = JSON.parse(e.data.params);
    //execute the function
    fncWork(params);
};

//Post a result to the main thread. 
function postResults(liResults){
    postMessage(liResults);
}