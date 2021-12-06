import React from 'react';
import { useMediaQuery } from 'react-responsive';
import AppHeader from './app-header/app-header.js';
import Main from './main/main.js';
import cards from '../utils/data.js';

function App() {
  const [isBurgerIngredientsVisible, setIsBurgerIngredientsVisible]=React.useState(true);
  const [isBurgerConstructorVisible, setIsBurgerConstructorVisible]=React.useState(true);
  const [isAppHeaderVisible, setIsAppHeaderVisible]=React.useState(false);
  const tablet = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });

  React.useEffect(() => {
    if (tablet) {
      setIsBurgerIngredientsVisible(true);
      setIsBurgerConstructorVisible(false);
    } else {
      setIsBurgerIngredientsVisible(true);
      setIsBurgerConstructorVisible(true);
    }
  }, [tablet]);

  const handleChange = () => {
    setIsAppHeaderVisible(!isAppHeaderVisible);
  } 

  const handleToggle =() => {
    if (tablet) {
      setIsBurgerIngredientsVisible(!isBurgerIngredientsVisible);
      setIsBurgerConstructorVisible(!isBurgerConstructorVisible);
    }
    if (mobile) {
      handleChange();
    }
  }

  return (
    <div className="app">
      <AppHeader isAppHeaderVisible={isAppHeaderVisible} handleToggle={handleToggle} />
      <Main isBurgerIngredientsVisible={isBurgerIngredientsVisible} isBurgerConstructorVisible={isBurgerConstructorVisible} handleToggle={handleToggle} cards={cards} />
    </div>
  );
}

export default App;
