export function preventLeadingSpaces(
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const target = event.target as HTMLInputElement;
  if (event.key === " " && target.selectionStart === 0) {
    event.preventDefault();
  }
}
