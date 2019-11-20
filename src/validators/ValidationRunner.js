
export const ValidationRunner = (fields, validations) => {
  const valiadationErrors = {}
  for(let f in fields) {
    valiadationErrors[f] = []
    if(validations[f]) {
      for(let v of validations[f]) {
        let result = v(fields[f], f)
        if(result) {
          valiadationErrors[f] = [...valiadationErrors[f], result]
          break
        }
      }
    }
  }
  return valiadationErrors
}
