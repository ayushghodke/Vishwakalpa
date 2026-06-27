import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import Maintenance from './pages/Maintenance'
import ScrollToTop from './components/ScrollToTop'
import { MAINTENANCE_MODE } from './constants/config'
import './index.css'

function App() {
  // When maintenance mode is on, replace the entire site with the
  // maintenance page. Toggle MAINTENANCE_MODE in src/constants/config.ts.
  if (MAINTENANCE_MODE) {
    return <Maintenance />
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
      </Routes>
    </Router>
  )
}

export default App
