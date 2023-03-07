export function passwordValidator(password) {
    const upper = /[A-Z]/g;
    const number = /[0-9]/g;
    if (!password) return "                  Password can't be empty."
    if (password.length < 8) return '                  Password must be at least 8 characters long.'
    if (password.length > 15) return '                  Password must not exceed 15 characters.'
    if (!upper.test(password)) return '                  Password must contain at least one upper \n                  case letter.'
    if(!number.test(password)) return '                  Password must contain at least one number.'
    return ''
  }