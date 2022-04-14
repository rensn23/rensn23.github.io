/*Import the parameters (userAPI), basis for creating the base layout*/
import { ConnectionRoom, PrivateRoom, SocialRoom, Staircase, ServiceRoom, Room } from "../Parameter_Classes.js";
import { Helper } from "./helper.js";

/*
interface ISimulatable{
    this.Id;
    this.nX;
    this.nY;
    this.nWidth;
    this.nDepth;
    this.fWidth;
    this.fDepth;
    this.fX;
    this.fY;

    this.liForces;

    Clone();
    AddForce();
    GetCombinedForce();
}
*/

//The area-type
export const AreaType = {
    private: 1,
    social: 2,
    service: 3,
    connection:4,
    staircase:5
}

export class Vec2D {
    constructor(x = 0, y = 0) {
        this.X = x;
        this.Y = y;
    }

    /**
     * Creates a copy of the instance.
     * @date 2022-01-16
     * @returns {Vec2D} A new Vec2D.
     */
    Clone() {
        return new Vec2D(this.X, this.Y);
    }

    /**
     * Adds two vectors and returns the result.
     * @date 2022-01-16
     * @param {Vec2D} vec2D1
     * @param {Vec2D} vec2D2
     * @returns {Vec2D} Returns a result Vector.
     */
    static Add(vec2D1, vec2D2) {
        let vec2D = vec2D1.Clone();
        vec2D.X += vec2D2.X;
        vec2D.Y += vec2D2.Y;
        return vec2D;
    }

    /**
     * Adds two vectors and returns the result
     * @date 2022-01-16
     * @param {Vec2D} vec2D
     * @returns {Vec2D} Returns a result Vector.
     */
    Add(vec2D) {
        this.X += vec2D.X;
        this.Y += vec2D.Y;
    }

    /**
     * Subtracts two vectors and returns the result.
     * @date 2022-01-16
     * @param {Vec2D} vec2D1
     * @param {Vec2D} vec2D2
     * @returns {Vec2D} Returns the result Vec2D.
     */
    static Minus(vec2D1, vec2D2) {
        let vec2D = vec2D1.Clone();
        vec2D.X -= vec2D2.X;
        vec2D.Y -= vec2D2.Y;
        return vec2D;
    }

    /**
     * Subtracts two vectors and returns the result.
     * @date 2022-01-16
     * @param {Vec2D} vec2D
     * @returns {Vec2D} Returns the result Vec2D.
     */
    Minus(vec2D) {
        this.X -= vec2D.X;
        this.Y -= vec2D.Y;
    }

    /**
     * Mulitplies the vector with a scalar and returns the new vector.
     * @date 2022-01-16
     * @param {Vec2D} vec2D
     * @param {Number} scalar
     * @returns {Vec2D} The result vector.
     */
    static MultiplyWithScalar(vec2D, scalar) {
        let vec2D_ = vec2D.Clone();
        vec2D_.X *= scalar;
        vec2D_.Y *= scalar;
        return vec2D_;
    }

    /**
     * Mulitplies the vector with a scalar.
     * @date 2022-01-16
     * @param {Number} scalar
     * @returns {void}
     */
    MultiplyWithScalar(scalar) {
        this.X *= scalar;
        this.Y *= scalar;
    }

    /**
     * Returns the magnitude(length) of an vector
     * @date 2022-01-16
     * @returns {Number} The magnitude of the vector.
     */
    Magnitude() {
        return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
    }

    /**
     * Normalizes the vector.
     * @date 2022-01-16
     * @returns {Vec2D} This vector.
     */
    Normalize() {
        let fMagnitude = this.Magnitude();
        this.X /= fMagnitude;
        this.Y /= fMagnitude;
        return this;
    }

    /**
     * Returns a normalized copy of the vector
     * @date 2022-01-16
     * @param {Vec2D} v2D
     * @returns {Vec2D} The normalized copy.
     */
    static Normalize(v2D) {
        let v2D_ = v2D.Clone();
        let fMagnitude = v2D.Magnitude();
        v2D_.X /= fMagnitude;
        v2D_.Y /= fMagnitude;
        return v2D_;
    }
}

/*Class to hold information that is needed only inside the alogirhtm*/
export class CPStaircase/*:ISimulatable*/ {
    constructor(staircase, id = null) {
        this.Staircase = staircase;

        if (id == null) {
            this.Id = ForceBasedAlgorithm.UID;
            ForceBasedAlgorithm.UID++;
        } else {
            this.Id = id;
        }
        this.nX = undefined;
        this.nY = undefined;
        this.nWidth = undefined;
        this.nDepth = undefined;
        this.fWidth = undefined;
        this.fDepth = undefined;
        this.fX = undefined;
        this.fY = undefined;
        this.bFixed = false;

        this.liForces = [];
    }

    //INTERFACE: ISimulatable
    /**
     * Clone the object.
     * @date 2022-01-16
     * @returns {CPStaircase} A copy of the instance.
     */
    Clone() {
        let cpStaircase = new CPStaircase(this.Staircase, this.Id);
        cpStaircase.nX = this.nX;
        cpStaircase.nY = this.nY;
        cpStaircase.nWidth = this.nWidth;
        cpStaircase.nDepth = this.nDepth;
        cpStaircase.fX = this.fX;
        cpStaircase.fY = this.fY;
        cpStaircase.fWidth = this.fWidth;
        cpStaircase.fDepth = this.fDepth;
        cpStaircase.liForces = this.liForces;
        cpStaircase.bFixed = this.bFixed;
        return cpStaircase;
    }

    //INTERFACE: ISimulatable
    /**
     * Adds a force to the staircase.
     * @date 2022-01-16
     * @param {Vec2D} vec2D
     * @returns {void}
     */
    AddForce(vec2D) {
        if (this.bFixed) {
            throw Error("Unable to apply forces to a fixed staircase!");
        }
        this.liForces.push(vec2D);
    }

    /**
     * Combines all forces and returns the result.
     * @date 2022-01-16
     * @returns {Vec2D} The combined force.
     */
    GetCombinedForce() {
        if (this.bFixed) {
            return new Vec2D();;
        }
        let v2DCombinedForce = new Vec2D();
        this.liForces.forEach(force => {
            v2DCombinedForce = Vec2D.Add(v2DCombinedForce, force);
        })
        return v2DCombinedForce;
    }
}

