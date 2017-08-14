// JavaScript source code

$("document").ready(readyFunction);

function readyFunction() {
    $(".scroll-btn").on("click", scrollToContent);
};

function scrollToContent() {
    $("body, html").animate({ scrollTop: $(".content").position().top }, 500);
}

function changeCollapsedBackground() {
    $("#navbar").attr("aria-expanded", "true"); 
}

// Navbar Collapse and Background

$(window).resize(function(){
    if ($(this).width() > 767) {
        $('#navbar').removeClass('in');
    };
});

