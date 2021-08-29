const APP_KEY = '';

var pageNum = 1;
var size = 10;
var title;
var targets;

$(function () {
    $("#search").on("click", function () {
        pageNum = 1;
        title = $("#searchText").val();
        targets = $('#targetType').val();
        if(title!=""){
        $("#result").html("");
        $("#result").addClass("result-visible");
        getApi(title, $('#targetType').val());
        $("#searchText").val("");
        $("#searchHistory").append(`<div class="history">
                                        <span onClick='clickHitory(this)'>${title}</span>
                                        <span class="remove" onClick='removeHistory(this)'>X</span></span>
                                    </div>`);
        }
    });
});

$(window).scroll(function () {
    if (Math.ceil($(window).scrollTop()) + $(window).height() >= $(document).height()) {
        pageNum++;
        getApi(title, 'title');
    }
})


function getApi(title, targets) {
    $.ajax({
        method: "GET",
        url: "https://dapi.kakao.com/v3/search/book?",
        data: {'query': title, 'page': pageNum, 'size': size, 'target': targets},
        headers: {'Authorization': `KakaoAK ${APP_KEY}`}
    })
        .done(function ({documents}) {
            if (documents.length !== 0) {
                setBookHtml(documents);
            } else {
                $("#result").html("<div>결과가 없습니다</div>");
            }
        });
}

function setBookHtml(documents) {
    console.log(documents);
    let html = $("#result").html();

    for (let i = 0; i < documents.length; i++) {
        html +=
            `<div class="bookDiv">
              <a href=${documents[i]['url']} target="_blank">
                <div class="thumbnail" style="background-image:url(${documents[i]['thumbnail']}"></div>
                <div class="title">${documents[i]['title']}</div>
                <div class="authors">${documents[i]['authors']}</div>
              </a>
            </div>`;
    }

    $("#result").html(html);
}

function removeHistory(thiss){
    $(thiss).parent().remove();
}

function clickHitory(test){
    title = $(test).html();
    $("#result").html("");
    getApi(title,$('#targetType').val());
}