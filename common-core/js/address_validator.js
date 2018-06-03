var useAddressValidator;

// Get Elements By Id Functions

function getElementById_s(id) {
    var obj = null;
    if (document.getElementById) {
        /* Prefer the widely supported W3C DOM method, if 
    available:- 
    */
        obj = get_Element(id);
    } else if (document.all) {
        /* Branch to use document.all on document.all only 
    browsers. Requires that IDs are unique to the page 
    and do not coincide with NAME attributes on other 
    elements:- 
    */
        obj = document.all[id];
    }
    /* If no appropriate element retrieval mechanism exists on 
  this browser this function always returns null:- 
  */
    return obj;
}

function get_Element(i) {
    return document.getElementById(i) || document.getElementsByName(i).item(0);
}

// Close Modal Address Validator
function closeAddressValidatorModal() {
  jQuery('.close').trigger('click');
}


// Address Validator Continue in Pop Up US
function addressValidatorContinue(type) {
    useAddressValidator = '';
    doAddAddress(document.checkoutform);
    closeAddressValidatorModal();
}

// Verify Address 
function verify_address(address1, address2, city, state, country, zip, company, strTemplate) {
  if (useAddressValidator == "1") {
      get_Element('hdnAddrressValidatorResult').value = '';
      var url = 'addressvalidator.asp?no-cache=' + Math.random();
      var params = 'doaction=verify&ct=' + strTemplate;
      params += '&company=' + encodeURIComponent(company);
      params += '&address=' + encodeURIComponent(address1);
      params += '&address2=' + encodeURIComponent(address2);
      params += '&city=' + encodeURIComponent(city);
      params += '&state=' + encodeURIComponent(state);
      params += '&zip=' + encodeURIComponent(zip);

      if (address1 != '') {
          lastShippingAddress = params;
          jQuery.ajax({
              url: url,
              dataType: 'html',
              type: 'POST',
              data: params,
              cache: false,
              success: function(strResult) {
                  jQuery("#divAddrressValidator").html(strResult);
              },
              error: reportError
          });

          return false;
      }
  }
}

// Select Address 
function selectAddress(AddrressValidator_address1, AddrressValidator_address2, AddrressValidator_city, AddrressValidator_state, AddrressValidator_zip, address1, address2, city, state, zip) {

  closeAddressValidatorModal();

  var address1 = jQuery('#shipping_address').val();
  var address2 = jQuery('#shipping_address2').val();
  var city = jQuery('#shipping_city').val();
  var state = jQuery('#shipping_state').val();
  var zip = jQuery('#shipping_zip').val();

  address1 = AddrressValidator_address1;
  address2 = AddrressValidator_address2;
  city = AddrressValidator_city;
  zip = AddrressValidator_zip;
  state = AddrressValidator_state;
}

function reportError(jqXHR, textStatus) {
  ajax_request_progress = 0;
  if (jqXHR.status > 0) {
      alert("Error processing request " + jqXHR.status + " - " + jqXHR);
      //alert(jqXHR.responseText);
  }
}

// Select Address 
function doAddAddress(objForm) {

  objForm = document.checkoutform;

  //You should create the validator only after the definition of the HTML form
  var strMsg = "";
  if (document.checkoutform.address_alias.value.trim() == "")
      strMsg += " Please enter a address alias. Example: My address \n";
  if (document.checkoutform.shipping_firstname.value.trim() == "")
      strMsg += " Please enter your First Name \n" ;
  if (document.checkoutform.shipping_lastname.value.trim() == "")
      strMsg += " Please enter your Last Name \n" ;
  if (document.checkoutform.shipping_address.value.trim() == "")
      strMsg += " Please enter your address \n" ;
  if (document.checkoutform.shipping_city.value.trim() == "")
       strMsg += " Please enter your City \n" ;
  if (document.checkoutform.shipping_country.value.trim() == "")
       strMsg += " Please enter your Country \n";
  if (document.checkoutform.shipping_state.value.trim() == "")
       strMsg += " Please enter your Shipping State \n";
  if (document.checkoutform.shipping_zip.value.trim() == "")
       strMsg += " Please enter your zip code \n" ;


  if (strMsg != "") {
      alert(strMsg);
      return false;
  }


  var company = jQuery('#shipping_company').val();
  var address1 = jQuery('#shipping_address').val();
  var address2 = jQuery('#shipping_address2').val();
  var city = jQuery('#shipping_city').val();
  var state = jQuery('#shipping_state').val();
  var country = jQuery('#shipping_country').val();
  var zip = jQuery('#shipping_zip').val();

  if (useAddressValidator == "1" && country == "US") {
      verify_address(address1, address2, city, state, country, zip, company, 'addressbook');
  } else {
      objForm.submit();
  }
}


