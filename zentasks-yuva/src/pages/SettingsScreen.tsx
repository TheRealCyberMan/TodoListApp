import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardContent, IonAvatar, IonItem, IonLabel, IonInput, IonToggle, IonIcon
} from '@ionic/react';
import { personSharp, moonSharp } from 'ionicons/icons';
import Cookies from 'universal-cookie';
import { SHA256 } from 'crypto-js';

const cookies = new Cookies();

const SettingsScreen: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string>(cookies.get('profilePicture') || 'path/to/default-picture.jpg');
  const [displayName, setDisplayName] = useState<string>(cookies.get('displayName') || 'John Doe');
  const [username, setUsername] = useState<string>(cookies.get('username') || 'john_doe');
  const [darkMode, setDarkMode] = useState<boolean>(cookies.get('theme') === 'dark');

  useEffect(() => {
    cookies.set('profilePicture', profilePicture, { path: '/' });
    cookies.set('displayName', SHA256(displayName).toString(), { path: '/' });
    cookies.set('username', SHA256(username).toString(), { path: '/' });
    cookies.set('theme', darkMode ? 'dark' : 'light', { path: '/' });
  }, [profilePicture, displayName, username, darkMode]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const changeProfilePicture = () => {
    // TODO: Implement profile picture change logic
  };

  const handleToggleChange = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader style={{ background: '#153828', color: '#fff', textAlign: 'center', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
            <IonIcon icon={personSharp} size="large" />
            Profile
          </IonCardHeader>
          <IonCardContent>
            <IonAvatar>
              <img src={profilePicture} alt="Profile" onClick={changeProfilePicture} />
            </IonAvatar>
            <IonItem>
              <IonLabel position="stacked">Display Name</IonLabel>
              <IonInput value={displayName} onIonChange={(e) => setDisplayName(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Username</IonLabel>
              <IonInput value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Dark Mode Toggle */}
        <IonItem>
          <IonIcon slot="start" icon={moonSharp} />
          <IonLabel>Dark Mode</IonLabel>
          <IonToggle checked={darkMode} onIonChange={handleToggleChange} />
        </IonItem>

      </IonContent>
    </IonPage>
  );
};

export default SettingsScreen;
