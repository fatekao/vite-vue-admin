export function isLocal() {
  return import.meta.env.VITE_API_ISLOCAL === 'true'
}
