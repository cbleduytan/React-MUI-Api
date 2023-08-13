import React, { createContext, useContext, useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import MyProSidebar from "./MyProSidebar";
// import MyProSidebar from "./MyProSidebar";
interface SidebarContextType {
  sidebarRTL: boolean;
  setSidebarRTL: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarBgColor: string | undefined;
  setSidebarBgColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  sidebarImage: string | undefined;
  setSidebarImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const SidebarContext = createContext<SidebarContextType>({
  sidebarRTL: false,
  setSidebarRTL: () => {},
  sidebarBgColor: undefined,
  setSidebarBgColor: () => {},
  sidebarImage: undefined,
  setSidebarImage: () => {},
});
export const MyProSidebarProvider = ({ children }) => {
  const [sidebarRTL, setSidebarRTL] = useState(false);
  const [sidebarBgColor, setSidebarBgColor] = useState<string | undefined>(
    undefined
  );
  const [sidebarImage, setSidebarImage] = useState<string | undefined>(
    undefined
  );
  return (
    <ProSidebarProvider>
      <SidebarContext.Provider
        value={{
          sidebarBgColor,
          setSidebarBgColor,

          sidebarImage,
          setSidebarImage,

          sidebarRTL,
          setSidebarRTL,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: sidebarRTL ? "row-reverse" : "row",
          }}
        >
          <MyProSidebar />
          {children}
        </div>
      </SidebarContext.Provider>
    </ProSidebarProvider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
