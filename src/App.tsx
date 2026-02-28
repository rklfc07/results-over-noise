import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import SEOService from './pages/services/SEOService';
import PaidAdvertising from './pages/services/PaidAdvertising';
import SocialMedia from './pages/services/SocialMedia';
import ContentMarketing from './pages/services/ContentMarketing';
import MarketingStrategy from './pages/services/MarketingStrategy';
import LeadGeneration from './pages/services/LeadGeneration';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/seo" element={<SEOService />} />
          <Route path="services/paid-advertising" element={<PaidAdvertising />} />
          <Route path="services/social-media" element={<SocialMedia />} />
          <Route path="services/content-marketing" element={<ContentMarketing />} />
          <Route path="services/marketing-strategy" element={<MarketingStrategy />} />
          <Route path="services/lead-generation" element={<LeadGeneration />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
