/**
 * This file holds list of all the operations
 * Every operation will have the following attributes
 * config: this attribute holds the priority wise dependency list for the operation
 */
var operationArray = {
    sort: {
        config: [{
            name: 'table',
            methodName: "table",
            displayText: "Please select the table"
        }, {
            name: 'field',
            methodName: "field",
            displayText: "Please select the Field of the table"
        }, {
            name: "order",
            methodName: "list",
            displayText: "Please select the order",
            value: ["DESC", "ASC"]
        }],
        click: function() {
            var operationParam = {},
                index = 0,
                thisOp = operationArray.sort,
                localConfig = thisOp.config,
                config_i = localConfig[index]
            callBack = function() {
                if (index < localConfig.length) {
                    operationParam[config_i.name] = document.getElementById("txt_" + config_i.name + "_" + index).value;
                    index += 1;
                    config_i = localConfig[index];
                    if (index == localConfig.length) {
                        operationArray.sort.operation(operationParam);
                    } else {
                        // put the comment
                        ui.update_comment(config_i.displayText);
                        // create the input
                        ui["create_" + config_i.methodName](operationParam, config_i.name + "_" + index, config_i.value);
                    }
                } else {
                    operationArray.sort.operation(operationParam);
                }
            };
            // clear the ui
            ui.clear_ui();
            // put the comment
            ui.update_comment(config_i.displayText);
            // create the first input
            ui["create_" + config_i.methodName](operationParam, config_i.name + "_" + index, config_i.value);
            // create the button
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
        config: [{
            name: 'table',
            methodName: "table",
            displayText: "Please select the table"
        }, {
            name: 'query',
            methodName: "query",
            displayText: "Please enter the query for search"
        }],
        click: function() {
            var operationParam = {},
            index=0,
            callBack=function(){
                if(index==operationArray.search.config.length-1) {
                    operationParam[operationArray.search.config[index].name] = document.getElementById("txt_"+operationArray.search.config[index].name+"_"+index).value;
                    operationArray.search.operation(operationParam);
                } else {
                    operationParam[operationArray.search.config[index].name] = document.getElementById("txt_"+operationArray.search.config[index].name+"_"+index).value;
                    index += 1;
                    ui["create_" + operationArray.search.config[index].methodName](operationParam, operationArray.search.config[index].name+"_"+index);
                }
            };

            ui.clear_ui();
            
            ui["create_" + operationArray.search.config[index].methodName](operationParam,  operationArray.search.config[index].name + "_" + index);

            ui.create_button(callBack, "search");
            
            

        },
        operation: function(config) {
            var b = new Benchmark("search");
            var returnObject = {};
            mainDatabase[config.table].find({}, function(e, r){
                returnObject["data-length"] = r.length;
            });
            b.startTimer();
            mainDatabase[config.table].find(config.query, function(err, records){
                returnObject["effected-row"] = records.length;
                returnObject["remarks"] = "operation performed on  "+returnObject["data-length"]+" rows, "+returnObject["effected-row"]+ " rows effected";
                b.stopTimer(returnObject);
                console.log(records.length);
            })
            

            // do the operation here




            
        }
    },
    serialize: {
        click: function() {
            // clear the ui
            ui.clear_ui();
            operationArray.serialize.operation();
        },
        operation: function(config) {
            var b = new Benchmark("serialize");
            b.startTimer();
            // do the operation here




            b.stopTimer();
        }
    },
    grouping: {
        config: [{
            name: 'table',
            methodName: "table",
            displayText: "Please select the table"
        }, {
            name: 'attributes',
            methodName: "attributes",
            displayText: "select one attribute to group"
        },{
            name: 'suboperation',
            methodName: "suboperation",
            displayText: "select the sub operation",
            subOperationList: ["sort", "filter", "aggregate", "highlight"]
        }, {
            name: 'query',
            methodName: "query",
            displayText: "Please enter the query for search"
        }],
        click: function() {
            var operationParam = {},
            index=0,
            callBack=function(){
                if(index==operationArray.grouping.config.length-1) {
                    operationParam[operationArray.grouping.config[index].name] = document.getElementById("txt_"+operationArray.grouping.config[index].name+"_"+index).value;
                    operationArray.grouping.operation(operationParam);
                } else {
                    operationParam[operationArray.grouping.config[index].name] = document.getElementById("txt_"+operationArray.grouping.config[index].name+"_"+index).value;
                    index += 1;
                    if(operationArray.grouping.config[index].methodName=="suboperation") {
                        ui["create_" + operationArray.grouping.config[index].methodName](operationParam, operationArray.grouping.config[index].name+"_"+index, operationArray.grouping.config[index].subOperationList);                        
                    } else {
                        ui["create_" + operationArray.grouping.config[index].methodName](operationParam, operationArray.grouping.config[index].name+"_"+index);
                    }
                }
            };
            ui.clear_ui();
            
            ui["create_" + operationArray.grouping.config[index].methodName](operationParam,  operationArray.grouping.config[index].name + "_" + index);

            ui.create_button(callBack, "grouping");
        },
        operation: function(config) {console.log(config);
            var b = new Benchmark("grouping");
            var returnObject = {};
            b.startTimer();
            // do the operation here


            b.stopTimer();
        }
    }
}
