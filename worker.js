var createWorker = function () {

    var task1 = function () {
        //console.log("Task1");
    };

    var job2 = function () {
        //console.log("Job2");
    };

    return {
        job1: task1, job2: job2
    }
};

var worker = createWorker();

worker.job1();
worker.job2();
