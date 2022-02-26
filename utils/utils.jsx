export function filterHeaders(headers) {
  let fHeaders = [];

  for (let index = 0; index < headers.length; index++) {
    if (headers[index] !== headers["Client"]) {
        fHeaders.push(headers[index]);
    } 
  }
  console.log("hjwduryuewi8orjkw2qioehjkie", fHeaders);
  return fHeaders;
}

export function isValidDate(value) {
    let date = new Date(value).toLocaleDateString();
    console.log(date);
    let isValid = date instanceof Date && !isNaN(value);
    
    console.log(isValid);
}
