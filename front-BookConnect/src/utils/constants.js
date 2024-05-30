
export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const formatDateToLocaleES = (date) => { return new Date(date).toLocaleDateString("es-ES", {day: "2-digit", month: "2-digit", year: "numeric"}) };

export const formatDateToFormInput = (date) => { return new Date(date).toISOString().split('T')[0] };

export const todayYear = new Date().getFullYear();
