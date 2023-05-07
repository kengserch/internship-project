
    
    
    <!-- Javascript -->
    <script src="javascript/jquery.min.js"></script>
    <script src="javascript/plugins.js"></script>
    <script src="javascript/bootstrap.min.js"></script>
    <script src="javascript/equalize.min.js"></script>
    <script src="javascript/jquery-countTo.js"></script>
    <script src="javascript/owl.carousel.min.js"></script>
    <script src="javascript/jquery.validate.min.js"></script>
    <script src="javascript/main.js"></script>

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
 
//  alert('test');
$(document).ready(function () {
        // $(".mainnav .nav-link").on("click", function(){
        //     $(".nav").find(".active").removeClass("active");
        //     $(this).addClass("active");
        // });

        // $(".mainnav a").on("click", function(){
        //     $(".nav").find(".active").removeClass("active");
        //     $(this).parent().addClass("active");
        // });

        // $('ul li').click(function(){
        //     $('li').removeClass("active");
        //     $(this).addClass("active");
        // });

        

        $(".menu li").each(function(index){
            $(this).click(function(){
                var currentActive = $(".menu").find("li.active");	
                currentActive.removeClass("active");	
                $(this).addClass("active");		   
            });
        });


    });


$(document).ready(function () {

    //$("li").addClass("active");
    $('.mainnav li').click(function () {

       // alert(' ');
      
        $('.menu').find('li.active').removeClass('active');
     

        // $(this).closest('li').addClass('active');
        $(this).parents('li').addClass('active');

    });
});

    </script>