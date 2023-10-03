export function formatDate(date) {
  const options = {day: 'numeric', month: 'long', year: 'numeric'}
  const formattedDate = date.toLocaleDateString('ru-RU', options);
  return formattedDate.replace(' г.', '')
}
