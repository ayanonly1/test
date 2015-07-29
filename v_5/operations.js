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
            callBack=function(){
                if(index==operationArray.sort.config.length-1) {
                    operationArray.sort.operation(operationParam);
                } else {
                    operationParam[operationArray.sort.config[index]] = document.getElementById("txt_"+operationArray.sort.config[index] + "_" + index).value;
                    index += 1;
                    ui["create_" + operationArray.sort.config[index]](operationParam, operationArray.sort.config[index] + "_" + index, "sort");
                }
            };

            ui["create_" + operationArray.sort.config[index]](operationParam, operationArray.sort.config[index] + "_" + index, "sort");

            ui.create_button(callBack, "sort");
            
        },
        operation: function(config) {


            var b = new Benchmark("sort");
            b.startTimer();
            // do the operation here




            b.stopTimer();
        }
    },
    search: {
        config: ['table','query'],
        click: function() {
            var operationParam = {},
            index=0,
            callBack=function(){
                if(index==operationArray.search.config.length-1) {
                    operationParam[operationArray.search.config[index]] = document.getElementById("txt_"+operationArray.search.config[index]).value;
                    operationArray.search.operation(operationParam);
                } else {
                    operationParam[operationArray.search.config[index]] = document.getElementById("txt_"+operationArray.search.config[index]).value;
                    index += 1;
                    ui["create_" + operationArray.search.config[index]](operationParam, operationArray.search.config[index], "search");
                }
            };

            ui["create_" + operationArray.search.config[index]](operationParam, operationArray.search.config[index], "search");

            ui.create_button(callBack, "search");
        },
        operation: function(config) {
            var b = new Benchmark("search");
            b.startTimer();
            mainDatabase[config.table].find(config.query, function(err, records){
                b.stopTimer();
                console.log(records.length);
            })
            

            // do the operation here




            
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