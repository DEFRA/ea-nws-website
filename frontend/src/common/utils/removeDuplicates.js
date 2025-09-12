// Format text into sentence case and remove underscores
export const removeDuplicates = (data, key) => {
  return Array.from(new Map(data.map((item) => [item[key], item])).values())
}
