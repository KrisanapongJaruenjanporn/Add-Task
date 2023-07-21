import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const handleAddTask = () => {
    if (task.trim().length > 0) {
      setTasks([...tasks, { text: task, done: false }]);
      setTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const handleSaveEdit = () => {
    if (editedTask.trim().length > 0) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = editedTask;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditedTask('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>

      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              style={[styles.toggleButton, item.done && styles.toggleButtonDone]}
              onPress={() => {
                const updatedTasks = [...tasks];
                updatedTasks[index].done = !updatedTasks[index].done;
                setTasks(updatedTasks);
              }}
            />
            {editingIndex === index ? (
              <TextInput
                style={styles.editInput}
                value={editedTask}
                onChangeText={(text) => setEditedTask(text)}
              />
            ) : (
              <View style={styles.taskTextContainer}>
                <Text style={[styles.taskText, item.done && styles.taskDone]}>{item.text}</Text>
              </View>
            )}          
            <TouchableOpacity onPress={() => handleDeleteTask(index)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
            {editingIndex === index ? (
              <TouchableOpacity onPress={handleSaveEdit} style={styles.editButton}>
                <Text style={styles.editButtonText}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleEditTask(index)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={(text) => setTask(text)}
         />
         <TouchableOpacity onPress={editingIndex !== null ? handleSaveEdit : handleAddTask} style={styles.addButton}>
           <Text style={styles.addButtonText}>{editingIndex !== null ? 'Save' : 'Add'}</Text>
         </TouchableOpacity>
       </View>
     </View>
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleButton: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
  },
  toggleButtonDone: {
    backgroundColor: 'green',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    color: 'red',
    marginLeft: 16,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
    fontSize: 18, // Increase the font size for the text input
  },
  addButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Task;
