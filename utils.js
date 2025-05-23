export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function padIndex(index, arrayLength) {
  const maxDigits = arrayLength.toString().length;
  return index.toString().padStart(maxDigits, "0");
}
