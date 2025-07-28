import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORAGE_KEY = 'homework_list';

const HomeworkScreen = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    loadHomework();
  }, []);

  useEffect(() => {
    saveHomework(homeworks);
  }, [homeworks]);

  const saveHomework = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save homework:', error);
    }
  };

  const loadHomework = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHomeworks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load homework:', error);
    }
  };

  const toggleStatus = (id) => {
    const updated = homeworks.map((hw) =>
      hw.id === id
        ? { ...hw, status: hw.status === 'done' ? 'pending' : 'done' }
        : hw
    );
    setHomeworks(updated);
  };

  const addHomework = () => {
    if (!newSubject || !newTask || !newDate) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newHW = {
      id: Date.now().toString(),
      subject: newSubject,
      task: newTask,
      dueDate: newDate,
      status: 'pending',
    };

    setHomeworks([newHW, ...homeworks]);
    setModalVisible(false);
    setNewSubject('');
    setNewTask('');
    setNewDate('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}> Homework</Text>

      <FlatList
        data={homeworks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => toggleStatus(item.id)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text
                style={[
                  styles.status,
                  item.status === 'done' ? styles.done : styles.pending,
                ]}
              >
                {item.status.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.task}>{item.task}</Text>
            <Text style={styles.dueDate}>📅 Due: {item.dueDate}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add New Homework</Text>

            <TextInput
              placeholder="Subject"
              value={newSubject}
              onChangeText={setNewSubject}
              style={styles.input}
            />
            <TextInput
              placeholder="Task"
              value={newTask}
              onChangeText={setNewTask}
              style={styles.input}
            />
            <TextInput
              placeholder="Due Date (e.g. July 31, 2025)"
              value={newDate}
              onChangeText={setNewDate}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={addHomework}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#333', fontWeight: 'bold' }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC300',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  subject: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2a4d9c',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  pending: {
    backgroundColor: '#ffe0b3',
    color: '#d35400',
  },
  done: {
    backgroundColor: '#d4edda',
    color: '#2e7d32',
  },
  task: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#2a4d9c',
    borderRadius: 40,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalBox: {
    margin: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#2a4d9c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#2a4d9c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default HomeworkScreen;
