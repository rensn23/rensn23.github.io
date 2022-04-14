import * as SCENE from "./JS_Classes.js";

const OW = 0.4; //Outer Wall thickness
const IW = 0.2; //Inner Wall thickness
const IO = 0.1; //Inner Wall offset

//Plot
export var plot3 = new SCENE.Plot(new SCENE.RectanglePlotSize(50, 40));

//House
plot3.addHouse(new SCENE.House(0, 1200));

//All Walls
plot3.liHouses[0].liWalls = [
    new SCENE.PolyOuterWall(1, [     //Left Lower Wall 1
        new SCENE.Point(5-OW, 0.1, 5-OW),
        new SCENE.Point(5, 0.1, 5-OW),
        new SCENE.Point(5, 0.1, 25),
        new SCENE.Point(5-OW, 0.1, 25),
        new SCENE.Point(5-OW, 2, 5-OW),
        new SCENE.Point(5, 2, 5-OW),
        new SCENE.Point(5, 2, 25),
        new SCENE.Point(5-OW, 2, 25)
    ]),
    new SCENE.PolyOuterWall(113, [   //Left Lower Wall 2
        new SCENE.Point(5-OW, 0.1, 25),
        new SCENE.Point(5, 0.1, 25),
        new SCENE.Point(5, 0.1, 31),
        new SCENE.Point(5-OW, 0.1, 31),
        new SCENE.Point(5-OW, 2, 25),
        new SCENE.Point(5, 2, 25),
        new SCENE.Point(5, 2, 31),
        new SCENE.Point(5-OW, 2, 31)
    ]),
    new SCENE.PolyOuterWall(114, [   //Left Lower Wall 3
        new SCENE.Point(5-OW, 0.1, 31),
        new SCENE.Point(5, 0.1, 31),
        new SCENE.Point(5, 0.1, 35+OW),
        new SCENE.Point(5-OW, 0.1, 35+OW),
        new SCENE.Point(5-OW, 2, 31),
        new SCENE.Point(5, 2, 31),
        new SCENE.Point(5, 2, 35+OW),
        new SCENE.Point(5-OW, 2, 35+OW)
    ]),
    new SCENE.PolyOuterWall(2, [     //Left Upper Wall 1
        new SCENE.Point(5-OW, 4, 5-OW),
        new SCENE.Point(5, 4, 5-OW),
        new SCENE.Point(5, 4, 25),
        new SCENE.Point(5-OW, 4, 25),
        new SCENE.Point(5-OW, 5, 5-OW),
        new SCENE.Point(5, 5, 5-OW),
        new SCENE.Point(5, 5, 25),
        new SCENE.Point(5-OW, 5, 25)
    ]),
    new SCENE.PolyOuterWall(115, [   //Left Upper Wall 2
        new SCENE.Point(5-OW, 4, 25),
        new SCENE.Point(5, 4, 25),
        new SCENE.Point(5, 4, 31),
        new SCENE.Point(5-OW, 4, 31),
        new SCENE.Point(5-OW, 5, 25),
        new SCENE.Point(5, 5, 25),
        new SCENE.Point(5, 5, 31),
        new SCENE.Point(5-OW, 5, 31)
    ]),
    new SCENE.PolyOuterWall(116, [   //Left Upper Wall 3
        new SCENE.Point(5-OW, 4, 31),
        new SCENE.Point(5, 4, 31),
        new SCENE.Point(5, 4, 35+OW),
        new SCENE.Point(5-OW, 4, 35+OW),
        new SCENE.Point(5-OW, 5, 31),
        new SCENE.Point(5, 5, 31),
        new SCENE.Point(5, 5, 35+OW),
        new SCENE.Point(5-OW, 5, 35+OW)
    ]),
    new SCENE.PolyOuterWall(3, [     //Left  Wall 1
        new SCENE.Point(5-OW, 2, 5-OW),
        new SCENE.Point(5, 2, 5-OW),
        new SCENE.Point(5, 2, 7),
        new SCENE.Point(5-OW, 2, 7),
        new SCENE.Point(5-OW, 4, 5-OW),
        new SCENE.Point(5, 4, 5-OW),
        new SCENE.Point(5, 4, 7),
        new SCENE.Point(5-OW, 4, 7)
    ]),
    new SCENE.PolyOuterWall(4, [     //Left  Wall 2
        new SCENE.Point(5-OW, 2, 11),
        new SCENE.Point(5, 2, 11),
        new SCENE.Point(5, 2, 18),
        new SCENE.Point(5-OW, 2, 18),
        new SCENE.Point(5-OW, 4, 11),
        new SCENE.Point(5, 4, 11),
        new SCENE.Point(5, 4, 18),
        new SCENE.Point(5-OW, 4, 18)
    ]),
    new SCENE.PolyOuterWall(5, [     //Left  Wall 3
        new SCENE.Point(5-OW, 2, 23),
        new SCENE.Point(5, 2, 23),
        new SCENE.Point(5, 2, 25),
        new SCENE.Point(5-OW, 2, 25),
        new SCENE.Point(5-OW, 4, 23),
        new SCENE.Point(5, 4, 23),
        new SCENE.Point(5, 4, 25),
        new SCENE.Point(5-OW, 4, 25)
    ]),
    new SCENE.PolyOuterWall(99, [     //Left  Wall 4
        new SCENE.Point(5-OW, 2, 25),
        new SCENE.Point(5, 2, 25),
        new SCENE.Point(5, 2, 26),
        new SCENE.Point(5-OW, 2, 26),
        new SCENE.Point(5-OW, 4, 25),
        new SCENE.Point(5, 4, 25),
        new SCENE.Point(5, 4, 26),
        new SCENE.Point(5-OW, 4, 26)
    ]),
    new SCENE.PolyOuterWall(6, [      //Left  Wall 5
        new SCENE.Point(5-OW, 2, 28),
        new SCENE.Point(5, 2, 28),
        new SCENE.Point(5, 2, 31),
        new SCENE.Point(5-OW, 2, 31),
        new SCENE.Point(5-OW, 4, 28),
        new SCENE.Point(5, 4, 28),
        new SCENE.Point(5, 4, 31),
        new SCENE.Point(5-OW, 4, 31)
    ]),
    new SCENE.PolyOuterWall(100, [   //Left  Wall 6
        new SCENE.Point(5-OW, 2, 31),
        new SCENE.Point(5, 2, 31),
        new SCENE.Point(5, 2, 35+OW),
        new SCENE.Point(5-OW, 2, 35+OW),
        new SCENE.Point(5-OW, 4, 31),
        new SCENE.Point(5, 4, 31),
        new SCENE.Point(5, 4, 35+OW),
        new SCENE.Point(5-OW, 4, 35+OW)
    ]),
    new SCENE.PolyOuterWall(7, [     //Top Lower Wall 1
        new SCENE.Point(5, 0.1, 5-OW),
        new SCENE.Point(14, 0.1, 5-OW),
        new SCENE.Point(14, 0.1, 5),
        new SCENE.Point(5, 0.1, 5),
        new SCENE.Point(5, 2, 5-OW),
        new SCENE.Point(14, 2, 5-OW),
        new SCENE.Point(14, 2, 5),
        new SCENE.Point(5, 2, 5)
    ]),
    new SCENE.PolyOuterWall(136, [     //Top Lower Wall 2
        new SCENE.Point(14, 0.1, 5-OW),
        new SCENE.Point(31, 0.1, 5-OW),
        new SCENE.Point(31, 0.1, 5),
        new SCENE.Point(14, 0.1, 5),
        new SCENE.Point(14, 2, 5-OW),
        new SCENE.Point(31, 2, 5-OW),
        new SCENE.Point(31, 2, 5),
        new SCENE.Point(14, 2, 5)
    ]),
    new SCENE.PolyOuterWall(117, [   //Top Lower Wall 3
        new SCENE.Point(31, 0.1, 5-OW),
        new SCENE.Point(45, 0.1, 5-OW),
        new SCENE.Point(45, 0.1, 5),
        new SCENE.Point(31, 0.1, 5),
        new SCENE.Point(31, 2, 5-OW),
        new SCENE.Point(45, 2, 5-OW),
        new SCENE.Point(45, 2, 5),
        new SCENE.Point(31, 2, 5)
    ]),
    new SCENE.PolyOuterWall(8, [     //Top Upper Wall 1
        new SCENE.Point(5, 4, 5-OW),
        new SCENE.Point(14, 4, 5-OW),
        new SCENE.Point(14, 4, 5),
        new SCENE.Point(5, 4, 5),
        new SCENE.Point(5, 5, 5-OW),
        new SCENE.Point(14, 5, 5-OW),
        new SCENE.Point(14, 5, 5),
        new SCENE.Point(5, 5, 5)
    ]),
    new SCENE.PolyOuterWall(135, [     //Top Upper Wall 2
        new SCENE.Point(14, 4, 5-OW),
        new SCENE.Point(31, 4, 5-OW),
        new SCENE.Point(31, 4, 5),
        new SCENE.Point(14, 4, 5),
        new SCENE.Point(14, 5, 5-OW),
        new SCENE.Point(31, 5, 5-OW),
        new SCENE.Point(31, 5, 5),
        new SCENE.Point(14, 5, 5)
    ]),
    new SCENE.PolyOuterWall(118, [   //Top Upper Wall 3
        new SCENE.Point(31, 4, 5-OW),
        new SCENE.Point(45, 4, 5-OW),
        new SCENE.Point(45, 4, 5),
        new SCENE.Point(31, 4, 5),
        new SCENE.Point(31, 5, 5-OW),
        new SCENE.Point(45, 5, 5-OW),
        new SCENE.Point(45, 5, 5),
        new SCENE.Point(31, 5, 5)
    ]),
    new SCENE.PolyOuterWall(9, [     //Top Wall 1
        new SCENE.Point(5, 2, 5-OW),
        new SCENE.Point(7, 2, 5-OW),
        new SCENE.Point(7, 2, 5),
        new SCENE.Point(5, 2, 5),
        new SCENE.Point(5, 4, 5-OW),
        new SCENE.Point(7, 4, 5-OW),
        new SCENE.Point(7, 4, 5),
        new SCENE.Point(5, 4, 5)
    ]),
    new SCENE.PolyOuterWall(10, [     //Top Wall 2
        new SCENE.Point(13, 2, 5-OW),
        new SCENE.Point(22, 2, 5-OW),
        new SCENE.Point(22, 2, 5),
        new SCENE.Point(13, 2, 5),
        new SCENE.Point(13, 4, 5-OW),
        new SCENE.Point(22, 4, 5-OW),
        new SCENE.Point(22, 4, 5),
        new SCENE.Point(13, 4, 5)
    ]),
    new SCENE.PolyOuterWall(11, [     //Top Wall 3
        new SCENE.Point(29, 2, 5-OW),
        new SCENE.Point(31, 2, 5-OW),
        new SCENE.Point(31, 2, 5),
        new SCENE.Point(29, 2, 5),
        new SCENE.Point(29, 4, 5-OW),
        new SCENE.Point(31, 4, 5-OW),
        new SCENE.Point(31, 4, 5),
        new SCENE.Point(29, 4, 5)
    ]),
    new SCENE.PolyOuterWall(101, [    //Top Wall 4
        new SCENE.Point(31, 2, 5-OW),
        new SCENE.Point(45, 2, 5-OW),
        new SCENE.Point(45, 2, 5),
        new SCENE.Point(31, 2, 5),
        new SCENE.Point(31, 4, 5-OW),
        new SCENE.Point(45, 4, 5-OW),
        new SCENE.Point(45, 4, 5),
        new SCENE.Point(31, 4, 5)
    ]),
    new SCENE.PolyOuterWall(12, [     //Right Lower Wall 1
        new SCENE.Point(45, 0.1, 5-OW),
        new SCENE.Point(45+OW, 0.1, 5-OW),
        new SCENE.Point(45+OW, 0.1, 21),
        new SCENE.Point(45, 0.1, 21),
        new SCENE.Point(45, 2, 5-OW),
        new SCENE.Point(45+OW, 2, 5-OW),
        new SCENE.Point(45+OW, 2, 21),
        new SCENE.Point(45, 2, 21)
    ]),
    new SCENE.PolyOuterWall(119, [     //Right Lower Wall 2
        new SCENE.Point(45, 0.1, 21),
        new SCENE.Point(45+OW, 0.1, 21),
        new SCENE.Point(45+OW, 0.1, 35+OW),
        new SCENE.Point(45, 0.1, 35+OW),
        new SCENE.Point(45, 2, 21),
        new SCENE.Point(45+OW, 2, 21),
        new SCENE.Point(45+OW, 2, 35+OW),
        new SCENE.Point(45, 2, 35+OW)
    ]),
    new SCENE.PolyOuterWall(13, [     // Right Upper Wall 1
        new SCENE.Point(45, 4, 5-OW),
        new SCENE.Point(45+OW, 4, 5-OW),
        new SCENE.Point(45+OW, 4, 21),
        new SCENE.Point(45, 4, 21),
        new SCENE.Point(45, 5, 5-OW),
        new SCENE.Point(45+OW, 5, 5-OW),
        new SCENE.Point(45+OW, 5, 21),
        new SCENE.Point(45, 5, 21)
    ]),
    new SCENE.PolyOuterWall(120, [     // Right Upper Wall 2
        new SCENE.Point(45, 4, 21),
        new SCENE.Point(45+OW, 4, 21),
        new SCENE.Point(45+OW, 4, 35+OW),
        new SCENE.Point(45, 4, 35+OW),
        new SCENE.Point(45, 5, 21),
        new SCENE.Point(45+OW, 5, 21),
        new SCENE.Point(45+OW, 5, 35+OW),
        new SCENE.Point(45, 5, 35+OW)
    ]),
    new SCENE.PolyOuterWall(14, [     // Right Wall 1
        new SCENE.Point(45, 2, 5-OW),
        new SCENE.Point(45+OW, 2, 5-OW),
        new SCENE.Point(45+OW, 2, 6),
        new SCENE.Point(45, 2, 6),
        new SCENE.Point(45, 4, 5-OW),
        new SCENE.Point(45+OW, 4, 5-OW),
        new SCENE.Point(45+OW, 4, 6),
        new SCENE.Point(45, 4, 6)
    ]),
    new SCENE.PolyOuterWall(15, [     // Right Wall 2
        new SCENE.Point(45, 2, 9),
        new SCENE.Point(45+OW, 2, 9),
        new SCENE.Point(45+OW, 2, 15),
        new SCENE.Point(45, 2, 15),
        new SCENE.Point(45, 4, 9),
        new SCENE.Point(45+OW, 4, 9),
        new SCENE.Point(45+OW, 4, 15),
        new SCENE.Point(45, 4, 15)
    ]),
    new SCENE.PolyOuterWall(16, [     // Right Wall 3
        new SCENE.Point(45, 2, 18),
        new SCENE.Point(45+OW, 2, 18),
        new SCENE.Point(45+OW, 2, 21),
        new SCENE.Point(45, 2, 21),
        new SCENE.Point(45, 4, 18),
        new SCENE.Point(45+OW, 4, 18),
        new SCENE.Point(45+OW, 4, 21),
        new SCENE.Point(45, 4, 21)
    ]),
    new SCENE.PolyOuterWall(102, [    // Right Wall 4
        new SCENE.Point(45, 2, 21),
        new SCENE.Point(45+OW, 2, 21),
        new SCENE.Point(45+OW, 2, 24),
        new SCENE.Point(45, 2, 24),
        new SCENE.Point(45, 4, 21),
        new SCENE.Point(45+OW, 4, 21),
        new SCENE.Point(45+OW, 4, 24),
        new SCENE.Point(45, 4, 24)
    ]),
    new SCENE.PolyOuterWall(17, [     // Right Wall 5
        new SCENE.Point(45, 2, 27),
        new SCENE.Point(45+OW, 2, 27),
        new SCENE.Point(45+OW, 2, 28),
        new SCENE.Point(45, 2, 28),
        new SCENE.Point(45, 4, 27),
        new SCENE.Point(45+OW, 4, 27),
        new SCENE.Point(45+OW, 4, 28),
        new SCENE.Point(45, 4, 28)
    ]),
    new SCENE.PolyOuterWall(18, [     // Right Wall 6
        new SCENE.Point(45, 2, 31),
        new SCENE.Point(45+OW, 2, 31),
        new SCENE.Point(45+OW, 2, 35+OW),
        new SCENE.Point(45, 2, 35+OW),
        new SCENE.Point(45, 4, 31),
        new SCENE.Point(45+OW, 4, 31),
        new SCENE.Point(45+OW, 4, 35+OW),
        new SCENE.Point(45, 4, 35+OW)
    ]),
    new SCENE.PolyOuterWall(19, [     // Bottom Lower Wall 1
        new SCENE.Point(5, 0.1, 35),
        new SCENE.Point(10, 0.1, 35),
        new SCENE.Point(10, 0.1, 35+OW),
        new SCENE.Point(5, 0.1, 35+OW),
        new SCENE.Point(5, 2, 35),
        new SCENE.Point(10, 2, 35),
        new SCENE.Point(10, 2, 35+OW),
        new SCENE.Point(5, 2, 35+OW)
    ]),
    new SCENE.PolyOuterWall(121, [     // Bottom Lower Wall 2
        new SCENE.Point(10, 0.1, 35),
        new SCENE.Point(14+IO, 0.1, 35),
        new SCENE.Point(14+IO, 0.1, 35+OW),
        new SCENE.Point(10, 0.1, 35+OW),
        new SCENE.Point(10, 2, 35),
        new SCENE.Point(14+IO, 2, 35),
        new SCENE.Point(14+IO, 2, 35+OW),
        new SCENE.Point(10, 2, 35+OW)
    ]),
    new SCENE.PolyOuterWall(20, [     // Bottom Lower Wall 3
        new SCENE.Point(17, 0.1, 35),
        new SCENE.Point(19, 0.1, 35),
        new SCENE.Point(19, 0.1, 35+OW),
        new SCENE.Point(17, 0.1, 35+OW),
        new SCENE.Point(17, 2, 35),
        new SCENE.Point(19, 2, 35),
        new SCENE.Point(19, 2, 35+OW),
        new SCENE.Point(17, 2, 35+OW)
    ]),
    new SCENE.PolyOuterWall(122, [    // Bottom Lower Wall 4
        new SCENE.Point(19, 0.1, 35),
        new SCENE.Point(23, 0.1, 35),
        new SCENE.Point(23, 0.1, 35+OW),
        new SCENE.Point(19, 0.1, 35+OW),
        new SCENE.Point(19, 2, 35),
        new SCENE.Point(23, 2, 35),
        new SCENE.Point(23, 2, 35+OW),
        new SCENE.Point(19, 2, 35+OW)
    ]),
    new SCENE.PolyOuterWall(123, [    // Bottom Lower Wall 5
        new SCENE.Point(23, 0.1, 35),
        new SCENE.Point(35, 0.1, 35),
        new SCENE.Point(35, 0.1, 35+OW),
        new SCENE.Point(23, 0.1, 35+OW),
        new SCENE.Point(23, 2, 35),
        new SCENE.Point(35, 2, 35),
        new SCENE.Point(35, 2, 35+OW),
        new SCENE.Point(23, 2, 35+OW)
    ]),
    new SCENE.PolyOuterWall(124, [     // Bottom Lower Wall 6
        new SCENE.Point(35, 0.1, 35),
        new SCENE.Point(45, 0.1, 35),
        new SCENE.Point(45, 0.1, 35+OW),
        new SCENE.Point(35, 0.1, 35+OW),
        new SCENE.Point(35, 2, 35),
        new SCENE.Point(45, 2, 35),
        new SCENE.Point(45, 2, 35+OW),
        new SCENE.Point(35, 2, 35+OW)
    ]),
    new SCENE.PolyOuterWall(21, [     // Bottom Upper Wall 1
        new SCENE.Point(5, 4, 35),
        new SCENE.Point(10, 4, 35),
        new SCENE.Point(10, 4, 35+OW),
        new SCENE.Point(5, 4, 35+OW),
        new SCENE.Point(5, 5, 35),
        new SCENE.Point(10, 5, 35),
        new SCENE.Point(10, 5, 35+OW),
        new SCENE.Point(5, 5, 35+OW)
    ]),
    new SCENE.PolyOuterWall(125, [    // Bottom Upper Wall 2
        new SCENE.Point(10, 4, 35),
        new SCENE.Point(14, 4, 35),
        new SCENE.Point(14, 4, 35+OW),
        new SCENE.Point(10, 4, 35+OW),
        new SCENE.Point(10, 5, 35),
        new SCENE.Point(14, 5, 35),
        new SCENE.Point(14, 5, 35+OW),
        new SCENE.Point(10, 5, 35+OW)
    ]),
    new SCENE.PolyOuterWall(126, [    // Bottom Upper Wall 3
        new SCENE.Point(14, 4, 35),
        new SCENE.Point(19, 4, 35),
        new SCENE.Point(19, 4, 35+OW),
        new SCENE.Point(14, 4, 35+OW),
        new SCENE.Point(14, 5, 35),
        new SCENE.Point(19, 5, 35),
        new SCENE.Point(19, 5, 35+OW),
        new SCENE.Point(14, 5, 35+OW)
    ]),
    new SCENE.PolyOuterWall(127, [    // Bottom Upper Wall 4
        new SCENE.Point(19, 4, 35),
        new SCENE.Point(23, 4, 35),
        new SCENE.Point(23, 4, 35+OW),
        new SCENE.Point(19, 4, 35+OW),
        new SCENE.Point(19, 5, 35),
        new SCENE.Point(23, 5, 35),
        new SCENE.Point(23, 5, 35+OW),
        new SCENE.Point(19, 5, 35+OW)
    ]),
    new SCENE.PolyOuterWall(128, [    // Bottom Upper Wall 5
        new SCENE.Point(23, 4, 35),
        new SCENE.Point(35, 4, 35),
        new SCENE.Point(35, 4, 35+OW),
        new SCENE.Point(23, 4, 35+OW),
        new SCENE.Point(23, 5, 35),
        new SCENE.Point(35, 5, 35),
        new SCENE.Point(35, 5, 35+OW),
        new SCENE.Point(23, 5, 35+OW)
    ]),
    new SCENE.PolyOuterWall(129, [    // Bottom Upper Wall 6
        new SCENE.Point(35, 4, 35),
        new SCENE.Point(45, 4, 35),
        new SCENE.Point(45, 4, 35+OW),
        new SCENE.Point(35, 4, 35+OW),
        new SCENE.Point(35, 5, 35),
        new SCENE.Point(45, 5, 35),
        new SCENE.Point(45, 5, 35+OW),
        new SCENE.Point(35, 5, 35+OW)
    ]),
    new SCENE.PolyOuterWall(22, [     // Bottom Wall 1
        new SCENE.Point(5, 2, 35),
        new SCENE.Point(10, 2, 35),
        new SCENE.Point(10, 2, 35+OW),
        new SCENE.Point(5, 2, 35+OW),
        new SCENE.Point(5, 4, 35),
        new SCENE.Point(10, 4, 35),
        new SCENE.Point(10, 4, 35+OW),
        new SCENE.Point(5, 4, 35+OW)
    ]),
    new SCENE.PolyOuterWall(103, [    // Bottom Wall 2
        new SCENE.Point(10, 2, 35),
        new SCENE.Point(11, 2, 35),
        new SCENE.Point(11, 2, 35+OW),
        new SCENE.Point(10, 2, 35+OW),
        new SCENE.Point(10, 4, 35),
        new SCENE.Point(11, 4, 35),
        new SCENE.Point(11, 4, 35+OW),
        new SCENE.Point(10, 4, 35+OW)
    ]),
    new SCENE.PolyOuterWall(23, [     // Bottom Wall 3
        new SCENE.Point(13, 2, 35),
        new SCENE.Point(14+IO, 2, 35),
        new SCENE.Point(14+IO, 2, 35+OW),
        new SCENE.Point(13, 2, 35+OW),
        new SCENE.Point(13, 4, 35),
        new SCENE.Point(14+IO, 4, 35),
        new SCENE.Point(14+IO, 4, 35+OW),
        new SCENE.Point(13, 4, 35+OW)
    ]),
    new SCENE.PolyOuterWall(24, [     // Bottom Wall 4
        new SCENE.Point(17, 2, 35),
        new SCENE.Point(19, 2, 35),
        new SCENE.Point(19, 2, 35+OW),
        new SCENE.Point(17, 2, 35+OW),
        new SCENE.Point(17, 4, 35),
        new SCENE.Point(19, 4, 35),
        new SCENE.Point(19, 4, 35+OW),
        new SCENE.Point(17, 4, 35+OW)
    ]),
    new SCENE.PolyOuterWall(104, [    // Bottom Wall 5
        new SCENE.Point(19, 2, 35),
        new SCENE.Point(23, 2, 35),
        new SCENE.Point(23, 2, 35+OW),
        new SCENE.Point(19, 2, 35+OW),
        new SCENE.Point(19, 4, 35),
        new SCENE.Point(23, 4, 35),
        new SCENE.Point(23, 4, 35+OW),
        new SCENE.Point(19, 4, 35+OW)
    ]),
    new SCENE.PolyOuterWall(105, [    // Bottom Wall 6
        new SCENE.Point(23, 2, 35),
        new SCENE.Point(29, 2, 35),
        new SCENE.Point(29, 2, 35+OW),
        new SCENE.Point(23, 2, 35+OW),
        new SCENE.Point(23, 4, 35),
        new SCENE.Point(29, 4, 35),
        new SCENE.Point(29, 4, 35+OW),
        new SCENE.Point(23, 4, 35+OW)
    ]),
    new SCENE.PolyOuterWall(25, [     // Bottom Wall 7
        new SCENE.Point(31, 2, 35),
        new SCENE.Point(35, 2, 35),
        new SCENE.Point(35, 2, 35+OW),
        new SCENE.Point(31, 2, 35+OW),
        new SCENE.Point(31, 4, 35),
        new SCENE.Point(35, 4, 35),
        new SCENE.Point(35, 4, 35+OW),
        new SCENE.Point(31, 4, 35+OW)
    ]),
    new SCENE.PolyOuterWall(106, [    // Bottom Wall 8
        new SCENE.Point(35, 2, 35),
        new SCENE.Point(45, 2, 35),
        new SCENE.Point(45, 2, 35+OW),
        new SCENE.Point(35, 2, 35+OW),
        new SCENE.Point(35, 4, 35),
        new SCENE.Point(45, 4, 35),
        new SCENE.Point(45, 4, 35+OW),
        new SCENE.Point(35, 4, 35+OW)
    ]),                         // Laundry Room Walls
    new SCENE.PolyInnerWall(30, [
        new SCENE.Point(14-IO, 0.1, 25),
        new SCENE.Point(14+IO, 0.1, 25),
        new SCENE.Point(14+IO, 0.1, 27),
        new SCENE.Point(14-IO, 0.1, 27),
        new SCENE.Point(14-IO, 5, 25),
        new SCENE.Point(14+IO, 5, 25),
        new SCENE.Point(14+IO, 5, 27),
        new SCENE.Point(14-IO, 5, 27)
    ]),
    new SCENE.PolyInnerWall(31, [
        new SCENE.Point(14-IO, 4, 27),
        new SCENE.Point(14+IO, 4, 27),
        new SCENE.Point(14+IO, 4, 30),
        new SCENE.Point(14-IO, 4, 30),
        new SCENE.Point(14-IO, 5, 27),
        new SCENE.Point(14+IO, 5, 27),
        new SCENE.Point(14+IO, 5, 30),
        new SCENE.Point(14-IO, 5, 30)
    ]),
    new SCENE.PolyInnerWall(32, [
        new SCENE.Point(14-IO, 0.1, 30),
        new SCENE.Point(14+IO, 0.1, 30),
        new SCENE.Point(14+IO, 0.1, 31),
        new SCENE.Point(14-IO, 0.1, 31),
        new SCENE.Point(14-IO, 5, 30),
        new SCENE.Point(14+IO, 5, 30),
        new SCENE.Point(14+IO, 5, 31),
        new SCENE.Point(14-IO, 5, 31)
    ]),                         // Closet Walls
    new SCENE.PolyInnerWall(36, [
        new SCENE.Point(5, 0.1, 31-IO),
        new SCENE.Point(6, 0.1, 31-IO),
        new SCENE.Point(6, 0.1, 31+IO),
        new SCENE.Point(5, 0.1, 31+IO),
        new SCENE.Point(5, 5, 31-IO),
        new SCENE.Point(6, 5, 31-IO),
        new SCENE.Point(6, 5, 31+IO),
        new SCENE.Point(5, 5, 31+IO)
    ]),
    new SCENE.PolyInnerWall(37, [
        new SCENE.Point(9, 0.1, 31-IO),
        new SCENE.Point(10, 0.1, 31-IO),
        new SCENE.Point(10, 0.1, 31+IO),
        new SCENE.Point(9, 0.1, 31+IO),
        new SCENE.Point(9, 5, 31-IO),
        new SCENE.Point(10, 5, 31-IO),
        new SCENE.Point(10, 5, 31+IO),
        new SCENE.Point(9, 5, 31+IO)
    ]),
    new SCENE.PolyInnerWall(38, [
        new SCENE.Point(6, 4, 31-IO),
        new SCENE.Point(9, 4, 31-IO),
        new SCENE.Point(9, 4, 31+IO),
        new SCENE.Point(6, 4, 31+IO),
        new SCENE.Point(6, 5, 31-IO),
        new SCENE.Point(9, 5, 31-IO),
        new SCENE.Point(9, 5, 31+IO),
        new SCENE.Point(6, 5, 31+IO)
    ]),                         // WC Walls
    new SCENE.PolyInnerWall(41, [
        new SCENE.Point(10, 0.1, 31-IO),
        new SCENE.Point(14-IO, 0.1, 31-IO),
        new SCENE.Point(14-IO, 0.1, 31+IO),
        new SCENE.Point(10, 0.1, 31+IO),
        new SCENE.Point(10, 5, 31-IO),
        new SCENE.Point(14-IO, 5, 31-IO),
        new SCENE.Point(14-IO, 5, 31+IO),
        new SCENE.Point(10, 5, 31+IO),
    ]),
    new SCENE.PolyInnerWall(42, [
        new SCENE.Point(10-IO, 0.1, 31+IO),
        new SCENE.Point(10+IO, 0.1, 31+IO),
        new SCENE.Point(10+IO, 0.1, 35),
        new SCENE.Point(10-IO, 0.1, 35),
        new SCENE.Point(10-IO, 5, 31+IO),
        new SCENE.Point(10+IO, 5, 31+IO),
        new SCENE.Point(10+IO, 5, 35),
        new SCENE.Point(10-IO, 5, 35)
    ]),
    new SCENE.PolyInnerWall(43, [
        new SCENE.Point(14-IO, 0.1, 31),
        new SCENE.Point(14+IO, 0.1, 31),
        new SCENE.Point(14+IO, 0.1, 31.5),
        new SCENE.Point(14-IO, 0.1, 31.5),
        new SCENE.Point(14-IO, 5, 31),
        new SCENE.Point(14+IO, 5, 31),
        new SCENE.Point(14+IO, 5, 31.5),
        new SCENE.Point(14-IO, 5, 31.5)
    ]),
    new SCENE.PolyInnerWall(44, [
        new SCENE.Point(14-IO, 0.1, 33.5),
        new SCENE.Point(14+IO, 0.1, 33.5),
        new SCENE.Point(14+IO, 0.1, 35),
        new SCENE.Point(14-IO, 0.1, 35),
        new SCENE.Point(14-IO, 5, 33.5),
        new SCENE.Point(14+IO, 5, 33.5),
        new SCENE.Point(14+IO, 5, 35),
        new SCENE.Point(14-IO, 5, 35)
    ]),
    new SCENE.PolyInnerWall(45, [
        new SCENE.Point(14-IO, 4, 31.5),
        new SCENE.Point(14+IO, 4, 31.5),
        new SCENE.Point(14+IO, 4, 33.5),
        new SCENE.Point(14-IO, 4, 33.5),
        new SCENE.Point(14-IO, 5, 31.5),
        new SCENE.Point(14+IO, 5, 31.5),
        new SCENE.Point(14+IO, 5, 33.5),
        new SCENE.Point(14-IO, 5, 33.5)
    ]),                         // Kitchen Walls
    new SCENE.PolyInnerWall(49, [
        new SCENE.Point(5, 0.1, 25-IO),
        new SCENE.Point(14-IO, 0.1, 25-IO),
        new SCENE.Point(14-IO, 0.1, 25+IO),
        new SCENE.Point(5, 0.1, 25+IO),
        new SCENE.Point(5, 5, 25-IO),
        new SCENE.Point(14-IO, 5, 25-IO),
        new SCENE.Point(14-IO, 5, 25+IO),
        new SCENE.Point(5, 5, 25+IO)
    ]),
    new SCENE.PolyInnerWall(50, [
        new SCENE.Point(14-IO, 0.1, 18),
        new SCENE.Point(14+IO, 0.1, 18),
        new SCENE.Point(14+IO, 0.1, 21),
        new SCENE.Point(14-IO, 0.1, 21),
        new SCENE.Point(14-IO, 5, 18),
        new SCENE.Point(14+IO, 5, 18),
        new SCENE.Point(14+IO, 5, 21),
        new SCENE.Point(14-IO, 5, 21)
    ]),
    new SCENE.PolyInnerWall(110, [
        new SCENE.Point(14-IO, 0.1, 21),
        new SCENE.Point(14+IO, 0.1, 21),
        new SCENE.Point(14+IO, 0.1, 25),
        new SCENE.Point(14-IO, 0.1, 25),
        new SCENE.Point(14-IO, 5, 21),
        new SCENE.Point(14+IO, 5, 21),
        new SCENE.Point(14+IO, 5, 25),
        new SCENE.Point(14-IO, 5, 25)
    ]),                         // Living Room Walls
    new SCENE.PolyInnerWall(55, [
        new SCENE.Point(31-IO, 0.1, 5),
        new SCENE.Point(31+IO, 0.1, 5),
        new SCENE.Point(31+IO, 0.1, 21-IO),
        new SCENE.Point(31-IO, 0.1, 21-IO),
        new SCENE.Point(31-IO, 5, 5),
        new SCENE.Point(31+IO, 5, 5),
        new SCENE.Point(31+IO, 5, 21-IO),
        new SCENE.Point(31-IO, 5, 21-IO)
    ]),                         // Hallway Walls
    new SCENE.PolyInnerWall(58, [
        new SCENE.Point(19, 0.1, 21-IO),
        new SCENE.Point(31, 0.1, 21-IO),
        new SCENE.Point(31, 0.1, 21+IO),
        new SCENE.Point(19, 0.1, 21+IO),
        new SCENE.Point(19, 5, 21-IO),
        new SCENE.Point(31, 5, 21-IO),
        new SCENE.Point(31, 5, 21+IO),
        new SCENE.Point(19, 5, 21+IO)
    ]),
    new SCENE.PolyInnerWall(108, [
        new SCENE.Point(21, 0.1, 25-IO),
        new SCENE.Point(28, 0.1, 25-IO),
        new SCENE.Point(28, 0.1, 25+IO),
        new SCENE.Point(21, 0.1, 25+IO),
        new SCENE.Point(21, 5, 25-IO),
        new SCENE.Point(28, 5, 25-IO),
        new SCENE.Point(28, 5, 25+IO),
        new SCENE.Point(21, 5, 25+IO)
    ]),
    new SCENE.PolyInnerWall(60, [
        new SCENE.Point(31, 0.1, 25-IO),
        new SCENE.Point(35-IO, 0.1, 25-IO),
        new SCENE.Point(35-IO, 0.1, 25+IO),
        new SCENE.Point(31, 0.1, 25+IO),
        new SCENE.Point(31, 5, 25-IO),
        new SCENE.Point(35-IO, 5, 25-IO),
        new SCENE.Point(35-IO, 5, 25+IO),
        new SCENE.Point(31, 5, 25+IO)
    ]),
    new SCENE.PolyInnerWall(61, [
        new SCENE.Point(28, 4, 25-IO),
        new SCENE.Point(31, 4, 25-IO),
        new SCENE.Point(31, 4, 25+IO),
        new SCENE.Point(28, 4, 25+IO),
        new SCENE.Point(28, 5, 25-IO),
        new SCENE.Point(31, 5, 25-IO),
        new SCENE.Point(31, 5, 25+IO),
        new SCENE.Point(28, 5, 25+IO)
    ]),                         // Bedroom 1 Walls
    new SCENE.PolyInnerWall(107, [
        new SCENE.Point(31, 0.1, 21-IO),
        new SCENE.Point(32, 0.1, 21-IO),
        new SCENE.Point(32, 0.1, 21+IO),
        new SCENE.Point(31, 0.1, 21+IO),
        new SCENE.Point(31, 5, 21-IO),
        new SCENE.Point(32, 5, 21-IO),
        new SCENE.Point(32, 5, 21+IO),
        new SCENE.Point(31, 5, 21+IO)
    ]),
    new SCENE.PolyInnerWall(63, [
        new SCENE.Point(32, 4, 21-IO),
        new SCENE.Point(34, 4, 21-IO),
        new SCENE.Point(34, 4, 21+IO),
        new SCENE.Point(32, 4, 21+IO),
        new SCENE.Point(32, 5, 21-IO),
        new SCENE.Point(34, 5, 21-IO),
        new SCENE.Point(34, 5, 21+IO),
        new SCENE.Point(32, 5, 21+IO)
    ]),
    new SCENE.PolyInnerWall(64, [
        new SCENE.Point(34, 0.1, 21-IO),
        new SCENE.Point(35, 0.1, 21-IO),
        new SCENE.Point(35, 0.1, 21+IO),
        new SCENE.Point(34, 0.1, 21+IO),
        new SCENE.Point(34, 5, 21-IO),
        new SCENE.Point(35, 5, 21-IO),
        new SCENE.Point(35, 5, 21+IO),
        new SCENE.Point(34, 5, 21+IO)
    ]),
    new SCENE.PolyInnerWall(111, [
        new SCENE.Point(35, 0.1, 21-IO),
        new SCENE.Point(45, 0.1, 21-IO),
        new SCENE.Point(45, 0.1, 21+IO),
        new SCENE.Point(35, 0.1, 21+IO),
        new SCENE.Point(35, 5, 21-IO),
        new SCENE.Point(45, 5, 21-IO),
        new SCENE.Point(45, 5, 21+IO),
        new SCENE.Point(35, 5, 21+IO)
    ]),                         // Bedroom 2 Walls
    new SCENE.PolyInnerWall(69, [
        new SCENE.Point(35-IO, 0.1, 21+IO),
        new SCENE.Point(35+IO, 0.1, 21+IO),
        new SCENE.Point(35+IO, 0.1, 22),
        new SCENE.Point(35-IO, 0.1, 22),
        new SCENE.Point(35-IO, 5, 21+IO),
        new SCENE.Point(35+IO, 5, 21+IO),
        new SCENE.Point(35+IO, 5, 22),
        new SCENE.Point(35-IO, 5, 22)
    ]),
    new SCENE.PolyInnerWall(70, [
        new SCENE.Point(35-IO, 4, 22),
        new SCENE.Point(35+IO, 4, 22),
        new SCENE.Point(35+IO, 4, 24),
        new SCENE.Point(35-IO, 4, 24),
        new SCENE.Point(35-IO, 5, 22),
        new SCENE.Point(35+IO, 5, 22),
        new SCENE.Point(35+IO, 5, 24),
        new SCENE.Point(35-IO, 5, 24)
    ]),
    new SCENE.PolyInnerWall(71, [
        new SCENE.Point(35-IO, 0.1, 24),
        new SCENE.Point(35+IO, 0.1, 24),
        new SCENE.Point(35+IO, 0.1, 25),
        new SCENE.Point(35-IO, 0.1, 25),
        new SCENE.Point(35-IO, 5, 24),
        new SCENE.Point(35+IO, 5, 24),
        new SCENE.Point(35+IO, 5, 25),
        new SCENE.Point(35-IO, 5, 25)
    ]),
    new SCENE.PolyInnerWall(112, [
        new SCENE.Point(35-IO, 0.1, 25),
        new SCENE.Point(35+IO, 0.1, 25),
        new SCENE.Point(35+IO, 0.1, 35),
        new SCENE.Point(35-IO, 0.1, 35),
        new SCENE.Point(35-IO, 5, 25),
        new SCENE.Point(35+IO, 5, 25),
        new SCENE.Point(35+IO, 5, 35),
        new SCENE.Point(35-IO, 5, 35)
    ]),                         // Bathroom Walls
    new SCENE.PolyInnerWall(83, [
        new SCENE.Point(21-IO, 0.1, 25+IO),
        new SCENE.Point(21+IO, 0.1, 25+IO),
        new SCENE.Point(21+IO, 0.1, 30-IO),
        new SCENE.Point(21-IO, 0.1, 30-IO),
        new SCENE.Point(21-IO, 5, 25+IO),
        new SCENE.Point(21+IO, 5, 25+IO),
        new SCENE.Point(21+IO, 5, 30-IO),
        new SCENE.Point(21-IO, 5, 30-IO)
    ]),                         // Sauna Walls
    new SCENE.PolyInnerWall(88, [
        new SCENE.Point(19-IO, 0.1, 30+IO),
        new SCENE.Point(19+IO, 0.1, 30+IO),
        new SCENE.Point(19+IO, 0.1, 35),
        new SCENE.Point(19-IO, 0.1, 35),
        new SCENE.Point(19-IO, 5, 30+IO),
        new SCENE.Point(19+IO, 5, 30+IO),
        new SCENE.Point(19+IO, 5, 35),
        new SCENE.Point(19-IO, 5, 35),
    ]),
    new SCENE.PolyInnerWall(89, [
        new SCENE.Point(19-IO, 0.1, 30-IO),
        new SCENE.Point(21, 0.1, 30-IO),
        new SCENE.Point(21, 0.1, 30+IO),
        new SCENE.Point(19-IO, 0.1, 30+IO),
        new SCENE.Point(19-IO, 5, 30-IO),
        new SCENE.Point(21, 5, 30-IO),
        new SCENE.Point(21, 5, 30+IO),
        new SCENE.Point(19-IO, 5, 30+IO)
    ]),
    new SCENE.PolyInnerWall(109, [
        new SCENE.Point(21, 0.1, 30-IO),
        new SCENE.Point(23-IO, 0.1, 30-IO),
        new SCENE.Point(23-IO, 0.1, 30+IO),
        new SCENE.Point(21, 0.1, 30+IO),
        new SCENE.Point(21, 5, 30-IO),
        new SCENE.Point(23-IO, 5, 30-IO),
        new SCENE.Point(23-IO, 5, 30+IO),
        new SCENE.Point(21, 5, 30+IO)
    ]),
    new SCENE.PolyInnerWall(90, [
        new SCENE.Point(23-IO, 0.1, 30-IO),
        new SCENE.Point(23+IO, 0.1, 30-IO),
        new SCENE.Point(23+IO, 0.1, 32),
        new SCENE.Point(23-IO, 0.1, 32),
        new SCENE.Point(23-IO, 5, 30-IO),
        new SCENE.Point(23+IO, 5, 30-IO),
        new SCENE.Point(23+IO, 5, 32),
        new SCENE.Point(23-IO, 5, 32),
    ]),
    new SCENE.PolyInnerWall(91, [
        new SCENE.Point(23-IO, 4, 32),
        new SCENE.Point(23+IO, 4, 32),
        new SCENE.Point(23+IO, 4, 34),
        new SCENE.Point(23-IO, 4, 34),
        new SCENE.Point(23-IO, 5, 32),
        new SCENE.Point(23+IO, 5, 32),
        new SCENE.Point(23+IO, 5, 34),
        new SCENE.Point(23-IO, 5, 34),
    ]),
    new SCENE.PolyInnerWall(92, [
        new SCENE.Point(23-IO, 0.1, 34),
        new SCENE.Point(23+IO, 0.1, 34),
        new SCENE.Point(23+IO, 0.1, 35),
        new SCENE.Point(23-IO, 0.1, 35),
        new SCENE.Point(23-IO, 5, 34),
        new SCENE.Point(23+IO, 5, 34),
        new SCENE.Point(23+IO, 5, 35),
        new SCENE.Point(23-IO, 5, 35),
    ]),                         // Stairway
    new SCENE.PolyInnerWall(59, [
        new SCENE.Point(19-IO, 0.1, 25-IO),
        new SCENE.Point(21, 0.1, 25-IO),
        new SCENE.Point(21, 0.1, 25+IO),
        new SCENE.Point(19-IO, 0.1, 25+IO),
        new SCENE.Point(19-IO, 5, 25-IO),
        new SCENE.Point(21, 5, 25-IO),
        new SCENE.Point(21, 5, 25+IO),
        new SCENE.Point(19-IO, 5, 25+IO)
    ]),
]