/*A class that holds information about an area*/
export class Area /*:ISimulatable*/ {
    static fWidthHeightDif = 1.4;
    constructor(areaType, fAreaSize, id = null) {
        this.fAreaSize = fAreaSize;
        this.areaType = areaType;

        //INTERFACE: ISimulatable
        /*Init the area with random room width and height, 1/4 is the max*/
        this.fWidth = Math.random() * (Math.sqrt(fAreaSize) * Area.fWidthHeightDif - Math.sqrt(fAreaSize) / Area.fWidthHeightDif) + Math.sqrt(fAreaSize) / Area.fWidthHeightDif;
        this.fDepth = fAreaSize / this.fWidth;
        if (id == null) {
            this.Id = ForceBasedAlgorithm.UID;
            ForceBasedAlgorithm.UID++;
        } else {
            this.Id = id;
        }
        this.fX = undefined;
        this.fY = undefined;
        this.nWidth = undefined;
        this.nDepth = undefined;
        this.nX = undefined;
        this.nY = undefined;

        this.liForces = [];
    }

    /**
     * Creates a copy of the instance.
     * @date 2022-01-16
     * @returns {Area} A copy of the instance.
     */
    Clone() {
        let area = new Area(this.areaType, this.fAreaSize, this.Id);
        area.fWidth = this.fWidth;
        area.fDepth = this.fDepth;
        area.Id = this.Id;
        area.fX = this.fX;
        area.fY = this.fY;
        area.nWidth = this.nWidth;
        area.nDepth = this.nDepth;
        area.nX = this.nX;
        area.nY = this.nY;
        area.liForces = this.liForces
        return area;
    }

    /**
     * Add a force to the object.
     * @date 2022-01-16
     * @param {Vec2D} vec2D
     * @returns {void}
     */
    AddForce(vec2D) {
        this.liForces.push(vec2D);
    }

    /**
     * Returns the combined force.
     * @date 2022-01-16
     * @returns {Vec2D} The combined force.
     */
    GetCombinedForce() {
        let v2DCombinedForce = new Vec2D();
        this.liForces.forEach(force => {
            v2DCombinedForce = Vec2D.Add(v2DCombinedForce, force);
        })
        return v2DCombinedForce;
    }
}

/*This class handels the force-based algorithm that creates the outline and defines
the different areas in the house*/
export class ForceBasedAlgorithm {
    static UID = 4;

    /**
     * The constructor of the algorithm.
     * @date 2022-01-16
     * @param {Function} printFunction
     * @param {Number} nGridSize=100
     * @param {Number} nEpochSize=20
     * @param {Number} nResultSize=3
     * @returns {any}
     */
    constructor(printFunction, nGridSize = 100, nEpochSize = 20, nResultSize = 3) {
        /*the resolution is the size of the 2D list that contains the ids*/
        this.nGridSize = nGridSize;
        this.fnPrint = printFunction;
        this.lili2DGrid = []
        this.nEpochSize = nEpochSize;
        this.nResultSize = nResultSize;
        /*init the 2DGrid*/
        for (let i = 0; i < this.nGridSize; i++) {
            this.lili2DGrid.push(Array(this.nGridSize).fill(0));
        }
    }

    /**
     * This fucntion loops through the rooms of this floor and calculates the size of the different areas
     * of the floor. ConnectionRoomSpace will be assigned to one of the other types (not staircase) based on
     * their size.
     * @date 2022-01-16
     * @param {List} liRooms
     * @returns {Object} A Object containing infromation about the areas
     */
    getAreas(liRooms) {
        /*The first step is to find the ares and their size*/
        let fPrivateRoomSpace = 0;
        let fSocialRoomSpace = 0;
        let fServiceRoomSpace = 0;
        let liStaircases = []
        let fStaircaseRoomSpace = 0;
        let fConnectionRoomSpace = 0;

        /*This code loops through the rooms of this floor and calculates the size of the different areas
        of the floor. ConnectionRoomSpace will be assigned to one of the other types (not staircase) based on
        their size*/
        liRooms.forEach(room => {
            if (Object.getPrototypeOf(room) instanceof ServiceRoom) {
                fServiceRoomSpace += room.fRoomSize;
            } else if (Object.getPrototypeOf(room) instanceof PrivateRoom) {
                fPrivateRoomSpace += room.fRoomSize;
            } else if (Object.getPrototypeOf(room) instanceof SocialRoom) {
                fSocialRoomSpace += room.fRoomSize;
            } else if (room instanceof Staircase) {
                liStaircases.push(room);
                fStaircaseRoomSpace += room.fRoomSize;
            } else if (Object.getPrototypeOf(room) instanceof ConnectionRoom) {
                fConnectionRoomSpace += room.fRoomSize;
            }

        })

        let oldFPRS = fPrivateRoomSpace;
        let oldFSeRS = fServiceRoomSpace;
        let oldFSRS = fSocialRoomSpace;
        let tmp = (oldFPRS + oldFSeRS + oldFSRS);

        fPrivateRoomSpace += fConnectionRoomSpace / 3 * (oldFPRS / tmp);
        fServiceRoomSpace += fConnectionRoomSpace / 3 * (oldFSeRS / tmp);
        fSocialRoomSpace += fConnectionRoomSpace / 3 * (oldFSRS / tmp);
        return { fPrivateRoomSpace: fPrivateRoomSpace, fServiceRoomSpace: fServiceRoomSpace, fSocialRoomSpace: fSocialRoomSpace, liStaircases: liStaircases, fStaircaseRoomSpace: fStaircaseRoomSpace };
    }

    /**
     * Finds the next bigger intager of an float.
     * @date 2022-01-16
     * @param {Number} value
     * @returns {Number} The next higher intager.
     */
    roundUp(value) {
        if (parseInt(value) == value) {
            return value;
        }
        return parseInt(value) + 1;
    }

    /**
     * Initialice areas (private, social and service)
     * @date 2022-01-16
     * @param {Object} objAreas
     * @returns {List} A list of areas.
     */
    initAreas(objAreas) {
        let liAreas = [];
        liAreas.push(new Area(AreaType.private, objAreas.fPrivateRoomSpace, 1));
        liAreas.push(new Area(AreaType.social, objAreas.fSocialRoomSpace, 2));
        liAreas.push(new Area(AreaType.service, objAreas.fServiceRoomSpace, 3));
        // console.log(liAreas);
        return liAreas;
    }

