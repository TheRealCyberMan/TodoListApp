// Tab1.tsx
import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { timeOutline, peopleCircle } from 'ionicons/icons';
import axios from 'axios';
import MotivationalQuoteWidget from '../components/MotivationalQuoteWidget';
import FocusTimerWidget from '../components/FocusTimerWidget'; // Import FocusTimerWidget
import './Tab1.css';

const Tab1: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(1500); // Initial duration: 25 minutes

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get('http://worldtimeapi.org/api/ip');
        const time = new Date(response.data.datetime);
        setCurrentTime(time.toLocaleTimeString('en-US', { hour12: true }));
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    const intervalId = setInterval(fetchTime, 1000);

    // Initial fetch
    fetchTime();

    return () => clearInterval(intervalId);
  }, []);

  const handleTimerSet = () => {
    setShowTimerModal(true);
  };

  const handleTimerClose = () => {
    setShowTimerModal(false);
  };

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>zenLogoHere</IonTitle>
      </IonToolbar>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={timeOutline} style={{ marginRight: '8px' }} />
                    Clock
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#ffffff',
                      width: 'fit-content',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {currentTime}
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" size-md="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={peopleCircle} style={{ marginRight: '8px' }} />
                    Daily Quote
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <MotivationalQuoteWidget />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Add Focus Timer Widget */}
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={timeOutline} style={{ marginRight: '8px' }} />
                    Focus Timer
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>       
               <FocusTimerWidget onClose={handleTimerClose} />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
