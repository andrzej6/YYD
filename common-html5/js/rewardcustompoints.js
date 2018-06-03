// JavaScript source code
function triggerRewardModal() {
    var src = 'rewardmodal.asp?sec=reg&hdnSecurityToken=[secToken]&produrl=[product_url]';
    var intHeight, intWidth;
    intHeight = 400;
    intWidth = 450;
    jQuery.modal('<iframe src="' + src + '" height="' + intHeight + '" width="' + intWidth + '" style="border:0; background:#fff">', {
        closeClass: 'modalCloseImg',
        closeHTML: '<a href="#">Close</a>',
        containerCss: {
            backgroundColor: "#fff",
            borderColor: "#fff",
            height: intHeight,
            padding: 0,
            width: (intWidth + 5)
        },
        overlayClose: true,
        onShow: function (dialog) {
            dialog.wrap.css('overflow', 'hidden');
        }
    });
}