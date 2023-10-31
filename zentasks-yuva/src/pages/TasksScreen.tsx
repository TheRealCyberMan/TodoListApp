// Tab3.tsx
import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonButtons,
} from '@ionic/react';
import { trashOutline, addOutline } from 'ionicons/icons';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [priority, setPriority] = useState<number>(1);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskName.trim() !== '') {
      const newTaskItem: Task = {
        id: new Date().getTime(),
        name: newTaskName,
        priority,
        completed: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTaskName('');
      setPriority(1);
    }
  };

  const removeTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Toggle completion status
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTasks.filter((task) => !task.completed));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {tasks
            .sort((a, b) => b.priority - a.priority)
            .map((task) => (
              <IonItem key={task.id}>
                <IonCheckbox
                  slot="start"
                  checked={task.completed}
                  onIonChange={() => toggleTaskCompletion(task.id)}
                />
                <IonLabel>
                  <h2>{task.name}</h2>
                  <p>Priority: {task.priority}</p>
                </IonLabel>
                <IonButtons slot="end">
                  <IonButton onClick={() => removeTask(task.id)}>
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </IonButtons>
              </IonItem>
            ))}
        </IonList>

        <IonItem>
          <IonInput
            value={newTaskName}
            placeholder="Task name"
            onIonChange={(e) => setNewTaskName(e.detail.value!)}
          ></IonInput>
          <IonSelect
            value={priority}
            placeholder="Select Priority"
            onIonChange={(e) => setPriority(parseInt(e.detail.value!, 10))}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <IonSelectOption key={value} value={value}>
                {value}
              </IonSelectOption>
            ))}
          </IonSelect>
          <IonButton onClick={addTask}>Add Task</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

interface Task {
  id: number;
  name: string;
  priority: number;
  completed: boolean;
}

export default Tab3;
