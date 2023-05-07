/////////////////////////////////////////////////////////////////////////////////////
////////////////////           contents   Script          ///////////////////////////
var contents = {
	url: '../gates/contents.inc.php',
	path: 'https://' + window.location.host,
	path2: 'https://' + window.location.host + '/en'
};

//////////////////////////////////////////////////////////////////////////////////////////////////
contents.callModalAdd = function (FuncName, table) {

	//alert(FuncName);
	var btn_add = '<button type="button" class="btn btn-success" onclick="' + FuncName + '();"> <i class="fa fa-save"> </i> ยืนยันการเพิ่มข้อมูล </button>';
	$("#btn_add").html(btn_add);

	$('#modal_add').modal('show');
};

contents.callModalEdit = function (FuncName, table, table_id, detail) {

	//$("#txt_mo_name").html(detail);

	var btn_edit = '<button type="button" class="btn btn-warning" onclick="' + FuncName + '();"> <i class="fa fa-trash"> </i> ยืนยันการแก้ไข </button>';
	$("#btn_edit").html(btn_edit);

	$('#modal_edit').modal('show');
};

contents.callModalDelete = function (table, table_id, detail, link) {


	$("#txt_mo_name").html("ต้องการยืนยันการลบข้อมูล " + detail);

	var btn_delete = '<button type="button" class="btn btn-danger" onclick="contents.callDelete(\'' + table + '\',\'' + table_id + '\',\'' + link + '\');"> <i class="fa fa-trash"> </i> ยืนยัน </button>';
	$("#btn_delete").html(btn_delete);

	$('#modal_delete').modal('show');
};

contents.callModalDisable = function (table, table_id, detail, link) {


	$("#txt_detail_dis").html("ต้องการยืนยันการลบข้อมูล " + detail);

	var btn_disable = '<button type="button" class="btn btn-danger" onclick="contents.callDisable(\'' + table + '\',\'' + table_id + '\',\'' + link + '\');"> <i class="fa fa-trash"> </i> ยืนยัน </button>';
	$("#btn_disable").html(btn_disable);

	$('#modal_disable').modal('show');
};


contents.callModalDeleteTruly = function (table, table_id, detail) {
	$("#txt_mo_name").html(detail);

	var btn_delete = '<button type="button" class="btn btn-danger" onclick="contents.callDeleteTruly(\'' + table + '\',\'' + table_id + '\');"> <i class="fa fa-trash"> </i> ยืนยันการลบ </button>';
	$("#btn_delete").html(btn_delete);

	$('#modal_delete').modal('show');
};

contents.callDelete = function (table, table_id, link) {
	//alert(table);
	//alert(table_id);
	if (!fieldname) {
		var fieldname = 'id';
	}
	var DataSet = {
		table: table,
		data: {
			deleted: '1',
		},
		where: { id: table_id }
	};
	//console.log(DataSet);

	$.ajax({
		url: contents.url + '?mode=EditDataSet',
		type: 'POST',
		dataType: 'json',
		data: DataSet,
		beforeSend: function () {
			$('#modal_delete').modal('hide');
		},
		success: function (data) {
			//console.log(data);

			if (data.success == "COMPLETE") {

				duck.ModalSShow();

				// setTimeout(duck.ModalSHide, 3000);
				if (link == 'backlink') {
					setTimeout(duck.OpenBack, 500);
				} else {
					setTimeout(duck.ReloadPage, 3000);
				}
			} else {
				duck.ModalWShow();
			}

		},
		complete: function () {
		},
		error: function (data) {
			console.log('Please check scripts callDelete');
			console.log(data);
			duck.NotiDanger();
		}
	});
};

contents.callDisable = function (table, table_id, link) {
	//alert(table);
	//alert(table_id);
	$('#modal_disable').modal('hide');
	if (!fieldname) {
		var fieldname = 'id';
	}
	var DataSet = {
		table: table,
		data: {
			enable: 'N',
		},
		where: { id: table_id }
	};
	//console.log(DataSet);

	$.ajax({
		url: contents.url + '?mode=EditDataSet',
		type: 'POST',
		dataType: 'json',
		data: DataSet,
		beforeSend: function () {
			$('#modal_delete').modal('hide');
		},
		success: function (data) {
			//console.log(data);

			if (data.success == "COMPLETE") {

				duck.ModalSShow();

				// setTimeout(duck.ModalSHide, 3000);
				if (link == 'backlink') {
					setTimeout(duck.OpenBack, 500);
				} else {
					setTimeout(duck.ReloadPage, 3000);
				}
			} else {
				duck.ModalWShow();
			}

		},
		complete: function () {
		},
		error: function (data) {
			console.log('Please check scripts callDelete');
			console.log(data);
			duck.NotiDanger();
		}
	});
};

contents.callDelete_EX = function (table, table_id, id_name, status_name, link) {
	var DataSet = {
		table: table,
		data: {
			status: 'D', //status_name
			id: table_id, //status_name
		},
		data_name: {
			status_n: status_name,
			id_n: id_name,
		}
	};
	//console.log(DataSet);

	$.ajax({
		url: contents.url + '?mode=StatusDataSetEX',
		type: 'POST',
		dataType: 'json',
		data: DataSet,
		beforeSend: function () {
		},
		success: function (data) {
			if (data.success == "COMPLETE") {
				duck.ModalSShow();
				if (link == 'backlink') {
					setTimeout(duck.OpenBack, 500);
				} else {
					setTimeout(duck.ReloadPage, 3000);
				}
			} else {
				duck.ModalWShow();
			}
		},
		complete: function () {
		},
		error: function (data) {
			console.log('Please check scripts callDelete');
			console.log(data);
			duck.NotiDanger();
		}
	});


};

contents.callDeleteTruly = function (table, table_id) {

	var DataSet = {
		table: table,
		where: { id: table_id }
	};
	//console.log(DataSet);

	$.ajax({
		url: contents.url + '?mode=DeleteDataSet',
		type: 'POST',
		dataType: 'json',
		data: DataSet,
		beforeSend: function () {
			$('#modal_delete').modal('hide');
		},
		success: function (data) {
			//console.log(data);

			if (data.success == "COMPLETE") {
				alert("ลบรายการสำเร็จ");
				window.location.reload();;

			} else {
				alert("ลบรายการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");

			}

		},
		complete: function () {
		},
		error: function (data) {
			console.log('Please check scripts callDelete');
			console.log(data);
		}
	});


};

contents.callSetEnable = function (table_name, table_id, refto) {
	var x = 'N';
	if (!refto) {
		refto = "enable";
	}
	if ($("#" + refto + table_id).is(':checked') == true) {
		x = 'Y';
	}
	var DataSet = {
		table: table_name,
		data: {
			enable: x,
		},
		where: { id: table_id }
	};

	$.ajax({
		url: contents.url + '?mode=EditDataSet',
		type: 'POST',
		dataType: 'json',
		data: DataSet,
		beforeSend: function () {
		},
		success: function (data) {
			if (data.success == "COMPLETE") {
				duck.NotiSuccess();

			} else {
				//	duck.ModalWShow();
				duck.NotiWarning();
			}
		},
		complete: function () {
		},
		error: function (data) {
			console.log('Please check scripts callSetEnable');
			console.log(data);
			duck.NotiDanger();
		}
	});
};


