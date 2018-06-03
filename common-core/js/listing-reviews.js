/**
* create-review-link
***********************/
jQuery('.createreview-link').click(function (e) {
	e.preventDefault();
	jQuery('#createreview-modal').modal('show');
});

function showReview(catalogid, reviewid, rating, approved, short_description, long_description, product_name, location, email, name, files, canDelete) {
    jQuery('#createreview-modal').modal('show');
    jQuery('#createreview-shorReview').val(short_description);
    jQuery('#createreview-longReview').val(long_description);
    jQuery('#createreview-userCity').val(location);
    jQuery('#createreview-custEmail').val(email);
    jQuery('#createreview-custName').val(name);
    jQuery('#rating-input-1-' + rating).prop('checked', true);
    jQuery('#reviewImageList').empty();
    intReviewId = reviewid;
    intCatalogId = catalogid;

    var arrFiles = files.split('-||-');

    var strFileAttachment = '';
    arrFiles.forEach(function (file) {
        if (file != undefined && file != '') {
            var arrFile = file.split('|--|');

            var intFileId = arrFile[0];
            var strFileName = arrFile[1];

            if (strFileAttachment != '') strFileAttachment += ',';

            strFileAttachment += strFileName;

            var li = document.createElement('li');
            li.setAttribute('class', 'review-image-col');
            li.setAttribute('id', 'liFile' + intFileId);


            var strFileBlock = "<a href='assets/product_review_files/" + strFileName + "' class='MagicZoomPlus' target='_blank'><img src='thumbnail.asp?file=assets/product_review_files/" + strFileName + "&amp;maxx=100&amp;maxy=0' border='0' width='100' height='100'></a>";

            if (canDelete) {
                strFileBlock += "<a href='javascript:void(0);' class='btn btn-xs btn-default btn-center-delete-review-image' onclick='deleteOneFile(\"" + strFileName + "\", " + reviewid + ", " + intFileId + ", " + catalogid + ");'>&times;</a>";
            }

            li.innerHTML = strFileBlock;

            reviewImageList.appendChild(li);
        }
    });

    jQuery('#fileattachment').val(strFileAttachment);
    list = strFileAttachment.split(",");
    list = list.filter(function (v) { return v !== "" });
}

function sendReviewRequest() {
	var stars = jQuery('#createreview-modal .rating-input:checked').val();
	var name = jQuery.trim(jQuery('#createreview-custName').val());
	var email = jQuery.trim(jQuery('#createreview-custEmail').val());
	var location = jQuery.trim(jQuery('#createreview-userCity').val());
	var title = jQuery.trim(jQuery('#createreview-shorReview').val());
	var review = jQuery.trim(jQuery('#createreview-longReview').val());
	var files = jQuery.trim(jQuery('#fileattachment').val());
	var ramdomWord = jQuery.trim(jQuery('#createreview-modal input[name="ramdomWord"]').val());
	var recaptcha_response_field = jQuery.trim(jQuery('#createreview-modal input[name="recaptcha_response_field"]').val());
	var recaptcha_challenge_field = jQuery.trim(jQuery('#createreview-modal input[name="recaptcha_challenge_field"]').val());
	var g_recaptcha_response = jQuery.trim(jQuery('#createreview-modal  [name="g-recaptcha-response"]').val());

	var valid = true;
	var reviewValidationMsg = "";

	if (stars == '' || stars == undefined) { reviewValidationMsg += "Please select the stars rating. \n"; valid = false; }
	if (name == '' || name.length > 50) { reviewValidationMsg += "Please enter your First and Last Name. Max length for Name is 50. \n"; valid = false; }
	if (email == '' || email.length > 100) { reviewValidationMsg += "Please enter your E-mail. Max length for Email is 100. \n" }
	if (location == '' || location.length > 50) { reviewValidationMsg += "Please enter your City. Max length for City is 50. \n"; valid = false; }
	if (title == '') { reviewValidationMsg += "Please enter your review title. \n"; valid = false; }
	if (review == '' || review.length > 2500) { reviewValidationMsg += "Please enter your review. Max length for Review is 2500. \n"; valid = false; }

	if (!valid) {
		jQuery('#createreview-modal .loading-overlay').fadeOut(500);
		alert(reviewValidationMsg);
		return;
	}
	else {
	    var intThisCatalogId = jQuery('#catalogid').val();
	    if (intThisCatalogId == undefined) intThisCatalogId = intCatalogId;

		jQuery('#createreview-modal .loading-overlay').show();
		jQuery.ajax({
			method: "POST",
			url: '/review.asp?action=ajax&catalogid=' + intThisCatalogId,
			data: {
				ajaxAction: "create",
				user_name: name,
				user_email: email,
				user_city: location,
				short_review: title,
				long_review: review,
				rating: stars,
				fileattachment: files,
				reviewid: intReviewId,
				ramdomWord: ramdomWord,
				recaptcha_response_field: recaptcha_response_field,
				recaptcha_challenge_field: recaptcha_challenge_field,
				'g-recaptcha-response': g_recaptcha_response
			},
			success: function (data) {
				var response = JSON.parse(data);
				if (response.resCode != undefined) {
					jQuery('#createreview-modal .loading-overlay').hide();
					if (response.resCode == 1) {
						jQuery('#createreview-modal .modal-response').fadeIn(500);
						refereshAllCaptchas();
					}
					else {
						alert(response.resMsg);
					}
				}
			},
			error: function () {
				alert('Something went wrong. Please try again later.');
			},
			complete: function () {
				jQuery('#createreview-modal .loading-overlay').fadeOut(500);
			}
		});
	}
}

