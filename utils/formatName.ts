export function formatName(text: string): string {
    const trimmed = text.trim();

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

function capitalizeParts(text: string, separator: string): string {
    const shares = text.split(separator);
    const bigShares = shares.map((share) => {
      return share.charAt(0).toUpperCase() + share.slice(1);
    });
    return bigShares.join(separator);
}

export function formatPersonName(text: string): string {
    let result = text.trim();
    result = capitalizeParts(result, " ");
    result = capitalizeParts(result, ".");
    result = capitalizeParts(result, "-");
    result = capitalizeParts(result, "'");
    return result;
}