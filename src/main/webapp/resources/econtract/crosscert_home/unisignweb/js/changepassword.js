var __changepassword=function(a){var x=function(k){function t(a){if(!a)return alert("UI load error."),!1;var b=document.createElement("div");document.body.insertBefore(b,document.body.firstChild);b.innerHTML=a;return!0}function n(){var b=document.getElementById("us-change-password-new-first-textbox").value,c=document.getElementById("us-change-password-check-rule1"),d=document.getElementById("us-change-password-check-rule2"),g=document.getElementById("us-change-password-check-rule3"),h=document.getElementById("us-change-password-check-rule4"),f=document.getElementById("us-change-password-check-rule5"),e=!0;a.ESVS.LimitMinNewPWLen<=b.length?c.className="check":(c.className="",e=!1);if(a.bsUtil().isKeyProtected()&&!a.uiUtil().isItPFDevice(a.SELECTINFO.curdevice))return e;"NPKI"===a.ESVS.PKI&&a.ESVS.ChangePWByNPKINewPattern||"NPKI"!=a.ESVS.PKI&&2===a.ESVS.LimitNewPWPattern?(c=/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/g,c.exec(b)?d.className="check":(d.className="",e=!1)):1===a.ESVS.LimitNewPWPattern&&(c=/^(?=.*[a-zA-Z])(?=.*[0-9])/g,c.exec(b)?d.className="check":(d.className="",e=!1));if("NPKI"===a.ESVS.PKI&&a.ESVS.ChangePWByNPKINewPattern)if(c=/['"\\|]/g,c.exec(b)?(f.className="",e=!1):f.className="check",2<b.length){for(d=0;d<b.length-2;d++)if(b.charAt(d)===b.charAt(d+1)&&b.charAt(d)===b.charAt(d+2)){g.className="";e=!1;break}else g.className="check";for(d=0;d<b.length-2;d++)if(b.charCodeAt(d)===b.charCodeAt(d+1)-1&&b.charCodeAt(d)===b.charCodeAt(d+2)-2){h.className="";e=!1;break}else if(b.charCodeAt(d)===b.charCodeAt(d+1)+1&&b.charCodeAt(d)===b.charCodeAt(d+2)+2){h.className="";e=!1;break}else h.className="check"}else g.className="check",h.className="check";return e}function m(b){var c=document.getElementById("us-change-password-origin-textbox"),d=document.getElementById("us-change-password-new-first-textbox"),g=document.getElementById("us-change-password-new-second-textbox"),h=c.value,f=d.value,e=g.value;if(h&&4&a.ESVS.Mode&&!a.uiUtil().isItPFDevice(a.SELECTINFO.curdevice)){if("touchen"==a.ESVS.SecureKeyboardType&&a.bsUtil().isTouchEnKeyUsable()){a.bsUtil().GetEncryptPwd("us-keyboard-secure-frm","us-change-password-origin-textbox",function(b){a.bsUtil().GetEncryptPwd("us-keyboard-secure-frm2","us-change-password-new-first-textbox",function(e){a.bsUtil().GetEncryptPwd("us-keyboard-secure-frm3","us-change-password-new-second-textbox",function(f){a.nimservice()&&a.nimservice().CheckNewPasswdCombination(e,f,a.ESVS.LimitMinNewPWLen,a.ESVS.LimitMaxNewPWLen,a.ESVS.LimitNewPWPattern,function(u,f){if(0!=u)return a.ERROR.Code=u,a.ERROR.Message=f,a.uiUtil().errMsgBox(f,u),d.value="",g.value="",!1;k.onConfirm(b,e);c.value="";d.value="";g.value=""})})})});return}"ahnlab"==a.ESVS.SecureKeyboardType&&a.bsUtil().isAhnlabProtectorUsable()&&(h=a.bsUtil().GetAhnlabEncInputInfo("us-change-password-origin-textbox"),f=a.bsUtil().GetAhnlabEncInputInfo("us-change-password-new-first-textbox"),e=a.bsUtil().GetAhnlabEncInputInfo("us-change-password-new-second-textbox"))}if(!a.bsUtil().isKeyProtected()||a.uiUtil().isItPFDevice(a.SELECTINFO.curdevice)){if(!h||!f)return a.uiUtil().msgBox(b.IDS_MSGBOX_ERROR_PLEASE_INPUT_PASSWORD),c.focus(),!1;if(a.ESVS.LimitMaxNewPWLen<f.length)return a.uiUtil().msgBox(a.ESVS.LimitMaxNewPWLen+b.IDS_MSGBOX_ERROR_LONGER_THAN_LIMIT_MAX_LENGTH),d.focus(),!1;if(!n())return a.uiUtil().msgBox(b.IDS_MSGBOX_ERROR_CANT_PASS_RULES),d.focus(),!1;if(f!=e)return a.uiUtil().msgBox(b.IDS_MSGBOX_ERROR_PLEASE_RETRY_TO_INPUT_CORRECTLY),d.focus(),!1;k.onConfirm(h,f);c.value="";d.value="";g.value=""}else 4&a.ESVS.Mode&&a.nimservice()&&a.nimservice().CheckNewPasswdCombination(f,e,a.ESVS.LimitMinNewPWLen,a.ESVS.LimitMaxNewPWLen,a.ESVS.LimitNewPWPattern,function(b,e){if(0!=b)return a.ERROR.Code=b,a.ERROR.Message=e,a.uiUtil().errMsgBox(e,b),d.value="",g.value="",a.bsUtil().AhnlabClearText("us-change-password-new-first-textbox"),a.bsUtil().AhnlabClearText("us-change-password-new-second-textbox"),!1;k.onConfirm(h,f);c.value="";d.value="";g.value=""})}var q=function(){var b=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");b.open("GET",a.ESVS.SRCPath+"unisignweb/rsrc/layout/changepassword.html?version="+a.ver,!1);b.send(null);return b.responseText},w=function(){var b=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");b.open("GET",a.ESVS.SRCPath+"unisignweb/rsrc/lang/"+a.ESVS.Language+"/changepassword_"+a.ESVS.Language+".js?version="+a.ver,!1);b.send(null);return b.responseText},l=a.ESVS.TabIndex;return function(){var b=a.CustomEval(q),c=a.CustomEval(w,!0);t(b());b=document.getElementById("us-change-password-lbl-title");b.appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD));b.setAttribute("tabindex",l,0);document.getElementById("us-change-password-cls-btn-img").setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/x-btn.png",0);document.getElementById("us-change-password-lock-img").setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/password-lock-img.png",0);var d=document.getElementById("us-change-password-notice-text");d.innerHTML=c.IDS_CHANGE_PASSWORD_NOTICE+"<br>("+a.ESVS.LimitMinNewPWLen+c.IDS_CHANGE_PASSWORD_LIMIT+")";document.getElementById("us-change-password-origin-lbl").appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD_ORIGIN+" :"));event.getModifierState?(a.uiUtil().addCapsLockEvent("us-change-password-origin-textbox","us-change-password-err-msg-capslock","",null),a.uiUtil().addCapsLockEvent("us-change-password-new-first-textbox","us-change-password-err-msg-capslock","",null),a.uiUtil().addCapsLockEvent("us-change-password-new-second-textbox","us-change-password-err-msg-capslock","",null)):a.uiUtil().addCapsLockEvent("us-change-password-origin-textbox","us-change-password-err-msg-capslock","",null);document.getElementById("us-change-password-err-msg-capslock-text").appendChild(document.createTextNode(c.IDS_MSGBOX_CAPSLOCK_ON));var g=document.getElementById("us-change-password-origin-textbox");g.setAttribute("tabindex",l+1,0);g.setAttribute("title",c.IDS_CHANGE_PASSWORD_ORIGIN,0);g.onkeyup=function(a){a.getModifierState&&(a.getModifierState("CapsLock")?(document.getElementById("us-change-password-err-msg-capslock").style.top=g.offsetTop+0+30+"px",document.getElementById("us-change-password-err-msg-capslock").style.display="block"):document.getElementById("us-change-password-err-msg-capslock").style.display="none")};g.onfocus=function(a){"block"==document.getElementById("us-change-password-err-msg-capslock").style.display&&(document.getElementById("us-change-password-err-msg-capslock").style.top=g.offsetTop+0+30+"px")};document.getElementById("us-change-password-new-first-lbl").appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD_NEW_FIRST+" :"));var h=document.getElementById("us-change-password-new-first-textbox");h.setAttribute("tabindex",l+2,0);h.setAttribute("title",c.IDS_CHANGE_PASSWORD_NEW_FIRST,0);h.onkeyup=function(a){a.getModifierState&&(a.getModifierState("CapsLock")?(document.getElementById("us-change-password-err-msg-capslock").style.top=h.offsetTop+0+30+"px",document.getElementById("us-change-password-err-msg-capslock").style.display="block"):document.getElementById("us-change-password-err-msg-capslock").style.display="none");n()};h.onfocus=function(a){"block"==document.getElementById("us-change-password-err-msg-capslock").style.display&&(document.getElementById("us-change-password-err-msg-capslock").style.top=h.offsetTop+0+30+"px")};document.getElementById("us-change-password-new-second-lbl").appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD_NEW_SECOND+" :"));var f=document.getElementById("us-change-password-new-second-textbox");f.setAttribute("tabindex",l+3,0);f.setAttribute("title",c.IDS_CHANGE_PASSWORD_NEW_SECOND,0);f.onkeydown=function(a){if(a=a?a:event)a=a||window.event,13==(a.which||a.keyCode)&&document.getElementById("us-change-password-confirm-btn").click()};f.onkeyup=function(a){a.getModifierState&&(a.getModifierState("CapsLock")?(document.getElementById("us-change-password-err-msg-capslock").style.top=f.offsetTop+0+30+"px",document.getElementById("us-change-password-err-msg-capslock").style.display="block"):document.getElementById("us-change-password-err-msg-capslock").style.display="none")};f.onfocus=function(a){"block"==document.getElementById("us-change-password-err-msg-capslock").style.display&&(document.getElementById("us-change-password-err-msg-capslock").style.top=f.offsetTop+0+30+"px")};document.getElementById("us-change-password-check-rule1").appendChild(document.createTextNode(a.ESVS.LimitMinNewPWLen+""+c.IDS_CHANGE_PASSWORD_RULE1));if("NPKI"===a.ESVS.PKI&&a.ESVS.ChangePWByNPKINewPattern){var e=document.getElementById("us-change-password-check-rule2");e.appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD_RULE2_ALL));var p=document.getElementById("us-change-password-check-rule3");p.appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD_RULE3));var r=document.getElementById("us-change-password-check-rule4");r.appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD_RULE4));var v=document.getElementById("us-change-password-check-rule5");v.appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD_RULE5));a.bsUtil().isKeyProtected()&&!a.uiUtil().isItPFDevice(a.SELECTINFO.curdevice)&&(e.className="disable",p.className="disable",r.className="disable",v.className="disable")}else e=document.getElementById("us-change-password-check-rule2"),1===a.ESVS.LimitNewPWPattern?e.appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD_RULE2_ENGNUM)):"NPKI"!=a.ESVS.PKI&&2===a.ESVS.LimitNewPWPattern&&e.appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD_RULE2_ALL)),a.bsUtil().isKeyProtected()&&!a.uiUtil().isItPFDevice(a.SELECTINFO.curdevice)&&(e.className="disable");document.getElementById("us-change-password-warning-text").appendChild(document.createTextNode(c.IDS_CHANGE_PASSWORD_WARNING));e=document.getElementById("us-change-password-confirm-btn");e.setAttribute("value",c.IDS_CONFIRM,0);e.setAttribute("tabindex",l+4,0);e.onclick=function(){m(c)};p=document.getElementById("us-change-password-cancel-btn");p.setAttribute("value",c.IDS_CANCEL,0);p.setAttribute("tabindex",l+5,0);p.onclick=function(){k.onCancel()};r=document.getElementById("us-change-password-cls-img-btn");r.setAttribute("tabindex",l+6,0);r.onclick=function(){k.onCancel()};a.uiUtil().setRotationTabFocus(p,e,b);a.uiUtil().setRotationTabFocus(b,p,d);return document.getElementById("us-div-change-password")}()};return function(k){var t=a.uiLayerLevel,n=a.uiUtil().getOverlay(t),m=x({type:k.type,args:k.args,onConfirm:k.onConfirm,onCancel:k.onCancel});m.style.zIndex=t+1;a.ESVS.TargetObj.insertBefore(n,a.ESVS.TargetObj.firstChild);var q=window.onresize;return{show:function(){a.ActiveUI=this;draggable(m,document.getElementById("us-div-change-password-title"));n.style.display="block";a.uiUtil().offsetResize(m);window.onresize=function(){a.uiUtil().offsetResize(m);q&&q()};a.uiLayerLevel+=10;a.ESVS.TabIndex+=30;a.bsUtil().ahnlabInit();setTimeout(function(){var k=m.getElementsByTagName("p");if(0<k.length)for(var l=0;l<k.length;l++)"us-change-password-lbl-title"==k[l].id&&k[l].focus();a.uiUtil().isItPFDevice(a.SELECTINFO.curdevice)?(a.bsUtil().SetSecurityStatus("us-change-password-origin-textbox","off"),a.bsUtil().SetSecurityStatus("us-change-password-new-first-textbox","off"),a.bsUtil().SetSecurityStatus("us-change-password-new-second-textbox","off")):(a.bsUtil().SetSecurityStatus("us-change-password-origin-textbox","on"),a.bsUtil().SetSecurityStatus("us-change-password-new-first-textbox","on"),a.bsUtil().SetSecurityStatus("us-change-password-new-second-textbox","on"));a.bsUtil().SetReScan()},10)},hide:function(){n.style.display="none";m.style.display="none"},dispose:function(){window.onresize=function(){q&&q()};m.parentNode.parentNode.removeChild(m.parentNode);n.parentNode.removeChild(n);a.uiLayerLevel-=10;a.ESVS.TabIndex-=30}}}};