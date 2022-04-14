export class Helper{
    /**
    * Shuffle a given array and return the result.
    * @date 2022-02-14
    * @param {List} array the input array that should be shuffled.
    * @returns {List} The result of the suffle.
    */
    static shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    /**
    * Creates a new 2D array with the given shape.
    * @date 2022-02-01
    * @param {Number} nRowSize The number of rows
    * @param {any} nColSize the number of columns
    * @returns {Array} The newly created 2D array.
    */
    static create2DArray(nRowSize, nColSize){
        let liliArray = (new Array(nRowSize)).fill(0);
        for(let r = 0; r<nRowSize; r++){
            liliArray[r] = (new Array(nColSize)).fill(0)
        }
        return liliArray;
    }
    
    /**
    * Copies a given 2D array
    * @date 2022-02-01
    * @param {Array} liliGrid A 2D array that you want to copy.
    * @returns {Array} A copy of the given array.
    */
    static copyLiLiGrid(liliGrid){
        let liliCopy = this.create2DArray(liliGrid.length, liliGrid[0].length);
        for(let r = 0; r<liliGrid.length; r++){
            for(let c = 0; c<liliGrid[r].length; c++){
                liliCopy[r][c]  = liliGrid[r][c];
            }
        }
        return liliCopy;
    }

    /**
    * Deep-Clones a list, the object must have a function Clone that returns the cloned object.
    * @date 2022-01-16
    * @param {List} liList
    * @returns {List} A deep-Copy of the list.
    */
    static listDeepClone(liList) {
        let newList = [];
        liList.forEach(element => {
            newList.push(element.Clone());
        });
        return newList;
    }

    /**
    * Executes a function in parallel.
    * @date 2022-03-04
    * @param {Number} nCountWorkers the count of workers that should be used.
    * @param {Function} fncResultHandler Is called when the workers return a result.
    * @param {Function} fncWork A function takeing a list as parameter in which results are saved.
    * @param {Object} params The parameters of the function.
    * @param {Bool} bDebugST Executes the code single threaded for debug
    * @returns {List} Returns a list of workers.
    */
    static ParallelExecution(nCountWorkers, fncResultHandler, fncWork, params, bDebugST = false){
        if(bDebugST == true){
            fncWork(params);
            return;
        }

        let liWorkers = []
        for(let nWorkerId = 0; nWorkerId < nCountWorkers; nWorkerId++){
            let worker = new Worker("./js/Algorithm/fncWorker.js", { type: "module" });
            worker.onmessage = function(event){
                fncResultHandler(event.data);
            };
            worker.postMessage({fncWork:fncWork.toString(), params:JSON.stringify(params)});

            liWorkers.push(worker);
        }
        return liWorkers;
    }

    /**
    * Converts a rgb value to its hex value
    * @date 2022-02-13
    * @param {Number} r=0 The red-channel of the color
    * @param {Number} g=0
    * @param {Number} b=0
    * @returns {String}
    */
    static RGBToHex(r = 0, g = 0, b = 0) {
        // clamp and convert to hex
        let hr = Math.max(0, Math.min(255, Math.round(r))).toString(16);
        let hg = Math.max(0, Math.min(255, Math.round(g))).toString(16);
        let hb = Math.max(0, Math.min(255, Math.round(b))).toString(16);
        return "#" +
            (hr.length<2?"0":"") + hr +
            (hg.length<2?"0":"") + hg +
            (hb.length<2?"0":"") + hb;
    }
    
    /**
    * Converts a value to a color in range (0-1)->("Blue" - "Red")
    * @date 2022-02-13
    * @param {Number} fColorParam
    * @returns {void} The color of the cell for the heatmap.
    */
    static getColorForHeatmap(fColorParam){
        return Helper.RGBToHex(fColorParam*255, 0, (1-fColorParam)*255);
    }

    /**
    * Creates a HTML-string containing the information of the grid as table.
    * @date 2022-01-16
    * @param {List} lili2DGrid
    * @returns {String} A HTML Code ready to display.
    */
    static girdToHTML(lili2DGrid, bIsHeatmap = false) {
        let str = "";
        let backgroundColors = ["gray", "red", "#17FF00", "#F0F0F0", "#F6FF33", "#FFB833", "#334FFF", "#FF0083", "#00FFF0","#7AABEA", "#D5FC8C", "#000000"];
        str += '<table class="GridView" cellspacing="0" cellpadding="0">';
        lili2DGrid.forEach(row => {
            str += "<tr>";
            row.forEach(cell => {
                let color = "white";
                if(bIsHeatmap){
                    color = Helper.getColorForHeatmap(cell);                
                }else{
                    if(cell <0){
                        color="#FFFFFF";
                    }else{
                        color= backgroundColors[cell]
                    }
                }
                str += "<td style=\"background-color:" + color + ";\">" +"</td>";
            })
            str += "</tr>";
        })
        str += "</table>";
        return str;
    }
}

export class Vector3D{
    /**
     * Creates a new Vector3D
     * @date 2022-03-18
     * @param {Number} fX The x component of the vector
     * @param {Number} fY the y component of the Vector
     * @param {Number} fZ The z component of the vector
     * @returns {Vector3D}
     */
    constructor(fX, fY, fZ){
        this.fX = fX;
        this.fY = fY;
        this.fZ = fZ;
    }

    /**
     * Calculates the cross product of two vectors.
     * @date 2022-03-18
     * @param {Vector3D} v3A The first vector
     * @param {Vector3D} v3B the second vector.
     * @returns {Vector3D} The cross product the tow vectors.
     */
    static crossProduct(v3A, v3B){
        return new Vector3D(v3A.fY*v3B.fZ - v3A.fZ*v3B.fY, v3A.fZ*v3B.fX-v3A.fX*v3B.fZ, v3A.fX*v3B.fY-v3A.fY*v3B.fZ);
    }

    /**
     * Calculates the dot product of the given vector
     * @date 2022-03-19
     * @param {Vector3D} v3A
     * @param {Vector3D} v3B
     * @returns {Number} Retunrs the dot-product.
     */
    static dotProduct(v3A, v3B){
        return v3A.fX*v3B.fX + v3A.fY*v3B.fY + v3A.fZ*v3B.fZ;
    }

    magnitude(){
        return Math.sqrt(Math.pow(this.fX,2)+Math.pow(this.fY,2)+Math.pow(this.fZ,2));
    }
}