contents.callSetDisplay = function (table_name, table_id, refto) {
	var x = 'N';
	if (!refto) {
		refto = "display";
	}
	if ($("#" + refto + table_id).is(':checked') == true) {
		x = 'Y';
	}
	var DataSet = {
		table: table_name,
		data: {
			display: x,
		},
		where: { id: table_id }
	};

	$.ajax({
		url: contents.url + '?mode=EditDataSet',
		type: 'POST',
		dataType: 'json',
		data: DataSet,
		beforeSend: function () {
		},
		success: function (data) {
			if (data.success == "COMPLETE") {
				duck.NotiSuccess();
				/*
				 duck.ModalSShow();

				// setTimeout(duck.ModalSHide, 3000);
				if(link=='backlink'){
					setTimeout( duck.OpenBack   , 500   );
				}else{
					setTimeout( duck.ReloadPage   , 3000   );
				}
				*/
			} else {
				//	duck.ModalWShow();
				duck.NotiWarning();
			}

		},
		complete: function () {
		},
		error: function (data) {
			console.log('Please check scripts callSetDisplay');
			console.log(data);
			duck.NotiDanger();
		}
	});
};

contents.LoadLiveType = function (v_val, element_id) {

	if (v_val) {
		//		alert(v_val);
	}
	var exDat = {
		table: "broadcastlive_type",
		where: {
			enable: "Y",
			deleted: 0
		},
		orderby: " CONVERT (   live_type_title_th  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);


			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					//	$(".select2-chosen").text(result.LIVE_TYPE_TITLE_TH);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.live_type_title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.live_type_title_th).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadLiveType');
			duck.NotiDanger();
		}
	});

};

contents.LoadLiveTypeSub = function (v_val, element_id, v_valref) {


	var v_prov = '';
	if (v_val) {
		//		alert(v_val);
	}
	var exDat = {
		table: "broadcastlive_type_sub",
		where: {
			enable: "Y",
			deleted: 0,
			live_type_id: v_valref
		},
		orderby: " CONVERT (live_typesub_title_th  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่ย่อย").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					$(".select2-chosen").text(result.live_typesub_title_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.live_typesub_title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.live_typesub_title_th).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadLiveTypeSub');
			duck.NotiDanger();
		}
	});
};

contents.LoadNewsType = function (v_val, element_id) {

	if (v_val) {
		//		alert(v_val);
	}
	var exDat = {
		table: "news_type",
		where: {
			enable: "Y",
			deleted: 0
		},
		orderby: " CONVERT (   news_type_title_th  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);


			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					//	$(".select2-chosen").text(result.news_type_title_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.news_type_title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.news_type_title_th).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadNewsType');
			duck.NotiDanger();
		}
	});

};

contents.LoadNewsTypeSub = function (v_val, element_id, v_valref) {


	var v_prov = '';
	if (v_val) {
		//		alert(v_val);
	}
	var exDat = {
		table: "news_type_sub",
		where: {
			enable: "Y",
			deleted: 0,
			news_type_id: v_valref
		},
		orderby: " CONVERT (news_typesub_title_th  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่ย่อย").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					$(".select2-chosen").text(result.news_typesub_title_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.news_typesub_title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.news_typesub_title_th).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadNewsTypeSub');
			duck.NotiDanger();
		}
	});
};

contents.LoadDistrict = function (v_val, element_id, v_valref) {
	var v_amp = '';
	if (v_val) {
		//		alert(v_val);
	}

	if (v_valref) {
		v_amp = v_valref;
	}
	var exDat = {
		table: "district",
		where: {
			enable: "Y",
			AMPHUR_ID: v_amp
		},
		orderby: " CONVERT (   DISTRICT_NAME  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			//console.log(data);
			$('#' + element_id).find('option').remove();
			$('<option>').attr('value', '').text("กรุณาเลือกตำบล").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.DISTRICT_ID == v_val) {
					$(".select2-chosen").text(result.DISTRICT_NAME);
					$('<option>').attr('value', result.DISTRICT_ID).attr('data-zipc', result.zipcode).attr('selected', 'selected').text(result.DISTRICT_NAME).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.DISTRICT_ID).attr('data-zipc', result.zipcode).text(result.DISTRICT_NAME).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadDistrict');
			duck.NotiDanger();
		}
	});
};

contents.SetFrom = function (action, data_id) {

	$('#data_id').val(data_id);
	$('#action').val(action);
	//console.log(action+" || "+data_id);
	$("#form_set").submit();
};

contents.SetFrom1 = function (action, data_id) {

	$('#data_id').val(data_id);
	$('#action').val(action);
	//console.log(action+" || "+data_id);
	$("#form_set").submit();
};

contents.SetFromAction = function (action, data_id, actionlink) {
	$("#form_set").attr("action", actionlink);
	$('#data_id').val(data_id);
	$('#action').val(action);

	$("#form_set").submit();
};
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

contents.ChangeSessionLang = function () {
	var langcode = localStorage.langcode;
	var setData = {
		langcode: langcode,
	};
	$.ajax({
		url: contents.url + '?mode=SetLang',
		type: 'POST',
		dataType: 'json',
		data: setData,
		beforeSend: function () {
		},
		success: function (result, status, xhr) {
			console.log(result.LANG);
		},
		complete: function (xhr, status) {
		},
		error: function (xhr, status, error) {
			console.log('===== error contents.ChangeSessionLang');
			duck.NotiDanger();
		}
	});
};


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

contents.LoadSlideImageHome = function () {
	//console.log('contents.LoadSlideImageHome');
};

