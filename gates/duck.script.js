var duck = {
	url: 'gates/duck.inc.php'
};

duck.SetTitlePage = function () {
	var contents = '  Home | กรมควบคุมโรค  ';
	var pagetitle = ' Home | กรมควบคุมโรค ';

	$("title").text(contents);
	$(".page-title").text(pagetitle);

};

duck.ConvertDate = function (data_date, style, lang) {

	//var data_date= "2015-12-01";

	var year = data_date.substring(0, 4);
	var month = data_date.substring(5, 7);
	var day = data_date.substring(8, 11);

	var month_cv = "";
	//alert(year+":"+month+":"+day);

	if (lang == "en") {
		if (style == "mini") {
			var year_cv = parseInt(year) + 543;
			year_cv = String(year_cv);
			year_cv = year_cv.substring(2, 4);

			switch (month) {
				case '01': month_cv = "Jan"; break;
				case '02': month_cv = "Feb"; break;
				case '03': month_cv = "Mar"; break;
				case '04': month_cv = "Apr"; break;
				case '05': month_cv = "May"; break;
				case '06': month_cv = "Jun"; break;
				case '07': month_cv = "Jul"; break;
				case '08': month_cv = "Aug"; break;
				case '09': month_cv = "Sep"; break;
				case '10': month_cv = "Oct"; break;
				case '11': month_cv = "Nov"; break;
				case '12': month_cv = "Dec"; break;
				default: break;
			}


		} else if (style == "full_option") {

		} else {

			var year_cv = parseInt(year);
			switch (month) {
				case '01': month_cv = "January"; break;
				case '02': month_cv = "Febuary"; break;
				case '03': month_cv = "March"; break;
				case '04': month_cv = "April"; break;
				case '05': month_cv = "May"; break;
				case '06': month_cv = "June"; break;
				case '07': month_cv = "July"; break;
				case '08': month_cv = "August"; break;
				case '09': month_cv = "September"; break;
				case '10': month_cv = "October"; break;
				case '11': month_cv = "November"; break;
				case '12': month_cv = "December"; break;
				default: break;
			}
		}
		var day_cv = parseInt(day);

	} else {


		if (style == "mini") {
			var year_cv = parseInt(year) + 543;
			year_cv = String(year_cv);
			year_cv = year_cv.substring(2, 4);

			switch (month) {
				case '01': month_cv = "ม.ค."; break;
				case '02': month_cv = "ก.พ."; break;
				case '03': month_cv = "มี.ค."; break;
				case '04': month_cv = "เม.ย."; break;
				case '05': month_cv = "พ.ค."; break;
				case '06': month_cv = "มิ.ย."; break;
				case '07': month_cv = "ก.ค."; break;
				case '08': month_cv = "ส.ค."; break;
				case '09': month_cv = "ก.ย."; break;
				case '10': month_cv = "ต.ค."; break;
				case '11': month_cv = "พ.ย."; break;
				case '12': month_cv = "ธ.ค."; break;
				default: break;
			}


		} else if (style == "full_option") {

		} else {

			var year_cv = parseInt(year) + 543;
			switch (month) {
				case '01': month_cv = "มกราคม"; break;
				case '02': month_cv = "กุมภาพันธ์"; break;
				case '03': month_cv = "มีนาคม"; break;
				case '04': month_cv = "เมษายน"; break;
				case '05': month_cv = "พฤษภาคม"; break;
				case '06': month_cv = "มิถุนายน"; break;
				case '07': month_cv = "กรกฎาคม"; break;
				case '08': month_cv = "สิงหาคม"; break;
				case '09': month_cv = "กันยายน"; break;
				case '10': month_cv = "ตุลาคม"; break;
				case '11': month_cv = "พฤศจิกายน"; break;
				case '12': month_cv = "ธันวาคม"; break;
				default: break;
			}
		}

		var day_cv = parseInt(day);

	}

	var date_cv = day_cv + ' ' + month_cv + ' ' + year_cv;

	return date_cv;

};