//All RoomObjects
plot3.liHouses[0].liRoomObjs = [
    new SCENE.Door(28, [                  // Entry Room Door
        new SCENE.Point(14+IO, 0.1, 35),
        new SCENE.Point(17, 0.1, 35),
        new SCENE.Point(17, 0.1, 35+IW),
        new SCENE.Point(14+IO, 0.1, 35+IW),
        new SCENE.Point(14+IO, 4, 35),
        new SCENE.Point(17, 4, 35),
        new SCENE.Point(17, 4, 35+IW),
        new SCENE.Point(14+IO, 4, 35+IW)
    ], true),
    new SCENE.RoomExit(133, [             // Entry-Room-Hallway Exit
        new SCENE.Point(14+IO, 0.1, 25-IO),
        new SCENE.Point(19-IO, 0.1, 25-IO),
        new SCENE.Point(19-IO, 0.1, 25+IO),
        new SCENE.Point(14+IO, 0.1, 25+IO),
        new SCENE.Point(14+IO, 5, 25-IO),
        new SCENE.Point(19-IO, 5, 25-IO),
        new SCENE.Point(19-IO, 5, 25+IO),
        new SCENE.Point(14+IO, 5, 25+IO),
    ]),
    new SCENE.Door(33, [                  // Laundry Room Door
        new SCENE.Point(14-IO, 0.1, 27),
        new SCENE.Point(14+IO, 0.1, 27),
        new SCENE.Point(14+IO, 0.1, 30),
        new SCENE.Point(14-IO, 0.1, 30),
        new SCENE.Point(14-IO, 4, 27),
        new SCENE.Point(14+IO, 4, 27),
        new SCENE.Point(14+IO, 4, 30),
        new SCENE.Point(14-IO, 4, 30)
    ], true),
    new SCENE.Window(34, [                // Laundry Room Window
        new SCENE.Point(5-OW, 2, 26),
        new SCENE.Point(5, 2, 26),
        new SCENE.Point(5, 2, 28),
        new SCENE.Point(5-OW, 2, 28),
        new SCENE.Point(5-OW, 4, 26),
        new SCENE.Point(5, 4, 26),
        new SCENE.Point(5, 4, 28),
        new SCENE.Point(5-OW, 4, 28)
    ]),
    new SCENE.Door(39, [                  // Closet Door
        new SCENE.Point(6, 0.1, 31-IO),
        new SCENE.Point(9, 0.1, 31-IO),
        new SCENE.Point(9, 0.1, 31+IO),
        new SCENE.Point(6, 0.1, 31+IO),
        new SCENE.Point(6, 4, 31-IO),
        new SCENE.Point(9, 4, 31-IO),
        new SCENE.Point(9, 4, 31+IO),
        new SCENE.Point(6, 4, 31+IO)
    ], false),
    new SCENE.Door(46, [                  // WC Door
        new SCENE.Point(14-IO, 0.1, 31.5),
        new SCENE.Point(14+IO, 0.1, 31.5),
        new SCENE.Point(14+IO, 0.1, 33.5),
        new SCENE.Point(14-IO, 0.1, 33.5),
        new SCENE.Point(14-IO, 4, 31.5),
        new SCENE.Point(14+IO, 4, 31.5),
        new SCENE.Point(14+IO, 4, 33.5),
        new SCENE.Point(14-IO, 4, 33.5)
    ], true),
    new SCENE.Window(47, [                // WC Window
        new SCENE.Point(11, 2, 35),
        new SCENE.Point(13, 2, 35),
        new SCENE.Point(13, 2, 35+OW),
        new SCENE.Point(11, 2, 35+OW),
        new SCENE.Point(11, 4, 35),
        new SCENE.Point(13, 4, 35),
        new SCENE.Point(13, 4, 35+OW),
        new SCENE.Point(11, 4, 35+OW)
    ]),
    new SCENE.Window(51, [                // Kitchen Window 1
        new SCENE.Point(5-OW, 2, 7),
        new SCENE.Point(5, 2, 7),
        new SCENE.Point(5, 2, 11),
        new SCENE.Point(5-OW, 2, 11),
        new SCENE.Point(5-OW, 4, 7),
        new SCENE.Point(5, 4, 7),
        new SCENE.Point(5, 4, 11),
        new SCENE.Point(5-OW, 4, 11)
    ]),
    new SCENE.Window(52, [                // Kitchen Window 2
        new SCENE.Point(5-OW, 2, 18),
        new SCENE.Point(5, 2, 18),
        new SCENE.Point(5, 2, 23),
        new SCENE.Point(5-OW, 2, 23),
        new SCENE.Point(5-OW, 4, 18),
        new SCENE.Point(5, 4, 18),
        new SCENE.Point(5, 4, 23),
        new SCENE.Point(5-OW, 4, 23)
    ]),
    new SCENE.Window(53, [                // Kitchen Window 3
        new SCENE.Point(7, 2, 5-OW),
        new SCENE.Point(13, 2, 5-OW),
        new SCENE.Point(13, 2, 5),
        new SCENE.Point(7, 2, 5),
        new SCENE.Point(7, 4, 5-OW),
        new SCENE.Point(13, 4, 5-OW),
        new SCENE.Point(13, 4, 5),
        new SCENE.Point(7, 4, 5)
    ]),
    new SCENE.RoomExit(131, [             // Kitchen-Living-Room Exit
        new SCENE.Point(14-IO, 0.1, 5),
        new SCENE.Point(14+IO, 0.1, 5),
        new SCENE.Point(14+IO, 0.1, 18),
        new SCENE.Point(14-IO, 0.1, 18),
        new SCENE.Point(14-IO, 5, 5),
        new SCENE.Point(14+IO, 5, 5),
        new SCENE.Point(14+IO, 5, 18),
        new SCENE.Point(14-IO, 5, 18),
    ]),
    new SCENE.Window(56, [                // Living Room Window
        new SCENE.Point(22, 2, 5-OW),
        new SCENE.Point(29, 2, 5-OW),
        new SCENE.Point(29, 2, 5),
        new SCENE.Point(22, 2, 5),
        new SCENE.Point(22, 4, 5-OW),
        new SCENE.Point(29, 4, 5-OW),
        new SCENE.Point(29, 4, 5),
        new SCENE.Point(22, 4, 5)
    ]),
    new SCENE.RoomExit(132, [             // Living-Room-Entry-Room Exit
        new SCENE.Point(14+IO, 0.1, 21-IO),
        new SCENE.Point(19, 0.1, 21-IO),
        new SCENE.Point(19, 0.1, 21+IO),
        new SCENE.Point(14+IO, 0.1, 21+IO),
        new SCENE.Point(14+IO, 5, 21-IO),
        new SCENE.Point(19, 5, 21-IO),
        new SCENE.Point(19, 5, 21+IO),
        new SCENE.Point(14+IO, 5, 21+IO),
    ]),
    new SCENE.Door(65, [                  // Bedroom 1 Door
        new SCENE.Point(32, 0.1, 21-IO),
        new SCENE.Point(34, 0.1, 21-IO),
        new SCENE.Point(34, 0.1, 21+IO),
        new SCENE.Point(32, 0.1, 21+IO),
        new SCENE.Point(32, 4, 21-IO),
        new SCENE.Point(34, 4, 21-IO),
        new SCENE.Point(34, 4, 21+IO),
        new SCENE.Point(32, 4, 21+IO)
    ], true),
    new SCENE.Window(66, [                // Bedroom 1 Window 1
        new SCENE.Point(45, 2, 6),
        new SCENE.Point(45+OW, 2, 6),
        new SCENE.Point(45+OW, 2, 9),
        new SCENE.Point(45, 2, 9),
        new SCENE.Point(45, 4, 6),
        new SCENE.Point(45+OW, 4, 6),
        new SCENE.Point(45+OW, 4, 9),
        new SCENE.Point(45, 4, 9)
    ]),
    new SCENE.Window(67, [                // Bedroom 1 Window 2
        new SCENE.Point(45, 2, 15),
        new SCENE.Point(45+OW, 2, 15),
        new SCENE.Point(45+OW, 2, 18),
        new SCENE.Point(45, 2, 18),
        new SCENE.Point(45, 4, 15),
        new SCENE.Point(45+OW, 4, 15),
        new SCENE.Point(45+OW, 4, 18),
        new SCENE.Point(45, 4, 18)
    ]),
    new SCENE.Door(72, [                  // Bedroom 2 Door
        new SCENE.Point(35-IO, 0.1, 22),
        new SCENE.Point(35+IO, 0.1, 22),
        new SCENE.Point(35+IO, 0.1, 24),
        new SCENE.Point(35-IO, 0.1, 24),
        new SCENE.Point(35-IO, 4, 22),
        new SCENE.Point(35+IO, 4, 22),
        new SCENE.Point(35+IO, 4, 24),
        new SCENE.Point(35-IO, 4, 24)
    ], true),
    new SCENE.Window(73, [                // Bedroom 2 Window 1
        new SCENE.Point(45, 2, 24),
        new SCENE.Point(45+OW, 2, 24),
        new SCENE.Point(45+OW, 2, 27),
        new SCENE.Point(45, 2, 27),
        new SCENE.Point(45, 4, 24),
        new SCENE.Point(45+OW, 4, 24),
        new SCENE.Point(45+OW, 4, 27),
        new SCENE.Point(45, 4, 27)
    ]),
    new SCENE.Window(74, [                // Bedroom 2 Window 2
        new SCENE.Point(45, 2, 28),
        new SCENE.Point(45+OW, 2, 28),
        new SCENE.Point(45+OW, 2, 31),
        new SCENE.Point(45, 2, 31),
        new SCENE.Point(45, 4, 28),
        new SCENE.Point(45+OW, 4, 28),
        new SCENE.Point(45+OW, 4, 31),
        new SCENE.Point(45, 4, 31)
    ]),
    new SCENE.Door(84, [                  // Bathroom Door
        new SCENE.Point(28, 0.1, 25-IO),
        new SCENE.Point(31, 0.1, 25-IO),
        new SCENE.Point(31, 0.1, 25+IO),
        new SCENE.Point(28, 0.1, 25+IO),
        new SCENE.Point(28, 4, 25-IO),
        new SCENE.Point(31, 4, 25-IO),
        new SCENE.Point(31, 4, 25+IO),
        new SCENE.Point(28, 4, 25+IO)
    ], true),
    new SCENE.Window(85, [                // Bathroom Window
        new SCENE.Point(29, 2, 35),
        new SCENE.Point(31, 2, 35),
        new SCENE.Point(31, 2, 35+OW),
        new SCENE.Point(29, 2, 35+OW),
        new SCENE.Point(29, 4, 35),
        new SCENE.Point(31, 4, 35),
        new SCENE.Point(31, 4, 35+OW),
        new SCENE.Point(29, 4, 35+OW)
    ]),
    new SCENE.Door(93, [                  // Sauna Door
        new SCENE.Point(23-IO, 0.1, 32),
        new SCENE.Point(23+IO, 0.1, 32),
        new SCENE.Point(23+IO, 0.1, 34),
        new SCENE.Point(23-IO, 0.1, 34),
        new SCENE.Point(23-IO, 4, 32),
        new SCENE.Point(23+IO, 4, 32),
        new SCENE.Point(23+IO, 4, 34),
        new SCENE.Point(23-IO, 4, 34),
    ], false),
    new SCENE.PolyRoomObject(96, [        // Staircase
        new SCENE.Point(19.5, 0.1, 25+IO),
        new SCENE.Point(21-IO, 0.1, 25+IO),
        new SCENE.Point(21-IO, 0.1, 30-IO),
        new SCENE.Point(19.5, 0.1, 30-IO),
        new SCENE.Point(19.5, 5, 25+IO),
        new SCENE.Point(21-IO, 5, 25+IO),
    ]),
    new SCENE.RoomExit(134, [             // Entry-Room-Staircase Exit
        new SCENE.Point(19-IO, 0.1, 25+IO),
        new SCENE.Point(19+IO, 0.1, 25+IO),
        new SCENE.Point(19+IO, 0.1, 30-IO),
        new SCENE.Point(19-IO, 0.1, 30-IO),
        new SCENE.Point(19-IO, 5, 25+IO),
        new SCENE.Point(19+IO, 5, 25+IO),
        new SCENE.Point(19+IO, 5, 30-IO),
        new SCENE.Point(19-IO, 5, 30-IO),
    ])
]

