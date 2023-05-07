/////////////////////////////////////////////////////////////////////////////////////
////////////////////           office   Script          ///////////////////////////
var office = {
    url: '../gates/office.inc.php',
    path: 'http://' + window.location.host
};

//////////////////////////////////////////////////////////////////////////////////////////////////
office.callModalAdd = function (FuncName, table) {

    //alert(FuncName);
    var btn_add = '<button type="button" class="btn btn-success" onclick="' + FuncName + '();"> <i class="fa fa-save"> </i> ยืนยันการเพิ่มข้อมูล </button>';
    $("#btn_add").html(btn_add);

    $('#modal_add').modal('show');
};

office.callModalEdit = function (FuncName, table, table_id, detail) {

    //$("#txt_mo_name").html(detail);

    var btn_edit = '<button type="button" class="btn btn-warning" onclick="' + FuncName + '();"> <i class="fa fa-trash"> </i> ยืนยันการแก้ไข </button>';
    $("#btn_edit").html(btn_edit);

    $('#modal_edit').modal('show');
};

office.callModalDelete = function (table, table_id, detail, link) {


    $("#txt_mo_name").html("ต้องการยืนยันการลบข้อมูล " + detail);

    var btn_delete = '<button type="button" class="btn btn-danger" onclick="office.callDelete(\'' + table + '\',\'' + table_id + '\',\'' + link + '\');"> <i class="fa fa-trash"> </i> ยืนยัน </button>';
    $("#btn_delete").html(btn_delete);

    $('#modal_delete').modal('show');
};

office.callModalDisable = function (table, table_id, detail, link) {


    $("#txt_detail_dis").html("ต้องการยืนยันการลบข้อมูล " + detail);

    var btn_disable = '<button type="button" class="btn btn-danger" onclick="office.callDisable(\'' + table + '\',\'' + table_id + '\',\'' + link + '\');"> <i class="fa fa-trash"> </i> ยืนยัน </button>';
    $("#btn_disable").html(btn_disable);

    $('#modal_disable').modal('show');
};


office.callModalDeleteTruly = function (table, table_id, detail) {
    $("#txt_mo_name").html(detail);

    var btn_delete = '<button type="button" class="btn btn-danger" onclick="office.callDeleteTruly(\'' + table + '\',\'' + table_id + '\');"> <i class="fa fa-trash"> </i> ยืนยันการลบ </button>';
    $("#btn_delete").html(btn_delete);

    $('#modal_delete').modal('show');
};

office.callDelete = function (table, table_id, link) {
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
        url: office.url + '?mode=EditDataSet',
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
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callDelete');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callDisable = function (table, table_id, link) {
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
        url: office.url + '?mode=EditDataSet',
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
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callDelete');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callDelete_EX = function (table, table_id, id_name, status_name, link) {
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
        url: office.url + '?mode=StatusDataSetEX',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
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
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callDelete');
            console.log(data);
            duck.NotiDanger();
        }
    });


};

office.callDeleteTruly = function (table, table_id) {

    var DataSet = {
        table: table,
        where: { id: table_id }
    };
    //console.log(DataSet);

    $.ajax({
        url: office.url + '?mode=DeleteDataSet',
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
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callDelete');
            console.log(data);
        }
    });


};


