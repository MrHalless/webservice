var
	ICON_GENERAL = 0,
	ICON_WARNING = 1,
	ICON_SUCCESS = 2,
	ICON_ERROR = 3;

	COMMUTATOR_STATUS_SERVER = "http://127.0.0.1:8081/",
	AUTHENTICATION_SERVER = "http://127.0.0.1:8081",
	DEVICE_LIST_SERVER = "http://127.0.0.1:8081";
	DEVICE_STATUS_SERVER = "http://127.0.0.1:8081";

var logMessage = function(type,msg){
	var d = new Date();
	var s = "";
	s = '<tr>';
	s += '<td class=\"cell-xsmall\">';
	s += d.getDate()<10?("0"+d.getDate()): d.getDate();
	s += '.';
	s += d.getMonth()<10?("0"+d.getMonth()): d.getMonth();
	s += '.';
	s += d.getFullYear();
	s += '</td>';
	s += '<td class=\"cell-xsmall\">'; 
	s += d.getHours()<10?("0"+d.getHours()): d.getHours();
	s += ':'; 
	s += d.getMinutes()<10?("0"+d.getMinutes()): d.getMinutes();
	s += ':'; 
	s += d.getSeconds()<10?("0"+d.getSeconds()): d.getSeconds(); 
	s += '</td>';
	switch(type){
		case ICON_WARNING:
			s += '<td class="cell-xlarge"><i class="fa fa-exclamation-triangle" style="color:yellow; text-shadow: black 0 0 2px;"></i>';
			break;
		case ICON_ERROR:
			s += '<td class="cell-xlarge"><i class="fa fa-times-circle" style="color:red " ></i>';
			break;
		case ICON_SUCCESS:
			s += '<td class="cell-xlarge"><i class="fa fa-check-circle" style="color:green"></i>';
			break;
		case ICON_GENERAL:
			s += '<td class="cell-xlarge"><i class="fa fa-info-circle" style="color:blue"></i>';
			break;
		default:
			s += '<td class="cell-xlarge"><i class="fa fa-question-circle"></i>';
	}
	s += "     ";
	s += msg;
	s += '</td></tr>';
	$(s).appendTo("#msglog");
};