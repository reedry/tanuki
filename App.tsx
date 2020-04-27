import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useClock } from "./hooks/clock";

const MS_S = 1000;
const MS_M = MS_S * 60;
const MS_H = MS_M * 60;

const formatDuration = (ms: number): string => {
  const hour = Math.floor(ms / MS_H);
  const minute = Math.floor((ms - hour * MS_H) / MS_M);
  const second = Math.floor((ms - (hour * MS_H + minute * MS_M)) / MS_S);
  return [hour, minute, second]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
};

const timeDiff = (from: Date, to: Date): string => {
  if (from.getTime() > to.getTime()) return formatDuration(0);
  const diff = to.getTime() - from.getTime();
  return formatDuration(diff);
};

export default function App() {
  const [pressedTime, setPressedTime] = useState<undefined | Date>(undefined);
  const now = useClock();
  const handlePress = () => {
    setPressedTime(new Date());
  };
  return (
    <View style={styles.container}>
      <Button title="Press Me" onPress={handlePress} />
      <Text>{pressedTime ? pressedTime.toString() : "Never Pressed"}</Text>
      {pressedTime && <Text>Time elapsed: {timeDiff(pressedTime, now)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});