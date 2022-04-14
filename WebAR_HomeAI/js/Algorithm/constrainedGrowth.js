import { AreaType} from "./forceBasedAlgorithm.js";
import { Plot, House, Staircase, SocialRoom, LivingRoom, StaircaseType, StaircaseMaterial, ConnectionRoom, ServiceRoom, Kitchen, Hallway, ToiletRoom, Bedroom, Bathroom, OfficeRoom, RoomRelationship, RoomRelationshipType, RoofType, PrivateRoom, Design, InsulationType, HeatingSource, FloorMaterial, WindowMaterial, HeatingType, DoorType } from '../Parameter_Classes.js';
import {Helper} from "./helper.js";

class WeightedRandom{
    /**
     * Get a random element of the base array, based on weighted random.
     * @date 2022-02-14
     * @param {List} liBase The base array which contains the possible values.
     * @param {List} liWeights The list of weights for the single elements. 
     * @returns {any} //The element on the a random weighted possition.
     */
    static getRandom(liBase, liWeights){
        let fWeightSum = 0;
        for(let i =0; i<liWeights.length; i++){
            fWeightSum+=liWeights[i]
        }

        let rand = Math.random()*fWeightSum;
        for(let i =0; i<liWeights.length; i++){
            rand -= liWeights[i];
            if(rand <  0){
                return liBase[i];
            }
        }
    }
}

class Room{
    constructor(id, fSize){
        this.nId = id;
        //left top coordinates
        this.nX = null;
        this.nY = null;
        //right bottom coordinates
        this.nX_ = null;
        this.nY_ = null;
        this.eAreaType = null;
        this.fSize = fSize;
        this.nXLCorner = null;
        this.nYLCorner = null;
        this.nXLCorner_ = null;
        this.nYLCorner_ = null;
        this.nnLCornerOffset =null;
        this.nnLCornerExpansionOffset = null;
    }

    /**
     * Clones the object
     * @date 2022-02-25
     * @returns {Room} Reutnrs a copied object.
     */
    Clone(){
        let r = new Room(this.nId, this.fSize);
        r.nX = this.nX;
        r.nY = this.nY;
        r.nX_ = this.nX_;
        r.nY_ = this.nY_;
        r.eAreaType = this.eAreaType;
        r.nXLCorner = this.nXLCorner;
        r.nYLCorner = this.nYLCorner;
        r.nXLCorner_ = this.nXLCorner_;
        r.nYLCorner_ = this.nYLCorner_;
        r.nnLCornerOffset = this.nnLCornerOffset;
        r.nnLCornerExpansionOffset = this.nnLCornerExpansionOffset;
        return r;
    }

    /**
     * Draw the room on a given grid;
     * @date 2022-02-13
     * @param {List} liliGrid A ref. to the grid.
     * @returns {void} .
     */
    drawOnGrid(liliGrid){
        if(this.nX != null &&
            this.nY != null &&
            this.nX_ != null &&
            this.nY_ != null){
            for(let x = this.nX; x <= this.nX_; x++){
                for(let y = this.nY; y <= this.nY_; y++){
                    liliGrid[y][x] = this.nId;
                }
            }
        }

        if(this.nXLCorner != null &&
            this.nYLCorner != null &&
            this.nXLCorner_ != null &&
            this.nYLCorner_ != null){
            for(let x = Math.min(this.nXLCorner,this.nXLCorner_); x <= Math.max(this.nXLCorner,this.nXLCorner_); x++){
                for(let y = Math.min(this.nYLCorner,this.nYLCorner_); y <= Math.max(this.nYLCorner,this.nYLCorner_); y++){
                    liliGrid[y][x] = this.nId;
                }
            }
        }
    }

    /**
     * Returns the size of the room drawn on the grid.
     * @date 2022-02-14
     * @param {List} liliGrid The 2d grid where the room is drawn.
     * @returns {Number} The size on the grid (0-1);
     */
    getSizeOnGrid(liliGrid){
        let size = 0;
        for(let r = 0; r<liliGrid.length; r++){
            for(let c = 0; c < liliGrid[r].length; c++){
                if(liliGrid[r][c] == this.nId){
                    size ++;
                }
            }
        }
        return size/(liliGrid.length*liliGrid[0].length)
    }

