import Footer from "../footer/Footer";
import Header from "../header/Header";
import type { LayoutProps } from "../../types/interfaces";

const Layout = ({ children, url }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header url={url} />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
