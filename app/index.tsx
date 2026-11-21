import { Href, router } from "expo-router";
import { Text, ScrollView } from "react-native";
import { CategoryCard } from "../components/CategoryCard";

const CATEGORIES = [
  { name: "Bok", route: "/books", active: true },
  { name: "Film", route: null, active: false },
  { name: "Tv-Serier", route: null, active: false },
  { name: "Game", route: null, active: false },
  { name: "Short Drama", route: null, active: false },
  { name: "Audio Story", route: null, active: false },
];

export default function HomeScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16 }}
    >
      <Text>Library</Text>
      {CATEGORIES.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          active={category.active}
          onPress={() => {
            if (category.route) {
              router.push(category.route as Href);
            }
          }}
        />
      ))}
    </ScrollView>
  );
}