    /**
     * Expand a given room on the given 2dGrid
     * @date 2022-02-14
     * @param {List} lili2DGrid The base 2d grid.
     * @returns {Boolean} Returns if a expansion was possible
     */
    expandRectangle(liliGrid){
        let liOffsets = []
        let liOffsetsSecondBest = []
        if(Math.abs(this.nX-this.nX_)<Math.abs(this.nY-this.nY_)){
            liOffsets.push({nX:-1, nY:0})
            liOffsets.push({nX:1, nY:0})
            liOffsets = Helper.shuffle(liOffsets);
            liOffsetsSecondBest.push({nX:0, nY:-1})
            liOffsetsSecondBest.push({nX:0, nY:1})
            liOffsetsSecondBest = Helper.shuffle(liOffsetsSecondBest);
            liOffsets.push(liOffsetsSecondBest[0]);
            liOffsets.push(liOffsetsSecondBest[1]);
        }else if(Math.abs(this.nX-this.nX_)>Math.abs(this.nY-this.nY_)){
            liOffsets.push({nX:0, nY:-1})
            liOffsets.push({nX:0, nY:1})
            liOffsets = Helper.shuffle(liOffsets);
            liOffsetsSecondBest.push({nX:-1, nY:0})
            liOffsetsSecondBest.push({nX:1, nY:0})
            liOffsetsSecondBest = Helper.shuffle(liOffsetsSecondBest);
            liOffsets.push(liOffsetsSecondBest[0]);
            liOffsets.push(liOffsetsSecondBest[1]);
        }else{
            liOffsets.push({nX:0, nY:-1})
            liOffsets.push({nX:0, nY:1})
            liOffsets.push({nX:-1, nY:0});
            liOffsets.push({nX:1, nY:0});
            liOffsets = Helper.shuffle(liOffsets);
        }

        for(let o = 0; o<liOffsets.length; o++)
        {
            let offset = liOffsets[o];
            let bFree = true;
            let nY= this.nY + Math.min(offset.nY,0);
            let nY_= this.nY_ + Math.max(offset.nY,0);
            let nX= this.nX + Math.min(offset.nX,0);
            let nX_= this.nX_ + Math.max(offset.nX,0);

            if(nY <0 || nY_>=liliGrid.length || nX <0 || nX_>=liliGrid[0].length){
                continue;
            }

            for(let r = nY; r<=nY_; r++){
                for(let c = nX; c<=nX_; c++){
                    if(liliGrid[r][c] != 0 && liliGrid[r][c]!=this.nId){
                        bFree = false;
                        break;
                    }
                }
                if(!bFree){
                    break;
                }
            }

            if(bFree){
                this.nY=nY;
                this.nY_=nY_;
                this.nX=nX;
                this.nX_=nX_;

                this.drawOnGrid(liliGrid);
                return true;
            }
        }
        return false;
    }

    /**
     * Tries to find the best corner to performe a L-Shape expansion.
     * @date 2022-02-15
     * @param {List} liliGrid The base 2d grid.
     * @returns {void} Void
     */
    findLShapeCorner(liliGrid){
        this.nnLCornerOffset = {nX:0,nY:0};
        let linnCorners = [{nX:this.nX ,nY:this.nY},{nX:this.nX_ ,nY:this.nY},{nX:this.nX_ ,nY:this.nY_},{nX:this.nX ,nY:this.nY_}]
        let linnCornerOffsets =[{nX:0 ,nY:1},{nX:1 ,nY:0},{nX:0 ,nY:-1},{nX:-1 ,nY:0}]
        //Foreach corner find the best way to expand L-Shaped
        for(let c = 0; c < linnCorners.length; c++){
            let nnCorner = linnCorners[c];
            let linnPossibleCornerOffsets = [];
            //check if offset is available and if so how wide the L-Shape could be.
            for(let d = 0; d < linnCornerOffsets.length; d++){
                let nnCornerOffset = linnCornerOffsets[d];
                if(liliGrid[nnCorner.nY+nnCornerOffset.nY][nnCorner.nX+nnCornerOffset.nX] == this.nId){
                    linnPossibleCornerOffsets.push(nnCornerOffset);
                }
            }

            if(linnPossibleCornerOffsets.length <2){
                continue;
            }
            
            for(let d = 0; d < 2; d++){
                let nnCornerOffset = linnPossibleCornerOffsets[d];
                //find right offset, alwasy minus the other possible direction.
                let nnCornerOffsetOtherDirection = linnPossibleCornerOffsets[Math.pow(0,d)];

                let nWidth = -1;
                //Check the width of the L-Shape by checking for empty space.
                // console.log(nnCorner.nY-nnCornerOffsetOtherDirection.nY);
                // console.log(nnCorner.nX-nnCornerOffsetOtherDirection.nX);
                if(liliGrid[nnCorner.nY-nnCornerOffsetOtherDirection.nY][nnCorner.nX-nnCornerOffsetOtherDirection.nX] == 0 ){
                    for(let nOXY = 0; nOXY < liliGrid.length; nOXY ++){
                        let nCX = nnCorner.nX - nnCornerOffsetOtherDirection.nX + nnCornerOffset.nX * nOXY;
                        let nCY = nnCorner.nY - nnCornerOffsetOtherDirection.nY + nnCornerOffset.nY * nOXY;
                        if(nCX <0 || nCY <0 || nCX >= liliGrid[0].length-1 || nCY >= liliGrid.length-1){
                           break;
                        }
                       if(liliGrid[nCY][nCX] == 0){
                            nWidth ++;
                        }else{
                            break;
                        }
                    }                    
                }else{
                    nWidth = 0;
                }
                //check if this corner is better than the other one
                let tmp = Math.sqrt(Math.pow(this.nnLCornerOffset.nY,2)+Math.pow(this.nnLCornerOffset.nX,2));
                if(tmp<nWidth && nWidth != 0){
                    this.nnLCornerOffset = {nX: nnCornerOffset.nX,nY:nnCornerOffset.nY};
                    this.nXLCorner = nnCorner.nX;
                    this.nYLCorner = nnCorner.nY;
                    this.nXLCorner_ = nnCorner.nX + nnCornerOffset.nX * nWidth;
                    this.nYLCorner_ = nnCorner.nY + nnCornerOffset.nY * nWidth;

                    // liliGrid[this.nYLCorner][this.nXLCorner] = 11;
                    // liliGrid[this.nYLCorner_][this.nXLCorner_] = 11;
                }
            }
        }
    }