contents.LoadMenuMain = function () {
	var langcode = localStorage.langcode;
	if (langcode == "th") {
		var setData = {
			table: 'menumain',
			where: {
				enable_th: 'Y',
				deleted: 0
			},
			orderby: ' orderby DESC ',
			limit: ''
		};
	} else {
		var setData = {
			table: 'menumain',
			where: {
				enable_en: 'Y',
				deleted: 0
			},
			orderby: ' orderby DESC ',
			limit: ''
		};
	}


	$.ajax({
		url: contents.url + '?mode=LoadMenuMain',
		type: 'POST',
		dataType: 'json',
		data: setData,
		beforeSend: function () {
		},
		success: function (result, status, xhr) {

			//	console.log(result);

			var cont = "";
			cont += '<li class="nav-item "> <a href="/index.php" class="nav-link"> <i class="fa fa-home"> </i> </a> </li>';
			$.each(result, function (key1, value1) {
				//	console.log( key1 + ": " + value1['menumain_name_'+langcode] );
				//	console.log( key1 + ": " + value1.menumain_name_+langcode  );

				var d1 = "";
				var dt1 = "";

				if (value1['menumain2']) {
					d1 = "dropdown";
					dt1 = "dropdown-toggle";


					cont += '\
							<li class="nav-item '+ d1 + '">\
								<a class="nav-link '+ dt1 + '" data-toggle="' + d1 + '" href="' + contents.path + '/' + value1['menumain_otherlink'] + '"> ' + value1['menumain_name_' + langcode] + ' </a>\
								<div class="dropdown-menu bg-white-custom">\
									<ul class="listsub">';
					$.each(value1['menumain2'], function (key2, value2) {
						if (value2['menumain3']) {
							cont += '\
													<li class="dropdown">\
														<a class="" href="'+ contents.path + '/' + value2['menumain_otherlink'] + '" > ' + value2['menumain_name_' + langcode] + '\
															<span class="arrow">\
															<i class="fa fa-chevron-right"></i>\
															</span>\
														</a>\
														<div class="dropdown-menu bg-white-custom">\
															<ul class="listsub listsub2 ">\
														';
							$.each(value2['menumain3'], function (key3, value3) {
								if (value3['menumain4']) {
									cont += '\
																		<li class="dropdown">\
																			<a class="" href="'+ contents.path + '/' + value3['menumain_otherlink'] + '" > ' + value3['menumain_name_' + langcode] + '\
																				<span class="arrow">\
																				<i class="fa fa-chevron-right"></i>\
																				</span>\
																			</a>\
																			<div class="dropdown-menu bg-white-custom">\
																				<ul class="listsub listsub2 ">\
																			';

									$.each(value3['menumain4'], function (key4, value4) {

										cont += '\
																					<li>  <a class="" href="#"> '+ value4['menumain_name_' + langcode] + ' </a> </li>\
																				';

									});



									cont += '\
																				</ul>\
																			</div>\
																		</li>\
																';
								} else {
									if (value3.menumain_linktype == 1) {
										cont += '\
																	<li>  <a class="" href="'+ value3['menumain_otherlink'] + '" target="_blank"> ' + value3['menumain_name_' + langcode] + ' </a> </li>\
																	';
									} else {
										cont += '\
																	<li>  <a class="" href="'+ contents.path + '/' + value3['menumain_otherlink'] + '"> ' + value3['menumain_name_' + langcode] + ' </a> </li>\
																	';
									}

								}
							});
							cont += '\
															</ul>\
														</div>\
													</li>\
											';
						} else {
							if (value2.menumain_linktype == 1) {

								cont += '<li> <a class="" href="' + value2['menumain_otherlink'] + '" target="_blank">' + value2['menumain_name_' + langcode] + '</a> </li>';

							} else {
								cont += '<li> <a class="" href="' + contents.path + '/' + value2['menumain_otherlink'] + '">' + value2['menumain_name_' + langcode] + '</a> </li>';
							}

						}
					});
					cont += '\
									</ul>\
								</div>\
							</li>';
				} else {
					if (value1.menumain_linktype == 1) {
						cont += '<li class="nav-item"> <a class="nav-link" href="' + value1['menumain_otherlink'] + '" target="_blank">' + value1['menumain_name_' + langcode] + '</a> </li>';

					} else {
						cont += '<li class="nav-item"> <a class="nav-link" href="' + contents.path + '/' + value1['menumain_otherlink'] + '">' + value1['menumain_name_' + langcode] + '</a> </li>';
					}
				}

				// $('#ul_menumain').prepend(cont);

			});
			$('#ul_menumain').prepend(cont);

			var d = "";
			if (localStorage.lang == "EN") {
				d = "Disease";
			} else {
				d = "รายชื่อโรค";
			}

			// var cont2 = '\
			// <li class="nav-item dropdown disease-name-dropdown dropdown">\
			// 	<a class="nav-link dropdown-toggle lang_disease"  href="#">'+d+'</a>\
			// </li>\
			// ';


			//$('#ul_menumain').append(cont2);

		},
		complete: function (xhr, status) {
			//console.log('=====complete contents.LoadMenuMain===='); 
		},
		error: function (xhr, status, error) {
			console.log('===== error contents.LoadMenuMain');

			console.log(xhr);
			console.log(status);
			console.log(error);
			duck.NotiDanger();
		}

	});



	//   console.log(data);
	//   console.log('check dept.LoadDiseaseByTitleName');
	//   duck.NotiDanger();
	/*

	<li class="nav-item dropdown">
		<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">รู้ทันโรค </a>
			<div class="dropdown-menu bg-white-custom">

				<ul class="listsub"> 
				<li> <a class=" " href="#">รายชื่อโรค</a> </li>
				<li class="dropdown">   
					<a class="" href="#" > สื่อเผยแพร่ 
					<span class="arrow"> 
						<i class="fa fa-chevron-right"></i>
					</span>
					</a>
					<div class="dropdown-menu bg-white-custom">
						<ul class="listsub listsub2 "> 
						<li  class="dropdown">  <a class="" href="#"> AA 
							<span class="arrow">
							<i class="fa fa-arrow-right"></i>
							</span>
						</a> 
								<div class="dropdown-menu bg-white-custom">
								<ul class="listsub listsub2 "> 
									<li>  <a class="" href="#"> AA 1</a>  </li>
									<li>  <a class="" href="#"> AA2 </a> </li> 
									<li>  <a class="" href="#"> AA3 </a> </li> 
								</ul>
								</div> 
						</li>
						<li>  <a class="" href="#"> BB </a> </li> 
						</ul>
					</div> 
					</li>
				</ul>
			</div>
		</li>
		*/


};

contents.LoadFlowchType = function (v_val, element_id, v_valref) {


	var v_prov = '';
	if (v_val) {
		//		alert(v_val);
	}
	var exDat = {
		table: "programschtype",
		where: {
			enable: "Y",
			deleted: 0,

		},
		orderby: " CONVERT (title_type_th  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					$(".select2-chosen").text(result.title_type_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.title_type_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.title_type_th).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadFlowchType');
			duck.NotiDanger();
		}
	});
};


contents.LoadFlowchDetail = function (v_val, element_id, v_valref) {


	var v_prov = '';
	if (v_val) {
		//		alert(v_val);
	}
	var exDat = {
		table: "programsch",
		where: {
			enable: "Y",
			deleted: 0,

		},
		orderby: " CONVERT (title_th  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกรายการ").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					$(".select2-chosen").text(result.title_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.title_th).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadFlowch');
			duck.NotiDanger();
		}
	});
};


contents.LoadFlowchPromote = function (v_val, element_id, v_valref) {


	var v_prov = '';
	if (v_val) {
		//		alert(v_val);
	}
	var exDat = {
		table: "programsch_detail",
		where: {
			enable: "Y",
			deleted: 0,

		},
		orderby: " CONVERT (program_name_th  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกผังรายการ").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					$(".select2-chosen").text(result.program_name_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.program_name_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.program_name_th).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadFlowch');
			duck.NotiDanger();
		}
	});
};

/////////////////////////-----earth-----/////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////////////


contents.CheckLoadNews = function (newstype_id, newstypesub) {
	// alert('XX'+newstype_id+" || "+newstypesub );
	var x = $("#checknews" + newstypesub).val();

	//alert(x)
	if (x < 4 && x != 0) {
		$("#checknews" + newstypesub).val(0);
		contents.LoadNewsSP(0, newstypesub);

	} else {
		contents.LoadNews(newstype_id, newstypesub);
	}
};


