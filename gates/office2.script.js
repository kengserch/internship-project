/////////////////////////////////////////////////////////////////////////////////////
////////////////////           office   Script          ///////////////////////////
var office2 = {
    url: '../gates/office2.inc.php',
    path: 'http://' + window.location.host
};

//////////////////////////////////////////////////////////////////////////////////////////////////
office2.callModalAdd = function(FuncName, table) {

    //alert(FuncName);
    var btn_add = '<button type="button" class="btn btn-success" onclick="' + FuncName + '();"> <i class="fa fa-save"> </i> ยืนยันการเพิ่มข้อมูล </button>';
    $("#btn_add").html(btn_add);

    $('#modal_add').modal('show');
};

office2.callModalEdit = function(FuncName, table, table_id, detail) {

    //$("#txt_mo_name").html(detail);

    var btn_edit = '<button type="button" class="btn btn-warning" onclick="' + FuncName + '();"> <i class="fa fa-trash"> </i> ยืนยันการแก้ไข </button>';
    $("#btn_edit").html(btn_edit);

    $('#modal_edit').modal('show');
};

office2.callModalDelete = function(table, table_id, detail, link) {


    $("#txt_mo_name").html("ต้องการยืนยันการลบข้อมูล " + detail);

    var btn_delete = '<button type="button" class="btn btn-danger" onclick="office2.callDelete(\'' + table + '\',\'' + table_id + '\',\'' + link + '\');"> <i class="fa fa-trash"> </i> ยืนยัน </button>';
    $("#btn_delete").html(btn_delete);

    $('#modal_delete').modal('show');
};

office2.callModalDisable = function(table, table_id, detail, link) {


    $("#txt_detail_dis").html("ต้องการยืนยันการลบข้อมูล " + detail);

    var btn_disable = '<button type="button" class="btn btn-danger" onclick="office2.callDisable(\'' + table + '\',\'' + table_id + '\',\'' + link + '\');"> <i class="fa fa-trash"> </i> ยืนยัน </button>';
    $("#btn_disable").html(btn_disable);

    $('#modal_disable').modal('show');
};


office2.callModalDeleteTruly = function(table, table_id, detail) {
    $("#txt_mo_name").html(detail);

    var btn_delete = '<button type="button" class="btn btn-danger" onclick="office2.callDeleteTruly(\'' + table + '\',\'' + table_id + '\');"> <i class="fa fa-trash"> </i> ยืนยันการลบ </button>';
    $("#btn_delete").html(btn_delete);

    $('#modal_delete').modal('show');
};

office2.callDelete = function(table, table_id, link) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {
            $('#modal_delete').modal('hide');
        },
        success: function(data) {
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
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callDelete');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office2.callDisable = function(table, table_id, link) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {
            $('#modal_delete').modal('hide');
        },
        success: function(data) {
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
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callDelete');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office2.callDelete_EX = function(table, table_id, id_name, status_name, link) {
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
        url: office2.url + '?mode=StatusDataSetEX',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
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
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callDelete');
            console.log(data);
            duck.NotiDanger();
        }
    });


};

office2.callDeleteTruly = function(table, table_id) {

    var DataSet = {
        table: table,
        where: { id: table_id }
    };
    //console.log(DataSet);

    $.ajax({
        url: office2.url + '?mode=DeleteDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {
            $('#modal_delete').modal('hide');
        },
        success: function(data) {
            //console.log(data);

            if (data.success == "COMPLETE") {
                alert("ลบรายการสำเร็จ");
                window.location.reload();;

            } else {
                alert("ลบรายการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");

            }

        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callDelete');
            console.log(data);
        }
    });


};


office2.callSetEnable = function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetEnable');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office2.callSetEnableW=function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetEnableWeb');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office2.callSetEnableM=function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetEnableMobile');
            console.log(data);
            duck.NotiDanger();
        }
    });
};



office2.callSetEnableWM=function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetEnable');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office2.callSetEnableTH = function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetEnableTH');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office2.callSetEnableEN = function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetEnableEN');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


office2.callSetEnableDept = function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetEnableDept');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office2.callSetEnableOffice = function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess();

            } else {
                //	duck.ModalWShow();
                duck.NotiWarning();
            }
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetEnableOffice');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office2.callSetDisplay = function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
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
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetDisplay');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office2.callSetDisplayLevel=function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess(); 
            } else { 
                duck.NotiWarning();
            } 
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetDisplayLevel');
            console.log(data);
            duck.NotiDanger();
        }
    });
};


office2.callSetDisplayHeader=function(table_name, table_id, refto) {
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
        url: office2.url + '?mode=EditDataSet',
        type: 'POST',
        dataType: 'json',
        data: DataSet,
        beforeSend: function() {},
        success: function(data) {
            if (data.success == "COMPLETE") {
                duck.NotiSuccess(); 
            } else { 
                duck.NotiWarning();
            } 
        },
        complete: function() {},
        error: function(data) {
            console.log('Please check scripts callSetDisplayHeader');
            console.log(data);
            duck.NotiDanger();
        }
    });
};

office2.LoadProvince = function(v_val, element_id) {
    if (v_val) {
        //		alert(v_val);
    }
    var exDat = {
        table: "provinces",
        where: { enable: "Y" },
        orderby: " CONVERT (   provincesname_th  USING tis620 ) ASC ",
        limit: "",
    };

    $.ajax({
        url: office2.url + '?mode=LoadAllData',
        type: 'POST',
        dataType: 'json',
        data: exDat,
        success: function(data) {
            //console.log(data);
            $('#' + element_id).find('option').remove()
            $('<option>').attr('value', '').text("กรุณาเลือกจังหวัด").appendTo('#' + element_id);
            $.each(data, function(i, result) {
                if (result.id == v_val) {
                    $(".select2-chosen").text(result.provincesname_th);
                    $('<option>').attr('value', result.id).attr('selected', 'selected').text(result.provincesname_th).appendTo('#' + element_id);
                } else {
                    $('<option>').attr('value', result.id).text(result.provincesname_th).appendTo('#' + element_id);
                }
            });

        },
        error: function(data) {
            console.log(data);
            console.log('check LoadProvince');
            duck.NotiDanger();
        }
    });

};


office2.SetFrom = function(action, data_id) {

    $('#data_id').val(data_id);
    $('#action').val(action);

    $("#form_set").submit();
};


office2.SetFromAction = function(action, data_id, actionlink) {
    $("#form_set").attr("action", actionlink);
    $('#data_id').val(data_id);
    $('#action').val(action);

    $("#form_set").submit();
};
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
 
/////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
 

});

////////////////////          END office2 Script         ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
