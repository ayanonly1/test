var ui = {
	customList: function(options, id) {
		var select = document.createElement('select'),
		option;
		select.setAttribute('id', "txt_"+id);
		for(var optionIndex=0; optionIndex<options.length; optionIndex++) {
			option = document.createElement('option');
			option.setAttribute('value', options[optionIndex]);
			option.appendChild(document.createTextNode(options[optionIndex]));
			select.appendChild(option);
		}
		document.getElementById("div_operation").appendChild(select);
	},
	create_table: function(config, id) {
		var options = [];
		for(var index in dataStore) {
			options.push(index);
		}
		ui.customList(options, id);
	},
	create_field: function(config, id) {
		tableName = config.table || "";
		var fields = [];
		for(var index=0; index<dataStore[tableName].fields.length; index++) {
			fields.push(dataStore[tableName].fields[index].name);
		}
		ui.customList(fields, id);
	},
	create_button: function(callBack){
		var button = document.createElement('input');
		button.setAttribute('type', 'button');
		button.addEventListener('click', callBack);
		document.getElementById("div_operation").appendChild(button);	
	}
	
}