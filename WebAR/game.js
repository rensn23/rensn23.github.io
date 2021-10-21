const enumAction ={
    none:0,        
    jump:1,
    duck:2,
    unduck:3
}

class InstanceHandler{
    constructor(nNumInstances, callback){
        this.nNumInstances = nNumInstances;
        this.arrGames = [];
        this.nCurrentInstance = 0;
        this.callback = callback;
    }

    Init(){
        for(let i = 0; i<this.nNumInstances; i++){
            this.arrGames[i] = new Game();
        }
    }

    NextInstance(){
        this.nCurrentInstance +=1;
        if(this.nCurrentInstance>=this.nNumInstances){
            this.nCurrentInstance = 0;
        }
    }

    NextInstanceAutoReset(){
        this.nCurrentInstance +=1;
        if(this.nCurrentInstance>=this.nNumInstances){
            this.nCurrentInstance = 0;
        }
        if(this.GetState().bGame === false){
            this.arrGames[this.nCurrentInstance].Reset();
            this.arrGames[this.nCurrentInstance].Play();
        }
    }

    Reset(){
        for(let i = 0 ; i< this.nNumInstances; i++){
            this.arrGames[i].Reset();
        }
    }

    Restart(){
        for(let i = 0 ; i< this.nNumInstances; i++){
            this.arrGames[i].Reset();
            this.arrGames[i].Play();
        }
    }

    GetScore(){
        return this.arrGames[this.nCurrentInstance].gameHandler.nScore;
    }

    GetState(){
        let state = this.arrGames[this.nCurrentInstance].gameHandler.UpdateState();
        return state;
    }

    Act(eAct){
        if(eAct === enumAction.jump){
            this.arrGames[this.nCurrentInstance].Jump();
        }else if(eAct === enumAction.duck){
            this.arrGames[this.nCurrentInstance].Duck();
        }else if(eAct === enumAction.unduck){
            this.arrGames[this.nCurrentInstance].UnDuck();
        }
        return this.GetState();
    }

    Start(){
        for(let i = 0 ; i< this.nNumInstances; i++){
            this.arrGames[i].Play();
        }
        this.Update();
    }

    Update(){
        for(let i = 0 ; i< this.nNumInstances; i++){
            //update the backend
            this.arrGames[i].gameHandler.Update()
        }
        this.callback();
        //call this function async in 5ms
        setTimeout(function(){ this.Update() }.bind(this), 2);
    }

    GetInstance(){
        return this.arrGames[this.nCurrentInstance];
    }

    GetInstanceId(){
        return this.nCurrentInstance;
    }
}

//The base-Class Game controlls and contains all functions
class Game{
    constructor() {
        this.nModus = 0;
        //settings that should be changed
        this.dSpeed = 500;
        this.dSpeedMax = 1500;
        this.dWidth = 750;
        this.dGravitation  = 400;
        this.dJumpSpeed = 300;
        this.dAddedSpeed = 500;
        this.dMultiplierObstaclesTime = 0.999998;
        this.arrObstacleSize = 25;
        this.dTimeBetweenObstacles = 1.2;
        this.dTimeBetweenObstaclesMin = 0.05;
        this.dGravitationMultiplier = 5;
        this.dAddToObstaclesTimeMax = 0.5;
        this.dJumpSpeedMultiplier = 3;
        this.dFallSpeedMultiplier = 3;
        this.obstacleDistributionMultiplier = 0.3;
    }

    Play(){
        if(this.gameHandler == null){
            this.gameHandler = new GameHandler(this.dSpeed, this.dWidth, this.dGravitation, this.dJumpSpeed, this.dAddedSpeed, this.dMultiplierObstaclesTime, this.arrObstacleSize, this.dTimeBetweenObstacles, this.dAddToObstaclesTimeMax, this.dSpeedMax, this.dJumpSpeedMultiplier, this.dFallSpeedMultiplier,this.obstacleDistributionMultiplier, this.dTimeBetweenObstaclesMin);
        }
        this.gameHandler.bPlay = true;
        this.gameHandler.bPlayerDead = false;
    }

    Stop(){
        this.gameHandler.bPlay = false;
        Reset();
    }

    Reset(){
        this.gameHandler = new GameHandler(this.dSpeed, this.dWidth, this.dGravitation, this.dJumpSpeed, this.dAddedSpeed, this.dMultiplierObstaclesTime, this.arrObstacleSize, this.dTimeBetweenObstacles, this.dAddToObstaclesTimeMax, this.dSpeedMax, this.dJumpSpeedMultiplier, this.dFallSpeedMultiplier,this.obstacleDistributionMultiplier, this.dTimeBetweenObstaclesMin);
    }