    /**
     * Expand the room using a L-Shape.
     * @date 2022-02-14
     * @param {List} liliGrid The 2d grid where the room is drawn.
     * @returns {Boolean} Returns if a expansion was possible
     */
    expandLShape(liliGrid){
        if(this.nnLCornerOffset == null || ( this.nXLCorner_ == this.nXLCorner ||  this.nYLCorner_ == this.nYLCorner)){
            this.findLShapeCorner(liliGrid);
        }
        if(this.nXLCorner == null || this.nYLCorner == null){
            return false;
        }
        let nXLCorner_ = this.nXLCorner_+ this.nnLCornerOffset.nY;
        let nYLCorner_ = this.nYLCorner_+ this.nnLCornerOffset.nX;
        // liliGrid[nYLCorner_][nXLCorner_] = 10;

        for(let x = Math.min(this.nXLCorner,nXLCorner_); x <= Math.max(this.nXLCorner,nXLCorner_); x++){
            for(let y = Math.min(this.nYLCorner,nYLCorner_ ); y <= Math.max(this.nYLCorner,nYLCorner_ ); y++){
                if(liliGrid[y][x]!=0 && liliGrid[y][x]!=this.nId){
                    return false
                }
            }
        }
    
        this.nXLCorner_ = nXLCorner_; 
        this.nYLCorner_ = nYLCorner_

        this.drawOnGrid(liliGrid);
        return true;
    }
}

export class ConstrainedGrowth{
    constructor(printFunction, nResolutionFactor, nEpochSize = 5, nResultSize = 3){
        this.fnPrint = printFunction;
        this.nResolutionFactor = nResolutionFactor;
        this.liliWallDistanceHeatmap = null;

        //Const. params for the algorithm
        this.fOptDistanceToWall = 0.15;
        this.fHeatmapTolerance = 0.025;
        this.nAreaHeatmapSearchDistance = 0.2;
        this.fWeightAreaHeatmap = 0.8;
        this.fWeightRoomHeatmap = 0.5;

        this.nEpochSize = nEpochSize;
        this.nResultSize = nResultSize;
    }

