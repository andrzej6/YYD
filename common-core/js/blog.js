
//  Functions to show and hide content

jQuery(document).ready(function() {
    if (jQuery('.addthis_toolbox').length <= 0) {
        jQuery('.social-bookmarking').remove();
    } else {
        jQuery('#blog').addClass('post-page');
    }

    jQuery('.blogarchive').each(function() {
        if (jQuery('.post-image', this).html() != undefined) {
            jQuery(this).addClass('normal');
        }
    });
});


//  Add Relpy

var recaptchaContent = "";

function addReply(id) {
    var intHeight, intWidth;
    intHeight = 530;
    intWidth = 795;
    if (document.body.clientWidth < 767) {
        intHeight = 330;
        intWidth = 300;
    }
    try {
        if (recaptchaContent == "")
            recaptchaContent = jQuery("#divReCaptcha").clone(true, true);

        jQuery("#divReCaptcha").html("");
        jQuery("#divReCaptchaReply").html(recaptchaContent);
        Recaptcha.reload();
    } catch (e) {}
    jQuery("#commentid").val(id);

    jQuery("#divAddReply").modal({
        minHeight: intHeight,
        minWidth: intWidth,
        onShow: function(dialog) {
            jQuery("#imgBlogReplyCaptcha").attr("src", "/admin/image_pw.asp?sessionname=blogreply");
        },
        onClose: function(dialog) {
            try {
                closeModal()
            } catch (e) {
                jQuery.modal.close();
            }
        }
    });

    if (jQuery('#imgBlogReplyCaptcha').length <= 1) {
            jQuery("#imgBlogReplyCaptcha").attr("src", "/admin/image_pw.asp?sessionname=blogreply");
    }
}

// Validate Reply Form

function validateReply() {
    var valMsg = '';

    if (jQuery("#blog_comment_reply_name").val() == '')
        valMsg += '\nMissing Reply Name.';

    if (jQuery("#blog_comment_reply_email").val() == '')
        valMsg += '\nMissing Reply Email.';

    if (!validateEmail(jQuery("#blog_comment_reply_email").val()))
        valMsg += '\nInvalid Email Format.';

    if (jQuery("#blog_comment_reply_comment").val() == '')
        valMsg += '\nMissing Reply Text.';

    if (valMsg != '') {
        alert('Please fix the following errors before submitting reply\n' + valMsg);
        return (false);
    } else
        return (true);
}
// Validate Email Form

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
// Submit Reply 

function submitReply(id) {
    var result;
    bolSubmitting = 1;
    result = ajaxPostJson('savereply', 'frmCommentReply', validateReply);
}

jQuery('#submitReply').click(function(e) {
    e.preventDefault();
    var dataSubmit = jQuery(this).data("submit");
    submitReply(dataSubmit);
});

// Close Modal

function closeModal() {
   jQuery('button.close').trigger('click');
    window.location.reload();
    try {
        jQuery("#divReCaptchaReply").html("");
        jQuery("#divReCaptchaReply").html(recaptchaContent);
        Recaptcha.reload();
    } catch (e) {}
    jQuery.modal.close();
}

if (jQuery('#divReCaptcha').length <= 0) {
    jQuery('#divReCaptchaReply').remove();
} else {
    jQuery('button.close').click(function(event) {
        jQuery("#divReCaptchaReply").html("");
        jQuery('#divReCaptcha').html(recaptchaContent);
        Recaptcha.reload();
    });  
}


// Ajax Callback
function ajaxPostJson(caction, frmid, funcValidate) {

    var bolResult;
    var dataq;
    var isAsync = true;
    var d = new Date();
    var n = d.getMilliseconds();
    var reloadPage = false;
    var errorMsg = "";

    jQuery("#" + frmid + ' #cAction').val(caction);
    dataq = jQuery('#' + frmid).serialize() + '&ajaxsubmit=1';
    bolResult = true;

    //if (caction == 'savereply')
    isAsync = false;

    jQuery.ajax({
        url: 'blog.asp',
        dataType: 'json',
        type: 'post',
        data: dataq,
        cache: false,
        async: isAsync,
        beforeSend: funcValidate,
        statusCode: {
            301: function() {
                alert('301 - Reload the page.');
            },
            302: function() {
                alert('302 - Reload the page.');
            },
            304: function() {
                alert('304 - No new data returned.');
            },
            400: function() {
                alert('400 - Invalid Data Request.');
            },
            401: function() {
                alert('401 - Unauthorized request.');
            },
            403: function() {
                alert('403 - Request forbidden.');
            },
            404: function() {
                alert('404 - File Not Found.');
            },
            406: function() {
                alert('406 - Invalid Data format submitted.');
            },
            429: function() {
                alert('429 - Too many requests being processed at this time.');
            },
            500: function() {
                alert('500 - A problem was detected.');
            },
            502: function() {
                alert('502 - Server is down.');
            },
            503: function() {
                alert('503 - Server unavailable.');
            },
            504: function() {
                alert('504 - Gateway timeout.');
            }
        },
        success: function(strResult) {
            try {
                switch (caction) {
                    case 'savereply':
                        if (strResult.errorMsg != '') {
                            if (strResult.errorUrl != '')
                                window.location = strResult.errorUrl;
                            else
                                alert(strResult.errorMsg);
                            if (strResult.errorMsg != "Incorrect Verification Word")
                                closeModal();
                        } else {
                            if (strResult.commentReplies != '') {
                                alert("Your reply has been auto-approved and will display immediately.");
                                closeModal();
                                jQuery("#blogreply" + jQuery("#commentid").val()).html(strResult.commentReplies);
                            } else {
                                alert("Your reply to the comment will appear after it is approved by the Admin.");
                                closeModal();
                            }
                        }
                        break;

                    default:
                        break;
                }
            } catch (e) {}
        },

        error: function(jqXHR, textStatus) {
            document.body.style.cursor = '';
            if (jqXHR.statusCode > 0) {
                alert("Error processing request " + jqXHR.statusCode + " - " + jqXHR);
                alert(jqXHR.responseText);
                document.write(jqXHR.responseText);
                bolResult = false;
            }
        }
    });
    return (false);
}