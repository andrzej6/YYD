$(function () {
	calcHeight();
});

/* On the window resize event. */
jQuery(window).resize(function () {
	calcHeight();
});

/* On the device orientation change event. */
jQuery(window).bind('orientationchange', function (event) {
	calcHeight();
});

function calcHeight() {
	jQuery('.height').css('min-height', 'auto');
	if(window.innerWidth > 991 ) {
		var highestCol = jQuery('.alpha-col .height').outerHeight();
		jQuery('.height').css('min-height', highestCol);
	}
}

function resetLoginPass() {
	if (jQuery('#Email4Password').val() != '') {
		document.forgotPass.submit();
	}
	else {
		alert('To Reset your password, Please enter your email address and then click "' + GetLanguagItem('login_resetpasswordbutton') + '".');
	}
}

/* Moving to parsley.js
(function () {
	(function ($) {
		'use strict';
		var floatingLabel;
		floatingLabel = function (onload) {
			var $input;
			$input = $(this);
			if (onload) {
				$.each($('.bt-flabels__wrapper input'), function (index, value) {
					var $current_input;
					$current_input = $(value);
					if ($current_input.val()) {
						$current_input.closest('.bt-flabels__wrapper').addClass('bt-flabel__float');
					}
				});
			}
			setTimeout(function () {
				if ($input.val()) {
					$input.closest('.bt-flabels__wrapper').addClass('bt-flabel__float');
				} else {
					$input.closest('.bt-flabels__wrapper').removeClass('bt-flabel__float');
				}
			}, 1);
		};
		$('.bt-flabels__wrapper input').keydown(floatingLabel);
		$('.bt-flabels__wrapper input').change(floatingLabel);
		window.addEventListener('load', floatingLabel(true), false);
		$('.js-flabels').parsley().on('form:error', function () {
			$.each(this.fields, function (key, field) {
				if (field.validationResult !== true) {
					field.$element.closest('.bt-flabels__wrapper').addClass('bt-flabels__error');
				}
			});
		});
		$('.js-flabels').parsley().on('field:validated', function () {
			if (this.validationResult === true) {
				this.$element.closest('.bt-flabels__wrapper').removeClass('bt-flabels__error');
			} else {
				this.$element.closest('.bt-flabels__wrapper').addClass('bt-flabels__error');
			}
		});
	}(jQuery));
}.call(this));
*/
//# sourceURL=pen.js


/* Password Reset */
function savePass(objForm) {
    var strMsg = "";
    if (objForm.password.value.trim() == "")
        strMsg += " - New password cannot be blank.\n"
    if (objForm.password2.value.trim() != objForm.password.value.trim())
        strMsg += " - Password confirmation doesn't match.\n"

    if (!objForm.password.value.match(/(?=^.{8,16}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/) && '[verifystrongpassword]' == '1')
        strMsg += " - [CustomerInfo_password_policy*script] does not match the password policy.\n";

    //<!--START: captchascript-->
    if (objForm.randomWord.value.trim() == "")
        strMsg += " - Verification word cannot be blank.\n"
    //<!--END: captchascript-->

    if (strMsg != "") {
        alert(strMsg);
        return false;
    }

    objForm.submit();
}
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}
