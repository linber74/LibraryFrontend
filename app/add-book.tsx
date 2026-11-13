import { useState, useEffect } from "react";
import { Pressable, TextInput, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  getAllGenres,
  getAllLanguages,
  getAllSeriesInfo,
  getAllUniverses,
} from "../api/libraryApi";
import {
  formatName,
  formatPersonName,
  capitalizeFirst,
} from "../utils/formatName";
import { getAllAuthors, getAllFandoms, addBook } from "../api/bookApi";

const BOOK_FORMATS = ["Bok", "Ebook", "Ljudbok", "Fanfiction"];
const FANFIC_TYPES = ["Canon", "AU", "Über", "Original/Okänt"];
const EMPTY_FORM = {
  title: "",
  language: "",
  genre: [] as string[],
  author: [] as string[],
  bookFormat: "",
  seriesName: "",
  seriesPartNumber: "",
  fanficType: "",
  fandom: [] as string[],
  universeName: "",
  synopsis: "",
};

export default function AddBookScreen() {
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [languages, setLanguages] = useState<string[]>([]);
  const [isAddingLanguage, setIsAddingLanguage] = useState(false);
  const [newLanguage, setNewLanguage] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [isAddingGenre, setIsAddingGenre] = useState(false);
  const [newGenre, setNewGenre] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [series, setSeries] = useState<string[]>([]);
  const [fandoms, setFandoms] = useState<string[]>([]);
  const [newFandom, setNewFandom] = useState("");
  const [universes, setUniverses] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

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

  function handleAddFandom() {
    const formatted = capitalizeFirst(newFandom);

    if (formatted === "") {
      return;
    }

    if (formData.fandom.includes(formatted)) {
      setNewFandom("");
      return;
    }
    setFormData({ ...formData, fandom: [...formData.fandom, formatted] });
    setNewFandom("");
  }

  function removeFandom(name: string) {
    setFormData({
      ...formData,
      fandom: formData.fandom.filter((f) => f !== name),
    });
  }

  function addSuggestedFandom(name: string) {
    setFormData({ ...formData, fandom: [...formData.fandom, name] });
    setNewFandom("");
  }

  function handleSubmit() {
    const newErrors: string[] = [];

    if (formData.title.trim() === "") {
      newErrors.push("Titel saknas");
    }
    if (formData.language === "") {
      newErrors.push("Språk saknas");
    }
    if (formData.author.length === 0) {
      newErrors.push("Minst en författare krävs");
    }
    if (formData.bookFormat === "") {
      newErrors.push("Bokformat saknas");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setMessage("");
      return;
    }

    setErrors([]);

    const isFanFic = formData.bookFormat === "Fanfiction";
    const seriesName = formData.seriesName.trim();
    const universeName = formData.universeName.trim();
    const synopsis = formData.synopsis.trim();

    const bookRequest = {
      title: formData.title.trim(),
      language: formData.language,
      genre: formData.genre,
      author: formData.author,
      bookFormat: formData.bookFormat,
      seriesName: seriesName === "" ? null : capitalizeFirst(seriesName),

      seriesPartNumber:
        seriesName === "" || formData.seriesPartNumber.trim() === ""
          ? null
          : Number(formData.seriesPartNumber),

      fanficType:
        isFanFic && formData.fanficType !== "" ? formData.fanficType : null,

      fandom: isFanFic ? formData.fandom : [],

      universeName: universeName === "" ? null : capitalizeFirst(universeName),
      synopsis: synopsis === "" ? null : synopsis,
    };
    console.log(bookRequest);
    addBook(bookRequest)
      .then((data) => {
        console.log("Sparad:", data);
        setFormData(EMPTY_FORM);
        setNewAuthor("");
        setNewFandom("");
        setMessage("Boken är sparad ✅");
      })
      .catch((err) => {
        console.log(err.message);
        setMessage("Något gick fel: " + err.message);
      });
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

  const fandomQuery = newFandom.trim().toLowerCase();
  const fandomsSuggestions =
    fandomQuery === ""
      ? []
      : fandoms.filter(
          (f) =>
            f.toLowerCase().includes(fandomQuery) &&
            !formData.fandom.includes(f),
        );

  const universeQuery = formData.universeName.trim().toLowerCase();
  const universeSuggestions =
    universeQuery === ""
      ? []
      : universes.filter(
          (u) =>
            u.toLowerCase().includes(universeQuery) &&
            u.toLowerCase() !== universeQuery,
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

  useEffect(() => {
    getAllFandoms()
      .then((data) => {
        console.log(data);
        setFandoms(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getAllUniverses()
      .then((data) => {
        console.log(data);
        setUniverses(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <View>
      {/*title*/}
      <Text>Titel</Text>
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

      {/*Fandom*/}
      {formData.bookFormat === "Fanfiction" && (
        <View>
          <Text>Fandom</Text>
          <TextInput
            value={newFandom}
            onChangeText={(text) => setNewFandom(text)}
          />
          {fandomsSuggestions.map((f) => (
            <Pressable key={f} onPress={() => addSuggestedFandom(f)}>
              <Text>{f}</Text>
            </Pressable>
          ))}
          <Pressable onPress={handleAddFandom}>
            <Text>Lägg till fandom</Text>
          </Pressable>
          {formData.fandom.map((name) => (
            <View key={name}>
              <Text>{name}</Text>
              <Pressable
                onPress={() => {
                  removeFandom(name);
                }}
              >
                <Text>X</Text>
              </Pressable>
            </View>
          ))}
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
              setFormData({
                ...formData,
                seriesPartNumber: text.replace(/\D/g, ""),
              })
            }
            keyboardType="numeric"
          />
        </View>
      )}

      {/*universe */}
      <Text>Universum</Text>
      <TextInput
        value={formData.universeName}
        onChangeText={(text) =>
          setFormData({ ...formData, universeName: text })
        }
      />

      {universeSuggestions.map((u) => (
        <Pressable
          key={u}
          onPress={() => setFormData({ ...formData, universeName: u })}
        >
          <Text>{u}</Text>
        </Pressable>
      ))}

      {/*synopsis*/}
      <Text>Sammanfattning</Text>
      <TextInput
        value={formData.synopsis}
        onChangeText={(text) => setFormData({ ...formData, synopsis: text })}
        multiline={true}
        maxLength={1000}
      />
      <Text>{formData.synopsis.length} / 1000</Text>

      {/*save*/}
      <Pressable onPress={handleSubmit}>
        <Text>Spara</Text>
      </Pressable>
      {errors.map((e) => (
        <Text key={e}>{e}</Text>
      ))}
      {message !== "" && <Text>{message}</Text>}
    </View>
  );
}
