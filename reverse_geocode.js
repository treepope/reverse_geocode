function reverse_geocode(dmsInput) {
    Utilities.sleep(1500);
  
    // ตรวจสอบว่าอินพุตเป็นตัวเลขทศนิยมหรือ DMS
    if (isDecimal(dmsInput)) {
      var latLng = dmsInput.split(",");
      var lat = parseFloat(latLng[0].trim());
      var lng = parseFloat(latLng[1].trim());
    } else {
      // แยก Latitude และ Longitude จาก DMS
      var parts = dmsInput.split(",");
      var latDMS = parts[0].trim();
      var lngDMS = parts[1].trim();
  
      // แปลง Latitude และ Longitude จาก DMS เป็นทศนิยม
      var lat = dmsToDecimal(latDMS);
      var lng = dmsToDecimal(lngDMS);
    }
  
    // เรียกใช้ Google Maps API เพื่อทำ Reverse Geocode
    var response = Maps.newGeocoder().reverseGeocode(lat, lng);
    for (var i = 0; i < response.results.length; i++) {
      var result = response.results[i];
      Logger.log('%s: %s, %s', result.formatted_address, result.geometry.location.lat,
      result.geometry.location.lng);
      return result.formatted_address;
    }
  }
  
  function isDecimal(input) {
    var decimalRegex = /^-?\d+(\.\d+)?$/;
    return decimalRegex.test(input.split(",")[0].trim());
  }
  
  function dmsToDecimal(dms) {
    var regex = /(\d+)\u00b0(\d+)'([\d.]+)"([NSEW])/;
    var matches = dms.match(regex);
  
    if (matches) {
      var degrees = parseFloat(matches[1]);
      var minutes = parseFloat(matches[2]);
      var seconds = parseFloat(matches[3]);
      var direction = matches[4];
  
      var decimal = degrees + (minutes / 60) + (seconds / 3600);
  
      // ถ้าเป็นทิศใต้หรือทิศตะวันตก ค่าเป็นลบ
      if (direction == "S" || direction == "W") {
        decimal = decimal * -1;
      }
      return decimal;
    } else {
      throw new Error("รูปแบบ DMS ไม่ถูกต้อง");
    }
  }