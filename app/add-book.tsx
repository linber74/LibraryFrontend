import { useState, useEffect } from "react"
import { Pressable, TextInput, Text, View } from "react-native"
import { Picker } from "@react-native-picker/picker";
import { getAllGenres, getAllLanguages } from "../api/libraryApi"

export default function AddBookScreen() {
     
    const [formData, setFormData] = useState({ title: "", language : "" , genre : [] as string[]});
    const [languages, setLanguages] = useState<string[]>([]);
    const [isAddingLanguage, setIsAddingLanguage] = useState(false);
    const [newLanguage, setNewLanguage] = useState("");
    const [genres, setGenres] = useState<string[]>([]);

    function handleAddLanguage() {
        const trimmed = newLanguage.trim();
        if (trimmed === "") {
            return 
        }

        const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()

        if (languages.includes(formatted)) {
            setFormData({ ...formData, language: formatted })
            setNewLanguage("");
            setIsAddingLanguage(false);
            return
        }
        
        setLanguages([...languages, formatted]);
        setFormData({ ...formData, language: formatted });
        setNewLanguage("");
        setIsAddingLanguage(false);
    }

    function toggleGenre(g: string) {
        if (formData.genre.includes(g)) {
            setFormData({ ...formData, genre: formData.genre.filter(x => x !== g)})
        } else {
            setFormData({ ...formData, genre: [...formData.genre, g]})
        }       
    }

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

    useEffect(() => {
        getAllGenres().then(data => {
            console.log(data);
            setGenres(data);
        }).catch(err => {
            console.log(err.message);
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
          onValueChange={(value) =>
            setFormData({ ...formData, language: value })
          }
        >
          <Picker.Item label="Välj språk..." value="" />
          {languages.map((lang) => (
            <Picker.Item key={lang} label={lang} value={lang} />
          ))}
        </Picker>
        <Pressable onPress={() => setIsAddingLanguage(!isAddingLanguage)}>
          <Text>+ Nytt Språk</Text>
        </Pressable>

        {isAddingLanguage && (
          <View>
            <TextInput
              value={newLanguage}
              onChangeText={(text) => setNewLanguage(text)}
            />
            <Pressable onPress={handleAddLanguage}>
              <Text>Lägg Till</Text>
            </Pressable>
          </View>
        )}

        <Text>Genre</Text>
        {genres.map((g) => (
          <Pressable key={g} onPress={() => toggleGenre(g)}>
            <Text>
              {formData.genre.includes(g) ? "✅ " : "☐ "}
              {g}
            </Text>
            </Pressable>
        ))}

        <Pressable onPress={handleSubmit}>
          <Text>Spara</Text>
        </Pressable>
      </View>
    );   
}