jQuery(document).ready(function ($) {

    'use strict';

    var slider = $('#slider');
    var slidesWrapper = $('.slides');
    var slides = $('.slides li');
    var activeSlide = $('.slides.active');

    var timer = setInterval(nextSlide, 4000);
    

    function nextSlide() {
        var a = slidesWrapper.find('.active');
        
        var b = a.next('li');
        
        if( b.length === 0 ) {
            a.removeClass('active');
            slides.first().addClass('active');
        } else {
            a.removeClass('active');
            b.addClass('active');
        }
        
    }

    function prevSlide() {
        var a = slidesWrapper.find('.active');
        
        var b = a.prev('li');
        
        if( b.length === 0 ) {
            a.removeClass('active');
            slides.last().addClass('active');
        } else {
            a.removeClass('active');
            b.addClass('active');
        }
        
    }

    $('#slider').on("mouseenter",function(e) {
        clearInterval(timer);
    });

    $('#slider').on("mouseleave",function(e) {
        timer = setInterval(nextSlide, 4000);
        
    });

    $('.slide-nav-up').on('click', function() {
        prevSlide();
       
    });

    $('.slide-nav-down').on('click', function() {
        nextSlide();
       
    });
  
});    


/*헤더 스크롤*/
 //스크롤 이벤트 구간
 $(window).on("scroll",function(){
    //스크롤바의 위치값 받아와서 변수에 담아줌
    let scTop = $(window).scrollTop(); //scrollLeft(); 가로스크롤바 위치값

    //스크롤바의 위치값에 따라 헤더 디자인이 변경되고/ 다시 원상태로 돌아오는 조건문
    if(scTop > 0){
        $(".gnb > li").addClass("on");
    }
    else{
        $(".gnb > li").removeClass("on");
        }

    //스크롤바의 위치값이 해당 섹션 범위 안에 있을때 -> 해당 메뉴만 활성화/ 나머지는 비활성화

    //하단의 조건문 반복문으로 표현(리팩토링 완료)
    for(let i=0; i< $(".gnb > li").length; i++){

        if(scTop >= $(".cont").eq(i).offset().top){
            
            $(".gnb > li").removeClass("on"); //4마리 버튼 비활성화
            $(".cont").removeClass("start");
        
            //i번째 메뉴만 활성화
            $(".gnb > li").eq(i).addClass("on");
            $(".cont").eq(i).addClass("start");
        }
    }
});

    //상단에 있는 메뉴를 클릭시 스크롤바의 위치가 부드럽게 이동되는 기능을 구현
    $(".gnb > li").on("click",function(e){
        //a태그가 가지고 있는 기본 기능(페이지 이동) 멈춤
        e.preventDefault();

        //클릭한 메뉴의 순번값 가져오기
        let gnbIndex = $(this).index();
        //해당 섹션 구역의 위치값으로 스크롤바가 부드럽게 이동
        let scrollMove = $(".cont").eq(gnbIndex).offset().top;
        //클릭한 메뉴랑 순번이 일치하는 섹션구역으로 스크롤바가 이동
        $("html,body").stop().animate({"scrollTop":scrollMove},1000);
    });
    