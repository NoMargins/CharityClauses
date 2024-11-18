import { parseCSV } from './parseCSV.js';

const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnYCGn0rLfRYYOt7zfemt6v1aaQgAK5h-5p0yGHxY6s1gzRl0Bd7TkFER0S7UNpkmLvEDS0C8Fg8Wn/pub?output=csv";

export const getData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      console.log(data);
      const jsonData = parseCSV(data);
      return jsonData;

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  