import React, { useState } from "react";
import { ColorModeContext, useMode } from "./src/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./src/components/dashboard/Dashboard";
import Topbar from "./src/scenes/global/Topbar";
import { MyProSidebarProvider } from "./src/scenes/global/sidebar/SidebarContext";
require("./App");
import CreateForm from "./src/components/form/CreateForm";
import Team from "./src/components/team/Team";
const App = () => {
  const mode = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [searchId, setSearchId] = useState<number | null>(null);

  return (
    <ColorModeContext.Provider value={mode.colorMode}>
      <ThemeProvider theme={mode.theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            {/* <SideBar isSidebar={isSidebar} /> */}
            <main>
              <Topbar
                searchId={searchId}
                setSearchId={setSearchId}
                setIsSidebar={() => setIsSidebar}
              />
              <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/form" element={<CreateForm />}></Route>
                <Route
                  path="/team"
                  element={<Team searchId={searchId} />}
                ></Route>
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
