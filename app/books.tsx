import { useState, useEffect } from "react";
import { getBooks } from "../api/bookApi";
import { Text, View, FlatList, Pressable } from "react-native";
import { Book } from "../types/Book";
import { useRouter } from "expo-router";

export default function BooksScreen (){
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        getBooks().then(data=> {
            setBooks(data);
            setLoading(false);
        }).catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (error) {
        return <Text>Något gick fel: {error}</Text>
    } else if (loading) {
        return <Text>Laddar...</Text>
    } else if (books.length == 0) {
        return <Text>Inga Böcker än</Text>
    }

    return (
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/item/${item.id.toString()}`)}>
            <Text>{item.title}</Text>
          </Pressable>
        )}
      />
    );
}