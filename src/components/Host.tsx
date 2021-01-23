import React from "react";
import { Splash, SplashTitle, WidgetWrapper } from "./Host.style";

export const Host: React.FC = ({ children }) => {
  return (
    <WidgetWrapper>
      <Splash>
        <SplashTitle>Gi Nå</SplashTitle>
      </Splash>
      {children}
    </WidgetWrapper>
  );
};
