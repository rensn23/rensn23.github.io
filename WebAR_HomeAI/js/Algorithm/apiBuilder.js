import { House, Plot,PolyOuterWall, PolyInnerWall,RectanglePlotSize, Point, Floor, PolyFloor } from "../JS_Classes.js"
import { Helper } from "./helper.js";
import { Plane } from "./planeBuilder.js";

export class APIBuilder{
    /**
     * Creates a new instance of the API Builder
     * @date 2022-02-27
     * @param {Function} fnPrint=console.log A function that gets a string and prints it.
     * @returns {APIBuilder}.
     */
    constructor(fnPrint = (str)=>{console.log(str);}){
        this.fnPrint = fnPrint;
    }

    /**
     * Build walls based on the planes.
     * @date 2022-02-28
     * @param {List} liPlanes A list of planes.
     * @returns {List} Returns a list of walls.
     */
    buildWalls(liPlanes){
        let nWallId = 0;

        //Temp. use of fixed wall width
        let fWallWidth = 1;

        let liWalls=[];
        //Build list of walls from list of planes
        liPlanes.forEach(plane => {
            let wall = null;
            let liPoints = [];

            //get normal vector for the width/strength of the wall
            let vec2DNormal = {fX: plane.liPoints[0].fY -plane.liPoints[2].fY ,fY:-(plane.liPoints[0].fX-plane.liPoints[2].fX)};
            let vec2DNormalLength = Math.sqrt(Math.pow(vec2DNormal.fX,2)+ Math.pow(vec2DNormal.fY,2));
            vec2DNormal.fX/=vec2DNormalLength;
            vec2DNormal.fY/=vec2DNormalLength;

            let i = -1;
            //build the walls
            for(let j = 0; j < plane.liPoints.length; j++){
                if(j>=2){
                    i=1;
                }
                let point = plane.liPoints[j];
                liPoints.push(new Point(point.fX+vec2DNormal.fX*fWallWidth/2 +vec2DNormal.fY*fWallWidth/2*i, point.fZ, point.fY+vec2DNormal.fY*fWallWidth/2+vec2DNormal.fX*fWallWidth/2*i));
                liPoints.push(new Point(point.fX-vec2DNormal.fX*fWallWidth/2 +vec2DNormal.fY*fWallWidth/2*i, point.fZ, point.fY-vec2DNormal.fY*fWallWidth/2+vec2DNormal.fX*fWallWidth/2*i));
            }

            if(plane.liNeighbours.includes(-1)){
                wall = new PolyOuterWall(nWallId, liPoints);
            }else{
                wall = new PolyInnerWall(nWallId, liPoints);
            }

            //Add the walls
            liWalls.push(wall);

            nWallId++;
        });
        return liWalls;
    }

    /**
     * Builds a list of floors.
     * @date 2022-02-28
     * @param {Object} userAPI The user api-object.
     * @param {Object} objSolution The solution of the floor.
     * @param {Number} nGridResolution The resolution of the grid.
     * @param {Number} fFloorStrength The depth the height the strength of the floor.
     * @param {Number} fFloorBase The height at which the floor starts.
     * @param {Number} nFloor The floor of the solution.
     * @returns {List} A List of floors is returned.
     */
    buildFloors(userAPI, objSolution, nGridResolution, fFloorStrength, fFloorBase=0, nFloor = 0){
        let liFloors = [];
        let nFloorId = 0;
        //TODO: LOOP FLOORS
        let floorPlanSolution = objSolution[0];
        let liliGrid = Helper.copyLiLiGrid(floorPlanSolution.cgSolution.grid);
        for(let r = 1; r<liliGrid.length-1; r++){
            for(let c = 1; c < liliGrid[r].length-1; c++){
                if(liliGrid[r][c] != -1){
                    let nRoomId = liliGrid[r][c];

                    //Get the start cords
                    let nStartR = r;
                    let nStartC = c;
                    let nEndR = r;
                    let nEndC = c;

                    //find the y (height) of the max square
                    for(let or = r; or<liliGrid.length-1; or++){
                        if(liliGrid[or][c] != nRoomId){
                            break;
                        }
                        nEndR = or;
                    }

                    //find the x (width) of the max square possible
                    for(let oc = c; oc < liliGrid.length-1; oc++){
                        let bIsFloorRow = true;
                        for(let or = r; or<=nEndR; or++){
                            if(liliGrid[or][oc] != nRoomId){
                                bIsFloorRow = false;
                                break;
                            }
                        }
                        if(bIsFloorRow == true){
                            nEndC = oc;
                        }else{
                            break;
                        }
                    }

                    // console.log("R:" + (nEndR-nStartR) + "C:" + (nEndC-nStartC));

                    for(let oc = c; oc <= nEndC; oc++){
                        for(let or = r; or<=nEndR; or++){
                            liliGrid[or][oc] = -1;
                        }
                    }

                    let liPoints = [];
                    liPoints.push(new Point(nStartC*nGridResolution-nGridResolution/2,fFloorBase,nStartR*nGridResolution-nGridResolution/2));
                    liPoints.push(new Point(nStartC*nGridResolution-nGridResolution/2,fFloorBase+fFloorStrength,nStartR*nGridResolution-nGridResolution/2));
                    
                    liPoints.push(new Point(nEndC*nGridResolution+nGridResolution/2,fFloorBase,nEndR*nGridResolution+nGridResolution/2));
                    liPoints.push(new Point(nEndC*nGridResolution+nGridResolution/2,fFloorBase+fFloorStrength,nEndR*nGridResolution+nGridResolution/2));

                    liPoints.push(new Point(nStartC*nGridResolution-nGridResolution/2,fFloorBase+fFloorStrength,nEndR*nGridResolution+nGridResolution/2));
                    liPoints.push(new Point(nStartC*nGridResolution-nGridResolution/2,fFloorBase,nEndR*nGridResolution+nGridResolution/2));

                    liPoints.push(new Point(nEndC*nGridResolution+nGridResolution/2,fFloorBase,nStartR*nGridResolution-nGridResolution/2));
                    liPoints.push(new Point(nEndC*nGridResolution+nGridResolution/2,fFloorBase+fFloorStrength,nStartR*nGridResolution-nGridResolution/2));
                    
                    liFloors.push(new PolyFloor(nFloorId, liPoints))
                    nFloorId++;
                }
            }
        }
        return liFloors;
    }

    /**
     * Builds a API Object using the userAPI and the solution and the list of planes.
     * @date 2022-02-27
     * @param {any} userAPI
     * @param {any} objSolution
     * @param {any} liPlanes
     * @returns {any}
     */
    buildAPIObject(userAPI, objSolution, liPlanes, nGridResolution){
        let plot = new Plot(new RectanglePlotSize(userAPI.plotSize.fLength, userAPI.plotSize.fWidth));
        let house = new House(0, 10000);
        plot.addHouse(house);

        //Add walls
        let liWalls = this.buildWalls(liPlanes);
        liWalls.forEach((wall)=>{
            house.addWall(wall);
        });

        let liFloors = this.buildFloors(liPlanes, objSolution, nGridResolution, 0.1);
        liFloors.forEach((floor)=>{
            house.addFloor(floor)
        });

        return plot;
    }
}