duck.ConvertDateTime = function (data_date, style, lang) {

	//var data_date= "2015-12-01";

	var year = data_date.substring(0, 4);
	var month = data_date.substring(5, 7);
	var day = data_date.substring(8, 11);

	var h = data_date.substring(12, 14);
	var m = data_date.substring(14, 16);

	var month_cv = "";
	//alert(year+":"+month+":"+day);

	if (lang == "en") {
		if (style == "mini") {
			var year_cv = parseInt(year) + 543;
			year_cv = String(year_cv);
			year_cv = year_cv.substring(2, 4);

			switch (month) {
				case '01': month_cv = "Jan"; break;
				case '02': month_cv = "Feb"; break;
				case '03': month_cv = "Mar"; break;
				case '04': month_cv = "Apr"; break;
				case '05': month_cv = "May"; break;
				case '06': month_cv = "Jun"; break;
				case '07': month_cv = "Jul"; break;
				case '08': month_cv = "Aug"; break;
				case '09': month_cv = "Sep"; break;
				case '10': month_cv = "Oct"; break;
				case '11': month_cv = "Nov"; break;
				case '12': month_cv = "Dec"; break;
				default: break;
			}


		} else if (style == "full_option") {

		} else {

			var year_cv = parseInt(year);
			switch (month) {
				case '01': month_cv = "January"; break;
				case '02': month_cv = "Febuary"; break;
				case '03': month_cv = "March"; break;
				case '04': month_cv = "April"; break;
				case '05': month_cv = "May"; break;
				case '06': month_cv = "June"; break;
				case '07': month_cv = "July"; break;
				case '08': month_cv = "August"; break;
				case '09': month_cv = "September"; break;
				case '10': month_cv = "October"; break;
				case '11': month_cv = "November"; break;
				case '12': month_cv = "December"; break;
				default: break;
			}
		}
		var day_cv = parseInt(day);

	} else {


		if (style == "mini") {
			var year_cv = parseInt(year);
			year_cv = String(year_cv);
			year_cv = year_cv.substring(2, 4);

			switch (month) {
				case '01': month_cv = "ม.ค."; break;
				case '02': month_cv = "ก.พ."; break;
				case '03': month_cv = "มี.ค."; break;
				case '04': month_cv = "เม.ย."; break;
				case '05': month_cv = "พ.ค."; break;
				case '06': month_cv = "มิ.ย."; break;
				case '07': month_cv = "ก.ค."; break;
				case '08': month_cv = "ส.ค."; break;
				case '09': month_cv = "ก.ย."; break;
				case '10': month_cv = "ต.ค."; break;
				case '11': month_cv = "พ.ย."; break;
				case '12': month_cv = "ธ.ค."; break;
				default: break;
			}


		} else if (style == "full_option") {

		} else {

			var year_cv = parseInt(year) + 543;
			switch (month) {
				case '01': month_cv = "มกราคม"; break;
				case '02': month_cv = "กุมภาพันธ์"; break;
				case '03': month_cv = "มีนาคม"; break;
				case '04': month_cv = "เมษายน"; break;
				case '05': month_cv = "พฤษภาคม"; break;
				case '06': month_cv = "มิถุนายน"; break;
				case '07': month_cv = "กรกฎาคม"; break;
				case '08': month_cv = "สิงหาคม"; break;
				case '09': month_cv = "กันยายน"; break;
				case '10': month_cv = "ตุลาคม"; break;
				case '11': month_cv = "พฤศจิกายน"; break;
				case '12': month_cv = "ธันวาคม"; break;
				default: break;
			}
		}

		var day_cv = parseInt(day);

	}

	var date_cv = day_cv + ' ' + month_cv + ' ' + year_cv + ' ' + h + '.' + m + ' น.';

	return date_cv;

};

duck.ConvertFullDate = function (data_date, style, lang) {



	var year = data_date.substring(0, 4);
	var month = data_date.substring(5, 7);
	var day = data_date.substring(8, 11);
	var date_cv = [];
	var month_cv = "";
	var year_cv = parseInt(year) + 543;
	switch (month) {
		case '01': month_cv = "มกราคม"; break;
		case '02': month_cv = "กุมภาพันธ์"; break;
		case '03': month_cv = "มีนาคม"; break;
		case '04': month_cv = "เมษายน"; break;
		case '05': month_cv = "พฤษภาคม"; break;
		case '06': month_cv = "มิถุนายน"; break;
		case '07': month_cv = "กรกฎาคม"; break;
		case '08': month_cv = "สิงหาคม"; break;
		case '09': month_cv = "กันยายน"; break;
		case '10': month_cv = "ตุลาคม"; break;
		case '11': month_cv = "พฤศจิกายน"; break;
		case '12': month_cv = "ธันวาคม"; break;
		default: break;
	}
	var day_cv = parseInt(day);


	date_cv[0] = day_cv;
	date_cv[1] = month_cv;
	date_cv[2] = year_cv;


	return date_cv;


};

