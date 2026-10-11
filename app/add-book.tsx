import { useState, useEffect } from "react"
import { Pressable, TextInput, Text, View } from "react-native"
import { getAllLanguages } from "../api/libraryApi"

export default function AddBookScreen() {
     
    const [formData, setFormData] = useState({ title: "", language : ""});
    const [languages, setLanguages] = useState<string[]>([])
    function handleSubmit() {
        console.log(formData);
    }

    useEffect(() => {
        getAllLanguages().then(data => {
            console.log(data);
            setLanguages(data);
        }).catch(err => {
            console.log(err.message)
        })
    }, []);

    return (
        <View>
            <TextInput
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}    
            />
            <TextInput
                value={formData.language}
                
            />
            <Pressable onPress={handleSubmit}>
                <Text>Spara</Text>   
            </Pressable>
        </View>    
    );   
}
 