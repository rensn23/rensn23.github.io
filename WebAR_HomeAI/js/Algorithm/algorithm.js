import { Plot, House, Staircase, SocialRoom, LivingRoom, StaircaseType, StaircaseMaterial, ConnectionRoom, ServiceRoom, Kitchen, Hallway, ToiletRoom, Bedroom, Bathroom, OfficeRoom, RoomRelationship, RoomRelationshipType, RoofType, PrivateRoom, Design, InsulationType, HeatingSource, FloorMaterial, WindowMaterial, HeatingType, DoorType } from '../Parameter_Classes.js';
import { ForceBasedAlgorithm, CPStaircase } from "./forceBasedAlgorithm.js";
import { ConstrainedGrowth } from './constrainedGrowth.js';

export class Algorithm{
    constructor(fnPrint){
        this.fnPrint = fnPrint;

        //Some Variables to play with
        this.nGridSize = 50; //must be div. by 2
        this.nConstrainedGrowthResults = 2;
        this.nForceBasedAlgorithmEpochSize = 15;
        this.nForceBasedAlgorithmResults = 3;
    }

    /**
     * Create list of ComputeStaircases (tmp )
     * @date 2022-02-25
     * @param {any} userAPI
     * @returns {any}
     */
    getListOfComputeStaircases(userAPI){
        let liCPStaircases = [];
        userAPI.liHouses[0].liRooms.forEach(room => {
            if(room instanceof Staircase){
                let cPStaircase = new CPStaircase(room);
                let randomWidthToDepth =  Math.random() * (0.85 - 0.35) + 0.35;
                cPStaircase.fWidth = randomWidthToDepth * Math.sqrt(room.fRoomSize);
                cPStaircase.fDepth = (1-randomWidthToDepth) * Math.sqrt(room.fRoomSize);
                liCPStaircases.push(cPStaircase);
            }
        });
        return liCPStaircases;
    }

    /**
     * Executes the algorithm and returns a list of results
     * @date 2022-02-25
     * @param {Plot} userAPI The UserAPI object containing relevant information.
     * @returns {List} The list of results.  
     */
    execute(userAPI){
        //Prepare for execution & create list of rooms
        let liCPStaircases = this.getListOfComputeStaircases(userAPI);
        let cg = new ConstrainedGrowth((str) => { this.fnPrint(str) }, this.nConstrainedGrowthResults);
        let fb = new ForceBasedAlgorithm((str) => { this.fnPrint(str) }, this.nGridSize, this.nForceBasedAlgorithmEpochSize, this.nForceBasedAlgorithmResults);

        //create list for results
        let liResults = [];
        let liResultsFloors = [];

        //TODO: Assign rooms to floor.
        //TODO: Place staircases on different floors.

        //TODO: LOOP for differnet floors
        let forcebasedSolutions = fb.execute(userAPI, 0, liCPStaircases, null);

        forcebasedSolutions[0].forEach(fbSolution => { 
            let liCgSolutions = cg.execute(fbSolution.grid, userAPI, /*floor*/0);
            // this.fnPrint(ForceBasedAlgorithm.toHTML(fbSolution.grid, false))
            liCgSolutions.forEach(cgSolution =>{
                liResultsFloors.push({fbSolution:fbSolution, cgSolution:cgSolution});
            });
        });

        //TODO: combine differnet floors.
        liResultsFloors.forEach(solutionFloor =>{
            let liCombinedFloorSolutions = [];
            liCombinedFloorSolutions.push(solutionFloor)
            liResults.push(liCombinedFloorSolutions);
        });

        return {liResults:liResults, fResolution: forcebasedSolutions[1]};
    }

