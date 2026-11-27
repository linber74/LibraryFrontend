import { useState } from "react";
import { getBooks } from "../api/bookApi";
import { Text, View, FlatList, Pressable } from "react-native";
import { Book } from "../types/Book";
import { useRouter } from "expo-router";

const COLUMNS = [
  { key: "title", label: "Titel", flex: 2 },
  { key: "author", label: "Författare", flex: 2 },
  { key: "format", label: "Format", flex: 1 },
  { key: "language", label: "Språk", flex: 1 },
  { key: "genre", label: "Genre", flex: 1 },
  { key: "series", label: "Serie", flex: 1.5 },
];

function getCellText(book: Book, key: string): string {
  if (key == "title") {
    return book.title;
  }
  if (key == "author") {
    return book.author.join(", ");
  }
  if (key == "format") {
    return book.bookFormat;
  }
  if (key == "language") {
    return book.language;
  }
  if (key == "genre") {
    return book.genre.join(", ");
  }
  if (key == "series") {
    if (book.seriesName === null) {
      return "";
    } else if (book.seriesPartNumber === null) {
      return book.seriesName;
    } else {
      return book.seriesName + " #" + book.seriesPartNumber;
    }
  }
  return "";
}

export default function BooksScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  function loadAllBooks() {
    setLoading(true);
    setError(null);

    getBooks()
      .then((data) => {
        setBooks(data);
        setLoading(false);
        setHasSearched(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/item/${item.id.toString()}`)}>
          <View style={{ flexDirection: "row" }}>
            {COLUMNS.map((col) => (
              <Text key={col.key} style={{ flex: col.flex }}>
                {getCellText(item, col.key)}
              </Text>
            ))}
          </View>
        </Pressable>
      )}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View>
          <Pressable onPress={() => router.push("/add-book")}>
            <Text>Lägg till bok</Text>
          </Pressable>
          <Pressable onPress={loadAllBooks}>
            <Text>Visa alla Böcker</Text>
          </Pressable>
          {error && <Text>Något gick fel: {error}</Text>}
          {loading && <Text>Laddar...</Text>}
          {books.length > 0 && (
            <View style={{ flexDirection: "row" }}>
              {COLUMNS.map((col) => (
                <Text key={col.key} style={{ flex: col.flex, fontWeight: "bold" }}>{col.label}</Text>
              ))}
            </View>
          )}
        </View>
      }
      ListEmptyComponent={
        hasSearched && !loading && !error ? (
          <Text>Inga böcker än</Text>
        ) : undefined
      }
    />
  );
}