    Jump(){
        this.gameHandler.Jump();
    }

    Duck(){
        this.gameHandler.player.dHeight = 25;
        this.gameHandler.player.boxCol.dHeight = 25;
        this.gameHandler.dGravitation = this.dGravitation * this.dGravitationMultiplier;
        this.gameHandler.Duck();
    }

    UnDuck(){
        this.gameHandler.player.dHeight = 50;
        this.gameHandler.player.boxCol.dHeight = 50;
        this.gameHandler.dGravitation = this.dGravitation;
        this.gameHandler.UnDuck();
    }
}

//is the backend with settings that can be changed
class GameHandler{
    constructor(dSpeed, dWidth, dGravitation, dJumpSpeed, dAddedSpeed, dMultiplierObstaclesTime, arrObstacleSize, dTimeBetweenObstacles, dAddToObstaclesTimeMax, dSpeedMax, dJumpSpeedMultiplier, dFallSpeedMultiplier,  obstacleDistributionMultiplier, dTimeBetweenObstaclesMin) {
        //settings that should be changed
        this.dSpeed = dSpeed;
        this.dSPEED = dSpeed;
        this.dWidth = dWidth;
        this.dGravitation  = dGravitation;
        this.dJumpSpeed = dJumpSpeed;
        this.dAddedSpeed = dAddedSpeed;
        this.dMultiplierObstaclesTime = dMultiplierObstaclesTime;
        this.arrObstacleSize = arrObstacleSize;
        this.dTimeBetweenObstacles = dTimeBetweenObstacles;
        this.dTIMEBETWEENOBSTACLES = dTimeBetweenObstacles;
        this.dAddToObstaclesTimeMax = dAddToObstaclesTimeMax;
        this.dSpeedMax = dSpeedMax;
        this.dJumpSpeedMultiplier = dJumpSpeedMultiplier;
        this.dFallSpeedMultiplier = dFallSpeedMultiplier;
        this.state = new State();
        this.obstacleDistributionMultiplier = obstacleDistributionMultiplier;
        this.dTimeBetweenObstaclesMin = dTimeBetweenObstaclesMin;

        //variables that should not be changed
        this.arrObstacles = new Array();
        this.dTimeLastObstacle = Date.now();
        this.dTTime = Date.now();
        this.bPlay = false;
        this.nScore = 0;
        this.player = new PlayerObj(25, 50, new Vector2(50, 0));
        this.arrPossibleObstacles = [new Obstacle(25,25,new Vector2(1000, 0),0, 0.16),
            new Obstacle(25,50,new Vector2(1000, 0),1, 0.16),
            new Obstacle(25,25,new Vector2(1000, 30),2, 0.16),
            new Obstacle(25,25,new Vector2(1000, 55),3, 0.16),
            new Obstacle(50,25,new Vector2(1000, 0),4, 0.16),
            new Obstacle(50,50,new Vector2(1000, 0),5, 0.16)]
        this.arrV2Distribution = [
            new Vector2(0, 0.16),
            new Vector2(1, 0.16),
            new Vector2(2, 0.17),
            new Vector2(3, 0.17),
            new Vector2(4, 0.17),
            new Vector2(5, 0.17)];
        this.obstacleDistribution = new Distribution([...this.arrV2Distribution]);
        this.dRandomObstacleTimeMultiplier = Math.random();
        this.dTStart = Date.now();
    }

