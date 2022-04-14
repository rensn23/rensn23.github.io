//Enums
export const RoomType = {
    EmptyRoom: 0,
    Bedroom: 1,
    Bathroom: 2,
    ClosetRoom: 3,
    Pantry: 4,
    StorageRoom: 5,
    Kitchen: 6,
    OfficeRoom: 7,
    WorkRoom: 8,
    Balcony: 9,
    LivingRoom: 10,
    DiningRoom: 11,
    Hallway: 12,
    Staircase: 13,
    ToiletRoom: 14,
    GuestRoom: 15,
    WashingRoom: 16,
    Garage: 17,
}

export const Design = {
    Modern: 0,
    Traditional: 1,
    Minimalistic: 2,
}

export const InsulationType = {
    WDVS: 0,
    CoreInsulation: 1,
    NoInsulation: 2,
}

export const HeatingSource = {
    Gas: 0,
    Oil: 1,
    Pellets: 2,
    Logs: 3,
}

export const RoomRelationshipType = {
    Near: 0,
    Far: 1,
    Connected: 2,
    Merged: 3,
}

export const WindowMaterial = {
    Plastic: 0,
    Wood: 1,
    WoodAlu: 2,
    Alu: 3,
}

export const DoorType = {
    HingeDoor: 0,
    LiftSlideDoor: 1,
    ParallelSlideDoor: 2,
    FoldingSlideDoor: 3,
}

export const RoofType = {
    GableRoof: 0,
    HippedRoof: 1,
    MansardRoof: 2,
    FlatRoof: 3,
}

export const FloorMaterial = {
    Carpet: 0,
    Tile: 1,
    Parquet: 2,
    Laminate: 3,
    Wood: 4,
    PVC: 5,
    Linoleum: 6,
}

export const HeatingType = {
    FloorHeating: 0,
    Heaters: 1,
}

export const StaircaseMaterial = {
    Wood: 0,
    Stone: 1,
    Concrete: 2,
    Metal: 3,
    MetalWithCoverings: 4,
}

export const StaircaseType = {
    FixedConcrete: 0,
    Spiral: 1,
    Normal: 2,
}

//Plot Sizes
export class PlotSize{
    
}

export class RectanglePlotSize extends PlotSize{
    constructor(fLength, fWidth) {
        super();
        this.fLength = fLength;
        this.fWidth = fWidth;
    }
}


//Plot
export class Plot {
    constructor(fPlotLength, fPlotWidth, fBudget, fBudgetWeight) {
        this.plotSize = new RectanglePlotSize(fPlotLength, fPlotWidth);
        this.fBudget = fBudget;
        this.fBudgetWeight = fBudgetWeight;
    }

    liHouses = [];

    addHouse(house) {
        this.liHouses.push(house);
    }
}

//House
export class House {
    constructor(sNumberOfFloors, bHasBasement, fHeatingCostWeighted, fEletricityCostWeighted, eGeneralDesign, fBudgetPercent, eOuterInsulation, eHeatingSource) {
        this.sNumberOfFloors = sNumberOfFloors;
        this.bHasBasement = bHasBasement;
        this.fHeatingCostWeighted = fHeatingCostWeighted;
        this.fEletricityCostWeighted = fEletricityCostWeighted;
        this.eGeneralDesign = eGeneralDesign;
        this.fBudgetPercent = 1;
        this.eOuterInsulation = 0;
        this.eHeatingSource = 2;
    }

    liRooms = [];
    liRoomRelationships = [];

    addRoom(room) {
        this.liRooms.push(room);
    }

    addRoomRelationship(roomRelationship) {
        this.liRoomRelationships.push(roomRelationship);
    }
}

export class Room {
    static rID = 0;
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        if(nRoomID){
            this.nRoomID = nRoomID;
        }else{
            this.nRoomID = Room.rID;
            Room.rID += 1;
        }
        this.fRoomSize = fRoomSize;
        this.fRoomSizeWeight = fRoomSizeWeight;
        this.sFloorLevel = sFloorLevel;
        this.fRoomTemperature = fRoomTemperature;
        this.fRoomTemperatureWeight = fRoomTemperatureWeight;
        this.fRoomIllumination = fRoomIllumination;
        this.eRoomRoofType = eRoomRoofType;
        this.fRoomRoofTypeWeight = fRoomRoofTypeWeight;
        this.eFloorMaterial = eFloorMaterial;
        this.fFloorMaterialWeight = fFloorMaterialWeight;
        this.sNumberOfWindows = sNumberofWindows;
        this.eWindowMaterial = eWindowMaterial;
        this.eDoorType = eDoorType;
        this.eHeatingType = eHeatingType;
        this.eInsulationType = eInsulationType;
        this.bIsFullyInsulated = bIsFullyInsulated;
        this.bIsHeated = bIsHeated;
    }
}


//Room Types
export class PrivateRoom extends Room {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class SocialRoom extends Room {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class ConnectionRoom extends Room {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class ServiceRoom extends Room {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

//Private Rooms
export class EmptyRoom extends PrivateRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class Bedroom extends PrivateRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class Bathroom extends PrivateRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated, bHasToilet) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
        this.bHasToilet = bHasToilet;
    }
}

export class ClosetRoom extends PrivateRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class Pantry extends PrivateRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class StorageRoom extends PrivateRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class Kitchen extends PrivateRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class OfficeRoom extends PrivateRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class WorkRoom extends PrivateRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class Balcony extends PrivateRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

//Social Rooms
export class LivingRoom extends SocialRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class DiningRoom extends SocialRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

//Connection 
export class Hallway extends ConnectionRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class Staircase extends ConnectionRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated, eStaircaseMaterial, eStaircaseType, nConnectedStaircase) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
        this.eStaircaseMaterial = eStaircaseMaterial;
        this.eStaircaseType = eStaircaseType;
        this.nConnectedStaircase = nConnectedStaircase;
    }
}

//Service Rooms
export class ToiletRoom extends ServiceRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class GuestRoom extends ServiceRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class WashingRoom extends ServiceRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

export class Garage extends ServiceRoom {
    constructor(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated) {
        super(nRoomID, fRoomSize, fRoomSizeWeight, sFloorLevel, fRoomTemperature, fRoomTemperatureWeight, fRoomIllumination, eRoomRoofType, fRoomRoofTypeWeight, eFloorMaterial, fFloorMaterialWeight, sNumberofWindows, eWindowMaterial, eDoorType, eHeatingType, eInsulationType, bIsFullyInsulated, bIsHeated);
    }
}

//Room-Relationship
export class RoomRelationship {
    constructor(nRoomID1, nRoomID2, eRoomRelationshipType, fWeight) {
        this.nRoomID1 = nRoomID1;
        this.nRoomID2 = nRoomID2;
        this.eRoomRelationshipType = eRoomRelationshipType;
        this.fWeight = fWeight;
    }
}