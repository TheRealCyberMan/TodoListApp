import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonText } from '@ionic/react';

const MotivationalQuoteWidget = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchMotivationalQuote = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random?tags=motivational');
        const { content, author } = response.data;
        setQuote(`${content} - ${author}`);
      } catch (error) {
        console.error('Error fetching motivational quote:', error);
      }
    };

    // Fetch a new quote when the component mounts
    fetchMotivationalQuote();

    // Set up a timeout to fetch a new quote daily
    const dailyInterval = setInterval(fetchMotivationalQuote, 24 * 60 * 60 * 1000);

    // Clear the interval on component unmount
    return () => clearInterval(dailyInterval);
  }, []);

  return (
    <div>
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
      
      ><i>{quote}</i></IonText>
    </div>
  );
};

export default MotivationalQuoteWidget;