    Update(){
        //don't update if the game is not running
        if(this.bPlay == false){
            return;
        }

        //get the time that has passed, last Update
        let dTDeltaTime = (Date.now() - this.dTTime)/1000;
        this.dTTime = Date.now();

        //Update position
        for(var i = 0; i<this.arrObstacles.length; i++){
            //move the obstacle to left (m/s*s)
            this.arrObstacles[i].Move(-1*this.dSpeed*dTDeltaTime);
            //check if a collider is triggered
            if(this.player.boxCol.IsColliding(this.arrObstacles[i].boxCol)){
                console.log("RIP");
                this.bPlayerDead = true;
                this.bPlay = false; //end the game
            }
            //remove a obstacle after it has passed out of view
            if(this.arrObstacles[i].v2Pos.dX<-this.player.dWidth*2){
                try{ //some errors here that i can't explain => try, catch
                    this.arrObstacles.splice(i, 1);
                    this.nScore+=1;
                    //increase the difficulty
                    this.dSpeed = this.GetSpeed();
                    // console.log(this.dSpeed);
                    this.dTimeBetweenObstacles = this.GetTimeBetweenObstacles();
                    // console.log(this.dTimeBetweenObstacles);
                }catch{}
            }
        }

        //add an obstacle after a certain amount of time has passed
        if((this.dTTime-this.dTimeLastObstacle)/1000>Math.max(this.dTimeBetweenObstacles + this.dRandomObstacleTimeMultiplier*this.dAddToObstaclesTimeMax, this.dTimeBetweenObstaclesMin)){
            //the obstacle has a random size and shape
            // let index = Math.floor((Math.abs(Math.random()-0.001))*(this.arrPossibleObstacles.length));
            let nIndex = this.obstacleDistribution.GetRandom();
            this.obstacleDistribution.ResetLastOperation();
            this.obstacleDistribution.MultiplyDistribution(nIndex, this.obstacleDistributionMultiplier)
            // console.log(nIndex);
            let obstacle = this.arrPossibleObstacles[nIndex].CloneWithNewID();
            this.arrObstacles.push(obstacle);
            this.dTimeLastObstacle = this.dTTime;
            this.dRandomObstacleTimeMultiplier = Math.random();
        }

        //Jump
        //If the velocity is not 0 move the player and change the velocity
        if(this.player.v2Velocity.dY!==0){
            this.player.v2Pos.dY = this.player.v2Pos.dY + this.player.v2Velocity.dY*dTDeltaTime*this.dJumpSpeedMultiplier;
            this.player.v2Velocity.dY -= this.dGravitation *dTDeltaTime*this.dFallSpeedMultiplier;
            if(this.player.v2Velocity.dY == 0){
                this.player.v2Velocity.dY-=0.001;
            }
        }

        //if the player gets "underground" move him to ground-level and remove any velocity left
        if(this.player.v2Pos.dY <= 0){
            this.player.v2Velocity.dY = 0;
            this.player.v2Pos.dY = 0;
            this.player.bGrounded=true;
        }
    }

    //ad a velocity to the player
    Jump(){
        if(this.player.v2Pos.dY == 0){
            this.player.v2Velocity.dY = this.dJumpSpeed;
            this.player.bGrounded=false;
        }
    }

    UpdateState(){
        this.state.dSpeed = this.dSpeed;
        this.state.bGame = this.bPlay;
        this.state.nScore = this.nScore;
        this.state.bGrounded = this.player.bGrounded;
        this.state.bPlayerDead = this.bPlayerDead;
        
        for(var i = 0; i<this.arrObstacles.length; i++){
            this.state.arrDDistance[i] = this.arrObstacles[i].v2Pos.dX-this.player.v2Pos.dX-this.arrObstacles[i].dWidth/2;
            this.state.arrDWidth[i] = Math.abs(this.arrObstacles[i].dWidth);
            this.state.arrNObstaclesID[i] = this.arrObstacles[i].nObstacleID;
        }

        return this.state   
    }

    GetSpeed(){
        let ms = (Date.now() -  this.dTStart);
        // console.log(k(ms));
        return this.dSPEED + k(ms)*this.dAddedSpeed;
    }

    GetTimeBetweenObstacles(){
        let ms = (Date.now() -  this.dTStart);
        // console.log(k(ms));
        return this.dTIMEBETWEENOBSTACLES * this.dSPEED/this.dSpeed*Math.pow(this.dMultiplierObstaclesTime, ms);
    }


    Duck(){
        this.state.bDuck = true;
    }

    UnDuck(){
        this.state.bDuck = false;
    }
}

//The playerObj that has all important information about the player
class PlayerObj{
    constructor(dWidth, dHeight, v2Pos){
        this.v2Pos = v2Pos;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.boxCol = new BoxCollider(dWidth, dHeight, v2Pos); //adding a collider
        this.v2Velocity = new Vector2(0,0);
        this.bGrounded = false;
    }
}

//The obstacleObj that has all important information about the obstacle
class Obstacle{
    static nObstacleUID = 0;
    constructor(dWidth, dHeight, v2Pos, nObstacleID) {
        this.nObstacleID=nObstacleID;
        this.v2Pos = v2Pos;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.boxCol = new BoxCollider(dWidth, dHeight, v2Pos); //adding a collider
        this.nObstacleUID = Obstacle.nObstacleUID;
        Obstacle.nObstacleUID +=1;
    }

    //Move the obstacle to the left
    Move(dDelta){
        this.v2Pos.dX += dDelta;
    }

    CloneWithNewID(){
        return new Obstacle(this.dWidth, this.dHeight, new Vector2(this.v2Pos.dX, this.v2Pos.dY), this.nObstacleID);
    }
}