    /**
     * Check for all staircases if they are connected to a staircase that has more values then they have and if they match,
     * if there are differneces solve those.
     * @date 2022-01-16
     * @returns {void}
     */
    checkUpdateConnectedStaircases() {
        /* Check if this staircase allready has a connected staircase with a position*/
        this.liCPStaircases.forEach(cpStaircase => {
            var nId = cpStaircase.Staircase.nRoomID;
            this.liCPStaircases.forEach(cpStaircaseConnected => {
                if (cpStaircaseConnected.Staircase.nConnectedStaircase == nId) {
                    if (cpStaircaseConnected.nX != undefined) {
                        cpStaircase.nX = cpStaircaseConnected.nX;
                        cpStaircase.bFixed = true;
                    } if (cpStaircaseConnected.nY != undefined) {
                        cpStaircase.nY = cpStaircaseConnected.nY;
                        cpStaircase.bFixed = true;
                    } if (cpStaircaseConnected.nWidth != undefined) {
                        cpStaircase.nWidth = cpStaircaseConnected.nWidth;
                    } if (cpStaircaseConnected.nDepth != undefined) {
                        cpStaircase.nDepth = cpStaircaseConnected.nDepth;
                    } if (cpStaircaseConnected.fX != undefined) {
                        cpStaircase.fX = cpStaircaseConnected.fX;
                    } if (cpStaircaseConnected.fY != undefined) {
                        cpStaircase.fY = cpStaircaseConnected.fY;
                    } if (cpStaircaseConnected.fWidth != undefined) {
                        cpStaircase.fWidth = cpStaircaseConnected.fWidth;
                    } if (cpStaircaseConnected.fDepth != undefined) {
                        cpStaircase.fDepth = cpStaircaseConnected.fDepth;
                    }
                }
            });
        });
    }

    /**
     * Creates a list of rooms that are on a given floor.
     * @date 2022-01-16
     * @param {Number} nFloor
     * @returns {List}
     */
    getListOfRoomsOnFloor(nFloor) {
        let liRooms = [];
        this.userAPI.liHouses[0].liRooms.forEach(room => {
            if (room.sFloorLevel == nFloor) {
                liRooms.push(room);
            }
        });
        return liRooms;
    }

    /**
     * Gets the radius in which the rooms should be placed by searching for the room with the longest side and than
     * using this side calculate the radius in which Rooms must be placed to ensure they do not overlap at the start.
     * @date 2022-01-16
     * @returns {Number} The max. radius on which the rooms are placed.
     */
    getRadius() {
        let bReachedBottom = false;
        let bReachedTop = false;
        let fMaxSize = 0;
        let nMaxStaircases = 0;

        for (let f = 0; f < this.userAPI.liHouses[0].liRooms.length; f++) {
            /*foreach floor find the largest area*/
            for (let i = 0; i <= 1; i++) {
                let nFloor = f * Math.pow(-1, i);
                let liRooms = this.getListOfRoomsOnFloor(nFloor);
                let size = 0;
                let areas = this.getAreas(liRooms, nFloor);
                let nStaircases = 0;

                size = areas.fPrivateRoomSpace + areas.fServiceRoomSpace + areas.fSocialRoomSpace + areas.fStaircaseRoomSpace;
                let fMaxSize_ = Math.max(areas.fPrivateRoomSpace, areas.fServiceRoomSpace, areas.fSocialRoomSpace, areas.fStaircaseRoomSpace)
                if (fMaxSize < fMaxSize_) {
                    fMaxSize = fMaxSize_;
                }

                this.liCPStaircases.forEach(cpStaircase => {
                    let nFloor_ = cpStaircase.Staircase.sFloorLevel;
                    if (nFloor == nFloor_) {
                        nStaircases++;
                    }
                });

                if (nStaircases > nMaxStaircases) {
                    nMaxStaircases = nStaircases;
                }

                /*check if there are floors above and bellow the current floor. No floor can have size 0 or a NaN size
                therefor the checked floor must not exist*/
                if (nFloor >= 0) {
                    if (!size || size == 0) {
                        bReachedTop = true;
                    }
                } else {
                    if (!size || size == 0) {
                        bReachedBottom = true;
                    }
                }
            }
            if (bReachedBottom && bReachedTop) {
                break;
            }
        }

        // console.log(fMaxSize);
        let fLongestSide = Math.sqrt(fMaxSize) * (Area.fWidthHeightDif);
        // console.log(fLongestSide);

        /*calculate the circumfence by multiplying the longest possible side by the amout of areas and staircases*/
        let numAreasAndStaircases = this.liAreas.length + nMaxStaircases; //allways same amount of areas, even when size = 0
        /*1.5 x to get middle point of area/staircase*/
        let circ = (fLongestSide * 1.1) * numAreasAndStaircases;
        return { fPlacementRadius: circ / (Math.PI) * 1.5, fLongestSide: fLongestSide / 2 };
    }

    /**
     * Converts a value (LU) to Cell-Value
     * @date 2022-01-16
     * @param {Number} fValue
     * @returns {Number} Returns a value based on grid.
     */
    toGridSpace(fValue) {
        /*LU/1 / LU/Cell => Cell*/
        return Math.round(fValue / this.Resolution);
    }

    /**
     * Converts a value (Cell) to LU-value
     * @date 2022-01-16
     * @param {Number} fValue
     * @returns {Number} 
     */
    toRealSpace(fValue) {
        //Cell * LU/Cell => LE
        return fValue * this.Resolution
    }

    /**
     * Init. the resolution LU/Cell
     * @date 2022-01-16
     * @returns {void}
     */
    initResolution() {
        let result = this.getRadius();
        this.fPlacementRadius = result.fPlacementRadius;
        let fLongestSide = result.fLongestSide;
        let gridLength = this.fPlacementRadius * 2 + fLongestSide * 2;
        this.Resolution = gridLength / this.nGridSize
    }

    /**
     * *Calculate the size and if possible the position on the grid
     * @date 2022-01-16
     * @returns {void}
     */
    calculateGridValues() {
        this.liCPStaircases.forEach(cpStaircase => {
            if (cpStaircase.fX != undefined) {
                cpStaircase.nX = Math.round(this.toGridSpace(cpStaircase.fX));
            } if (cpStaircase.fY != undefined) {
                cpStaircase.nY = Math.round(this.toGridSpace(cpStaircase.fY));
            } if (cpStaircase.fWidth != undefined) {
                cpStaircase.nWidth = Math.round(this.toGridSpace(cpStaircase.fWidth));
            } if (cpStaircase.fDepth != undefined) {
                cpStaircase.nDepth = Math.round(this.toGridSpace(cpStaircase.fDepth));
            }
        });
        this.checkUpdateConnectedStaircases()

        this.liAreas.forEach(area => {
            area.nWidth = this.toGridSpace(area.fWidth);
            area.nDepth = this.toGridSpace(area.fDepth);
        });
    }

    /**
     * Places a Regctangle (Staircase or Area) on the grid
     * @date 2022-01-16
     * @param {Number} nX
     * @param {Number} nY
     * @param {Number} nWidth
     * @param {Number} nDepth
     * @param {Number} nValue
     * @returns {void}
     */
    placeOnGrid(nX, nY, nWidth, nDepth, nValue) {
        for (let x = nX - parseInt(nWidth / 2); x < nX + this.roundUp(nWidth / 2); x++) {
            for (let y = nY - parseInt(nDepth / 2); y < nY + this.roundUp(nDepth / 2); y++) {
                this.lili2DGrid[y][x] = nValue;
            }
        }
    }

