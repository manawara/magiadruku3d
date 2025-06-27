import FormMainBannerAdd from "@/backend/feature/form/components/form-main-baner-add/components/FormMainBannerAdd";
import TableMainBanner from "@/backend/feature/table/components/TableMainBanner";
import React from "react";

const MainBannerPage = () => {
  return (
    <div>
      <TableMainBanner />
      <FormMainBannerAdd />
    </div>
  );
};

export default MainBannerPage;
