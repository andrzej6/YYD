/**
* qaLink
***********************/
function saveQuestion() {
	var name = jQuery.trim(jQuery('#productqa_name').val());
	var email = jQuery.trim(jQuery('#productqa_email').val());
	var question = jQuery.trim(jQuery('#productqa_question').val());

	var ramdomWord = jQuery.trim(jQuery('#productQa-modal input[name="ramdomWord"]').val());
	var recaptcha_response_field = jQuery.trim(jQuery('#productQa-modal input[name="recaptcha_response_field"]').val());
	var recaptcha_challenge_field = jQuery.trim(jQuery('#productQa-modal input[name="recaptcha_challenge_field"]').val());
	var g_recaptcha_response = jQuery.trim(jQuery('#productQa-modal  [name="g-recaptcha-response"]').val());

	var valid = true;
	var qaValidationMsg = "";

	if (name == '') { qaValidationMsg += "Please enter your Your Name or Alias. \n"; valid = false; }
	if (email == '') { qaValidationMsg += "Please enter a valid email address. \n"; valid = false; }
	if (question == '') { qaValidationMsg += "Please enter value for question. \n"; valid = false; }

	if (!valid) {
		alert(qaValidationMsg);
		jQuery('#productQa-modal .loading-overlay').hide();
	}
	else {

		jQuery.ajax({
			method: "POST",
			url: '/productqa.asp?action=ajax&catalogid=' + jQuery('#catalogid').val(),
			data: {
				ajaxAction: "saveqa",
				user_email: name,
				user_name: email,
				question: question,
				ramdomWord: ramdomWord,
				recaptcha_response_field: recaptcha_response_field,
				recaptcha_challenge_field: recaptcha_challenge_field,
				'g-recaptcha-response': g_recaptcha_response
			},
			success: function (data) {
				if (data == 'ok') {
					jQuery('#productqa_question').val('');
					jQuery('#productQa-modal .modal-response').fadeIn(500);
					refereshAllCaptchas();
				}
				else {
					alert(data);
					jQuery('#productQa-modal .loading-overlay').hide();
				}
			},
			error: function () {
				alert('Something went wrong. Please try again later.');
			},
			complete: function () {
				jQuery('#productQa-modal .loading-overlay').fadeOut(500);
			}
		});
	}
}
function saveAnswer() {
	var name = jQuery.trim(jQuery('#productqa_name').val());
	var email = jQuery.trim(jQuery('#productqa_email').val());
	var answer = jQuery.trim(jQuery('#productqa_answer').val());
	var qa_id = jQuery.trim(jQuery('#answerBlock_q_id').val());

	var valid = true;
	var qaValidationMsg = "";

	if (name == '') { qaValidationMsg += "Please enter your Your Name or Alias. \n"; valid = false; }
	if (email == '') { qaValidationMsg += "Please enter a valid email address. \n"; valid = false; }
	if (answer == '') { qaValidationMsg += "Please enter value for answer. \n"; valid = false; }

	if (!valid) {
		alert(qaValidationMsg);
		jQuery('#productQa-modal .loading-overlay').hide();
	}
	else {

		jQuery.ajax({
			method: "POST",
			url: '/productqa.asp?action=ajax&catalogid=' + jQuery('#catalogid').val(),
			data: {
				ajaxAction: "saveans",
				user_email: name,
				user_name: email,
				qa_id: qa_id,
				answer: answer,
			},
			success: function (data) {
				if (data == 'ok') {
					jQuery('#productqa_question').val('');
					jQuery('#productQa-modal .modal-response').fadeIn(500);
					refereshAllCaptchas();
				}
				else {
					alert(data);
					jQuery('#productQa-modal .loading-overlay').hide();
				}
			},
			error: function () {
				alert('Something went wrong. Please try again later.');
			},
			complete: function () {
				jQuery('#productQa-modal .loading-overlay').hide();
			}
		});
	}
}

jQuery('.qaLink').click(function (e) {
	e.preventDefault();

	jQuery('#productqa-error').collapse('hide');
	jQuery('#productQa-modal .modal-response').hide();
	jQuery('#questionBlock').show();
	jQuery('#productQa-modal').addClass('question-modal').removeClass('answer-modal');
	jQuery('#productQa_action').val('saveqa');
	jQuery('#productQa-modal').modal('show');
});

jQuery('.qa-answer-btn').click(function (e) {
	e.preventDefault();
	jQuery('#productqa-error').collapse('hide');
	jQuery('#productQa-modal .modal-response').hide();

	jQuery('#productQa-modal').addClass('answer-modal').removeClass('question-modal');

	var q_id = jQuery(this).data('question');
	var question = jQuery('#question' + q_id).text();

	jQuery('#answerBlock_q_id').val(q_id);
	jQuery('#answer-question').text(question);

	jQuery('#productQa_action').val('saveans');
	jQuery('#productQa-modal').modal('show');
});

jQuery('#productQa_button').click(function (e) {
	jQuery('.productqa-error').hide();

	jQuery('#productQa-modal .loading-overlay').show();

	action = jQuery('#productQa_action').val();

	if (action == 'saveqa') processCaptchaEexcute('productQa-modal', 'saveQuestion');
	else if (action == 'saveans') processCaptchaEexcute('productQa-modal', 'saveAnswer');
});

jQuery('.modal-resclose').click(function () {
	jQuery(this).parents('.modal-response').hide();
});



var qaUpdateBar = new MessageBar();
qaUpdateBar.initialize();

function updateRevStats(id, spn, vote) {

	var url = '';
	var params = '';

	params = 'id=' + id;
	params += '&vote=' + vote;

	url = 'reviewVote_ajax.asp?' + params + '&no-cache=' + Math.random();

	//window.location = url;

	jQuery.ajax({
		url: url,
		dataType: 'html',
		type: 'GET',
		cache: false,
		success: function (strResult) {
			if (strResult == '') {
				qaUpdateBar.alert(GetLanguagItem('productqa_helpful-notupdated'));
			}
			else {
				jQuery('#spnReview' + spn).html(strResult);
				qaUpdateBar.success(GetLanguagItem('productqa_update-helpful'));
			}

		},
		error: reportQAError
	});

}

function updateQAStats(id, spn, vote) {

	var url = '';
	var params = '';

	params = 'id=' + id;
	params += '&vote=' + vote;

	url = 'productqaVote_ajax.asp?' + params + '&no-cache=' + Math.random();

	//window.location = url;

	jQuery.ajax({
		url: url,
		dataType: 'html',
		type: 'GET',
		cache: false,
		success: function (strResult) {
			if (strResult == '') {
				qaUpdateBar.alert(GetLanguagItem('productqa_helpful-notupdated'));
			}
			else {
				jQuery('#spn' + spn).html(strResult);
				qaUpdateBar.success(GetLanguagItem('productqa_update-helpful'));
			}

		},
		error: reportQAError
	});

}

function reportQAError(jqXHR, textStatus) {
	if (jqXHR.status > 0) {
		//alert("Error processing request, please try again.");
		qaUpdateBar.alert('Error processing request, please try again.');
		//alert(jqXHR.responseText);
		//alert(jqXHR.status + " - " + jqXHR);
	}
}