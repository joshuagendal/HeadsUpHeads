
//scroll button and scrollToContent is the same as the home page
$("document").ready(readyFunction);

function readyFunction() {
    $(".scroll-btn").on("click", scrollToContent);
    $("tbody").on("click", "tr", goToPost);
    fillTableRows(sampleData);
};

function scrollToContent() {
    $("body, html").animate({ scrollTop: $(".content").position().top }, 500);
}


//function you can use to change the url to view a post
function goToPost(e) {
    var $post = $(this);
    //pull the id or whatever our of the $post object
    //and use window.location to change url to view that post
}

//function you can use to fill table values
//pass in your data as the postData parameter in the readyFunction up top
function fillTableRows(postData) {
    var $tableBody = $("tbody");
    for (var i = 0; i < postData.length; i++) {
        findLengthSincePost(postData[i]);

        var $rowTemplate = $($("#tableRow").html());
        $rowTemplate.find(".row-title").text(postData[i].title);
        $rowTemplate.find(".row-author").text(postData[i].author);
        $rowTemplate.find(".row-posts").text(postData[i].posts);
        $rowTemplate.find(".row-timeStamp").text(postData[i].dateCreated);

        $tableBody.append($rowTemplate);
    }
}

//for length since post
function findLengthSincePost(postData) {
    var oneDay = 1000 * 60 * 60 * 24;
    var oneHour = 1000 * 60 * 60;

    var currentDate = new Date().getTime();
    var postDate = new Date(postData.dateCreated).getTime();
    var timeDifference = currentDate - postDate;

    if (timeDifference < oneDay) {
        postData.dateCreated = Math.round(timeDifference / oneHour) + ' hours ago';
    } else {
        postData.dateCreated = Math.round(timeDifference / oneDay) + ' days ago';
    }
}

//sample data for fillTableRows function

var sampleData = [
    {
        'title': 'Phish is the best band ever',
        'author': 'Ben L',
        'posts': 420,
        'dateCreated': '06/30/2017'
    },
    {
        'title': 'Who wants to jam before the show??',
        'author': 'Josh G',
        'posts': 555,
        'dateCreated': '06/29/2017 05:30:00'
    },
    {
        'title': 'Anybody want chicken nuggets?',
        'author': 'Ben A',
        'posts': 5,
        'dateCreated': '06/28/2017'
    },
]