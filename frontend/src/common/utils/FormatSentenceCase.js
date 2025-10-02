// Format text into sentence case and remove underscores
export const formatSentenceCase = (text) => {
  return text
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase())
}