    /**
     * Callculates the min distance to the next wall.
     * @date 2022-02-13
     * @param {List} liliGrid The grid which is bases for callculation.
     * @param {Number} nRow //The row of the current cell.
     * @param {Number} nCol //The col of the current cell.
     * @param {Number} fValue //The value to search for
     * @returns {Number} Returns the min distance to a wall.
     */
    getMinDistanceToCell(liliGrid, nRow, nCol, fValue =0){
        let bFoundMinDistance = false;
        let fMinDistance = null;

        //Start with a area of 3x3 searching for a wall and then extand the search-area until a wall-cell is found.
        for(let x = 1; x<liliGrid.length-1; x++){
            //search right and left of the cell
            for(let i = 0; i<=1; i++){
                let nOffset = x*Math.pow(-1,i);
                //search by col
                for(let or = -Math.abs(nOffset); or<=Math.abs(nOffset); or++){
                    let _nR = Math.max(Math.min(nRow+or,liliGrid.length-1),0);
                    let _nC = Math.max(Math.min(nCol+nOffset,liliGrid[_nR].length-1),0);
                    let dist = Math.sqrt(Math.pow(nCol-_nC,2)+Math.pow(nRow-_nR,2));
                    if(liliGrid[_nR][_nC] == fValue && ((fMinDistance != null && fMinDistance>dist) || fMinDistance == null)){
                        bFoundMinDistance = true;
                        fMinDistance = dist;
                    }
                }

                //rearch by row
                for(let oc = -Math.abs(nOffset); oc<=Math.abs(nOffset); oc++){
                    let _nR = Math.max(Math.min(nRow+nOffset,liliGrid.length-1),0);
                    let _nC = Math.max(Math.min(nCol+oc,liliGrid[_nR].length-1),0);
                    let dist = Math.sqrt(Math.pow(nCol-_nC,2)+Math.pow(nRow-_nR,2));
                    if(liliGrid[_nR][_nC] == fValue && ((fMinDistance != null && fMinDistance>dist) || fMinDistance == null)){
                        bFoundMinDistance = true;
                        fMinDistance = dist;
                    }
                }

            }
            if(bFoundMinDistance)
            {
                return fMinDistance;
            }
        }
    }
    
    /**
     * Create a Heatmap based on the distance to the walls.
     * @date 2022-02-11
     * @param {List} liliGrid The grid defining areas and shap
     * @returns {List} Returns the heatmap.
     */
    makeDistanceHeatmap(liliGrid){
        this.liliWallDistanceHeatmap = Helper.copyLiLiGrid(liliGrid);

        //Define usable space
        for(let r = 1; r<liliGrid.length-1; r++){
            for(let c = 1; c<liliGrid[r].length-1; c++){
                if(this.liliWallDistanceHeatmap[r][c] != 0) {
                    this.liliWallDistanceHeatmap[r][c] = 1-Math.abs(this.fOptDistanceToWall - this.getMinDistanceToCell(liliGrid, r, c)/(Math.max(liliGrid.length, liliGrid[0].length)));
                }
            }
        }
    }

    /**
     * Finds the best coordinates with the highest value (random in range)
     * @date 2022-02-13
     * @param {List} liliHeatMap
     * @returns {{nR:Number, nC:Number}} The coordniates of the point on the heatmap
     */
    findBestCoordinates(liliHeatMap){
        let fBest = 0;
        //find best coordinates
        for(let r = 1; r<liliHeatMap.length-1; r++){
            for(let c = 1; c<liliHeatMap[r].length-1; c++){
                if(liliHeatMap[r][c]>fBest){
                    fBest = liliHeatMap[r][c];
                }
            }
        }

        let liBestCoordinates = [];
        for(let r = 1; r<liliHeatMap.length-1; r++){
            for(let c = 1; c<liliHeatMap[r].length-1; c++){
                if(liliHeatMap[r][c]>= fBest*(1-this.fHeatmapTolerance)){
                    liBestCoordinates.push({nR:r, nC:c});
                }
            }
        }

        let nIndex = Math.round(Math.random()*(liBestCoordinates.length-0.51),0);
        return liBestCoordinates[nIndex];
    }

    /**
     * Get a list of room-objects to compute.
     * @date 2022-02-13
     * @returns {List} The list of room-objects.
     */
    buildListOfRooms(){
        let liRooms = []

        //Get the combined size of the floor.
        let fFullSize = 0;
        this.userAPI.liHouses[0].liRooms.forEach(room => {
            if (room.sFloorLevel == this.nFloor) {
                fFullSize += room.fRoomSize;
            }
        });

        this.userAPI.liHouses[0].liRooms.forEach(room => {
            if (room.sFloorLevel == this.nFloor && !(room instanceof Staircase)) {
                liRooms.push(new Room(room.nRoomID+1, room.fRoomSize/fFullSize));
            }else if(room.sFloorLevel == this.nFloor && (room instanceof Staircase)){
                let r = new Room(room.nRoomID+1, room.fRoomSize/fFullSize);
                r.nX_ = 0;
                r.nX = 0;
                r.nY = 0;
                r.nY_ = 0;
            }
        });

        liRooms.forEach(room => {
            if (Object.getPrototypeOf(this.userAPI.liHouses[0].liRooms[room.nId]) instanceof ServiceRoom) {
                room.eAreaType = AreaType.service;
            } else if (Object.getPrototypeOf(this.userAPI.liHouses[0].liRooms[room.nId]) instanceof PrivateRoom) {
                room.eAreaType = AreaType.private;
            } else if (Object.getPrototypeOf(this.userAPI.liHouses[0].liRooms[room.nId]) instanceof SocialRoom) {
                room.eAreaType = AreaType.social;
            } else if (room instanceof Staircase) {
                room.eAreaType = AreaType.staircase;
            } else if (Object.getPrototypeOf(this.userAPI.liHouses[0].liRooms[room.nId]) instanceof ConnectionRoom) {
                room.eAreaType = AreaType.connection;
            }

        });

        return liRooms;
    }

