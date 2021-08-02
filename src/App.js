import React, { useState } from "react";
import Header from "./Components/Header";
import Content from "./Components/Content";

export const AppState = React.createContext();

function App() {
  const [appState, setAppState] = useState({
    responce: null,
    loading: true,
    error: "",
    query: "",
    page: 1,
    perpage: 20,
    selectedImageUrl: "",
    selectedImageTitle: "",
    show: false,
  });

  return (
    <AppState.Provider value={{ appState, setAppState }}>
      <div className="App">
        <Header />
        <Content />
      </div>
    </AppState.Provider>
  );
}

export default App;
