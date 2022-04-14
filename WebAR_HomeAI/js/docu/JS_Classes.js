/**
 * The plot is the highest element in the hierarchy, it stores data belonging to the plot.
 */
class Plot {
    /** 
     * @constructor
     * @param {PlotSize} plotSize - The size of the plot.
     */
    constructor(plotSize) {
        /**
         * @member {PlotSize} - The size of the plot.
         */
        this.plotSize = plotSize;
    }

    /**
     * A list with all houses on this plot.
     * @type {list<House>}
     */
    liHouses = [];

    /** 
     * @function
     * @param {House} house - The house which will be added to the plot.
    */
    addHouse(house) {
        this.liHouses.push(house);
    }
}

/**
 * The size of the plot.
 */
class PlotSize {

}

/**
 * A plot with rectangular shape.
 * @extends PlotSize
 */
class RectanglePlotSize extends PlotSize {
    /** 
     * @constructor
     * @param {number} length - The length of the plot.
     * @param {number} width - The width of the plot.
     */
    constructor(length, width) {
        super();
        /**
         * @member {number} - The length of the plot.
         */
        this.length = length;
        /**
         * @member {number} - The width of the plot.
         */
        this.width = width;
    }
}

/** A plot with a square shape.
 * @extends PlotSize
 */
class SquarePlotSize extends PlotSize {
    /**
     * @constructor
     * @param {number} sidesLength - The side length of the plot.
     */
    constructor(sidesLength) {
        super();
        /**
         * @member {number} - The side length of the plot.
         */
        this.sidesLength = sidesLength;
    }
}

/**
 * The house is the second highest element in the hierarchy, it stores data belonging to the house.
 */
class House {
    /**
     * @constructor
     * @param {number} id - The id of the house.
     * @param {number} maxSize - The maximum size the house can have in m^2.
     */
    constructor(id, maxSize) {
        /**
         * @member {number} - The id of the house.
         */
        this.id = id;
        /**
         * @member {number} - The maximum size the house can have in m^2.
         */
        this.maxSize = maxSize;
    }

    /** 
     * A list with all the rooms inside of the house.
     * @type {list<Room>}
    */
    liRooms = [];
    /** 
     * A list with all the walls inside of the house.
     * @type {list<Wall>}
    */
    liWalls = [];
    /** 
     * A list with all the roofs inside of the house.
     * @type {list<Roof>}
    */
    liRoofs = [];
    /** 
     * A list with all the floors inside of the house.
     * @type {list<Floor>}
    */
    liFloors = [];
    /** 
     * A list with all the room objects inside of the house.
     * @type {list<RoomObject>}
    */
    liRoomObjs = [];

    /**
     * @function
     * @param {Room} room - The room which will be added to the house.
     */
    addRoom(room) {
        this.liRooms.push(room);
    }

    /**
     * @function
     * @param {Wall} wall - The wall which will be added to the house.
     */
    addWall(wall) {
        this.liWalls.push(wall);
    }

    /**
     * @function
     * @param {Roof} roof - The roof which will be added to the house.
     */
    addRoof(roof) {
        this.liRoofs.push(roof);
    }

    /**
     * @function
     * @param {Floor} floor - The floor which will be added to the house.
     */
    addFloor(floor) {
        this.liFloors.push(floor);
    }

    /**
     * @function
     * @param {RoomObject} roomObject - The room object which will be added to the house.
     */
    addRoomObj(roomObject) {
        this.liRoomObjs.push(roomObject);
    }
}

/**
 * The Room is the third highest element in the hierarchy, it stores data belonging to the room.
 */
class Room {
    /**
     * @constructor
     * @param {number} id The id of the room.
     * @param {number} size The size of a room in m^2.
     */
    constructor(id, size) {
        /**
         * @member {number} - The id of the room.
         */
        this.id = id;
        /**
         * @member {number} - The size of the room in m^2.
         */
        this.size = size;
    }

    /**
     * A reference list with all the walls of a room.
     * @type {list<number>}
     */
    liWallRefs = [];
    /**
     * A list with all the borders of a room.
     * @type {list<Border>}
     */
    liBorders = [];
    /**
     * A reference list with all the room objects of a room.
     * @type {list<number>}
     */
    liRoomObjectRefs = [];
    /**
     * A reference list with all the floors of a room.
     * @type {list<number>}
     */
    liFloorRefs = [];
    /**
     * A reference list with all the roofs of a room.
     * @type {list<number>}
     */
    liRoofRefs = [];

    /**
     * @function
     * @param {number} wallid - The id of the wall which will be added to the room.
     */
    addWall(wallid) {
        this.liWallRefs.push(wallid)
    }

