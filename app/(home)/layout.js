import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function HomeLayout({ children }) {
  return (
    <>
      <main className="relative">
        <Navbar />
        {children}
      </main>
      <Footer />
    </>
  );
}

export default HomeLayout;
