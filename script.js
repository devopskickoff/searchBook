const APP_KEY = '';

var pageNum =1;
var size = 10;
var title = 

$(function(){
  $("#search").click(function(){
    title = $("#searchText").val();
      getApi(title,'title');
  });
});

$(window).scroll(function(){
  if( Math.ceil($(window).scrollTop()) + $(window).height() >= $(document).height() ){
    pageNum++;
    getApi(title,'title');
  }
})


function getApi(title,target){
  $.ajax({
    method:"GET",
    url:"https://dapi.kakao.com/v3/search/book?",
    data: { 'query': title,'page':pageNum,'size':size,'target':target},
    headers: { 'Authorization' :  `KakaoAK ${APP_KEY}`}
  })
  .done(function({documents}){
    if(documents.length!==0){
      setBookHtml(documents);
    }
  });
}

function setBookHtml(documents){
  console.log(documents);
  let html = $("#result").html();

  for(let i=0;i<10;i++){
    let thumbnail = documents[i]['thumbnail'];
    html += 
    `<div>
      <div class="thumbnail" style="background-image:url(${thumbnail});"></div>
      <div class="title">${documents[i]['title']}</div>
      <div class="authors">${documents[i]['authors']}</div>
     </div>
    `;
  }

  $("#result").html(html);
}