    /**
     * Find coordinates for the room.
     * @date 2022-02-13
     * @param {Room} room The room that should be placed.
     * @returns {void} .
     */
    placeRoom(room, liliGrid, heatmap){
        let t = this.findBestCoordinates(heatmap);
        if(t == undefined){
            console.log();
        }
        room.nX = t.nC;
        room.nX_ = room.nX;
        room.nY = t.nR;
        room.nY_ = room.nY;
        room.drawOnGrid(liliGrid)
    }

    /**
     * Creates a heatmap for the placment depending on the areas.
     * @date 2022-02-13
     * @param {Room} room The room for which the function is executed.
     * @param {List} liliGrid The base grid.
     * @returns {List} Returns the newly created heatmap
     */
    makeAreaHeatmap(room, liliGrid){
        let liliAreaHeatmap = Helper.copyLiLiGrid(liliGrid);
        let nSearchAreaSize = Math.round(this.nAreaHeatmapSearchDistance*(liliGrid.length+liliGrid[0].length)/4,0);

        //Define usable space
        for(let r = 1; r<liliGrid.length-1; r++){
            for(let c = 1; c<liliGrid[r].length-1; c++){
                if(liliGrid != null) {
                    let nCount =0;
                    for(let or = -nSearchAreaSize; or <= nSearchAreaSize; or++){
                        for(let oc = -nSearchAreaSize; oc <= nSearchAreaSize; oc++){
                            let _nR = Math.max(Math.min(r+or,liliGrid.length-1),0);
                            let _nC = Math.max(Math.min(c+oc,liliGrid[r].length-1),0);
                            if(liliGrid[_nR][_nC] == room.eAreaType){
                                nCount++;
                            }
                        }
                    }
                    liliAreaHeatmap[r][c] = nCount /(nSearchAreaSize*nSearchAreaSize*6.0);
                }
            }
        }

        return liliAreaHeatmap;
    }

    /**
     * Create heatmap based on the distance to other rooms.
     * @date 2022-02-13
     * @param {List} liliGrid The 2D grid describing the rooms
     * @param {List} liRooms The list of rooms to place.
     * @returns {List} Return a 2D list as heatmap.
     */
    makeRoomDistanceHeatmap(liliGrid, liRooms){
        let liliRoomDistanceHeatmap = Helper.copyLiLiGrid(liliGrid);
        let liPlacedRooms = [];
        liRooms.forEach(room => {
            if(room.nX != null){
                liPlacedRooms.push(room);
            }
        });

        for(let r = 0; r < liliRoomDistanceHeatmap.length; r++){
            for(let c = 0; c < liliRoomDistanceHeatmap[r].length; c++){
                if(this.liliGrid[r][c]!=0){
                    let fDistance = 0;
                    liPlacedRooms.forEach(room => {
                        fDistance += Math.abs(1-(Math.sqrt(room.fSize)/0.3 - this.getMinDistanceToCell(liliGrid, r, c, room.nId)/(Math.sqrt(Math.pow(liliGrid.length/2,1), Math.pow(liliGrid[0].length,2)))));
                    });
                    liliRoomDistanceHeatmap[r][c] = fDistance/(liliRoomDistanceHeatmap.length/2.0*liPlacedRooms.length+1.0)*10;
                }else{
                    liliRoomDistanceHeatmap[r][c] = 0;
                }
            }
        }
        return liliRoomDistanceHeatmap;
    }

