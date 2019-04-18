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
		initOrderTable : function(){
			$('#orderPopup').on('show.bs.modal', function() {
				$("#order_info").html("");
				orderModule.getOrder($("#orderId").val());
			});
		},

		showPopupOrderDetail : function(id, printUrl){
		
		$("#orderId").val(id);
		$("#btnPrint").attr("href", printUrl);
		$("#orderPopup").modal("show");
		},

    
        getOrder : function(id){
	    	$.blockUI();
			$.ajax({
				
				url :id,
				type : 'GET',
				data:{ id: id },
				success : function(response) {
					$.unblockUI();
					$("#order_info").html(response.data);
				},
				error : function(error) {	
					alert('Loi~');
					$.unblockUI();
				}
			});
	    },
		
	    alertScreen : function(text)
	    {
	    	alert(text);
	    }
    }
	return self;
}();
