/**
 * Coder:Brian Wahinya
 * Purpose: Personal website
 * Date: 08/08/2019
 * Version:bngure.002a
 */

function openDiv(divName, buttonName) {
  let i;
  let x = document.getElementsByClassName("mainContent");
  let y = document.getElementsByClassName("navB");
  for (i = 0; i < x.length; i++) {
    // x[i].style.transition = "all 0.5s"; 
    x[i].style.display = "none";
  }
  for (i = 0; i < y.length; i++) {
    y[i].style.transition = "all 0.5s"; 
    y[i].style.backgroundColor = 'transparent';
  }
  document.getElementById(divName).style.transition = "all 2s";
  document.getElementById(divName).style.display = "block";
  
  document.getElementById(buttonName).style.backgroundColor = "blue";  
};

function ajaxFunc(callback, urlLink, inputData){
  $.ajax(
    {
    type:'GET',
    url: urlLink,
    data: inputData,
    dataType:'json',
    contentType: 'application/json',
    crossDomain:true,
    beforeSend:onBeforeSend,
    error:onGetDataError,
    success:onGetDataSuccess
    }
  );
  // executed in case of data error
  function onGetDataError(xhr, status, error){
    // console.log("data error");
  };
  //executed before sending request
  function onBeforeSend(jqXHR, settings) {
    // console.log(settings.url);
  };
  // executed in case of success
  function onGetDataSuccess(response) {
    // console.log('Ajax response', response);
    callback(response)
  };
};


function idElement(item){
  return document.getElementById(item)
};


var myVar;
function loaderSpin() {
  myVar = setTimeout(showPage, 2000);
}
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("copyright").style.fontSize = "18px";
  document.getElementById("main").style.display = "flex";
}
