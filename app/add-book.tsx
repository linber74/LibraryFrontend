import { useState, useEffect } from "react";
import { Pressable, TextInput, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getAllGenres, getAllLanguages } from "../api/libraryApi";
import { formatName, formatPersonName } from "../utils/formatName";

export default function AddBookScreen() {
  const [formData, setFormData] = useState({
    title: "",
    language: "",
    genre: [] as string[],
    author: [] as string[],
  });
  const [languages, setLanguages] = useState<string[]>([]);
  const [isAddingLanguage, setIsAddingLanguage] = useState(false);
  const [newLanguage, setNewLanguage] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [isAddingGenre, setIsAddingGenre] = useState(false);
  const [newGenre, setNewGenre] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  function handleAddLanguage() {
    const formatted = formatName(newLanguage);

    if (formatted === "") {
      return;
    }

    if (languages.includes(formatted)) {
      setFormData({ ...formData, language: formatted });
      setNewLanguage("");
      setIsAddingLanguage(false);
      return;
    }

    setLanguages([...languages, formatted]);
    setFormData({ ...formData, language: formatted });
    setNewLanguage("");
    setIsAddingLanguage(false);
  }

  function toggleGenre(g: string) {
    if (formData.genre.includes(g)) {
      setFormData({
        ...formData,
        genre: formData.genre.filter((x) => x !== g),
      });
    } else {
      setFormData({ ...formData, genre: [...formData.genre, g] });
    }
  }

  function handleAddGenre() {
    const formatted = formatName(newGenre);

    if (formatted === "") {
      return;
    }

    if (genres.includes(formatted)) {
      if (!formData.genre.includes(formatted)) {
        setFormData({ ...formData, genre: [...formData.genre, formatted] });
      }
      setNewGenre("");
      setIsAddingGenre(false);
      return;
    }

    setGenres([...genres, formatted]);
    setFormData({ ...formData, genre: [...formData.genre, formatted] });
    setNewGenre("");
    setIsAddingGenre(false);
  }

  function handleAddAuthor() {
    const formatted = formatPersonName(newAuthor);

    if (formatted === "") {
      return;
    }

    if (formData.author.includes(formatted)) {
      setNewAuthor("");
      return;
    }
    setFormData({ ...formData, author: [...formData.author, formatted] });
    setNewAuthor("");
  }

  function removeAuthor(name: string) {
    setFormData({ ...formData, author: formData.author.filter ((a) => a !== name) });
  }

  function handleSubmit() {
    console.log(formData);
  }

  useEffect(() => {
    getAllLanguages()
      .then((data) => {
        console.log(data);
        setLanguages(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getAllGenres()
      .then((data) => {
        console.log(data);
        setGenres(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <View>
      <TextInput
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
      />
      <Text>Författare</Text>
      <TextInput
        value={newAuthor}
        onChangeText={(text) => setNewAuthor(text)}
      />
      <Pressable onPress={handleAddAuthor}>
        <Text>Lägg till författare</Text>
      </Pressable>
      {formData.author.map((name) => (
        <View key={name}>
          <Text>{name}</Text>
          <Pressable
            onPress={() => {
              removeAuthor(name);
            }}
          >
            <Text>X</Text>
          </Pressable>
        </View>
      ))}

      <Picker
        selectedValue={formData.language}
        onValueChange={(value) => setFormData({ ...formData, language: value })}
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

      <Pressable onPress={() => setIsAddingGenre(!isAddingGenre)}>
        <Text>+ Ny genre</Text>
      </Pressable>

      {isAddingGenre && (
        <View>
          <TextInput
            value={newGenre}
            onChangeText={(text) => setNewGenre(text)}
          />
          <Pressable onPress={handleAddGenre}>
            <Text>Lägg Till</Text>
          </Pressable>
        </View>
      )}

      <Pressable onPress={handleSubmit}>
        <Text>Spara</Text>
      </Pressable>
    </View>
  );
}