//All Floors
plot3.liHouses[0].liFloors = [
    new SCENE.PolyFloor(27, [         // Entry Room
        new SCENE.Point(14, 0, 25),
        new SCENE.Point(19, 0, 25),
        new SCENE.Point(19, 0, 35+OW),
        new SCENE.Point(14, 0, 35+OW),
        new SCENE.Point(14, 0.1, 25),
        new SCENE.Point(19, 0.1, 25),
        new SCENE.Point(19, 0.1, 35+OW),
        new SCENE.Point(14, 0.1, 35+OW)
    ]),
    new SCENE.PolyFloor(97, [         // Laundry Room
        new SCENE.Point(5-OW, 0, 25),
        new SCENE.Point(14, 0, 25),
        new SCENE.Point(14, 0, 31),
        new SCENE.Point(5-OW, 0, 31),
        new SCENE.Point(5-OW, 0.1, 25),
        new SCENE.Point(14, 0.1, 25),
        new SCENE.Point(14, 0.1, 31),
        new SCENE.Point(5-OW, 0.1, 31)
    ]),                         // Closet
    new SCENE.PolyFloor(98, [
        new SCENE.Point(5-OW, 0, 31),
        new SCENE.Point(10, 0, 31),
        new SCENE.Point(10, 0, 35+OW),
        new SCENE.Point(5-OW, 0, 35+OW),
        new SCENE.Point(5-OW, 0.1, 31),
        new SCENE.Point(10, 0.1, 31),
        new SCENE.Point(10, 0.1, 35+OW),
        new SCENE.Point(5-OW, 0.1, 35+OW)
    ]),
    new SCENE.PolyFloor(40, [         // WC
        new SCENE.Point(10, 0, 31),
        new SCENE.Point(14, 0, 31),
        new SCENE.Point(14, 0, 35+OW),
        new SCENE.Point(10, 0, 35+OW),
        new SCENE.Point(10, 0.1, 31),
        new SCENE.Point(14, 0.1, 31),
        new SCENE.Point(14, 0.1, 35+OW),
        new SCENE.Point(10, 0.1, 35+OW)
    ]),
    new SCENE.PolyFloor(48, [         // Kitchen
        new SCENE.Point(5-OW, 0, 5-OW),
        new SCENE.Point(14, 0, 5-OW),
        new SCENE.Point(14, 0, 25),
        new SCENE.Point(5-OW, 0, 25),
        new SCENE.Point(5-OW, 0.1, 5-OW),
        new SCENE.Point(14, 0.1, 5-OW),
        new SCENE.Point(14, 0.1, 25),
        new SCENE.Point(5-OW, 0.1, 25)
    ]),
    new SCENE.PolyFloor(54, [         // Living Room
        new SCENE.Point(14, 0, 5-OW),
        new SCENE.Point(31, 0, 5-OW),
        new SCENE.Point(31, 0, 21),
        new SCENE.Point(14, 0, 21),
        new SCENE.Point(14, 0.1, 5-OW),
        new SCENE.Point(31, 0.1, 5-OW),
        new SCENE.Point(31, 0.1, 21),
        new SCENE.Point(14, 0.1, 21)
    ]),
    new SCENE.PolyFloor(57, [         // Hallway
        new SCENE.Point(14, 0, 21),
        new SCENE.Point(35, 0, 21),
        new SCENE.Point(35, 0, 25),
        new SCENE.Point(14, 0, 25),
        new SCENE.Point(14, 0.1, 21),
        new SCENE.Point(35, 0.1, 21),
        new SCENE.Point(35, 0.1, 25),
        new SCENE.Point(14, 0.1, 25)
    ]),
    new SCENE.PolyFloor(62, [         // Bedroom 1
        new SCENE.Point(31, 0, 5-OW),
        new SCENE.Point(45+OW, 0, 5-OW),
        new SCENE.Point(45+OW, 0, 21),
        new SCENE.Point(31, 0, 21),
        new SCENE.Point(31, 0.1, 5-OW),
        new SCENE.Point(45+OW, 0.1, 5-OW),
        new SCENE.Point(45+OW, 0.1, 21),
        new SCENE.Point(31, 0.1, 21)
    ]),
    new SCENE.PolyFloor(68, [         // Bedroom 2
        new SCENE.Point(35, 0, 21),
        new SCENE.Point(45+OW, 0, 21),
        new SCENE.Point(45+OW, 0, 35+OW),
        new SCENE.Point(35, 0, 35+OW),
        new SCENE.Point(35, 0.1, 21),
        new SCENE.Point(45+OW, 0.1, 21),
        new SCENE.Point(45+OW, 0.1, 35+OW),
        new SCENE.Point(35, 0.1, 35+OW)
    ]),
    new SCENE.PolyFloor(82, [         // Bathroom
        new SCENE.Point(21, 0, 25),
        new SCENE.Point(23, 0, 25),
        new SCENE.Point(23, 0, 30),
        new SCENE.Point(21, 0, 30),
        new SCENE.Point(21, 0.1, 25),
        new SCENE.Point(23, 0.1, 25),
        new SCENE.Point(23, 0.1, 30),
        new SCENE.Point(21, 0.1, 30)
    ]),
    new SCENE.PolyFloor(97, [
        new SCENE.Point(23, 0, 25),
        new SCENE.Point(35, 0, 25),
        new SCENE.Point(35, 0, 35+OW),
        new SCENE.Point(23, 0, 35+OW),
        new SCENE.Point(23, 0.1, 25),
        new SCENE.Point(35, 0.1, 25),
        new SCENE.Point(35, 0.1, 35+OW),
        new SCENE.Point(23, 0.1, 35+OW)
    ]),
    new SCENE.PolyFloor(87, [         // Sauna
        new SCENE.Point(19, 0, 30),
        new SCENE.Point(23, 0, 30),
        new SCENE.Point(23, 0, 35+OW),
        new SCENE.Point(19, 0, 35+OW),
        new SCENE.Point(19, 0.1, 30),
        new SCENE.Point(23, 0.1, 30),
        new SCENE.Point(23, 0.1, 35+OW),
        new SCENE.Point(19, 0.1, 35+OW)
    ]),
    new SCENE.PolyFloor(95, [         // Staircase
        new SCENE.Point(19, 0, 25),
        new SCENE.Point(21, 0, 25),
        new SCENE.Point(21, 0, 30),
        new SCENE.Point(19, 0, 30),
        new SCENE.Point(19, 0.1, 25),
        new SCENE.Point(21, 0.1, 25),
        new SCENE.Point(21, 0.1, 30),
        new SCENE.Point(19, 0.1, 30)
    ])
]

