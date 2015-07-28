/**
* This file holds list of all the operations
* Every operation will have the following attributes
* config: this attribute holds the priority wise dependency list for the operation
*/
var operationArray = {
    sort: {
        config: [{
            name: "table_name",
            type: "text",
        }, {
            name: "attribute_name",
            type: "text"
        }, {
            name: "order",
            type: "list",
            options: ['asc', 'desc']
        }],
        click: function() {

            // operations based on configuration
            if(operationArray.sort.config.length) {
                index = 0;
                var html = ui[operationArray.sort.config[index].type].getHTML(operationArray.sort.config[index].name);
                document.getElementById('div_sort').innerHTML = html;
            }
            operationArray.sort.operation();
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