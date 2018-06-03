/*
Author: Robert Hashemian
http://www.hashemian.com/

You can use this code in any manner so long as the author's
name, Web address and this disclaimer is kept intact.
********************************************************
Usage Sample:

<script language="JavaScript">
TargetDate = "12/31/2020 5:00 AM";
BackColor = "palegreen";
ForeColor = "navy";
CountActive = true;
CountStepper = -1;
LeadingZero = true;
DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
FinishMessage = "It is finally here!";
</script>
<script language="JavaScript" src="https://scripts.hashemian.com/js/countdown.js"></script>
*/

var d = new Date()
var gmtHours = -d.getTimezoneOffset() / 60;

function calcage_dd(secs, num1, num2) {
	s = ((Math.floor(secs / num1)) % num2).toString();
	if (LeadingZero && s.length < 2)
		s = "0" + s;

	return  "<span class='timer'>" + s + "</span>";
}

function CountBack_dd(secs) {
	if (secs < 0) {
		document.getElementById("cntdwn_dd").innerHTML = FinishMessage;
		return;
	}
	DisplayStr = DisplayFormat.replace(/%%D%%/g, calcage_dd(secs, 86400, 100000));
	DisplayStr = DisplayStr.replace(/%%H%%/g, calcage_dd(secs, 3600, 24));
	DisplayStr = DisplayStr.replace(/%%M%%/g, calcage_dd(secs, 60, 60));
	DisplayStr = DisplayStr.replace(/%%S%%/g, calcage_dd(secs, 1, 60));

	document.getElementById("cntdwn_dd").innerHTML = DisplayStr;
	if (CountActive)
		setTimeout("CountBack_dd(" + (secs + CountStepper) + ")", SetTimeOutPeriod);
}

function putspan_dd(backcolor, forecolor) {
	document.write("<span id='cntdwn_dd' class='dd-countdown'></span>");
}

if (typeof (BackColor) == "undefined")
	BackColor = "transparent";
if (typeof (ForeColor) == "undefined")
	ForeColor = "black";
if (typeof (TargetDate_dd) == "undefined")
	TargetDate_dd = "12/31/2020 5:00 AM";
if (typeof (DisplayFormat) == "undefined")
	DisplayFormat = "%%Day%% , %%H%% , %%M%% , %%S%% ";
if (typeof (CountActive) == "undefined")
	CountActive = true;
if (typeof (FinishMessage) == "undefined")
	FinishMessage = "";
if (typeof (CountStepper) != "number")
	CountStepper = -1;
if (typeof (LeadingZero) == "undefined")
	LeadingZero = true;


CountStepper = Math.ceil(CountStepper);
if (CountStepper == 0)
	CountActive = false;
var SetTimeOutPeriod = (Math.abs(CountStepper) - 1) * 1000 + 990;
putspan_dd(BackColor, ForeColor);
var dthen = new Date(TargetDate_dd);
var dnow = new Date() - gmtHours;

if (CountStepper > 0)
	ddiff = new Date(dnow - dthen);
else
	ddiff = new Date(dthen - dnow);

if (typeof targetsecs != 'undefined') {
	gsecs = targetsecs;
	CountBack_dd(gsecs);

	jQuery('#cntdwn_dd').appendTo('#dd-timer');
}


var timerDate = new Date()
var timerGmtHours = -d.getTimezoneOffset() / 60;;

var timerFormat = "%%D%% Days %%H%% Hours %%M%% Mints %%S%% Secs";
var timerFinishMsg = "The deal is over!";
var timerLeadingZero = true;
var timerBackColor = 'transparent';
var timerForeColor = '#FFFFFF';
var timerCountActive = true;
var timerCountStepper = -1;

function timer_CountBack(timerSecs, timerExpires, element) {
	if (timerSecs < 0) {
		jQuery(element).find('.countdown-timer-inner').html(timerFinishMsg);
		return;
	}

	var timerStr = '';
	timerStr = timerFormat.replace(/%%D%%/g, calcage_dd(timerSecs, 86400, 100000));
	timerStr = timerStr.replace(/%%H%%/g, calcage_dd(timerSecs, 3600, 24));
	timerStr = timerStr.replace(/%%M%%/g, calcage_dd(timerSecs, 60, 60));
	timerStr = timerStr.replace(/%%S%%/g, calcage_dd(timerSecs, 1, 60));

	jQuery(element).find('.countdown-timer-inner').html(timerStr);

	if (timerCountActive) {
		setTimeout(function () {
			timer_CountBack((timerSecs + CountStepper), timerExpires, element);
		}, SetTimeOutPeriod);
	}
}

jQuery(function () {
	jQuery('.countdown-timer').each(function (index, element) {
		
		var timerExpires = jQuery(element).data('expires');
		var timerSecs = parseInt(jQuery(element).data('secs'));

		timer_CountBack(timerSecs, timerExpires, element);
	});
});