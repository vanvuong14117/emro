var __cloudsignservice=function(a){var n=function(d){function h(a){if(!a)return alert("UI load error."),!1;var f=document.createElement("div");document.body.insertBefore(f,document.body.firstChild);f.innerHTML=a;return!0}function b(a,b){a=document.getElementById(a);-1<b.indexOf("<br>")?a.innerHTML=b:a.appendChild(document.createTextNode(b));a.setAttribute("tabindex",k++,0);return a}function c(b,c){b=document.getElementById(b);b.setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/"+c,0);return b}var g=function(){var b=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");b.open("GET",a.ESVS.SRCPath+"unisignweb/rsrc/layout/cloudsignservice.html?version="+a.ver,!1);b.send(null);return b.responseText},m=function(){var b=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");b.open("GET",a.ESVS.SRCPath+"unisignweb/rsrc/lang/"+a.ESVS.Language+"/cloudsignservice_"+a.ESVS.Language+".js?version="+a.ver,!1);b.send(null);return b.responseText},k=a.ESVS.TabIndex;return function(){var f=a.CustomEval(g),e=a.CustomEval(m,!0),l=d.type;h(f());document.getElementById("us-cls-btn-img").setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/x-btn.png",0);f=document.getElementById("us-cls-btn");f.setAttribute("tabindex",k++,0);f.onclick=function(){d.onCancel()};"double"==l?(document.getElementById("cs-tab-2").className="",b("cs-lbl-title",e.IDS_SERVICES),b("cs-div-subject2",e.IDS_SUBJECT2),b("cs-div-description2",e.IDS_SUBJECT_DESCRIPTION2),b("cs-div-tip2",e.IDS_DESCRIPTION2),b("cs-div-info2",e.IDS_ALRIM_TEXT2)):"joinus"==l&&(document.getElementById("cs-tab-3").className="",b("cs-lbl-title",e.IDS_TITLE),b("cs-div-subject3",e.IDS_SUBJECT3),b("cs-div-description3",e.IDS_SUBJECT_DESCRIPTION3),c("cs-img-service2-1","cloudsign_icon.png"),document.getElementById("cs-div-service2-item1").onclick=function(){a.PFCS().requestAppDown(d.args.pNumber,"cloudsign")},b("cs-div-tip3",e.IDS_DESCRIPTION3),b("cs-div-info3",e.IDS_ALRIM_TEXT3));return document.getElementById("cs-div-cloudsignservice")}()};return function(d){var h=a.uiLayerLevel,b=a.uiUtil().getOverlay(h),c=n({type:d.type,args:d.args,onConfirm:d.onConfirm,onCancel:d.onCancel});c.style.zIndex=h+1;a.ESVS.TargetObj.insertBefore(b,a.ESVS.TargetObj.firstChild);var g=window.onresize;return{show:function(){b.style.display="block";c.style.position="fix";a.uiUtil().offsetResize(c,"197,"+a.uiUtil().getScrollLeft()+(a.uiUtil().getViewportWidth()-a.uiUtil().getNumSize(a.uiUtil().getStyle(c,"width","width")))/2);window.onresize=function(){c&&(c.style.left=a.uiUtil().getScrollLeft()+(a.uiUtil().getViewportWidth()-a.uiUtil().getNumSize(a.uiUtil().getStyle(c,"width","width")))/2+"px");g&&g()};a.uiLayerLevel+=10;a.ESVS.TabIndex+=30;setTimeout(function(){var a=c.getElementsByTagName("p");if(0<a.length)for(var b=0;b<a.length;b++)"us-lbl-title"==a[b].id&&a[b].focus()},10)},hide:function(){b.style.display="none";c.style.display="none"},dispose:function(){window.onresize=function(){g&&g()};var d=c.parentNode;d&&d.removeChild(c);b.parentNode&&b.parentNode.removeChild(b);a.uiLayerLevel-=10;a.ESVS.TabIndex-=30}}}};