jQuery('#createreview_button').click(function () {
	jQuery('.createreview-error').hide();
	processCaptchaEexcute('createreview-modal', 'sendReviewRequest');
});

function ReviewSortingChange() {
	var url = '';
	var params = '';

	params = 'itemid=' + add.item_id.value;
	params += '&reviewsorting=' + add.review_sorting.options[add.review_sorting.selectedIndex].value;
	params += '&categoryid=' + add.category_id.value;
	url = 'reviewSorting_ajax.asp?' + params + '&no-cache=' + Math.random();

	jQuery.ajax({
		url: url,
		dataType: 'html',
		type: 'GET',
		cache: false,
		success: function (strResult) {
			if (strResult != '') {
				jQuery('#reviewsBlock').fadeOut("slow", function () {
					strResult = '<div class="reviewsBlock" style="display:none;"  id="reviewsBlock" itemprop="review" itemscope itemtype="http://schema.org/Review">' + strResult + '</div>'
					jQuery('#reviewsBlock').replaceWith(strResult);
					jQuery('#reviewsBlock').fadeIn("slow");
				});
			}
		}
		//error: alert("error");
	});
}

var bUploading = false;
var list = [];
var intReviewId = 0;
var intCatalogId = 0;

jQuery(function () {

	if (jQuery("#fileattachment").length > 0) {
		list = jQuery("#fileattachment").val().split(",");
		list = list.filter(function (v) { return v !== "" });
	}
	

	jQuery('#fileupload').fileupload({
		dataType: 'json',
		add: function (e, data) {

			var extn = "", filename = "";
			var intFilesUploaded = 0;

			if (jQuery("#fileattachment").val() != "") {
				intFilesUploaded = jQuery("#fileattachment").val().split(",").length;
			}

			if (data.originalFiles.length > 4 || (data.originalFiles.length + intFilesUploaded) > 4) {
				alert(GetLanguagItem("product_review_images_limit"));
				return false;
			} else {
				var filename = data.files[0].name;

				if (filename.lastIndexOf(".") > 0) {
					extn = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
					if (extn.toLowerCase() == "gif" || extn.toLowerCase() == "jpg" || extn.toLowerCase() == "jpeg" || extn.toLowerCase() == "png") {
						//data.context = jQuery('<p/>').text('[product_review_images_uploading]').appendTo(document.body);
						data.submit();
					} else {
						alert(GetLanguagItem("product_review_images_extension"));
					}
				}
			}

		},
		done: function (e, data) {
			jQuery("#allelements").empty();
			jQuery("#fileattachment").empty();

			jQuery.each(data.result.files, function (index, file) {

				var filenamewithoutextension = file.uniqueFileName.substr(0, file.uniqueFileName.lastIndexOf('.')) || file.uniqueFileName;

				var strlink = "<span onclick='deleteFile(\"" + file.uniqueFileName + "\");'><i class='icon-cancel'></i></span>";
				var strFileDownloadLink = "filesaction.asp?action=download&hid=[filehash]&folder=temp&file=" + file.uniqueFileName + "";
				jQuery("#files").append('<p id="' + file.uniqueFileName + '"  class="' + filenamewithoutextension + '"  ><a id=' + filenamewithoutextension + ' href= ' + strFileDownloadLink + '>' + file.name + '</a><span class="item-remove" >' + strlink + '</span></p>');

				list.push(file.uniqueFileName);

			});

			jQuery("#fileattachment").val(list);


		},
		progressall: function (e, data) {
			bUploading = true;
			var progress = parseInt(data.loaded / data.total * 100, 10);
			if (progress >= 100)
				bUploading = false;

			jQuery('#progress .bar').css(
				'width',
				progress + '%'
			);
		},
	});
});

function deleteFile(fileName) {
	var delyesno = (confirm(GetLanguagItem("product_review_images_confirm_delete")));
	if (delyesno) {
		jQuery.get('filesaction.asp',
			{
				action: "delete",
				file: fileName,
				hid: '[filehash]',
				folder: "temp",
				confirm: true,
				crmid: 0
			},
			function (result) {
				try {
					var msg = result.errorMsg;
					if (msg != '' && msg != undefined) {
						alert(msg);
						return false;
					}
				} catch (e) {
				}
			});

		jQuery('#progress .bar').css(
			'width',
			0 + '%'
		);

		var filenamewithoutextension = fileName.substr(0, fileName.lastIndexOf('.')) || fileName;
		var filenamewithoutextension = filenamewithoutextension.replace('(', '\\(');
		var filenamewithoutextension = filenamewithoutextension.replace(')', '\\)');

		jQuery('.' + filenamewithoutextension).remove();

		list.splice(list.indexOf(fileName), 1);
		jQuery("#fileattachment").val(list);

	}
	return false;
}

function deleteOneFile(fileName, review_id, image_id, catalogid) {
	var delyesno = (confirm(GetLanguagItem("product_review_images_confirm_delete")));
	if (delyesno) {

		jQuery.get('review.asp',
			{
				action: "deleteImage",
				file: fileName,
				hid: jQuery('#hdnFileHash').val(),
				confirm: true,
				review_id: review_id,
				image_id: image_id,
				catalogid: catalogid,
				hdnSecurityToken: '[securityToken]'
			},
			function (result) {
				try {
					if (result != '' && result != undefined) {
					    alert(result);
						return false;
					}
				} catch (e) {
				}
			});

		jQuery("#liFile" + image_id).addClass('strikeout').slideUp();

		list.splice(list.indexOf(fileName), 1);
		jQuery("#fileattachment").val(list);

	}
	return false;
}