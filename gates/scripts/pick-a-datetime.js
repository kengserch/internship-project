(function(window, document, $) {
		
	var d = new Date();
    var thisYear = d.getFullYear();
	
	
	$( '.pickadate-translations' ).pickadate({
		format: 'dd mmmm yyyy',
		formatSubmit: 'yyyy-mm-dd',
		hiddenName: false ,
		selectYears: 10, 
		selectMonths: true,
		//selectYears: true
		min: [thisYear-50,1,1],
		max: [thisYear+5,12,31],  
		monthsFull: [ 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม' ],
		monthsShort: [ 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.' ],
		weekdaysShort: [ 'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.' ],
		today:  false,
		clear: 'Clear',
		close: 'Close'
	});

})(window, document, jQuery);