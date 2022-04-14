import { Point } from "../JS_Classes.js";
import { ConstrainedGrowth } from "./constrainedGrowth.js";
import { Helper, Vector3D } from "./helper.js";

export class Plane{
    /**
     * Creates a new plane object
     * @date 2022-02-27
      * @param {List} liPoints=[] List of Ponts (min. 3) def. the plane. {fX: _, fY:_, fZ:_}
      * @param {List} liNeighbours=[] The list of neighbours .
     * @returns {object}
     */
    constructor(liPoints = [], liNeighbours = []){
        this.liPoints = [];

        liPoints.forEach(point=>{
            this.liPoints.push({fX: Math.round(point.fX*1000)/1000, fY:Math.round(point.fY*1000)/1000, fZ:Math.round(point.fZ*1000)/1000});
        });

        //list of neighbours
        this.liNeighbours = liNeighbours;
    }

    /**
     * Checks if the values of the plane are the same.
     * @date 2022-03-03
     * @param {Plane} plane The plane to compare to;
     * @returns {Boolean} Returns true if the values of the given plane matches the values of the planes, false otherwise.
     */
    equalTo(plane){
        if(this.pointsEqualTo(plane) == true){
            if(plane.liNeighbours.sort().join(',')== this.liNeighbours.sort().join(',')){
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if the points of a plane matches the points of this.
     * @date 2022-03-03
     * @param {Plane} plane The plane for comparison
     * @returns {Boolean} Returns true if the points macht, otherwise false
     */
    pointsEqualTo(plane){
        for(let i = 0; i<plane.liPoints.length; i++){
            if(plane.liPoints[i].fX != this.liPoints[i].fX ||
                plane.liPoints[i].fY != this.liPoints[i].fY){
                    return false;
                }
        }
        return true;
    }

    /**
     * Checks if a given list of planes contains a given plane.
     * @date 2022-03-03
     * @param {List} liPlanes A list of planes.
     * @param {Plane} plane The plane to search the list for.
     * @returns {Boolean} Returns true if the list contais a plane with the same points.
     */
    static listContains(liPlanes, plane){
        for(let i = 0; i < liPlanes.length; i++){
            if(liPlanes[i].equalTo(plane)==true){
                return true;
            }
        }

        return false;
    }

    /**
     * Calculates the equation of the plane
     * @date 2022-03-18
     * @param {any} plane The plane to find the equation for.
     * @returns {a:, b:, c:} The parameters of the equation
     */
    static getPlaneEquation(plane){
        let v3AB = new Vector3D(plane.liPoints[0].fX-plane.liPoints[1].fX, plane.liPoints[0].fY-plane.liPoints[1].fY, plane.liPoints[0].fZ-plane.liPoints[1].fZ);
        let v3AC = new Vector3D(plane.liPoints[0].fX-plane.liPoints[2].fX, plane.liPoints[0].fY-plane.liPoints[2].fY, plane.liPoints[0].fZ-plane.liPoints[2].fZ);

        let v3CP = Vector3D.crossProduct(v3AB, v3AC);
        let k = -(v3CP.fX*plane.liPoints[0].fX + v3CP.fY*plane.liPoints[0].fY + v3CP.fZ*plane.liPoints[0].fZ);
        return {a:v3CP.fX, b:v3CP.fY, c:v3CP.fZ, k: k};
    }

    /**
     * checks if a plane is overlapping with a second plane.
     * @date 2022-03-18
     * @param {Plane} plane1 The base plane.
     * @param {Plane} plane2 the plane to check if overlapping.
     * @returns {Boolean} Returns a boolean, true if the planes overlapp
     */
    static planeIsOverlapping(plane1, plane2){
        //Check if atleast tow points of the plane are the same.
        let xMax = 0;
        let yMax = 0;
        let zMax = 0;
        let xMin = 1.7976931348623157*Math.pow(10,38);
        let yMin = 1.7976931348623157*Math.pow(10,38);
        let zMin = 1.7976931348623157*Math.pow(10,38);
        let liMatchingPoints = [];
        plane1.liPoints.forEach(point1=>{
            //find max and min point.
            xMax = Math.max(xMax, point1.fX);
            yMax = Math.max(yMax, point1.fY);
            zMax = Math.max(zMax, point1.fZ);
            xMin = Math.min(xMin, point1.fX);
            yMin = Math.min(yMin, point1.fY);
            zMin = Math.min(zMin, point1.fZ);
            // plane2.liPoints.forEach(point2=>{
            //     if(point1.fX == point2.fX &&
            //         point1.fY == point2.fY &&
            //         point1.fZ == point2.fZ ){
            //         liMatchingPoints.push(point1);
            //     }
            // });
        });

        // if(liMatchingPoints.length < 2){
        //     return false;
        // }

        //Check if the planes a parallel
        let objEquationPlane1 = Plane.getPlaneEquation(plane1);
        // let objEquationPlane2 = Plane.getPlaneEquation(plane2);

        // let v3NormalPlane1 = new Vector3D(objEquationPlane1.a, objEquationPlane1.b, objEquationPlane1.c);
        // let v3NormalPlane2 = new Vector3D(objEquationPlane2.a, objEquationPlane2.b, objEquationPlane2.c);

        for(let nP = 0; nP < plane2.liPoints.length; nP++){
            let point2 = plane2.liPoints[nP];

            let fDistance = Math.abs(objEquationPlane1.a*point2.fX+objEquationPlane1.b*point2.fY+objEquationPlane1.c*point2.fZ+objEquationPlane1.k)/Math.sqrt(Math.pow(objEquationPlane1.a,2)+Math.pow(objEquationPlane1.b,2)+Math.pow(objEquationPlane1.c,2));
            if(fDistance > 0.5){
                return false;
            }
            if(point2.fX > xMax || point2.fX < xMin ||
                point2.fY > yMax || point2.fY < yMin ||
                point2.fZ > zMax || point2.fZ < zMin){
                return false;
            }
        }

        // let fAngle = Math.acos(Vector3D.dotProduct(v3NormalPlane1, v3NormalPlane2)/(v3NormalPlane1.magnitude()*v3NormalPlane2.magnitude()))/(Math.PI*2)*365;

        // if((fAngle>-5 && fAngle<5) || (Math.abs(fAngle)>175 && Math.abs(fAngle)<185)){
        //     return true;
        // }
        return true;
    }

    /**
     * Checks if a given list of planes contains a overlapping plane for a given plane.
     * @date 2022-03-03
     * @param {List} liPlanes A list of planes.
     * @param {Plane} plane The plane to search the list for.
     * @returns {Boolean} Returns true if the list contais a plane with the same points.
     */
    static listContainsOverlappingPlane(liPlanes, plane){
        for(let i = 0; i<liPlanes.length; i++){
            let p = liPlanes[i];
            if(Plane.planeIsOverlapping(p, plane) == true){
                return true;
            }
        }      
        return false;
    }
}

const CornerType ={
    Inner: 0,
    Outer: 1
}

const Direction={
    X: 0,
    Y: 1
}

export class PlaneBuilder{
    constructor(fnPrint = (str)=>{console.log(str);}){
        this.fnPrint = fnPrint;
    }

    /**
     * Check if a given voxel is a corner
     * @date 2022-02-26
     * @param {List} liliSolutionGrid The grid whitch contians the floor-plan
     * @param {Number} nR The row of the voxel
     * @param {Number} nC The col of the voxel
     * @returns {{isCorner:, liChecksValid:}} Returns if it is cornern and if so which offset.
     */
    isOuterCorner(liliSolutionGrid, nR, nC){
        if(liliSolutionGrid[nR][nC]==-1){
            return  {isCorner:false, liChecksValid:[]};
        }

        //find all outer-corners checking if there are two directions that don't belong to the same group as the checking cell
        let liobjCornerChecks = [{nOR:nR+1, nOC:nC}, {nOR:nR-1, nOC:nC}, {nOR:nR, nOC:nC+1}, {nOR:nR, nOC:nC-1}];
        let liChecksValid = []
        liobjCornerChecks.forEach((objCornerCheck)=>{
            if(liliSolutionGrid[nR][nC] != liliSolutionGrid[objCornerCheck.nOR][objCornerCheck.nOC]){
                liChecksValid.push({nOR:objCornerCheck.nOR-nR, nOC: objCornerCheck.nOC-nC});
            }
        });
        
        if(liChecksValid.length < 2 || 
            //Ignore smale one wide rows and cols
            ((liliSolutionGrid[nR][nC] == liliSolutionGrid[liobjCornerChecks[0].nOR][liobjCornerChecks[0].nOC]&&
            liliSolutionGrid[nR][nC] == liliSolutionGrid[liobjCornerChecks[1].nOR][liobjCornerChecks[1].nOC] )||
            (liliSolutionGrid[nR][nC] == liliSolutionGrid[liobjCornerChecks[2].nOR][liobjCornerChecks[2].nOC]&&
                liliSolutionGrid[nR][nC] == liliSolutionGrid[liobjCornerChecks[3].nOR][liobjCornerChecks[3].nOC] ))){
            return {isCorner:false, liChecksValid:liChecksValid};
        }
        // this.debugGrid[nR][nC]=10;
        return {isCorner:true, liChecksValid:liChecksValid};
    }

    /**
     * Check if a given voxel is a inner-corner
     * @date 2022-02-26
     * @param {List} liliSolutionGrid The grid whitch contians the floor-plan
     * @param {Number} nR The row of the voxel
     * @param {Number} nC The col of the voxel
     * @returns {{isCorner:, liChecksValid:}} Returns if it is cornern and if so which offset.
     */
    isInnerCorner(liliSolutionGrid, nR, nC){
        if(liliSolutionGrid[nR][nC]==-1){
            return  {isCorner:false, liChecksValid:[]};
        }
        //Check diagonal
        let liDiagonalChecks = [{nOR: nR+1, nOC: nC+1}, {nOR: nR+1, nOC: nC-1}, {nOR: nR-1, nOC: nC+1}, {nOR: nR-1, nOC: nC-1}];
        let liDiagonalChecksValid = [];
        liDiagonalChecks.forEach(diagonalCheck=>{
            if(liliSolutionGrid[nR][nC] != liliSolutionGrid[diagonalCheck.nOR][diagonalCheck.nOC]){
                liDiagonalChecksValid.push({nOR:diagonalCheck.nOR-nR, nOC: diagonalCheck.nOC-nC});
            }
        });

        if(liDiagonalChecksValid.length <1){
            return {isCorner:false, liChecksValid:liDiagonalChecksValid};
        }
        
        let liDiagonalChecksValidForReturn = [];

        //check neighbouring cells.
        let bReturn = true;
        liDiagonalChecksValid.forEach(diagonalChecksValid => {
            if((liliSolutionGrid[nR][nC+diagonalChecksValid.nOC] == liliSolutionGrid[nR][nC] &&
                liliSolutionGrid[nR+diagonalChecksValid.nOR][nC] == liliSolutionGrid[nR][nC]) || 
                (liliSolutionGrid[nR+diagonalChecksValid.nOR][nC+diagonalChecksValid.nOC] == -1 && 
                liliSolutionGrid[nR][nC+diagonalChecksValid.nOC] != -1 &&
                liliSolutionGrid[nR+diagonalChecksValid.nOR][nC] != -1)){
                    bReturn = false;
                    liDiagonalChecksValidForReturn.push(diagonalChecksValid);
                }
        });

        if(bReturn == true){
            return {isCorner:false, liChecksValid:liDiagonalChecksValidForReturn};
        }

        // this.debugGrid[nR][nC] = 10;
        return {isCorner:true, liChecksValid:liDiagonalChecksValidForReturn};
    }
    
    /**
     * Calculates the wall length in positiv y
     * @date 2022-03-12
     * @param {List} liliSolutionGrid
     * @param {Number} nR
     * @param {Number} nC
     * @returns {nLength: , liNeighbours: } The length of the wall in y and the neighbours.
     */
    getPlaneLengthY(liliSolutionGrid, nR, nC){
        let nLength = 0;
        let liNeighbours = [];

        let nRoomIdCP1 = liliSolutionGrid[nR+nLength][nC+1];
        let nRoomIdCM1 = liliSolutionGrid[nR+nLength][nC-1];

        if(nRoomIdCP1 == nRoomIdCM1){
            return {nLength: 0, liNeighbours: []}
        }

        liNeighbours.push(liliSolutionGrid[nR+nLength][nC-1]);
        liNeighbours.push(liliSolutionGrid[nR+nLength][nC+1]);

        while(true){
            if(liliSolutionGrid[nR+nLength][nC] == liliSolutionGrid[nR][nC] &&
            (liliSolutionGrid[nR+nLength][nC+1] == nRoomIdCP1 &&
            liliSolutionGrid[nR+nLength][nC-1] == nRoomIdCM1 )){
                nLength ++;
            }else{
                break;
            }
        }
        return {nLength: nLength, liNeighbours: liNeighbours}
    }

    /**
     * Calculates the wall length in positiv x
     * @date 2022-03-12
     * @param {List} liliSolutionGrid
     * @param {Number} nR
     * @param {Number} nC
     * @returns {nLength: , liNeighbours: } The length of the wall in x and the neighbours.
     */
     getPlaneLengthX(liliSolutionGrid, nR, nC){
        let nLength = 0;
        let liNeighbours = [];

        let nRoomIdRP1 = liliSolutionGrid[nR+1][nC+nLength];
        let nRoomIdRM1 = liliSolutionGrid[nR-1][nC+nLength];

        if(nRoomIdRP1 == nRoomIdRM1){
            return {nLength: 0, liNeighbours: []}
        }

        liNeighbours.push(liliSolutionGrid[nR-1][nC+nLength]);
        liNeighbours.push(liliSolutionGrid[nR+1][nC+nLength]);

        while(true){
            if(liliSolutionGrid[nR][nC+nLength] == liliSolutionGrid[nR][nC] &&
                (liliSolutionGrid[nR+1][nC+nLength] == nRoomIdRP1 &&
                liliSolutionGrid[nR-1][nC+nLength] == nRoomIdRM1)){
                nLength ++;
            }else{
                break;
            }
        }
        return {nLength: nLength, liNeighbours: liNeighbours}
    }

    /**
     * Applies offset to point
     * @date 2022-03-13
     * @param {fR:, fC:} ffPoint The point to apply offset to
     * @param {nOR:, nOC:} objCornerCheck Object with information for offset
     * @param {Number} fGridResolution The resolution of the grid
     * @param {Number} nRDirection -1 or 1 for offset
     * @param {Number} nCDirection -1 or 1 for offset
     * @returns {fR:, fC:} The point is returned.
     */
    pointApplyOffset(ffPoint, objCornerCheck, fGridResolution, nRDirection =1, nCDirection=1){
        objCornerCheck.liChecksValid.forEach(objCC=>{
            ffPoint.fR += objCC.nOR*fGridResolution/2 * nRDirection;
            ffPoint.fC += objCC .nOC*fGridResolution/2 * nCDirection;
        });
        return ffPoint;
    }

    /**
    * Calculates the points for the plane.
    * @date 2022-03-12
    * @param {Number} nR The row of the corner
    * @param {Number} nC The col of the corner
    * @param {List} liliSolutionGrid The grid containing the 2D floor plane
    * @param {Number} fGridResolution The resolution of the grid
    * @param {Object} objCornerCheck The result of the check of the outer courner
    * @returns {liNeighbours: , ffCornerStart:, ffCornerEnd: }  Points and neighbours
    */
    getPointsAndNeighboursForPlaneY(nR, nC, liliSolutionGrid, fGridResolution, objCornerCheck){
        let ffCornerStart = {fR:nR*fGridResolution, fC:nC*fGridResolution};
        //Convert to the corner off the cell
        this.pointApplyOffset(ffCornerStart, objCornerCheck, fGridResolution);

        //Build planes for y
        let planeLengthY = this.getPlaneLengthY(liliSolutionGrid, nR, nC);

        if(planeLengthY.nLength <=1){
            return false;
        }

        let ffCornerEnd = {fR:(nR+planeLengthY.nLength-1)*fGridResolution, fC:nC*fGridResolution};
        //Convert to the corner off the cell
        this.pointApplyOffset(ffCornerEnd, objCornerCheck, fGridResolution, -1, 1)
       
        return {liNeighbours: planeLengthY.liNeighbours, ffCornerStart:ffCornerStart, ffCornerEnd:ffCornerEnd};
    }

    /**
    * Calculates the points for the plane.
    * @date 2022-03-12
    * @param {Number} nR The row of the corner
    * @param {Number} nC The col of the corner
    * @param {List} liliSolutionGrid The grid containing the 2D floor plane
    * @param {Number} fGridResolution The resolution of the grid
    * @param {Object} objCornerCheck The result of the check of the outer courner
    * @returns {liNeighbours: , ffCornerStart:, ffCornerEnd: }  Points and neighbours
    */
    getPointsAndNeighboursForPlaneX(nR, nC, liliSolutionGrid, fGridResolution, objCornerCheck){
        let ffCornerStart = {fR:nR*fGridResolution, fC:nC*fGridResolution};
        //Convert to the corner off the cell
        this.pointApplyOffset(ffCornerStart	, objCornerCheck, fGridResolution);

        //Build planes for y
        let planeLengthX = this.getPlaneLengthX(liliSolutionGrid, nR, nC);

        if(planeLengthX.nLength <=1){
            return false;
        }

        let ffCornerEnd = {fR:nR*fGridResolution, fC:(nC+planeLengthX.nLength-1)*fGridResolution};
        //Convert to the corner off the cell
        this.pointApplyOffset(ffCornerEnd, objCornerCheck, fGridResolution, 1,-1);

        return {liNeighbours: planeLengthX.liNeighbours, ffCornerStart:ffCornerStart, ffCornerEnd:ffCornerEnd};
    }

    /**
    * Returns a list of points for the plane and a list of neighbours
    * @date 2022-03-13
    * @param {Direction} eDirection The direction of the wall.
    * @param {Number} nR The row of the corner
    * @param {Number} nC The col of the corner
    * @param {List} liliSolutionGrid The grid containing the 2D floor plane
    * @param {Number} fGridResolution The resolution of the grid
    * @param {Number} fBaseHeight The base height of the floor
    * @param {Number} fFloorHeight The height of the floor. 
    * @param {Object} objCornerCheck The result of the check of the outer courner
    * @returns {liPoints:, liNeighbours: } A list of points and neighbours
    */
    getPointsAndNeighboursForPlane(eDirection,nR, nC, liliSolutionGrid, fGridResolution, fBaseHeight, fFloorHeight, objCornerCheck){
        let objPlaneInfo = null;
        if(eDirection == Direction.X){
            objPlaneInfo = this.getPointsAndNeighboursForPlaneX(nR, nC, liliSolutionGrid, fGridResolution, objCornerCheck);
        }else if(eDirection == Direction.Y){
            objPlaneInfo = this.getPointsAndNeighboursForPlaneY(nR, nC, liliSolutionGrid, fGridResolution, objCornerCheck);
        }else{
            console.error("Unknown direction!");
        }

        if(objPlaneInfo == false){
            return {isPlane: false, liPoints:[], liNeighbours: []};
        }

        let ffCornerStart = objPlaneInfo.ffCornerStart;
        let ffCornerEnd = objPlaneInfo.ffCornerEnd;

        //Build list of points for plane.
        let liPoints = [];
        liPoints.push({fX:ffCornerStart.fC, fZ:fBaseHeight,                 fY:ffCornerStart.fR});
        liPoints.push({fX:ffCornerStart.fC, fZ:fBaseHeight+fFloorHeight,    fY:ffCornerStart.fR});
        liPoints.push({fX:ffCornerEnd.fC,   fZ:fBaseHeight,                 fY:ffCornerEnd.fR});
        liPoints.push({fX:ffCornerEnd.fC,   fZ:fBaseHeight+fFloorHeight,    fY:ffCornerEnd.fR});

        return {isPlane: true, liPoints:liPoints, liNeighbours: objPlaneInfo.liNeighbours};
    }

    /**
     * Get offset of single-cell walls.
     * @date 2022-03-19
     * @param {Number} nR The row of the corner.
     * @param {Number} nC The col of the corner.
     * @param {List}   liliSolutionGrid The grid containing the 2D floor plane.
     * @returns {List} Returns a list of offsets.
     */
    getSingleCellWallInformation(nR, nC, liliSolutionGrid){
        let liChecks = [{nR:nR+1, nC:nC}, {nR:nR-1, nC:nC}, {nR:nR, nC:nC+1}, {nR:nR, nC:nC-1}];
        let liValidCornerChecks = [];
        liChecks.forEach(cornerCheck=>{
            if(liliSolutionGrid[cornerCheck.nR][cornerCheck.nC] != liliSolutionGrid[nR][nC]){
                liValidCornerChecks.push({nOR:cornerCheck.nR-nR, nOC:cornerCheck.nC-nC});
            }
        });
        return liValidCornerChecks;
    }

    /**
     * Builds walls for single cell spaces.
     * @date 2022-03-19
     * @param {Number} nR The row of the corner.
     * @param {Number} nC The col of the corner.
     * @param {List} liliSolutionGrid The grid containing the 2D floor plane
     * @param {Number} fGridResolution The resolution of the grid
     * @param {Number} fBaseHeight The base height of the floor
     * @param {Number} fFloorHeight The height of the floor. 
     * @param {List} liPlanes A ref. to the list of planes.
     * @returns {void}.
     */
    buildSingleCellWalls(nR, nC, liliSolutionGrid, fGridResolution, fBaseHeight, fFloorHeight, liPlanes){
        let liValidCornerChecks = this.getSingleCellWallInformation(nR, nC, liliSolutionGrid);
        liValidCornerChecks.forEach(validCornerCheck=>{
            //Build list of points for plane.
            let liPoints = [];
            let fOC = validCornerCheck.nOC*fGridResolution/2;
            let fOR = validCornerCheck.nOR*fGridResolution/2;
            liPoints.push({fX:nC*fGridResolution+fOC+fOR, fZ:fBaseHeight,                 fY:nR*fGridResolution+fOC+fOR});
            liPoints.push({fX:nC*fGridResolution+fOC+fOR, fZ:fBaseHeight+fFloorHeight,    fY:nR*fGridResolution+fOC+fOR});
            liPoints.push({fX:nC*fGridResolution+fOC-fOR, fZ:fBaseHeight,                 fY:nR*fGridResolution-fOC+fOR});
            liPoints.push({fX:nC*fGridResolution+fOC-fOR, fZ:fBaseHeight+fFloorHeight,    fY:nR*fGridResolution-fOC+fOR});

            let liNeighbours = [liliSolutionGrid[nR][nC], liliSolutionGrid[nR+validCornerCheck.nOR][nC+validCornerCheck.nOC]];

            let plane = new Plane(liPoints, liNeighbours);
            if((Plane.listContainsOverlappingPlane(liPlanes, plane) == false)){
                liPlanes.push(plane);
                console.log("push plane")
            }
        });
    }

    /**
     * Handle a given cell if it is a corner.
     * @date 2022-03-16
     * @param {Object} objCornerCheck The result of the check of the outer courner
     * @param {Number} nR The row of the corner
     * @param {Number} nC The col of the corner
     * @param {List}   liliSolutionGrid The grid containing the 2D floor plane
     * @param {Number} fGridResolution The resolution of the grid
     * @param {Number} fBaseHeight The base height of the floor
     * @param {Number} fFloorHeight The height of the floor. 
     * @param {List}   liPlanes A ref. to the list of planes.
     * @returns {void} .
     */
    buildPlanesHandleCorner(objCornerCheck, nR, nC, liliSolutionGrid, fGridResolution, fBaseHeight, fFloorHeight, liPlanes){
        if(objCornerCheck.isCorner){
            //Function for adding not existing planes to list of planes.
            let fnAddPlane = (objPlaneInfo)=>{
                if(objPlaneInfo.isPlane == true){
                    let plane = new Plane(objPlaneInfo.liPoints, objPlaneInfo.liNeighbours);
                    if(Plane.listContains(liPlanes, plane) == false){
                        liPlanes.push(plane);
                    }
                }
            }

            fnAddPlane(this.getPointsAndNeighboursForPlane(Direction.Y,nR,nC, liliSolutionGrid, fGridResolution, fBaseHeight, fFloorHeight, objCornerCheck));
            fnAddPlane(this.getPointsAndNeighboursForPlane(Direction.X,nR,nC,liliSolutionGrid, fGridResolution, fBaseHeight, fFloorHeight, objCornerCheck));
        
            //fix single cell walls
            this.buildSingleCellWalls(nR, nC, liliSolutionGrid, fGridResolution, fBaseHeight, fFloorHeight, liPlanes);
        }
    }

    /**
     * Create list of planes
     * @date 2022-02-26
     * @param {List} liliSolutionGrid The grid containing the 2D floor plane
     * @param {Number} fGridResolution The resolution of the grid
     * @param {Number} fBaseHeight The base height of the floor
     * @param {Number} fFloorHeight The height of the floor. 
     * @returns {List} A list of planes.
     */
    buildPlanes(liliSolutionGrid, fGridResolution, fBaseHeight, fFloorHeight){
        let liPlanes = [];
        this.debugGrid = Helper.copyLiLiGrid(liliSolutionGrid);

        //build walls
        for(let r = 1; r < liliSolutionGrid.length-1; r++){
            for(let c = 1; c < liliSolutionGrid[r].length-1; c++){
                let objCornerCheck = this.isInnerCorner(liliSolutionGrid, r, c);
                if(objCornerCheck.isCorner==false){
                    objCornerCheck = this.isOuterCorner(liliSolutionGrid, r,c);
                    this.buildPlanesHandleCorner(objCornerCheck, r,c,liliSolutionGrid, fGridResolution, fBaseHeight, fFloorHeight, liPlanes);
                }else{
                    objCornerCheck.liChecksValid.forEach(cv=>{
                        this.buildPlanesHandleCorner({isCorner:true, liChecksValid:[{nOR:-cv.nOR, nOC:cv.nOC}]}, r+cv.nOR,c,liliSolutionGrid, fGridResolution, fBaseHeight, fFloorHeight, liPlanes);
                        this.buildPlanesHandleCorner({isCorner:true, liChecksValid:[{nOR:cv.nOR, nOC:-cv.nOC}]}, r,c+cv.nOC,liliSolutionGrid, fGridResolution, fBaseHeight, fFloorHeight, liPlanes);
                        // this.debugGrid[r+0][c+cv.nOC] = 10;
                        // this.debugGrid[r+cv.nOR][c+0] = 10;                        
                    })
                }
            }
        }

        this.fnPrint(Helper.girdToHTML(this.debugGrid));
        return liPlanes;
    }   
}