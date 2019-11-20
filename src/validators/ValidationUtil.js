/**
* Returns true if {str} is empty or white space
*/
export const isBlank = (str) => {
  const regex = /\S/ // checks if not white space exist
  return str === null || !regex.test(str)
}

/**
 * [isArabic description]
 * @param  {String}  str The value to be validated
 * @return {Boolean}     Returns false if {str} does contain non Arabic letters
 */
export const isArabic = (str) => {
  const regex = /^[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff0-9 ]*$/
  return regex.test(str)
}

export const isEnglish = (str) => {
  const regex = /^[a-zA-z0-9 ]*$/
  return regex.test(str)
}

export const isMoi = (value) => {
  const regex = /^(7)[0-9]{9}$/
  return regex.test(value)
}

export const isNin = (value) => {
  if (value >= 1000000000 && value <= 1999999999) {
    return true
  }
  return false
}

export const isIqama = (value) => {
  if (value >= 2000000000 && value <= 2999999999) {
    return true
  }
  return false
}
export const isDecimal = (str) => {
  const regex = /(\d+(\.\d+)?)/
  return regex.test(str)
}
export const isNumeric = (value) => {
  const regex = /^[0-9]*$/
  return regex.test(value)
}

export const isMobile = (value) => {
  const regex = /^9665[0-9]{8}$/
  return regex.test(value)
}
export const isInterNationalMobile = (value) => {
  const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/
  return regex.test(value)
}
export const noKeyMobile = (value) => {
  const regex = /^5[0-9]{8}$/
  return regex.test(value)
}
export const isEmail = (value) => {
  const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  return regex.test(value)
}

export const isPhone = (value) => {
  const regex = /^9661[1-9][0-9]{7}$/
  return regex.test(value)
}
export const isNumericAndDigits = (value) => {
  const regex = /[^A-Za-z0-9]+/
  return regex.test(value)
}

/**
 * Checks if the given data is correct
 * @param  {String}  date Date value to be validated
 * @return {Boolean}      true if the date is valid
 */
export const isDate = (date) => {
  const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
  return regex.test(date)
}

/**
 * Checks if username valid. Used usually in search fields
 * @param  {String}  username to be checked if it's containt the right letters
 * @return {Boolean}          true if the username is valid
 */
export const isUsername = (username) => {
  const regex = /^[a-zA-Z0-9]*/
  return regex.test(username)
}

export const isTrue = value => value
export const validators = {
  required: error => (value) => {
    if (isBlank(value)) {
      return error
    }
    return null
  },

  moi: error => (value) => {
    if (isMoi(value)) {
      return null
    }
    return error
  },
  moiOrNin: error => (value) => {
    if (isMoi(value) || isNin(value)) {
      return null
    }
    return error
  },
  nin: error => (nin) => {
    const value = parseInt(nin)
    if (isNin(value)) {
      return null
    }
    return error
  },

  iqama: error => (iqama) => {
    const value = parseInt(iqama)
    if (isIqama(value)) {
      return null
    }
    return error
  },

  ninOrIqama: error => (ninOrIqama) => {
    const value = parseInt(ninOrIqama)
    if (isIqama(value) || isNin(value)) {
      return null
    }
    return error
  },

  arabicLetters: error => (value) => {
    if (isArabic(value)) {
      return null
    }
    return error
  },

  englishLetters: error => (value) => {
    if (isEnglish(value)) {
      return null
    }
    return error
  },

  numeric: error => (value) => {
    if (isNumeric(value)) {
      return null
    }
    return error
  },
  numericAndDigits: error => (value) => {
    if (!isNumericAndDigits(value)) {
      return null
    }
    return error
  },
  decimal: error => (value) => {
    if (isDecimal(value)) {
      return null
    }
    return error
  },
  date: error => (value) => {
    if (isDate(value)) {
      return null
    }
    return error
  },

  email: error => (value) => {
    if (isEmail(value)) {
      return null
    }
    return error
  },

  mobile: error => (value) => {
    if (isMobile(value)) {
      return null
    }
    return error
  },
  interNationalMobile: error => (value) => {
    if (isInterNationalMobile(value)) {
      return null
    }
    return error
  },

  noKeyMobile: error => (value) => {
    if (noKeyMobile(value)) {
      return null
    }
    return error
  },
  phone: error => (value) => {
    if (isPhone(value)) {
      return null
    }
    return error
  },

  fixedLength: (error, length) => (value) => {
    if (value && value.length === length) {
      return null
    }
    return error
  },
  ListNotEmpty: error => (value) => {
    if (Object.values(value).length !== 0) {
      return null
    }
    return error
  },
  istrue: error => (value) => {
    if (isTrue(value)) {
      return null
    }
    return error
  },
  isHijriDate: error => (value) => {
    const year = value.substring(0, 4)
    const firstTowDigits = year.substring(0, 2)
    const month = value.substring(5, 7)
    const day = value.substring(8, 10)
    if (!isDate(value)) {
      return error
    }
    if (firstTowDigits !== '14') {
      return error
    }
    if (month < 1 || month > 12) {
      return error
    }
    if (day < 1 || day > 30) {
      return error
    }
    return null
  },
  notZero: error => (value) => {
    if (value <= 0) {
      return error
    }
    return null
  },
}