//Entry Room
plot3.liHouses[0].addRoom(new SCENE.ConnectingRoom(26, 50))
plot3.liHouses[0].liRooms[0].liWallRefs = [20, 30, 31, 32, 43, 44, 45, 88, 126];
plot3.liHouses[0].liRooms[0].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(14+IO, 0.15, 25),
        new SCENE.Point(19-IO, 0.15, 25),
        new SCENE.Point(19-IO, 0.15, 35),
        new SCENE.Point(14+IO, 0.15, 35)
    ])
]
plot3.liHouses[0].liRooms[0].liRoomObjectRefs = [28, 33, 46, 132, 133, 134];
plot3.liHouses[0].liRooms[0].liFloorRefs = [27];
plot3.liHouses[0].liRooms[0].liRoofRefs = [];

//Laundry Room
plot3.liHouses[0].addRoom(new SCENE.PrivateRoom(29, 66))
plot3.liHouses[0].liRooms[1].liWallRefs = [30, 31, 32, 36, 37, 38, 41, 49, 113, 115];
plot3.liHouses[0].liRooms[1].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(5, 0.15, 25+IO),
        new SCENE.Point(14-IO, 0.15, 25+IO),
        new SCENE.Point(14-IO, 0.15, 31-IO),
        new SCENE.Point(5, 0.15, 31-IO)
    ])
]
plot3.liHouses[0].liRooms[1].liRoomObjectRefs = [33, 34, 39];
plot3.liHouses[0].liRooms[1].liFloorRefs = [97];
plot3.liHouses[0].liRooms[1].liRoofRefs = [];