contents.LoadNews = function (newstype_id, newstypesub_id) {
	//alert('PP'+newstypesub_id);
	var pagenews = $("#pagenews" + newstypesub_id).val();
	var numstart = pagenews * 4;

	pagenews++;
	if (numstart == NaN || numstart == "") {
		numstart = 0;
	}

	var numlimit = numstart + ",4";

	var exDat = {
		where: {
			news_type_id: newstype_id,
			news_type_sub_id: newstypesub_id,
			deleted: 0,
			enable_w: 'Y',
			enable: 'Y'
		},
		orderby: " n.public_date DESC   ",
		limit: numlimit
	};


	$("#pagenews" + newstypesub_id).val(pagenews);

	$.ajax({
		url: contents.url + '?mode=LoadNewsCover',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			var x = 0;
			$.each(data, function (i, result) {
				var title_th = result.news_title_th;
				var title = title_th.substring(0, 500);
				var link = 'newsdetail';
				if (newstype_id == 8) {
					link = 'infographic_detail';
				}
				var cont = '\
					<div class="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 colpig">\
						<a href="'+ link + '.php?news_id=' + result.id + '">\
							<div class="detail-box round clearfix mt-3">\
								<img src="/uploads/news/'+ result.id + '/' + result.news_img_picname + '" class="card-img-top img-size"  onerror="this.onerror=null;this.src=\'/img/defualt/defualt2.jpg\';" >\
								<h6 class="hder300 my-2 box_title">'+ title + '</h6>\
								<div class="float-right textPopClock"> <i class="fa fa-clock-o"></i> '+ duck.ConvertDate(result.public_date, 'mini', 'th') + '</div>\
							</div> \
						</a>\
					</div>\
				';
				$(".box_contentmore" + newstypesub_id).append(cont);
				x++;
			});
			$("#checknews" + newstypesub_id).val(x);
			if (x < 4) {
				contents.LoadNewsSP(x, newstypesub_id);
			}
			/*
			if(!data){
				$("#btn_viewmore"+newstypesub_id).addClass('hidden');
			}*/
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadNews');
			duck.NotiDanger();
		}
	});
};

contents.LoadNewsSP = function (x, a) {
	//var a = '1' ;

	var y = 4;
	if (x != 4) {
		y = 4 - x;
	}

	var pagenewssp = $("#pagenewssp" + a).val();
	var numstart = pagenewssp * y;

	pagenewssp++;
	if (numstart == NaN || numstart == "") {
		numstart = 0;
	}

	var numlimit = numstart + "," + y;

	var exDat = {
		table: "spnews_news",
		where: {
			viewStatus: "1"
		},
		orderby: " date_publish DESC ",
		limit: numlimit
	};

	$("#pagenewssp" + a).val(pagenewssp);

	$.ajax({
		url: office.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);

			$.each(data, function (i, result) {
				var title_th = result.title;
				var title = title_th.substring(0, 500);

				var cont = '\
					<div class="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 colpig">\
						<a href="newsdetails.php?news_id='+ result.nId + '">\
							<div class="detail-box round clearfix mt-3">\
								<img src="/img/defualt/defualt2.jpg" class="card-img-top img-size"  onerror="this.onerror=null;this.src=\'/img/defualt/defualt2.jpg\';" >\
								<h6 class="hder300 my-2">'+ title + '</h6>\
								<p class="hder300Text hidden">\
								'+ result.title + '\
								</p>\
								<div class="float-right textPopClock"> <i class="fa fa-clock-o"></i> '+ duck.ConvertDate(result.date_publish, 'mini', 'th') + '</div>\
							</div> \
						</a>\
					</div>\
				';
				$(".box_contentmore" + a).append(cont);
			});

			if (!data) {
				$("#btn_viewmore" + a).addClass('hidden');
			}
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadNewsSP');
			duck.NotiDanger();
		}
	});

};

contents.LoadNewsType = function (v_val, element_id) {

	var exDat = {
		table: "news_type",
		where: {
			enable: "Y",
			deleted: 0,
		},
		orderby: "orderby desc ",
		limit: "",
	};
	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่ข่าว").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					$(".select2-chosen").text(result.news_type_title_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.news_type_title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.news_type_title_th).appendTo('#' + element_id);
				}
			});
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadNewsType');
			duck.NotiDanger();
		}
	});
};

contents.LoadNewsTypeSub = function (v_val, element_id, ref_val) {

	var exDat = {
		table: "news_type_sub",
		where: {
			enable: "Y",
			deleted: 0,
			news_type_id: ref_val
		},
		orderby: "orderby desc ",
		limit: "",
	};
	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่ย่อยข่าว").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					$(".select2-chosen").text(result.news_typesub_title_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.news_typesub_title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.news_typesub_title_th).appendTo('#' + element_id);
				}
			});
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadNewsTypeSub');
			duck.NotiDanger();
		}
	});
};

contents.LoadProgPrevType = function (v_val, element_id) {

	if (v_val) {
		//alert(v_val);
	}
	var exDat = {
		table: "progprevtype",
		where: {
			enable: "Y",
			deleted: 0
		},
		orderby: " CONVERT (   title_th  USING tis620 ) ASC ",
		limit: "",
	};
	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่รายการย้อนหลัง").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					//	$(".select2-chosen").text(result.news_type_title_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.title_th).appendTo('#' + element_id);
				}
			});
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadProgPrevType');
			duck.NotiDanger();
		}
	});

};

contents.LoadProgPrevTypeSub = function (v_val, element_id, v_valref) {


	var v_prov = '';
	if (v_val) {
		//		alert(v_val);
	}
	var exDat = {
		table: "progprevtypesub",
		where: {
			enable: "Y",
			deleted: 0,
			progprevtype_id: v_valref
		},
		orderby: " CONVERT (title_th  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่ย่อยรายการย้อนหลัง").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					$(".select2-chosen").text(result.title_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.title_th).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadProgPrevTypeSub');
			duck.NotiDanger();
		}
	});
};

contents.LoadProgRecType = function (v_val, element_id) {

	if (v_val) {
		//		alert(v_val);
	}
	var exDat = {
		table: "progrectype",
		where: {
			enable: "Y",
			deleted: 0
		},
		orderby: " CONVERT (   type_title_th  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);


			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่รายการแนะนำ").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					//	$(".select2-chosen").text(result.news_type_title_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.type_title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.type_title_th).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadProgRecType');
			duck.NotiDanger();
		}
	});

};

contents.LoadProgRecTypeSub = function (v_val, element_id, v_valref) {


	var v_prov = '';
	if (v_val) {
		//		alert(v_val);
	}
	var exDat = {
		table: "progrectypesub",
		where: {
			enable: "Y",
			deleted: 0,
			progrectype_id: v_valref
		},
		orderby: " CONVERT (title_th  USING tis620 ) ASC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("กรุณาเลือกหมวดหมู่ย่อยรายการแนะนำ").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					$(".select2-chosen").text(result.title_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.title_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.title_th).appendTo('#' + element_id);
				}
			});

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadProgRecTypeSub');
			duck.NotiDanger();
		}
	});
};

contents.LoadProgPlanType = function (v_val, element_id) {
	if (v_val) {
		// alert(v_val);
	}
	var exDat = {
		table: "programschplan_type",
		where: { enable: "Y" },
		orderby: "   orderby DESC",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			//console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("หมวดหมู่ผังการออกอากาศ").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				if (result.id == v_val) {
					$(".select2-chosen").text(result.title_type_th);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(result.title_type_th).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(result.title_type_th).appendTo('#' + element_id);
				}
			});
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadProgPlanType');
			duck.NotiDanger();
		}
	});
};

contents.LoadProgramSchPlan = function (v_val, element_id, v_valref) {
	if (v_val) {

	}
	var exDat = {
		table: "programschplan",
		where: {
			enable: "Y",
			deleted: "0",
			programschplan_type_id: v_valref
		},
		orderby: " startdate DESC ",
		limit: "",
	};

	$.ajax({
		url: contents.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			//console.log(data);
			$('#' + element_id).find('option').remove()
			$('<option>').attr('value', '').text("เลือกผังการออกอากาศ").appendTo('#' + element_id);
			$.each(data, function (i, result) {
				var title = result.title_th + " (" + duck.ConvertDate(result.startdate, 'mini', 'th') + " - " + duck.ConvertDate(result.enddate, 'mini', 'th') + ")";
				if (result.id == v_val) {
					$(".select2-chosen").text(title);
					$('<option>').attr('value', result.id).attr('selected', 'selected').text(title).appendTo('#' + element_id);
				} else {
					$('<option>').attr('value', result.id).text(title).appendTo('#' + element_id);
				}
			});
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadProgramSchPlan');
			duck.NotiDanger();
		}
	});
};

