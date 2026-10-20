export function formatName(text: string): string {
    const trimmed = text.trim();

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}