duck.GetToDayWeek = function () {
	var d = new Date();
	var dayname = [];

	switch (d.getDay()) {
		case 1:
			dayname['EN'] = "MON";
			dayname['TH'] = "จันทร์";
			break;
		case 2:
			dayname['EN'] = "TUE";
			dayname['TH'] = "อังคาร";
			break;
		case 3:
			dayname['EN'] = "WED";
			dayname['TH'] = "พุธ";
			break;
		case 4:
			dayname['EN'] = "THU";
			dayname['TH'] = "พฤหัสบดี";
			break;
		case 5:
			dayname['EN'] = "FRI";
			dayname['TH'] = "ศุกร์";
			break;
		case 6:
			dayname['EN'] = "SAT";
			dayname['TH'] = "เสาร์";
			break;
		case 7:
			dayname['EN'] = "SUN";
			dayname['TH'] = "อาทิตย์";
			break;

		default:
		// code block
	}


	return dayname;
};


duck.SetCheckbox = function (bl) {

	if (bl == "Y") {
		var bl_disp = '<span style="color:#009688"><i class="fa fa-check-square-o" ></i> แสดงผล </span>';
	} else {
		var bl_disp = '<span style="color:#e2e2e2"><i class="fa  fa-square-o" ></i> ไม่แสดงผล  </span>';
	}

	return bl_disp;
};

duck.OpenBack = function () {
	window.history.back();

	//	window.location.reload();
};