office.callSetEnable = function (table_name, table_id, refto) {
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
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetEnable');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetEnableW = function (table_name, table_id, refto) {
    var x = 'N';
    if (!refto) {
        refto = "enable_w";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = 'Y';
    }
    var DataSet = {
        table: table_name,
        data: {
            enable_w: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetEnableWeb');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetEnableM = function (table_name, table_id, refto) {
    var x = 'N';
    if (!refto) {
        refto = "enable_m";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = 'Y';
    }
    var DataSet = {
        table: table_name,
        data: {
            enable_m: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetEnableMobile');
            console.log(data);
            duck.NotiDanger();
        }
    });
};



office.callSetEnableWM = function (table_name, table_id, refto) {
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
            enable_m: x,
            enable_w: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetEnable');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetEnableTH = function (table_name, table_id, refto) {
    var x = 'N';
    if (!refto) {
        refto = "enable_th";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = 'Y';
    }
    var DataSet = {
        table: table_name,
        data: {
            enable_th: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetEnableTH');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetEnableEN = function (table_name, table_id, refto) {
    var x = 'N';
    if (!refto) {
        refto = "enable_en";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = 'Y';
    }
    var DataSet = {
        table: table_name,
        data: {
            enable_en: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetEnableEN');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


office.callSetEnableDept = function (table_name, table_id, refto) {
    var x = 'N';
    if (!refto) {
        refto = "enable_dept";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = 'Y';
    }
    var DataSet = {
        table: table_name,
        data: {
            enable_dept: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetEnableDept');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetEnableOffice = function (table_name, table_id, refto) {
    var x = 'N';
    if (!refto) {
        refto = "enable_office";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = 'Y';
    }
    var DataSet = {
        table: table_name,
        data: {
            enable_office: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetEnableOffice');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetDisplay = function (table_name, table_id, refto) {
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
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
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
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetDisplay');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetDisplayLevel = function (table_name, table_id, refto) {
    var x = 'N';
    if (!refto) {
        refto = "display_level";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = 'Y';
    }
    var DataSet = {
        table: table_name,
        data: {
            display_level: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();
            } else {
                duck.NotiWarning();
            }
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetDisplayLevel');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


office.callSetDisplayHeader = function (table_name, table_id, refto) {
    var x = 'N';
    if (!refto) {
        refto = "display_header";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = 'Y';
    }
    var DataSet = {
        table: table_name,
        data: {
            display_header: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();
            } else {
                duck.NotiWarning();
            }
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetDisplayHeader');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.LoadProvinceBK = function (v_val, element_id) {
    if (v_val) {
        //		alert(v_val);
    }
    var exDat = {
        table: "provinces",
        where: { enable: "Y" },
        orderby: " provinces_id ASC ",
        limit: "",
    };

    $.ajax({
        url: office.url + '?mode=LoadAllData',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
            $('#' + element_id).find('option').remove()
            $('<option>').attr('value', '').text("กรุณาเลือกจังหวัด").appendTo('#' + element_id);
            $.each(data, function (i, result) {
                if (result.provinces_id == v_val) {
                    $(".select2-chosen").text(result.provinces_name);
                    $('<option>').attr('value', result.provinces_id).attr('selected', 'selected').text(result.provinces_name).appendTo('#' + element_id);
                } else {
                    $('<option>').attr('value', result.provinces_id).text(result.provinces_name).appendTo('#' + element_id);
                }
            });

        },
        error: function (data) {
            console.log(data);
            console.log('check LoadProvince');
            duck.NotiDanger();
        }
    });

};



office.LoadProvincesArea = function (v_val, element_id, responsible_area_id) {
    if (v_val) {
        //		alert(v_val);
    }
    var exDat = {
        table: "province",
        where: {

            responsible_area_id: responsible_area_id

        },
        orderby: " CONVERT (   PROVINCE_NAME  USING tis620 ) ASC ",
        limit: "",
    };

    $.ajax({
        url: office.url + '?mode=LoadAllData',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
            $('#' + element_id).find('option').remove()
            $('<option>').attr('value', '').text("กรุณาเลือกจังหวัด").appendTo('#' + element_id);
            $.each(data, function (i, result) {
                if (result.PROVINCE_ID == v_val) {
                    $(".select2-chosen").text(result.PROVINCE_NAME);
                    $('<option>').attr('value', result.PROVINCE_ID).attr('selected', 'selected').text(result.PROVINCE_NAME).appendTo('#' + element_id);
                } else {
                    $('<option>').attr('value', result.PROVINCE_ID).text(result.PROVINCE_NAME).appendTo('#' + element_id);
                }
            });

        },
        error: function (data) {
            console.log(data);
            console.log('check LoadProvince');
            duck.NotiDanger();
        }
    });

};

office.LoadAmphurArea = function (v_val, element_id, prv, responsible_area_id) {
    if (v_val) {
        //		alert(v_val);
    }
    var exDat = {
        table: "amphur",
        where: {
            PROVINCE_ID: prv,
            responsible_area_id: responsible_area_id

        },
        orderby: " CONVERT (   AMPHUR_NAME  USING tis620 ) ASC ",
        limit: "",
    };

    $.ajax({
        url: office.url + '?mode=LoadAllData',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
            $('#' + element_id).find('option').remove()
            $('<option>').attr('value', '').text("กรุณาเลือกอำเภอ").appendTo('#' + element_id);
            $.each(data, function (i, result) {
                if (result.AMPHUR_ID == v_val) {
                    $(".select2-chosen").text(result.AMPHUR_NAME);
                    $('<option>').attr('value', result.AMPHUR_ID).attr('selected', 'selected').text(result.AMPHUR_NAME).appendTo('#' + element_id);
                } else {
                    $('<option>').attr('value', result.AMPHUR_ID).text(result.AMPHUR_NAME).appendTo('#' + element_id);
                }
            });

        },
        error: function (data) {
            console.log(data);
            console.log('check LoadProvince');
            duck.NotiDanger();
        }
    });

};

office.LoadDistrict = function (v_val, element_id, prv, amp) {
    if (v_val) {
        //		alert(v_val);
    }
    var exDat = {
        table: "district",
        where: {
            PROVINCE_ID: prv,
            AMPHUR_ID: amp

        },
        orderby: " CONVERT (   DISTRICT_NAME  USING tis620 ) ASC ",
        limit: "",
    };

    $.ajax({
        url: office.url + '?mode=LoadAllData',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
            $('#' + element_id).find('option').remove()
            $('<option>').attr('value', '').text("กรุณาเลือกอำเภอ").appendTo('#' + element_id);
            $.each(data, function (i, result) {
                if (result.DISTRICT_ID == v_val) {
                    $(".select2-chosen").text(result.DISTRICT_NAME);
                    $('<option>').attr('value', result.DISTRICT_ID).attr('selected', 'selected').text(result.DISTRICT_NAME).appendTo('#' + element_id);
                } else {
                    $('<option>').attr('value', result.DISTRICT_ID).text(result.DISTRICT_NAME).appendTo('#' + element_id);
                }
            });

        },
        error: function (data) {
            console.log(data);
            console.log('check LoadProvince');
            duck.NotiDanger();
        }
    });

};
office.SetFrom = function (action, data_id) {

    $('#data_id').val(data_id);
    $('#action').val(action);

    $("#form_set").submit();
};


office.SetFromAction = function (action, data_id, actionlink) {
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


office.CheckFormMenu = function () {
    var x = 0;
    if ($('#menumain_id').val() == "") {
        $('#menumain_id').addClass('danger_form');
        $('#menumain_id').focus();
        setTimeout(function () { $('#menumain_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#menumain_name_th').val() == "") {
        $('#menumain_name_th').addClass('danger_form');
        $('#menumain_name_th').focus();
        $('#menumain_name_th').focus();
        setTimeout(function () { $('#menumain_name_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#menumain_linktype').val() == "") {
        $('#menumain_linktype').addClass('danger_form');
        $('#menumain_linktype').focus();
        $('#menumain_linktype').focus();
        setTimeout(function () { $('#menumain_linktype').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#orderby').val() == "") {
        $('#orderby').addClass('danger_form');
        $('#orderby').focus();
        $('#orderby').focus();
        setTimeout(function () { $('#orderby').removeClass('danger_form'); }, 8000);
        x = 1;
    }


    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditMenuMain = function (dataid) {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "menumain",
        where: { id: $("#id_dm").val(), },
        data: {
            menumain_name_th: $("#menumain_name_th").val(),
            menumain_level: $("#menumain_level").val(),
            menumain_linktype: $('input[type=radio][name=menumain_linktype]:checked').val(),
            menumain_otherlink: $("#menumain_otherlink").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable_edit]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        }
    };

    console.log(exDat);
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'menu.php';
                duck.ModalSShow();
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

office.CreateMenuMain = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "menumain",
        data: {
            menumain_id: $("#menumain_id").val(),
            menumain_name_th: $("#menumain_name_th").val(),
            menumain_level: $("#menumain_level").val(),
            menumain_linktype: $('input[type=radio][name=menumain_linktype]:checked').val(),
            menumain_otherlink: $("#menumain_otherlink").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable_edit]:checked').val(),
            create_by: $("#create_by").val(),
            update_by: $("#update_by").val(),
        }
    };

    console.log(exDat);
    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'menu.php';
                duck.ModalSShow();
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

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

office.CheckFormMenuSub = function () {
    var x = 0;
    if ($('#menusub_id').val() == "") {
        $('#menusub_id').addClass('danger_form');
        $('#menusub_id').focus();
        setTimeout(function () { $('#menusubn_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#menusub_name_th').val() == "") {
        $('#menusub_name_th').addClass('danger_form');
        $('#menusub_name_th').focus();
        $('#menusub_name_th').focus();
        setTimeout(function () { $('#menusub_name_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#menusub_linktype').val() == "") {
        $('#menusub_linktype').addClass('danger_form');
        $('#menusub_linktype').focus();
        $('#menusub_linktype').focus();
        setTimeout(function () { $('#menusub_linktype').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#department_code_ch').val() == "") {
        $('#department_code_ch').addClass('danger_form');
        $('#department_code_ch').focus();
        $('#department_code_ch').focus();
        setTimeout(function () { $('#department_code_ch').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#orderby').val() == "") {
        $('#orderby').addClass('danger_form');
        $('#orderby').focus();
        $('#orderby').focus();
        setTimeout(function () { $('#orderby').removeClass('danger_form'); }, 8000);
        x = 1;
    }


    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditMenuSub = function (dataid) {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "menusub",
        where: { id: $("#id_dm").val(), },
        data: {
            menusub_id: $("#menusub_id").val(),
            menusub_name_th: $("#menusub_name_th").val(),
            menusub_name_en: $("#menusub_name_en").val(),
            menusub_level: $("#menusub_level").val(),
            menusub_linktype: $('input[type=radio][name=menusub_linktype]:checked').val(),
            menusub_otherlink: $("#menusub_otherlink").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable_edit]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        }
    };

    console.log(exDat);
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,

        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'menu.php';
                duck.ModalSShow();
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

office.CreateMenuSub = function () {
    $("#modal_confirm").modal('hide');
    var menusub_code = "";
    var exDat = {
        table: "menusub",
        data: {
            menusub_name_th: $("#menusub_name_th").val(),
            menusub_name_en: $("#menusub_name_en").val(),
            menusub_level: $("#menusub_level").val(),
            menusub_id: $("#menusub_id").val(),
            menusub_linktype: $('input[type=radio][name=menusub_linktype]:checked').val(),
            menusub_otherlink: $("#menusub_otherlink").val(),
            department_code_ch: $("#department_code_ch").val(),
            menusub_code: menusub_code,
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable_edit]:checked').val(),
            create_by: $("#create_by").val(),
            update_by: $("#update_by").val(),
        }
    };

    console.log(exDat);
    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'menu.php';
                duck.ModalSShow();
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


office.CheckFormNews = function () {
    var x = 0;

    if ($('#news_title_th').val() == "") {
        $('#news_title_th').addClass('danger_form');
        $('#news_title_th').focus();
        $('#news_title_th').focus();
        setTimeout(function () { $('#news_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CheckFormNewsSD = function () {
    var x = 0;

    if ($('#news_title_th').val() == "") {
        $('#news_title_th').addClass('danger_form');
        $('#news_title_th').focus();
        $('#news_title_th').focus();
        setTimeout(function () { $('#news_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateNewsSD = function () {
    $("#modal_confirm").modal('hide');
    var newsmenu = "news"; //news_info
    if ($("#news_type").val() == "news_info") {
        newsmenu = "news_info";
    }

    // alert($("#news_desc_th").summernote('code'));
    // alert(  $("#news_desc_th")[0].innerHTML );
    // console.log(  $("#news_desc_th")[0].innerHTML );
    // 	return false;
    var exDat = {
        table: "news",
        data: {
            news_office: $("#news_office").val(),
            news_type: $("#news_type").val(),
            news_title_th: $("#news_title_th").val(),
            news_menu: $("#news_menu").val(),
            news_youtube: $("#news_youtube").val(),
            news_datetime: $("input[name=news_datetime_submit]").val(),
            news_main: $('input[type=radio][name=news_main]:checked').val(),
            news_home: $('input[type=radio][name=news_home]:checked').val(),
            news_timeline: $('input[type=radio][name=news_timeline]:checked').val(),
            news_starttime: $("input[name=news_starttime_submit]").val(),
            news_endtime: $("input[name=news_endtime_submit]").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            version: 2
        }

    };


    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#news_cover').val() || $('#news_file').val()) {
                    if ($('#news_cover').val()) {
                        office.UploadImgNews(data.code, news_cover, 'news_cover', 'newssd.php?' + $("#news_menu").val());
                    }

                } else {

                    var link = 'newssd.php?' + $("#news_menu").val();
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditNewsSD = function (dataid) {
    $("#modal_confirm").modal('hide');
    var newsmenu = "news"; //news_info
    if ($("#news_type").val() == "news_info") {
        newsmenu = "news_info";
    }

    var exDat = {
        table: "news",
        where: { id: $("#newsid").val(), },
        data: {
            news_office: $("#news_office").val(),
            news_type: $("#news_type").val(),
            news_menu: $("#news_menu").val(),
            news_title_th: $("#news_title_th").val(),
            news_youtube: $("#news_youtube").val(),
            news_datetime: $("input[name=news_datetime_submit]").val(),
            news_main: $('input[type=radio][name=news_main]:checked').val(),
            news_home: $('input[type=radio][name=news_home]:checked').val(),
            news_timeline: $('input[type=radio][name=news_timeline]:checked').val(),
            news_starttime: $("input[name=news_starttime_submit]").val(),
            news_endtime: $("input[name=news_endtime_submit]").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
        }

    };


    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#news_cover').val() || $('#news_file').val()) {
                    if ($('#news_cover').val()) {
                        office.UploadImgNews($('#newsid').val(), news_cover, 'news_cover', 'newssd.php?' + $("#news_menu").val());
                    }
                } else {
                    var link = 'newssd.php?' + $("#news_menu").val();
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditNews = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var newsid = $("#newsid").val();
    var exDat = {
        table: "radionews",
        where: { id: newsid },
        data: {
            news_title_th: $("#news_title_th").val(),
            news_title_en: $("#news_title_en").val(),
            news_youtube: $("#news_youtube").val(),
            news_datetime: $("input[name=news_datetime_submit]").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),

        },
        data_content: {
            news_desc_th: $("#news_desc_th").summernote('code'),
        }

    };


    //console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                if ($('#news_cover').val() || $('#news_file').val()) {
                    if ($('#news_cover').val()) {
                        office.UploadImgNews($("#newsid").val(), news_cover, 'news_cover', 'newsShow_edit.php?data_id=' + newsid);
                    }
                    if ($('#news_file').val()) {
                        office.UploadFileNews($('#newsid').val(), news_file, 'news_file', 'newsShow_edit.php?data_id=' + newsid);
                    }
                } else {
                    var link = 'newsShow_edit.php?data_id=' + newsid;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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



office.CreateNews = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "radionews",
        // where : {id : $("#dataid").val(),	},
        data: {

            news_title_th: $("#news_title_th").val(),
            news_title_en: $("#news_title_en").val(),
            // news_img : $("#news_img").val(), 
            news_youtube: $("#news_youtube").val(),
            news_datetime: $("input[name=news_datetime_submit]").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),

            // version: 2 
        },
        data_content: {
            news_desc_th: $("#news_desc_th").summernote('code'),
        }

    };


    console.log('call Create News');
    console.log(exDat);



    $.ajax({
        url: office.url + '?mode=AddDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#news_img').val() || $('#news_file').val()) {
                    if ($('#news_img').val()) {

                        office.UploadImgNews(data.code, news_img, 'news_img', 'radionews.php');
                    }
                    if ($('#news_file').val()) {
                        //UploadFileNews
                        //office.UploadFileNews($('#newsid').val(),news_file,'news_file','radionews.php');
                        office.UploadFileNews(data.code, news_file, 'news_file', 'radionews.php');
                    }
                } else {
                    var link = 'radionews.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.CloneNews = function () {
    var exDat = {
        table: "news_mapping",
        data: {
            news_office: $("#news_office").val(),
            news_type: $("#news_type").val(),
            news_title_th: $("#news_title_th").val(),
            news_menu: "news",
            news_datetime: $("input[name=news_datetime_submit]").val(),
            news_main: $('input[type=radio][name=news_main]:checked').val(),
            news_home: $('input[type=radio][name=news_home]:checked').val(),
            news_timeline: $('input[type=radio][name=news_timeline]:checked').val(),
            news_starttime: $("input[name=news_starttime_submit]").val(),
            news_endtime: $("input[name=news_endtime_submit]").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            version: 2
        },
        data_content: {
            news_desc_th: $("#news_desc_th").summernote('code'),
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

                if ($('#news_cover').val() || $('#news_file').val()) {
                    if ($('#news_cover').val()) {
                        office.UploadImgNews($('#newsid').val(), news_cover, 'news_cover');
                    }
                    if ($('#news_file').val()) {
                        office.UploadFileNews($('#newsid').val(), news_file, 'news_file');
                    }
                } else {
                    var link = 'news.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgNews = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgNews&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgNews');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.UploadFileNews = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadFileNews&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgNews');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


office.CreateRadioChart = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "radiochart",
        // where : {id : $("#dataid").val(),	},
        data: {

            rac_name_th: $("#rac_name_th").val(),
            rac_name_en: $("#rac_name_en").val(),
            rac_category: $("#rac_category").val(),
            rac_day: $("#rac_day").val(),
            rac_time: $("#rac_time").val(),
            rac_link: $("#rac_link").val(),
            rac_datetime: $("input[name=rac_datetime_submit]").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),

            // version: 2 
        },
        data_content: {
            rac_desc_th: $("#rac_desc_th").summernote('code'),
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

                if ($('#rac_img').val() || $('#rac_file').val()) {
                    if ($('#rac_img').val()) {

                        office.UploadImgRadioChart(data.code, rac_img, 'rac_img', 'radio_chart.php');
                    }
                    if ($('#rac_file').val()) {
                        //UploadFileNews
                        //office.UploadFileNews($('#newsid').val(),news_file,'news_file','radionews.php');
                        office.UploadFileRadioChart(data.code, rac_file, 'rac_file', 'radio_chart.php');
                    }
                } else {
                    var link = 'radio_chart.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgRadioChart = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgRadioChart&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadRadioChart');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


office.UploadFileRadioChart = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadFileRadioChart&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgNews');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


office.EditRadioChart = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "radiochart",
        where: { rac_id: $("#newsid").val(), },
        data: {

            rac_name_th: $("#rac_name_th").val(),
            rac_name_en: $("#rac_name_en").val(),
            rac_category: $("#rac_category").val(),
            rac_day: $("#rac_day").val(),
            rac_time: $("#rac_time").val(),
            rac_link: $("#rac_link").val(),
            rac_datetime: $("input[name=rac_datetime_submit]").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_date: $("#update_date").val(),

            // version: 2 
        },
        data_content: {
            rac_desc_th: $("#rac_desc_th").summernote('code'),
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#rac_img').val() || $('#rac_file').val()) {
                    if ($('#rac_img').val()) {
                        office.UploadImgRadioChart($("#newsid").val(), rac_img, 'rac_img', 'radio_chart.php');
                    }
                    if ($('#rac_file').val()) {
                        office.UploadFileRadioChart($('#newsid').val(), rac_file, 'rac_file', 'radio_chart.php');
                    }
                } else {
                    var link = 'radio_chart.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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


office.CheckFormRadioChart = function () {
    var x = 0;

    if ($('#rac_name_th').val() == "") {
        $('#rac_name_th').addClass('danger_form');
        $('#rac_name_th').focus();
        setTimeout(function () { $('#rac_name_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

office.CreateLiveType = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "broadcastlive_type",
        // where : {id : $("#dataid").val(),	},
        data: {
            live_type_title_th: $("#live_type_title_th").val(),
            live_type_title_en: $("#live_type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),

            // version: 2 
        },
        data_content: {
            live_type_des: $("#live_type_des").summernote('code'),
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

                if ($('#live_type_picname').val()) {
                    if ($('#live_type_picname').val()) {

                        office.UploadImgLiveType(data.code, live_type_picname, 'live_type_picname', 'typeLive.php');
                    }

                } else {
                    var link = 'typeLive.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgLiveType = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgLiveType&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadRadioChart');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckFormLiveType = function () {
    var x = 0;

    if ($('#live_type_title_th').val() == "") {
        $('#live_type_title_th').addClass('danger_form');
        $('#live_type_title_th').focus();
        setTimeout(function () { $('#live_type_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditLiveType = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "broadcastlive_type",
        where: { id: $("#newsid").val(), },
        data: {

            live_type_title_th: $("#live_type_title_th").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),

            // version: 2 
        },
        data_content: {
            live_type_des: $("#live_type_des").summernote('code'),
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#live_type_picname').val()) {
                    if ($('#live_type_picname').val()) {
                        office.UploadImgLiveType($("#newsid").val(), live_type_picname, 'live_type_picname', 'typeLive.php');
                    }
                } else {
                    var link = 'typeLive.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.CreateLiveTypeSub = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "broadcastlive_type_sub",
        // where : {id : $("#dataid").val(),	},
        data: {
            live_type_id: $("#live_type_id").val(),
            live_typesub_title_th: $("#live_typesub_title_th").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),

            // version: 2 
        },
        data_content: {
            live_typesub_desc: $("#live_typesub_desc").summernote('code'),
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

                if ($('#live_typesub_picname').val()) {
                    if ($('#live_typesub_picname').val()) {

                        office.UploadImgLiveTypeSub(data.code, live_typesub_picname, 'live_typesub_picname', 'liveTypeSub.php');
                    }

                } else {
                    var link = 'liveTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgLiveTypeSub = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgLiveTypeSub&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check Upload');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckFormLiveTypeSub = function () {
    var x = 0;

    if ($('#live_typesub_title_th').val() == "") {
        $('#live_typesub_title_th').addClass('danger_form');
        $('#live_typesub_title_th').focus();
        setTimeout(function () { $('#live_typesub_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditLiveTypeSub = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "broadcastlive_type_sub",
        where: { id: $("#newsid").val(), },
        data: {
            live_type_id: $("#live_type_id").val(),
            live_typesub_title_th: $("#live_typesub_title_th").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),

            // version: 2 
        },
        data_content: {
            live_typesub_desc: $("#live_typesub_desc").summernote('code'),
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#live_typesub_picname').val()) {
                    if ($('#live_typesub_picname').val()) {
                        office.UploadImgLiveTypeSub($("#newsid").val(), live_typesub_picname, 'live_typesub_picname', 'liveTypeSub.php');
                    }
                } else {
                    var link = 'liveTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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


///////////////---------LIVE-----------/////////////////////////////////////////////

office.CreateLive = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "broadcastlive",
        // where : {id : $("#dataid").val(),	},
        data: {
            live_type_id: $("#live_type_id").val(),
            live_type_sub_id: $("#live_type_sub_id").val(),
            live_title_th: $("#live_title_th").val(),
            live_url: $("#live_url").val(),
            live_url_mobile: $("#live_url_mobile").val(),
            orderby: $("#orderby").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            // version: 2 
        },
        data_content: {
            live_content_th: $("#live_content_th").summernote('code'),

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

                if ($('#live_picname').val()) {
                    if ($('#live_picname').val()) {

                        office.UploadImgLive(data.code, live_picname, 'live_picname', 'liveShow.php');
                    }

                } else {
                    var link = 'liveShow.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgLive = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgLive&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check Upload');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckFormLive = function () {
    var x = 0;

    if ($('#live_title_th').val() == "") {
        $('#live_title_th').addClass('danger_form');
        $('#live_title_th').focus();
        setTimeout(function () { $('#live_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditLive = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "broadcastlive",
        where: { id: $("#newsid").val(), },
        data: {
            live_type_id: $("#live_type_id").val(),
            live_type_sub_id: $("#live_type_sub_id").val(),
            live_title_th: $("#live_title_th").val(),
            live_url: $("#live_url").val(),
            live_url_mobile: $("#live_url_mobile").val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            orderby: $("#orderby").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),

            // version: 2 
        },
        data_content: {
            live_content_th: $("#live_content_th").summernote('code'),
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#live_picname').val()) {
                    if ($('#live_picname').val()) {
                        office.UploadImgLive($("#newsid").val(), live_picname, 'live_picname', 'liveShow.php');
                    }
                } else {
                    var link = 'liveShow.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

/////////////------------NEWSTYPE-------------------///////////////
office.CreateNewsType = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "news_type",
        // where : {id : $("#dataid").val(),	},
        data: {
            news_type_title_th: $("#news_type_title_th").val(),
            news_type_title_en: $("#news_type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),

            create_by: $("#create_by").val(),
            update_by: $("#create_by").val(),
            // version: 2 
        },
        data_content: {
            //live_type_des : $("#live_type_des").summernote('code'),
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

                if ($('#news_type_picname').val()) {
                    if ($('#news_type_picname').val()) {

                        office.UploadImgNewsType(data.code, news_type_picname, 'news_type_picname', 'newsType.php');
                    }

                } else {
                    var link = 'newsType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgNewsType = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgNewsType&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadRadioChart');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckFormNewsType = function () {
    var x = 0;

    if ($('#news_type_title_th').val() == "") {
        $('#news_type_title_th').addClass('danger_form');
        $('#news_type_title_th').focus();
        setTimeout(function () { $('#news_type_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditNewsType = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "news_type",
        where: { id: $("#newsid").val(), },
        data: {

            news_type_title_th: $("#news_type_title_th").val(),
            news_type_title_en: $("#news_type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),

            // version: 2 
        }

    };



    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#news_type_picname').val()) {
                    if ($('#news_type_picname').val()) {
                        office.UploadImgNewsType($("#newsid").val(), news_type_picname, 'news_type_picname', 'newsType.php');
                    }
                } else {
                    var link = 'newsType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

/////////////////////////------------NewsTypeSub/////////////

office.CreateNewsTypeSub = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "news_type_sub",
        data: {
            news_type_id: $("#news_type_id").val(),
            news_typesub_title_th: $("#news_typesub_title_th").val(),
            news_typesub_title_en: $("#news_typesub_title_th").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            orderby: $("#orderby").val(),
            create_by: $("#create_by").val(),
            update_by: $("#update_by").val(),
        },
        data_content: {
        }

    };
    //console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#news_typesub_picname').val()) {
                    if ($('#news_typesub_picname').val()) {

                        office.UploadImgNewsTypeSub(data.code, news_typesub_picname, 'news_typesub_picname', 'newsTypeSub.php');
                    }

                } else {
                    var link = 'newsTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgNewsTypeSub = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgNewsTypeSub&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check Upload');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckFormNewsTypeSub = function () {
    var x = 0;

    if ($('#news_typesub_title_th').val() == "") {
        $('#news_typesub_title_th').addClass('danger_form');
        $('#news_typesub_title_th').focus();
        setTimeout(function () { $('#news_typesub_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditNewsTypeSub = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "news_type_sub",
        where: { id: dataid, },
        data: {
            news_type_id: $("#news_type_id").val(),
            news_typesub_title_th: $("#news_typesub_title_th").val(),
            news_typesub_title_en: $("#news_typesub_title_th").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            orderby: $("#orderby").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#news_typesub_picname').val()) {
                    if ($('#news_typesub_picname').val()) {
                        office.UploadImgNewsTypeSub($("#newsid").val(), news_typesub_picname, 'news_typesub_picname', 'newsTypeSub.php');
                    }
                } else {
                    var link = 'newsTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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


//################################################################//
//----------------------------------------------------------------//
//------------------------- Create News --------------------------//
office.CreateNoti = function (newsid) {
    var exDat = {
        table: "news_noti",
        news_id: newsid,


    };
    //console.log(exDat);

    $.ajax({
        url: office.url + '?mode=CreateNewsNoti',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {



            } else {
                // duck.ModalWShow();
            }
        },
        error: function (data) {
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CreateNewsShow = function () {
    $("#modal_confirm").modal('hide');

    var tagAll = $('.tagsearch').tagging("getTags");

    var tagsearch = '';
    $.each(tagAll, function (i, result) {
        tagsearch = tagsearch + '' + tagAll[i] + ', ';
    });
    tagsearch = tagsearch.substring(0, tagsearch.length - 2);

    var exDat = {
        table: "news",
        data: {
            news_type_id: $("#news_type_id").val(),
            news_type_sub_id: $("#news_type_sub_id").val(),
            news_title_th: $("#news_title_th").val(),
            news_title_en: $("#news_title_en").val(),
            tagsearch: tagsearch,
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            display_level: $('input[type=radio][name=display_level]:checked').val(),
            display_header: $('input[type=radio][name=display_header]:checked').val(),
            // display_status: $('input[type=radio][name=display_status]:checked').val(),
            // startdisp_date: $("input[name=startdisp_date_submit]").val(),
            // enddisp_date: $("input[name=enddisp_date_submit]").val(), 
            public_date: $("input[name=public_date_submit]").val() + " " + $("#time").val(),


            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val()
        },
        data_content: {
            news_intro_th: $("#news_intro_th").summernote('code'),
            news_intro_en: $("#news_intro_en").summernote('code'),
            news_content_th: $("#news_content_th").summernote('code'),
            news_content_en: $("#news_content_en").summernote('code'),
        }
    };
    // console.log(exDat);
    $.ajax({
        //url:office.url+'?mode=AddDataContents&source_id='+source_id+'&newsid='+newsid,
        url: office.url + '?mode=AddDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                office.CreateNoti(data.code);
                var link = 'newsShow_edit.php?data_id=' + data.code;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
                // alert('สำเร็จ')

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

office.CreateNewsGallery = function () {


    $('#model_newsgallery').modal('hide')
    //news_id news_img_title_th news_img_title_en  news_img_picname typegallery orderbygallery statusgallery

    var news_id = $("#news_id").val()
    var exDat = {
        table: "news_image",
        data: {
            news_id: news_id,
            news_img_title_th: $("#news_img_title_th").val(),
            news_img_title_en: $("#news_img_title_en").val(),
            news_img_picname: '',
            display_cover: $("input[name=display_cover]:checked").val(),
            display_header: $("input[name=display_header]:checked").val(),
            orderby: $('#orderbygallery').val(),
            enable: $("input[name=enablegallery]:checked").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };
    console.log(exDat);


    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'newsShow_edit.php?data_id=' + news_id;
                if ($("#news_img_picname").val()) {
                    office.UploadImgGall("news_image", data.code, "news_img_picname", news_id, link)

                } else {

                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.CreateNewsGalleryssss = function () {


    $('#model_newsgallery').modal('hide')
    //news_id news_img_title_th news_img_title_en  news_img_picname typegallery orderbygallery statusgallery

    var news_id = $("#news_id").val()
    var exDat = {
        table: "news_image",
        data: {
            news_id: news_id,
            news_img_title_th: $("#news_img_title_th").val(),
            news_img_title_en: $("#news_img_title_en").val(),
            news_img_picname: '',
            display_cover: $("input[name=display_cover]:checked").val(),
            display_header: $("input[name=display_header]:checked").val(),
            orderby: $('#orderbygallery').val(),
            enable: $("input[name=enablegallery]:checked").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };
    console.log(exDat);


    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'newsShow_edit.php?data_id=' + news_id;
                if ($("#news_img_picname").val()) {
                    office.UploadImgGall("news_image", data.code, "news_img_picname", news_id, link)

                } else {

                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditNewsGallery = function (num, dataid) {

    $('#myModalEditgallery' + num).modal('hide')
    var newsid = $("#news_id").val()
    var dataid = dataid
    var exDat = {
        table: "news_image",
        where: {
            id: dataid,
        },
        data: {
            news_img_title_th: $("#news_img_title_th" + num).val(),
            // news_img_title_en: $("#news_img_title_en" + num).val(),
            orderby: $("#orderbygallery" + num).val(),
            display_cover: $("input[name=display_cover" + num + "]:checked").val(), //display_cover display_header
            display_header: $("input[name=display_header" + num + "]:checked").val(),
            enable: $("input[name=enablegallery]:checked").val(),
        },
    };
    console.log(exDat)

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($("#news_img_picname" + num).val()) {
                    office.UploadImgGall("news_image", dataid, "news_img_picname" + num, newsid)
                    // alert('ผ่าน')
                } else {
                    //var link =  'newsShow_edit.php?newid='+newsid ;
                    var link = 'newsShow_edit.php?data_id=' + newsid;

                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.CheckCreateNewsGalleryMore = function () {

    var total_file = document.getElementById("news_img_picname_more").files.length;
    console.log(total_file);

    for (var i = 0; i < total_file; i++) {
        office.CreateNewsGalleryMore(i);


        /*
        //$('#image_preview').append("<img src='"+URL.createObjectURL(event.target.files[i])+"'><br>");
        var file_data = $('#news_img_picname_more').prop('files')[i];
        var form_data = new FormData();
        form_data.append('file', file_data); 
        console.log(form_data);*/

    }



    var link = 'newsShow_edit.php?data_id=' + $("#news_id").val();
    duck.ModalSShow();
    setTimeout(duck.ModalSHide, 3000);
    setTimeout(duck.OpenPage, 3200, link, '_self');

};

office.UploadImgGallMore = function (source_id, no, newsid, link) {

    var file_data = $('#news_img_picname_more').prop('files')[no];
    var form_data = new FormData();
    form_data.append('file', file_data);
    var table = 'news_image';


    console.log(form_data);


    $.ajax({
        url: office.url + '?mode=UploadFileGalleries&source_id=' + source_id + '&table_name=' + table + '&news_id=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);


        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดรูปภาพ');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};

office.CreateNewsGalleryMore = function (no) {

    $('#model_newsgallerymore').modal('hide');
    var news_id = $("#news_id").val();
    var exDat = {
        table: "news_image",
        data: {
            news_id: news_id,
            orderby: '100',
            display_cover: 'N',
            display_header: 'N',
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };

    console.log(exDat);
    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'newsShow_edit.php?data_id=' + news_id;
                office.UploadImgGallMore(data.code, no, news_id, link);
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

office.UploadImgGall = function (table, source_id, file_id, newsid, link) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    // console.log(table);
    // console.log(source_id);
    // console.log(file_id);
    console.log(form_data);
    $.ajax({
        url: office.url + '?mode=UploadFileGalleries&source_id=' + source_id + '&table_name=' + table + '&news_id=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {

                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดรูปภาพ');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};

office.CheckFormNewsShow = function () {
    var x = 0;

    if ($('#news_type_id').val() == "") {
        $('#news_type_id').addClass('danger_form');
        $('#news_type_id').focus();
        setTimeout(function () { $('#news_type_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#news_type_sub_id').val() == "") {
        $('#news_type_sub_id').addClass('danger_form');
        $('#news_type_sub_id').focus();
        setTimeout(function () { $('#news_type_sub_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#news_title_th').val() == "") {
        $('#news_title_th').addClass('danger_form');
        $('#news_title_th').focus();
        setTimeout(function () { $('#news_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditNewsShow = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var tagAll = $('.tagsearch').tagging("getTags");

    var tagsearch = '';
    $.each(tagAll, function (i, result) {
        tagsearch = tagsearch + '' + tagAll[i] + ', ';
    });
    tagsearch = tagsearch.substring(0, tagsearch.length - 2);

    var exDat = {
        table: "news",
        where: { id: $("#newsid").val(), },
        data: {
            news_type_id: $("#news_type_id").val(),
            news_type_sub_id: $("#news_type_sub_id").val(),
            news_title_th: $("#news_title_th").val(),
            news_title_en: $("#news_title_en").val(),
            tagsearch: tagsearch,
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            display_level: $('input[type=radio][name=display_level]:checked').val(),
            display_header: $('input[type=radio][name=display_headerx]:checked').val(),
            // display_status: $('input[type=radio][name=display_status]:checked').val(),
            // startdisp_date: $("input[name=startdisp_date_submit]").val(),
            // enddisp_date: $("input[name=enddisp_date_submit]").val(),

            public_date: $("input[name=public_date_submit]").val() + " " + $("#time").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
            // version: 2 
        },
        data_content: {
            news_intro_th: $("#news_intro_th").summernote('code'),
            news_intro_en: $("#news_intro_en").summernote('code'),
            news_content_th: $("#news_content_th").summernote('code'),
            news_content_en: $("#news_content_en").summernote('code'),
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                //var link =  'newsShow_edit.php?data_id='+data.code;

                var link = 'newsShow.php';
                duck.ModalSShow();
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
    })
};


//--------------------------    News file  ----------------------------//
//------------------------- Create News file  -------------------------//
office.CreateNewsFile = function () {


    $('#model_newsfile').modal('hide')

    var newsid = $("#newid").val()
    var exDat = {
        table: "news_file",
        data: {
            news_id: $("#newid").val(),
            filetitle: $("#filetitlename").val(),
            enable: $("input[name=statusfile]:checked").val(),
            orderby: $("#orderbyfile").val(),
        },
    };
    console.log(exDat)
    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($("#filename").val()) {
                    office.UploadNewsFile("news_file", data.code, "filename", newsid)
                    // alert('ผ่าน')
                } else {
                    var link = 'news_edit.php?newid=' + newsid;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditNewsFile = function (num, fileid) {

    $('#myModalEditFile' + num).modal('hide')

    var newsid = $("#newid").val()
    var videoid = videoid
    var exDat = {
        table: "news_file",
        where: {
            id: fileid,
        },
        data: {
            filetitle: $("#filetitlename" + num).val(),
            enable: $("input[name=enable_file" + num + "]:checked").val(),
            orderby: $("#orderbyfile" + num).val(),
        },
    };
    console.log(exDat)
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                if ($("#filename" + num).val()) {
                    office.UploadNewsFile("news_file", fileid, "filename" + num, newsid)
                } else {/*
                    var link = 'news_edit?newid=' + newsid;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');*/
                }
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

office.UploadNewsFile = function (table, source_id, file_id, newsid) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    console.log(table);
    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadFile&source_id=' + source_id + '&table_name=' + table + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);


            if (img_state.state == '1') {
                var link = 'news_edit.php?newid=' + newsid;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = 'news_edit.php?newid=' + newsid;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดเอกสาร');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};

//-------------------------  End NEWS FILE  -------------------------//
//------------------------- CreateNewsVideo -------------------------//
office.CreateNewsVideo = function () {


    $('#model_newsvideos').modal('hide')
    //news_id news_img_title_th news_img_title_en  news_img_picname typegallery orderbygallery statusgallery

    var news_id = $("#news_id").val()
    var exDat = {
        table: "news_vdo",
        data: {
            news_id: news_id,
            news_vdo_title_th: $("#news_vdo_title_th").val(),
            news_vdo_title_en: $("#news_vdo_title_en").val(),
            news_vdo_name: '',
            news_vdo_link: $("#news_vdo_link").val(),
            display_cover: $("input[name=display_cover]:checked").val(),
            orderby: $('#orderbygallery').val(),
            enable: $("input[name=enablevdo]:checked").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };
    console.log(exDat);


    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'newsShow_edit.php?data_id=' + news_id;
                if ($("#news_vdo_name").val()) {
                    office.UploadVideo("news_vdo", data.code, "news_vdo_name", news_id, link)

                } else {

                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadVideo = function (table, source_id, file_id, newsid, link) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    console.log(table);
    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadFileVideo&source_id=' + source_id + '&table_name=' + table + '&news_id=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {

                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดรูปภาพ');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};

office.EditNewsVideo = function (num, dataid) {

    $('#myModalEditVideo' + num).modal('hide')


    var dataid = dataid
    var newsid = $("#newsid").val()
    var exDat = {
        table: "news_vdo",
        where: {
            id: dataid,
        },
        data: {
            news_id: $("#news_id").val(),
            news_vdo_title_th: $("#news_vdo_title_th" + num).val(),
            news_vdo_link: $("#news_vdo_link" + num).val(),
            orderby: $("#orderby" + num).val(),
            enable: $("input[name=enablevdo" + num + "]:checked").val(),
        },
    };
    console.log(exDat)
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'newsShow_edit.php?data_id=' + newsid;
                duck.ModalSShow();
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
//---------------------- End CreateNewsVideo -------------------------//
//------------------------- Create NewsFile -------------------------///
office.CreateNewsShowFile = function () {
    $('#model_newsfile').modal('hide')
    var news_id = $("#news_id").val()
    var exDat = {
        table: "news_file",
        data: {
            //news_id : news_id ,
            news_id: $("#news_id").val(),
            news_file_title_th: $("#news_file_title_th").val(),
            news_file_title_en: $("#news_file_title_en").val(),
            enable: $("input[name=enable_file]:checked").val(),
            orderby: $("#orderbyfile").val(),
        },
    };
    console.log(exDat)
    $.ajax({
        url: contents.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($("#news_filename").val()) {
                    office.UploadNewsShowFile("news_file", data.code, "news_filename", news_id)
                    // alert('ผ่าน')
                } else {
                    var link = 'newsShow_edit.php?data_id=' + news_id;
                    //var link =  'newsShow_edit.php?data_id='+newsid ;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditNewsShowFile = function (num, dataid) {

    $('#myModalEditFile' + num).modal('hide')
    var dataid = dataid
    var newsid = $("#newsid").val()
    var exDat = {
        table: "news_file",
        where: {
            id: dataid,
        },
        data: {
            news_file_title_th: $("#news_file_title_th" + num).val(),
            enable: $("input[name=enable_file" + num + "]:checked").val(),
            orderby: $("#orderbyfile" + num).val(),

        },
    };

    // var news_id = $("#news_id").val()
    // var exDat = {
    // 	table : "news_file" ,
    // 	data  : {
    // 		//news_id : news_id ,
    // 		news_id : $("#news_id").val() ,
    // 		news_file_title_th : $("#news_file_title_th").val() ,
    // 		news_file_title_en : $("#news_file_title_en").val() ,
    // 		enable : $("input[name=enable]:checked").val() ,
    // 		orderby : $("#orderbyfile").val() ,
    // 	} ,
    // };

    console.log(exDat)

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($("#news_filename" + num).val()) {
                    office.UploadNewsShowFile("news_file", dataid, "news_filename" + num, newsid)
                    // alert('ผ่าน')
                } else {
                    var link = 'newsShow_edit.php?data_id=' + newsid;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadNewsShowFile = function (table, source_id, file_id, newsid) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    console.log(table);
    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadNewsFile&source_id=' + source_id + '&table_name=' + table + '&news_id=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);


            if (img_state.state == '1') {
                var link = 'newsShow_edit.php?data_id=' + newsid;
                // var link =  'newsShow.php' ;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = 'newsShow_edit.php?data_id=' + newsid;
                //  var link =  'newsShow.php' ;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดเอกสาร');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};
//---------------------------- End NewsFile -------------------------///

//-------------------------- Create NewsAudio -----------------------///
office.CreateNewsShowAudio = function () {
    $('#model_newsaudio').modal('hide')
    var news_id = $("#news_id").val()
    var exDat = {
        table: "news_audio",
        data: {
            //news_id : news_id ,
            news_id: $("#news_id").val(),
            news_audio_title_th: $("#news_audio_title_th").val(),
            news_audio_title_en: $("#news_audio_title_en").val(),
            enable: $("input[name=enable_audio]:checked").val(),
            orderby: $("#orderbyaudio").val(),
        },
    };
    console.log(exDat)
    $.ajax({
        url: contents.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($("#news_audio_name").val()) {
                    office.UploadNewsShowAudio("news_audio", data.code, "news_audio_name", news_id)
                    // alert('ผ่าน')
                } else {
                    var link = 'newsShow_edit.php?data_id=' + news_id;
                    //var link =  'newsShow_edit.php?data_id='+newsid ;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditNewsShowAudio = function (num, dataid) {

    $('#myModalEditAudio' + num).modal('hide')
    var dataid = dataid
    var newsid = $("#newsid").val()
    var exDat = {
        table: "news_audio",
        where: {
            id: dataid,
        },
        data: {
            news_audio_title_th: $("#news_audio_title_th" + num).val(),
            enable: $("input[name=enable_audio" + num + "]:checked").val(),
            orderby: $("#orderbyaudio" + num).val(),
        }
    };
    //console.log(exDat)
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($("#news_audio_name" + num).val()) {
                    office.UploadNewsShowFile("news_audio", dataid, "news_audio_name" + num, newsid)
                    // alert('ผ่าน')
                } else {
                    var link = 'newsShow_edit.php?data_id=' + newsid;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadNewsShowAudio = function (table, source_id, file_id, newsid) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    console.log(table);
    console.log(source_id);
    console.log(file_id);

    $.ajax({
        url: office.url + '?mode=UploadNewsAudio&source_id=' + source_id + '&table_name=' + table + '&news_id=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);


            if (img_state.state == '1') {
                var link = 'newsShow_edit.php?data_id=' + newsid;
                // var link =  'newsShow.php' ;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = 'newsShow_edit.php?data_id=' + newsid;
                //  var link =  'newsShow.php' ;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }
        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดเอกสาร');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};
//---------------------------- End NewsAudio ------------------------///

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////              ProgPrev             ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

office.CreateProgprevTypeSub = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "news_type_sub",
        // where : {id : $("#dataid").val(),	},
        data: {
            news_type_id: $("#news_type_id").val(),
            news_typesub_title_th: $("#news_typesub_title_th").val(),
            news_typesub_title_en: $("#news_typesub_title_en").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            orderby: $("#orderby").val(),
            create_by: $("#create_by").val(),
            update_by: $("#create_by").val(),
            // version: 2 
        },
        data_content: {
            //live_typesub_desc : $("#live_typesub_desc").summernote('code'),
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

                if ($('#news_typesub_picname').val()) {
                    if ($('#news_typesub_picname').val()) {

                        office.UploadImgNewsTypeSub(data.code, news_typesub_picname, 'news_typesub_picname', 'newsTypeSub.php');
                    }

                } else {
                    var link = 'newsTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgProgprevTypeSub = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgNewsTypeSub&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check Upload');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckFormProgprevTypeSub = function () {
    var x = 0;

    if ($('#news_typesub_title_th').val() == "") {
        $('#news_typesub_title_th').addClass('danger_form');
        $('#news_typesub_title_th').focus();
        setTimeout(function () { $('#news_typesub_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditProgprevTypeSub = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "news_type_sub",
        where: { id: dataid, },
        data: {
            news_type_id: $("#news_type_id").val(),
            news_typesub_title_th: $("#news_typesub_title_th").val(),
            news_typesub_title_en: $("#news_typesub_title_en").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),

            orderby: $("#orderby").val(),
            update_by: $("#update_by").val(),
            // version: 2 
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#news_typesub_picname').val()) {
                    if ($('#news_typesub_picname').val()) {
                        office.UploadImgNewsTypeSub($("#newsid").val(), news_typesub_picname, 'news_typesub_picname', 'newsTypeSub.php');
                    }
                } else {
                    var link = 'newsTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditProgprevType = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "news_type",
        where: { id: $("#newsid").val(), },
        data: {

            news_type_title_th: $("#news_type_title_th").val(),
            news_type_title_en: $("#news_type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),

            // version: 2 
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#news_type_picname').val()) {
                    if ($('#news_type_picname').val()) {
                        office.UploadImgNewsType($("#newsid").val(), news_type_picname, 'news_type_picname', 'newsType.php');
                    }
                } else {
                    var link = 'newsType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.CheckFormProgPrev = function () {
    var x = 0;

    if ($('#programtype_id').val() == "") {
        $('#programtype_id').addClass('danger_form');
        $('#programtype_id').focus();
        setTimeout(function () { $('#programtype_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#title_th').val() == "") {
        $('#title_th').addClass('danger_form');
        $('#title_th').focus();
        setTimeout(function () { $('#title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#programtype_id').val() == "") {
        $('#programtype_id').addClass('danger_form');
        $('#programtype_id').focus();
        setTimeout(function () { $('#programtype_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#prog_id').val() == "") {
        $('#prog_id').addClass('danger_form');
        $('#prog_id').focus();
        setTimeout(function () { $('#prog_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if ($('#progprev_type_id').val() == "") {
        $('#progprev_type_id').addClass('danger_form');
        $('#progprev_type_id').focus();
        setTimeout(function () { $('#progprev_type_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#progprev_type_sub_id').val() == "") {
        $('#progprev_type_sub_id').addClass('danger_form');
        $('#progprev_type_sub_id').focus();
        setTimeout(function () { $('#progprev_type_sub_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#progprev_title_th').val() == "") {
        $('#progprev_title_th').addClass('danger_form');
        $('#progprev_title_th').focus();
        setTimeout(function () { $('#progprev_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }


    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateProgPrev = function () {
    $("#modal_confirm").modal('hide');

    // console.log( $('.tagsearch').tagging( "getTags" )); 
    var tagAll = $('.tagsearch').tagging("getTags");

    var tagsearch = '';
    $.each(tagAll, function (i, result) {
        tagsearch = tagsearch + '' + tagAll[i] + ', ';
    });

    tagsearch = tagsearch.substring(0, tagsearch.length - 2);
    // 
    var exDat = {
        table: "progprev",
        data: {
            programtype_id: $("#programtype_id").val(),
            programsch_id: $("#prog_id").val(),
            progprev_type_id: $("#progprev_type_id").val(),
            progprev_type_sub_id: $("#progprev_type_sub_id").val(),
            progprev_title_th: $("#progprev_title_th").val(),
            list_name: $("#list_name").val(),
            prolist_name: $("#prolist_name").val(),
            tagsearch: tagsearch,
            display_level: $('input[type=radio][name=display_level]:checked').val(),
            download: $('input[type=radio][name=download]:checked').val(),
            public_date: $("input[name=public_date_submit]").val(),
            startdate: $("input[name=public_date_submit]").val(),
            // enddate: $("input[name=enddate_submit]").val(), 
            display_header: $('input[type=radio][name=display_header]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            //   enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),
        },
        data_content: {
            progprev_intro_th: $("#progprev_intro_th").summernote('code'),
            progprev_content_th: $("#progprev_content_th").summernote('code'),
        }
    };
    // console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            // console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'progprevShow_edit.php?data_id=' + data.code;
                duck.ModalSShow();
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

office.EditProgPrev = function (dataid) {
    $("#modal_confirm").modal('hide');

    var tagAll = $('.tagsearch').tagging("getTags");

    var tagsearch = '';
    $.each(tagAll, function (i, result) {
        tagsearch = tagsearch + '' + tagAll[i] + ', ';
    });

    tagsearch = tagsearch.substring(0, tagsearch.length - 2);

    var exDat = {
        table: "progprev",
        where: {
            id: dataid
        },
        data: {
            programtype_id: $("#programtype_id").val(),
            programsch_id: $("#prog_id").val(),
            progprev_type_id: $("#progprev_type_id").val(),
            progprev_type_sub_id: $("#progprev_type_sub_id").val(),
            progprev_title_th: $("#progprev_title_th").val(),
            list_name: $("#list_name").val(),
            prolist_name: $("#prolist_name").val(),
            tagsearch: tagsearch,
            display_level: $('input[type=radio][name=display_level]:checked').val(),
            download: $('input[type=radio][name=download]:checked').val(),
            public_date: $("input[name=public_date_submit]").val(),
            startdate: $("input[name=public_date_submit]").val(),
            // enddate: $("input[name=enddate_submit]").val(), 
            display_header: $('input[type=radio][name=display_header]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            //  enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        },
        data_content: {
            progprev_intro_th: $("#progprev_intro_th").summernote('code'),
            progprev_content_th: $("#progprev_content_th").summernote('code'),
        }
    };
    // console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            // console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'progprevShow_edit.php?data_id=' + dataid;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');

            } else {
                duck.ModalWShow();
            }
        },
        error: function (data) {
            console.log('office.EditProgPrev');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.UploadFileProgPrev = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadFileAllProg&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'POST',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 2000);
                setTimeout(duck.OpenPage, 2200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 2000);
                setTimeout(duck.OpenPage, 2200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadFileProgPrev');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.UploadImgProgPrev = function (dataid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    var table = "progprev_image";

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgProgPrev&source_id=' + source_id + '&table_name=' + table + '&dataid=' + dataid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgFlowch');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.LoadProgPrevType = function (v_val, element_id) {

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

office.LoadProgPrevTypeSub = function (v_val, element_id, v_valref) {


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

office.CreateProgPrevImage = function () {
    $('#model_gallery').modal('hide')
    var progprev_id = $("#progprev_id").val()
    var exDat = {
        table: "progprev_image",
        data: {
            progprev_id: progprev_id,
            progprev_img_title_th: $("#img_title_th").val(),
            picname: '',
            display_cover: $("input[name=display_cover]:checked").val(),
            display_header: $("input[name=display_header]:checked").val(),
            orderby: $('#orderbygallery').val(),
            enable: $("input[name=enablegallery]:checked").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };
    console.log(exDat);


    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                if ($("#picname").val()) {
                    office.UploadImgProgprevGall("progprev_image", data.code, "picname", progprev_id, link);
                } else {
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.EditProgprevGallery = function (num, dataid) {

    $('#myModalEditgallery' + num).modal('hide')
    var progprev_id = $("#progprev_id").val()
    var dataid = dataid
    var exDat = {
        table: "progprev_image",
        where: {
            id: dataid,
        },
        data: {
            progprev_img_title_th: $("#img_title_th" + num).val(),
            display_cover: $("input[name=display_cover" + num + "]:checked").val(),
            display_header: $("input[name=display_header" + num + "]:checked").val(),
            orderby: $("#orderbygallery" + num).val(),
            enable: $("input[name=enablegallery" + + num + "]:checked").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        },
    };
    console.log(exDat)
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                if ($("#picname" + num).val()) {
                    office.UploadImgProgprevGall("progprev_image", dataid, "picname" + num, progprev_id, link);
                } else {
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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



office.CheckCreateProgPrevGalleryMore = function () {

    var total_file = document.getElementById("img_picname_more").files.length;
    console.log(total_file);

    for (var i = 0; i < total_file; i++) {
        office.CreateProgPrevGalleryMore(i);
    }

    var link = 'progprevShow_edit.php?data_id=' + $("#progprev_id").val();
    duck.ModalSShow();
    setTimeout(duck.ModalSHide, 3000);
    setTimeout(duck.OpenPage, 3200, link, '_self');
};

office.CreateProgPrevGalleryMore = function (no) {

    $('#model_gallerymore').modal('hide');

    var progprev_id = $("#progprev_id").val();
    var exDat = {
        table: "progprev_image",
        data: {
            progprev_id: progprev_id,
            orderby: '100',
            display_cover: 'N',
            display_header: 'N',
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };

    console.log(exDat);
    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                office.UploadImgProgPrevGallMore(data.code, no, progprev_id, link);
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

office.UploadImgProgPrevGallMore = function (source_id, no, dataid, link) {

    var file_data = $('#img_picname_more').prop('files')[no];
    var form_data = new FormData();
    form_data.append('file', file_data);
    var table = 'progprev_image';

    console.log(form_data);
    $.ajax({
        url: office.url + '?mode=UploadProgprevGalleries&source_id=' + source_id + '&table_name=' + table + '&dataid=' + dataid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);


        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดรูปภาพ');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};


//------------------------- CreateProgPrevVideo -------------------------//
office.CreateProgPrevVideo = function () {

    $('#model_videos').modal('hide')

    var progprev_id = $("#progprev_id").val()
    var exDat = {
        table: "progprev_vdo",
        data: {
            progprev_id: progprev_id,
            progprev_vdo_title_th: $("#vdo_title_th").val(),
            progprev_vdo_name: $("#vdo_title_th").val(),
            progprev_vdo_link: $("#vdo_link").val(),
            display_cover: $("input[name=display_cover]:checked").val(),
            orderby: $('#orderbyvdo').val(),
            enable: $("input[name=enablevdo]:checked").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };
    console.log(exDat);


    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                if ($("#vdo_name").val()) {
                    office.UploadProgPrevVideo("progprev_vdo", data.code, "vdo_name", progprev_id, link);
                } else {
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.UploadProgPrevVideo = function (table, source_id, file_id, dataid, link) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    console.log(table);
    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadProgPrevVideo&source_id=' + source_id + '&table_name=' + table + '&dataid=' + dataid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {

                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดรูปภาพ');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};

office.EditProgPrevVideo = function (num, dataid) {

    $('#myModalEditVideo' + num).modal('hide')


    var dataid = dataid
    var progprev_id = $("#progprev_id").val()
    var exDat = {
        table: "progprev_vdo",
        where: {
            id: dataid,
        },
        data: {
            progprev_vdo_title_th: $("#vdo_title_th" + num).val(),
            progprev_vdo_link: $("#vdo_link" + num).val(),
            orderby: $("#orderbyvdo" + num).val(),
            enable: $("input[name=enablevdo" + num + "]:checked").val(),
        },
    };
    console.log(exDat)
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                duck.ModalSShow();
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

//---------------------- End CreateProgPrevVideo -------------------------//


//------------------------- Create ProgPrevFile -------------------------///
office.CreateProgPrevFile = function () {
    $('#model_file').modal('hide')
    var progprev_id = $("#progprev_id").val()
    var exDat = {
        table: "progprev_file",
        data: {
            progprev_id: $("#progprev_id").val(),
            progprev_file_title_th: $("#file_title_th").val(),
            enable: $("input[name=enable_file]:checked").val(),
            orderby: $("#orderbyfile").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        },
    };
    console.log(exDat)
    $.ajax({
        url: contents.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($("#file_filename").val()) {
                    office.UploadProgPrevFile("progprev_file", data.code, "file_filename", progprev_id);
                } else {
                    var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.EditProgPrevFile = function (num, dataid) {

    $('#myModalEditFile' + num).modal('hide')
    var dataid = dataid
    var progprev_id = $("#progprev_id").val();
    var exDat = {
        table: "progprev_file",
        where: {
            id: dataid,
        },
        data: {
            progprev_file_title_th: $("#file_title_th" + num).val(),
            enable: $("input[name=enable_file" + num + "]:checked").val(),
            orderby: $("#orderbyfile" + num).val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        },
    };

    console.log(exDat)

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($("#pp_filename" + num).val()) {
                    office.UploadProgPrevFile("progprev_file", dataid, "pp_filename" + num, progprev_id)
                } else {
                    var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadProgPrevFile = function (table, source_id, file_id, progprev_id) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    console.log(table);
    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadProgPrevFile&source_id=' + source_id + '&table_name=' + table + '&dataid=' + progprev_id,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {
            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }
        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดเอกสาร');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};
//---------------------------- End ProgPrevFile -------------------------///


//-------------------------- Create NewsAudio -----------------------///
office.CreateProgPrevAudio = function () {
    $('#model_audio').modal('hide')
    var progprev_id = $("#progprev_id").val()
    var exDat = {
        table: "progprev_audio",
        data: {
            progprev_id: $("#progprev_id").val(),
            progprev_audio_title_th: $("#progprev_audio_title_th").val(),
            enable: $("input[name=enable_audio]:checked").val(),
            orderby: $("#orderbyaudio").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        },
    };
    console.log(exDat)
    $.ajax({
        url: contents.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($("#progprev_audio_name").val()) {
                    office.UploadProgPrevAudio("progprev_audio", data.code, "progprev_audio_name", progprev_id)
                } else {
                    var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditProgPrevAudio = function (num, dataid) {

    $('#myModalEditAudio' + num).modal('hide')
    var dataid = dataid
    var progprev_id = $("#progprev_id").val()
    var exDat = {
        table: "progprev_audio",
        where: {
            id: dataid,
        },
        data: {
            progprev_audio_title_th: $("#progprev_audio_title_th" + num).val(),
            enable: $("input[name=enable_audio" + num + "]:checked").val(),
            orderby: $("#orderbyaudio" + num).val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };
    //console.log(exDat)
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($("#progprev_audio_name" + num).val()) {
                    office.UploadProgPrevAudio("progprev_audio", dataid, "progprev_audio_name" + num, progprev_id);
                } else {
                    var link = 'progprevShow_edit.php?data_id=' + progprev_id;
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadProgPrevAudio = function (table, source_id, file_id, newsid) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    console.log(table);
    console.log(source_id);
    console.log(file_id);

    $.ajax({
        url: office.url + '?mode=UploadProgPrevAudio&source_id=' + source_id + '&table_name=' + table + '&dataid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);


            if (img_state.state == '1') {
                var link = 'progprevShow_edit.php?data_id=' + newsid;
                // var link =  'newsShow.php' ;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = 'progprevShow_edit.php?data_id=' + newsid;
                //  var link =  'newsShow.php' ;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }
        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดเอกสาร');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};
//---------------------------- End NewsAudio ------------------------///
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////------------ProgprevTypeSub   ------------------///////////////////

office.CreateProgprevShow = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "news",
        // where : {id : $("#dataid").val(),	},
        data: {
            news_type_id: $("#news_type_id").val(),
            news_type_sub_id: $("#news_type_sub_id").val(),
            news_title_th: $("#news_title_th").val(),
            news_title_en: $("#news_title_en").val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            display_status: $('input[type=radio][name=display_status]:checked').val(),
            startdisp_date: $("input[name=startdisp_date_submit]").val(),
            enddisp_date: $("input[name=enddisp_date_submit]").val(),
            public_date: $("input[name=public_date_submit]").val(),

            // version: 2 
        },
        data_content: {
            news_intro_th: $("#news_intro_th").summernote('code'),
            news_intro_en: $("#news_intro_en").summernote('code'),
            news_content_th: $("#news_content_th").summernote('code'),
            news_content_en: $("#news_content_en").summernote('code'),

        }

    };
    console.log(exDat);

    $.ajax({
        //url:office.url+'?mode=AddDataContents&source_id='+source_id+'&newsid='+newsid,
        url: office.url + '?mode=AddDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'newsShow_edit.php?data_id=' + data.code;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
                // alert('สำเร็จ')

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

office.UploadImgProgprevGall = function (table, source_id, file_id, dataid, link) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    console.log(table);
    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadProgprevGalleries&source_id=' + source_id + '&table_name=' + table + '&dataid=' + dataid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {

                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function () {
            alert('กรุณาตรวจสอบการอัพโหลดรูปภาพ');
            console.log('Please check upload image');
            console.log(data);
        }
    });
};

office.CheckFormProgprevShow = function () {
    var x = 0;

    if ($('#news_title_th').val() == "") {
        $('#news_title_th').addClass('danger_form');
        $('#news_title_th').focus();
        setTimeout(function () { $('#news_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditProgprevShow = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "news",
        where: { id: $("#newsid").val(), },
        data: {
            news_type_id: $("#news_type_id").val(),
            news_type_sub_id: $("#news_type_sub_id").val(),
            news_title_th: $("#news_title_th").val(),
            news_title_en: $("#news_title_en").val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            display_status: $('input[type=radio][name=display_status]:checked').val(),
            startdisp_date: $("input[name=startdisp_date_submit]").val(),
            enddisp_date: $("input[name=enddisp_date_submit]").val(),
            public_date: $("input[name=public_date_submit]").val(),

            // version: 2 
        },
        data_content: {
            news_intro_th: $("#news_intro_th").summernote('code'),
            news_intro_en: $("#news_intro_en").summernote('code'),
            news_content_th: $("#news_content_th").summernote('code'),
            news_content_en: $("#news_content_en").summernote('code'),
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                //var link =  'newsShow_edit.php?data_id='+data.code;

                var link = 'newsShow.php';
                duck.ModalSShow();
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
    })
};

office.CreateProgprevType = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "news_type",
        // where : {id : $("#dataid").val(),	},
        data: {
            news_type_title_th: $("#news_type_title_th").val(),
            news_type_title_en: $("#news_type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),

            create_by: $("#create_by").val(),
            update_by: $("#create_by").val(),
            // version: 2 
        },
        data_content: {
            //live_type_des : $("#live_type_des").summernote('code'),
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

                if ($('#news_type_picname').val()) {
                    if ($('#news_type_picname').val()) {

                        office.UploadImgNewsType(data.code, news_type_picname, 'news_type_picname', 'newsType.php');
                    }

                } else {
                    var link = 'newsType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgProgprevType = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgNewsType&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadRadioChart');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.LoadProgDetail = function (dataid) {

    var exDat = {
        table: "programsch",
        where: {
            id: dataid
        }
    };
    $.ajax({
        url: contents.url + '?mode=LoadOneRow',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            $("#progprev_title_th").val(data.title_th);
            $("#list_name").val(data.list_name);
            $("#prolist_name").val(data.prolist_name);
            // $("#tagsearch").val( data.tagsearch ); 
            $("#progprev_intro_th").summernote("code", data.desc_th);
            $("#progprev_content_th").summernote("code", data.detail_th);



            $("#program_name_th").val(data.title_th);
            $("#detail_th").summernote("code", data.detail_th);

            $("#progrec_title_th").val(data.title_th);


        },
        error: function (data) {
            console.log(data);
            console.log('check LoadProgDetail');
            duck.NotiDanger();
        }
    });


};



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////---------- earth-------------///////////////////////////////

office.CheckFormProgPrevType = function () {
    var x = 0;

    if ($('#type_title_th').val() == "") {
        $('#type_title_th').addClass('danger_form');
        $('#type_title_th').focus();
        setTimeout(function () { $('#type_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateProgPrevTypes = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "progprevtype",
        data: {
            title_th: $("#type_title_th").val(),
            title_en: $("#type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
        }
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#type_picname').val()) {
                    if ($('#type_picname').val()) {

                        office.UploadImgProgPrevTypes(data.code, type_picname, 'type_picname', 'progprevType.php');
                    }

                } else {
                    var link = 'progprevType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditProgTypeTypes = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "progprevtype",
        where: { id: $("#dataid").val(), },
        data: {
            title_th: $("#type_title_th").val(),
            title_en: $("#type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        },


    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#type_picname').val()) {
                    if ($('#type_picname').val()) {

                        office.UploadImgProgPrevTypes($("#dataid").val(), type_picname, 'type_picname', 'progprevType.php');
                    }

                } else {
                    var link = 'progprevType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgProgPrevTypes = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgProgPrevTypes&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check Upload');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


office.CheckFormProgTypeSub = function () {
    var x = 0;

    if ($('#title_th').val() == "") {
        $('#title_th').addClass('danger_form');
        $('#title_th').focus();
        setTimeout(function () { $('#title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateProgPrevTypeSub = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "progprevtypesub",
        data: {
            progprevtype_id: $("#progprevtype_id").val(),
            title_th: $("#title_th").val(),
            title_en: $("#title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        },
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#picname').val()) {
                    if ($('#picname').val()) {
                        office.UploadImgProgPrevTypeSub(data.code, picname, 'picname', 'progprevTypeSub.php');
                    }
                } else {
                    var link = 'progprevTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.EditProgTypeTypeSub = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "progprevtypesub",
        where: { id: $("#dataid").val(), },
        data: {
            progprevtype_id: $("#progprevtype_id").val(),
            title_th: $("#title_th").val(),
            title_en: $("#title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        }
    };
    //console.log(exDat);
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#picname').val()) {
                    if ($('#picname').val()) {
                        office.UploadImgProgPrevTypeSub($("#dataid").val(), picname, 'picname', 'progprevTypeSub.php');
                    }
                } else {
                    var link = 'progprevTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgProgPrevTypeSub = function (newsid, source_id, file_id, linkpage) {
    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgProgPrevTypeSub&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {
            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }
        },
        error: function (data) {
            console.log('Please check UploadImgProgPrevTypeSub');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////          ProgRec         ////////////////////////////////////////////

office.CheckFormRecType = function () {
    var x = 0;

    if ($('#type_title_th').val() == "") {
        $('#type_title_th').addClass('danger_form');
        $('#type_title_th').focus();
        setTimeout(function () { $('#type_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateRecType = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "progrectype",
        data: {
            type_title_th: $("#type_title_th").val(),
            // type_title_en: $("#type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
        },


    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#type_picname').val()) {
                    if ($('#type_picname').val()) {

                        office.UploadImgRecType(data.code, type_picname, 'type_picname', 'progrecType.php');
                    }

                } else {
                    var link = 'progrecType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditRecType = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "progrectype",
        where: { id: $("#dataid").val(), },
        data: {
            type_title_th: $("#type_title_th").val(),
            // type_title_en: $("#type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        },


    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#type_picname').val()) {
                    if ($('#type_picname').val()) {

                        office.UploadImgRecType($("#dataid").val(), type_picname, 'type_picname', 'progrecType.php');
                    }
                } else {
                    var link = 'progrecType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgRecType = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgRecType&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check Upload');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckFormRecTypeSub = function () {
    var x = 0;

    if ($('#title_th').val() == "") {
        $('#title_th').addClass('danger_form');
        $('#title_th').focus();
        setTimeout(function () { $('#title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateRecTypeSub = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "progrectypesub",
        data: {
            title_th: $("#title_th").val(),
            progrectype_id: $("#progrectype_id").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),
        },


    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#picname').val()) {
                    if ($('#picname').val()) {
                        office.UploadImgRecTypeSub(data.code, picname, 'picname', 'progrecTypeSub.php');
                    }

                } else {
                    var link = 'progrecTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditRecTypeSub = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "progrectypesub",
        where: { id: $("#dataid").val(), },
        data: {
            progrectype_id: $("#progrectype_id").val(),
            title_th: $("#title_th").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        },


    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#picname').val()) {
                    if ($('#picname').val()) {

                        office.UploadImgRecTypeSub($("#dataid").val(), picname, 'picname', 'progrecTypeSub.php');
                    }
                } else {
                    var link = 'progrecTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgRecTypeSub = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgRecTypeSub&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check Upload');
            console.log(data);
            duck.NotiDanger();
        }
    });
};




///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////          Programsch          //////////////////////////////////////

office.CheckFormListProgType = function () {
    var x = 0;

    if ($('#type_title_th').val() == "") {
        $('#type_title_th').addClass('danger_form');
        $('#type_title_th').focus();
        setTimeout(function () { $('#type_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateListProgTypes = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "programschtype",
        data: {
            type_title_th: $("#type_title_th").val(),
            type_title_en: $("#type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
        },


    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#type_picname').val()) {
                    if ($('#type_picname').val()) {

                        office.UploadImgListProgType(data.code, type_picname, 'type_picname', 'listallprogType.php');
                    }

                } else {
                    var link = 'listallprogType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditListProgType = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "programschtype",
        where: { id: $("#dataid").val(), },
        data: {
            type_title_th: $("#type_title_th").val(),
            type_title_en: $("#type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        },


    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#type_picname').val()) {
                    if ($('#type_picname').val()) {

                        office.UploadImgListProgType($("#dataid").val(), type_picname, 'type_picname', 'listallprogType.php');
                    }
                } else {
                    var link = 'listallprogType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgListProgType = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgListProgType&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check Upload');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckFormAllProg = function () {
    var x = 0;

    if ($('#title_th').val() == "") {
        $('#title_th').addClass('danger_form');
        $('#title_th').focus();
        setTimeout(function () { $('#title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateAllProg = function () {
    $("#modal_confirm").modal('hide');


    // console.log( $('.tagsearch').tagging( "getTags" )); 
    var tagAll = $('.tagsearch').tagging("getTags");

    var tagsearch = '';
    $.each(tagAll, function (i, result) {
        tagsearch = tagsearch + '' + tagAll[i] + ', ';
    });

    tagsearch = tagsearch.substring(0, tagsearch.length - 2);

    var exDat = {
        table: "programsch",
        // where : {id : $("#dataid").val(),	},
        data: {

            programtype_id: $("#programtype_id").val(),
            progrectypesub_id: $("#type_id").val(),
            progrectype_id: $("#progrectype_id").val(),
            progpervtyprsub_id: $("#prev_type_id").val(),
            progpervtype_id: $("#progpervtype_id").val(),
            title_th: $("#title_th").val(),
            title_en: $("#title_en").val(),
            list_name: $("#list_name").val(),
            prolist_name: $("#prolist_name").val(),
            tagsearch: tagsearch,
            startdate: $("input[name=startdate_submit]").val(),
            enddate: $("input[name=enddate_submit]").val(),
            display_header: $('input[type=radio][name=display_header]:checked').val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),

            // version: 2 
        },
        data_content: {
            desc_th: $("#desc_th").summernote('code'),
            desc_en: $("#desc_en").summernote('code'),
            detail_th: $("#detail_th").summernote('code'),
            detail_en: $("#detail_en").summernote('code'),
        }
    };
    // console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            // console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#cover_file').val() || $('#pdf_file').val()) {
                    if ($('#cover_file').val()) {
                        office.UploadImgAllProg(data.code, cover_file, 'cover_file', 'listallprog.php');
                    }
                    if ($('#pdf_file').val()) {
                        office.UploadFileAllProg(data.code, pdf_file, 'pdf_file', 'listallprog.php');
                    }
                } else {
                    var link = 'listallprog.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditAllProg = function () {
    $("#modal_confirm").modal('hide');


    // console.log( $('.tagsearch').tagging( "getTags" )); 
    var tagAll = $('.tagsearch').tagging("getTags");

    var tagsearch = '';
    $.each(tagAll, function (i, result) {
        tagsearch = tagsearch + '' + tagAll[i] + ', ';
    });

    tagsearch = tagsearch.substring(0, tagsearch.length - 2);

    var exDat = {
        table: "programsch",
        where: { id: $("#dataid").val(), },
        data: {

            programtype_id: $("#programtype_id").val(),
            progrectypesub_id: $("#type_id").val(),
            progrectype_id: $("#progrectype_id").val(),
            progpervtyprsub_id: $("#prev_type_id").val(),
            progpervtype_id: $("#progpervtype_id").val(),
            title_th: $("#title_th").val(),
            title_en: $("#title_en").val(),
            list_name: $("#list_name").val(),
            prolist_name: $("#prolist_name").val(),
            tagsearch: tagsearch,
            startdate: $("input[name=startdate_submit]").val(),
            enddate: $("input[name=enddate_submit]").val(),
            display_header: $('input[type=radio][name=display_header]:checked').val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
            // version: 2 
        },
        data_content: {
            desc_th: $("#desc_th").summernote('code'),
            desc_en: $("#desc_en").summernote('code'),
            detail_th: $("#detail_th").summernote('code'),
            detail_en: $("#detail_en").summernote('code'),
        }
    };
    // console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            // console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#cover_file').val() || $('#pdf_file').val()) {
                    if ($('#cover_file').val()) {
                        office.UploadImgAllProg($("#dataid").val(), cover_file, 'cover_file', 'listallprog.php');
                    }
                    if ($('#pdf_file').val()) {
                        office.UploadFileAllProg($("#dataid").val(), pdf_file, 'pdf_file', 'listallprog.php');
                    }
                } else {
                    var link = 'listallprog.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadFileAllProg = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadFileAllProg&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'POST',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 2000);
                setTimeout(duck.OpenPage, 2200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 2000);
                setTimeout(duck.OpenPage, 2200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadFileFlowch');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.UploadImgAllProg = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgAllProg&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgFlowch');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////    Intropage    ////////////////////////////////////////////////

office.CheckFormintropage = function () {
    var x = 0;

    if ($('#title_th').val() == "") {
        $('#title_th').addClass('danger_form');
        $('#title_th').focus();
        setTimeout(function () { $('#title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.Createintropage = function () {
    $("#modal_confirm").modal('hide');

    var startdate = $("input[name=startdate_submit]").val() + " " + $("#timestart").val();
    var enddate = $("input[name=enddate_submit]").val() + " " + $("#timeend").val();

    var exDat = {
        table: "intropage",
        data: {
            title_th: $("#title_th").val(),
            title_en: $("#title_th").val(),
            filetype: $("#filetype").val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_w]:checked').val(),
            startdate: startdate,
            enddate: enddate,
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),
        },


    };
    //console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#filename').val()) {
                    if ($('#filename').val()) {
                        office.UploadInTroPage(data.code, filename, 'filename', 'intropage.php');
                    }

                } else {
                    var link = 'intropage.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.Editintropage = function () {
    $("#modal_confirm").modal('hide');
    var startdate = $("input[name=startdate_submit]").val() + " " + $("#timestart").val();
    var enddate = $("input[name=enddate_submit]").val() + " " + $("#timeend").val();
    var exDat = {
        table: "intropage",
        where: { id: $("#dataid").val(), },
        data: {
            title_th: $("#title_th").val(),
            title_en: $("#title_th").val(),
            filetype: $("#filetype").val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            startdate: startdate,
            enddate: enddate,
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };
    //console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
            if (data.success == "COMPLETE") {
                if ($('#filename').val()) {
                    if ($('#filename').val()) {
                        office.UploadInTroPage($("#dataid").val(), filename, 'filename', 'intropage.php');
                    }
                } else {
                    var link = 'intropage.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.UploadInTroPage = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadInTroPage&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgFlowch');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////             ProgRec            /////////////////////////////////////////

office.CreateProgrecType = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "news_type",
        // where : {id : $("#dataid").val(),	},
        data: {
            news_type_title_th: $("#news_type_title_th").val(),
            news_type_title_en: $("#news_type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),

            create_by: $("#create_by").val(),
            update_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_date: $("#update_date").val(),
            // version: 2 
        },
        data_content: {
            //live_type_des : $("#live_type_des").summernote('code'),
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

                if ($('#news_type_picname').val()) {
                    if ($('#news_type_picname').val()) {

                        office.UploadImgNewsType(data.code, news_type_picname, 'news_type_picname', 'newsType.php');
                    }

                } else {
                    var link = 'newsType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgProgrecType = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgNewsType&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadRadioChart');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckFormProgrecType = function () {
    var x = 0;

    if ($('#news_type_title_th').val() == "") {
        $('#news_type_title_th').addClass('danger_form');
        $('#news_type_title_th').focus();
        setTimeout(function () { $('#news_type_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditProgrecType = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "news_type",
        where: { id: $("#newsid").val(), },
        data: {

            news_type_title_th: $("#news_type_title_th").val(),
            news_type_title_en: $("#news_type_title_en").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),

            // version: 2 
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#news_type_picname').val()) {
                    if ($('#news_type_picname').val()) {
                        office.UploadImgNewsType($("#newsid").val(), news_type_picname, 'news_type_picname', 'newsType.php');
                    }
                } else {
                    var link = 'newsType.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.CreateProgrecTypeSub = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "news_type_sub",
        // where : {id : $("#dataid").val(),	},
        data: {
            news_type_id: $("#news_type_id").val(),
            news_typesub_title_th: $("#news_typesub_title_th").val(),
            news_typesub_title_en: $("#news_typesub_title_en").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            orderby: $("#orderby").val(),
            create_by: $("#create_by").val(),
            update_by: $("#create_by").val(),
            // version: 2 
        },
        data_content: {
            //live_typesub_desc : $("#live_typesub_desc").summernote('code'),
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

                if ($('#news_typesub_picname').val()) {
                    if ($('#news_typesub_picname').val()) {

                        office.UploadImgNewsTypeSub(data.code, news_typesub_picname, 'news_typesub_picname', 'newsTypeSub.php');
                    }

                } else {
                    var link = 'newsTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.UploadImgProgrecTypeSub = function (newsid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgNewsTypeSub&source_id=' + source_id + '&newsid=' + newsid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check Upload');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckFormProgrecTypeSub = function () {
    var x = 0;

    if ($('#news_typesub_title_th').val() == "") {
        $('#news_typesub_title_th').addClass('danger_form');
        $('#news_typesub_title_th').focus();
        setTimeout(function () { $('#news_typesub_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.EditProgrecTypeSub = function (dataid) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "news_type_sub",
        where: { id: dataid, },
        data: {
            news_type_id: $("#news_type_id").val(),
            news_typesub_title_th: $("#news_typesub_title_th").val(),
            news_typesub_title_en: $("#news_typesub_title_en").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),

            orderby: $("#orderby").val(),
            update_by: $("#update_by").val(),
            // version: 2 
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#news_typesub_picname').val()) {
                    if ($('#news_typesub_picname').val()) {
                        office.UploadImgNewsTypeSub($("#newsid").val(), news_typesub_picname, 'news_typesub_picname', 'newsTypeSub.php');
                    }
                } else {
                    var link = 'newsTypeSub.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.LoadProgRecType = function (v_val, element_id) {

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

office.LoadProgRecTypeSub = function (v_val, element_id, v_valref) {


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

office.CheckFormProgRec = function () {
    var x = 0;

    if ($('#programtype_id').val() == "") {
        $('#programtype_id').addClass('danger_form');
        $('#programtype_id').focus();
        setTimeout(function () { $('#programtype_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#title_th').val() == "") {
        $('#title_th').addClass('danger_form');
        $('#title_th').focus();
        setTimeout(function () { $('#title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    // if ($('#list_name').val() == "") {
    //     $('#list_name').addClass('danger_form');
    //     $('#list_name').focus();
    //     setTimeout(function() { $('#list_name').removeClass('danger_form'); }, 8000);
    //     x = 1;
    // }  
    // if ($('#prolist_name').val() == "") {
    //     $('#prolist_name').addClass('danger_form');
    //     $('#prolist_name').focus();
    //     setTimeout(function() { $('#prolist_name').removeClass('danger_form'); }, 8000);
    //     x = 1;
    // }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateProgRec = function () {
    $("#modal_confirm").modal('hide');
    var tagAll = $('.tagsearch').tagging("getTags");

    var tagsearch = '';
    $.each(tagAll, function (i, result) {
        tagsearch = tagsearch + '' + tagAll[i] + ', ';
    });

    tagsearch = tagsearch.substring(0, tagsearch.length - 2);


    var exDat = {
        table: "progrec",
        data: {
            programtype_id: $("#programtype_id").val(),
            programsch_id: $("#prog_id").val(),
            progrec_type_id: $("#progrec_type_id").val(),
            progrec_type_sub_id: $("#progrec_type_sub_id").val(),
            progrec_title_th: $("#progrec_title_th").val(),
            list_name: $("#list_name").val(),
            prolist_name: $("#prolist_name").val(),
            tagsearch: tagsearch,
            vdo_link: $("#vdo_link").val(),
            linkprov: $("#linkprov").val(),
            orderby: $("#orderby").val(),
            display_header: $('input[type=radio][name=display_header]:checked').val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),
        },
        data_content: {
            progrec_content_th: $("#progrec_content_th").summernote('code'),
        }
    };
    // console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            // console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'progrecShow.php';
                if ($("#pic_cover").val() || $("#audiofile").val()) {
                    if ($("#pic_cover").val()) {
                        office.UploadImgProgRec(data.code, 'pic_cover', link);
                    }
                    if ($("#audiofile").val()) {
                        office.UploadAudioProgRec(data.code, 'audiofile', link);
                    }
                } else {
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.EditProgRec = function () {
    $("#modal_confirm").modal('hide');
    var tagAll = $('.tagsearch').tagging("getTags");

    var tagsearch = '';
    $.each(tagAll, function (i, result) {
        tagsearch = tagsearch + '' + tagAll[i] + ', ';
    });

    tagsearch = tagsearch.substring(0, tagsearch.length - 2);

    var dataid = $("#dataid").val();
    var exDat = {
        table: "progrec",
        where: {
            id: dataid
        },
        data: {
            programtype_id: $("#programtype_id").val(),
            programsch_id: $("#prog_id").val(),
            progrec_type_id: $("#progrec_type_id").val(),
            progrec_type_sub_id: $("#progrec_type_sub_id").val(),
            progrec_title_th: $("#progrec_title_th").val(),
            list_name: $("#list_name").val(),
            prolist_name: $("#prolist_name").val(),
            tagsearch: tagsearch,
            vdo_link: $("#vdo_link").val(),
            linkprov: $("#linkprov").val(),
            orderby: $("#orderby").val(),
            display_header: $('input[type=radio][name=display_header]:checked').val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        },
        data_content: {
            progrec_content_th: $("#progrec_content_th").summernote('code'),
        }
    };
    // console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            // console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'progrecShow.php';
                if ($("#pic_cover").val() || $("#audiofile").val()) {
                    if ($("#pic_cover").val()) {
                        office.UploadImgProgRec(dataid, 'pic_cover', link);
                    }
                    if ($("#audiofile").val()) {
                        office.UploadAudioProgRec(dataid, 'audiofile', link);
                    }
                } else {
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.UploadImgProgRec = function (source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgProgRec&source_id=' + source_id,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgNews');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.UploadAudioProgRec = function (source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadAudioProgRec&source_id=' + source_id,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgNews');
            console.log(data);
            duck.NotiDanger();
        }
    });
};



////////////////////////////////////////////////////////////////////////


office.CheckFormMedia = function () {
    var x = 0;

    if ($('#mediatype').val() == "") {
        $('#mediatype').addClass('danger_form');
        $('#mediatype').focus();
        setTimeout(function () { $('#mediatype').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if ($('#title').val() == "") {
        $('#title').addClass('danger_form');
        $('#title').focus();
        setTimeout(function () { $('#title').removeClass('danger_form'); }, 8000);
        x = 1;
    }


    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateMedia = function () {
    $("#modal_confirm").modal('hide');

    var exDat = {
        table: "media",
        data: {
            mediatype: $("#mediatype").val(),
            title: $("#title").val(),
            vdolink: $("#vdolink").val(),
            public_date: $("input[name=public_date_submit]").val(),
            display_header: $('input[type=radio][name=display_header]:checked').val(),

            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),

            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),
        },
        data_content: {
            content: $("#content").summernote('code'),
        }
    };
    // console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            // console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'media_edit.php?data_id=' + data.code;

                duck.ModalSShow();
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

office.EditMedia = function () {
    $("#modal_confirm").modal('hide');

    var dataid = $("#dataid").val();
    var exDat = {
        table: "media",
        where: {
            id: dataid
        },
        data: {
            mediatype: $("#mediatype").val(),
            title: $("#title").val(),
            vdolink: $("#vdolink").val(),
            public_date: $("input[name=public_date_submit]").val(),
            display_header: $('input[type=radio][name=display_header]:checked').val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),



        },
        data_content: {
            content: $("#content").summernote('code')
        }
    };
    // console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            // console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'media_edit.php?data_id=' + dataid;
                duck.ModalSShow();
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

////////////////////////////////////////////////////////////////////////

office.CheckFormDoc = function () {
    var x = 0;

    if ($('#doctype').val() == "") {
        $('#doctype').addClass('danger_form');
        $('#doctype').focus();
        setTimeout(function () { $('#doctype').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if ($('#title').val() == "") {
        $('#title').addClass('danger_form');
        $('#title').focus();
        setTimeout(function () { $('#title').removeClass('danger_form'); }, 8000);
        x = 1;
    }


    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateDoc = function () {
    $("#modal_confirm").modal('hide');

    var exDat = {
        table: "documents",
        data: {
            documenttype: $("#doctype").val(),
            title: $("#title").val(),
            public_date: $("input[name=public_date_submit]").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),
        },
        data_content: {
            content: $("#content").summernote('code'),
        }
    };
    // console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            // console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'doc_edit.php?data_id=' + data.code;
                if ($("#pic_cover").val() || $("#docfile").val()) {
                    if ($("#pic_cover").val()) {
                        office.UploadImgDoc(data.code, 'pic_cover', link);
                    }
                    if ($("#docfile").val()) {
                        office.UploadFileDoc(data.code, 'docfile', link);
                    }
                } else {
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.EditDoc = function () {
    $("#modal_confirm").modal('hide');

    var dataid = $("#dataid").val();
    var exDat = {
        table: "documents",
        where: {
            id: dataid
        },
        data: {
            documenttype: $("#doctype").val(),
            title: $("#title").val(),
            public_date: $("input[name=public_date_submit]").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        },
        data_content: {
            content: $("#content").summernote('code')
        }
    };
    // console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            // console.log(data); 
            if (data.success == "COMPLETE") {
                var link = 'doc_edit.php?data_id=' + dataid;
                if ($("#pic_cover").val() || $("#docfile").val()) {
                    if ($("#pic_cover").val()) {
                        office.UploadImgDoc(dataid, 'pic_cover', link);
                    }
                    if ($("#docfile").val()) {
                        office.UploadFileDoc(dataid, 'docfile', link);
                    }
                } else {
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.UploadImgDoc = function (source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgDoc&source_id=' + source_id,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgNews');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.UploadFileDoc = function (source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadFileDoc&source_id=' + source_id,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgNews');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

office.callSetWed = function (table_name, table_id, refto) {
    var x = 'N';
    if (!refto) {
        refto = "enable_w";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = '1';
    }
    var DataSet = {
        table: table_name,
        data: {
            enable_w: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
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
            console.log('Please check scripts callSetWed');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetMobile = function (table_name, table_id, refto) {
    var x = 'N';
    if (!refto) {
        refto = "enable_m";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = '1';
    }
    var DataSet = {
        table: table_name,
        data: {
            enable_m: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
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
            console.log('Please check scripts callSetMobile');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetNew = function (table_name, table_id, refto) {
    var x = '0';
    if (!refto) {
        refto = "new";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = '1';
    }
    var DataSet = {
        table: table_name,
        data: {
            new: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
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
            console.log('Please check scripts callSetNew');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetList = function (table_name, table_id, refto) {
    var x = '0';
    if (!refto) {
        refto = "list";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = '1';
    }
    var DataSet = {
        table: table_name,
        data: {
            list: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
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
            console.log('Please check scripts callSetList');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetListPrev = function (table_name, table_id, refto) {
    var x = '0';
    if (!refto) {
        refto = "list_prev";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = '1';
    }
    var DataSet = {
        table: table_name,
        data: {
            list_prev: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
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
            console.log('Please check scripts callSetListPrev');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetListFlowList = function (table_name, table_id, refto) {
    var x = '0';
    if (!refto) {
        refto = "flowlist";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = '1';
    }
    var DataSet = {
        table: table_name,
        data: {
            flowlist: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
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
            console.log('Please check scripts callSetListFlowList');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetUser = function (table_name, table_id, refto) {
    var x = '0';
    if (!refto) {
        refto = "user";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = '1';
    }
    var DataSet = {
        table: table_name,
        data: {
            user: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
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
            console.log('Please check scripts callSetUser');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetLive = function (table_name, table_id, refto) {
    var x = '0';
    if (!refto) {
        refto = "live";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = '1';
    }
    var DataSet = {
        table: table_name,
        data: {
            live: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
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
            console.log('Please check scripts callSetLive');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetFlowListPrev = function (table_name, table_id, refto) {
    var x = '0';
    if (!refto) {
        refto = "flowlistprev";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = '1';
    }
    var DataSet = {
        table: table_name,
        data: {
            flowlistprev: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
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
            console.log('Please check scripts callSetFlowListPrev');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////         User          //////////////////////////////////


office.CheckFormUser = function () {
    var x = 0;
    if ($('#firstname').val() == "") {
        $('#firstname').addClass('danger_form');
        $('#firstname').focus();
        setTimeout(function () { $('#firstname').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#lastname').val() == "") {
        $('#lastname').addClass('danger_form');
        $('#lastname').focus();
        $('#lastname').focus();
        setTimeout(function () { $('#lastname').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#username').val() == "") {
        $('#username').addClass('danger_form');
        $('#username').focus();
        $('#username').focus();
        setTimeout(function () { $('#username').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    /*
    if($('#password1').val() ==""){
        $('#password1').addClass('danger_form');
        $('#password1').focus();
        $('#password1').focus();
        setTimeout(function(){$('#password1').removeClass('danger_form'); }, 8000);
        x=1 ;
    }
    if($('#password2').val() ==""){
        $('#password2').addClass('danger_form');
        $('#password2').focus();
        $('#password2').focus();
        setTimeout(function(){$('#password2').removeClass('danger_form'); }, 8000);
        x=1 ;
    }*/
    // if($('#display_name').val() ==""){
    // 	$('#display_name').addClass('danger_form');
    // 	$('#display_name').focus();
    // 	$('#display_name').focus();
    // 	setTimeout(function(){$('#display_name').removeClass('danger_form'); }, 8000);
    // 	x=1 ;
    // }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CreateUser = function () {
    $("#create_modal").modal('hide');


    var exDat = {
        table: "officers",
        data: {
            officers_level: $("#officers_level").val(),
            section_id: $("#section_id").val(),
            responsibilty_id: $("#responsibilty_id").val(),
            role_manage: $('input[type=radio][name=role_manage]:checked').val(),
            role_person: $('input[type=radio][name=role_person]:checked').val(),
            role_finance: $('input[type=radio][name=role_finance]:checked').val(),

            titlename: $("#titlename").val(),
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            // officer_name: $("#officer_name").val(),
            position: $("#position").val(),
            mobile: $("#mobile").val(),
            tel1: $("#tel1").val(),
            tel2: $("#tel2").val(),
            fax1: $("#fax1").val(),
            fax2: $("#fax2").val(),
            email: $("#email").val(),
            facebook: $("#facebook").val(),
            username: $("#username").val(),
            //  password : $("#password").val(), 
            note: $("#note").val(),


            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),
        },
        password: $("#password1").val()

    };
    $("#modal_confirm").modal('hide');
    //console.log(exDat);
    $.ajax({
        url: office.url + '?mode=AddDataUser',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#avatar').val()) {
                    if ($('#avatar').val()) {
                        office.UploadUser(data.code, avatar, 'avatar', 'usermanager.php');
                    }
                } else {
                    var link = 'officers.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditUser = function (id) {
    $("#officers").modal('hide');

    var exDat = {
        table: "officers",
        data: {


            officers_level: $("#officers_level").val(),
            section_id: $("#section_id").val(),
            responsibilty_id: $("#responsibilty_id").val(),

            role_manage: $('input[type=radio][name=role_manage]:checked').val(),
            role_person: $('input[type=radio][name=role_person]:checked').val(),
            role_finance: $('input[type=radio][name=role_finance]:checked').val(),


            titlename: $("#titlename").val(),
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            // officer_name: $("#officer_name").val(),
            position: $("#position").val(),
            mobile: $("#mobile").val(),
            tel1: $("#tel1").val(),
            tel2: $("#tel2").val(),
            fax1: $("#fax1").val(),
            fax2: $("#fax2").val(),
            email: $("#email").val(),
            facebook: $("#facebook").val(),
            username: $("#username").val(),
            //  password : $("#password").val(), 
            note: $("#note").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        },
        where: {
            id: id
        }
    };

    $("#modal_confirm").modal('hide');
    //console.log(exDat);
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
            if (data.success == "COMPLETE") {
                if ($('#avatar').val()) {
                    if ($('#avatar').val()) {
                        office.UploadUser(id, avatar, 'avatar', 'officers.php');
                    }
                } else {
                    var link = 'officers.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditProfile = function (id) {
    $("#create_modal").modal('hide');

    var exDat = {
        table: "members",
        data: {
            titlename: $("#titlename").val(),
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            username: $("#username").val(),
            display_name: $("#username").val(),
            positionname: $("#positionname").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        },
        where: {
            id: id
        }
    };

    $("#modal_confirm").modal('hide');
    //console.log(exDat);
    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
            if (data.success == "COMPLETE") {
                if ($('#avatar').val()) {
                    if ($('#avatar').val()) {
                        office.UploadUser(id, avatar, 'avatar', 'officers.php');
                    }
                } else {
                    var link = 'profile.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.CheckUsername = function (element_id, txt_id) {
    //CheckUsername 
    var exDat = {
        table: "officers",
        where: {
            username: $("#" + element_id).val(),
        }
    };

    $.ajax({
        url: office.url + '?mode=LoadOneRow',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log("CheckUsername::");
            console.log(data);
            if (data) {
                $('#' + element_id).addClass('danger');
                $('#' + element_id).addClass('border-danger');
                $('.' + txt_id).text('ชื่อใช้งานนี้มีการใช้งานเเล้ว กรุณาใช้ชื่อใหม่');

                $("#btn_save").attr('disabled', 'disabled');
            } else {
                $('#' + element_id).removeClass('danger');
                $('#' + element_id).removeClass('border-danger');
                $('.' + txt_id).text('');
                $("#btn_save").removeAttr('disabled');
            }
        }, error: function (data) {
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CheckEditpass = function () {
    var x = 0;
    var password = $("#password").val();
    var confirmPassword = $("#password_cf").val();
    if (password == "") {
        $("#Checktxt1").addClass('text-danger').html("กรุณาระบุรหัสผ่าน");
        $("#password, #password_cf").addClass('border-danger');
        x = 1;
    }
    if (password != confirmPassword) {
        $("#Checktxt1").addClass('text-danger').html("รหัสผ่านไม่ตรงกัน");
        $("#password, #password_cf").addClass('border-danger');
        x = 1;
    }
    if (password == confirmPassword) {
        $("#Checktxt1").removeClass('text-danger').html("");
        $("#password, #password_cf").removeClass('border-danger');
    }
    if (x == 1) {
        $("#btn_save").attr('disabled', 'disabled');
    }
    if (x == 0) {
        console.log('complete');
        $("#btn_save").removeAttr('disabled');

    }
};

office.UploadUser = function (Userid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadUser&source_id=' + source_id + '&Userid=' + Userid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'POST',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 2000);
                setTimeout(duck.OpenPage, 2200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 2000);
                setTimeout(duck.OpenPage, 2200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadFileFlowch');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.EditPassword = function () {
    $('#modal_confirm').modal('hide');

    var password = $("#password1").val();
    var memberid = $("#userid").val();
    var exDat = {
        table: 'officers',
        data: {
            password: password
        },
        where: {
            id: memberid
        }
    };
    $.ajax({
        url: office.url + '?mode=EditPasswordUser',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();
                $('#modal_pass').modal('hide');
            } else {
                duck.NotiDanger();
            }

        }, error: function (data) {
            console.log(data);
            duck.NotiDanger();
        }
    });
};

//---------------------------  End User ------------------------///

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////     Programschplan_Type    ////////////////////////////////
/////////////////--------earth-----/////////////////////////
//////////////////////-----Flowch-------//////////////////////////
office.CheckFormFlowch = function () {
    var x = 0;

    if ($('#title_th').val() == "") {
        $('#title_th').addClass('danger_form');
        $('#title_th').focus();
        setTimeout(function () { $('#title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CheckFormFlowchDetail = function () {
    var x = 0;

    if ($('#program_name_th').val() == "") {
        $('#program_name_th').addClass('danger_form');
        $('#program_name_th').focus();
        setTimeout(function () { $('#program_name_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CheckFormFlowchPromote = function () {
    var x = 0;

    if ($('#pro_title_th').val() == "") {
        $('#pro_title_th').addClass('danger_form');
        $('#pro_title_th').focus();
        setTimeout(function () { $('#pro_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.CheckFormFlowchPerv = function () {
    var x = 0;

    if ($('#perv_title_th').val() == "") {
        $('#perv_title_th').addClass('danger_form');
        $('#perv_title_th').focus();
        setTimeout(function () { $('#perv_title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};


office.CreateFlowchPerv = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "programsch_detail_vdoperv",
        // where : {id : $("#dataid").val(),	},
        data: {

            programsch_detail_id: $("#programsch_detail_id").val(),
            perv_title_th: $("#perv_title_th").val(),
            perv_title_en: $("#perv_title_en").val(),
            vdo_name: $("#vdo_name").val(),
            vdo_link: $("#vdo_link").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_time: $("#create_time").val(),

            // version: 2 
        }
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'listperv.php';
                duck.ModalSShow();
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


office.EditFlowchPerv = function (id) {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "programsch_detail_vdoperv",
        where: { id: $("#vdoperv").val(), },
        data: {

            programsch_detail_id: $("#programsch_detail_id").val(),
            perv_title_th: $("#perv_title_th").val(),
            perv_title_en: $("#perv_title_en").val(),
            vdo_name: $("#vdo_name").val(),
            vdo_link: $("#vdo_link").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_time: $("#update_time").val(),

            // version: 2 
        }
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'listperv.php';
                duck.ModalSShow();
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

office.CreateFlowchPromote = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "programsch_detail_vdopromote",
        // where : {id : $("#dataid").val(),	},
        data: {

            programsch_detail_id: $("#programsch_detail_id").val(),
            pro_title_th: $("#pro_title_th").val(),
            pro_title_en: $("#pro_title_en").val(),
            vdo_name: $("#vdo_name").val(),
            vdo_link: $("#vdo_link").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_time: $("#create_time").val(),

            // version: 2 
        }
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'listpro.php';
                duck.ModalSShow();
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


office.EditFlowchPromote = function (id) {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "programsch_detail_vdopromote",
        where: { id: $("#vdopro").val(), },
        data: {

            programsch_detail_id: $("#programsch_detail_id").val(),
            pro_title_th: $("#pro_title_th").val(),
            pro_title_en: $("#pro_title_en").val(),
            vdo_name: $("#vdo_name").val(),
            vdo_link: $("#vdo_link").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_time: $("#update_time").val(),

            // version: 2 
        }
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'listpro.php';
                duck.ModalSShow();
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



office.EditFlowchDetail = function (id) {
    $("#modal_confirm").modal('hide');
    //var newsmenu = "news"; //news_info
    var exDat = {
        table: "programsch_detail",
        where: { id: $("#prodetail").val(), },
        data: {

            programsch_id: $("#programsch_id").val(),
            programdate: $("input[name=programdate_submit]").val(),
            starttime: $("#starttime").val(),
            endtime: $("#endtime").val(),
            program_name_th: $("#program_name_th").val(),
            program_name_en: $("#program_name_en").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by").val(),
            update_time: $("#update_time").val(),

        },
        data_content: {
            detail_th: $("#detail_th").summernote('code'),
            detail_en: $("#detail_en").summernote('code'),
        }

    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'prodetail.php';
                duck.ModalSShow();
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

office.CreateFlowch = function () {
    $("#modal_confirm").modal('hide');


    //console.log( $('.tagsearch').tagging( "getTags" )); 
    var tagAll = $('.tagsearch').tagging("getTags");

    var tagsearch = '';
    $.each(tagAll, function (i, result) {
        tagsearch = tagsearch + '' + tagAll[i] + ', ';
    });

    tagsearch = tagsearch.substring(0, tagsearch.length - 2);



    var exDat = {
        table: "programsch",
        // where : {id : $("#dataid").val(),	},
        data: {

            programtype_id: $("#programtype_id").val(),
            title_th: $("#title_th").val(),
            title_en: $("#title_en").val(),
            list_name: $("#list_name").val(),
            prolist_name: $("#prolist_name").val(),
            tagsearch: tagsearch,
            startdate: $("input[name=startdate_submit]").val(),
            enddate: $("input[name=enddate_submit]").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),

            // version: 2 
        },
        data_content: {
            desc_th: $("#desc_th").summernote('code'),
            desc_en: $("#desc_en").summernote('code'),
            detail_th: $("#detail_th").summernote('code'),
            detail_en: $("#detail_en").summernote('code'),
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

                if ($('#cover_file').val() || $('#pdf_file').val()) {
                    if ($('#cover_file').val()) {
                        office.UploadImgFlowch(data.code, cover_file, 'cover_file', 'flowch.php');
                    }
                    if ($('#pdf_file').val()) {
                        office.UploadFileFlowch(data.code, pdf_file, 'pdf_file', 'flowch.php');
                    }
                } else {
                    var link = 'flowch.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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


office.EditFlowch = function (id) {
    $("#modal_confirm").modal('hide');

    var tagAll = $('.tagsearch').tagging("getTags");
    var tagsearch = '';
    $.each(tagAll, function (i, result) {
        tagsearch = tagsearch + '' + tagAll[i] + ', ';
    });
    tagsearch = tagsearch.substring(0, tagsearch.length - 2);

    var exDat = {
        table: "programsch",
        where: { id: $("#flowid").val(), },
        data: {

            programtype_id: $("#programtype_id").val(),
            title_th: $("#title_th").val(),
            title_en: $("#title_en").val(),
            list_name: $("#list_name").val(),
            prolist_name: $("#prolist_name").val(),
            startdate: $("input[name=startdate_submit]").val(),
            enddate: $("input[name=enddate_submit]").val(),
            tagsearch: tagsearch,
            enable: $('input[type=radio][name=enable]:checked').val(),

            // version: 2 
        },
        data_content: {
            desc_th: $("#desc_th").summernote('code'),
            desc_en: $("#desc_en").summernote('code'),
            detail_th: $("#detail_th").summernote('code'),
            detail_en: $("#detail_en").summernote('code'),
        }
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                if ($('#cover_file').val() || $('#pdf_file').val()) {
                    if ($('#cover_file').val()) {
                        office.UploadImgFlowch($("#flowid").val(), cover_file, 'cover_file', 'flowch.php');
                    }
                    if ($('#pdf_file').val()) {
                        office.UploadFileFlowch($('#flowid').val(), pdf_file, 'pdf_file', 'flowch.php');
                    }
                } else {
                    var link = 'flowch.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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


office.UploadFileFlowch = function (flowid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadFileFlowch&source_id=' + source_id + '&flowid=' + flowid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'POST',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 2000);
                setTimeout(duck.OpenPage, 2200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 2000);
                setTimeout(duck.OpenPage, 2200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadFileFlowch');
            console.log(data);
            duck.NotiDanger();
        }
    });
};




office.UploadImgFlowch = function (flowid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgFlowch&source_id=' + source_id + '&flowid=' + flowid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check UploadImgFlowch');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CreateFlowchtype = function () {
    $("#create_modal").modal('show');
    var exDat = {
        table: "programschplan_type",
        data: {
            title_type_th: $("#title_type_th").val(),
            orderby: $("#orderby").val(),
            enable: $('input[type=radio][name=enable1]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),

            // version: 2 
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

            $("#create_modal").modal('hide');
            if (data.success == "COMPLETE") {

                if ($('#type_picname').val()) {

                    office.UploadImgFlowType(data.code, data.code, 'type_picname', 'typeflowch.php');
                } else {
                    var link = 'typeflowch.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }

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

office.EditFlowchType = function () {
    $("#modal_confirm").modal('hide');
    var exDat = {
        table: "programschplan_type",
        where: { id: $("#id_dm").val(), },
        data: {
            title_type_th: $("#title_type_th_e").val(),
            orderby: $("#orderby_e").val(),
            enable: $('input[type=radio][name=enable1]:checked').val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),
        }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            $("#edit_modal").modal('hide');
            if (data.success == "COMPLETE") {
                if ($('#type_picname_e').val()) {
                    office.UploadImgFlowType($("#id_dm").val(), $("#id_dm").val(), 'type_picname_e', 'typeflowch.php');
                } else {
                    var link = 'typeflowch.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.CallModalFlowType = function (id) {
    $('#edit_modal').modal('show');
    // var id = $(this).attr('data-id');

    var exDat = {
        table: "programschplan_type",
        where: { id: id },
    };
    console.log(exDat);
    $.ajax({
        url: office.url + '?mode=LoadOneRow',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);

            $("#id_dm").val(id);
            $("#title_type_th_e").val(data.title_type_th);
            $("#orderby_e").val(data.orderby);
            $("#picture_disp_e").attr('src', '/uploads/schplantype/' + data.type_picname);



            if (data.enable == "Y") {
                $('#enable1_Y').iCheck('check');
            } else if (data.enable == "N") {
                $("#enable1_N").iCheck('check');
            }
        },
        error: function (data) {
            console.log(data);
            console.log('check CallModalFlowType');
            duck.NotiDanger();
        }
    });
};

office.UploadImgFlowType = function (typeid, source_id, file_id, linkpage) {
    //data.code, type_picname, 'type_picname', 'typeflowch.php'
    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    var tablename = "programschplan_type";

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadImgFlowType&source_id=' + source_id + '&tablename=' + tablename + '&dataid=' + typeid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);

            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }

        },
        error: function (data) {
            console.log('Please check Upload');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////


office.CreateSchMain = function () {
    var x = 0;

    if ($('#programschplan_type_id').val() == "") {
        $('#programschplan_type_id').addClass('danger_form');
        $('#programschplan_type_id').focus();
        setTimeout(function () { $('#programschplan_type_id').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#title_th').val() == "") {
        $('#title_th').addClass('danger_form');
        $('#title_th').focus();
        setTimeout(function () { $('#title_th').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 1) {
        // $("#modal_confirm").modal('show');
        return false;
    }



    var exDat = {
        table: "programschplan",
        data: {
            programschplan_type_id: $("#programschplan_type_id").val(),
            title_th: $("#title_th").val(),
            startdate: $("input[name=startdisp_date_submit]").val(),
            enddate: $("input[name=enddisp_date_submit]").val(),
            enable: $('input[type=radio][name=enable1]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),

            // version: 2 
        }
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            $("#create_modal").modal('hide');
            if (data.success == "COMPLETE") {

                if ($('#pdf_file').val()) {
                    office.UploadFileFlowch(data.code, pdf_file, 'pdf_file', 'schmain.php');
                } else {
                    var link = 'schmain.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }


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

office.EditSchMain = function () {
    var x = 0;

    if ($('#programschplan_type_id_e').val() == "") {
        $('#programschplan_type_id_e').addClass('danger_form');
        $('#programschplan_type_id_e').focus();
        setTimeout(function () { $('#programschplan_type_id_e').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#title_th_e').val() == "") {
        $('#title_th_e').addClass('danger_form');
        $('#title_th_e').focus();
        setTimeout(function () { $('#title_th_e').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 1) {
        return false;
    }
    var dataid = $("#id_dm").val();
    var exDat = {
        table: "programschplan",
        where: {
            id: dataid
        },
        data: {
            programschplan_type_id: $("#programschplan_type_id_e").val(),
            title_th: $("#title_th_e").val(),
            startdate: $("input[name=startdisp_date_e_submit]").val(),
            enddate: $("input[name=enddisp_date_e_submit]").val(),
            enable: $('input[type=radio][name=enable1_e]:checked').val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val()
        }
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            $("#edit_modal").modal('hide');
            if (data.success == "COMPLETE") {
                if ($('#pdf_file_e').val()) {
                    office.UploadFileFlowch(dataid, pdf_file_e, 'pdf_file_e', 'schmain.php');
                } else {
                    var link = 'schmain.php';
                    duck.ModalSShow();
                    setTimeout(duck.ModalSHide, 3000);
                    setTimeout(duck.OpenPage, 3200, link, '_self');
                }
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

office.CallModalSchMain = function (id) {
    $('#edit_modal').modal('show');

    var exDat = {
        table: "programschplan",
        where: { id: id },
    };
    console.log(exDat);
    $.ajax({
        url: office.url + '?mode=LoadOneRow',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);

            $("#id_dm").val(id);
            office.LoadProgPlanType(data.programschplan_type_id, 'programschplan_type_id_e');
            $("#title_th_e").val(data.title_th);


            var filex = '';
            if (data.pdf_file) {
                var filex = 'PDF : <a href="/uploads/files/' + data.pdf_file + '" target="_blank"> <i class="fa fa-file-text-o"></i> ' + data.title_th + '</a>'
            }
            $(".filebox").html(filex);
            $("#pdf_file_e").attr('src', '/uploads/files/' + data.pdf_file);



            if (data.startdate != null)
                $('#startdisp_date_e').pickadate('picker').set('select', new Date(data.startdate));
            if (data.enddate != null)
                $('#enddisp_date_e').pickadate('picker').set('select', new Date(data.enddate));


            if (data.enable == "Y") {
                $('#enable1_Y_e').iCheck('check');
            } else if (data.enable == "N") {
                $("#enable1_N_e").iCheck('check');
            }
        },
        error: function (data) {
            console.log(data);
            console.log('check CallModalFlowType');
            duck.NotiDanger();
        }
    });
};

office.LoadProgPlanType = function (v_val, element_id) {
    if (v_val) {
        // alert(v_val);
    }
    var exDat = {
        table: "programschplan_type",
        where: { enable: "Y", deleted: '0' },
        orderby: "   orderby DESC",
        limit: "",
    };

    $.ajax({
        url: office.url + '?mode=LoadAllData',
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

office.LoadProgramSchPlan = function (v_val, element_id) {
    if (v_val) {

    }
    var exDat = {
        table: "programschplan",
        where: { enable: "Y", deleted: '0' },
        orderby: " CONVERT ( title_th USING tis620 ) ASC ",
        limit: "",
    };

    $.ajax({
        url: office.url + '?mode=LoadAllData',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
            $('#' + element_id).find('option').remove()
            $('<option>').attr('value', '').text("เลือกผังการออกอากาศ").appendTo('#' + element_id);
            $.each(data, function (i, result) {
                var title = result.title_th + " " + result.startdate + " - " + result.enddate;
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

office.CreateSchDetail = function () {
    $("#modal_confirm").modal('hide');
    //programschplan_id programtype_id programsch_id programdate starttime endtime program_name_th detail_th
    var exDat = {
        table: "programschplan_detail",
        data: {
            programschplan_id: $("#programschplan_id").val(),
            programsch_id: $("#programsch_id").val(),
            programdate: $("#programdate").val(),
            starttime: $("#starttime").val(),
            endtime: $("#endtime").val(),
            program_name_th: $("#program_name_th").val(),
            vdo_promote: $("#vdo_promote").val(),
            vdo_link: $("#vdo_link").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),
        },
        data_content: {
            detail_th: $("#detail_th").summernote('code'),
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
                var link = 'prodetail.php?schmain=' + $("#programschplan_id").val();
                duck.ModalSShow();
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

office.EditSchDetail = function () {
    $("#modal_confirm").modal('hide');
    //programschplan_id programtype_id programsch_id programdate starttime endtime program_name_th detail_th

    var data_id = $("#id_dm").val();
    var exDat = {
        table: "programschplan_detail",
        where: {
            id: data_id
        },
        data: {
            programschplan_id: $("#programschplan_id").val(),
            programsch_id: $("#programsch_id").val(),
            programdate: $("#programdate").val(),
            starttime: $("#starttime").val(),
            endtime: $("#endtime").val(),
            program_name_th: $("#program_name_th").val(),
            vdo_promote: $("#vdo_promote").val(),
            vdo_link: $("#vdo_link").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),
        },
        data_content: {
            detail_th: $("#detail_th").summernote('code'),
        }
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataContents',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'prodetail.php?schmain=' + $("#programschplan_id").val();
                duck.ModalSShow();
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

///////////////////////////////////
/*
if (result.dept.CommandActiveDate != null)
$('#CommandActiveDate').pickadate('picker').set('select', new Date(result.dept.CommandActiveDate)); 
*/

office.CallModalCopySchMain = function (id) {
    $('#copy_modal').modal('show');
    $("#id_copy").val(id);

    var exDat = {
        table: "programschplan",
        where: { id: id },
    };
    console.log(exDat);
    $.ajax({
        url: office.url + '?mode=LoadOneRow',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);

            $("#id_dm").val(id);
            office.LoadProgPlanType(data.programschplan_type_id, 'programschplan_type_id_c');
            $("#title_th_c").val(data.title_th);

            var filex = '';
            if (data.pdf_file) {
                var filex = 'PDF : <a href="/uploads/files/' + data.pdf_file + '" target="_blank"> <i class="fa fa-file-text-o"></i> ' + data.title_th + '</a>'
            }
            $(".filebox").html(filex);
            $("#pdf_file_c").attr('src', '/uploads/files/' + data.pdf_file);

            if (data.startdate != null)
                $('#startdisp_date_c').pickadate('picker').set('select', new Date(data.startdate));
            if (data.enddate != null)
                $('#enddisp_date_c').pickadate('picker').set('select', new Date(data.enddate));

            if (data.enable == "Y") {
                $('#enable1_Y_c').iCheck('check');
            } else if (data.enable == "N") {
                $("#enable1_N_c").iCheck('check');
            }

        },
        error: function (data) {
            console.log(data);
            console.log('check CallModalCopySchMain');
            duck.NotiDanger();
        }
    });
};

office.CopySchMain = function () {
    var id_copy = $("#id_copy").val();
    var exDat = {
        table: "programschplan",
        data: {
            programschplan_type_id: $("#programschplan_type_id_c").val(),
            title_th: $("#title_th_c").val(),
            startdate: $("input[name=startdisp_date_c_submit]").val(),
            enddate: $("input[name=enddisp_date_c_submit]").val(),
            enable: $('input[type=radio][name=enable1_c]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#create_by").val(),
            update_date: $("#create_date").val(),
        }
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            $("#create_modal").modal('hide');
            if (data.success == "COMPLETE") {
                if ($('#pdf_file_c').val()) {
                    office.UploadFileSchMainCopy(data.code, pdf_file, 'pdf_file_c', 'schmain.php');
                }

                office.CopySchDetail(id_copy, data.code);

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

office.UploadFileSchMainCopy = function (flowid, source_id, file_id, linkpage) {

    var file_data = $('#' + file_id).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    console.log(source_id);
    console.log(file_id);
    $.ajax({
        url: office.url + '?mode=UploadFileFlowch&source_id=' + source_id + '&flowid=' + flowid,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'POST',
        success: function (php_script_response) {

            var img_state = JSON.parse(php_script_response);
            console.log(php_script_response);
            /*
            if (img_state.state == '1') {
                var link = linkpage;
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 2000);
                setTimeout(duck.OpenPage, 2200, link, '_self');
            } else {
                var link = linkpage;
                duck.ModalWShow();
                setTimeout(duck.ModalSHide, 2000);
                setTimeout(duck.OpenPage, 2200, link, '_self');
            }*/
        },
        error: function (data) {
            console.log('Please check UploadFileSchMainCopy');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.CopySchDetail = function (id_copy, dataid) {

    var exDat = {
        id_copy: id_copy,
        dataid: dataid,
        create_by: $('#create_by').val(),
        create_date: $('#create_date').val()
    };
    $.ajax({
        url: office.url + '?mode=CopySchDetail',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.state == "COMPLETE") {
                var link = 'schmain.php';
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            } else {
                var link = 'schmain.php';
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
            }
        },
        error: function (data) {
            console.log(data);
            duck.NotiDanger();
        }
    });
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////--------earth-----/////////////////////////
/*
office.callSetIntroPageActive=function(table_name, table_id, refto){
    
    var x = 'N';
    if (!refto) {
        refto = "active";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = 'Y';
    }
    var DataSet = {
        table: table_name,
        data: {
            active: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            console.log(data)
            if (data.success == "COMPLETE") {
                duck.NotiSuccess(); 
            } else { 
                duck.NotiWarning();
            } 
            //duck.ReloadPage();
            //console.log('OK callSetIntroPageActice');
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetIntroPageActice');
            console.log(data);
            duck.NotiDanger();
        }
    });
};
*/
office.callSetIntroPageInActive = function (table_name) {
    var x = 'N';
    var DataSet = {
        table: 'intropage',
        data: {
            active: x
        },
        where: {
            active: 'Y'
        }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            // if (data.success == "COMPLETE") {
            // 	duck.NotiSuccess(); 
            // } else { 
            // 	duck.NotiWarning();
            // }  
            //console.log('callSetIntroPageInActice');
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetIntroPageInActice');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


///////////////////////////////////////////////////////////////////////////////////////////

office.LoadProgrameType = function (v_val, element_id) {
    if (v_val) {
        // alert(v_val);
    }
    var exDat = {
        table: "programschtype",
        where: { enable: "Y", deleted: '0' },
        orderby: " CONVERT ( type_title_th USING tis620 ) ASC ",
        limit: "",
    };

    $.ajax({
        url: office.url + '?mode=LoadAllData',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
            $('#' + element_id).find('option').remove()
            $('<option>').attr('value', '').text("กรุณาเลือกประเภทรายการ").appendTo('#' + element_id);
            $.each(data, function (i, result) {
                if (result.id == v_val) {
                    $(".select2-chosen").text(result.type_title_th);
                    $('<option>').attr('value', result.id).attr('selected', 'selected').text(result.type_title_th).appendTo('#' + element_id);
                } else {
                    $('<option>').attr('value', result.id).text(result.type_title_th).appendTo('#' + element_id);
                }
            });
        },
        error: function (data) {
            console.log(data);
            console.log('check LoadProgrameType');
            duck.NotiDanger();
        }
    });
};

office.LoadProgrameSel = function (v_val, element_id, progtypeid) {

    if (progtypeid) {
        var exDat = {
            table: "programsch",
            where: {
                deleted: "0",
                programtype_id: progtypeid
            },
            orderby: " CONVERT ( title_th USING tis620 ) ASC ",
            limit: "",
        };
    } else {
        var exDat = {
            table: "programsch",
            where: {
                deleted: "0",
            },
            orderby: " CONVERT ( title_th USING tis620 ) ASC ",
            limit: "",
        };
    }



    $.ajax({
        url: office.url + '?mode=LoadAllData',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            //console.log(data);
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
            console.log('check LoadProgrameSel');
            duck.NotiDanger();
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//////////////////// ===== earth =====//////////////////////////

office.CheckFormsurvey = function () {
    var x = 0;

    if ($('#title').val() == "") {
        $('#title').addClass('danger_form');
        $('#title').focus();
        setTimeout(function () { $('#title').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#link').val() == "") {
        $('#link').addClass('danger_form');
        $('#link').focus();
        $('#link').focus();
        setTimeout(function () { $('#link').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.Createsurvey = function () {
    $("#modal_confirm").modal('hide');

    var exDat = {
        table: "survey",
        // where : {id : $("#dataid").val(),	},
        data: {
            title: $("#title").val(),
            link: $("#link").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by	").val(),
            update_date: $("#update_date").val(),

            // version: 2 
        },
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'survey.php';
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
                // alert('สำเร็จ')

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

office.Editsurvey = function () {
    $("#modal_confirm").modal('hide');

    var exDat = {
        table: "survey",
        where: { id: $("#dataid").val(), },
        data: {
            title: $("#title").val(),
            link: $("#link").val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by	").val(),
            update_date: $("#update_date").val(),
        },
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'survey.php';
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
                // alert('สำเร็จ')

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


office.CheckFormsurveymain = function () {
    var x = 0;

    if ($('#surveyname').val() == "") {
        $('#surveyname').addClass('danger_form');
        $('#surveyname').focus();
        setTimeout(function () { $('#surveyname').removeClass('danger_form'); }, 8000);
        x = 1;
    }
    if ($('#votesurvey').val() == "") {
        $('#votesurvey').addClass('danger_form');
        $('#votesurvey').focus();
        $('#votesurvey').focus();
        setTimeout(function () { $('#votesurvey').removeClass('danger_form'); }, 8000);
        x = 1;
    }

    if (x == 0) {
        $("#modal_confirm").modal('show');
    }
};

office.Createsurveymain = function () {
    $("#modal_confirm").modal('hide');

    var exDat = {
        table: "surveymain",
        // where : {id : $("#dataid").val(),	},
        data: {
            surveyname: $("#surveyname").val(),
            votesurvey: $("#votesurvey").val(),
            link: $("#link").val(),
            startsurvey: $("input[name=startdate_submit]").val(),
            endsurvey: $("input[name=enddate_submit]").val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by	").val(),
            update_date: $("#update_date").val(),

        },

        table1: "survey_questions",
        data1: {
            qname: $("#qname").val(),
            answernum: $("#answernum").val(),
        },
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=AddDatasurveymain',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'surveymain.php';
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');

                // alert('สำเร็จ')

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


office.Editsurveymain = function () {
    $("#modal_confirm").modal('hide');

    var exDat = {
        table: "surveymain",
        where: {
            id: $("#dataid").val(),
        },
        data: {
            surveyname: $("#surveyname").val(),
            votesurvey: $("#votesurvey").val(),
            link: $("#link").val(),
            startsurvey: $("input[name=startdate_submit]").val(),
            endsurvey: $("input[name=enddate_submit]").val(),
            enable_w: $('input[type=radio][name=enable_w]:checked').val(),
            enable_m: $('input[type=radio][name=enable_m]:checked').val(),
            enable: $('input[type=radio][name=enable]:checked').val(),
            update_by: $("#update_by	").val(),
            update_date: $("#update_date").val(),

        },

        table1: "survey_questions",
        where1: { survey_id: $("#dataid").val() },
        data1: {
            qname: $("#qname").val(),
            answernum: $("#answernum").val(),
        },
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDatasurveymain',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'surveymain.php';
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');

                // alert('สำเร็จ')

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

/////////////////--------earth-----/////////////////////////

office.callSetIntroPageActive = function (table_name, table_id, refto) {
    // office.callSetIntroPageInActive('intropage');

    var x = 'N';
    if (!refto) {
        refto = "active";
    }
    if ($("#" + refto + table_id).is(':checked') == true) {
        x = 'Y';
    }
    var DataSet = {
        table: table_name,
        data: {
            active: x,
        },
        where: { id: table_id }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();
            } else {
                duck.NotiWarning();
            }
            //  duck.ReloadPage();
            //console.log('OK callSetIntroPageActice');
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetIntroPageActice');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office.callSetIntroPageInActive = function (table_name) {
    var x = 'N';
    var DataSet = {
        table: 'intropage',
        data: {
            active: x
        },
        where: {
            active: 'Y'
        }
    };

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () { },
        success: function (data) {
            // if (data.success == "COMPLETE") {
            // 	duck.NotiSuccess(); 
            // } else { 
            // 	duck.NotiWarning();
            // }  
            //console.log('callSetIntroPageInActice');
        },
        complete: function () { },
        error: function (data) {
            console.log('Please check scripts callSetIntroPageInActice');
            console.log(data);
            duck.NotiDanger();
        }
    });
};



office.CreateResArea = function () {


    $('#model_resarea').modal('hide')



    var exDat = {
        table: "responsible_area",
        data: {

            responsible_area_code: $("#responsible_area_code").val(),
            responsible_area_title: $("#responsible_area_title").val(),
            responsible_address: $("#responsible_address").val(),

            responsible_area_order: $('#responsible_area_order').val(),
            enable: $("input[name=enable]:checked").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };
    console.log(exDat);


    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'set.resarea.php';

                duck.ModalSShow();
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

office.GetResArea = function (dataid) {
    // $("#from_edu").show();

    $("#model_resarea_e").modal();
    // var dataid = $("#dataid").val();
    var DataSet = {
        table: 'responsible_area',
        where: {
            responsible_area_id: dataid,
        }
    };
    //console.log(DataSet);
    $.ajax({
        url: office.url + '?mode=LoadOneRow',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () {
            $("#modalLoading").show();
        },
        success: function (result, status, xhr) {

            console.log(result);
            $("#responsible_area_id_e").val(result.responsible_area_id);
            $("#responsible_area_code_e").val(result.responsible_area_code);
            $("#responsible_area_title_e").val(result.responsible_area_title);
            $("#responsible_area_order_e").val(result.responsible_area_order);
            $("#responsible_address_e").val(result.responsible_address);

            // alert(result.enable);
            if (result.enable == 'Y') {
                // $("#enable_Y_e").prop('checked', true);
                // $("#enable_Y_e").$(this).prop('checked', true);
                $("#enable_Y_e").prop("checked", true);
            }
            if (result.enable == 'N') {
                $("#enable_N_e").prop('checked', true);
            }
            // else if (result.enable == 'N') {
            //     $("#enable_N_e").attr('checked', true);
            // }
            // else {
            //     $("#enable_N_e").attr('checked', true);

            // }


            // if ($("input[name=enable]:checked").val() == "on") {
            //     var active = 'Y';
            // }


        },
        complete: function () {
            $("#modalLoading").hide();
        },
        error: function (xhr, status, error) {
            console.log('Please check scripts GetOrgSubUnit');
            console.log(xhr);
            duck.NotiDanger();
        }
    });
};

office.EditResArea = function () {
    $("#model_resarea_e").modal('hide');

    var exDat = {
        table: "responsible_area",
        where: { responsible_area_id: $("#responsible_area_id_e").val(), },
        data: {
            responsible_area_code: $("#responsible_area_code_e").val(),
            responsible_area_title: $("#responsible_area_title_e").val(),
            responsible_address: $("#responsible_address_e").val(),

            responsible_area_order: $('#responsible_area_order_e').val(),
            enable: $("input[name=enable_e]:checked").val(),

            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        },
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'set.resarea.php';
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
                // alert('สำเร็จ')

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

office.CreateCourse = function () {


    $('#model_course').modal('hide')
    //news_id news_img_title_th news_img_title_en  news_img_picname typegallery orderbygallery statusgallery


    var exDat = {
        table: "course",
        data: {

            course_name: $("#course_name").val(),

            orderby: $('#orderby').val(),
            enable: $("input[name=enable]:checked").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };
    console.log(exDat);


    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'set.course.php';

                duck.ModalSShow();
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


office.GetCourse = function (dataid) {
    // $("#from_edu").show();

    $("#model_course_e").modal();
    // var dataid = $("#dataid").val();
    var DataSet = {
        table: 'course',
        where: {
            course_id: dataid,
        }
    };
    //console.log(DataSet);
    $.ajax({
        url: office.url + '?mode=LoadOneRow',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () {
            $("#modalLoading").show();
        },
        success: function (result, status, xhr) {

            console.log(result);
            $("#course_id_e").val(result.course_id);
            $("#course_name_e").val(result.course_name);
            $("#orderby_e").val(result.orderby);


            if (result.enable == 'Y') {
                $("#enable_Y_e").prop('checked', true);
            }
            else if (result.enable == 'N') {
                $("#enable_N_e").prop('checked', true);
            }
            else {
                $("#enable_N_e").prop('checked', true);

            }


            // if ($("input[name=enable]:checked").val() == "on") {
            //     var active = 'Y';
            // }


        },
        complete: function () {
            $("#modalLoading").hide();
        },
        error: function (xhr, status, error) {
            console.log('Please check scripts GetOrgSubUnit');
            console.log(xhr);
            duck.NotiDanger();
        }
    });
};

office.EditCourse = function () {
    $("#model_course_e").modal('hide');

    var exDat = {
        table: "course",
        where: { course_id: $("#course_id_e").val(), },
        data: {

            course_name: $("#course_name_e").val(),

            orderby: $('#orderby_e').val(),

            enable: $("input[name=enable_e]:checked").val(),

            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        },
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'set.course.php';
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
                // alert('สำเร็จ')

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


//


office.CreateSetTimeReport = function () {


    $('#model_resarea').modal('hide')

    var month1 = 'N';
    var month2 = 'N';
    var month3 = 'N';
    var month4 = 'N';
    var month5 = 'N';
    var month6 = 'N';
    var month7 = 'N';
    var month8 = 'N';
    var month9 = 'N';
    var month10 = 'N';
    var month11 = 'N';
    var month12 = 'N';
    if ($('#month1').is(':checked') == true) {
        month1 = 'Y';
    }
    if ($('#month2').is(':checked') == true) {
        month2 = 'Y';
    }
    if ($('#month3').is(':checked') == true) {
        month3 = 'Y';
    }
    if ($('#month4').is(':checked') == true) {
        month4 = 'Y';
    }
    if ($('#month5').is(':checked') == true) {
        month5 = 'Y';
    }
    if ($('#month6').is(':checked') == true) {
        month6 = 'Y';
    }
    if ($('#month7').is(':checked') == true) {
        month7 = 'Y';
    }
    if ($('#month8').is(':checked') == true) {
        month8 = 'Y';
    }
    if ($('#month9').is(':checked') == true) {
        month9 = 'Y';
    }
    if ($('#month10').is(':checked') == true) {
        month10 = 'Y';
    }
    if ($('#month11').is(':checked') == true) {
        month11 = 'Y';
    }
    if ($('#month12').is(':checked') == true) {
        month12 = 'Y';
    }



    var exDat = {
        table: "settime_report",
        data: {

            year_course: $("#year_course").val(),
            semester: $("#semester").val(),
            month1: month1,
            month2: month2,
            month3: month3,
            month4: month4,
            month5: month5,
            month6: month6,
            month7: month7,
            month8: month8,
            month9: month9,
            month10: month10,
            month11: month11,
            month12: month12,
            orderby: $('#orderby').val(),
            enable: $("input[name=enable]:checked").val(),
            create_by: $("#create_by").val(),
            create_date: $("#create_date").val(),
            update_by: $("#update_by").val(),
            update_date: $("#update_date").val()
        }
    };
    console.log(exDat);


    $.ajax({
        url: office.url + '?mode=AddDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {
                var link = 'set.timereport.php';

                duck.ModalSShow();
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

office.GetSetTimeReport = function (dataid) {
    // $("#from_edu").show();

    $("#model_resarea_e").modal();
    // var dataid = $("#dataid").val();
    var DataSet = {
        table: 'settime_report',
        where: {
            id: dataid,
        }
    };
    //console.log(DataSet);
    $.ajax({
        url: office.url + '?mode=LoadOneRow',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function () {
            $("#modalLoading").show();
        },
        success: function (result, status, xhr) {

            console.log(result);
            $("#year_course_e").val(result.year_course);
            $("#semester_e").val(result.semester);
            $("#setid").val(dataid);

            if (result.month1 == 'Y') {
                $("#month1_e").prop("checked", true);
            }
            if (result.month2 == 'Y') {
                $("#month2_e").prop("checked", true);
            }
            if (result.month3_e == 'Y') {
                $("#month3_e").prop("checked", true);
            }
            if (result.month4 == 'Y') {
                $("#month4_e").prop("checked", true);
            }

            if (result.month5 == 'Y') {
                $("#month5_e").prop("checked", true);
            }
            if (result.month6 == 'Y') {
                $("#month6_e").prop("checked", true);
            }
            if (result.month7 == 'Y') {
                $("#month7_e").prop("checked", true);
            }
            if (result.month8 == 'Y') {
                $("#month8_e").prop("checked", true);
            }
            if (result.month9 == 'Y') {
                $("#month9_e").prop("checked", true);
            }
            if (result.month10 == 'Y') {
                $("#month10_e").prop("checked", true);
            }
            if (result.month11 == 'Y') {
                $("#month11_e").prop("checked", true);
            }
            if (result.month12 == 'Y') {
                $("#month12_e").prop("checked", true);
            }

            $("#orderby_e").val(result.orderby);


            if (result.enable == 'Y') {
                $("#enable_Y_e").prop("checked", true);

            }
            if (result.enable == 'N') {
                $("#enable_N_e").prop("checked", true);

            }



        },
        complete: function () {
            $("#modalLoading").hide();
        },
        error: function (xhr, status, error) {
            console.log('Please check scripts GetOrgSubUnit');
            console.log(xhr);
            duck.NotiDanger();
        }
    });
};

office.EditSetTimeReport = function () {
    $("#model_resarea_e").modal('hide');

    var month1 = 'N';
    var month2 = 'N';
    var month3 = 'N';
    var month4 = 'N';
    var month5 = 'N';
    var month6 = 'N';
    var month7 = 'N';
    var month8 = 'N';
    var month9 = 'N';
    var month10 = 'N';
    var month11 = 'N';
    var month12 = 'N';
    if ($('#month1_e').is(':checked') == true) {
        month1 = 'Y';
    }
    if ($('#month2_e').is(':checked') == true) {
        month2 = 'Y';
    }
    if ($('#month3_e').is(':checked') == true) {
        month3 = 'Y';
    }
    if ($('#month4_e').is(':checked') == true) {
        month4 = 'Y';
    }
    if ($('#month5_e').is(':checked') == true) {
        month5 = 'Y';
    }
    if ($('#month6_e').is(':checked') == true) {
        month6 = 'Y';
    }
    if ($('#month7_e').is(':checked') == true) {
        month7 = 'Y';
    }
    if ($('#month8_e').is(':checked') == true) {
        month8 = 'Y';
    }
    if ($('#month9_e').is(':checked') == true) {
        month9 = 'Y';
    }
    if ($('#month10_e').is(':checked') == true) {
        month10 = 'Y';
    }
    if ($('#month11_e').is(':checked') == true) {
        month11 = 'Y';
    }
    if ($('#month12_e').is(':checked') == true) {
        month12 = 'Y';
    }
    var exDat = {
        table: "settime_report",
        where: {
            id: $("#setid").val(),
        },
        data: {
            year_course: $("#year_course_e").val(),
            semester: $("#semester_e").val(),
            month1: month1,
            month2: month2,
            month3: month3,
            month4: month4,
            month5: month5,
            month6: month6,
            month7: month7,
            month8: month8,
            month9: month9,
            month10: month10,
            month11: month11,
            month12: month12,
            orderby: $('#orderby_e').val(),
            enable: $("input[name=enable_e]:checked").val(),

            update_by: $("#update_by").val(),
            update_date: $("#update_date").val(),


        },
    };
    console.log(exDat);

    $.ajax({
        url: office.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function (data) {
            console.log(data);
            if (data.success == "COMPLETE") {

                var link = 'set.timereport.php';
                duck.ModalSShow();
                setTimeout(duck.ModalSHide, 3000);
                setTimeout(duck.OpenPage, 3200, link, '_self');
                // alert('สำเร็จ')

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

//


office.GetUserDetails = function (dataid) {
    // $("#from_edu").show();

    $("#model1_details").modal();
    // // var dataid = $("#dataid").val();
    // var DataSet = {
    //     table: 'settime_report',
    //     where: {
    //         id: dataid,
    //     }
    // };
    // //console.log(DataSet);
    // $.ajax({
    //     url: office.url + '?mode=LoadOneRow',
    //     type: 'POST',
    //     dataType: 'json',
    //     data: DataSet,
    //     beforeSend: function () {
    //         $("#modalLoading").show();
    //     },
    //     success: function (result, status, xhr) {

    //         console.log(result);
    //        // $("#year_course_e").val(result.year_course);



    //     },
    //     complete: function () {
    //         $("#modalLoading").hide();
    //     },
    //     error: function (xhr, status, error) {
    //         console.log('Please check scripts GetOrgSubUnit');
    //         console.log(xhr);
    //         duck.NotiDanger();
    //     }
    // });
};

office.GetUserUpdateStatus = function (dataid) {
    // $("#from_edu").show();

    $("#model1_updatestatus").modal();
    // // var dataid = $("#dataid").val();
    // var DataSet = {
    //     table: 'settime_report',
    //     where: {
    //         id: dataid,
    //     }
    // };
    // //console.log(DataSet);
    // $.ajax({
    //     url: office.url + '?mode=LoadOneRow',
    //     type: 'POST',
    //     dataType: 'json',
    //     data: DataSet,
    //     beforeSend: function () {
    //         $("#modalLoading").show();
    //     },
    //     success: function (result, status, xhr) {

    //         console.log(result);
    //        // $("#year_course_e").val(result.year_course);



    //     },
    //     complete: function () {
    //         $("#modalLoading").hide();
    //     },
    //     error: function (xhr, status, error) {
    //         console.log('Please check scripts GetOrgSubUnit');
    //         console.log(xhr);
    //         duck.NotiDanger();
    //     }
    // });
};
office.GetUserEditPass = function (dataid) {
    // $("#from_edu").show();

    $("#model1_updatepass").modal();

};

/////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {


    if (!localStorage.numperpage) {
        localStorage.numperpage = 10;
    }
    localStorage.numperpage = 10;



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

    //alert(office.path);

});

////////////////////          END office Script         ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