    /**
     * Convert from degrees to radians.
     * @date 2022-01-16
     * @param {Number} alpha The angle in degrees.
     * @returns {Number} The angle in radians.
     */
    degreesToRadians(alpha) {
        return alpha * (Math.PI / 180);
    }

    /**
     * Rotate a 2D-Vector around the z axis.
     * @date 2022-01-16
     * @param {Vec2D} vec2D
     * @param {Number} alpha
     * @returns {Object} A object containing values for nX and nY
     */
    rotateVec2D(vec2D, alpha) {
        return {
            nX: Math.round(vec2D.nX * Math.cos(this.degreesToRadians(alpha)) - vec2D.nY * Math.sin(this.degreesToRadians(alpha))),
            nY: Math.round(vec2D.nX * Math.sin(this.degreesToRadians(alpha)) + vec2D.nY * Math.cos(this.degreesToRadians(alpha)))
        }
    }

    /**
     * Places the Staircases and Areas on the grid.
     * @date 2022-01-16
     * @returns {List} A list of points.
     */
    getPositionsForAreasAndStaircases() {
        let nStaircases = 0;
        this.liCPStaircases.forEach(cpStaircase => {
            let nFloor_ = cpStaircase.Staircase.sFloorLevel;
            //Check for fixed positions
            if (cpStaircase.nX == undefined && cpStaircase.nY == undefined) {
                if (this.nFloor == nFloor_) {
                    nStaircases++;
                }
            }
        });
        let alpha = 360 / (this.liAreas.length + nStaircases);
        // console.log(alpha)

        // Draw Radius on tables
        for (let r = 0; r < this.lili2DGrid.length; r++) {
            for (let c = 0; c < this.lili2DGrid[r].length; c++) {
                let xM = c - this.nGridSize / 2;
                let yM = r - this.nGridSize / 2;
                // Draw Radius on table
                if (Math.round(Math.sqrt(Math.pow(xM, 2) + Math.pow(yM, 2))) == this.toGridSpace(this.fPlacementRadius)) {
                    this.lili2DGrid[r][c] = 1;
                }
            }
        }

        //a fixed position first => Check for intersection)
        let liPositions = [];
        let nRadius = this.toGridSpace(this.fPlacementRadius);
        let vec2DPos = { nX: 0, nY: nRadius }

        /*get the positions on the circle by rotating the init vector*/
        for (let i = 0; i < this.liAreas.length + nStaircases; i++) {
            liPositions.push(vec2DPos);
            // console.log(vec2DPos);
            // this.lili2DGrid[this.nGridSize/2 - vec2DPos.nY][this.nGridSize/2 - vec2DPos.nX] = 1;
            vec2DPos = this.rotateVec2D(vec2DPos, alpha);
        }

        liPositions.forEach(pos => {
            pos.nX = this.nGridSize / 2 - pos.nX;
            pos.nY = this.nGridSize / 2 - pos.nY;
        })

        return liPositions;
    }

    /**
     * Place staircases that allready have a position.
     * @date 2022-01-16
     * @returns {void}
     */
    placeFixedStaircase() {
        this.liCPStaircases.forEach(cpStaircase => {
            let nFloor_ = cpStaircase.Staircase.sFloorLevel;
            //Check for fixed positions
            if (cpStaircase.nX != undefined && cpStaircase.nY != undefined) {
                if (cpStaircase.nWidth == undefined && cpStaircase.nDepth == undefined) {
                    throw new Error("Unable to find width or height of Staircase!");
                }
                this.placeOnGrid(cpStaircase.nX, cpStaircase.nY, cpStaircase.nWidth, cpStaircase.nDepth, cpStaircase.Id);
            }
        });
    }

    /**
     * CurrentSize should be invoked with the array size (permutation)
     * @date 2022-01-16
     * @param {Array} arr The arr to permuatate
     * @param {Number} nCurrentSize //The current size.
     * @param {any} arrResult //A array containing results.
     * @returns {any} A array containing permutations.
     */
    permutation(arr, nCurrentSize, arrResult) {
        if (nCurrentSize == 1) { // recursion base-case (end)
            arrResult.push(arr.slice());
            return;
        }

        for (let i = 0; i < nCurrentSize; i++) {
            this.permutation(arr, nCurrentSize - 1, arrResult);
            if (nCurrentSize % 2 == 1) {
                let temp = arr[0];
                arr[0] = arr[nCurrentSize - 1];
                arr[nCurrentSize - 1] = temp;
            } else {
                let temp = arr[i];
                arr[i] = arr[nCurrentSize - 1];
                arr[nCurrentSize - 1] = temp;
            }
        }
        return arrResult;
    }

    /**
     * Get all possible positions on circle
     * @date 2022-01-16
     * @param {Array} array
     * @returns {Array} Returns a array containing all possible combinations on the circle-
     */
    getAllPossibleCombinations(array) {
        // some global variable to store the results
        let result = [];
        this.permutation(array, array.length, result)
        return result;
    }

    /**
     * Resets the Grid
     * @date 2022-01-16
     * @returns {void}
     */
    resetGrid() {
        this.lili2DGrid = [];
        for (let i = 0; i < this.nGridSize; i++) {
            this.lili2DGrid.push(Array(this.nGridSize).fill(0));
        }
    }

    /**
     * Place a ISimulatable on the grid.
     * @date 2022-01-16
     * @param {List} liPositions
     * @returns {void}
     */
    placeISimulatable(liPositions) {
        let i = 0;
        this.cpliIsimulatable.forEach(iSimulatable => {
            //assign position
            if (iSimulatable.nX == undefined && iSimulatable.nY == undefined) {
                iSimulatable.nX = liPositions[i].nX;
                iSimulatable.nY = liPositions[i].nY;
                i++;

                this.placeOnGrid(iSimulatable.nX, iSimulatable.nY, iSimulatable.nWidth, iSimulatable.nDepth, iSimulatable.Id);
            } else {
                throw Error("Unexpected X Or Y value!");
            }
        });
    }

    /**
     * Deep-Clones a list, the object must have a function Clone that returns the cloned object.
     * @date 2022-01-16
     * @param {List} liList
     * @returns {List} A deep-Copy of the list.
     */
    listDeepClone(liList) {
        let newList = [];
        liList.forEach(element => {
            newList.push(element.Clone());
        });
        return newList;
    }

    /**
     * Returns a list of Isimulatable objects.
     * @date 2022-01-16
     * @returns {List} get list of ISimu
     */
    getListIsimulatable() {
        let liIsumulatable = [];
        this.liCPStaircases.forEach(cpStaircase => {
            let nFloor_ = cpStaircase.Staircase.sFloorLevel;
            if (nFloor_ == this.nFloor && !cpStaircase.bFixed) {
                liIsumulatable.push(cpStaircase);
            }
        })

        this.liAreas.forEach(area => {
            liIsumulatable.push(area);
        })

        return liIsumulatable;
    }

