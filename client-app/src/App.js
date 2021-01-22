import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import myStore from "./redux/store";
import myTheme from "./config/theme/mui-theme";
import Game from "./containers/Game";
import AppBar from "./containers/Layout/AppBar";

const ProviderConfig = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <ThemeProvider theme={myTheme}>
      <AppBar />
      <Router basename={process.env.PUBLIC_URL}>
        <Route path="/" component={Game} />
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={myStore}>
      <ProviderConfig />
    </Provider>
  );
}

export default App;