    /**
     * Combine two different heatmaps and return the result
     * @date 2022-02-13
     * @param {List} liliHeatmap1 The first heatmap, value will be multiplied by factor.
     * @param {List} liliHeatmap2 The second heatmap.
     * @param {Number} fFactor The factor for the combination.
     * @returns {List} The result heatmap is returned.
     */
    combineHeatmaps(liliHeatmap1, liliHeatmap2, fFactor){
        let liliNewHeatmap = Helper.copyLiLiGrid(liliHeatmap1);
        for(let r = 0; r < liliHeatmap1.length; r++){
            for(let c = 0; c < liliHeatmap1[r].length; c++){
                liliNewHeatmap[r][c] = (liliHeatmap1[r][c]*fFactor+(1/fFactor)*liliHeatmap2[r][c])/(fFactor+1);
            }
        }
        return liliNewHeatmap;
    }

    /**
     * Check if the heatmap intersects (hot zones) with existing room-placements
     * @date 2022-02-14
     * @param {List} liliHeatmap The heatmap to check intersections.
     * @param {List} liliGrid The grid for comparision for intersections.
     * @returns {void}
     */
    checkHeatmapForIntersection(liliHeatmap, liliGrid){
        for(let r = 0; r < liliGrid.length; r++){
            for(let c = 0; c < liliGrid[r].length; c++){
                if(liliGrid[r][c] != 0 && liliHeatmap[r][c] != 0){
                    liliHeatmap[r][c] = 0;
                }
            }
        }
    }

    /**
     * Expand rooms as far as possible using rectangle expansion
     * @date 2022-02-14
     * @returns {any}
     */
    expandRoomsRectangle(bUseSizeConstrained = true){
        let linRoomsToIgnore = []
        //Expand rooms rectangle
        while(true){
            let liWeights = [];
            let liRooms_ = []
            this.liRooms.forEach(room => {
                if((room.fSize - room.getSizeOnGrid(this.liliGridSolution)<=0)&&bUseSizeConstrained){
                    linRoomsToIgnore.push(room.nId);
                    if(!linRoomsToIgnore.includes(room.nId)){
                        liWeights.push(Math.pow(room.getSizeOnGrid(this.liliGridSolution)-room.fSize,2));
                        liRooms_.push(room);
                    }
                }else{
                    if(!linRoomsToIgnore.includes(room.nId)){
                        if(room.fSize - room.getSizeOnGrid(this.liliGridSolution) <0){
                            liWeights.push(1/Math.pow(room.getSizeOnGrid(this.liliGridSolution)-room.fSize,2));
                        }else{
                            liWeights.push(Math.pow(room.getSizeOnGrid(this.liliGridSolution)-room.fSize,2));
                        }
                        liRooms_.push(room);
                    }
                }
            });

            let randomRoom = WeightedRandom.getRandom(liRooms_, liWeights);
            if(randomRoom == undefined){
                break;
            }
            if(!randomRoom.expandRectangle(this.liliGridSolution)){
                linRoomsToIgnore.push(randomRoom.nId);
            }
        }
    }

     /**
     * Expand rooms as far as possible using rectangle expansion
     * @date 2022-02-14
     * @returns {any}
     */
      expandRoomsLShape(bUseSizeConstrained = true){
        let linRoomsToIgnore = []
        //Expand rooms rectangle
        while(true){
            let liWeights = [];
            let liRooms_ = []
            this.liRooms.forEach(room => {
                if((room.fSize - room.getSizeOnGrid(this.liliGridSolution)<=0)&&bUseSizeConstrained){
                    linRoomsToIgnore.push(room.nId);
                    if(!linRoomsToIgnore.includes(room.nId)){
                        liWeights.push(Math.pow(room.getSizeOnGrid(this.liliGridSolution)-room.fSize,2));
                        liRooms_.push(room);
                    }
                }else{
                    if(!linRoomsToIgnore.includes(room.nId)){
                        if(room.fSize - room.getSizeOnGrid(this.liliGridSolution) <0){
                            liWeights.push(1/Math.pow(room.getSizeOnGrid(this.liliGridSolution)-room.fSize,2));
                        }else{
                            liWeights.push(Math.pow(room.getSizeOnGrid(this.liliGridSolution)-room.fSize,2));
                        }
                        liRooms_.push(room);
                    }
                }
            });

            let randomRoom = WeightedRandom.getRandom(liRooms_, liWeights);
            if(randomRoom == undefined){
                break;
            }
            if(!randomRoom.expandLShape(this.liliGridSolution)){
                linRoomsToIgnore.push(randomRoom.nId);
            }
        }
    }

