


module.exports = (num) => {
  let data = String(num).split("").reverse().join("");
  let result = ''
  
  for(let i = 0; i < data.length; i++) {
    if(i % 3 == 0 && i !== 0){
      result += '.'
    }
    result += data[i]
  }

  result = `Rp. ${result.split("").reverse().join("")}`;
  return result
}