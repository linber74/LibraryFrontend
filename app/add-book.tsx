import { useState } from "react"
import { Pressable, TextInput, Text, View } from "react-native"

export default function AddBookScreen() {
     
    const [formData, setFormData] = useState({ title: "", language : ""});
    
    function handleSubmit() {
        console.log(formData);
    }

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
 