    /**
     * Fill empty space with nearby rooms
     * @date 2022-02-25
     * @returns {void}
     */
    fillEmptyCells(){
        let liWeights = [];
        let liRooms_ = []
        for(let r = 1; r<this.liliGridSolution.length-1; r++){
            for(let c = 1; c<this.liliGridSolution[r].length-1; c++){
                if(this.liliGridSolution[r][c] == 0){
                    let liPossibleRooms = [];
                    //find possible rooms
                    for(let or = -1; or<=1; or++){
                        for(let oc = -1; oc<=1; oc++){
                            if(this.liliGridSolution[r+or][c+oc] != 0 && this.liliGridSolution[r+or][c+oc] != -1 ){
                                liPossibleRooms.push(this.liliGridSolution[r+or][c+oc]);
                            }
                        }
                    }

                    //random rooms weighted by their size dif.
                    this.liRooms.forEach(room => {
                        if(liPossibleRooms.indexOf(room.nId)!=-1){
                            if(room.fSize - room.getSizeOnGrid(this.liliGridSolution) <0){
                                liWeights.push(1/Math.pow(room.getSizeOnGrid(this.liliGridSolution)-room.fSize,2));
                            }else{
                                liWeights.push(Math.pow(room.getSizeOnGrid(this.liliGridSolution)-room.fSize,2));
                            }
                            liRooms_.push(room);
                        }
                    });
        
                    let randomRoom = WeightedRandom.getRandom(liRooms_, liWeights);
                    if(randomRoom == undefined){
                        break;
                    }
                    this.liliGridSolution[r][c] = randomRoom.nId;
                }
            }
        }
    }

    /**
     * Evaluate the solution based on the size of the rectangle part. (lower is better)
     * @date 2022-02-25
     * @returns {Number} Score
     */
    evaluateRectangleSize(){
        let fScore = 0;
        //random rooms weighted by their size dif.
        this.liRooms.forEach(room => {
            let fSideToSide = Math.abs(room.nX -room.nX_)/Math.abs(room.nY - room.nY_);
            if(fSideToSide >1){
                fSideToSide = 1/fSideToSide;
            }
            //fSideToSide should not be smaler than 1/3 if so punish the client
            if(fSideToSide < 0.3){
                fScore += 1-fSideToSide;
            }
        });
        return fScore;
    }

    /**
     * Evaluate the solution based on the size of the L-shaped part. (lower is better)
     * @date 2022-02-25
     * @returns {Number} Score
     */
     evaluateLSize(){
        let fScore = 0;
        //random rooms weighted by their size dif.
        this.liRooms.forEach(room => {
            let fSideToSide = Math.abs(room.nXLCorner -room.nXLCorner_)/Math.abs(room.nYLCorner - room.nYLCorner_);
            if(fSideToSide >1){
                fSideToSide = 1/fSideToSide;
            }
            //fSideToSide should not be smaler than 1/3 if so punish the client
            if(fSideToSide < 0.3){
                fScore += 1-fSideToSide;
            }
        });
        return fScore;
    }

    /**
     * Check for empty space. (lower is better)
     * @date 2022-02-25
     * @returns {any}
     */
    evaluateEmpty(){
        let nScore =0;
        for(let r = 0; r<this.liliGridSolution.length; r++){
            for(let c = 0; c < this.liliGridSolution[r].length; c++){
                if(this.liliGridSolution[r][c] == 0){
                    nScore ++;
                }
            }
        }
        return nScore;
    }

    /**
     * Evaluates the size difference between the user-recommandation and the real size
     * @date 2022-02-25
     * @returns {Number} Score
     */
    evaluateSize(){
        let fScore = 0;
        this.liRooms.forEach(room => {
            fScore+=Math.abs(room.fSize - room.getSizeOnGrid(this.liliGridSolution));
        });
        return 1/fScore;
    }

    /**
     * Evaluate narrow places in room
     * @date 2022-03-13
     * @returns {Number} Number of narrow cells
     */
    evaluateNarrow(){
        let nNarrowCells = 0;
        for(let r = 1; r<this.liliGridSolution.length-1; r++){
            for(let c = 1; c < this.liliGridSolution[r].length-1; c++){
                let nCount = 0;
                for(let or = r-1; or<=r+1; or++){
                    for(let oc = c-1; oc <= c+1; oc++){
                        if(this.liliGridSolution[r][c] == this.liliGridSolution[or][oc]){
                            nCount++;
                        }
                    }
                }
                if(nCount <=3){
                    nNarrowCells++;
                }
            }
        }
        return nNarrowCells;
    }

