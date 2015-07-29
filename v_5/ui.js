var ui = {
	customList: function(options, id, op) {
		var select = document.createElement('select'),
		option;
		select.setAttribute('id', "txt_"+id);
		for(var optionIndex=0; optionIndex<options.length; optionIndex++) {
			option = document.createElement('option');
			option.setAttribute('value', options[optionIndex]);
			option.appendChild(document.createTextNode(options[optionIndex]));
			select.appendChild(option);
		}
		select.setAttribute('class', 'op_select');
		if(document.getElementById('btn_go_' + op)) {
			var btnElement = document.getElementById('btn_go_' + op);
			btnElement.parentNode.insertBefore(select, btnElement);
		} else {
			document.getElementById("div_operation_"+op).appendChild(select);
		}
	},
	create_table: function(config, id, op) {
		var options = [];
		for(var index in dataStore) {
			options.push(index);
		}
		ui.customList(options, id, op);
	},
	create_field: function(config, id, op) {
		tableName = config.table || "";
		var fields = [];
		for(var index=0; index<dataStore[tableName].fields.length; index++) {
			fields.push(dataStore[tableName].fields[index].name);
		}
		ui.customList(fields, id, op);
	},
	create_button: function(callBack, op){console.log(op);
		var button = document.createElement('input');
		button.setAttribute('type', 'button');
		button.setAttribute('value', "Go");
		button.setAttribute('id', "btn_go_"+op);
		button.addEventListener('click', callBack);
		document.getElementById("div_operation_"+op).appendChild(button);	
	},
	create_query: function(config, id, op) {
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("id", "txt_"+id);
		input.setAttribute("placeholder", "Enter the searchQuery");
		if(document.getElementById('btn_go_' + op)) {
			var btnElement = document.getElementById('btn_go_' + op);
			btnElement.parentNode.insertBefore(input, btnElement);
		} else {
			document.getElementById("div_operation_"+op).appendChild(input);
		}
		
	}
	
}