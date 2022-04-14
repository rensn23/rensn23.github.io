import * as PARAMETER from "./Parameter_Classes.js"

export function checkIntParameter(intParameter) {
    let parsedIntParameter = parseInt(intParameter);
    if (isNaN(parsedIntParameter)) return undefined;
    else return parsedIntParameter;
}

export function checkFloatParameter(floatParameter) {
    let parsedFloatParameter = parseFloat(floatParameter);
    if (isNaN(parsedFloatParameter)) return undefined;
    else return parsedFloatParameter;
}

export function checkWeightParameter(weightParameter) {
    return parseFloat(weightParameter) / 10;
}

function getPlotParameters() {
    let plotParameters = [];

    //0 = Plot Length
    plotParameters[0] = checkFloatParameter(document.getElementById("inp_parameter_value_plot_length").value);
    //1 = Plot Width
    plotParameters[1] = checkFloatParameter(document.getElementById("inp_parameter_value_plot_width").value);
    //2 = Budget
    plotParameters[2] = checkFloatParameter(document.getElementById("inp_parameter_value_budget").value);
    //3 = Budget Weight
    plotParameters[3] = checkWeightParameter(document.getElementById("slider_parameter_weight_budget").value);

    return plotParameters;
}

function getHouseParameters() {
    let houseParameters = [];

    //0 = Number of Floors
    houseParameters[0] = checkIntParameter(document.getElementById("inp_parameter_value_number_of_floors").value);
    //1 = Has Basement
    houseParameters[1] = document.getElementById("checkbox_parameter_value_has_basement").checked;
    //2 = Heating Cost
    houseParameters[2] = checkWeightParameter(document.getElementById("slider_parameter_weight_heating_cost").value);
    //3 = Energy Cost
    houseParameters[3] = checkWeightParameter(document.getElementById("slider_parameter_weight_energy_cost").value);
    //4 = House Design
    houseParameters[4] = checkIntParameter(document.getElementById("dropown_parameter_value_design").value);

    return houseParameters;
}

export function createPlotClass() {
    let plotParameters = getPlotParameters();
    return new PARAMETER.Plot(plotParameters[0], plotParameters[1], plotParameters[2], plotParameters[3]);
}

export function createHouseClass() {
    let houseParameters = getHouseParameters();
    return new PARAMETER.House(houseParameters[0], houseParameters[1], houseParameters[2], houseParameters[3], houseParameters[4], undefined, undefined, undefined);
}