<?php 
include("inc.head.php");
include("inc.header.php");

$clscont = new ContentsClass();

$opjid = $_REQUEST['oPJ'];
$decode = base64_decode( $opjid ); 
$decode_sub = substr($decode,6);

$dataid = $decode_sub;

$op_data = $clscont->LoadOnce('ourproject', array('id'=>$dataid));

//echo $decode;

if($opjid){
    $gid = $op_data['project_groubid'];
    $hproject = $op_data['project_name'];
    $details = $op_data['details_scope']; 

    $optype = 'MASTER PLANNING, DESIGN MANAGEMENT, CONSTRUCTION SUPERVISION';
    $li_1 = $op_data['owner_project']; 
    $li_2 = $op_data['construction_site']; 
    $li_3 = $op_data['area_used']; 
    $li_4 = $op_data['cost_project']; 
    $li_5 = $op_data['period_day']; 

    $pathwork = $clscont->LoadOnce('project_group', array('id'=>$gid));


    $imgmain = 'img/'.$pathwork['docpath'].'/ImgGal/op'.$op_data['id'].'/'.$op_data['img_hdetail'];


    $img_gal = $clscont->Load('ourproject_gallery', array('ourproject_id'=>$dataid,'deleted'=>0,'enable'=>'Y'),'orderby ASC','');
    $imgGalCount = count($img_gal);
    $imgPathGal = 'img/'.$pathwork['docpath'].'/ImgGal/op'.$op_data['id'].'/';

   
    $pathbanner = 'img/'.$pathwork['docpath'].'/banner/op'.$op_data['id'].'/';
    $banner = $clscont->Load('ourproject_banner', array('ourproject_id'=>$dataid,'deleted'=>0,'enable'=>'Y'),'','');


}

//echo $opjid;


// if($opjid=='9xEtpdGOP1'){
//     $type = 'work';
//     $hproject = 'โครงการก่อสร้างอาคารศูนย์พัฒนาสมรรถภาพและการเรียนรู้ สถาบันการบินพลเรือนกรุงเทพมหานคร  ';
//     $details = 'งานก่อสร้างอาคารสูง 4 ชั้น มีชั้น Half Basement มีลิฟต์โดยสาร 1 ชุด พร้อมครภัณฑ์ ฟังก์ชั่นการใช้งานหลักประกอบด้วย 
//     สนามกีฬาในร่มขนาดมาตรฐาน ได้แก่ สนามฟุตซอล, สนามบาสเกตบอลและสนามวอลเลย์บอล และสามารถปรับรูปแบบการใช้งานเป็นพื้นที่เอนกประสงค์ 
//     มีพื้นที่สำหรับพัฒนาสมรรถภาพร่างกาย เช่น ห้อง Fitness พร้อมห้องน้ำ Locker ชาย-หญิง มีส่วนกลางสำหรับใช้งานร่วมกันและสโมสรนักศึกษา ชมรมต่างๆ 
//     รวมถึงพื้นที่แผนกกิจการนักศึกษา เช่น ห้องประชุม ห้องสัมมนา โถงเอนกประสงค์
//     ' ;
//     $optype = 'MASTER PLANNING, DESIGN MANAGEMENT, CONSTRUCTION SUPERVISION';
//     $li_1 = 'สถาบันการบินพลเรือน';
//     $li_2 = 'สถาบันการบินพลเรือน กรุงเทพมหานคร ';
//     $li_3 = ' 7,690 ตารางเมตร ';
//     $li_4 = '206.9 ล้านบาท';
//     $li_5 = '540 วัน';
//     $imgmain = '/img/workinprogress/ImgGal/op1/ImgPJ_WIP_01.jpg';
//     $imgGalCount = '15';
//     $imgPathGal = '/img/workinprogress/ImgGal/op1/ImgPJ_WIP_0';

//     $imgBanner = '4';
//     $pathname = '/img/workinprogress/banner/op1/BannerPJ01_WIP_0';


// }else if($opjid=='9xEtpdGOP2'){