duck.getURLParameter = function (url_ex) {
	return decodeURIComponent((new RegExp('[?|&]' + url_ex + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
};

duck.OpenPage = function (link, target) {
	window.open(link, target);
};

duck.ClearCK = function () {
	var cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
};

duck.checkInputLength = function (element_id, numl) {

	var str = $("#" + element_id).val();

	if (str.length >= numl) {

		$("#" + element_id + "_warning").css("display", "block");
		$("#" + element_id).css("border-color", "#dd4b39");
		setTimeout(function () {
			$("#" + element_id + "_warning").css("display", "none");
			$("#" + element_id).css("border-color", "#d2d6de");
		}, 5000);
	}
	return false;
};

duck.validateFormEmail = function (ref_by, affect) {

	var x = $("#" + ref_by).val();
	var atpos = x.indexOf("@");
	var dotpos = x.lastIndexOf(".");
	if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {

		$("#" + affect).css("display", "inline");
		$("#" + affect).text("รูปแบบอีเมล์ไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง");
		$("#" + ref_by).css("border-color", "#dd4b39");

		setTimeout(function () {
			$("#" + affect).css("display", "none");
			$("#" + ref_by).css("border-color", "#d2d6de");
			$("#" + affect).text("ไม่เกิน 50 ตัวอักษร");
		}, 5000);

		return "invalid_mail";
		//alert("Not a valid e-mail address");
		//return false;
	}
};

duck.validateEmpty = function (element_id) {
	var x = 0;
	if (!$("#" + element_id).val()) {
		$("#" + element_id).css("border-color", "#dd4b39");
		$("#" + element_id).focus();
		setTimeout(function () {

			$("#" + element_id).css("border-color", "#d2d6de");
		}, 8000);
		x = 1;
	}

	return x;
};

duck.changeDisp = function (element_id, val) {
	var t = $("#" + element_id).val();
	if (t == "Y" || val == "Y") {
		$("#" + element_id).removeClass('text-gray');
		$("#" + element_id).addClass('text-green');
	} else {
		$("#" + element_id).addClass('text-gray');
		$("#" + element_id).removeClass('text-green');
	}
};

duck.CheckNum = function () {

	if (event.keyCode < 48 || event.keyCode > 57) {
		event.returnValue = false;
	}

	/*
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			 // Allow: Ctrl/cmd+A
			(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			 // Allow: Ctrl/cmd+C
			(e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
			 // Allow: Ctrl/cmd+X
			(e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
			 // Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
				 // let it happen, don't do anything
				 return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	*/
};

duck.ModalSHide = function () {
	$("#modal_success").modal("hide");
};

duck.ModalSShow = function () {
	$("#modal_success").modal("show");
	/*
	swal({
				title: "ทำรายการสำเร็จ",
				text: "กรุณารอสักครู่",
				type: "success",
				showCancelButton: false,
				showConfirmButton: false,
				timer: 1500,
	});
	*/
};

duck.ModalSShowcomment = function () {
	$('#modalsur').modal('show');

	// swal({
	// 			title: "ขอบคุณครับ",
	// 			// text: "กรุณารอสักครู่",
	// 			type: "success",
	// 			showCancelButton: false,
	// 			showConfirmButton: false,
	// 			timer: 1500,
	// });

};

duck.ModalHide = function (element) {
	$(element).modal("hide");
	$(".modal-backdrop").remove();
};

duck.ModalShow = function (element) {
	$(element).modal("show");
};

duck.ModalWHide = function () {
	$("#modal_warning").modal("hide");
	//alert("SD");
	$(".modal-backdrop").remove();
};

duck.ModalWShow = function () {
	$("#modal_warning").modal("show");
	// swal({
	// 			title: "ทำรายการไม่สำเร็จ",
	// 			text: "กรุณาลองใหม่ครั้ง",
	// 			type: "warning",
	// 			showCancelButton: false,
	// 			showConfirmButton: true,
	// 			confirmButtonColor: "#DD6B55",
	// 			confirmButtonText: "ตกลง",
	// });
};

duck.ModalDHide = function () {
	$("#modal_danger").modal("hide");
	$(".modal-backdrop").remove();
};

duck.ModalDShow = function () {
	$("#modal_danger").modal("show");
};

duck.ReloadPage = function () {
	window.location.reload();

};

duck.NotiSuccess = function () {
	/*
	$.toast({
			heading: 'ทำรายการสำเร็จ',
			text: 'ปรับการแสดงผลสำเร็จ',
			position: 'top-right',
			loaderBg: '#ff6849',
			icon: 'success',
			hideAfter: 2000,
			stack: 6
	});*/

	toastr.success(
		'ทำรายการสำเร็จ',
		'กรุณารอสักครู่',
		{
			"showMethod": "slideDown",
			"hideMethod": "slideUp",
			timeOut: 2000
		});
};

duck.NotiSuccessCHRJoin = function () {

	toastr.success(
		'กรุณารอสักครู่',
		'เข้าร่วมกิจกรรมสำเร็จ',
		{
			"showMethod": "slideDown",
			"hideMethod": "slideUp",
			timeOut: 2000
		});
};

duck.NotiSuccessCHRUnJoin = function () {

	toastr.warning(
		'กรุณารอสักครู่',
		'ยกเลิกเข้าร่วมกิจกรรม',
		{
			"showMethod": "slideDown",
			"hideMethod": "slideUp",
			timeOut: 2000
		});
};

duck.NotiWarning = function () {
	// $.toast({
	// 	heading: 'เกิดข้อผิดพลาด',
	// 	text: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
	// 	position: 'top-right',
	// 	loaderBg: '#ff6849',
	// 	icon: 'warning',
	// 	hideAfter: 2000,
	// 	stack: 6
	// }); 

	toastr.warning(
		'กรุณาตรวจสอบการทำรายการ',
		'',
		{
			"showMethod": "slideDown",
			"hideMethod": "slideUp",
			timeOut: 2000
		});


};

duck.NotiDanger = function () {
	// $.toast({
	// 		heading: 'เกิดข้อผิดพลาด',
	// 		text: 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ',
	// 		position: 'top-right',
	// 		loaderBg: '#ff6849',
	// 		icon: 'error',
	// 		hideAfter: 2000

	// });

	toastr.error(
		'กรุณาทำรายการใหม่อีกครั้ง',
		'เกิดข้อผิดพลาด',
		{
			"showMethod": "slideDown",
			"hideMethod": "slideUp",
			timeOut: 2000
		});

};

duck.DisplayYoutube = function (refby, affectto, v_val, height) {
	if (!v_val) {
		var video = $("#" + refby).val();

	} else {
		var video = v_val;
	}

	if (!height) {
		var height = 320;
	}


	if (video && video != "-") {

		//	var matches = video.split("watch?v=");
		var matches = video.split("https://youtu.be/");
		var youtube = '<div><iframe width="100%" height="' + height + '" src="https://www.youtube.com/embed/' + matches[1] + '?feature=player_embedded&rel=0" frameborder="0" ></iframe></div>';
		$(affectto).html(youtube);
		$(affectto).css('display', 'block');

	} else {
		$(affectto).css('display', 'none');
	}


};


duck.DisplayYoutubeID = function (refby, affectto, v_val, height) {
	if (!v_val) {
		var video = $("#" + refby).val();

	} else {
		var video = v_val;
	}

	if (!height) {
		var height = 320;
	}


	if (video && video != "-") {

		//	var matches = video.split("watch?v=");
		//var matches = video.split("https://youtu.be/");
		var youtube = '<div><iframe width="100%" height="' + height + '" src="http://www.youtube.com/embed/' + video + '?feature=player_embedded&rel=0" frameborder="0" ></iframe></div>';
		$(affectto).html(youtube);
		$(affectto).css('display', 'block');

	} else {
		$(affectto).css('display', 'none');
	}


};

duck.DisplayImage = function (event, title, order, output_disp) {
	var output = document.getElementById(output_disp);
	output.src = URL.createObjectURL(event.target.files[0]);
	$("#" + output_disp).css("display", "block");
};


duck.CalAge = function (birthday, displaytype) {

	var day = '15';
	var month = '3';
	var year = '1991';


	var d = "";
	var m = "";
	var y = "";
	var nowdt = new Date();
	var nd = parseInt(nowdt.getDate());
	var nm = parseInt(nowdt.getMonth());
	var ny = parseInt(nowdt.getFullYear());

	var ageYear = 0;
	var ageMonth = 0;

	d = '15'
	m = '3'
	y = '1991'

	if (d != "" && m != "" && y != "") {
		s = new Date(y, parseInt(m) - 1, d);
		d = parseInt(s.getDate());
		m = parseInt(s.getMonth());
		y = parseInt(s.getFullYear());

		ageYear = ny - y;
		if (nm > m) {
			ageMonth = nm - m;
		} else if (nm == m) {
			if (nd >= d) {
				ageMonth = 0;
			} else {
				ageMonth = 11;
				ageYear = ageYear - 1;
			}
		} else {
			ageMonth = m - nm;
			ageYear = ageYear - 1;
		}

		if (displaytype == 'year') {
			myage = ageYear + " ปี ";
		} else {
			myage = ageYear + " ปี " + ageMonth + " เดือน";
		}

	} else {
		myage = "";
	}


	console.log(myage);

	return myage;


};

duck.ChangeLang = function (lang) {

	// alert(lang)
	// alert(localStorage.lang)
	// localStorage.lang ='TH' ;
	// localStorage.langcode = 'th';
	// if(lang == localStorage.lang){
	// 	return false;
	// }

	if (lang == 'EN') {
		// localStorage.lang = 'EN';
		// localStorage.langcode ="en";
		contents.ChangeSessionLang();
		window.location.href = "/en/index.php";
		console.log('changeLANG to EN');
	} else {
		// localStorage.lang = 'TH';
		// localStorage.langcode ="th";
		contents.ChangeSessionLang();
		window.location.href = "../index.php";
		console.log('changeLANG to TH');
	}
	//	jQuery('#div_session_write').load('session_write.php?session_name=new_value');
	//duck.ReloadPage();
};


Array.prototype.remove = function () {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};


// $( document ).ready(function() {

// 	if(!localStorage.lang){
// 		localStorage.lang = "TH"; // TH|EN
// 		localStorage.langcode ="th";
// 	}

// 	console.log(localStorage.lang + "||"+localStorage.langcode);

// 	//duck.SetTitlePage();
// 	//	duck.SetMenuWeb();
// 	//	duck.SetMenuMobile();
// 	$(".btn_back").click(function(){
// 		duck.OpenBack();
// 	});



// 	$('a.flag-th').click(function(e){
// 		e.preventDefault();
// 		duck.ChangeLang('TH');
// 	});
// 	$('a.flag-en').click(function(e){
// 		e.preventDefault();
// 		duck.ChangeLang('EN');
// 	});



// });

$(function () {


});