contents.LoadSearchKey = function () {
	$(".box_contentmore").html("");

	//$("#btn_viewmore").removeClass('hidden');
	//	if( $("#datatype").val() == "news" ){
	var datatype = $("#datatype").val();
	var datatype_type = $("#datatype_type").val();
	var datatype_typesub = $("#datatype_typesub").val();
	var keyword = $("#keyword").val();
	//	}

	var exDat = {
		datatype: datatype,
		datatype_type: datatype_type,
		datatype_typesub: datatype_typesub,
		keyword: keyword
	};

	$.ajax({
		url: contents.url + '?mode=LoadSearchData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {

			console.log(data);
			var x = 0;

			$.each(data.news, function (i, result) {
				var ctype = "";
				if (result.news_type_id == 1) {
					ctype = "radio";
				} else {
					ctype = "tv";
				}
				var title_th = result.news_title_th;
				var title = title_th.substring(0, 97);
				var cont = '\
					<div class="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 colpig">\
						<a href="'+ ctype + '/newsdetail.php?news_id=' + result.id + '">\
							<div class="detail-box round clearfix mt-3">\
								<img src="/uploads/news/'+ result.id + '/' + result.news_img_picname + '" class="card-img-top img-size"  onerror="this.onerror=null;this.src=\'/img/defualt/defualt2.jpg\';" >\
								<h6 class="hder300 my-2">'+ title + '</h6>\
								<div class="float-right textPopClock"> <i class="fa fa-clock-o"></i> '+ duck.ConvertDate(result.public_date, 'mini', 'th') + '</div>\
							</div> \
						</a>\
					</div>\
				';
				$(".box_contentmore").append(cont);
				x++;
			});

			$.each(data.progprev, function (i, result) {
				var ctype = "";
				if (result.progprev_type_id == 1) {
					ctype = "radio";
				} else {
					ctype = "tv";
				}
				var title_th = result.progprev_title_th;
				var title = title_th.substring(0, 97);
				var cont = '\
					<div class="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 colpig">\
						<a href="'+ ctype + '/ondemandlist_detail.php?id=' + result.id + '">\
							<div class="detail-box round clearfix mt-3">\
								<img src="/uploads/progprev/'+ result.id + '/' + result.picname + '" class="card-img-top img-size"  onerror="this.onerror=null;this.src=\'/img/defualt/defualt2.jpg\';" >\
								<h6 class="hder300 my-2">'+ title + '</h6>\
								<div class="float-right textPopClock"> <i class="fa fa-clock-o"></i> '+ duck.ConvertDate(result.public_date, 'mini', 'th') + '</div>\
							</div> \
						</a>\
					</div>\
				';
				$(".box_contentmore").append(cont);
				x++;
			});

			$.each(data.progrec, function (i, result) {
				var ctype = "";
				if (result.progrec_type_id == 1) {
					ctype = "radio";
				} else {
					ctype = "tv";
				}
				var title_th = result.progrec_title_th;
				var title = title_th.substring(0, 97);
				var cont = '\
					<div class="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 colpig">\
						<a href="'+ ctype + '/programlist.php?pid=' + result.programsch_id + '">\
							<div class="detail-box round clearfix mt-3">\
								<img src="/uploads/progrec/'+ result.id + '/' + result.pic_cover + '" class="card-img-top img-size"  onerror="this.onerror=null;this.src=\'/img/defualt/defualt2.jpg\';" >\
								<h6 class="hder300 my-2">'+ title + '</h6>\
								<div class="float-right textPopClock">  </div>\
							</div> \
						</a>\
					</div>\
				';
				$(".box_contentmore").append(cont);
				x++;
			});

			// $.each(data.progplan, function(i, result) { 
			// 	var ctype ="";
			// 	if(result.progrec_type_id == 1){
			// 		ctype= "radio" ;
			// 	}else{
			// 		ctype= "tv" ;
			// 	}
			// 	var title_th = result.progrec_title_th;
			// 	var title = title_th.substring(0, 97);
			// 	var cont = '\
			// 		<div class="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 colpig">\
			// 			<a href="'+ctype+'/programlist.php?pid='+result.programsch_id+'">\
			// 				<div class="detail-box round clearfix mt-3">\
			// 					<img src="/uploads/progrec/'+result.id+'/'+result.pic_cover+'" class="card-img-top img-size"  onerror="this.onerror=null;this.src=\'/img/defualt/defualt2.jpg\';" >\
			// 					<h6 class="hder300 my-2">'+title+'</h6>\
			// 					<div class="float-right textPopClock">  </div>\
			// 				</div> \
			// 			</a>\
			// 		</div>\
			// 	'; 
			// 	$(".box_contentmore").append(cont);
			// 	x++;
			// }); 



			$(".txt_result").removeClass('hidden');
			$(".txt_numresult").text("จำนวน " + x + " รายการ");
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadSearchKey');
			duck.NotiDanger();
		}
	});

};

contents.UpdateView = function (tablename, fieldviews, id, linkto) {



	var exDat = {
		table: tablename,
		fieldviews: fieldviews,
		id: id,

	};
	console.log(exDat)
	$.ajax({
		url: contents.url + '?mode=EditView',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			//window.location.href= linkto 

			// if (data.success == "COMPLETE") {
			// } else {
			// }
		},
		error: function (data) {
			console.log(data);
			duck.NotiDanger();
		}
	});
}

contents.LoadMedia = function (mediatype) {

	var pageinfo = $("#page" + mediatype).val();
	var numstart = pageinfo * 6;

	pageinfo++;

	var numlimit = numstart + ",6";

	var exDat = {
		table: 'media',
		where: {
			mediatype: 1,
			deleted: 0,
			enable_w: 'Y',
			display_header: 'N'
		},
		orderby: "public_date DESC ",
		limit: numlimit,
		date: {
			public_date: $("#todaydate").val()
		}
	};


	$("#page" + mediatype).val(pageinfo);

	$.ajax({
		url: contents.url + '?mode=LoadAfterDate',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			var x = 0;
			$.each(data, function (i, result) {
				var video = result.vdolink;
				var matches = video.split("https://youtu.be/");
				var content = result.content;
				content = content.replace(/(<([^>]+)>)/ig, "");
				//  <p class="hder300Text" >'+content+'</p>\
				var cont = '\
					<div class="col-lg-4 col-md-6 col-12 mt-3 colpig mb-3">\
                        <div class="detail-box round clearfix mt-3 mb-3"  >\
							<iframe width="100%" height="180"  class="news_youtube" src="//www.youtube.com/embed/'+ matches[1] + '" frameborder="0" allowfullscreen ></iframe>  \
							<h6 class="hder300 my-2"> '+ result.title + ' </h6>\
							<div class="float-right textPopClock">  <i class="fa fa-clock-o"></i> '+ duck.ConvertDate(result.public_date, 'mini', 'th') + '</div>\
                        </div>\
					</div>\
				';
				console.log(result.title);
				$("#contents_" + mediatype).append(cont);
				x++;
			});

			if (x < 6) {
				$("#btn_viewmore_" + mediatype).addClass("hidden");
			}


		},
		error: function (data) {
			console.log(data);
			console.log('check public_date');
			duck.NotiDanger();
		}
	});
};

