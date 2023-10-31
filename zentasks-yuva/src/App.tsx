import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonModal,
  IonInput,
  IonDatetime,
  IonButton,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, list, settings, addCircle, home } from 'ionicons/icons';
import HomeScreen from './pages/HomeScreen';
import CalendarScreen from './pages/CalendarScreen';
import TasksScreen from './pages/TasksScreen';
import SettingsScreen from './pages/SettingsScreen';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './pages/tabs.scss';
import './pages/main.scss';

setupIonicReact();

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSave = () => {
    if (eventName.trim() === '' || eventDate.trim() === '') {
      console.error('Event name and date are required.');
      return;
    }

    const timestamp = new Date().getTime();
    const expiresDate = new Date(eventDate);
    expiresDate.setHours(23, 59, 59, 999);

    if (expiresDate <= new Date()) {
      console.error('Expiration date must be in the future.');
      return;
    }

    const expiresDateString = expiresDate.toUTCString();

    console.log('Event Name:', eventName);
    console.log('Event Date:', eventDate);
    console.log('Expires Date:', expiresDateString);

    document.cookie = `calendarEvent_${timestamp}=${encodeURIComponent(eventName)}; expires=${expiresDateString}; SameSite=None; Secure`;

    console.log('Cookie set successfully.');
    closeModal();
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/HomeScreen">
              <HomeScreen />
            </Route>
            <Route exact path="/CalendarScreen">
              <CalendarScreen />
            </Route>
            <Route path="/TasksScreen">
              <TasksScreen />
            </Route>
            <Route path="/SettingsScreen">
              <SettingsScreen />
            </Route>
            <Route exact path="/">
              <Redirect to="/HomeScreen" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="HomeScreen" href="/HomeScreen">
              <IonIcon aria-hidden="true" icon={home} />
              <IonLabel></IonLabel>
            </IonTabButton>
            <IonTabButton tab="CalendarScreen" href="/CalendarScreen">
              <IonIcon aria-hidden="true" icon={calendar} />
              <IonLabel></IonLabel>
            </IonTabButton>
            <IonTabButton tab="AddEvent" onClick={openModal}>
              <IonIcon aria-hidden="true" icon={addCircle} />
              <IonLabel></IonLabel>
            </IonTabButton>
            <IonTabButton tab="TasksScreen" href="/TasksScreen">
              <IonIcon aria-hidden="true" icon={list} />
              <IonLabel></IonLabel>
            </IonTabButton>
            <IonTabButton tab="SettingsScreen" href="/SettingsScreen">
              <IonIcon aria-hidden="true" icon={settings} />
              <IonLabel></IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>

      <IonModal isOpen={showModal} onDidDismiss={closeModal}>
        <IonInput
          placeholder="Event Name"
          value={eventName}
          onIonChange={(e) => setEventName(e.detail.value as string)}
        />
        <IonDatetime
          placeholder="Event Date"
          value={eventDate}
          onIonChange={(e) => setEventDate(e.detail.value as string)}
        />
        <IonButton onClick={handleSave}>Save Event</IonButton>
      </IonModal>
    </IonApp>
  );
};

export default App;
