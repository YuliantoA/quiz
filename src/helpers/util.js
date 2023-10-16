export function dd() {
  if (import.meta.env.VITE_APP_MODE !== 'production') {
    console.log.apply(null, ['[Debug]', ...arguments]);
  }
}

export function randomRequestId() {
  return Math.floor(Math.random() * 999999);
}