    /**
     * Evaluate the current sollution an return a score. (lower is better)
     * @date 2022-02-25
     * @returns {Number} The evaluation score is returned.
     */
    evaluate(){
        let fRectangleSizeEvalScore = this.evaluateRectangleSize();
        let fLSizeEvalScore = this.evaluateRectangleSize();
        let fSizeEvalScore = this.evaluateSize();
        let fEmptyEvalScore = this.evaluateEmpty();
        let fNarrowEvalScore = this.evaluateNarrow();
        return (Math.pow(fRectangleSizeEvalScore,2)+Math.pow(fLSizeEvalScore,2)+Math.pow(fSizeEvalScore,2)+Math.pow(fEmptyEvalScore,2)+Math.pow(fNarrowEvalScore*100,2));
    }

    /**
     * Setup the arrays needed for computation
     * @date 2022-02-25
     * @param {List} lili2DGrid
     * @returns {void}.
     */
    setupArrays(lili2DGrid){
        this.liliGrid = Helper.copyLiLiGrid(lili2DGrid);
        this.liliGridSolution = Helper.create2DArray(lili2DGrid.length, lili2DGrid[0].length);
        for(let r = 0; r < this.liliGrid.length; r++){
            for(let c = 0; c < this.liliGrid[r].length; c++){
                if(this.liliGrid[r][c] == 0){
                    this.liliGridSolution[r][c] = -1;
                }else if(this.liliGrid[r][c] ==AreaType.staircase-1){
                    this.liliGridSolution[r][c] = AreaType.staircase;
                }
            }
        }
    }

    /**
     * Executes the algorithm
     * @date 2022-02-11
     * @param {any} lili2DGrid Describes the shape and areas of the floor.
     * @returns {List} A list of the top x results
     */
    execute(lili2DGrid, userAPI, nFloor){
        this.nFloor = nFloor;
        this.userAPI = userAPI;
        
        this.liRooms = Helper.shuffle(this.buildListOfRooms());
        this.cpLiRooms = Helper.listDeepClone(this.liRooms);

        this.liliGridAreas = lili2DGrid;
        this.setupArrays(lili2DGrid);
        // this.printFunction(Helper.toHTML(this.liliGridSolution, false));

        this.makeDistanceHeatmap(this.liliGrid);
        // this.printFunction(Helper.toHTML(this.liliWallDistanceHeatmap, true));
        this.liResults = [];

        for (let nExSteps = 0; nExSteps < this.nEpochSize; nExSteps++) {
            //place rooms based on the heatmap
            this.liRooms.forEach(room => {
                let liliAreaHeatmap = this.makeAreaHeatmap(room, this.liliGrid)
                // this.printFunction(Helper.toHTML(liliAreaHeatmap, true));
                
                let liliHeatmap = this.combineHeatmaps(liliAreaHeatmap,this.liliWallDistanceHeatmap,this.fWeightAreaHeatmap);

                let liliRoomHeatmap = this.makeRoomDistanceHeatmap(this.liliGridSolution, this.liRooms);
                // this.printFunction(Helper.toHTML(liliRoomHeatmap, true));

                liliHeatmap = this.combineHeatmaps(liliRoomHeatmap, liliHeatmap, this.fWeightRoomHeatmap);
                // this.printFunction(Helper.toHTML(liliHeatmap, true));

                this.checkHeatmapForIntersection(liliHeatmap, this.liliGridSolution);

                this.placeRoom(room, this.liliGridSolution, liliHeatmap);
            });

            // this.printFunction(Helper.toHTML(this.liliGridSolution, false));

            this.expandRoomsRectangle();
            // this.printFunction(Helper.toHTML(this.liliGridSolution, false));
            this.expandRoomsLShape();
            // this.printFunction(Helper.toHTML(this.liliGridSolution, false));
            this.expandRoomsRectangle(false);
            this.expandRoomsLShape(false);
            // this.printFunction(Helper.toHTML(this.liliGridSolution, false));
            this.fillEmptyCells();
            // this.printFunction(Helper.toHTML(this.liliGridSolution, false));

            this.liResults.push({
                grid: this.liliGridSolution, liRooms: Helper.listDeepClone(this.liRooms), evaluation: this.evaluate()
            });
            if(nExSteps < this.nEpochSize-1){
                this.setupArrays(lili2DGrid);
                this.liRooms = Helper.listDeepClone(this.cpLiRooms);
            }
        }

        return this.liResults.sort((a, b) => { return a.evaluation - b.evaluation }).slice(0, this.nResultSize);
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