//     $type = 'work';
//     $hproject = 'โครงการก่อสร้างอาคารผู้ป่วยนอกด้านรังสีวิทยา และห้องปฏิบัติการ (อาคารชวนชูชาติ วพน.7)';
//     $details = 'งานก่อสร้างอาคารสูง 3 ชั้น มีชั้นดาดฟ้า และมีลิฟต์โดยสาร 2 ชุด
//      พร้อมครุภัณฑ์ เพื่อใช้เป็นศูนย์บริการผู้ป่วยนอกด้านรังสีวิทยาและห้องปฏิบัติการ รวมทั้งสถานที่รักษาพยาบาล และสถานที่สนับสนุนต่างๆ อาทิ 
//      พื้นที่กำหนดจำนวนเตียงที่จะรับผู้ป่วยฉุกเฉิน จำนวนเวชภัณฑ์ที่เหมาะสมกับผู้ป่วย ห้องพักเวรพยาบาล แพทย์ รวมทั้งห้อง X-ray ห้องผ่าตัดเฉพาะแผนก 
//      มีองค์ประกอบหลักของโครงการ คือ ศูนย์รังสีวิทยา ห้องปฏิบัติการ พื้นที่ส่วนกลาง ชั้น 1 ชั้น 2 และห้องเครื่องคลินิกตรวจสุขภาพประจำปี (Check Up) 
//      ส่วนพื้นที่ Premium OPD ศูนย์ผิวหนังและความงาม ศูนย์พัฒนาเด็กและวัยรุ่น ศูนย์ล้างไตและห้องทางการแพทย์' ;
//     $optype = 'MASTER PLANNING, DESIGN MANAGEMENT, CONSTRUCTION SUPERVISION';
//     $li_1 = 'มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ';
//     $li_2 = 'โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ มธ.ศูนย์รังสิต ตำบลคลองหนึ่ง  อำเภอคลองหลวง จังหวัดปทุมธานี';
//     $li_3 = '8,443 ตารางเมตร';
//     $li_4 = '264.9 ล้านบาท';
//     $li_5 = '540 วัน';
  
//     $imgBanner = '3';
//     $pathname = '/img/workinprogress/banner/op2/BannerPJ02_WIP_0';

//     $imgmain = '/img/workinprogress/ImgGal/op2/ImgPJ02_WIP_01.jpg';
//     $imgGalCount = '15';
//     $imgPathGal = '/img/workinprogress/ImgGal/op2/ImgPJ02_WIP_0';



// }

// else if($opjid=='9xEtpdGOP3'){

//     $type = 'work';
//     $hproject = 'โครงการก่อสร้างอาคารศูนย์การแพทย์ธรรมศาสตร์ โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ';
//     $details = 'งานก่อสร้างอาคารสูง 10 ชั้น มีชั้นใต้ดิน 1 ชั้นและชั้นดาดฟ้า มีที่จอดรถรวม 210 คัน มีลิฟต์โดยสาร 6 ชุด พร้อมครุภัณฑ์
//     โดยเป็นโรงพยาบาลระดับตติยภูมิชั้นสูงที่มีศักยภาพในการให้การรักษาได้ครบวงจรทุกสาขาวิชา ให้บริการทั้งผู้ป่วยใน นอก ฉุกเฉิน 
//     ทั้งเป็นสถาบันการเรียนการสอน การวิจัย การฝึกปฏิบัติของนักศึกษาจากคณะแพทย์ศาสตร์ รวมถึงนักศึกษาจากคณะวิทยาศาสตร์สุขภาพอื่นๆ 
//     อีกทั้งยังเป็นโรงพยาบาลระดับปฐมภูมิ สถานพยาบาลประจำ สถานพยาบาลรับส่งต่อภายใต้โครงการประกันสุขภาพถ้วนหน้าและสำนักงานประกันสังคม 
//     ขีดการให้บริการผู้ป่วยนอกวันละประมาณ 2-3 พันคน และผู้ป่วยใน 574 เตียง และมีแผนปรับปรุงเพิ่มเป็น 750 เตียง โดยมุ่งหมายเป็นโรงพยาบาลชั้นนำของประเทศ
//     ' ;
//     $optype = 'PROJECT MANAGEMENT, MASTER PLANNING, DESIGN MANAGEMENT, CONSTRUCTION SUPERVISION';
//     $li_1 = 'มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ';
//     $li_2 = 'โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ มธ.ศูนย์รังสิต ตำบลคลองหนึ่ง  อำเภอคลองหลวง จังหวัดปทุมธานี';
//     $li_3 = '53,965 ตารางเมตร';
//     $li_4 = '2,269.38 ล้านบาท';
//     $li_5 = '1,500 วัน';
  
