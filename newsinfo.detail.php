<?php 
include("inc.head.php");
include("inc.header.php");

    $newsid = $_REQUEST['gNif'];

     $newsid;

    if($newsid=='7TxgoGN1'){
        $headtitle = 'ASA ARCHITECTURAL DESIGN AWARDS 2022 <br> TPFC INTERNATIONAL CO.,LTD.';
        $contents = 'สมาคมสถาปนิกสยาม ในพระบรมราชูปถัมภ์ ได้จัดโครงการประกวด
                    งานสถาปัตยกรรมดีเด่น ประจำปี 2565 
                    เพื่อสนับสนุนและส่งเสริมการสร้างสรรค์ผลงาน
                    ออกแบบสถาปัตยกรรมที่มีคุณภาพดีเยี่ยม ซึ่งมีคุณค่าต่อผู้คน สภาพแวดล้อม
                    และสังคม อีกทั้งยังเป็นการเผยแพร่ผลงานออกแบบสถาปัตยกรรมสู่สาธารณชนอีกด้วย
                    <br> <br>
                    ซึ่งในครั้งนี้ทางบริษัท ที.พี.เอฟ.ซี. อินเตอร์เนชั่นแนล จำกัด ได้ส่งผลงานออกแบบ
                    โครงการที่ดำเนินการก่อสร้าง
                    แล้วเสร็จ คือ อาคารกิติยาคาร มหาวิทยาลัยธรรมศาสตร์
                    ศูนย์รังสิต เข้าร่วมประกวดและเผยแพร่ผลงานสู่สาธารณชน';

        $filepdf = '1';
        $imgGalCount = '12';
        $imgPathGal = 'n1/ImgNews01_0';

    }
    else if($newsid=='7TxgoGN2'){
        $headtitle = 'งานฉลองปีใหม่ 2022 TPFC';
        $contents = '';

        $filepdf = '0';
        $imgGalCount = '15'; 
        $imgPathGal = 'n2/ImgNews02_0';

    }
    else if($newsid=='7TxgoGN3'){
        $headtitle = 'งานครบรอบ 25 ปี บริษัท';
        $contents = '';

        $filepdf = '0';
        // $imgGalCount = '15';
        $imgGalCount = '12';
        $imgPathGal = 'n3/ImgNews03_0';

    }
    else{


    }

?>

   

    <div class="flat-slider style1">
        
        <div class="rev_slider_wrapper fullwidthbanner-container">
            <div id="rev-slider1" class="rev_slider fullwidthabanner">
                <ul>

                <?php if($newsid=='7TxgoGN1'){ ?>
                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n1/banner/Banner_NewsInfo_N01_01.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n1/banner/Banner_NewsInfo_N01_02.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n1/banner/Banner_NewsInfo_N01_03.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n1/banner/Banner_NewsInfo_N01_04.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n1/banner/Banner_NewsInfo_N01_05.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>
                <?php } ?>


                <?php if($newsid=='7TxgoGN2'){ ?>
                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n2/banner/Banner_NewsInfo_N02_01.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n2/banner/Banner_NewsInfo_N02_02.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n2/banner/Banner_NewsInfo_N02_03.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n2/banner/Banner_NewsInfo_N02_04.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n2/banner/Banner_NewsInfo_N02_05.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>
                <?php } ?>


                <?php if($newsid=='7TxgoGN3'){ ?>
                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n3/banner/Banner_NewsInfo_N03_01.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n3/banner/Banner_NewsInfo_N03_02.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n3/banner/Banner_NewsInfo_N03_03.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n3/banner/Banner_NewsInfo_N03_04.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>

                    <li data-transition="random">
                    <img src="/img/newinfo/uploadG/n3/banner/Banner_NewsInfo_N03_05.jpg" alt="" data-bgposition="center center" data-no-retina>
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
                    data-responsive_offset="on"> <a href="#" class="text-white">“COMMITMENT <br> TO EXCELLENCE” </a> </div>
                    </li>
                <?php } ?>
                   



                </ul>
            </div>
        </div>
    </div>

    <section class="flat-row flat-introduce ">
        <div class="container" >
            <div class="row">
               
                <div class="col-lg-1 col-md-1 col-12"></div>
                <div class="col-lg-10 col-md-10 col-12">
                    <div class="text-center">
                        <p class="htitle-newinfo"> <?php echo $headtitle; ?></p>
                      
                    </div>
                </div>
                <div class="col-lg-1 col-md-1 col-12"></div>
               
              

               
            </div>  

            <?php if( $contents){ ?>
                <div class="row pd-t2">
                
                    <div class="col-lg-1 col-md-1 col-12"></div>
                    <div class="col-lg-10 col-md-10 col-12">
                        <div class="newinfo-dtxt">
                                <?php echo $contents; ?>
                        </div>
                    
                    </div>
                    <div class="col-lg-1 col-md-1 col-12"></div>
                </div>  
            <?php } ?>

            <?php if( $filepdf=='1'){ ?>
                <div class="row pdtop-3">
                    <div class="col-lg-1 col-md-1 col-12"></div>
                    <div class="col-lg-10 col-md-10 col-12">

                        <p class="dl-title"> Download</p>
                        <!-- <i class="fa-light fa-file-arrow-down"></i> -->


                        <div class="col-lg-6 col-md-6 col-12">
                        
                            <div class="boxlink-pdf row"> 
                          
                                <a class="link-pdf" href="/pdffile/TU-HALL_20200918_LA-CONCEPT_Draft.pdf" target="blank"> 

                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                                            <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                        </svg>
                                    </div>
                                <div>
                                    &nbsp;TU-HALL_20200918_LA-CONCEPT </a>
                                 </div>
                            </div>
                        
                        </div>
                    </div>
                    <div class="col-lg-1 col-md-1 col-12"></div>
                

                </div>
            <?php } ?>
        </div> 
    </section> 

 


<!-- <div class="img-resize"><img  src="/img/newinfo/uploadG/ImgNews01_01.jpg" /></div>
<div class="img-resize"><img src="/img/newinfo/uploadG/ImgNews01_02.jpg" /></div> -->

    <div class="content-wrap main-service-detail bg-grey">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-sm-12">
                        <div class="wrap-service-detail pd-top-80"> 
                            <div class="image-rallary mg-bottom-45">
                                <div class="themesflat-gallery  style-2 has-arrows arrow-center arrow-circle offset-v-82 has-thumb w170 snewinfo clearfix text-center" data-gap="0" data-column="1" data-column2="1" data-column3="1" data-auto="false">
                                    <div class="owl-carousel owl-theme">
                                        <?php 

                                        for ($x = 1; $x <= $imgGalCount; $x++) {
                                           // echo $x;
                                        ?>
                                        <div class="gallery-item" >
                                            <div class="inner">
                                                <div class="thumb img-resize">
                                                    <?php //echo $x; ?>
                                                    <img src="/img/newinfo/uploadG/<?php echo $imgPathGal.$x; ?>.jpg" alt="Image" class="img-slidenewinfo">
                                                </div>
                                            </div>
                                        </div>
                                        <?php } 
                                        
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
            $("li.nav-newinfo").addClass("active");
            
        });
    </script>