var ui = {
	text: {
		getHTML: function(attributeName) {
			var html = "<label> Enter the value for "+attributeName+"</label>";
			html+= "<input type='text' id='txt_"+attributeName+"'>";
			html += "<button id='btn_submit_"+attributeName+"'>Submit</button>";
			return html;			
		}
	},
	list: {
		getHTML: function(attributeName, options) {
			var html = "<label> Select the value for "+attributeName+"</label>";
			html += "<select id='sel_"+attributeName+"'>";

			for(var optionIndex in options) {
				html+="<option value='"+options[optionIndex]+"'>"+options[optionIndex]+"</option>"
			}
			html += "<button id='btn_submit_"+attributeName+"'>Submit</button>";
			return html;
		}
	}
}