//     $imgBanner = '4';
//     $pathname = '/img/workinprogress/banner/op3/BannerPJ03_WIP_0';

//     $imgmain = '/img/workinprogress/ImgGal/op3/ImgPJ03_WIP_01.jpg';
//     $imgGalCount = '15';
//     $imgPathGal = '/img/workinprogress/ImgGal/op3/ImgPJ03_WIP_0';



// }

// else if($opjid=='9xEtpdGOP4'){

//     $type = 'work';
//     $hproject = 'โครงการก่อสร้างและตกแต่งภายในอาคารสำนักงาน กสทช. แห่งใหม่';
//     $details = 'งานก่อสร้างกลุ่มอาคาร 8 หลัง
//      ใช้ในการบริหารกิจการของกสทช. ประกอบด้วย
//         1) อาคารสูง 10 ชั้น รวมชั้นดาดฟ้า ใช้เป็นสำนักงานใหญ่ (อาคาร A)  
//         2) อาคารสูง 5 ชั้น รวมชั้นดาดฟ้า ใช้เป็นพิพิธภัณฑ์และห้องสมุด (อาคาร B)  
//         3) อาคารสูง 7 ชั้น รวมชั้นดาดฟ้า ใช้เป็นศูนย์บริการและศูนย์ประชุม (อาคาร C)  
//         4) อาคารสูง 11 ชั้น รวมชั้นดาดฟ้า ใช้เป็นอาคารจอดรถ (อาคาร D)  
//         5) อาคารสูง 2 ชั้นทรงกลม ใช้เป็นอาคารแถงข่าว (อาคาร D)  
//         6) อาคารสูง 5 ชั้น รวมดาดฟ้า ใช้เป็นอาคารสโมสร (อาคาร F) 
//         7) อาคารสูง 5 ชั้น ใช้เป็นอาคารคลังเอกสารและห้องปฏิบัติการ (อาคาร G) 
//          8) อาคารสูง 2 ชั้น ใช้เป็นอาคารจอดรถบุคคลภายนอก (อาคาร H) ทั้งยังรวมถึงงานลานสนามและพื้นที่เอนกประสงค์อีก 3 พื้นที่ ' ;
//     $optype = 'PROJECT MANAGEMENT, CONSTRUCTION SUPERVISION';
//     $li_1 = 'สำนักงาน กสทช.';
//     $li_2 = 'สำนักงานคณะกรรมการกิจการกระจายเสียง กิจการ โทรทัศน์และกิจการโทรคมนาคมแห่งชาติ (สำนักงาน กสทช.) แขวงสามเสนใน เขตพญาไท กรุงเทพมหานคร';
//     $li_3 = '123,515 ตารางเมตร';
//     $li_4 = '2,643 ล้านบาท';
//     $li_5 = '1,919 วัน';
  
//     $imgBanner = '4';
//     $pathname = '/img/workinprogress/banner/op4/BannerPJ04_WIP_0';

//     $imgmain = '/img/workinprogress/ImgGal/op4/ImgPJ04_WIP_01.jpg';
//     $imgGalCount = '10';
//     $imgPathGal = '/img/workinprogress/ImgGal/op4/ImgPJ04_WIP_0';



