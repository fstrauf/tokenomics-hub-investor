export const getLableNumber = (value) => {
  if(isNaN(value)){
    return 0
  } else {
    return value
  }
}

export const stringToKey = (name) => {
  return name.trim().replace(/\s+/g, '-').toLowerCase()
}