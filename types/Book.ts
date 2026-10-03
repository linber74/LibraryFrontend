type Book = {
    id: number;
    title: string;
    genre: string[];
    language: string;
    seriesName: string | null;
    seriesPartNumber: number | null;
    author: string[];
    bookFormat: "Bok" | "Ebook" | "Ljudbok" | "Fanfiction";
    fanficType: "Canon" | "AU" | "Über" | "Original/Okänt" | null;
    fandom: string[] | null;
    synopsis: string | null;
}

export { Book }