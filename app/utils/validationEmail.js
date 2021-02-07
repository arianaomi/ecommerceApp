
export const validationEmail = text => {
  let reg =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (reg.test(text) === false) {
    return false
  } else {
    return true
  }
}