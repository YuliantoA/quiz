export function normalizeString(value) {
  return value.replaceAll('&quot;', '"').replaceAll('&#039;', "'").replaceAll('&rsquo;', "'").replaceAll('&amp;', "&")
}

export function normalizeMessageFirebase(message) {
  return message.split(' (')[0]
}