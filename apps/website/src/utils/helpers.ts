export function slugify(text: string) {
  return (
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      // eslint-disable-next-line no-useless-escape
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '')
  ); // Trim - from end of text
}
