function Predict(state) {
    if (state.bGame == false || state.arrNObstaclesID[0] == 3) {
        return enumAction.none;
    }

    if (state.arrDDistance[1] + 0.12 * state.nScore - state.arrDDistance[0] + 0.12 * state.nScore < 250 && state.arrDDistance[0] < 120 + 0.12 * state.nScore && (state.arrNObstaclesID[0] == 0 || state.arrNObstaclesID[0] == 1 || state.arrNObstaclesID[0] == 4 || state.arrNObstaclesID[0] == 5)) {
        if (bDuck) {
            bDuck = false;
            return enumAction.unduck;
        }
        return enumAction.jump;
    } else if (state.arrDDistance[0] < 120 + 0.12 * state.nScore && state.arrDDistance[0] > 0 + 0.12 * state.nScore && (state.arrNObstaclesID[0] == 0)) {
        if (bDuck) {
            bDuck = false;
            return enumAction.unduck;
        }
        return enumAction.jump;
    } else if (state.arrDDistance[0] < 120 + 0.12 * state.nScore && state.arrDDistance[0] > 0 + 0.12 * state.nScore && (state.arrNObstaclesID[0] == 1)) {
        if (bDuck) {
            bDuck = false;
            return enumAction.unduck;
        }
        return enumAction.jump;
    } else if (state.arrDDistance[0] < 120 + 0.12 * state.nScore && state.arrDDistance[0] > -25 - 0.12 * state.nScore && (state.arrNObstaclesID[0] == 4)) {
        if (bDuck) {
            bDuck = false;
            return enumAction.unduck;
        }
        return enumAction.jump;
    } else if (state.arrDDistance[0] < 120 + 0.12 * state.nScore && state.arrDDistance[0] > -35 - 0.12 * state.nScore && (state.arrNObstaclesID[0] == 5)) {
        if (bDuck) {
            bDuck = false;
            return enumAction.unduck;
        }
        return enumAction.jump;
    } else if (state.arrDDistance[0] < 120 + 0.12 * state.nScore && state.arrDDistance[0] > -38 && !(state.arrNObstaclesID[0] == 0 || state.arrNObstaclesID[0] == 1 || state.arrNObstaclesID[0] == 4 || state.arrNObstaclesID[0] == 5)) {
        bDuck = true;
        return enumAction.duck;
    } else {
        if (!state.bGrounded) {
            bDuck = true;
            return enumAction.duck;
        }
        bDuck = false;
        return enumAction.unduck;
    }
}