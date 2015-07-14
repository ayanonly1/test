var Table = (function() {
	this.tableName = "";
	this.tableData = [];
	this.tableFieldNames = [];
});

var tableArray = [];

var tableExists = (function(tableName) {
	if(!tableArray.length) {
		return false;
	} else {
		var flag = 0;
		for(var tableIndex in tableArray) {
			if(tableArray[tableIndex].tableName == tableName) {
				flag = 1;
				break;
			}
		}
		return flag;
	}
});

var getFieldsName = (function(numberOfColoumns) {
	var fieldNames = [];
	for(var index=0; index<numberOfColoumns; index++) {
		var data = prompt("Please enter no:"+(index+1)+" Field's name");
		if(data.trim()) {
			fieldNames.push(data);
		} else {
			alert("Invalid data");
			index-=1;
		}
	}
	return fieldNames;
});

var getTableData = (function(fieldNames, numberOfRow) {
	var tableData = [];
	for(var index=0; index<numberOfRow; index++) {
		tableData[index] = [];
		for(var fieldNameIndex in fieldNames) {
			tableData[index].push('0');
		}
	}
	return tableData;
});

var getTableHTMLFromTableInfo = (function(tableName, tableFieldNames, tableData) {
	var tableHTML = '<div><caption>'+tableName+'</caption><br/><table border="1" id="'+tableName+'"><tr>';
	for(var fieldIndex in tableFieldNames) {
		tableHTML += '<th>' + tableFieldNames[fieldIndex] + '</th>';
	}
	tableHTML += '</tr>';
	for(var dataIndex1 in tableData) {
		tableHTML += "<tr>";
		for(var dataIndex2 in tableData[dataIndex1]) {
			tableHTML += '<td>'+tableData[dataIndex1][dataIndex2]+'</td>';
		}
		tableHTML+="</tr>";
	}
	return tableHTML;
});

var displayTable = (function(tableObject) {
	var tableName = tableObject.tableName;
	var tableFieldNames = tableObject.tableFieldNames;
	var tableData = tableObject.tableData;
	var tableHTML = getTableHTMLFromTableInfo(tableName, tableFieldNames, tableData);
	if(document.getElementById(tableName)) {
		document.getElementById(tableName).parentNode.parentNode.removeChild(document.getElementById(tableName));
	}
	document.getElementById('div_tableContainer').innerHTML += tableHTML;
});

/**
* Interaction parts begins here
*/

document.getElementById("btn_addTable").addEventListener('click', function(event){
	event.preventDefault();
	var tableName = document.getElementById("txt_nameOfTable").value;
	if(!tableExists(tableName)) {
		var numberOfRows = document.getElementById("txt_numberOfRows").value;
		var numberOfColoumns = document.getElementById("txt_numberOfColoumns").value;
		var fieldNames = [];
		fieldNames = getFieldsName(numberOfColoumns);
		var tableObject = new Table();
		tableObject.tableName = tableName;
		tableObject.tableFieldNames = fieldNames;
		tableObject.tableData = getTableData(fieldNames, numberOfRows);
		tableArray.push(tableObject);
		displayTable(tableObject);
	}
	
});