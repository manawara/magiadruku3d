import React, { ReactNode } from "react";

type MainBannerLayoutProps = {
  children: ReactNode;
};

const MainBannerLayout = ({ children }: MainBannerLayoutProps) => {
  return <div>{children}</div>;
};

export default MainBannerLayout;
