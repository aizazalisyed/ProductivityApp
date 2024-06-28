import React from "react";
import { useState, useEffect } from "react";
import MainNavigator from "./navigation/MainNavigator";
import SplashScreenView from "./screens/SplashScreenView";

export default function App() {
  const [isShownSplash, setIsShownSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShownSplash(false);
    }, 3000);
  }, []);

  return <>{isShownSplash ? <SplashScreenView /> : <MainNavigator />}</>;
}
