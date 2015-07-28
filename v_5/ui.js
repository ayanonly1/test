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
	},
	// drawList: function() {},
	text: {
		getHTML: function(attributeName, isMandatory) {
			var html = "<label> Enter the value for "+attributeName+"</label>";
			html+= "<input type='text' id='txt_"+attributeName+"'>";
			html += "<button onclick=''>Submit</button>"
			return html;			
		}
	},
	list: {
		getHTML: function(attributeName, isMandatory, options) {
			var html = "<label> Select the value for "+attributeName+"</label>";
			html += "<select id='sel_"+attributeName+"'>";
			if(!isMandatory) {
				html+="<option value='0'>None</option>"				
			}
			for(var optionIndex in options) {
				html+="<option value='"+options[optionIndex]+"'>"+options[optionIndex]+"</option>"
			}
			return html;
		}
	}
}