//Closet
plot3.liHouses[0].addRoom(new SCENE.PrivateRoom(35, 66))
plot3.liHouses[0].liRooms[2].liWallRefs = [19, 21, 36, 37, 38, 42, 114, 116];
plot3.liHouses[0].liRooms[2].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(5, 0.15, 31+IO),
        new SCENE.Point(10-IO, 0.15, 31+IO),
        new SCENE.Point(10-IO, 0.15, 35),
        new SCENE.Point(5, 0.15, 35)
    ])
]
plot3.liHouses[0].liRooms[2].liRoomObjectRefs = [39];
plot3.liHouses[0].liRooms[2].liFloorRefs = [98];
plot3.liHouses[0].liRooms[2].liRoofRefs = [];

//WC
plot3.liHouses[0].addRoom(new SCENE.ServiceRoom(76, 16))
plot3.liHouses[0].liRooms[3].liWallRefs = [41, 42, 43, 44, 45, 121, 125];
plot3.liHouses[0].liRooms[3].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(10+IO, 0.15, 31+IO),
        new SCENE.Point(14-IO, 0.15, 31+IO),
        new SCENE.Point(14-IO, 0.15, 35),
        new SCENE.Point(10+IO, 0.15, 35),
    ])
]
plot3.liHouses[0].liRooms[3].liRoomObjectRefs = [46, 47];
plot3.liHouses[0].liRooms[3].liFloorRefs = [40];
plot3.liHouses[0].liRooms[3].liRoofRefs = [];

