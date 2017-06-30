// JavaScript source code

$("document").ready(readyFunction);

function readyFunction() {
    $(".scroll-btn").on("click", scrollToContent);
};

function scrollToContent() {
    $("body, html").animate({ scrollTop: $(".content").position().top }, 500);
}