    /**
     * Adds a force that points to the center of the simulation space.
     * @date 2022-01-16
     * @returns {void}
     */
    addForceToCenter() {
        let v2DM = new Vec2D(this.nGridSize / 2, this.nGridSize / 2);
        this.cpliIsimulatable.forEach(iSimulatable => {
            iSimulatable.AddForce(Vec2D.MultiplyWithScalar(Vec2D.Minus(v2DM, new Vec2D(iSimulatable.nX, iSimulatable.nY)), 1));
        })
    }

    /**
     * Adds Forces between each ISimulatable-object
     * @date 2022-01-16
     * @returns {void}
     */
    addForcesToISimCenter() {
        this.cpliIsimulatable.forEach(iSimulatable => {
            this.cpliIsimulatable.forEach(iSimulatable_ => {
                if (iSimulatable.Id != iSimulatable_.Id) {
                    let v2DO1 = new Vec2D(iSimulatable.nX, iSimulatable.nY);
                    let v2DO2 = new Vec2D(iSimulatable_.nX, iSimulatable_.nY);
                    iSimulatable.AddForce(Vec2D.MultiplyWithScalar(Vec2D.Minus(v2DO2, v2DO1), 1));
                }
            });
        })
    }

    /**
     * Gets the neighbours of the following rectangle.
     * @date 2022-01-16
     * @param {Number} nX
     * @param {Number} nY
     * @param {Number} nWidth
     * @param {Number} nDepth
     * @param {Number} nValue
     * @param {Number} nXOffset Defines the direction in x.
     * @param {Number} nYOffset Defines the direction in y.
     * @returns {List}
     */
    getNeighbors(nX, nY, nWidth, nDepth, nValue, nXOffset, nYOffset) {
        let nX_ = nX + nXOffset;
        let nY_ = nY + nYOffset;
        let liNeighbors = [];
        let liNeighborsIDs = [];
        //foreach cell check if this cell is part of a object and if so check if it is a neighbour
        for (let x = nX_ - parseInt(nWidth / 2) + 1; x < nX_ + this.roundUp(nWidth / 2) - 1; x++) {
            if (x > nX - parseInt(nWidth / 2) && x < nX + this.roundUp(nWidth / 2)) {
                continue;
            }
            for (let y = nY_ - parseInt(nDepth / 2) + 1; y < nY_ + this.roundUp(nDepth / 2) - 1; y++) {
                if (y > nY - parseInt(nDepth / 2) && y < nY + this.roundUp(nDepth / 2)) {
                    continue;
                }

                if (this.lili2DGrid[y][x] != 0 && this.lili2DGrid[y][x] != nValue) {
                    if (!liNeighborsIDs.includes(this.lili2DGrid[y][x])) {
                        liNeighborsIDs.push(this.lili2DGrid[y][x]);
                        this.cpliIsimulatable.forEach(iSimulatable => {
                            if (iSimulatable.Id == this.lili2DGrid[y][x]) {
                                liNeighbors.push(iSimulatable);
                            }
                        })
                    }
                }
            }
        }
        return liNeighbors;
    }

    /**
     * Calcualtes which forces are transfered between ISumulatables.
     * @date 2022-01-16
     * @returns {void}
     */
    transferForces() {
        let cpCpliIsimulatable = this.listDeepClone(this.cpliIsimulatable);
        let i = -1;
        cpCpliIsimulatable.forEach(iSimulatable => {
            i++;
            let v2DCForce = iSimulatable.GetCombinedForce();
            //Transver forces, ignoring friction.
            let transferForces = (nXOffset, nYOffset) => {
                if (!(nXOffset == 0 && nYOffset == 0)) {
                    let liNeighbors = this.getNeighbors(iSimulatable.nX, iSimulatable.nY, iSimulatable.nWidth, iSimulatable.nDepth, iSimulatable.Id, nXOffset, nYOffset);
                    let addForceToNeighbor = (force) => {
                        liNeighbors.forEach(iSimNeighbor => {
                            this.cpliIsimulatable[i].AddForce(force);
                        });
                    }

                    if (nXOffset != 0 && nYOffset == 0) {
                        addForceToNeighbor(new Vec2D(v2DCForce.X, 0))
                    } else if (nYOffset != 0 && nXOffset == 0) {
                        addForceToNeighbor(new Vec2D(0, v2DCForce.Y))
                    } else {
                        throw new Error("Can only check for neighbors in one direction.");
                    }
                }
            }
            transferForces(this.checkSign(v2DCForce.Y), 0);
            transferForces(0, this.checkSign(v2DCForce.X));
        });
    }

    /**
     * Get cells that are not supported.
     * @date 2022-01-16
     * @param {Array} arr2DGrid
     * @param {Array} arr2DSupportFloorGrid
     * @param {Number} nId
     * @returns {Number} The number of cells not supported by the lower floor.
     */
    getUnsupportedCells(arr2DGrid, arr2DSupportFloorGrid, nId) {
        if (arr2DSupportFloorGrid == null) {
            return 0;
        }
        let unsupportedCells = 0;
        for (let nY = 0; nY < this.nGridSize; nY++) {
            for (let nX = 0; nX < this.nGridSize; nX++) {
                if (arr2DSupportFloorGrid[nY][nX] == 0 && arr2DGrid[nY][nX] == nId) {
                    unsupportedCells++;
                }
            }
        }
        return unsupportedCells;
    }

    checkSupportedCellsOffset(grid, supportFloorGrid, nXOffset, nYOffset) {

    }