    /**
     * @function
     * @param {Border} border - The border which will be added to the room.
     */
    addBorder(border) {
        this.liBorders.push(border);
    }

    /**
     * @function
     * @param {number} roomObjectid - The id of the room object which will be added to the room.
     */
    addRoomObject(roomObjectid) {
        this.liRoomObjectRefs.push(roomObjectid);
    }

    /**
     * @function
     * @param {number} floorid - The id of the floor which will be added to the room.
     */
    addFloor(floorid) {
        this.liFloorRefs.push(floorid);
    }

    /**
     * @function
     * @param {number} roofid - The id of the roof which will be added to the room.
     */
    addRoof(roofid) {
        this.liRoofRefs.push(roofid);
    }
}

/**
 * Rooms that connect other rooms. (e.g.: a corridor)
 * @extends Room
 */
class ConnectingRoom extends Room {
    /**
     * @constructor
     * @param {number} id - The id of the room.
     * @param {number} size - The size of the room in m^2.
     */
    constructor(id, size) {
        super(id, size);
    }
}

/**
 * Rooms which are only used by the householders. (e.g.: a bedroom)
 * @extends Room
 */
class PrivateRoom extends Room {
    /**
     * @constructor
     * @param {number} id - The id of the room.
     * @param {number} size - The size of the room in m^2.
     */
    constructor(id, size) {
        super(id, size);
    }
}

/**
 * Rooms which are used for the maintanance of the house. (e.g.: a storeroom, a washroom, ...)
 * @extends Room
 */
class ServiceRoom extends Room {
    /**
     * @constructor
     * @param {number} id - The id of the room.
     * @param {number} size - The size of the room in m^2.
     */
    constructor(id, size) {
        super(id, size);
    }
}

/**
 * Rooms which are used for socializing. (e.g.: a living room)
 * @extends Room
 */
class SocialRoom extends Room {
    /**
     * @constructor
     * @param {number} id - The id of the room.
     * @param {number} size - The size of the room in m^2.
     */
    constructor(id, size) {
        super(id, size);
    }
}

/**
 * The point object is used to reference a point in a three dimensional space. (x, y, z)
 */
class Point {
    /**
     * @constructor
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @param {number} z - The z coordinate
     */
    constructor(x, y, z) {
        /**
         * @member {number} - The x coordinate
         */
        this.x = x;
        /**
         * @member {number} - The y coordinate
         */
        this.y = y;
        /**
         * @member {number} - The z coordinate
         */
        this.z = z;
    }
}

/**
 * The Wall object is used to store data that belongs to a wall.
 */
class Wall {
    /**
     * @constructor
     * @param {number} id - The id of the wall.
     */
    constructor(id) {
        /**
         * @member {number} - The id of the wall.
         */
        this.id = id
    }
}

/**
 * Walls which define the area of a room.
 * @extends Wall
 */
class InnerWall extends Wall {
    /**
     * @constructor
     * @param {number} id - The id of the wall.
     */
    constructor(id) {
        super(id);
        /**
         * @member {boolean} - Whether the Wall is an inner wall or not. (value: true)
         */
        this.bIsInnerWall = true;
    }
}

/**
 * Walls which define the area of the house.
 * @extends Wall
 */
class OuterWall extends Wall {
    /**
     * @constructor
     * @param {number} id - The id of the wall.
     */
    constructor(id) {
        super(id);
        /**
         * @member {boolean} - Whether the Wall is an outer wall or not. (value: true)
         */
        this.bIsOuterWall = true;
    }
}

/**
 * Walls which are generated through a list of points.
 * @extends Wall
 */
class PolyWall extends Wall {
    /**
     * @constructor
     * @param {number} id - The id of the wall.
     * @param {list<Point>} liPoints - The list of points of the wall.
     */
    constructor(id, liPoints) {
        super(id);
        /**
         * @member {list<Point>} - A list of points.
         */
        this.liPoints = liPoints
    }
}

/**
 * A list of points generated inner wall.
 * @extends PolyWall
 */
class PolyInnerWall extends PolyWall {
    /**
     * @constructor
     * @param {number} id - The id of the wall.
     * @param {list<Point>} liPoints - The list of points of the wall.
     */
    constructor(id, liPoints) {
        super(id, liPoints);
    }
}

/**
 * A list of points generated outer wall.
 * @extends PolyWall
 */
class PolyOuterWall extends PolyWall {
    /**
     * @constructor
     * @param {number} id - The id of the wall.
     * @param {list<Point>} liPoints - The list of points of the wall.
     */
    constructor(id, liPoints) {
        super(id, liPoints);
    }
}

