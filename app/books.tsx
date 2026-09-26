import { useState, useEffect } from "react";
import { getBooks } from "../api/bookApi";
import { Text, View, FlatList, Pressable } from "react-native";

type Book = {
    id: number; 
    title: string;
}

export default function BooksScreen (){
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState <string | null>(null);
    
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
          <Pressable onPress={() => console.log("Tryckte på", item.id)}>
            <Text>{item.title}</Text>
          </Pressable>
        )}
      />
    );
}