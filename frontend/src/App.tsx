import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { lightResponsiveTheme, darkResponsiveTheme } from './theme/responsiveTheme';
import { HardwareLayout } from './components/Layout/HardwareLayout';
import ScrollToTop from './components/common/ScrollToTop';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Category Pages
import PaintsPage from './pages/categories/PaintsPage';
import HardwarePage from './pages/categories/HardwarePage';
import SanitaryPage from './pages/categories/SanitaryPage';
import ElectricalsPage from './pages/categories/ElectricalsPage';
import TilingSolutionsPage from './pages/categories/TilingSolutionsPage';
import MiscellaneousPage from './pages/categories/MiscellaneousPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('hardwareDarkMode');
    return saved ? JSON.parse(saved) : false; // Default to light mode for hardware store
  });

  useEffect(() => {
    localStorage.setItem('hardwareDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentTheme = isDarkMode ? darkResponsiveTheme : lightResponsiveTheme;

  // Dynamic basename for development vs production
  const basename = process.env.NODE_ENV === 'production' ? '/bros' : '';

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router basename={basename}>
        {/* Scroll to top on route changes */}
        <ScrollToTop 
          smooth={true}
          delay={100}
          behavior="smooth"
        />
        
        <HardwareLayout onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Product Category Pages */}
            <Route path="/paints" element={<PaintsPage />} />
            <Route path="/hardware" element={<HardwarePage />} />
            <Route path="/sanitary" element={<SanitaryPage />} />
            <Route path="/electricals" element={<ElectricalsPage />} />
            <Route path="/tiling-solutions" element={<TilingSolutionsPage />} />
            <Route path="/miscellaneous" element={<MiscellaneousPage />} />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HardwareLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