contents.LoadDocument = function (doctype) {

	var pageinfo = $("#page").val();
	var numstart = pageinfo * 8;

	pageinfo++;

	var numlimit = numstart + ",8";

	var exDat = {
		table: 'documents',
		where: {
			documenttype: doctype,
			deleted: 0,
			enable: 'Y'
		},
		orderby: "public_date DESC ",
		limit: numlimit,
		date: {
			public_date: $("#todaydate").val()
		}
	};


	$("#page").val(pageinfo);

	$.ajax({
		url: contents.url + '?mode=LoadAfterDateDocETC',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			var x = 0;
			$.each(data, function (i, result) {

				var content = result.content;
				content = content.replace(/(<([^>]+)>)/ig, "");

				var cont = '\
				<div class="col-lg-3 col-md-6 col-sm-12">\
					<div class="card4">\
						<img class="imgReport" src="/uploads/documents/'+ result.pic_cover + '" >\
						<br>\
						<h6 class="Aboutus5 my-2">'+ result.title + '</h6>\
						<p class="content9">'+ content + ' </p>\
						<a href="/uploads/documents/'+ result.docfile + '" target="_blank" class="btn colorDownload rounded-pill active" >\
							<div class=""><i class="fa fa-arrow-down" aria-hidden="true"></i> ดาวน์โหลด</div>\
						</a>\
					</div>\
				</div>\
				';

				var cont2 = '\
				<div class="row dvertical mb-2">\
					<div class=" col-lg-3 ">\
						<a href="#"><img class="imgReport2" src="/uploads/documents/'+ result.pic_cover + '"  ></a>\
					</div>\
					<div class=" col-lg-4 dvertical">\
						<h6 class="Aboutus5 my-2">'+ result.title + '</h6>\
						<p class="content9">'+ content + ' </p>\
						<a href="/uploads/documents/'+ result.docfile + '" target="_blank"  class="btn colorDownload2 rounded-pill active" >\
						<div class=""> <i class="fa fa-arrow-down" aria-hidden="true"></i>   ดาวน์โหลด</div>\
						</a>\
					</div>\
				</div>\
			  	';

				console.log(result.title);
				$("#contents_doc").append(cont);
				$("#vertical").append(cont2);
				x++;
			});
			if (x < 8) {
				$("#btn_viewmore").addClass("hidden");
			}
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadDocument');
			duck.NotiDanger();
		}
	});
};

contents.LoadSurveyTodo = function (dataid) {
	// $('#modalsur').modal('show');
	// alert(dataid);

	var exDat = {
		dataid: dataid
	};

	$("#box_radio").empty();

	$.ajax({
		url: contents.url + '?mode=LoadSurveyMainById',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log();

			$("#data_id").val(dataid);
			$(".txt_surveymain").text(data.surveyname);
			$(".txt_survey").text(data.qname);

			var i = 1;
			var answernum = data.answernum;
			for (; i <= answernum;) {
				con = '\
					<div class="custom-control custom-radio custom-control-inline">\
						<input type="radio" class="custom-control-input" id="radio'+ i + '" name="radio" value="' + i + '">\
						<label class="custom-control-label" id="radiosur" name="btnSubmit" for="radio'+ i + '">' + i + '</label>\
					 </div>\
				  ';
				i++;
				$("#box_radio").append(con);
			}
			$("#modalsur").modal('show');

		},
		error: function (data) {
			console.log(data);
			console.log('check LoadSurveyTodo');
			duck.NotiDanger();
		}
	});
};



contents.SendComment = function () {



	var exDat = {
		table: "answer_surveymain",
		data: {
			surveymain_id: $("#data_id").val(),
			answer: $('input[type=radio][name=radio]:checked').val(),
			ip_address: $("#ip").val(),

		},
		data_content: {
			comment: $.trim($("textarea").val())
		}
	};
	console.log(exDat);

	$.ajax({
		url: office.url + '?mode=AddDataContents',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			if (data.success == "COMPLETE") {

				var link = 'poll.php';
				duck.ModalSShowcomment();
				setTimeout(duck.ModalSHide, 3000);
				setTimeout(duck.OpenPage, 3200, link, '_self');


			} else {
				duck.ModalWShow();
			}
		},
		error: function (data) {
			console.log(data);
			duck.NotiDanger();
		}
	});

};

contents.CheckIPAddress = function (element_id, model) {
	//CheckUsername 
	var exDat = {
		table: "answer_surveymain",
		where: {
			ip_address: $("#ip").val(),
		}
	};
	//   console.log(exDat);

	$.ajax({
		url: contents.url + '?mode=LoadOneRow',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log("CheckIPAddress::");
			console.log(data);
			if (data) {
				alert('1');
				// $('#'+element_id).addClass('danger');
				// $('#'+element_id).modal('hide'); 
				// $('#'+txt_id).modal('show');
				// return false;
				// $("#btn_save").attr('disabled','disabled');
			} else {
				alert('2');
				// $('#'+element_id).removeClass('danger');
				// $('#'+element_id).modal('show'); 
				//   $('#'+txt_id).modal('show');
				//   $("#btn_save").removeAttr('disabled');
			}
		}, error: function (data) {
			console.log(data);
			duck.NotiDanger();
		}
	});
};


///// MILE 

contents.LoadDocumentData = function (doctype) {


	var pageinfo = $("#page").val();
	var numstart = pageinfo * 8;

	pageinfo++;

	var numlimit = numstart + ",8";

	var exDat = {
		table: 'documents',
		where: {
			documenttype: doctype,
			deleted: 0,
			enable: 'Y'
		},
		orderby: "public_date DESC ",
		limit: numlimit,
		date: {
			public_date: $("#todaydate").val()
		}
	};


	$("#page").val(pageinfo);

	$.ajax({
		url: contents.url + '?mode=LoadAfterDateDocETC',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			var x = 0;
			$.each(data, function (i, result) {

				var content = result.content;
				content = content.replace(/(<([^>]+)>)/ig, "");

				var cont = '\<div class="wpb_column column_container col-sm-6 col-md-4">\
					<div class="column-inner">\
						<div class="wpb_wrapper">\
							<div class="service-box image-box ">\
								<img src="/uploads/documents/'+ result.pic_cover + '" alt="" class="img-document" >\
								<div class="content-box">\
									<h4 class="entry-title newstitle">'+ result.title + '</h4>\
									<p class="ct-details">'+ content + '</p>\
									<a class="pagelink orange " href="/uploads/documents/'+ result.docfile + '" target="_blank">ดาวน์โหลด</a> </div>\
							</div>\
							<div class="empty_space_30"></div>\
						</div>\
					</div>\
				</div>\
				';


				// var cont2 = '\
				// <div class="row dvertical mb-2">\
				// 	<div class=" col-lg-3 ">\
				// 		<a href="#"><img class="imgReport2" src="/uploads/documents/'+ result.pic_cover + '"  ></a>\
				// 	</div>\
				// 	<div class=" col-lg-4 dvertical">\
				// 		<h6 class="Aboutus5 my-2">'+ result.title + '</h6>\
				// 		<p class="content9">'+ content + ' </p>\
				// 		<a href="/uploads/documents/'+ result.docfile + '" target="_blank"  class="btn colorDownload2 rounded-pill active" >\
				// 		<div class=""> <i class="fa fa-arrow-down" aria-hidden="true"></i>   ดาวน์โหลด</div>\
				// 		</a>\
				// 	</div>\
				// </div>\
				// ';

				console.log(result.title);
				$("#contents_doc").append(cont);
				//$("#vertical").append(cont2);
				x++;
			});
			if (x < 8) {
				$("#btn_viewmore").addClass("hidden");
			}
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadDocument');
			duck.NotiDanger();
		}
	});
};


