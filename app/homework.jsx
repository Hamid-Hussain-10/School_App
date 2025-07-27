import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialHomework = [
  {
    id: '1',
    subject: 'Math',
    dueDate: 'July 30, 2025',
    task: 'Solve exercise 4.2 from the book',
    status: 'pending',
  },
  {
    id: '2',
    subject: 'English',
    dueDate: 'July 28, 2025',
    task: 'Write an essay on "My Favourite Book"',
    status: 'done',
  },
];

const HomeworkScreen = () => {
  const [homeworks, setHomeworks] = useState(initialHomework);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');

  const toggleStatus = (id) => {
    const updated = homeworks.map((hw) =>
      hw.id === id
        ? { ...hw, status: hw.status === 'done' ? 'pending' : 'done' }
        : hw
    );
    setHomeworks(updated);
  };

  const addHomework = () => {
    if (!newSubject || !newTask || !newDate) return;

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
      <Text style={styles.header}> Homework </Text>

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
        <Text style={styles.addButtonText}> + </Text>
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
                <Text style={{ color: '#333', fontWeight: 'bold' }}>
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
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 35,
    borderBottomEndRadius: 0,
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
    backgroundColor: '#ffffff',
    color: '#060606',
  },
  done: {
    backgroundColor: '#ffffff',
    color: '#026b07',
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
    bottom: 50,
    right: 30,
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
    backgroundColor: '#4dbeca',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#131314',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#FCC300',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default HomeworkScreen;
