/**
* This file holds list of all the operations
* Every operation will have the following attributes
* config: this attribute holds the priority wise dependency list for the operation
*/
var operationArray = {
    sort: {
        config: ['table', 'field'],
        click: function() {
            var operationParam = {},
            index=0,
            callBack=function(){console.log("asfsd");
                if(index==operationArray.sort.config.length-1) {
                    operationArray.sort.operation(operationParam);
                } else {console.log("txt_"+operationArray.sort.config[index] + "_" + index);
                    operationParam[operationArray.sort.config[index]] = document.getElementById("txt_"+operationArray.sort.config[index] + "_" + index).value;
                    index += 1;
                    ui["create_" + operationArray.sort.config[index]](operationParam, operationArray.sort.config[index] + "_" + index);
                }
            };

            ui["create_" + operationArray.sort.config[index]](operationParam, operationArray.sort.config[index] + "_" + index);

            ui.create_button(callBack);
            
        },
        operation: function(config) {


            var b = new Benchmark("sort");
            b.startTimer();
            // do the operation here




            b.stopTimer();
        }
    },
    search: {
        click: function() {
            operationArray.search.operation();
        },
        operation: function(config) {
            var b = new Benchmark("search");
            b.startTimer();
            // do the operation here




            b.stopTimer();
        }
    },
    serialize: {
        click: function() {
            operationArray.serialize.operation();
        },
        operation: function(config) {
            var b = new Benchmark("serialize");
            b.startTimer();
            // do the operation here




            b.stopTimer();
        }
    }
}