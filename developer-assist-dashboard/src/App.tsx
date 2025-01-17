import "./App.css";

import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";

import { TeamsFxContext } from "./internal/context";
import SampleDashboard from "./views/dashboards/SampleDashboard";
import Privacy from "./views/Privacy";
import TabConfig from "./views/TabConfig";
import TermsOfUse from "./views/TermsOfUse";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { themeString, teamsUserCredential } = useTeamsUserCredential({
    initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL!,
    clientId: process.env.REACT_APP_CLIENT_ID!,
  });
  return (
    <TeamsFxContext.Provider value={{ themeString, teamsUserCredential }}>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : teamsLightTheme
        }
        className="App"
      >
        <Router>
          <Routes>
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/termsofuse" element={<TermsOfUse />} />
            <Route path="/tab" element={<SampleDashboard />} />
            <Route path="/config" element={<TabConfig />} />
            <Route path="*" element={<Navigate to={"/tab"} />}></Route>
          </Routes>
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
