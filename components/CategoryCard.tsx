import { Pressable, Text } from "react-native";
type Props = {
    name: string;
    active: boolean;
    onPress: () => void;
}

export function CategoryCard({ name, active, onPress }: Props) {
    return (
        <Pressable onPress={onPress}>
        <Text>{name}</Text>
        {!active && <Text>Kommer snart</Text>}
      </Pressable>
    );
}