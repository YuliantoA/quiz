export function normalizeString(value) {
  return value.replaceAll('&quot;', '"').replaceAll('&#039;', "'").replaceAll('&rsquo;', "'").replaceAll('&amp;', "&")
}

export function normalizeMessageFirebase(message) {
  return message.split(' (')[0]
}

export function serializeDateTime(dateTime) {
  dateTime = new Date(dateTime)
  return {time:dateTime.toLocaleTimeString('id-ID', { hour: 'numeric', minute: 'numeric' }), date: dateTime.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}
}
