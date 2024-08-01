import TextTransition, { presets } from 'react-text-transition';
import { useEffect, useState } from 'react';

const TEXTS = ['Ask about Recipes 🍲', 'Ask about Technology 💻', 'Ask about Movies 🍿', 'Ask anything!🔥'];

const Typing_ani = () => {

const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      1700, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div style={{
        fontFamily: "Comfortaa, sans-serif"
    }}>
      <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
    </div>
  );
}

export default Typing_ani