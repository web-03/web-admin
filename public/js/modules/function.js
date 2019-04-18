var adminFunction = function() {
	//private function
	function test() {};

    //public function
    var self = {
        // init function when page load
        init: function() {
            if (typeof $(".input-ckeditor").val() !== "undefined") {
                CKEDITOR.replaceClass = 'input-ckeditor';
            }
            
            $(".city-select-box-load_district").on("change", function(){
                $.blockUI();
                $.ajax({
                    url: pageSettings.webPath + "districts",
                    type: 'GET',
                    data: {cityId: $(this).val()},
                    success: function(response) {
                        $.unblockUI();
                        $(".district-select-box-load_ward").empty();
                        $(".district-select-box-load_ward").append('<option value="0">Chọn quận/huyện</option>');
                        $(".ward-select-box-load").empty();
                        $(".ward-select-box-load").append('<option value="0">Chọn phường/xã</option>');
                        var districts = response.data;
                        $.each(districts, function(index, item){
                            var html = "<option value='" + item.id + "'>" + item.name + "</option>"
                            $(".district-select-box-load_ward").append(html);
                        });
                        $(".district-select-box-load_ward").val(0);
                        $(".ward-select-box-load").val(0);
                    },
                    error: function(error) {
                        $.unblockUI();
                    }
                });
            });

            $(".district-select-box-load_ward").on("change", function(){
                $.blockUI();
                $.ajax({
                    url: pageSettings.webPath + "wards",
                    type: 'GET',
                    data: {districtId: $(this).val()},
                    success: function(response) {
                        $.unblockUI();
                        $(".ward-select-box-load").empty();
                        $(".ward-select-box-load").append('<option value="0">Chọn phường/xã</option>');
                        var wards = response.data;
                        $.each(wards, function(index, item){
                            var html = "<option value='" + item.id + "'>" + item.name + "</option>"
                            $(".ward-select-box-load").append(html);
                        });
                        $(".ward-select-box-load").val(0);
                    },
                    error: function(error) {
                        console.log(error);
                        $.unblockUI();
                    }
                });
            });
            
        },
        
        initDataTableWithoutAjax: function() {
        	var dataTable = $('.dt').DataTable({
    		    dom: 'Bfrtip',
    		    responsive: true,
    	        buttons: [
    	            'excel'
    	        ],
    	        drawCallback: function(row, data, start, end, display) {
    	        	this.api().columns('.sum', {page:'current'}).every(function () {
    	                var column = this;
    	                var sum = column
    	                   .data()
    	                   .reduce(function (a, b) { 
    	                       a = parseInt(a, 10);
    	                       if(isNaN(a)){ a = 0; }
    	                       
    	                       b = parseInt(b, 10);
    	                       if(isNaN(b)){ b = 0; }
    	                       
    	                       return a + b;
    	                   });

    	                $(column.footer()).html(sum);
    	            });
    	        }
    		});
        	
        	dataTable.columns.adjust().draw();
        	return dataTable;
        },
        
        initDataTable: function(displayItem, ajaxUrl, ajaxData, columns) {
        	var isFixHeader = false;
        	var dataTable = $('.dt-ajax').DataTable({
    			//serverSide: true,
    			//paging: true,
    			//searching: false,
    			//dom: 'lrtip',
    			/* dom: 'C<"clear">lfrtip',
    			colVis: {
    		        restore: "Restore",
    		        showAll: "Show all",
    		        showNone: "Show none"
    		    }, */
    		    dom: 'Bfrtip',
    		    responsive: true,
    		    scrollX: true,
    	        buttons: [
    	            'excel'
    	        ],
    	        colVis: {
    		        restore: "Restore",
    		        showAll: "Show all",
    		        showNone: "Show none"
    		    },
    			lengthChange: false,
    	        pageLength: displayItem,
    	        ajax: function (data, callback, settings) {
    	        	$.ajax({
    	                url: ajaxUrl,
    	                type: 'GET',
    	                /* data: {
    	                	page: (data.start / ${limit}) + 1, 
    	                	name: data.search.value, 
    	                	status: $("#employeeStatus").val()
    	                }, */
    	                data: ajaxData,
    	                beforeSend: function() {
    	                	$.blockUI();
    	                },
    	                success: function(response, textStatus, jQxhr){
    	                    callback({
    	                        data: response.data.list
    	                        //recordsTotal: response.data.total,
    	                        //recordsFiltered: response.data.total
    	                    });
    	                },
    	                error: function(jqXhr, textStatus, errorThrown){
    	                	alert(textStatus);
    	                },
    	                complete: function() {
    	                	$.unblockUI();
    	                }
    	            });
    	        },
    		    columns: columns,
    		    fnDrawCallback: function( oSettings ) {
    		    	$('.show-tooltip').on('mouseenter', function() {
        				if($(this).attr("data-original-title") !== ""){
        					$(this).tooltip('show');
        				}
        			});
                	self.initDataTableSwitchery();
                	
    		    }
    		});
        	setTimeout(function(){ dataTable.columns.adjust().draw(); }, 1000);
        	return dataTable;
        },
        
        initDataTable1: function(displayItem,dataPupop1, columns) {
        	var isFixHeader = false;
        	var dataPupop = $('.dt-ajax1').DataTable({
    			//serverSide: true,
    			//paging: true,
    			//searching: false,
    			//dom: 'lrtip',
    			/* dom: 'C<"clear">lfrtip',
    			colVis: {
    		        restore: "Restore",
    		        showAll: "Show all",
    		        showNone: "Show none"
    		    }, */
    		    dom: 'Bfrtip',
    		    responsive: true,
    		    scrollX: true,
    	        buttons: [
    	            'excel'
    	        ],
    	        colVis: {
    		        restore: "Restore",
    		        showAll: "Show all",
    		        showNone: "Show none"
    		    },
    			lengthChange: false,
    	        pageLength: displayItem,
    		    columns: columns,
    		    data: dataPupop1,
    		    fnDrawCallback: function( oSettings ) {
    		    	$('.show-tooltip').on('mouseenter', function() {
        				if($(this).attr("data-original-title") !== ""){
        					$(this).tooltip('show');
        				}
        			});
                	self.initDataTableSwitchery();
                	
    		    }
    		});
        	setTimeout(function(){ dataPupop.columns.adjust().draw(); }, 1000);
        	return dataPupop;
        },
        
        initDataTableSwitchery: function(){
        	var i = 0;
            if (Array.prototype.forEach) {
                var elems = $('.dt-switchery');
                $.each( elems, function( key, value ) {
                	if(value.getAttribute("is_inited") == null || value.getAttribute("is_inited") == false){
                		value.setAttribute("is_inited", true);
                		
                		var $size="", $color="",$sizeClass="", $colorCode="";
                        $size = $(this).data('size');
                        var $sizes ={
                            'lg' : "large",
                            'sm' : "small",
                            'xs' : "xsmall"
                        };
                        if($(this).data('size')!== undefined){
                            $sizeClass = "switchery switchery-"+$sizes[$size];
                        }
                        else{
                            $sizeClass = "switchery";
                        }

                        $color = $(this).data('color');
                        var $colors ={
                            'primary' : "#967ADC",
                            'success' : "#37BC9B",
                            'danger' : "#DA4453",
                            'warning' : "#F6BB42",
                            'info' : "#3BAFDA"
                        };
                        if($color !== undefined){
                            $colorCode = $colors[$color];
                        }
                        else{
                            $colorCode = "#37BC9B";
                        }

                        var switchery = new Switchery($(this)[0], { className: $sizeClass, color: $colorCode });
                	}
                	
                    
                });
            } else {
                var elems1 = document.querySelectorAll('.switchery');

                for (i = 0; i < elems1.length; i++) {
                    var $size = elems1[i].data('size');
                    var $color = elems1[i].data('color');
                    var switchery = new Switchery(elems1[i], { color: '#37BC9B' });
                }
            }
            $(".dt-switchery").off();
            $(".dt-switchery").change(function() { 
            	var event = $(this).attr("data-event");
            	window[event]($(this).attr("data-id"));
    		});
        },
        
        formSubmitInit: function(popup, dataTable) {
        	$(".popupForm").off();
        	$('.popupForm').on('submit', function (e) {
    			$.blockUI();
    	    	e.preventDefault();
    	        $.ajax({
    	    		type: 'POST',
    	            url: $(this).attr('action'),
    	            data: $(this).serialize(),
    	            success: function(response) {
    	            	if(response.status === 200){
    	            		dataTable.ajax.reload();
    	            		popup.modal("hide");
    	            	} else {
    	            		$.unblockUI();
    	            		$("#formContent").html(response.data);
    	            		self.formSubmitInit(popup, dataTable);
    	            	}
    	            }
    	        });
            });
        },
        
        reset: function(form) {
            form = form || '.form';
            $(form)[0].reset();
            $(form)[0].submit();
        },

        toggleBlockContentType: function(selected){
            if(selected == 3 || selected == 4){
                $("#contentType").val(selected);
                $(".blockContentType").hide();
            }else{
                $(".blockContentType").show();
            }
        },

        getParameterByName: function(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },

        getNotification: function() {
            $.ajax({
                url: pageSettings.webPath + "admin-notifications/get-notify-header",
                type: 'GET',
                success: function(response) {
                    $("#header_notifications").html(response.data.html);
                    if(response.data.count > 0){
                        $("#notifyNumber").html(response.data.count);
                        $("#notifyNumber").show();
                    } else {
                        $("#notifyNumber").hide();
                    }
                },
                error: function(error) {
                }
            });
        },
        
        downloadFile: function(url, extension) {
        	url = pageSettings.webPath + url;
            //var fullfilename = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
            var filename = fullfilename.split('.')[0];
            //var extension = '.xlsx';
            var filename_tosave = filename + extension;
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function() {
                var a = document.createElement('a');
                a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
                a.download = filename_tosave;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                delete a;
            };
            xhr.open('GET', url);
            xhr.send();
        },
        
        arrayDiff: function(arr1, arr2) {
        	var arr = [];
            arr1 = arr1.toString().split(',').map(Number);
            arr2 = arr2.toString().split(',').map(Number);
            // for array1
            for (var i in arr1) {
               if(arr2.indexOf(arr1[i]) === -1)
               arr.push(arr1[i]);
            }
            // for array2
            for(i in arr2) {
               if(arr1.indexOf(arr2[i]) === -1)
               arr.push(arr2[i]);
            }
            return arr.sort((x,y) => x-y);
        }
    };
	return self;
}();
