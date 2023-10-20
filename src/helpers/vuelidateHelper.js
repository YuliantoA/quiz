

const defaultErrorMessages = {
  required: 'must be filled',
    moreThanStartDate: 'Wajib diisi setelah tanggal mulai',
    letterAndNumberOnly: 'only letter and number',
    numberOnly: 'only number',
  maxValue: 'value more than limit',
    email:'not valid',
    sameAsPassword:'not same'
};

export function getErrorMessages(vuelidateState, KeyInput = "kolom", customErrorMessages = {}) {
    if (!vuelidateState.$anyDirty) {
    return [];
  }
    const keys = Object.keys(vuelidateState);

  const errorMessages = { ...defaultErrorMessages, ...customErrorMessages };
  return keys
    .filter((k) => k.length > 0 && k.charAt(0) != '$' && !vuelidateState[k].$response)
      .map((k) => {
      return (KeyInput +' '+errorMessages[k]) || 'Invalid';
    });
}

export function letterAndNumberOnly(input) {
    return RegExp('^[a-zA-Z0-9_.-]*$').test(input) ?  true :  false
}
export function numberOnly(input) {
    return RegExp('^[0-9]*$').test(input) ?  true :  false
}
export function maxValue(input, param) {
    return Number(input) < param
}


