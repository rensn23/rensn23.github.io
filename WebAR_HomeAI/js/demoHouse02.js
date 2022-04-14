import * as SCENE from "./JS_Classes.js";

//Plot
export var plot2 = new SCENE.Plot(new SCENE.SquarePlotSize(20));

//House
plot2.addHouse(new SCENE.House(0, 100));

//Outer Walls
plot2.liHouses[0].liWalls = [
    new SCENE.PolyOuterWall(1, [     //Left Wall
        new SCENE.Point(3, 0.1, 1),
        new SCENE.Point(3.4, 0.1, 1),
        new SCENE.Point(3.4, 0.1, 19),
        new SCENE.Point(3, 0.1, 19),
        new SCENE.Point(3, 5, 1),
        new SCENE.Point(3.4, 5, 1),
        new SCENE.Point(3.4, 5, 19),
        new SCENE.Point(3, 5, 19)
    ]),
    new SCENE.PolyOuterWall(2, [     //Right Top Wall
        new SCENE.Point(16.6, 3, 1),
        new SCENE.Point(17, 3, 1),
        new SCENE.Point(17, 3, 19),
        new SCENE.Point(16.6, 3, 19),
        new SCENE.Point(16.6, 5, 1),
        new SCENE.Point(17, 5, 1),
        new SCENE.Point(17, 5, 19),
        new SCENE.Point(16.6, 5, 19)
    ]),
    new SCENE.PolyOuterWall(3, [     //Right Right Wall
        new SCENE.Point(16.6, 0.1, 1),
        new SCENE.Point(17, 0.1, 1),
        new SCENE.Point(17, 0.1, 3),
        new SCENE.Point(16.6, 0.1, 3),
        new SCENE.Point(16.6, 3, 1),
        new SCENE.Point(17, 3, 1),
        new SCENE.Point(17, 3, 3),
        new SCENE.Point(16.6, 3, 3)
    ]),
    new SCENE.PolyOuterWall(4, [     //Right Left Wall
        new SCENE.Point(16.6, 0.1, 5),
        new SCENE.Point(17, 0.1, 5),
        new SCENE.Point(17, 0.1, 19),
        new SCENE.Point(16.6, 0.1, 19),
        new SCENE.Point(16.6, 3, 5),
        new SCENE.Point(17, 3, 5),
        new SCENE.Point(17, 3, 19),
        new SCENE.Point(16.6, 3, 19)
    ]),
    new SCENE.PolyOuterWall(5, [     //Top Wall
        new SCENE.Point(3.4, 0.1, 1),
        new SCENE.Point(16.6, 0.1, 1),
        new SCENE.Point(16.6, 0.1, 1.4),
        new SCENE.Point(3.4, 0.1, 1.4),
        new SCENE.Point(3.4, 5, 1),
        new SCENE.Point(16.6, 5, 1),
        new SCENE.Point(16.6, 5, 1.4),
        new SCENE.Point(3.4, 5, 1.4)
    ]),
    new SCENE.PolyOuterWall(6, [     //Bottom Wall
        new SCENE.Point(3.4, 0.1, 18.6),
        new SCENE.Point(16.6, 0.1, 18.6),
        new SCENE.Point(16.6, 0.1, 19),
        new SCENE.Point(3.4, 0.1, 19),
        new SCENE.Point(3.4, 5, 18.6),
        new SCENE.Point(16.6, 5, 18.6),
        new SCENE.Point(16.6, 5, 19),
        new SCENE.Point(3.4, 5, 19)
    ]),
    new SCENE.PolyInnerWall(9, [         //Left Inner Wall
        new SCENE.Point(3.4, 0.1, 9.9),
        new SCENE.Point(9, 0.1, 9.9),
        new SCENE.Point(9, 0.1, 10.1),
        new SCENE.Point(3.4, 0.1, 10.1),
        new SCENE.Point(3.4, 3, 9.9),
        new SCENE.Point(9, 3, 9.9),
        new SCENE.Point(9, 3, 10.1),
        new SCENE.Point(3.4, 3, 10.1)
    ]),
    new SCENE.PolyInnerWall(10, [         //Right Inner Wall
        new SCENE.Point(11, 0.1, 9.9),
        new SCENE.Point(16.6, 0.1, 9.9),
        new SCENE.Point(16.6, 0.1, 10.1),
        new SCENE.Point(11, 0.1, 10.1),
        new SCENE.Point(11, 3, 9.9),
        new SCENE.Point(16.6, 3, 9.9),
        new SCENE.Point(16.6, 3, 10.1),
        new SCENE.Point(11, 3, 10.1)
    ]),
    new SCENE.PolyInnerWall(11, [         //Top Inner Wall
        new SCENE.Point(3.4, 3, 9.9),
        new SCENE.Point(16.6, 3, 9.9),
        new SCENE.Point(16.6, 3, 10.1),
        new SCENE.Point(3.4, 3, 10.1),
        new SCENE.Point(3.4, 5, 9.9),
        new SCENE.Point(16.6, 5, 9.9),
        new SCENE.Point(16.6, 5, 10.1),
        new SCENE.Point(3.4, 5, 10.1)
    ])
]

