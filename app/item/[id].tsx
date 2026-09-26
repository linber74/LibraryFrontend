import { getBookById } from "@/api/bookApi";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Text } from "react-native";

function ItemDetailSearchParams() {
    const params = useLocalSearchParams();
    const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
    const id = (rawId === undefined || rawId.trim() === "") ? null : rawId;

    const [item, setItem] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (id === null) {
            setLoading(false);
            return;   
        }

        getBookById(id).then(result => {
            setItem(result);
            setLoading(false);
        }).catch(err => {

            if (err.response) {
                if (err.response.status === 404) {
                    setError("Hittades inte");
                } else {
                    setError("Något gick fel (" + err.response.status + ")");
                }
            } else {
                setError("Kunde inte nå servern - kontrollera din anslutning"); 
            }
            setLoading(false);
        });
    }, [id]);

    if (id === null) {
        return <Text>Ogiltigt id</Text>
    } else if (error != null) {
        return <Text>Något gick fel: {error}</Text>
    } else if (loading) {
        return <Text>Laddar...</Text>

    } else if (item === null){
        return <Text>Hittades inte</Text>
    }
}