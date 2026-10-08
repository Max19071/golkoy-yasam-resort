import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import GuestExperiences from './components/GuestExperiences';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
export default function App() {
    const params = new URLSearchParams(window.location.search);
    const isAdmin = params.get('admin') === '1';
    const isReviewsPage = params.get('yorumlar') === '1';

  if (isAdmin) {
    return <AdminPanel />;
  }
  if (isReviewsPage) {
    return <div className="min-h-screen"><GuestExperiences allReviews /><Footer /></div>;
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Rooms />
      <Services />
      <Gallery />
      <GuestExperiences />
      <Booking />
      <Footer />
    </div>
  );
}