//Add Floors
plot2.liHouses[0].liFloors = [
    new SCENE.PolyFloor(12, [
        new SCENE.Point(3, 0, 1),
        new SCENE.Point(17, 0, 1),
        new SCENE.Point(17, 0, 10),
        new SCENE.Point(3, 0, 10),
        new SCENE.Point(3, 0.1, 1),
        new SCENE.Point(17, 0.1, 1),
        new SCENE.Point(17, 0.1, 10),
        new SCENE.Point(3, 0.1, 10)
    ]),
    new SCENE.PolyFloor(13, [
        new SCENE.Point(3, 0, 10),
        new SCENE.Point(17, 0, 10),
        new SCENE.Point(17, 0, 19),
        new SCENE.Point(3, 0, 19),
        new SCENE.Point(3, 0.1, 10),
        new SCENE.Point(17, 0.1, 10),
        new SCENE.Point(17, 0.1, 19),
        new SCENE.Point(3, 0.1, 19)
    ])
];

plot2.liHouses[0].liRoomObjects = [
    new SCENE.Door(16, [      //Main Door
        new SCENE.Point(16.6, 0.1, 3),
        new SCENE.Point(17, 0.1, 3),
        new SCENE.Point(17, 0.1, 5),
        new SCENE.Point(16.6, 0.1, 5),
        new SCENE.Point(16.6, 3, 3),
        new SCENE.Point(17, 3, 3),
        new SCENE.Point(17, 3, 5),
        new SCENE.Point(16.6, 3, 5)
    ]),
    new SCENE.Door(17, [      //Middle Door
        new SCENE.Point(9, 0.1, 9.9),
        new SCENE.Point(11, 0.1, 9.9),
        new SCENE.Point(11, 0.1, 10.1),
        new SCENE.Point(9, 0.1, 10.1),
        new SCENE.Point(9, 3, 9.9),
        new SCENE.Point(11, 3, 9.9),
        new SCENE.Point(11, 3, 10.1),
        new SCENE.Point(9, 3, 10.1)
    ], false),
    new SCENE.PolyRoomObject(18, [    //RoomObject #1
        new SCENE.Point(5, 0.1, 16),
        new SCENE.Point(7, 0.1, 16),
        new SCENE.Point(7, 0.1, 18),
        new SCENE.Point(5, 0.1, 18),
        new SCENE.Point(5, 2, 16),
        new SCENE.Point(7, 2, 16),
        new SCENE.Point(7, 2, 18),
        new SCENE.Point(5, 2, 18)
    ])
];

//Rooms
plot2.liHouses[0].addRoom(new SCENE.ConnectingRoom(7, 100))
plot2.liHouses[0].liRooms[0].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(3.4, 0.1, 1.4),
        new SCENE.Point(16.6, 0.1, 1.4),
        new SCENE.Point(16.6, 0.1, 9.9),
        new SCENE.Point(3.4, 0.1, 9.9),
        new SCENE.Point(3.4, 0.1, 1.4)
    ])
]

plot2.liHouses[0].addRoom(new SCENE.PrivateRoom(8, 100))
plot2.liHouses[0].liRooms[1].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(3.4, 0.1, 10.1),
        new SCENE.Point(16.6, 0.1, 10.1),
        new SCENE.Point(16.6, 0.1, 18.6),
        new SCENE.Point(3.4, 0.1, 18.6),
        new SCENE.Point(3.4, 0.1, 10.1)
    ])
]