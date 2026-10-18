import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import GuestExperiences from './components/GuestExperiences';
import VisitorCounter from './components/VisitorCounter';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import PasswordReset, {isRecoveryLink} from './components/PasswordReset';
import {CookieNotice, PolicyPage, type PolicyKey} from './components/LegalPages';
export default function App() {
    const params = new URLSearchParams(window.location.search);
    const policy = params.get('politika');
    if (policy === 'gizlilik' || policy === 'kullanim' || policy === 'cerezler') return <><PolicyPage kind={policy as PolicyKey} /><CookieNotice /></>;
    const isAdmin = params.get('admin') === '1';
    const isReviewsPage = params.get('yorumlar') === '1';

  if (isRecoveryLink()) return <PasswordReset />;
  if (isAdmin) {
    return <AdminPanel />;
  }
  if (isReviewsPage) {
    return <div className="min-h-screen"><GuestExperiences allReviews /><Footer /><CookieNotice /></div>;
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Rooms />
      <Services />
      <Gallery />
        <VisitorCounter />
      <GuestExperiences />
      <Booking />
      <Footer />
      <CookieNotice />
    </div>
  );
}
