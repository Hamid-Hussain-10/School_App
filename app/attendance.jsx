import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const AttendanceCalendar = () => {
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    const date = day.dateString;

    if (markedDates[date]) {
      const currentStatus = markedDates[date].status;
      let newStatus = currentStatus === "present" ? "absent" : "none";

      const updated = { ...markedDates };
      if (newStatus === "none") {
        delete updated[date];
      } else {
        updated[date] = {
          selected: true,
          marked: true,
          selectedColor: newStatus === "present" ? "#4CAF50" : "#F44336",
          status: newStatus,
        };
      }
      setMarkedDates(updated);
    } else {
      setMarkedDates({
        ...markedDates,
        [date]: {
          selected: true,
          marked: true,
          selectedColor: "#4CAF50",
          status: "present",
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          calendarBackground: "#FCC300",
          todayTextColor: "#7c0070",
          dayTextColor: "#000000",
          arrowColor: "#000",
          monthTextColor: "#4e4b4b",
          textDayFontWeight: "500",
          textMonthFontWeight: "700",
          textDayHeaderFontWeight: "600",
          textSectionTitleColor: "#2a2dd4",
        }}
      />
      <View style={styles.legend}>
        <View style={[styles.circle, { backgroundColor: "#4CAF50" }]} />
        <Text style={styles.legendText}>Present</Text>
        <View
          style={[
            styles.circle,
            { backgroundColor: "#F44336", marginLeft: 20 },
          ]}
        />
        <Text style={styles.legendText}>Absent</Text>
      </View>
    </View>
  );
};

export default AttendanceCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCC300",
    padding: 20,
    paddingVertical: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  legendText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
});