//Kitchen
plot3.liHouses[0].addRoom(new SCENE.SocialRoom(77, 180))
plot3.liHouses[0].liRooms[4].liWallRefs = [1, 2, 7, 8, 49, 50, 110];
plot3.liHouses[0].liRooms[4].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(5, 0.15, 5),
        new SCENE.Point(14, 0.15, 5),
        new SCENE.Point(14, 0.15, 18),
        new SCENE.Point(14-IO, 0.15, 18),
        new SCENE.Point(14-IO, 0.15, 25-IO),
        new SCENE.Point(5, 0.15, 25-IO)
    ])
]
plot3.liHouses[0].liRooms[4].liRoomObjectRefs = [51, 52, 53, 131];
plot3.liHouses[0].liRooms[4].liFloorRefs = [48];
plot3.liHouses[0].liRooms[4].liRoofRefs = [];

//Living Room
plot3.liHouses[0].addRoom(new SCENE.SocialRoom(78, 272))
plot3.liHouses[0].liRooms[5].liWallRefs = [50, 55, 58, 135, 136];
plot3.liHouses[0].liRooms[5].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(14, 0.15, 5),
        new SCENE.Point(31-IO, 0.15, 5),
        new SCENE.Point(31-IO, 0.15, 21-IO),
        new SCENE.Point(19, 0.15, 21-IO),
        new SCENE.Point(19, 0.15, 21),
        new SCENE.Point(14+IO, 0.15, 21),
        new SCENE.Point(14+IO, 0.15, 18),
        new SCENE.Point(14, 0.15, 18),
    ])
]
plot3.liHouses[0].liRooms[5].liRoomObjectRefs = [56, 131, 132];
plot3.liHouses[0].liRooms[5].liFloorRefs = [54];
plot3.liHouses[0].liRooms[5].liRoofRefs = [];

