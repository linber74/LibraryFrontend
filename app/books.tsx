import { useState, useEffect } from "react";
import { getBooks } from "../api/bookApi";
import { Text, View, FlatList, Pressable } from "react-native";
import { Book } from "../types/Book";
import { useRouter } from "expo-router";

export default function BooksScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getBooks()
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/item/${item.id.toString()}`)}>
          <Text>{item.title}</Text>
        </Pressable>
      )}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View>
          <Pressable onPress={() => router.push("/add-book")}>
            <Text>Lägg till bok</Text>
          </Pressable>
          {error && <Text>Något gick fel: {error}</Text>}
          {loading && <Text>Laddar...</Text>}
        </View>
      }
      ListEmptyComponent={
        !loading && !error ? <Text>Inga böcker än</Text> : undefined
      }
    />
  );
}
