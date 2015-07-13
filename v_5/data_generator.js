// table-1 
var possibleTxt = "abcdefghijklmnopqrstuvwxyz0123456789",
    possibleName = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    possibleNameLower = "abcdefghijklmnopqrstuvwxyz",
    publicEmailDomain = ["gmail.com", "rediffmail.com", "yahoo.com", "hotmail.com"],
    possibleYear = [2010, 2011, 2012, 2013, 2014, 2015],
    possibleMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    generateRandomNumber = function(start, end, decimal) {
        var range,
            decimalRange;
        start = start || 0;
        end = end || 100;
        decimal = decimal | 0;
        range = end - start;
        if (decimal) {
            decimalRange = Math.pow(10, Math.floor(decimal));
            return start + (Math.floor(Math.random() * range * decimalRange) / decimalRange);
        } else {
            return start + Math.floor(Math.random() * range);
        }
    },
    generateRandomBoolean = function() {
        return Math.random() > 0.5;
    },
    table_config = {};

    table_config[tableName[0]] = [{
        name: "Customer Name",
        dataGenerator: function() {
            var name = "",
                firstNameLenght = generateRandomNumber(3, 10),
                lastNameLenght = generateRandomNumber(3, 10);
            for (var i = 0; i < firstNameLenght; i++) {
                name += possibleName.charAt(Math.floor(Math.random() * possibleName.length));
            }
            name += " ";
            for (var i = 0; i < lastNameLenght; i++) {
                name += possibleName.charAt(Math.floor(Math.random() * possibleName.length));
            }
            return name;
        }
    }, {
        name: "Customer Email",
        dataGenerator: function() {
            var email = "",
                emailLength = generateRandomNumber(3, 15),
                domainLength,
                domainTypeLength;
            for (var i = 0; i < emailLength; i++) {
                email += possibleTxt.charAt(Math.floor(Math.random() * possibleTxt.length));
            }
            email += "@";
            if (generateRandomBoolean()) {
                email += publicEmailDomain[Math.floor(Math.random() * publicEmailDomain.length)];
            } else {
                domainLength = generateRandomNumber(3, 5);
                domainTypeLength = generateRandomNumber(2, 5);
                for (var i = 0; i < domainLength; i++) {
                    email += possibleNameLower.charAt(Math.floor(Math.random() * possibleNameLower.length));
                }
                email += ".";
                for (var i = 0; i < domainTypeLength; i++) {
                    email += possibleNameLower.charAt(Math.floor(Math.random() * possibleNameLower.length));
                }
            }
            return email;
        }
    }, {
        name: "Order Date",
        dataGenerator: function() {
            var date = "";
            date += generateRandomNumber(1, 30);
            date += "/";
            date += generateRandomNumber(1, 12);
            date += "/";
            date += generateRandomNumber(2010, 2016);
            return date;
        }
    }, {
        name: "Order Amount",
        dataGenerator: function() {
            return generateRandomNumber(1, 10000, 2);
        }
    }, {
        name: "Profit",
        arg: "Order Amount",
        dataGenerator: function(orderAmount) {
            orderAmount = orderAmount || 10;
            return generateRandomNumber(-orderAmount / 4, orderAmount / 2, 2);
        }
    }];


function generateData(no_entry, tableName) {
    var i = 0, j,
        data = {},
        tableConf = table_config[tableName],
        columnLength = tableConf.length, columConfig;
    for (; i < columnLength; i++) {
        data[tableConf[i].name] = [];
    }
    for (i = 0; i < no_entry; i++) {
        for (j = 0; j < columnLength; j ++) {
            columConfig = tableConf[j];
            data[columConfig.name][i] = columConfig.dataGenerator(columConfig.arg ? data[columConfig.arg][i] : undefined);
        }
    }
    return data;
}