    /**
     * Returns a sample for user API.
     * @date 2022-02-25
     * @returns {userAPI} Returns a sample of a userAPI.
     */
    static getSample(){
        let userAPIHouse = new Plot(100, 100, 1000, 10);
    
        let house = new House(3, true, 10, 10, Design.Minimalistic, 100, InsulationType.NoInsulation, HeatingSource.Pellets);
    
        userAPIHouse.addHouse(house);
    
        let kitchen = new Kitchen(0, 50, 0.5, 0, 21, 0.5, 10, RoofType.FlatRoof, 0.5, FloorMaterial.Tile, 0.5, 3, WindowMaterial.Alu, DoorType.HingeDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true);
        let livingroom = new LivingRoom(1, 100, 0.5, 0, 21, 0.5, 10, RoofType.FlatRoof, 0.5, FloorMaterial.Laminate, 0.5, 4, WindowMaterial.Wood, DoorType.ParallelSlideDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true);
        let cR = new Hallway(2, 30, 0.5, 0, 21, 0.5, 10, RoofType.FlatRoof, 0.5, FloorMaterial.Laminate, 0.5, 0, WindowMaterial.Wood, DoorType.ParallelSlideDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true);
        let wc = new ToiletRoom(3, 15, 0.5, 0, 21, 0.5, 10, RoofType.FlatRoof, 0.5, FloorMaterial.Tile, 0.5, 1, WindowMaterial.Alu, DoorType.HingeDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true);
        let childRoom = new Bedroom(4, 40, 0.5, 1, 21, 0.5, 10, RoofType.FlatRoof, 0.5, FloorMaterial.Tile, 0.5, 1, WindowMaterial.Alu, DoorType.HingeDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true);
        let bedRoom = new Bedroom(5, 40, 0.5, 1, 21, 0.5, 10, RoofType.GableRoof, 0.5, FloorMaterial.Tile, 0.5, 2, WindowMaterial.Alu, DoorType.HingeDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true);
        let cRF1 = new Hallway(6, 15, 0.5, 1, 21, 0.5, 10, RoofType.FlatRoof, 0.5, FloorMaterial.Laminate, 0.5, 0, WindowMaterial.Wood, DoorType.ParallelSlideDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true);
        let bathRoom = new Bathroom(7, 15, 0.5, 1, 21, 0.5, 10, RoofType.FlatRoof, 0.5, FloorMaterial.Laminate, 0.5, 1, WindowMaterial.Wood, DoorType.ParallelSlideDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true);
        let work = new OfficeRoom(8, 45, 0.5, 0, 21, 0.5, 10, RoofType.FlatRoof, 0.5, FloorMaterial.Laminate, 0.5, 2, WindowMaterial.Wood, DoorType.ParallelSlideDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true);
        let staircase0 = new Staircase(9, 40, 0.5, 0, 21, 0.5, 10, RoofType.FlatRoof, 0.5, FloorMaterial.Laminate, 0.5, 0, WindowMaterial.Wood, DoorType.ParallelSlideDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true, StaircaseMaterial.Wood, StaircaseType.Normal, 10);
        let staircase1 = new Staircase(10, 40, 0.5, 1, 21, 0.5, 10, RoofType.GableRoof, 0.5, FloorMaterial.Laminate, 0.5, 0, WindowMaterial.Wood, DoorType.ParallelSlideDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true, StaircaseMaterial.Wood, StaircaseType.Normal, 9);
        let wc1 = new ToiletRoom(3, 15, 0.5, 1, 21, 0.5, 10, RoofType.FlatRoof, 0.5, FloorMaterial.Tile, 0.5, 1, WindowMaterial.Alu, DoorType.HingeDoor, HeatingType.FloorHeating, InsulationType.CoreInsulation, true, true);
    
        userAPIHouse.liHouses[0].addRoom(kitchen);
        userAPIHouse.liHouses[0].addRoom(livingroom);
        userAPIHouse.liHouses[0].addRoom(cR);
        userAPIHouse.liHouses[0].addRoom(wc);
        userAPIHouse.liHouses[0].addRoom(wc1);
        userAPIHouse.liHouses[0].addRoom(childRoom);
        userAPIHouse.liHouses[0].addRoom(bedRoom);
        userAPIHouse.liHouses[0].addRoom(bedRoom);
        userAPIHouse.liHouses[0].addRoom(cRF1);
        userAPIHouse.liHouses[0].addRoom(bathRoom);
        userAPIHouse.liHouses[0].addRoom(work);
        userAPIHouse.liHouses[0].addRoom(staircase0);
        userAPIHouse.liHouses[0].addRoom(staircase1);
    
        // liCPStaircases.push(new CPStaircase(staircase0))
        // liCPStaircases.push(new CPStaircase(staircase1))
    
        // liCPStaircases[0].fWidth = 4;
        // liCPStaircases[0].fDepth = 5;
        // /*liCPStaircases[1].fX= 45;
        // liCPStaircases[1].fY= 50;*/
    
        // liCPStaircases[1].fWidth = 4;
        // liCPStaircases[1].fDepth = 5;
    
        userAPIHouse.liHouses[0].addRoomRelationship(new RoomRelationship(0, 1, RoomRelationshipType.Connected, 1))
        userAPIHouse.liHouses[0].addRoomRelationship(new RoomRelationship(1, 3, RoomRelationshipType.Connected, 1))
        userAPIHouse.liHouses[0].addRoomRelationship(new RoomRelationship(2, 8, RoomRelationshipType.Connected, 1))
        userAPIHouse.liHouses[0].addRoomRelationship(new RoomRelationship(8, 0, RoomRelationshipType.Far, 1))
        userAPIHouse.liHouses[0].addRoomRelationship(new RoomRelationship(8, 1, RoomRelationshipType.Near, 1))
        userAPIHouse.liHouses[0].addRoomRelationship(new RoomRelationship(5, 4, RoomRelationshipType.Connected, 1))
        userAPIHouse.liHouses[0].addRoomRelationship(new RoomRelationship(5, 6, RoomRelationshipType.Connected, 1))
        userAPIHouse.liHouses[0].addRoomRelationship(new RoomRelationship(4, 7, RoomRelationshipType.Far, 1))
        userAPIHouse.liHouses[0].addRoomRelationship(new RoomRelationship(5, 7, RoomRelationshipType.Near, 1))

        return userAPIHouse
    }
}