// }else{
//     $type = 'work';
//     $hproject = 'โครงการก่อสร้างอาคารศูนย์พัฒนาสมรรถภาพและการเรียนรู้ สถาบันการบินพลเรือนกรุงเทพมหานคร  ';
//     $details = 'งานก่อสร้างอาคารสูง 4 ชั้น มีชั้น Half Basement มีลิฟต์โดยสาร 1 ชุด พร้อมครภัณฑ์ ฟังก์ชั่นการใช้งานหลักประกอบด้วย 
//     สนามกีฬาในร่มขนาดมาตรฐาน ได้แก่ สนามฟุตซอล, สนามบาสเกตบอลและสนามวอลเลย์บอล และสามารถปรับรูปแบบการใช้งานเป็นพื้นที่เอนกประสงค์ 
//     มีพื้นที่สำหรับพัฒนาสมรรถภาพร่างกาย เช่น ห้อง Fitness พร้อมห้องน้ำ Locker ชาย-หญิง มีส่วนกลางสำหรับใช้งานร่วมกันและสโมสรนักศึกษา ชมรมต่างๆ 
//     รวมถึงพื้นที่แผนกกิจการนักศึกษา เช่น ห้องประชุม ห้องสัมมนา โถงเอนกประสงค์
//     ' ;
//     $optype = 'MASTER PLANNING, DESIGN MANAGEMENT, CONSTRUCTION SUPERVISION';
//     $li_1 = 'สถาบันการบินพลเรือน';
//     $li_2 = 'สถาบันการบินพลเรือน กรุงเทพมหานคร ';
//     $li_3 = ' 7,690 ตารางเมตร ';
//     $li_4 = '206.9 ล้านบาท';
//     $li_5 = '540 วัน';
//     $imgmain = '/img/workinprogress/ImgGal/op1/ImgPJ_WIP_01.jpg';
//     $imgGalCount = '10';
//     $imgPathGal = '/img/workinprogress/ImgGal/op1/ImgPJ_WIP_0';

//     $imgBanner = '4';
//     $pathname = '/img/workinprogress/banner/op1/BannerPJ01_WIP_0';
// }


