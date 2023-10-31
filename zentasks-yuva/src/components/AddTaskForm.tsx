// AddTaskForm.tsx
import React, { useState } from 'react';
import {
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonDatetime,
  IonText,
  IonTitle,
} from '@ionic/react';

interface AddTaskFormProps {
  onAddTask: (task: string, deadline: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState<string | null>(null);

  const handleAddTask = () => {
    if (!task || !deadline) {
      alert('Please fill in both task and deadline.');
      return;
    }

    onAddTask(task, deadline);
    setTask('');
    setDeadline(null);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <IonItem>
        <IonLabel position="floating">Task</IonLabel>
        <IonInput
          type="text"
          value={task}
          onIonChange={(e) => setTask(e.detail.value!)}
        />
      </IonItem>
      <IonItem>
        <IonTitle>Deadline</IonTitle>
        <IonDatetime
  value={deadline}
  onIonChange={(e) => setDeadline(e.detail.value as string | null)}
></IonDatetime>

      </IonItem>
      <IonButton expand="full" onClick={handleAddTask}>
        Add Task
      </IonButton>
    </form>
  );
};

export default AddTaskForm;