contents.LoadNewsData = function () {
	//alert('PP'+newstypesub_id);
	//var pagenews = $("#pagenews" + newstypesub_id).val();
	var pagenews = 0;
	var numstart = pagenews * 4;

	// pagenews++;
	// if (numstart == NaN || numstart == "") {
	// 	numstart = 0;
	// }

	var numlimit = numstart + ",4";

	var exDat = {
		where: {
			// news_type_id: newstype_id,
			// news_type_sub_id: newstypesub_id,
			deleted: 0,
			enable_w: 'Y',
			enable: 'Y'
		},
		orderby: " n.public_date DESC   ",
		limit: numlimit
	};


	//$("#pagenews" + newstypesub_id).val(pagenews);

	$.ajax({
		url: contents.url + '?mode=LoadNewsCover',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			var x = 0;
			$.each(data, function (i, result) {
				var title_th = result.news_title_th;
				var title = title_th.substring(0, 500);
				var link = 'newsdetail';
				// if (newstype_id == 8) {
				// 	link = 'infographic_detail';
				// }
				// var cont = '\
				// 	<div class="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 colpig">\
				// 		<a href="'+ link + '.php?news_id=' + result.id + '">\
				// 			<div class="detail-box round clearfix mt-3">\
				// 				<img src="/uploads/news/'+ result.id + '/' + result.news_img_picname + '" class="card-img-top img-size"  onerror="this.onerror=null;this.src=\'/img/defualt/defualt2.jpg\';" >\
				// 				<h6 class="hder300 my-2 box_title">'+ title + '</h6>\
				// 				<div class="float-right textPopClock"> <i class="fa fa-clock-o"></i> '+ duck.ConvertDate(result.public_date, 'mini', 'th') + '</div>\
				// 			</div> \
				// 		</a>\
				// 	</div>\
				// ';
				var cont = '\
				<div class="wpb_column column_container col-sm-6 col-md-4" style="margin-top: 20px;"> \
					<article class="news-item content-area">\
						<div class="inner-item radius-top">\
							<div class="thumb-image">\
								<a href="newsdetail.php">\
									<img src="/uploads/news/'+ result.id + '/' + result.news_img_picname + '" class="img-boxsize" alt=""  onerror="this.onerror=null;this.src=\'/img/defualt/defualt2.jpg\';" class="img-boxsize" alt="">\
								</a>\
							</div>\
							<div class="inner-post radius-bottom">\
								<div class="entry-meta">\
									<span class="posted-on">\
										<time class="entry-date">'+ duck.ConvertDate(result.public_date, 'mini', 'th') + '</time>\
									</span>\
									<span class="color-white">\
										<a href="#"></a>\
									</span>\
								</div>\
								<h4 class="entry-title newstitle">\
									<a href="newsdetail.php">พระราชปฏิภาณโกศล,\
										ผศ.ดร.อธิการบดีมหาวิทยาลัยมหามกุฏราชวิทยาลัย</a>\
								</h4>\
								<p class="ct-details">\
									ประกาศมหาวิทยาลัยมหามกุฏราชวิทยาลัย\
									เรื่องการดำเนินการตามนโยบายปรับลดค่าธรรมเนียม\
								</p>\
								<a class="txt-readmore" href="newsdetail.php?newsid='+ result.id + '"> > อ่านเพิ่มเติม</a>\
							</div>\
						</div>\
					</article>\
				</div>\
				';
				$("#contents_news").append(cont);
				x++;
			});
			//$("#checknews" + newstypesub_id).val(x);
			if (x < 4) {
				contents.LoadNewsSP(x, newstypesub_id);
			}
			/*
			if(!data){
				$("#btn_viewmore"+newstypesub_id).addClass('hidden');
			}*/
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadNews');
			duck.NotiDanger();
		}
	});
};


contents.LoadInfoData = function (doctype) {


	var pageinfo = $("#page").val();
	var numstart = pageinfo * 8;

	pageinfo++;

	var numlimit = numstart + ",8";

	var exDat = {
		table: 'media',
		where: {

			deleted: 0,
			enable_w: 'Y'
		},
		orderby: "public_date DESC ",
		limit: numlimit,
		date: {
			public_date: $("#todaydate").val()
		}
	};


	$("#page").val(pageinfo);

	$.ajax({
		url: contents.url + '?mode=LoadAfterDateDocETC',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			var x = 0;
			$.each(data, function (i, result) {

				var content = result.content;
				content = content.replace(/(<([^>]+)>)/ig, "");

				var cont = '\<div class="wpb_column column_container col-sm-6 col-md-4">\
					<div class="column-inner">\
						<div class="wpb_wrapper">\
							<div class="service-box image-box ">\
								<img src="/uploads/documents/'+ result.pic_cover + '" alt="" class="img-document" >\
								<div class="content-box">\
									<h4 class="entry-title newstitle">'+ result.title + '</h4>\
									<p class="ct-details">'+ content + '</p>\
									<a class="pagelink orange " href="/uploads/documents/'+ result.docfile + '" target="_blank">ดาวน์โหลด</a> </div>\
							</div>\
							<div class="empty_space_30"></div>\
						</div>\
					</div>\
				</div>\
				';


				// var cont2 = '\
				// <div class="row dvertical mb-2">\
				// 	<div class=" col-lg-3 ">\
				// 		<a href="#"><img class="imgReport2" src="/uploads/documents/'+ result.pic_cover + '"  ></a>\
				// 	</div>\
				// 	<div class=" col-lg-4 dvertical">\
				// 		<h6 class="Aboutus5 my-2">'+ result.title + '</h6>\
				// 		<p class="content9">'+ content + ' </p>\
				// 		<a href="/uploads/documents/'+ result.docfile + '" target="_blank"  class="btn colorDownload2 rounded-pill active" >\
				// 		<div class=""> <i class="fa fa-arrow-down" aria-hidden="true"></i>   ดาวน์โหลด</div>\
				// 		</a>\
				// 	</div>\
				// </div>\
				// ';

				console.log(result.title);
				$("#contents_info").append(cont);
				//$("#vertical").append(cont2);
				x++;
			});
			if (x < 8) {
				$("#btn_viewmore").addClass("hidden");
			}
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadDocument');
			duck.NotiDanger();
		}
	});
};

