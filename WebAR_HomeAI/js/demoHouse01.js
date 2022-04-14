//Plot
var plot1 = new Plot(20);

//House
plot1.addHouse(new House(100));

//Outer Walls
plot1.liHouses[0].liWalls = [
    new StraightOuterWall([     //Left Wall
        new Point(3, 0, 1),
        new Point(3.4, 0, 1),
        new Point(3.4, 0, 19),
        new Point(3, 0, 19),
        new Point(3, 5, 1),
        new Point(3.4, 5, 1),
        new Point(3.4, 5, 19),
        new Point(3, 5, 19)
    ]),
    new StraightOuterWall([     //Right Top Wall
        new Point(16.6, 3, 1),
        new Point(17, 3, 1),
        new Point(17, 3, 19),
        new Point(16.6, 3, 19),
        new Point(16.6, 5, 1),
        new Point(17, 5, 1),
        new Point(17, 5, 19),
        new Point(16.6, 5, 19)
    ]),
    new StraightOuterWall([     //Right Right Wall
        new Point(16.6, 0, 1),
        new Point(17, 0, 1),
        new Point(17, 0, 3),
        new Point(16.6, 0, 3),
        new Point(16.6, 3, 1),
        new Point(17, 3, 1),
        new Point(17, 3, 3),
        new Point(16.6, 3, 3)
    ]),
    new StraightOuterWall([     //Right Left Wall
        new Point(16.6, 0, 5),
        new Point(17, 0, 5),
        new Point(17, 0, 19),
        new Point(16.6, 0, 19),
        new Point(16.6, 3, 5),
        new Point(17, 3, 5),
        new Point(17, 3, 19),
        new Point(16.6, 3, 19)
    ]),
    new StraightOuterWall([     //Top Wall
        new Point(3.4, 0, 1),
        new Point(16.6, 0, 1),
        new Point(16.6, 0, 1.4),
        new Point(3.4, 0, 1.4),
        new Point(3.4, 5, 1),
        new Point(16.6, 5, 1),
        new Point(16.6, 5, 1.4),
        new Point(3.4, 5, 1.4)
    ]),
    new StraightOuterWall([     //Bottom Wall
        new Point(3.4, 0, 18.6),
        new Point(16.6, 0, 18.6),
        new Point(16.6, 0, 19),
        new Point(3.4, 0, 19),
        new Point(3.4, 5, 18.6),
        new Point(16.6, 5, 18.6),
        new Point(16.6, 5, 19),
        new Point(3.4, 5, 19)
    ])
]

//Rooms
plot1.liHouses[0].liRooms = [
    new ConnectingRoom(100, new Floor()),
    new PrivateRoom(100, new Floor())
]

//Add InnerWalls to Room
plot1.liHouses[0].liRooms[0].liWalls = [
    new StraightInnerWall([         //Left Inner Wall
        new Point(3.4, 0, 9.9),
        new Point(9, 0, 9.9),
        new Point(9, 0, 10.1),
        new Point(3.4, 0, 10.1),
        new Point(3.4, 3, 9.9),
        new Point(9, 3, 9.9),
        new Point(9, 3, 10.1),
        new Point(3.4, 3, 10.1)
    ]),
    new StraightInnerWall([         //Right Inner Wall
        new Point(11, 0, 9.9),
        new Point(16.6, 0, 9.9),
        new Point(16.6, 0, 10.1),
        new Point(11, 0, 10.1),
        new Point(11, 3, 9.9),
        new Point(16.6, 3, 9.9),
        new Point(16.6, 3, 10.1),
        new Point(11, 3, 10.1)
    ]),
    new StraightInnerWall([         //Top Inner Wall
        new Point(3.4, 3, 9.9),
        new Point(16.6, 3, 9.9),
        new Point(16.6, 3, 10.1),
        new Point(3.4, 3, 10.1),
        new Point(3.4, 5, 9.9),
        new Point(16.6, 5, 9.9),
        new Point(16.6, 5, 10.1),
        new Point(3.4, 5, 10.1)
    ])
]

//Add Floors
plot1.liHouses[0].liRooms[0].floor = 
    new StraightFloor([
        new Point(3, 0.1, 1),
        new Point(17, 0.1, 1),
        new Point(17, 0.1, 10),
        new Point(3, 0.1, 10),
        new Point(3, -0.1, 1),
        new Point(17, -0.1, 1),
        new Point(17, -0.1, 10),
        new Point(3, -0.1, 10)
    ]
)

plot1.liHouses[0].liRooms[1].floor = 
    new StraightFloor([
        new Point(3, 0.1, 10),
        new Point(17, 0.1, 10),
        new Point(17, 0.1, 19),
        new Point(3, 0.1, 19),
        new Point(3, -0.1, 10),
        new Point(17, -0.1, 10),
        new Point(17, -0.1, 19),
        new Point(3, -0.1, 19)
    ]
)

//Add Borders
plot1.liHouses[0].liRooms[0].liBorders = [
    new StraightBorder([
        new Point(3.4, 0, 1.4),
        new Point(16.6, 0, 1.4),
        new Point(16.6, 0, 9.9),
        new Point(3.4, 0, 9.9),
        new Point(3.4, 0, 1.4)
    ])
]
plot1.liHouses[0].liRooms[1].liBorders = [
    new StraightBorder([
        new Point(3.4, 0, 10.1),
        new Point(16.6, 0, 10.1),
        new Point(16.6, 0, 18.6),
        new Point(3.4, 0, 18.6),
        new Point(3.4, 0, 10.1)
    ])
]

//Add RoomObjects
plot1.liHouses[0].liRooms[0].liRoomObjects = [
    new Door([      //Main Door
        new Point(16.6, 0, 3),
        new Point(17, 0, 3),
        new Point(17, 0, 5),
        new Point(16.6, 0, 5),
        new Point(16.6, 3, 3),
        new Point(17, 3, 3),
        new Point(17, 3, 5),
        new Point(16.6, 3, 5)
    ]),
    new Door([      //Middle Door
        new Point(9, 0, 9.9),
        new Point(11, 0, 9.9),
        new Point(11, 0, 10.1),
        new Point(9, 0, 10.1),
        new Point(9, 3, 9.9),
        new Point(11, 3, 9.9),
        new Point(11, 3, 10.1),
        new Point(9, 3, 10.1)
    ], false)
]

plot1.liHouses[0].liRooms[1].liRoomObjects = [
    new StraightRoomObject([    //RoomObject #1
        new Point(5, 0, 16),
        new Point(7, 0, 16),
        new Point(7, 0, 18),
        new Point(5, 0, 18),
        new Point(5, 2, 16),
        new Point(7, 2, 16),
        new Point(7, 2, 18),
        new Point(5, 2, 18)
    ])
]