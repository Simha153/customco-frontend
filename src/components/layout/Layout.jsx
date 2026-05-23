import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'#F5F0E8'}}>
      <Toaster position="top-right" toastOptions={{style:{background:'#1A1A18',color:'#F5F0E8',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'sans-serif',fontSize:'13px'},success:{iconTheme:{primary:'#5C6B3A',secondary:'#fff'}},error:{iconTheme:{primary:'#C8372D',secondary:'#fff'}}}}/>
      {!isHome && <Navbar />}
      <main style={{flex:1,paddingTop:isHome?0:'92px'}}>{children}</main>
      {!isHome && <Footer />}
    </div>
  )
}