/**
 * A list of points generated floor.
 * @extends PolyWall
 */
class PolyFloor extends PolyWall {
    /**
     * @constructor
     * @param {number} id - The id of the floor.
     * @param {list<Point>} liPoints - The list of points of the floor.
     */
    constructor(id, liPoints) {
        super(id, liPoints);
    }
}

/**
 * A list of points generated roof.
 * @extends PolyFloor
 */
class PolyRoof extends PolyFloor {
    /**
     * @constructor
     * @param {number} id - The id of the roof.
     * @param {list<Point>} liPoints - The list of points of the roof.
     */
    constructor(id, liPoints) {
        super(id, liPoints);
    }
}

/**
 * The Floor object is used to store data that belongs to a floor.
 * @extends Wall
 */
class Floor extends Wall {
    /**
     * @constructor
     * @param {number} id - The id of the floor.
     */
    constructor(id) {
        super(id);
    }
}

/**
 * The Roof object is used to store data that belongs to a roof.
 * @extends Floor
 */
class Roof extends Floor {
    /**
     * @constructor
     * @param {number} id - The id of the roof.
     */
    constructor(id) {
        super(id);
    }
}

/**
 * Room objects are all objects inside of a room.
 */
class RoomObject {
    /**
     * @constructor
     * @param {number} id - The id of the room object.
     * @param {list<Point>} liPoints - The list of points for the position of the room object.
     */
    constructor(id, liPoints) {
        /**
         * @member {number} - The id of the object.
         */
        this.id = id;
        /**
         * @member {list<Point>} - The list of points for the position of the object.
         */
        this.liPoints = liPoints;
    }
}

/**
 * Room exit defines the openings of a room.
 * @extends RoomObject
 */
class RoomExit extends RoomObject {
    /**
     * @constructor
     * @param {number} id - The id of the room exit.
     * @param {list<Point>} liPoints - The list of points for the position of the room exit.
     */
    constructor(id, liPoints) {
        super(id, liPoints)
    }
}

/**
 * A list of points generated room object.
 * @extends RoomObject
 */
class PolyRoomObject extends RoomObject {
    /**
     * @constructor
     * @param {number} id - The id of the poly room object.
     * @param {list<Point>} liPoints - The list of points for the position of the poly room object.
     */
    constructor(id, liPoints) {
        super(id, liPoints);
    }

}

/**
 * The window of a room.
 * @extends PolyRoomObject
 */
class Window extends PolyRoomObject {
    /**
     * @constructor
     * @param {number} id - The id of the window.
     * @param {list<Point>} liPoints - The list of points for the position of the window.
     */
    constructor(id, liPoints) {
        super(id, liPoints);
    }
}

/**
 * The door of a room.
 * @extends RoomExit
 */
class Door extends RoomExit {
    /**
     * 
     * @param {number} id - The id of the door.
     * @param {list<Point>} liPoints - The list of points for the position of the door.
     * @param {boolean} [bIsInswing=true] - Whether the door swings inside of the room or the opposite direction.
     */
    constructor(id, liPoints, bIsInswing = true) {
        super(id, liPoints);
        /**
         * @member {boolean} - Whether the door swings inside of the room or the opposite direction.
         */
        this.bIsInswing = bIsInswing;
    }
}

/**
 * The border of a room.
 */
class Border {
    /**
     * @constructor
     * @param {list<Point>} liPoints - The list of points for the position of the border.
     */
    constructor(liPoints) {
        /**
         * @member {list<Point>} - The list of points for the position of the border.
         */
        this.liPoints = liPoints;
    }
}

/**
 * A list of points generated border.
 * @extends Border
 */
class PolyBorder extends Border {
    /**
     * @constructor
     * @param {list<Point>} liPoints -  The list of points for the position of the poly border.
     */
    constructor(liPoints) {
        super(liPoints);
    }
}

/**
 * Used for generating unique id's.
 */
class UUIDGenerator {
    /**
     * @constructor
     * @param {number} [startingid=0] - The starting point from which further id's will be generated.
     */
    constructor(startingid = 0) {
        /**
         * @member {number} - The default value.
         */
        this.defaultval = startingid;
        /**
         * @member {number} - The current id.
         */
        this.curr_id = startingid;
    }

    /**
     * @function
     * @returns {number} - The newly generated id.
     */
    get_new_UUID() {
        const temp = this.curr_id;
        this.curr_id += 1;
        return temp;
    }

    /**
     * Resets the id generator.
     * @function
     */
    reset_generator() {
        this.curr_id = this.defaultval;
    }
}