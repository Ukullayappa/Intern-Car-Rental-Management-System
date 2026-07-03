export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value) {
  return /^[0-9+\-\s()]{7,15}$/.test(value.trim());
}

export function isFutureOrToday(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateStr);
  return date >= today;
}

export function isAfterDate(endStr, startStr) {
  if (!endStr || !startStr) return false;
  return new Date(endStr) > new Date(startStr);
}