?>

   
  
    <div class="flat-slider style1">
        
        <div class="rev_slider_wrapper fullwidthbanner-container">
            <div id="rev-slider1" class="rev_slider fullwidthabanner">
                <ul>

                <?php 

              
                if($banner){
                    foreach($banner as $kb1 => $b1 ) { 
                        $chkpath = $pathbanner.$b1['file_path'];
                                            if( file_exists( $chkpath) ){
                    //echo $x;
                ?>

                         <li data-transition="random">
                            <img src="<?php echo $pathbanner.$b1['file_path'];?>" alt="" data-bgposition="center center" data-no-retina>
                            <div class=""></div>
                            <div class="tp-caption tp-resizeme font-rubik font-weight-700 center-mobile"
                            data-x="['left','left','left','center']" data-hoffset="['-2','-2','-2','0']"
                            data-y="['middle','middle','middle','middle']" data-voffset="['-52','-52','-52','-72']"
                            data-fontsize="['60','60','40','32']"
                            data-lineheight="['80','80','45','28']"
                            data-width="full"
                            data-height="none"
                            data-whitespace="normal"
                            data-transform_idle="o:1;"
                            data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;" 
                            data-transform_out="y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;"
                            data-mask_in="x:0px;y:[100%];" 
                            data-mask_out="x:inherit;y:inherit;" 
                            data-start="1000" 
                            data-splitin="none" 
                            data-splitout="none" 
                            data-responsive_offset="on"> <a  class="text-white"><?php echo $b1['text_banner'];?> </a> </div>
                        </li>
                    <?php
                        } 
                    }
                } ?>

                      
                   
                </ul>
            </div>
        </div>
    </div>

  

    <section class="flat-row flat-introduce ">
        <div class="container" >
            <div class="row">
                <div class="col-lg-2 col-md-2 col-12"></div>
                <div class="col-lg-8 col-md-8 col-12">
                    <div class="text-center">
                        <p class="htitle-pjour"> <?php echo $hproject; ?></p>
                        <hr class="border-txt">
                        <p class="stitle-pj"> 
                           <?php //echo $optype;
                           $_array = explode(',', $op_data['project_type']);
                           foreach($_array as $id){
                               //echo  $id ;
                                $prg_type = $clscont->LoadOnce('project_type', array('id'=>$id));
                                $opname = strtoupper($prg_type['p_typename']);
                                $op_type = $opname.', ';
                                $typedata .= $op_type;

                           }
                           
                           $string_ptpye = $typedata;
                           $ourproj_type = substr($string_ptpye,0,-2);
                           echo $ourproj_type;
                           
                           ?>
                        </p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-12"></div>

              
            </div>  

        </div> 
    </section> 

 

    <div class="pd-bt5">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-lg-7 col-md-7 col-12">
                            <div class="" >
                                    <article class="">
                                        <div class="feature-post">
                                            <img src="<?php echo $imgmain ; ?>" alt="standell" >
                                        </div>
                                    
                                    
                                    
                                    </article>
                                    <div class="clearfix"></div>
                                </div>

                            </div>
                        <div class="col-lg-5 col-md-5 col-12">
                            <div class="box-list1">
                                <div class=" ">
                                    <div class="title-link">
                                        <p class="pjd-title">รายละเอียดโครงการ</p>
                                    </div>
                                    
                                            <div class="row bx-oplist"> 
                                                <div class="col-lg-5 col-md-5 col-12">
                                                    <span class="orange-txt "> <i class="fa fa-check-circle fs-20"></i>     </span> 
                                                    <span class="op-hbox"> เจ้าของ : </span>
                                                </div>
                                                <div class="col-lg-7 col-md-7 col-12">
                                                        <p class="op-hbox-txt"> <?php echo $li_1; ?> </p>
                                                </div>


                                            </div>

                                            <div class="row bx-oplist"> 
                                                <div class="col-lg-5 col-md-5 col-12">
                                                    <span class="orange-txt "> <i class="fa fa-check-circle fs-20"></i>     </span> 
                                                    <span class="op-hbox"> สถานที่ก่อสร้าง : </span>
                                                </div>
                                                <div class="col-lg-7 col-md-7 col-12">
                                                    <p class="op-hbox-txt">  <?php echo $li_2; ?> </p>
                                                </div>
                                            </div>

                                            <div class="row bx-oplist"> 
                                                <div class="col-lg-5 col-md-5 col-12">
                                                    <span class="orange-txt "> <i class="fa fa-check-circle fs-20"></i>     </span> 
                                                    <span class="op-hbox"> พื้นที่ใช้สอย : </span>
                                                </div>
                                                <div class="col-lg-7 col-md-7 col-12">
                                                    <p class="op-hbox-txt">  <?php echo $li_3; ?> </p>
                                                </div>
                                            </div>

                                            <div class="row bx-oplist"> 
                                                <div class="col-lg-5 col-md-5 col-12">
                                                    <span class="orange-txt "> <i class="fa fa-check-circle fs-20"></i>     </span> 
                                                    <span class="op-hbox">  มูลค่าโครงการ : </span>
                                                </div>
                                                <div class="col-lg-7 col-md-7 col-12">
                                                    <p class="op-hbox-txt">  <?php echo $li_4; ?> </p>
                                                </div>
                                            </div>

                                            <div class="row bx-oplist2"> 
                                                <div class="col-lg-5 col-md-5 col-12">
                                                    <span class="orange-txt "> <i class="fa fa-check-circle fs-20"></i>     </span> 
                                                    <span class="op-hbox"> ระยะเวลาก่อสร้าง : </span>
                                                </div>
                                                <div class="col-lg-7 col-md-7 col-12">
                                                    <p class="op-hbox-txt">  <?php echo $li_5; ?> </p>
                                                </div>
                                            </div>
                                     
                                </div>
                                
                            </div>

                            <hr class="endlist">
                            <div class="our-detail pdtop-3">
                                    <div class="title-link">
                                        <p class="pjd-title">ขอบเขตงาน</p>
                                        <p class="pjd-detail">
                                            <?php echo $details ; ?>
                                        

                                        </p>
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="content-wrap main-service-detail bg-grey">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-sm-12">
                        <div class="wrap-service-detail pd-top-80"> 
                            <div class="image-rallary mg-bottom-45">
                                <div class="themesflat-gallery  style-2 has-arrows arrow-center arrow-circle offset-v-82 has-thumb w170 sop  clearfix text-center" data-gap="0" data-column="1" data-column2="1" data-column3="1" data-auto="false">
                                <div class="owl-carousel owl-theme">
                                        <?php 

                                        if($img_gal){
                                        foreach($img_gal as $k1 => $v1 ) { 
                                            //echo $x;
                                            $pathfile = $imgPathGal.$v1['img_path'];
                                            if( file_exists( $pathfile) ){
                                            //    echo '1';
                                            // else{
                                            //     echo '0';
                                            // }
                                        ?>
                                        <div class="gallery-item" >
                                            <div class="inner">
                                                <div class="thumb img-resize">
                                                    <?php //echo $x; ?>
                                                    <img src="<?php echo $imgPathGal.$v1['img_path']; ?>" alt="Image" class="img-slidenewinfo">
                                                </div>
                                            </div>
                                        </div>
                                        <?php 
                                                }   //ecd checkpath
                                            } 
                                        }
                                        
                                        ?>
                                      

                                       

                                    </div>
                                </div><!-- /.themesflat-cousel-box -->
                            </div>
                           
                        </div> 
                    </div> <!-- /.wrap-project-detail -->
                </div> <!-- /.col-md-8 -->
            </div>
        </div>
    </div> <!-- /.content-wrap -->

            <!-- <div class="partner-clients">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="slide-client owl-carousel" data-auto="true" data-item="5" data-nav="false" data-dots="false">
                                <div class="client">
                                    <a href="#">
                                        <img src="/img/portfolio/p1.jpg"  alt="standell">
                                        <img src="/img/portfolio/p1.jpg" alt="standell">
                                    </a>
                                </div>
                                <div class="client ">
                                    <a href="#" >
                                        <img src="/img/portfolio/p2.jpg" alt="standell">
                                        <img src="/img/portfolio/p2.jpg" alt="standell">
                                    </a>
                                </div>
                                <div class="client">
                                    <a href="#">
                                        <img src="/img/portfolio/p3.jpg"  alt="standell">
                                        <img src="/img/portfolio/p3.jpg" alt="standell">
                                    </a>
                                </div>
                                <div class="client ">
                                    <a href="#" >
                                        <img src="/img/portfolio/p4.jpg" alt="standell">
                                        <img src="/img/portfolio/p4.jpg" alt="standell">
                                    </a>
                                </div>
                                <div class="client">
                                    <a href="#">
                                        <img src="/img/portfolio/p5.jpg"  alt="standell">
                                        <img src="/img/portfolio/p5.jpg" alt="standell">
                                    </a>
                                </div>
                                <div class="client ">
                                    <a href="#" >
                                        <img src="/img/portfolio/p6.jpg" alt="standell">
                                        <img src="/img/portfolio/p6.jpg" alt="standell">
                                    </a>
                                </div>
                             

                            </div>
                        </div>
                    </div>
                </div>
            </div>  -->

     

