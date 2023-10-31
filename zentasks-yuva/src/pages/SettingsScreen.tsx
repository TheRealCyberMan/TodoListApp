// SettingsScreen.tsx

import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonAvatar, IonItem, IonLabel, IonInput, IonToggle, IonIcon } from '@ionic/react';
import { personSharp, moonSharp } from 'ionicons/icons';
import Cookies from 'universal-cookie';
import { SHA256 } from 'crypto-js'; // Import SHA256 hash function

const cookies = new Cookies();

const SettingsScreen: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string>(cookies.get('profilePicture') || 'path/to/default-picture.jpg');
  const [displayNameHashed, setDisplayNameHashed] = useState<string>(cookies.get('displayName') || 'John Doe');
  const [usernameHashed, setUsernameHashed] = useState<string>(cookies.get('username') || 'john_doe');
  const [darkMode, setDarkMode] = useState<boolean>(cookies.get('theme') === 'dark');

  useEffect(() => {
    // Save user information to cookies whenever it changes
    cookies.set('profilePicture', hash(profilePicture), { path: '/' });
    cookies.set('displayName', displayNameHashed, { path: '/' });
    cookies.set('username', usernameHashed, { path: '/' });
    cookies.set('theme', hash(darkMode ? 'dark' : 'light'), { path: '/' });

    // Apply dark mode
    document.body.classList.toggle('dark', darkMode);

  }, [profilePicture, displayNameHashed, usernameHashed, darkMode]);

  const changeProfilePicture = () => {
    // Implement profile picture change logic
    // This could involve opening a file picker or using a camera
  };

  const handleToggleChange = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
  };

  // Hashing function using SHA256
  const hash = (value: string) => SHA256(value).toString();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Settings
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Profile Section */}
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
              <IonInput value={displayNameHashed} onIonChange={(e) => setDisplayNameHashed(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Username</IonLabel>
              <IonInput value={usernameHashed} onIonChange={(e) => setUsernameHashed(e.detail.value!)} />
            </IonItem>
          </IonCardContent>
        </IonCard>


      </IonContent>
    </IonPage>
  );
};

export default SettingsScreen;
