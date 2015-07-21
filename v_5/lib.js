// table-1 
var possibleTxt = "abcdefghijklmnopqrstuvwxyz0123456789",
    possibleName = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    possibleNameLower = "abcdefghijklmnopqrstuvwxyz",
    publicEmailDomain = ["gmail.com", "rediffmail.com", "yahoo.com", "hotmail.com"],
    possibleYear = [2010, 2011, 2012, 2013, 2014, 2015],
    possibleMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    lib = {
        generateRandomNumber: function(start, end, decimal) {
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
        genRandomNoGenerator: function(start, end, decimal) {
            var range,
                decimalRange;
            start = start || 0;
            end = end || 100;
            decimal = decimal | 0;
            range = end - start;
            if (decimal) {
                decimalRange = Math.pow(10, Math.floor(decimal));
                return function() {
                    return start + (Math.floor(Math.random() * range * decimalRange) / decimalRange)
                };
            } else {
                return function() {
                    return start + Math.floor(Math.random() * range)
                };
            }
        },
        generateRandomBoolean: function() {
            return Math.random() > 0.5;
        },
        generateRandomText: function(min, max, upperCase) {
            var text = "",
                legth = lib.generateRandomNumber(min, max),
                i,
                textCollection = upperCase ? possibleName : possibleNameLower;
            for (i = 0; i < legth; i++) {
                text += textCollection.charAt(Math.floor(Math.random() * textCollection.length));
            }
            return text;
        },
        generateName: function() {
            return lib.generateRandomText(3, 10, true) + " " + lib.generateRandomText(3, 10, true);
        },
        generateEmail: function() {
            var email = "",
                emailLength = lib.generateRandomNumber(3, 15),
                domainLength,
                domainTypeLength;
            for (var i = 0; i < emailLength; i++) {
                email += possibleTxt.charAt(Math.floor(Math.random() * possibleTxt.length));
            }
            email += "@";
            if (lib.generateRandomBoolean()) {
                email += publicEmailDomain[Math.floor(Math.random() * publicEmailDomain.length)];
            } else {
                domainLength = lib.generateRandomNumber(3, 5);
                domainTypeLength = lib.generateRandomNumber(2, 5);
                for (var i = 0; i < domainLength; i++) {
                    email += possibleNameLower.charAt(Math.floor(Math.random() * possibleNameLower.length));
                }
                email += ".";
                for (var i = 0; i < domainTypeLength; i++) {
                    email += possibleNameLower.charAt(Math.floor(Math.random() * possibleNameLower.length));
                }
            }
            return email;
        },
        dataGenerator: function() {
            var date = "";
            date += lib.generateRandomNumber(1, 30);
            date += "/";
            date += lib.generateRandomNumber(1, 12);
            date += "/";
            date += lib.generateRandomNumber(2010, 2016);
            return date;
        }
    },
    // max no od data can be generated synchronously
    maxIteration = 300000;
/*
 * Function that will generate any no of data. 
 * This function checks whether the data can be generated synchronously or not
 */

function generateData(no_entry, tableConf, callBack) {
    var doneCount = 0,
        remaningCount,
        localCallBack = function(noDone) {
            doneCount += noDone;
            if (doneCount === no_entry) {
                callBack && setTimeout(function() {
                    callBack(no_entry, tableConf.data.length);
                }, 0);
            }
        },
        fieldsIndex = tableConf.fieldsIndex; // this should be created only once and should be reused

    if (!fieldsIndex) {
        fieldsIndex = {};
        for (j = 0; j < columnLength; j++) {
            fieldsIndex[fields[j].name] = j;
        }
        tableConf.fieldsIndex = fieldsIndex;
    }

    remaningCount = no_entry;
    // check whetehr generation can be synchronously
    if (maxIteration < no_entry) {
        while (remaningCount >= maxIteration) {
            // do asynchronous data generation
            setTimeout(function() {
                gendata(maxIteration, tableConf, localCallBack);
            }, 1);
            remaningCount -= maxIteration;
        }
    }
    remaningCount && gendata(remaningCount, tableConf, localCallBack);
}

/*
 * Function to generate given no data synchronously
 */

function gendata(no_entry, tableConf, callBack) {
    var i = 0,
        j,
        data = tableConf.data,
        dataLen = data.length,
        fields = tableConf.fields,
        columnLength = fields.length,
        columConfig,
        row,
        fieldsIndex = tableConf.fieldsIndex; // this should be created only once and should be reused


    for (i = 0; i < no_entry; i++, dataLen++) {
        row = [];
        for (j = 0; j < columnLength; j++) {
            columConfig = fields[j];
            if (columConfig.arg) {
                row[j] = columConfig.dataGenerator(row[fieldsIndex[columConfig.arg]])
            } else {
                row[j] = columConfig.dataGenerator()
            }
        }
        data[dataLen] = row;
    }

    callBack && callBack(no_entry);

}