import { useState, useEffect } from "react";
import { getBooks } from "../api/bookApi";
import { Text, View } from "react-native";

export default function BooksScreen (){
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);  
    
    useEffect(() => {
        getBooks().then(data=> {
            setBooks(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Text>Laddar...</Text>
    }

    return (
        <View>
            <Text>Antal Böcker: {books.length}</Text>
        </View>
    )
    
}