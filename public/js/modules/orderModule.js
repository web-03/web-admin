var orderModule = function() {
	//private function
	function test() {};

    //public function
    var self = {
        // init function when page load
        init: function() {
        	$("#status").select2();
           
           	var status = getParameterByName('status');
	   		var name = getParameterByName('name');
	
	   		$('#status').val(status || -1);
	   		$('#name').val(name || "");
        },
        
        alertScreen: function(text) {
            alert(text);
        },
        
        changeStatus: function(text) {
            alert(text);
        }
    };
	return self;
}();
