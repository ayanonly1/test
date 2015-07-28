var ui = {
	text: {
		getHTML: function(attributeName, isMandatory) {
			var html = "<label> Enter the value for "+attributeName+"</label>";
			html+= "<input type='text' id='txt_"+attributeName+"'>";
			html += "<button>Submit</button>";
			return html;			
		}
	},
	list: {
		getHTML: function(attributeName, isMandatory, options) {
			var html = "<label> Select the value for "+attributeName+"</label>";
			html += "<select id='sel_"+attributeName+"'>";

			for(var optionIndex in options) {
				html+="<option value='"+options[optionIndex]+"'>"+options[optionIndex]+"</option>"
			}
			return html;
		}
	}
}