export const readableDate = (date) => new Date(date * 1000).toLocaleDateString("EN-US", {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});