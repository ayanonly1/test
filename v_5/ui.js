var ui = {
    create_list: function(config, id, options) {
        var select = document.createElement('select'),
            option;
        select.setAttribute('id', "txt_" + id);
        for (var optionIndex = 0; optionIndex < options.length; optionIndex++) {
            option = document.createElement('option');
            option.setAttribute('value', options[optionIndex]);
            option.appendChild(document.createTextNode(options[optionIndex]));
            select.appendChild(option);
        }
        select.setAttribute('class', 'op_select');
        if (document.getElementById('btn_go')) {
            var btnElement = document.getElementById('btn_go');
            btnElement.parentNode.insertBefore(select, btnElement);
        } else {
            document.getElementById("div_operation").appendChild(select);
        }
    },
    create_table: function(config, id) {
        var options = [];
        for (var index in dataStore) {
            options.push(index);
        }
        ui.create_list({}, id, options);
    },
    create_field: function(config, id) {
        tableName = config.table || "";
        var fields = [];
        for (var index = 0; index < dataStore[tableName].fields.length; index++) {
            fields.push(dataStore[tableName].fields[index].name);
        }
        ui.create_list({}, id, fields);
    },
    create_button: function(callBack) {
        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', "Go");
        button.setAttribute('id', "btn_go");
        button.addEventListener('click', callBack);
        document.getElementById("div_operation").appendChild(button);
    },
    update_comment: function(comment) {
    	comment == typeof comment === "undefined" ? "" : comment;
    	document.getElementById("div_operation_comment").innerHTML = comment;
    },
    clear_ui: function() {
        var container = document.getElementById("div_operation");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
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