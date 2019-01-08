$(window).scroll(function(){
    var CurrHeight = $('.main').offset().top;
        if($(this).scrollTop() > CurrHeight){
            $('.site-nav').addClass('scroll-nav');
            $('.menu').addClass('scroll-menu');
            $('.menu-item').addClass('scroll-item');
        }else{
            $('.site-nav').removeClass('scroll-nav');
            $('.menu').removeClass('scroll-menu');
            $('.menu-item').removeClass('scroll-item');
        }
});
(function(){
    var documentElem = $(document),
        nav = $('.scroll-nav'),
        lastScrollTop = 0;

    documentElem.on('scroll',function(){
        var CurrScrollTop = $(this).scrollTop();
        if (CurrScrollTop > lastScrollTop) nav.addClass('hidden');
        else nav.removeClass('hidden');

        lastScrollTop = CurrScrollTop;
    });
})();