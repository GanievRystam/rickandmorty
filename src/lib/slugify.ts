export function slugify(text: string): string {
  if (!text) throw new Error('Input text is required for slugify')
  
  return text
    .toString()
    .normalize('NFD') // Разбиваем акценты
    .replace(/[\u0300-\u036f]/g, '') // Удаляем диакритические знаки
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Пробелы на дефисы
    .replace(/[^\w-]/g, '') // Удаляем не-слова
    .replace(/-+/g, '-') // Убираем двойные дефисы
    .replace(/^-+|-+$/g, '') // Обрезаем дефисы по краям
}