//Hallway
plot3.liHouses[0].addRoom(new SCENE.ConnectingRoom(79, 84))
plot3.liHouses[0].liRooms[6].liWallRefs = [58, 59, 60, 61, 63, 64, 69, 70, 71, 108, 110];
plot3.liHouses[0].liRooms[6].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(14+IO, 0.15, 21),
        new SCENE.Point(19, 0.15, 21),
        new SCENE.Point(19, 0.15, 21+IO),
        new SCENE.Point(35-IO, 0.15, 21+IO),
        new SCENE.Point(35-IO, 0.15, 25-IO),
        new SCENE.Point(19-IO, 0.15, 25-IO),
        new SCENE.Point(19-IO, 0.15, 25),
        new SCENE.Point(14+IO, 0.15, 25),
    ])
]
plot3.liHouses[0].liRooms[6].liRoomObjectRefs = [65, 72, 84, 133];
plot3.liHouses[0].liRooms[6].liFloorRefs = [57];
plot3.liHouses[0].liRooms[6].liRoofRefs = [];

//Bedroom 1 
plot3.liHouses[0].addRoom(new SCENE.PrivateRoom(80, 224))
plot3.liHouses[0].liRooms[7].liWallRefs = [12, 13, 55, 63, 64, 107, 111, 117, 118];
plot3.liHouses[0].liRooms[7].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(31+IO, 0.15, 5),
        new SCENE.Point(45, 0.15, 5),
        new SCENE.Point(45, 0.15, 21-IO),
        new SCENE.Point(31+IO, 0.15, 21-IO),
    ])
]
plot3.liHouses[0].liRooms[7].liRoomObjectRefs = [65, 66, 67];
plot3.liHouses[0].liRooms[7].liFloorRefs = [62];
plot3.liHouses[0].liRooms[7].liRoofRefs = [];

