/**
 * Возвращает завтрашнюю дату по UTC в формате YYYY-MM-DD.
 *
 * Функция использует текущее время по UTC, прибавляет один день (UTC day),
 * и возвращает результат в виде строки "год-месяц-день" с ведущими нулями,
 * например: "2025-05-31".
 *
 * Учитывает переходы на следующий месяц и следующий год.
 *
 * @returns {string} Строка завтрашней даты по UTC в формате "YYYY-MM-DD".
 */
export function getTomorrowUTCString() {
  const now = new Date()
  now.setUTCDate(now.getUTCDate() + 1)
  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const day = String(now.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
