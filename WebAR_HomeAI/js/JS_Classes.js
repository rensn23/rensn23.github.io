export class Plot{
    constructor(plotSize) {
        this.plotSize = plotSize;
    }

    liHouses = [];

    addHouse(house) {
        this.liHouses.push(house);
    }
}

export class PlotSize{
    
}

export class RectanglePlotSize extends PlotSize{
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
}

export class SquarePlotSize extends PlotSize{
    constructor(sidesLength) {
        super();
        this.sidesLength = sidesLength;
    }
}

export class House{
    constructor(id, maxSize) {
        this.id = id;
        this.maxSize = maxSize;
    }

    liRooms = [];
    liWalls = [];
    liRoofs = [];
    liFloors = [];
    liRoomObjs = [];

    addRoom(room) {
        this.liRooms.push(room);
    }

    addWall(wall) {
        this.liWalls.push(wall);
    }

    addRoof(roof) {
        this.liRoofs.push(roof);
    }
    
    addFloor(floor) {
        this.liFloors.push(floor);
    }

    addRoomObj(roomObject) {
        this.liRoomObjs.push(roomObject);
    }
}

export class Room {
    constructor(id, size) {
        this.id = id;
        this.size = size;
    }

    liWallRefs = [];
    liBorders = [];
    liRoomObjectRefs = [];
    liFloorRefs = [];
    liRoofRefs = [];

    addWall(wallid) {
        this.liWallRefs.push(wallid)
    }

    addBorder(border) {
        this.liBorders.push(border);
    }

    addRoomObject(roomObjectid) {
        this.liRoomObjectRefs.push(roomObjectid);
    }

    addFloor(floorid) {
        this.liFloorRefs.push(floorid);
    }

    addRoof(roofid) {
        this.liRoofRefs.push(roofid);
    }
}

export class ConnectingRoom extends Room{
    constructor(id, size) {
        super(id, size);
    }
}

export class PrivateRoom extends Room{
    constructor(id, size) {
        super(id, size);
    }
}

export class ServiceRoom extends Room{
    constructor(id, size) {
        super(id, size);
    }
}

export class SocialRoom extends Room{
    constructor(id, size) {
        super(id, size);
    }
}

export class Point{
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class Wall {
    constructor(id) {
        this.id = id
    }
}

export class InnerWall extends Wall{
    constructor(id) {
        super(id);
        this.bIsInnerWall = true;
    }
}

export class OuterWall extends Wall{
    constructor(id) {
        super(id);
        this.bIsOuterWall = true;
    }
}

export class PolyWall extends Wall{
    constructor(id, liPoints) {
        super(id);
        this.liPoints = liPoints
    }
}

export class PolyInnerWall extends PolyWall{
    constructor(id, liPoints) {
        super(id, liPoints);
    }
}

export class PolyOuterWall extends PolyWall{
    constructor(id, liPoints) {
        super(id, liPoints);
    }
}

export class PolyFloor extends PolyWall{
    constructor(id, liPoints) {
        super(id, liPoints);
    }
}

export class PolyRoof extends PolyFloor{
    constructor(id, liPoints) {
        super(id, liPoints);
    }
}

export class Floor extends Wall {
    constructor(id) {
        super(id);
    }
}

export class Roof extends Floor {
    constructor(id) {
        super(id);
    }
}

export class RoomObject{
    constructor(id, liPoints) {
        this.id = id;
        this.liPoints = liPoints;
    }
}

export class RoomExit extends RoomObject {
    constructor(id, liPoints) {
        super(id, liPoints)
    }
}

export class PolyRoomObject extends RoomObject{
    constructor(id, liPoints) {
        super(id, liPoints);
    }
    
}

export class Window extends PolyRoomObject {
    constructor(id, liPoints) {
        super(id, liPoints);
    }
}

export class Door extends RoomExit {
    constructor(id, liPoints, bIsInswing = true) {
        super(id, liPoints);
        this.bIsInswing = bIsInswing;
    }
}

export class Border{
    constructor(liPoints) {
        this.liPoints = liPoints;
    }
}

export class PolyBorder extends Border {
    constructor(liPoints) {
        super(liPoints);
    }
}

export class UUIDGenerator { 
    constructor(startingid = 0) {
        this.defaultval = startingid;
        this.curr_id = startingid;
    }

    get_new_UUID() {
        const temp = this.curr_id;
        this.curr_id += 1;
        return temp;
    }

    reset_generator() {
        this.curr_id = this.defaultval;
    }
}