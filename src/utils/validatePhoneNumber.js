function validatePhoneNumber(input_str) {
    var re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
  
    return re.test(input_str);
  }

  export default validatePhoneNumber
