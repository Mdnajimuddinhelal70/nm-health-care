import PublicFooter from "@/src/components/shared/PublicFooter";
import PublicNavbar from "@/src/components/shared/PublicNavbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      {children}
      <PublicFooter />
    </>
  );
};

export default CommonLayout;
