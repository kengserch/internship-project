$(function() {
    // $('.summernote').summernote({
    //     height: 200 ,
    //     toolbar: [ 
    //         ['style', ['bold', 'italic', 'underline', 'clear']],
    //         ['font', ['strikethrough', 'superscript', 'subscript']],
    //         ['fontsize', ['fontsize']],
    //         ['color', ['color']], 
    //         ['height', ['height']] ,
    //         ['Insert', ['table','hr','picture','link','video'] ] ,
    //         ['View', ['codeview']] ,
    //         ['para', ['ul', 'ol', 'paragraph']],
    //         ],
    //     callbacks: {
    //         onImageUpload: function(files) {
    //             for(var i = 0 ; i < files.length ; i++)
    //             {
    //                 sendFile(files[i], $(this));
    //             }
    //         },
    //         onPaste: function (e) {
    //             var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
    //             e.preventDefault();
    //             document.execCommand('insertText', false, bufferText);
    //         }
    //     }	
    // });
});

function sendFile(file, editor) {	
    var path_upload = '../uploads/summernote';
    //console.log(path_upload);
    data = new FormData();
    data.append("file", file);
    data.append("path_upload", path_upload);
    $.ajax({
        data: data,
        type: "POST",
        url: "../gates/UploadTempSummernote.php",
        cache: false,
        contentType: false,
        processData: false,
        success: function(url) {
            console.log(url);
            var title_error = "Unknow" ; 
            var message_error  = "Unknow Error";
            var is_error = false; 
            switch (url)
            { 
                case "Upload Error" :
                    title_error 			= 	'Failed upload to server';
                    message_error 	=	'File upload to server failed , Please try upload again.';
                    is_error = true;
                break;
                case "Invalid File" :
                    title_error 			= 	'Picture not allow';
                    message_error 	=	'Picture extension allow jpg or jpeg only.';
                    is_error = true;
                break;
                case "Not Image File" :
                    title_error 			= 	'Not image file';
                    message_error 	=	'File uploaded is not a image.';
                    is_error = true;
                break;
                case "File too big" :
                    title_error 			= 	'File too big';
                    message_error 	=	'Picture uploaded is too big , Please try another picture.';
                    is_error = true;
                break;
                case "Move File Error" :
                    title_error 			= 	'Error while move file ';
                    message_error 	=	'Server can\'t move upload file , Please try upload again.';
                    is_error = true;
                    break;					
                default :					
                break;		
            }			
                
            if (is_error){
                alert(title_error + " : " + message_error);
            }else{ 
                editor.summernote("insertImage",JSON.parse(url));
            }
        }
    }).fail(function(){
        //console.log('Failed to upload file');
        alert('Failed to upload file');
    });
}