</body>

</html>
 
<?php include("inc.footer.php");?>
<?php //include("inc.script.php");?>
        <script  src="javascript/jquery.min.js"></script>
        <script   src="javascript/plugins.js"></script>
        <script   src="javascript/bootstrap.min.js"></script>
        <script   src="javascript/flex-slider.min.js"></script>
        <script   src="javascript/jquery-countTo.js"></script>
        <script   src="javascript/equalize.min.js"></script>
        <script   src="javascript/jquery.validate.min.js"></script>
        <script   src="javascript/main.js"></script>


        <!-- Owl carousel js -->
        <script src="javascript/owl.carousel.min.js"></script>
        <script src="javascript/owl.carousel2.thumbs.js"></script>

        <!-- Slider -->
        <script src="rev-slider/js/jquery.themepunch.tools.min.js"></script>
        <script src="rev-slider/js/jquery.themepunch.revolution.min.js"></script>
        <script src="javascript/rev-slider.js"></script>
        <!-- Load Extensions only on Local File Systems ! The following part can be removed on Server for On Demand Loading -->  
        <script src="rev-slider/js/extensions/revolution.extension.actions.min.js"></script>
        <script src="rev-slider/js/extensions/revolution.extension.carousel.min.js"></script>
        <script src="rev-slider/js/extensions/revolution.extension.kenburn.min.js"></script>
        <script src="rev-slider/js/extensions/revolution.extension.layeranimation.min.js"></script>
        <script src="rev-slider/js/extensions/revolution.extension.migration.min.js"></script>
        <script src="rev-slider/js/extensions/revolution.extension.navigation.min.js"></script>
        <script src="rev-slider/js/extensions/revolution.extension.parallax.min.js"></script>
        <script src="rev-slider/js/extensions/revolution.extension.slideanims.min.js"></script>
        <script src="rev-slider/js/extensions/revolution.extension.video.min.js"></script>
    <script type="text/javascript" >
        $(document).ready(function () {
            $("li.nav-ourproject").addClass("active");
            
        });
    </script>