//Bedroom 2
plot3.liHouses[0].addRoom(new SCENE.PrivateRoom(81, 140))
plot3.liHouses[0].liRooms[8].liWallRefs = [69, 70, 71, 111, 112, 119, 120, 124, 129];
plot3.liHouses[0].liRooms[8].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(35+IO, 0.15, 21+IO),
        new SCENE.Point(45, 0.15, 21+IO),
        new SCENE.Point(45, 0.15, 35),
        new SCENE.Point(35+IO, 0.15, 35),
    ])
]
plot3.liHouses[0].liRooms[8].liRoomObjectRefs = [72, 73, 74];
plot3.liHouses[0].liRooms[8].liFloorRefs = [68];
plot3.liHouses[0].liRooms[8].liRoofRefs = [];

//Bathroom
plot3.liHouses[0].addRoom(new SCENE.ServiceRoom(75, 130))
plot3.liHouses[0].liRooms[9].liWallRefs = [60, 61, 83, 90, 91, 92, 108, 109, 112, 123, 128];
plot3.liHouses[0].liRooms[9].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(21+IO, 0.15, 25+IO),
        new SCENE.Point(35-IO, 0.15, 25+IO),
        new SCENE.Point(35-IO, 0.15, 35),
        new SCENE.Point(23+IO, 0.15, 35),
        new SCENE.Point(23+IO, 0.15, 30-IO),
        new SCENE.Point(21+IO, 0.15, 30-IO)
    ])
]
plot3.liHouses[0].liRooms[9].liRoomObjectRefs = [84, 85, 93];
plot3.liHouses[0].liRooms[9].liFloorRefs = [82, 97];
plot3.liHouses[0].liRooms[9].liRoofRefs = [];

//Sauna
plot3.liHouses[0].addRoom(new SCENE.PrivateRoom(86, 20))
plot3.liHouses[0].liRooms[10].liWallRefs = [88, 89, 90, 91, 92, 109, 122, 127];
plot3.liHouses[0].liRooms[10].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(19+IO, 0.15, 30+IO),
        new SCENE.Point(23-IO, 0.15, 30+IO),
        new SCENE.Point(23-IO, 0.15, 35),
        new SCENE.Point(19+IO, 0.15, 35),
    ])
]
plot3.liHouses[0].liRooms[10].liRoomObjectRefs = [93];
plot3.liHouses[0].liRooms[10].liFloorRefs = [87];
plot3.liHouses[0].liRooms[10].liRoofRefs = [];

//Staircase
plot3.liHouses[0].addRoom(new SCENE.ConnectingRoom(94, 10))
plot3.liHouses[0].liRooms[11].liWallRefs = [59, 83, 89];
plot3.liHouses[0].liRooms[11].liBorders = [
    new SCENE.PolyBorder([
        new SCENE.Point(19-IO, 0.15, 25+IO),
        new SCENE.Point(21-IO, 0.15, 25+IO),
        new SCENE.Point(21-IO, 0.15, 30-IO),
        new SCENE.Point(19-IO, 0.15, 30-IO)
    ])
]
plot3.liHouses[0].liRooms[11].liRoomObjectRefs = [96, 134];
plot3.liHouses[0].liRooms[11].liFloorRefs = [95];
plot3.liHouses[0].liRooms[11].liRoofRefs = [];
