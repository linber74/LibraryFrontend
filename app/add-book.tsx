import { useState, useEffect } from "react"
import { Pressable, TextInput, Text, View } from "react-native"
import { Picker } from "@react-native-picker/picker";
import { getAllLanguages } from "../api/libraryApi"

export default function AddBookScreen() {
     
    const [formData, setFormData] = useState({ title: "", language : ""});
    const [languages, setLanguages] = useState<string[]>([]);
    const [isAddingLanguage, setIsAddingLanguage] = useState(false);
    const [newLanguage, setNewLanguage] = useState("")

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
            <Picker
                selectedValue={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}   
            >
                <Picker.Item label="Välj språk..." value="" />
                {languages.map((lang) =>
                (<Picker.Item key={lang} label={lang} value={lang} />
                ))}
            </Picker>
            <Pressable onPress={ () => setIsAddingLanguage(!isAddingLanguage)}>
                <Text>+ Nytt Språk</Text>
            </Pressable>

            {isAddingLanguage && (
                <TextInput
                    value={newLanguage}
                    onChangeText={(text) => setNewLanguage(text)}
                />
            )}
            <Pressable onPress={handleSubmit}>
                <Text>Spara</Text>   
            </Pressable>
        </View>    
    );   
}
 