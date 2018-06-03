Stripe.applePay.stripeAccount = stripeApplePayAcct;
Stripe.setPublishableKey(stripeApplePayKey);

Stripe.applePay.checkAvailability(function (available) {
    if (available) {
        document.getElementById('apple-pay-button').style.display = 'block';
    }
});
document.getElementById('apple-pay-button').addEventListener('click', beginApplePay);

function beginApplePay() {
    if (jQuery("#add").length > 0) {
        var myForm = new FormData(jQuery("#add")[0]);
        var isItemAdded = false;
        jQuery.ajax({
            url: '/add_cart.asp?applepay=1',
            type: 'POST',
            data: myForm,
            cache: false,
            async: false,
            processData: false,
            contentType: false,
            success: function (strResponse, status, xhr) {
                var strCurrentUrl = xhr.getResponseHeader("CurrentURL");
                console.log(strCurrentUrl);
                isItemAdded = true;
                if (strCurrentUrl == "/error.asp" || strCurrentUrl == "message.asp") {
                    isItemAdded = false;
                    return;
                }
            },
            error: function (xhr, status, error) {
                console.log("error: " + error);
                isItemAdded = false;
                return;
            }
        });

        if (!isItemAdded) {
            return;
        }
    }

    var initialLines;
    var initialTotalLine;

    jQuery.ajax({
        url: '/checkout_applepay.asp',
        type: 'POST',
        dataType: 'text',
        data: 'action=orderdetail&hdnSecurityToken=[securityToken]',
        cache: false,
        async: false,
        success: function (strResponse) {
            console.log(strResponse);
            var jsonResponse = JSON.parse(strResponse.replace("\\", ""));
            initialLines = jsonResponse.LineItems;
            initialTotalLine = jsonResponse.TotalLine;
        },
        error: function (xhr, status, error) {
            updateErrorDescription("Error when start Apple Pay.");
        }
    });

    var paymentRequest = {
        requiredBillingContactFields: ["postalAddress", "name"],
        requiredShippingContactFields: ["postalAddress", "name", "phone", "email"],
        countryCode: 'US',
        currencyCode: 'USD',
        lineItems: initialLines,
        total: initialTotalLine
    };
    var session = Stripe.applePay.buildSession(paymentRequest,
      function (result, completion) {
          console.log(result);
          jQuery.ajax({
              url: '/checkout_applepay.asp',
              type: 'POST',
              dataType: 'text',
              data: 'action=checkout&hdnSecurityToken=[securityToken]&checkout=' + encodeURIComponent(JSON.stringify(result)),
              cache: false,
              success: function (strResponse) {
                  console.log(strResponse);
                  var jsonResponse = JSON.parse(strResponse.replace("\\", ""));
                  completion(ApplePaySession.STATUS_SUCCESS);
                  window.location.href = jsonResponse.RedirectUrl;
              },
              error: function (xhr, status, error) {
                  completion(ApplePaySession.STATUS_FAILURE);
                  updateErrorDescription("Error when charging credit card. " + error);
              }
          });

      }, function (error) {
          console.log(error.message);
      }
    );

    var myShippingContact;
    session.onshippingcontactselected = function (event) {
        myShippingContact = event.shippingContact;
        jQuery.ajax({
            url: '/checkout_applepay.asp',
            type: 'POST',
            dataType: 'text',
            data: 'action=shipping&hdnSecurityToken=[securityToken]&shippingAddressJson=' + encodeURIComponent(JSON.stringify(myShippingContact)),
            cache: false,
            success: function (strResponse) {
                console.log(strResponse);
                var jsonResponse = JSON.parse(strResponse.replace("\\", ""));
                session.completeShippingContactSelection(ApplePaySession.STATUS_SUCCESS, jsonResponse.ShippingMethods, jsonResponse.TotalLine, jsonResponse.LineItems);
            },
            error: function (xhr, status, error) {
                session.completeShippingContactSelection(ApplePaySession.STATUS_FAILURE, [], initialTotalLine, initialLines);
                updateErrorDescription("Error when selecting shipping contact.");
            }
        });
    }

    session.onshippingmethodselected = function (event) {
        jQuery.ajax({
            url: '/checkout_applepay.asp',
            type: 'POST',
            dataType: 'text',
            data: 'action=shipping&hdnSecurityToken=[securityToken]&shippingAddressJson=' + encodeURIComponent(JSON.stringify(myShippingContact)) + "&shippingMethodSelected=" + event.shippingMethod.identifier,
            cache: false,
            success: function (strResponse) {
                console.log(strResponse);
                var jsonResponse = JSON.parse(strResponse.replace("\\", ""));

                session.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS, jsonResponse.TotalLine, jsonResponse.LineItems);
            },
            error: function (xhr, status, error) {
                session.completeShippingMethodSelection(ApplePaySession.STATUS_FAILURE, initialTotalLine, initialLines);
                updateErrorDescription("Error when selecting shipping method.");
            }
        });
    }

    session.begin();
}

function updateErrorDescription(strErrorDescription) {
    jQuery.ajax({
        url: '/checkout_applepay.asp',
        type: 'POST',
        dataType: 'text',
        data: 'action=error&errordescription=' + encodeURIComponent('[Apple Pay] ' + strErrorDescription) + '&hdnSecurityToken=[securityToken]'
    });
}