    /**
     * Add forces to force ares to a direction with more support.
     * @date 2022-01-16
     * @returns {void}
     */
    updateForcesOnSupportedCells() {
        let cpCpliIsimulatable = this.listDeepClone(this.cpliIsimulatable);
        let i = 0;
        //Foreach iSumalateable try to move in each direction and see how the unsupported cells develops.
        cpCpliIsimulatable.forEach(iSimulatable => {
            i++;
            let nBestUnsupportedCells = this.getUnsupportedCells(this.lili2DGrid, this.supportFloorGrid, iSimulatable.nId);
            let cpiSimulatable = iSimulatable.Clone();

            for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
                for (let colOffset = -1; colOffset < 2; colOffset++) {
                    //TODO
                }
            }
        });
    }

    /**
     * Updates the forces on the objects
     * @date 2022-01-16
     * @returns {void}
     */
    updateForces() {
        /*Reset forces*/
        this.cpliIsimulatable.forEach(iSimulatable => {
            iSimulatable.liForces = [];
        })

        /*Recalculate the Forces*/
        this.addForceToCenter();
        this.addForcesToISimCenter();
        this.transferForces();
    }

    /**
     * Gets the nex Isimulatable object.
     * @date 2022-01-16
     * @param {any} liIgnore
     * @returns {Object} ISumulatable
     */
    getNextISimulatable(liIgnore) {
        while (true) {
            let randN = parseInt(Math.random() * this.cpliIsimulatable.length);
            if (!liIgnore.includes(randN)) {
                return this.cpliIsimulatable[randN];
            }
        }

        return IsimLargestForce;
    }

    /**
     * Checks if an rectangular space is still available, returns true if intersection is detected.
     * @date 2022-01-16
     * @param {any} nX
     * @param {any} nY
     * @param {any} nWidth
     * @param {any} nDepth
     * @param {any} nValue
     * @returns {any}
     */
    checkIntersection(nX, nY, nWidth, nDepth, nValue) {
        for (let x = nX - parseInt(nWidth / 2); x < nX + this.roundUp(nWidth / 2); x++) {
            for (let y = nY - parseInt(nDepth / 2); y < nY + this.roundUp(nDepth / 2); y++) {
                if (this.lili2DGrid[y][x] != 0 && this.lili2DGrid[y][x] != nValue) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Checks which sign the number has, (-1,1,0)
     * @date 2022-01-16
     * @param {Number} num
     * @returns {Number} -1;0;1 The sign of the number.
     */
    checkSign(num) {
        if (num > 0) {
            return 1;
        } else if (num < 0) {
            return -1;
        } else {
            return 0;
        }
    }

    /**
     * Starts the simulation
     * @date 2022-01-16
     * @param {Number} i=250 Simulationsteps
     * @returns {void}
     */
    simulate(i = 250) {
        let liIgnore = [];
        for (i; i > 0; i--) {
            /*Update forces*/
            this.updateForces();
            let iSimulatable = this.getNextISimulatable(liIgnore);
            if (iSimulatable == null) {
                return;
            }

            let oldX = iSimulatable.nX;
            let oldY = iSimulatable.nY;

            let v2DForce = iSimulatable.GetCombinedForce();
            // console.log(v2DForce.Magnitude());

            /*tries to move the area/stairgase in X direction*/
            let movX = () => {
                let sign = this.checkSign(v2DForce.X);
                if (sign != 0 && !this.checkIntersection(iSimulatable.nX + sign, iSimulatable.nY, iSimulatable.nWidth, iSimulatable.nDepth, iSimulatable.Id)) {
                    iSimulatable.nX += sign;
                    return true;
                } else {
                    return false;
                }
            }

            /*tries to move the area/stairgase in Y direction*/
            let movY = () => {
                let sign = this.checkSign(v2DForce.Y);
                if (sign != 0 && !this.checkIntersection(iSimulatable.nX, iSimulatable.nY + sign, iSimulatable.nWidth, iSimulatable.nDepth, iSimulatable.Id)) {
                    iSimulatable.nY += sign;
                    return true;
                } else {
                    return false;
                }
            }

            /*move the isimulatable object if nothing is in the way*/
            if (Math.abs(v2DForce.X) > Math.abs(v2DForce.Y)) {
                if (!movX() && !movY()) {
                    liIgnore.push(iSimulatable.Id);
                    continue;
                } else {
                    liIgnore = [];
                }
            } else {
                if (!movY() && !movX()) {
                    liIgnore.push(iSimulatable.Id);
                    continue;
                } else {
                    liIgnore = [];
                }
            }

            /*Delete the old figure from the grid and place the new one*/
            this.placeOnGrid(oldX, oldY, iSimulatable.nWidth, iSimulatable.nDepth, 0);
            this.placeOnGrid(iSimulatable.nX, iSimulatable.nY, iSimulatable.nWidth, iSimulatable.nDepth, iSimulatable.Id);
        }
    }

    /**
     * Creates a result-copy of the gird.
     * @date 2022-01-16
     * @returns {List} A copy for result of the 2DGrid
     */
    getGridSolution() {
        let cplili2DGrid = []
        for (let r = 0; r < this.lili2DGrid.length; r++) {
            cplili2DGrid.push(this.lili2DGrid[r].slice());
        }
        return cplili2DGrid;
    }

    /**
     * Check if a given grid cell is a corner of an ISumulatable
     * @date 2022-01-16
     * @param {List} lili2DGrid
     * @param {Number} nX
     * @param {Number} nY
     * @returns {Boolean} True if it is a corner otherwise false.
     */
    checkIfCorner(lili2DGrid, nX, nY) {
        let nCells = 0;
        if (lili2DGrid[nY][nX] != 0) {
            /* a cell is a corner if it hase 3 (outer corner) or 7 (inner corner) neighbours*/
            for (let xOffset = -1; xOffset <= 1; xOffset++) {
                for (let yOffset = -1; yOffset <= 1; yOffset++) {
                    if (xOffset == 0 && yOffset == 0) {
                        continue
                    }
                    if (lili2DGrid[Math.min(Math.max(nY + yOffset, 0), this.nGridSize - 1)][Math.min(Math.max(nX + xOffset, 0), this.nGridSize - 1)] != 0) {
                        nCells++;
                    }
                }
            }

            if (nCells == 3 || nCells == 7) {
                return true;
            }
        }

        return false;
    }

    /**
     * Count the number of corners on the grid.
     * @date 2022-01-16
     * @param {List} lili2DGrid
     * @returns {Number} The amount of corners
     */
    countCorners(lili2DGrid) {
        let corners = 0;
        for (let nY = 0; nY < this.nGridSize; nY++) {
            for (let nX = 0; nX < this.nGridSize; nX++) {
                if (this.lili2DGrid[nY][nX] != 0) {
                    if (this.checkIfCorner(lili2DGrid, nX, nY)) {
                        corners++;
                    }
                }
            }
        }
        return corners;
    }

    /**
     * Evaluate the different sides by their differenc ot the mean Length.
     * @date 2022-01-16
     * @param {List} lili2DGrid
     * @returns {Number} The evaluation.
     */
    evaluateSideLength(lili2DGrid) {
        let liSides = []
        let liVerticalSides = [];
        //loop through the grid and calculate the length of the different sizes
        for (let r = 0; r < this.nGridSize; r++) {
            let sideLength = 0;
            liVerticalSides.push(0);
            for (let c = 0; c < this.nGridSize; c++) {
                //if the grid-cell is empty.
                if (lili2DGrid[r][c] == 0) {
                    if (r < this.nGridSize - 1) {
                        //if the next or previous cell is not empty add to side length
                        if (lili2DGrid[r + 1][c] != 0) {
                            sideLength++;
                        }
                    }
                    if (r > 0) {
                        //if the next or previous cell is not empty add to side length
                        if (lili2DGrid[r - 1][c] != 0) {
                            sideLength++;
                        }
                    }

                    if (r < this.nGridSize - 1) {
                        if (lili2DGrid[r][c + 1] != 0) {
                            liVerticalSides[r]++;
                        }
                    }
                    if (r > 0) {
                        if (lili2DGrid[r][c - 1] != 0) {
                            liVerticalSides[r]++;
                        }
                    }
                }
            }
            if (sideLength != 0) {
                liSides.push(sideLength);
            }
        }
        liVerticalSides.forEach(e => {
            if (e != 0) {
                liSides.push(e);
            }
        })

        //calculate the standard deviation
        let mean = 0;
        liSides.forEach(side => {
            mean += side;
        });
        mean /= liSides.length;

        let std = 0;
        liSides.forEach(side => {
            std += Math.pow(side - mean, 2);
        });
        std = Math.sqrt(std);

        //normalize the standard deviation
        return std / this.nGridSize;
    }

    /**
     * Checks if ther exists a connection between public and private rooms,
     * @date 2022-01-16
     * @param {List} lili2DGrid
     * @returns {Number} The normalized evaluation
     */
    checkPrivatePublicConnection(lili2DGrid) {
        let connectingSurface = 0;
        for (let nY = 0; nY < this.nGridSize; nY++) {
            for (let nX = 0; nX < this.nGridSize; nX++) {
                if (lili2DGrid[nY][nX] == AreaType.social) {
                    if ((nY > 0 && lili2DGrid[nY - 1][nX] == AreaType.private) ||
                        (nY + 1 < this.nGridSize && lili2DGrid[nY + 1][nX] == AreaType.private) ||
                        (nX + 1 < this.nGridSize && lili2DGrid[nY][nX + 1] == AreaType.private) ||
                        (nX + 1 > 0 && lili2DGrid[nY][nX - 1] == AreaType.privat)) {
                        connectingSurface++;
                    }
                }
            }
        }
        return 1 - connectingSurface / Math.pow(this.nGridSize, 2);
    }

    /**
     * Evalueates the solutions
     * @date 2022-01-16
     * @param {List} lili2DGrid
     * @param {List} lili2DSupportFloorGrid
     * @returns {Number} The evaluation of the solution
     */
    evaluate(lili2DGrid, lili2DSupportFloorGrid) {
        let ev = 0;
        //evaluate based on forces.
        this.cpliIsimulatable.forEach(iSimulatable => {
            ev += iSimulatable.GetCombinedForce().Magnitude();
        });

        let nCorners = this.countCorners(lili2DGrid);

        //Evaluates based on the size differance
        let sizeDif = 1;
        this.cpliIsimulatable.forEach(iSimulatable => {
            sizeDif += iSimulatable.nWidth / iSimulatable.nDepth;
        });
        sizeDif /= this.cpliIsimulatable.length;

        //evaluate based on how rectangular the solution is
        let minX = this.nGridSize;
        let maxX = 0;
        let minY = this.nGridSize;
        let maxY = 0;

        this.cpliIsimulatable.forEach(iSimulatable => {
            minX = Math.min(minX, iSimulatable.nX - iSimulatable.nWidth / 2);
            maxX = Math.max(maxX, iSimulatable.nX + iSimulatable.nWidth / 2);
            minY = Math.min(minY, iSimulatable.nY - iSimulatable.nDepth / 2);
            maxY = Math.max(maxY, iSimulatable.nY + iSimulatable.nDepth / 2);
        });

        let evSize = Math.min((maxX - minX) / (maxY - minY) + 1, (maxY - minY) / (maxX - minX) + 1);

        let houseDifSize = this.evaluateSideLength(lili2DGrid);
        let connectingSurface = this.checkPrivatePublicConnection(lili2DGrid)
        let unsupportedCells = this.getUnsupportedCells(lili2DSupportFloorGrid) / Math.pow(this.nGridSize, 2);

        //Calc the mese error.
        return Math.pow(10 * ev / (this.nGridSize * this.cpliIsimulatable.length), 2) + Math.pow(300 * nCorners / (4 * this.cpliIsimulatable.length), 2)
            + Math.pow(10 * sizeDif, 2) + Math.pow(15 * evSize, 2) + Math.pow(28 * houseDifSize, 2) + Math.pow(1800 * connectingSurface, 2) + Math.pow(100000 * unsupportedCells, 2);
    }

    /**
     * Get cells that are not supported.
     * @date 2022-01-16
     * @param {List} lili2DSupportFloorGrid
     * @returns {Number} The amount of unsupported cells.
     */
    getUnsupportedCells(lili2DSupportFloorGrid) {
        if (lili2DSupportFloorGrid == null) {
            return 0;
        }
        let unsupportedCells = 0;
        for (let nY = 0; nY < this.nGridSize; nY++) {
            for (let nX = 0; nX < this.nGridSize; nX++) {
                if (lili2DSupportFloorGrid[nY][nX] == 0 && this.lili2DGrid[nY][nX] != 0) {
                    unsupportedCells++;
                }
            }
        }
        return unsupportedCells;
    }

    /**
     * Copies a given 2D array
     * @date 2022-02-01
     * @param {Array} liliGrid A 2D array that you want to copy.
     * @returns {Array} A copy of the given array.
     */
     copyLiLiGrid(liliGrid){
        let liliGridCopy = [];
        for(let r = 0; r<liliGrid.length; r++){
            liliGridCopy.push([]);
            for(let c = 0; c<liliGrid.length; c++){
                liliGridCopy[r].push(liliGrid[r][c]);
            }
        }
        return liliGridCopy;
    }

    /**
     * Creates a new 2D array with the given shape.
     * @date 2022-02-01
     * @param {Number} nRowSize The number of rows
     * @param {any} nColSize the number of columns
     * @returns {Array} The newly created 2D array.
     */
     create2DArray(nRowSize, nColSize){
        let liliGrid = [];
        for(let r = 0; r<nRowSize; r++){
            liliGrid.push([]);
            for(let c = 0; c<nColSize; c++){
                liliGrid[r].push(0);
            }
        }
        return liliGrid;
    }

    /**
     * Finds the first value and returns the indexes
     * @date 2022-02-01
     * @param {Function} funcRow A function describing the searchpattern for the row
     * @param {Function} funcCol A function describing the searchbattern for the col
     * @param {Function} funcValue A function describing the return condition
     * @returns {{row: ,col:}} The index for col and row where the value occurs for the first time
     */
    findFirst(liliGrid, funcRow, funcCol, funcValue){
        let nCalls = 0;
        let row, col;
        while(true){
            row = funcRow(nCalls);
            col = funcCol(nCalls);

            if(funcValue(liliGrid[row][col])){
                return {row: row, col: col};
            }
            nCalls++;
        }
    }

    /**
     * Removes unnecessary empty space.
     * @date 2022-02-01
     * @param {Array} liliGrid
     * @returns {Array}
     */
    cutGrid(liliGrid){
        let liliGridCut = this.copyLiLiGrid(liliGrid);
        let borderLeft, borderTop, borderRight, borderBottom;

        //Search left
        borderLeft = this.findFirst(liliGridCut, (nCalls)=>{
            return nCalls-parseInt((nCalls)/liliGridCut.length)*liliGridCut.length;
        }, (nCalls)=>{
            return parseInt((nCalls)/liliGridCut.length);
        }, (value)=>{ if(value != 0){return true;}return false;});


        //Search top
        borderTop = this.findFirst(liliGridCut, (nCalls)=>{
            return parseInt((nCalls)/liliGridCut.length);
        }, (nCalls)=>{
            return nCalls-parseInt((nCalls)/liliGridCut.length)*liliGridCut.length;
        }, (value)=>{ if(value != 0){return true;}return false;});


        //Search right
        borderRight = this.findFirst(liliGridCut, (nCalls)=>{
            return nCalls - parseInt((nCalls)/liliGridCut.length)*liliGridCut.length;
        }, (nCalls)=>{
            return liliGridCut.length - parseInt((nCalls)/liliGridCut.length)-1;
        }, (value)=>{ if(value != 0){return true;}return false;});


        //Search bottom
        borderBottom = this.findFirst(liliGridCut, (nCalls)=>{
            return liliGridCut.length - parseInt((nCalls)/liliGridCut.length)-1;
        }, (nCalls)=>{
            return nCalls - parseInt((nCalls)/liliGridCut.length)*liliGridCut.length;
        }, (value)=>{ if(value != 0){return true;}return false;});
       
        liliGridCut=[];
        let r_ = 0;
        for(let r = borderTop.row-1; r <= borderBottom.row+1;r++ ){
            liliGridCut.push([]);
            for(let c = borderLeft.col-1; c<=borderRight.col+1;c++){
                liliGridCut[r_].push(liliGrid[r][c]);
            }
            r_++;
        }
        return liliGridCut;
    }

    /**
     * Enlarges a given grid by a given factor
     * @date 2022-02-01
     * @param {Array} liliGrid The base array which should be enlarged.
     * @param {Number} factor The number (multiple of 2) which the grid should be enlarged.
     * @returns {Array} The new and enlarged array.
     */
    zoomGrid(liliGrid, factor){
        if(factor % 2 != 0){
            throw new Error("Unable to zoom the array. (The factor was not devidable by 2)");
        }
        let liliGridZoomed = this.create2DArray(liliGrid.length*factor, liliGrid[0].length*factor);
        for(let r = 0; r < liliGridZoomed.length; r++){
            for(let c = 0; c < liliGridZoomed[r].length; c++){
                liliGridZoomed[r][c] = liliGrid[parseInt(r/factor)][parseInt(c/factor)];
            }
        }
        return liliGridZoomed;
    }

    /**
     * Try to improve the solution using afterprocessing effects
     * @date 2022-01-16
     * @param {List} lili2DSupportFloorGrid
     * @returns {void}
     */
    afterProcessing(lili2DSupportFloorGrid = null) {
        if (lili2DSupportFloorGrid != null) {
            for (let nY = 0; nY < this.nGridSize; nY++) {
                for (let nX = 0; nX < this.nGridSize; nX++) {
                    if (lili2DSupportFloorGrid[nY][nX] == 0 && this.lili2DGrid[nY][nX] != 0) {
                        this.lili2DGrid[nY][nX] = 0;
                    } else if (this.lili2DGrid[nY][nX] == 0 && lili2DSupportFloorGrid[nY][nX] != 0) {
                        this.lili2DGrid[nY][nX] = 6;
                    }
                }
            }

            /*Get cells that are not supported*/
            let unsupportedCells = this.getUnsupportedCells(lili2DSupportFloorGrid);
            // console.log(unsupportedCells);
        }
        let grid = this.cutGrid(this.lili2DGrid);
        grid = this.zoomGrid(grid, 4)
        return grid;
    }

    /**
     * Executes the algorithm and returns a 2D array containing information about areas
     * and the outline shape of the house.
     * @date 2022-01-16
     * @param {Object} userAPI
     * @param {Number} nFloor
     * @param {List} liCPStaircases
     * @param {Number} fResolution=null
     * @param {List} lili2DSupportFloorGrid=null
     * @returns {List} A list of results.
     */
    execute(userAPI, nFloor, liCPStaircases, fResolution = null, lili2DSupportFloorGrid = null) {
        this.userAPI = userAPI;
        this.nFloor = nFloor;
        this.liCPStaircases = liCPStaircases;
        this.supportFloorGrid = lili2DSupportFloorGrid;
        this.liResults = [];

        this.liRooms = this.getListOfRoomsOnFloor(nFloor)
        let areas = this.getAreas(this.liRooms, nFloor);

        //execute the algorithm multiple times to get better solutions.
        for (let nExSteps = 0; nExSteps < this.nEpochSize-1; nExSteps++) {
            this.liAreas = this.initAreas(areas);
            if (fResolution) {
                this.Resolution = fResolution;
            } else {
                this.initResolution();
            }
            this.calculateGridValues();

            this.liPositions = this.getPositionsForAreasAndStaircases();
            this.liPermPositions = this.getAllPossibleCombinations(this.liPositions)

            this.liIsimulatable = this.getListIsimulatable();

            //Foreach possible combination/positioning
            this.liPermPositions.forEach((liPositions) => {
                this.resetGrid();
                this.placeFixedStaircase();
                this.cpliIsimulatable = this.listDeepClone(this.liIsimulatable);
                this.placeISimulatable(liPositions);
                this.simulate();
                let grid = this.afterProcessing(lili2DSupportFloorGrid);
                let grid_ev = this.getGridSolution();
                this.liResults.push({
                    grid: grid, liIsimulatable: this.cpliIsimulatable, evaluation: this.evaluate(grid_ev, lili2DSupportFloorGrid)
                });
            })
        }

        // this.liResults = this.liResults.sort((a, b) => { return a.evaluation - b.evaluation });

        // this.liResults.slice(0, 1).forEach((e) => {
        //     this.fnPrint(ForceBasedAlgorithm.toHTML(e.grid));
        // })

        return [this.liResults.sort((a, b) => { return a.evaluation - b.evaluation; }).slice(0, this.nResultSize), this.Resolution];
    }

    /**
     * Creates a HTML-string containing the information of the grid as table.
     * @date 2022-01-16
     * @param {List} lili2DGrid
     * @returns {String} A HTML Code ready to display.
     */
    static toHTML(lili2DGrid) {
        Helper.girdToHTML(lili2DGrid, false);
    }
}