contents.LoadMediaData = function (mediatype) {
	var mediatype = 1;
	var pageinfo = $("#page" + mediatype).val();
	var numstart = pageinfo * 6;

	pageinfo++;

	var numlimit = numstart + ",6";

	var exDat = {
		table: 'media',
		where: {
			//mediatype: 1,
			deleted: 0,
			// enable_w: 'Y',
			//display_header: 'N'
		},
		orderby: "public_date DESC ",
		limit: '',
		date: {
			public_date: $("#todaydate").val()
		}
	};


	$("#page" + mediatype).val(pageinfo);

	$.ajax({
		url: contents.url + '?mode=LoadAfterDate',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			var x = 0;
			$.each(data, function (i, result) {
				var video = result.vdolink;
				var matches = video.split("https://youtu.be/");
				var content = result.content;
				content = content.replace(/(<([^>]+)>)/ig, "");
				//  <p class="hder300Text" >'+content+'</p>\
				// var cont = '\
				// 	<div class="col-lg-4 col-md-6 col-12 mt-3 colpig mb-3">\
				//         <div class="detail-box round clearfix mt-3 mb-3"  >\
				// 			<iframe width="100%" height="180"  class="news_youtube" src="//www.youtube.com/embed/'+ matches[1] + '" frameborder="0" allowfullscreen ></iframe>  \
				// 			<h6 class="hder300 my-2"> '+ result.title + ' </h6>\
				// 			<div class="float-right textPopClock">  <i class="fa fa-clock-o"></i> '+ duck.ConvertDate(result.public_date, 'mini', 'th') + '</div>\
				//         </div>\
				// 	</div>\
				// ';

				var cont = '\<div class="wpb_column column_container col-sm-6 col-md-4">\
					<div class="column-inner">\
						<div class="wpb_wrapper">\
							<div class="service-box image-box ">\
							<img src="/uploads/info/'+ result.pic_cover + '" alt="" class="img-document" onerror="this.onerror=null;this.src=\'/img/defualt/defualt2.jpg\';"  alt="">\
								<div class="content-box">\
									<h4 class="entry-title newstitle">'+ result.title + '</h4>\
									<p class="ct-details">'+ duck.ConvertDate(result.public_date, 'mini', 'th') + '</p>\
									<a class="txt-readmore"  href="infodetail.php?newsid='+ result.id + '">  รายละเอียด</a>\
									<br>\
								 </div>\
							</div>\
							<div class="empty_space_30"></div>\
						</div>\
					</div>\
				</div>\
				';
				console.log(result.title);
				$("#contents_info").append(cont);
				x++;
			});

			// if (x < 6) {
			// 	$("#btn_viewmore_" + mediatype).addClass("hidden");
			// }


		},
		error: function (data) {
			console.log(data);
			console.log('check public_date');
			duck.NotiDanger();
		}
	});
};
//



contents.LoadProgrec = function () {
	//alert('PP'+newstypesub_id);
	// <input type="hidden" id="pagenews<?php echo $v1['id'];?>" name="pagenews<?php echo $v1['id'];?>" value="0" >

	// var pagenews = $("#pagenews").val();
	var pagenews = 0;
	var numstart = pagenews * 4;

	pagenews++;
	if (numstart == NaN || numstart == "") {
		numstart = 0;
	}

	var numlimit = numstart + ",4";

	var exDat = {
		where: {
			'p.deleted': 0,
			'p.enable_w': 'Y',
			'p.enable': 'Y'
		},
		orderby: "create_date DESC   ",
		limit: numlimit
	};


	$("#pagenews").val(pagenews);

	$.ajax({
		url: contents.url + '?mode=LoadProgRec',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);
			var x = 0;
			$.each(data, function (i, result) {
				var title_th = result.progrec_title_th;
				var title = title_th.substring(0, 500);

				var list_name = '';
				var prolist_name = '';

				if (result.list_name) {

					list_name = 'ชื่อผู้จัดทำรายการ : ' + result.list_name;
				}
				if (result.prolist_name) {

					prolist_name = '<br> พระสอนศีลธรรม : ' + result.prolist_name;
				}

				var link = 'newsdetail';

				var cont = '\
						<article class="post-box post type-post hentry">\
							<div class="entry-media divimg">\
								<a href="programdetail">\
									<img class="w100-img" src="/uploads/progrec/'+ result.id + '/' + result.pic_cover + '" alt="">\
								</a>\
							</div>\
							<div class="inner-post-progrec">\
								<header class="entry-header">\
									<div class="entry-meta" style="margin-bottom: 0px!important;">\
										<span class="posted-on">\
											<time class="entry-date">'+ duck.ConvertDate(result.create_date, 'mini', 'th') + '</time>\
										</span>\
										<span class="color-white">\
											<a href="#" tabindex="0"></a>\
										</span>\
									</div>\
									<h4 class="entry-title"><a href="programdetail" rel="bookmark"><b>'+ title + ' </b></a></h4>\
								</header>\
								<div class="entry-summary">\
									<p class="ct-details">'+ list_name + ' ' + prolist_name + '</p>\
								</div>\
								<footer class="entry-footer">\
									<a class="pagelink orange " href="/programdetail/'+ result.id_convert + '" target="_blank">ดูเพิ่มเติม</a>\
								</footer>\
							</div>\
						</article>\
						';
				$("#list_progrec").append(cont);
				x++;
			});
			$("#checknews").val(x);
			if (x < 4) {
				//	contents.LoadProgrecMore(x);
			}
			/*
			if(!data){
				$("#btn_viewmore"+newstypesub_id).addClass('hidden');
			}*/
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadNews');
			duck.NotiDanger();
		}
	});
};

contents.LoadProgrecMore = function (x, a) {
	//var a = '1' ;

	var y = 4;
	if (x != 4) {
		y = 4 - x;
	}

	var pagenewssp = $("#pagenewssp" + a).val();
	var numstart = pagenewssp * y;

	pagenewssp++;
	if (numstart == NaN || numstart == "") {
		numstart = 0;
	}

	var numlimit = numstart + "," + y;

	var exDat = {
		table: "spnews_news",
		where: {
			viewStatus: "1"
		},
		orderby: " date_publish DESC ",
		limit: numlimit
	};

	$("#pagenewssp" + a).val(pagenewssp);

	$.ajax({
		url: office.url + '?mode=LoadAllData',
		type: 'POST',
		dataType: 'json',
		data: exDat,
		success: function (data) {
			console.log(data);

			$.each(data, function (i, result) {
				var title_th = result.title;
				var title = title_th.substring(0, 500);

				var cont = '\
					<div class="col-lg-3 col-md-4 col-sm-6 col-6 mt-3 colpig">\
						<a href="newsdetails.php?news_id='+ result.nId + '">\
							<div class="detail-box round clearfix mt-3">\
								<img src="/img/defualt/defualt2.jpg" class="card-img-top img-size"  onerror="this.onerror=null;this.src=\'/img/defualt/defualt2.jpg\';" >\
								<h6 class="hder300 my-2">'+ title + '</h6>\
								<p class="hder300Text hidden">\
								'+ result.title + '\
								</p>\
								<div class="float-right textPopClock"> <i class="fa fa-clock-o"></i> '+ duck.ConvertDate(result.date_publish, 'mini', 'th') + '</div>\
							</div> \
						</a>\
					</div>\
				';
				$(".box_contentmore" + a).append(cont);
			});

			if (!data) {
				$("#btn_viewmore" + a).addClass('hidden');
			}
		},
		error: function (data) {
			console.log(data);
			console.log('check LoadNewsSP');
			duck.NotiDanger();
		}
	});

};
/////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {



	if (!localStorage.numperpage) {
		localStorage.numperpage = 10;
	}
	localStorage.numperpage = 10;


	$(".site-logo").click(function () {
		window.localtion.href = 'index.php';
	});

	// ===== Scroll to Top ==== 
	$(window).scroll(function () {
		if ($(this).scrollTop() >= 200) {
			$('#btn_totop').fadeIn(200);
		} else {
			$('#btn_totop').fadeOut(200);
		}
	});
	$('#btn_totop').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});

	//alert(contents.path);

	$(".input-group-append").click(function () {
		$('.pickadate-translations').trigger("click")
	});


});

////////////////////          END contents Script         ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
