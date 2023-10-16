export function normalizeString(value) {
  return value.replaceAll('&quot;', '"').replaceAll('&#039;', "'").replaceAll('&rsquo;', "'").replaceAll('&amp;', "&")
}