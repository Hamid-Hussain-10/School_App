import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const timetable = {
  Monday: [
    { subject: 'Math', time: '8:00 AM - 8:45 AM' },
    { subject: 'English', time: '8:45 AM - 9:30 AM' },
    { subject: 'Science', time: '9:30 AM - 10:15 AM' },
    { subject: 'Break', time: '10:15 AM - 10:30 AM' },
    { subject: 'Computer', time: '10:30 AM - 11:15 AM' },
  ],
  Tuesday: [
    { subject: 'English', time: '8:00 AM - 8:45 AM' },
    { subject: 'Math', time: '8:45 AM - 9:30 AM' },
    { subject: 'Social Studies', time: '9:30 AM - 10:15 AM' },
    { subject: 'Break', time: '10:15 AM - 10:30 AM' },
    { subject: 'Science', time: '10:30 AM - 11:15 AM' },
  ],
  Wednesday: [
    { subject: 'Science', time: '8:00 AM - 8:45 AM' },
    { subject: 'Urdu', time: '8:45 AM - 9:30 AM' },
    { subject: 'English', time: '9:30 AM - 10:15 AM' },
    { subject: 'Break', time: '10:15 AM - 10:30 AM' },
    { subject: 'Math', time: '10:30 AM - 11:15 AM' },
  ],
  Thursday: [
    { subject: 'Computer', time: '8:00 AM - 8:45 AM' },
    { subject: 'Math', time: '8:45 AM - 9:30 AM' },
    { subject: 'Islamiat', time: '9:30 AM - 10:15 AM' },
    { subject: 'Break', time: '10:15 AM - 10:30 AM' },
    { subject: 'Art', time: '10:30 AM - 11:15 AM' },
  ],
  Friday: [
    { subject: 'Urdu', time: '8:00 AM - 8:45 AM' },
    { subject: 'English', time: '8:45 AM - 9:30 AM' },
    { subject: 'Break', time: '9:30 AM - 9:45 AM' },
    { subject: 'Sports', time: '9:45 AM - 10:30 AM' },
    { subject: 'Quran', time: '10:30 AM - 11:15 AM' },
  ],
};

const days = Object.keys(timetable);

const TimeTableScreen = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📘 Time Table</Text>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.tabButton,
              selectedDay === day && styles.activeTabButton,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.tabText,
                selectedDay === day && styles.activeTabText,
              ]}
            >
              {day.slice(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Day Schedule */}
      <View style={styles.scheduleContainer}>
        <Text style={styles.dayTitle}>{selectedDay}</Text>
        <FlatList
          data={timetable[selectedDay]}
          keyExtractor={(item, index) => item.subject + index}
          renderItem={({ item }) => (
            <View style={styles.subjectRow}>
              <Text style={styles.subjectText}>{item.subject}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC300',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 6,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#2a4d9c',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2a4d9c',
  },
  activeTabText: {
    color: '#fff',
  },
  scheduleContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 23,
  },
  dayTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2a4d9c',
    marginBottom: 10,
    borderBottomWidth: 2,
    paddingVertical: 8,
    textAlign: 'center',
  },
  subjectRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#b3aeae',
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  subjectText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default TimeTableScreen;
