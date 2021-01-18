import React, { useEffect, useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { myStore } from "./redux/store";
import myStore from "./redux/store";

import Game from "./containers/Game";

const theme = createMuiTheme({});

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
    <ThemeProvider theme={theme}>
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
