// FocusTimerWidget.tsx
import React, { useState, useEffect } from 'react';
import { IonModal, IonButton, IonIcon } from '@ionic/react';
import { addOutline, removeOutline } from 'ionicons/icons';

interface FocusTimerWidgetProps {
  onClose: () => void;
}

const FocusTimerWidget: React.FC<FocusTimerWidgetProps> = ({ onClose }) => {
  const [timer, setTimer] = useState<number>(300); // Default timer duration in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleAddTime = () => {
    setTimer((prevTimer) => prevTimer + 60); // Increase timer by 1 minute (60 seconds)
  };

  const handleRemoveTime = () => {
    setTimer((prevTimer) => (prevTimer > 60 ? prevTimer - 60 : 0)); // Decrease timer by 1 minute (60 seconds)
  };

  const handleSetTimer = () => {
    setIsRunning(true);
  };

  const handleCloseTimer = () => {
    setIsRunning(false);
    onClose();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px' }}>{formatTime(timer)}</div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <IonButton onClick={handleAddTime}>
            <IonIcon icon={addOutline} />
          </IonButton>
          <IonButton onClick={handleRemoveTime}>
            <IonIcon icon={removeOutline} />
          </IonButton>
        </div>
        <IonButton onClick={handleSetTimer}>Start Timer</IonButton>
      </div>

      <IonModal isOpen={isRunning}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px' }}>Remaining Time</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px' }}>{formatTime(timer)}</div>
          <IonButton onClick={handleCloseTimer}>Close Timer</IonButton>
        </div>
      </IonModal>
    </div>
  );
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
};

export default FocusTimerWidget;
