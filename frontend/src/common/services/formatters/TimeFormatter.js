// GOV.UK time format: 'h.mm(am/pm) (no leading zero on hour)
export function formatGovUKTime(input = new Date()) {
  const d = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(d.getTime())) return ''

  const h24 = d.getHours()
  const mins = d.getMinutes()
  const suffix = h24 >= 12 ? 'pm' : 'am'
  const h12 = h24 % 12 || 12
  const mm = String(mins).padStart(2, '0')

  return `${h12}.${mm}${suffix}`
}
