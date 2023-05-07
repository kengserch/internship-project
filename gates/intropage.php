<?php
  	include "prepare_htmlhead.php";

  	$menucode = "INTROPAGE" ;
  	$menucode1 = "INTROPAGE" ;
  	include "../gates/duck.class.php";
	include "../gates/contents.class.php"; 
	include "../gates/office.class.php";
  	include "../gates/func.php";
 
	$clsoffice = new OfficeClass();

	$intropage = $clsoffice->Load('intropage',array('deleted'=>0),' startdate DESC ','');
?>
  <?php include "prepare_navtop.php";?>
  <?php include "prepare_navside.php";?>
  <div class="app-content content">
    <div class="content-wrapper">
		<?php include "prepare_navcont.php";?>
	
		<?php  //echo "<pre>".print_r($progprevType,true)."</pre>" ;?>
		<div class="content-detached">
			<div class="content-body">

				<section class="row">
				<div class="col-12">
				  <div class="card">
					<div class="card-head">
					  <div class="card-header"> 
							<a href="intropage_create.php"  class="btn btn-info btn-sm"><i class="ft-plus white"></i> เพิ่ม <?php echo $menuname;?> </a>
							<a class="heading-elements-toggle"><i class="la la-ellipsis-h font-medium-3"></i></a>
							<div class="heading-elements">
							</div>
					  </div>
					</div>
					<div class="card-content">
					  <div class="card-body"> 
							<div class="table-responsive">
								<table id="tbdata1" class="table table-xs table-white-space  table-middle table-hover">
									<thead class="bg_custom">
										<tr>
											<th class="text-left"> ลำดับ </th>
                                            <th> รูปภาพ/HTML Page </th>
											<th> ชื่อ Intropage  </th> 
											<th class="text-center"> วันที่แสดงผล </th>     
											<!-- <th class="text-center"> การแสดงผล </th>      -->
											<th class="text-center"> Active </th>     
											<th class="text-center"> จัดการข้อมูล </th>
										</tr>
									</thead>
									<tbody>
									<?php 
										if($intropage){  
											foreach($intropage as $key1 => $val1 ) { 
												
											
											
									?>
										<tr>
											<td  class="text-left"> <?php echo $key1+1 ;?> </td>
											<td> 
												<?php
												if($val1['filetype']!="html"){
												?>
													<a href="<?php echo $path['intropage'].$val1['filename'];?>" target="_blank">
														<img src="<?php echo $path['intropage'].$val1['filename'];?>" style="height: 70px;width: 120px;border: 1px solid #d0d0d0;"> 
													</a>
												<?php
												}else if ($val1['filetype']=="html" ){
												?>
													<a href="<?php  echo $path['intropage'].$val1['filename']; ?>" target="_blank"> <i class="fa fa-link"></i> <?php  echo $val1['filename']; ?> </a>
												<?php
												}
												?>
											</td>
										 	<td> <?php echo $val1['title_th']; ?> </td>   
											<td class="text-center"> 
												<?php  echo DateTimeDisplay($val1['startdate'],5); ?> <br>-<br> <?php  echo DateTimeDisplay($val1['enddate'],5); ?>
											</td> 
											<!-- <td class="text-center"> 
												<fieldset>
													<input type="checkbox" class="switchery" data-size="xs" id="enable_w<?php echo $val1['id']?>" data-on-text="On"  data-off-text="Off" data-on-color="success"  <?php if( $val1['enable_w'] == "Y" ){ echo " checked " ; }?>  onchange="office.callSetWed('intropage','<?php echo $val1['id']?>','enable_w');"  />
												</fieldset>  
											</td>  -->
											<td class="text-center"> 
												<fieldset>
													<input type="checkbox" class="switchery" data-size="xs" id="active<?php echo $val1['id']?>" data-on-text="On"  data-off-text="Off" data-on-color="success"  <?php if( $val1['active'] == "Y" ){ echo " checked " ; }?>  onchange="office.callSetIntroPageActive('intropage','<?php echo $val1['id']?>','active');"  />
												</fieldset>  
											</td> 
											<td class="text-center">  
												<a href="javascript:contents.SetFrom('EDIT','<?php echo $val1['id']; ?>');" class="btn btn-icon btn-sm btn-warning" > <i class="fa fa-edit"></i>   </a> 
												<!-- <a href="javascript:contents.SetFrom('EDIT','<?php //echo $val1['id']; ?>');" class="btn btn-icon btn-sm btn-warning" > <i class="fa fa-edit"></i>   </a>  -->
												<a href="javascript:contents.callModalDelete('intropage','<?php echo $val1['id'];?>','<?php echo $val1['title_th']; ?>','intropage.php');" class=" btn btn-icon btn-sm btn-danger"><i class="fa fa-trash"></i>  </a>
												 
											</td> 
										</tr >
									<?php 
											}
										}
									?>
									
									</tbody>
								</table>
								<span class="text-danger"> <small> * การเรียงลำดับแสดงผลจากค่ามากไปน้อย </small> </span>
								<form id="form_set" method="post" action="intropage_edit.php">
									<input type="hidden" id="data_id" name="data_id" value="">
									<input type="hidden" id="action" name="action" value=""> <!-- EDIT  CREATE  VIEW -->
								</form>
							</div>
					  </div>
					</div>
				  </div>
				</div>
			  </section>
			</div>
		  </div>
	</div>
  </div>

    <!-- ////////////////////////////////////////////////////////////////////////////-->



  <?php include "prepare_script.php";?>
  <?php include "prepare_footer.php";?>


	<script >
	$(document).ready(function () {
		$('#tbdata1').DataTable();
	});

	
	</script>
