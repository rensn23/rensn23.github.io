import { plot3 } from './demoHouse03.js';
import { plot2 } from './demoHouse02.js';

var resultID = 0;

export class ResultHandler {

    //Queue with all the results
    liResultQueue = [];

    //Adds a single result to the queue
    addResult(result) {
        this.liResultQueue.push(result);
    }

    //Adds a list of results to the queue
    addResultList(resultList) {
        resultList.forEach(result => {
            this.liResultQueue.push(result);
        });
    }

    //Removes the first element of the queue and returns it
    getNextResult() {
        if (this.liResultQueue.length == 0) {
            console.log("The Result-Queue is empty! Add a result first!")
            return null;
        }
        this.sortResultQueue();
        return this.liResultQueue.shift();
    }

    //Sorts the queue based of the evaluation scores
    sortResultQueue() {
        this.liResultQueue.sort(compare)
    }
}

export class Result {
    constructor(plot, evaluationScore = 0, spiderNet = undefined) {
        this.plot = plot;

        this.id = resultID;
        resultID++;

        this.evaluationScore = evaluationScore;

        this.spiderNet = spiderNet;
    }
}

export var demoResult3 = new Result(plot3);
export var demoResult2 = new Result(plot2);

//compare function used by the sort-function (descending!)
function compare(a, b) {
    if (a.evaluationScore < b.evaluationScore) return 1
    else if (a.evaluationScore > b.evaluationScore) return -1
    else return 0;
}