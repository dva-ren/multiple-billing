export const getImageUrl = (name: string) => {
  return new URL(`../static/${name}`, import.meta.url).href
}
