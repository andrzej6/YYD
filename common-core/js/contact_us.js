	$(function() {
		var addReplyClick = 0;
		$("input#recaptcha_response_field").prop('required',true);
	});
	
	function submitFormContactUs(strAction) {	
		document.frmForm.action.value = strAction;
		document.frmForm.submit();
	}
	function addNew() {
		var strMsg = "";
		//<!--START: captchascript-->
		if (document.frmForm.ramdomWord.value.trim() == "")
			strMsg += " - Verification word cannot be blank.\n";			
		//<!--END: captchascript-->
            
		if (strMsg != "") {
//			alert(strMsg);
			console.log('error:' + strMsg);
			return false;
		}
		if (addReplyClick == 0) {
			addReplyClick = 1;
			submitFormContactUs('addnew');
		}
	
	}
