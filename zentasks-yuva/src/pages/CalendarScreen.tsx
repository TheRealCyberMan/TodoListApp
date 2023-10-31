import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonDatetime } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const CalendarScreen: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>Select date on calendar (this is a dummy calendar, will add functionality later)</h1>
      <IonDatetime></IonDatetime>
      </IonContent>
    </IonPage>
  );
};

export default CalendarScreen;
