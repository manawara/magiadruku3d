import Divider from "@/components/divider/Divider";
import AnnouncementBar from "@/feature/header/components/announcement-bar/AnnouncementBar";
import MainHeader from "./components/main-header/MainHeader";
const Header = async () => {
  return (
    <header className="sticky flex left-0 right-0 flex-col bg-colors-blue-700 justify-between">
      <div className="container mx-auto px-4">
        <AnnouncementBar />
      </div>
      <Divider position="horizontal" />
      <MainHeader />
    </header>
  );
};

export default Header;
