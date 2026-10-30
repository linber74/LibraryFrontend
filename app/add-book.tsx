import { useState, useEffect } from "react";
import { Pressable, TextInput, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  getAllGenres,
  getAllLanguages,
  getAllSeriesInfo,
} from "../api/libraryApi";
import { formatName, formatPersonName } from "../utils/formatName";
import { getAllAuthors } from "../api/bookApi";

const BOOK_FORMATS = ["Bok", "Ebook", "Ljudbok", "Fanfiction"];
const FANFIC_TYPES = ["Canon", "AU", "Über", "Original/Okänt"];

export default function AddBookScreen() {
  const [formData, setFormData] = useState({
    title: "",
    language: "",
    genre: [] as string[],
    author: [] as string[],
    bookFormat: "",
    seriesName: "",
    seriesPartNumber: "",
    fanficType: "",
  });

  const [languages, setLanguages] = useState<string[]>([]);
  const [isAddingLanguage, setIsAddingLanguage] = useState(false);
  const [newLanguage, setNewLanguage] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [isAddingGenre, setIsAddingGenre] = useState(false);
  const [newGenre, setNewGenre] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [series, setSeries] = useState<string[]>([]);

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
    setFormData({
      ...formData,
      author: formData.author.filter((a) => a !== name),
    });
  }

  function addSuggestedAuthor(name: string) {
    setFormData({ ...formData, author: [...formData.author, name] });
    setNewAuthor("");
  }

  function handleSubmit() {
    console.log(formData);
  }

  const query = newAuthor.trim().toLowerCase();
  const suggestions =
    query === ""
      ? []
      : authors.filter(
          (a) =>
            a.toLowerCase().includes(query) && !formData.author.includes(a),
        );

  const seriesQuery = formData.seriesName.trim().toLowerCase();
  const seriesSuggestions =
    seriesQuery === ""
      ? []
      : series.filter(
          (s) =>
            s.toLowerCase().includes(seriesQuery) &&
            s.toLowerCase() !== seriesQuery,
        );

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

  useEffect(() => {
    getAllAuthors()
      .then((data) => {
        console.log(data);
        setAuthors(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getAllSeriesInfo()
      .then((data) => {
        console.log(data);
        setSeries(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <View>
      {/*title*/}
      <TextInput
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
      />

      {/*author*/}
      <Text>Författare</Text>
      <TextInput
        value={newAuthor}
        onChangeText={(text) => setNewAuthor(text)}
      />
      {suggestions.map((s) => (
        <Pressable key={s} onPress={() => addSuggestedAuthor(s)}>
          <Text>{s}</Text>
        </Pressable>
      ))}
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

      {/*genre*/}
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

      {/*language*/}
      <Text>Språk</Text>
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

      {/*bokformat*/}
      <Text>Bokformat</Text>
      <Picker
        selectedValue={formData.bookFormat}
        onValueChange={(value) =>
          setFormData({ ...formData, bookFormat: value })
        }
      >
        <Picker.Item label="Välj format..." value="" />
        {BOOK_FORMATS.map((f) => (
          <Picker.Item key={f} label={f} value={f} />
        ))}
      </Picker>

      {/*fanfiction type*/}
      {formData.bookFormat === "Fanfiction" && (
        <View>
          <Text>Fanfiction-typ</Text>
          <Picker
            selectedValue={formData.fanficType}
            onValueChange={(value) =>
              setFormData({ ...formData, fanficType: value })
            }
          >
            <Picker.Item label="Välj typ..." value="" />
            {FANFIC_TYPES.map((ff) => (
              <Picker.Item key={ff} label={ff} value={ff} />
            ))}
          </Picker>
        </View>
      )}

      {/*series*/}
      <Text>Serienamn</Text>
      <TextInput
        value={formData.seriesName}
        onChangeText={(text) => setFormData({ ...formData, seriesName: text })}
      />

      {seriesSuggestions.map((s) => (
        <Pressable
          key={s}
          onPress={() => setFormData({ ...formData, seriesName: s })}
        >
          <Text>{s}</Text>
        </Pressable>
      ))}

      {formData.seriesName.trim() !== "" && (
        <View>
          <Text>Del nummer</Text>
          <TextInput
            value={formData.seriesPartNumber}
            onChangeText={(text) =>
              setFormData({ ...formData, seriesPartNumber: text })
            }
            keyboardType="numeric"
          />
        </View>
      )}

      {/*Fandom*/}

      {/*universe later */}

      {/*save*/}
      <Pressable onPress={handleSubmit}>
        <Text>Spara</Text>
      </Pressable>
    </View>
  );
}