//The BoxCollider to check if the player has collided with an obstacle => lost
class BoxCollider{
    constructor(dWidth, dHeight, v2Pos){
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.v2Pos = v2Pos;
    }

    //Checking if a line between tow points of an rectangle is between the tow lines of the other collider x2 
    //|--------|
    //|     |--|---|
    //|     |  |   |
    //|-----|--|   |
    IsColliding(boxCollider){
        // return false;
        if (this.v2Pos.dX < boxCollider.v2Pos.dX + boxCollider.dWidth &&
            this.v2Pos.dX + this.dWidth > boxCollider.v2Pos.dX &&
            this.v2Pos.dY < boxCollider.v2Pos.dY + boxCollider.dHeight &&
            this.v2Pos.dY + this.dHeight > boxCollider.v2Pos.dY) {
            return true;
        }
        return false;
    }
}

//The custom Vector2 Class
class Vector2{
    constructor(dX, dY){
        this.dX = dX;
        this.dY = dY;
    }

    Clone(){
        return new Vector2(this.dX, this.dY);
    }
}

class State{
    constructor(){
        this.bGame = false;
        this.bPlayerDead = false;
        this.bGrounded=true;
        this.dSpeed = null;
        this.nScore = null;
        this.bDuck = false;
        this.arrDDistance = [];
        this.arrDWidth = [];
        this.arrNObstaclesID =[];
    }
}

class  Distribution{
    constructor(arrV2Distribution){
        let sum=0;
        for(let i = 0; i<arrV2Distribution.length; i++){
            sum+=arrV2Distribution[i].dY;
        }
        if(1-sum<0 || 1-sum>0.01){
            throw "Input-Distribution-Sum did not match 1"; 
        }
        this.arrV2Distribution = arrV2Distribution; // (1, 0.3) => (index, distribution)
        this.nLastOperationIndex = -1;
        this.nLastOperationValue = -1;
    }

    GetRandom(){
        let dRandom = Math.random();
        let sum = 0;
        for(let i = 0; i<this.arrV2Distribution.length; i++){
            if(dRandom<this.arrV2Distribution[i].dY+sum){
                return this.arrV2Distribution[i].dX;
            }
            sum += this.arrV2Distribution[i].dY;
        }
        return this.arrV2Distribution[this.arrV2Distribution.length-1].dX;
    }

    SetDistribution(arrV2Distribution){
        let sum=0;
        for(let i = 0; i<arrV2Distribution.length; i++){
            sum+=arrV2Distribution[i].dY;
        }
        if(1-sum<0 || 1-sum>0.01){
            throw "Input-Distribution-Sum did not match 1"; 
        }
        this.arrV2Distribution = arrV2Distribution; // (1, 0.3) => (index, distribution)
    }

    MultiplyDistribution(nIndex, dFactor){
        if(nIndex>=this.arrV2Distribution.length){
            throw "index out of range";
        }
        if(this.arrV2Distribution[nIndex].dY*dFactor>=1){
            throw "unable to compute because Input-Distribution-Sum would be creater or equal to 1"
        }

        this.nLastOperationIndex = nIndex;
        this.nLastOperationValue = dFactor;

        let dDeltaDistribution = this.arrV2Distribution[nIndex].dY-this.arrV2Distribution[nIndex].dY*dFactor;
        this.arrV2Distribution[nIndex].dY*=dFactor
        let dNum = dDeltaDistribution/(this.arrV2Distribution.length-1);
        for(let i = 0; i<this.arrV2Distribution.length; i++){
            if(i == nIndex){
                continue;
            }
            this.arrV2Distribution[i].dY+=dNum;
        }
    }

    ResetLastOperation(){
        if(this.nLastOperationIndex<0){
            return;
        }
        this.MultiplyDistribution(this.nLastOperationIndex, 1/this.nLastOperationValue);
    }
}

function f(x){
    return Math.pow(x/120000,1.8);
}

function g(x){
    if(x>=0){
        if(f(x) < 1){
            return f(x);
        }
        return 1;
    }
    return 0;
}

function h(x){
    return Math.sin((x-120000)/50000)/5;
}

function i(x){
    if(x>120000){
        return g(x)+h(x);
    }else{
        return g(x);
    }
}

function j(x){
    return Math.cos((x-75707.96)/9000)/10;
}

function l(x){
    return (x/120000)*0.1
}

function k(x){
    if(x>120000){
        return i(x)+j(x)+l(x);
    }else{
        return i(x);
    }
}