function popup(n,t,i){result=window.open(n,"popped1","width="+t+", height="+i+", location=no, menubar=no, status=no, toolbar=no, scrollbars=yes, resizable=no");result!=null?html="is not blocking":alert("Your Browser is blocking popups which is preventing a 3dCart window to appear.")}function popupsimple(n,t,i){var r=480,u=340,f,e;(document.all||document.layers)&&(r=screen.availWidth,u=screen.availHeight);f=(r-t)/2;e=(u-i)/2;result=window.open(n,"popped1","width="+t+", height="+i+",top="+e+",left="+f+",location=no, menubar=no, status=no, toolbar=no, scrollbars=no, resizable=no");result!=null?html="is not blocking":alert("Your Browser is blocking popups which is preventing a 3dCart window to appear.")}function SearchAndReplace(n,t,i){var r=n,e=new String,s=new String,u=new String,f=0,o=0;if(t.length!=0){while(r.toUpperCase().indexOf(t.toUpperCase())>-1)f=r.toUpperCase().indexOf(t.toUpperCase()),e=r.substring(0,f),u=u+e,u=u+i,o=r.length-t.length+1,r=r.substring(f+t.length);return u+r}}function Len(n){return String(n).length}function Left(n,t){return t<=0?"":t>String(n).length?n:String(n).substring(0,t)}function Right(n,t){if(t<=0)return"";if(t>String(n).length)return n;var i=String(n).length;return String(n).substring(i,i-t)}function Mid(n,t,i){if(t<0||i<0)return"";var r,u=String(n).length;return r=t+i>u?u:t+i,String(n).substring(t,r)}function InStr(n,t){for(i=0;i<Len(n);i++)if(t==Mid(n,i,1))return i;return-1}function validateValues(n,t){var o=!0,r=new String,s=new String,h=!1,u=0,c=!1,l=!1,v=new Image,f,i,a,e;if(stocknum="",document.add.std_price!=null){for(u=document.add.std_price.value,f=document.getElementById("itemid")!=null?document.add.itemid.value:"",listing_elemLenght=n.elements.length,i=0,a=listing_elemLenght;i<a;i++)myType=n.elements[i].type,myType!=null&&myType!=undefined&&(r=n.elements[i].name,r!=""&&r!="recipientselect"&&r!="reminder"&&r!="qty-0"&&r!="recurring_frequency"&&r!="item_id"&&(r.indexOf("di_")>-1&&(SetSrc(n,"large",GetValue(n,"image_"+n.elements[i].options[n.elements[i].selectedIndex].value)),MagicZoomPlus.update("listing_main_image_link",GetValue(n,"image_"+n.elements[i].options[n.elements[i].selectedIndex].value),"thumbnail.asp?file="+GetValue(n,"image_"+n.elements[i].options[n.elements[i].selectedIndex].value)+"&maxx=600&maxy=0","show-title: false")),myType=="radio"&&(c=!0,n.elements[i].checked&&(l=!0,u=eval(u)+eval(GetValue(n,"price_"+n.elements[i].value)),f=f+GetValue(n,"OptID_"+n.elements[i].value),stocknum=stocknum+n.elements[i].value+"#")),myType=="checkbox"&&(h=!0,n.elements[i].checked&&(r>""&&(u=eval(u)+eval(GetValue(n,"price_"+r))),f=f+GetValue(n,"OptID_"+r))),(myType=="hidden"||myType=="password"||myType=="text"||myType=="textarea")&&n.elements[i].value==n.elements[i].defaultValue&&(o=!1),(myType=="select-one"||myType=="select-multiple")&&n.elements[i].options[n.elements[i].selectedIndex].value>""&&(s=n.elements[i].options[n.elements[i].selectedIndex].value,e=s.split(":::"),e[0]!=undefined&&(stocknum=stocknum+e[1]+"#"),u=eval(u)+eval(GetValue(n,"price_"+n.elements[i].options[n.elements[i].selectedIndex].value)),f=f+""+GetValue(n,"OptID_"+n.elements[i].options[n.elements[i].selectedIndex].value))));if((h&&!0||c&&!l)&&(o=!1),changeprice(u),changeid(f),t==1)return check_stock(n,stocknum)}}function changeid(n){var t=n;changecontent("product_id",t)}function GetValue(n,t){var r=document.getElementsByName(t),i;if(r!=null&&r!=undefined&&r.length>0)return r.item(0).value;for(i=0;i<listing_elemLenght;i++)if(n.elements[i].name==t)return n.elements[i].value}function SetSrc(n,t,r){var u=document.getElementsByName(t);if(u!=null&&u!=undefined&&u.length>0){u.length>0&&(u.item(0).src=r);return}for(imgs=document.getElementsByTagName("img"),listing_imgslength==-1&&(listing_imgslength=imgs.length),i=0;i<listing_imgslength;i++)imgs[i].name==t&&(imgs[i].src=r)}function recalculate(){}function changecontent(n,t){var i=t;document.getElementById?document.getElementById(n)!=null&&(document.getElementById(n).innerHTML=i,document.getElementById(n).style.visibility="visible"):document.all?document.all[fiendname]!=null&&(document.all[fiendname].innerHTML=i,document.all[n].style.visibility="visible"):document.layers&&document.layers[n]!=null&&(document.layers[n].document.open(),document.layers[n].document.write(i),document.layers[n].document.close(),document.layers[n].visibility="show")}function changeprice(n){var t=formatCurrency(n),r,e,u;try{currency_symbol!=null&&currency_symbol!=undefined&&(r=currency_symbol)}catch(s){r="$"}if(document.getElementById("std_price_novat")!=null){var i=parseFloat(document.getElementById("std_price_novat").value),f=parseFloat(document.getElementById("vat_tax_rate").value),o=document.getElementById("vat_tax_price_format").value,e=n;f>=0&&(e==n?(e=i+i*(f/100),t=o,t=t.replace("[price_vat]",formatCurrency(n)),currency_symbol="",t=t.replace("[price_novat]",formatCurrency(i)),currency_symbol=r,t=t.replace("[currency]","")):(u=n-e,u=u/(1+f/100),i=i+u,t=o,t=t.replace("[price_vat]",formatCurrency(n)),currency_symbol="",t=t.replace("[price_novat]",formatCurrency(i)),currency_symbol=r,t=t.replace("[currency]","")))}changecontent("price",t)}function formatCurrency(n){var i,t;try{i=currency_symbol}catch(r){i="$"}try{t=parseInt(prod_decimal_places);t==0&&(t=2)}catch(r){t=2}return n=parseFloat(n),n=n.toString(),t>2&&(t-(n.length-(n.indexOf(".")+1))>0&&(t=n.length-(n.indexOf(".")+1)),t<2&&(t=2)),formatNumberListing(n,t,",",".",i,"","","")}function formatNumberListing(n,t,i,r,u,f,e,o){var l=Math.round(n*Math.pow(10,t)),h,s,c;for(l>=0&&(e=o=""),h=(""+Math.abs(l)).split(""),s=h.length-t,s<0&&s--,c=s;c<0;c++)h.unshift("0");for(s<0&&(s=1),h.splice(s,0,r),h[0]==r&&h.unshift("0");s>3;)s-=3,h.splice(s,0,i);return u+e+h.join("")+o+f}var stocknum="",listing_elemLenght=-1,listing_imgslength=-1