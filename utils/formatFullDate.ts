export function formatFullDate(raw?: string): string {
  if (!raw || raw.trim() === '') return ''

  const cleaned = raw.replace(',', '').trim()
  const parts = cleaned.split(' ')

  if (parts.length < 3) return ''

  const [day, month, year] = parts
  const dayFormatted = day.padStart(2, '0')

  return `${dayFormatted} ${month} ${year}`
}
