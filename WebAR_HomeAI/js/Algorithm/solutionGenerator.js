import { JsonConverter } from '../JsonConverter.js';
import { Algorithm } from './algorithm.js';
import { APIBuilder } from './apiBuilder.js';
import { Helper } from './helper.js';
import { PlaneBuilder } from './planeBuilder.js';
import { Plot, PlotSize, RectanglePlotSize, SquarePlotSize, House, Room, ConnectingRoom, PrivateRoom, ServiceRoom, SocialRoom, Point, Wall, InnerWall, OuterWall, PolyWall, PolyInnerWall, PolyOuterWall, PolyFloor, PolyRoof, Floor, Roof, RoomObject, RoomExit, PolyRoomObject, Window, Door, Border, PolyBorder} from '../JS_Classes.js';
import { DoorType } from '../Parameter_Classes.js';

export class SolutionGenerator{
    constructor(fnPrint){
        this.fnPrint = fnPrint;
        this.liWorkers = [];
    }

    /**
     * Generate solutions and add them to the objResutls.
     * @date 2022-02-26
     * @param {object} objResultHandler A object with the methode push.
     * @returns {void} .
     */
    startGeneration(userAPI,objResultHandler){
        //TODO: prepare for generation

        //TODO: setup background-workers        

        // let objSer = JsonConverter.serialize(userAPI)
        // let userAPI_ = JsonConverter.deserialize(objSer.str, objSer.dictClassName);

        // let algorithm = new Algorithm((str)=>{console.log(str);});
        // algorithm.execute(userAPI_);

        let userAPISerialized = JsonConverter.serialize(userAPI);
        // console.log(userAPISerialized.dictClassName)

        //TODO: MULTITHREADING LOOP
        this.liWorkers = Helper.ParallelExecution(8, (liResults)=>{
            //Is called when the workter posts a result, liResults is a list of results.
            //The dictionary is needed to cast the objects, JSONConverter.
            let dictClassName = {
                "Plot":Plot, 
                "PlotSize":PlotSize, 
                "RectanglePlotSize":RectanglePlotSize, 
                "SquarePlotSize":SquarePlotSize, 
                "House":House, 
                "PloRoomtSize":Room, 
                "ConnectingRoom":ConnectingRoom, 
                "PrivateRoom":PrivateRoom, 
                "ServiceRoom":ServiceRoom, 
                "SocialRoom":SocialRoom, 
                "Point":Point, 
                "Wall":Wall, 
                "InnerWall":InnerWall, 
                "OuterWall":OuterWall, 
                "PolyWall":PolyWall, 
                "PolyInnerWall":PolyInnerWall, 
                "PolyOuterWall":PolyOuterWall, 
                "PolyFloor":PolyFloor, 
                "PolyRoof":PolyRoof, 
                "Floor":Floor, 
                "Roof":Roof, 
                "RoomObject":RoomObject, 
                "RoomExit":RoomExit, 
                "PolyRoomObject":PolyRoomObject, 
                "Window":Window, 
                "Door":Door, 
                "Border":Border, 
                "PolyBorder":PolyBorder
            }
            //Convert the results back from json to object and add it to the objResultHandler.
            liResults.forEach(result => {
                let resultDeserialized = JsonConverter.deserialize(result, dictClassName);
                objResultHandler.push(resultDeserialized);
            });
        }, (params)=>{
            //Dynamicly import the different modules, params is the userAPI-Object
            import('../JsonConverter.js').then(moduleJsonConverter=>{
                import('../Parameter_Classes.js').then(moduleParameterClasses => {
                    import('./algorithm.js').then(moduleAlgorithm =>             
                        import('./apiBuilder.js').then(moduleAPIBuilder =>  
                            import('./planeBuilder.js').then(modulePlaneBuilder => {
                                //Dictionary is needed to resolve/cast the jsonType ref.
                                let dictClassName = {
                                    "Array": Array,
                                    "Design": moduleParameterClasses.Design,
                                    "InsulationType" : moduleParameterClasses.InsulationType,
                                    "HeatingSource": moduleParameterClasses.HeatingSource,
                                    "RoomRelationshipType": moduleParameterClasses.RoomRelationshipType,
                                    "WindowMaterial": moduleParameterClasses.WindowMaterial,
                                    "DoorType": moduleParameterClasses.DoorType,
                                    "RoofType": moduleParameterClasses.RoofType,
                                    "FloorMaterial": moduleParameterClasses.FloorMaterial,
                                    "HeatingType": moduleParameterClasses.HeatingType,
                                    "StaircaseMaterial": moduleParameterClasses.StaircaseMaterial,
                                    "StaircaseType": moduleParameterClasses.StaircaseType,
                                    "PlotSize": moduleParameterClasses.PlotSize,
                                    "RectanglePlotSize": moduleParameterClasses.RectanglePlotSize,
                                    "Plot": moduleParameterClasses.Plot,
                                    "House": moduleParameterClasses.House,
                                    "Room": moduleParameterClasses.Room,
                                    "PrivateRoom": moduleParameterClasses.PrivateRoom,
                                    "SocialRoom": moduleParameterClasses.SocialRoom,
                                    "ConnectionRoom": moduleParameterClasses.ConnectionRoom,
                                    "ServiceRoom": moduleParameterClasses.ServiceRoom,
                                    "EmptyRoom": moduleParameterClasses.EmptyRoom,
                                    "Bedroom": moduleParameterClasses.Bedroom,
                                    "Bathroom": moduleParameterClasses.Bathroom,
                                    "ClosetRoom": moduleParameterClasses.ClosetRoom,
                                    "Pantry": moduleParameterClasses.Pantry,
                                    "StorageRoom": moduleParameterClasses.StorageRoom,
                                    "Kitchen": moduleParameterClasses.Kitchen,
                                    "OfficeRoom": moduleParameterClasses.OfficeRoom,
                                    "WorkRoom": moduleParameterClasses.WorkRoom,
                                    "Balcony": moduleParameterClasses.Balcony,
                                    "LivingRoom": moduleParameterClasses.LivingRoom,
                                    "DiningRoom": moduleParameterClasses.DiningRoom,
                                    "Hallway": moduleParameterClasses.Hallway,
                                    "Staircase": moduleParameterClasses.Staircase,
                                    "ToiletRoom": moduleParameterClasses.ToiletRoom,
                                    "GuestRoom": moduleParameterClasses.GuestRoom,
                                    "WashingRoom": moduleParameterClasses.WashingRoom,
                                    "Garage": moduleParameterClasses.Garage,
                                    "RoomRelationship": moduleParameterClasses.RoomRelationship,
                                }
            
                                //Convert/cast the userApi-object from json.
                                var userApiLoc = moduleJsonConverter.JsonConverter.deserialize(params.userAPI, dictClassName);

                                //DEBUG
                                // let algorithm = new moduleAlgorithm.Algorithm((str)=>{this.fnPrint(str);});
                                // let planeBuilder = new modulePlaneBuilder.PlaneBuilder((str)=>{this.fnPrint(str);})
                                // let apiBuilder  = new moduleAPIBuilder.APIBuilder((str)=>{this.fnPrint(str);})

                                let algorithm = new moduleAlgorithm.Algorithm((str)=>{console.log(str);});
                                let planeBuilder = new modulePlaneBuilder.PlaneBuilder((str)=>{console.log(str);})
                                let apiBuilder  = new moduleAPIBuilder.APIBuilder((str)=>{console.log(str);})

                                while(true){
                                    //Get solutions
                                    let objResult = algorithm.execute(userApiLoc);
                                    
                                    let liSolutions = objResult.liResults;

                                    //foreach solution  
                                    liSolutions.forEach(solution => {
                                        //TODo: LOOP foreach floor
                                            let floorPlanSolution = solution[0];
                                            //TODO: Build planes
                                            let liPlanes = planeBuilder.buildPlanes(floorPlanSolution.cgSolution.grid, objResult.fResolution,0, 5);
                                            // console.log(liPlanes)
                                            //TODO: Place Doors
                                            //TODO: Place Windows
                                        //TODO: END LOOP
                                        //TODO: BuildAPI
                                        let apiSolution=apiBuilder.buildAPIObject(userApiLoc, solution, liPlanes, objResult.fResolution);

                                        //TODO: Place RoomObjects
                                        //TODO: Evaluation

                                        // console.log(apiSolution);
                                        // objResultHandler.push(apiSolution);

                                        let apiSolutionSerilized = moduleJsonConverter.JsonConverter.serialize(apiSolution);
                                        // console.log(apiSolutionSerilized.dictClassName);
                                        postResults([apiSolutionSerilized.str]);
                                    });
                                }
                            })
        //                 .catch(err => console.error("Could not load module Planbuilder or failed executing function." + err)))
        //             .catch(err => console.error("Could not load module, Algorithm!"+ err)))
        //         .catch(err => console.error("Could not load module, APIBuilder!"+ err))})
        //     .catch(err => console.error("Could not load module, JsonConverter!"+ err))})
        //  .catch(err => console.error("Could not load module, Parameter_classes!"+ err));
                        ))})})
        //objResultHandler.push(result)

        //TODO Stop Generation
        //TODo Close BW and prepare for Return
        }, {userAPI:userAPISerialized.str},false);
    }

    /**
     * Stops all workers.
     * @date 2022-03-04
     * @returns {void} .
     */
    stopGeneration(){
        this.liWorkers.forEach(w => {
           w.terminate(); 
        });
    }
}