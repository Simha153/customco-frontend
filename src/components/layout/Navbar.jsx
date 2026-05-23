import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Home, Search, Heart, ShoppingBag, X } from 'lucide-react'
import { useState, useRef } from 'react'

const TABS = ['Discover','Shirts','T-shirts','Jeans','Trousers','Hoodies','Jackets','Kurtas','Gen-Z','Uniforms']

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Discover')
  const [keyword, setKeyword] = useState('')
  const searchRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate('/products?keyword=' + encodeURIComponent(keyword.trim()))
      setSearchOpen(false)
      setKeyword('')
    }
  }

  return (
    <>
      <nav style={{background:'#fff',borderBottom:'1px solid rgba(0,0,0,0.08)',padding:'0 20px',height:'52px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'fixed',top:0,left:0,right:0,zIndex:100}}>
        <Link to="/" style={{color:'#1A1A18',display:'flex',alignItems:'center',padding:'6px'}}><Home size={22} strokeWidth={1.6}/></Link>
        <div style={{position:'absolute',left:'50%',transform:'translateX(-50%)',fontFamily:'Georgia,serif',fontSize:'20px',fontWeight:700,color:'#1A1A18',letterSpacing:'-0.3px',cursor:'pointer',whiteSpace:'nowrap'}} onClick={()=>navigate('/')}>Custom<em style={{fontStyle:'italic',color:'#1B3A6B'}}>.Co</em></div>
        <div style={{display:'flex',alignItems:'center',gap:'2px'}}>
          <button onClick={()=>{setSearchOpen(true);setTimeout(()=>searchRef.current?.focus(),50)}} style={{background:'transparent',border:'none',cursor:'pointer',padding:'7px',color:'#1A1A18',display:'flex',alignItems:'center'}}><Search size={21} strokeWidth={1.6}/></button>
          <button style={{background:'transparent',border:'none',cursor:'pointer',padding:'7px',color:'#1A1A18',display:'flex',alignItems:'center'}}><Heart size={21} strokeWidth={1.6}/></button>
          <Link to="/cart" style={{color:'#1A1A18',display:'flex',alignItems:'center',padding:'7px',position:'relative'}}>
            <ShoppingBag size={21} strokeWidth={1.6}/>
            {isLoggedIn&&<span style={{position:'absolute',top:'4px',right:'4px',width:'8px',height:'8px',background:'#C8372D',borderRadius:'50%',border:'1.5px solid #fff'}}/>}
          </Link>
        </div>
      </nav>
      <div style={{position:'fixed',top:'52px',left:0,right:0,background:'#fff',borderBottom:'1px solid rgba(0,0,0,0.08)',overflowX:'auto',whiteSpace:'nowrap',scrollbarWidth:'none',zIndex:99}}>
        <div style={{display:'inline-flex',padding:'0 16px'}}>
          {TABS.map(tab=>(
            <div key={tab} onClick={()=>{setActiveTab(tab);tab!=='Discover'?navigate('/products?category='+encodeURIComponent(tab)):navigate('/products')}} style={{fontSize:'13px',color:activeTab===tab?'#1A1A18':'#8C8C88',cursor:'pointer',padding:'9px 16px',borderBottom:activeTab===tab?'2px solid #1A1A18':'2px solid transparent',fontWeight:activeTab===tab?600:400,transition:'all 0.15s',whiteSpace:'nowrap'}}>{tab}</div>
          ))}
        </div>
      </div>
      {searchOpen&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.35)',zIndex:200,display:'flex',flexDirection:'column'}} onClick={()=>setSearchOpen(false)}>
          <div style={{background:'#fff',padding:'14px 20px',display:'flex',alignItems:'center',gap:'12px',borderBottom:'2px solid #1B3A6B'}} onClick={e=>e.stopPropagation()}>
            <Search size={17} color="#8C8C88" strokeWidth={1.6}/>
            <form onSubmit={handleSearch} style={{flex:1,display:'flex'}}>
              <input ref={searchRef} value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Search products, categories..." style={{flex:1,border:'none',outline:'none',fontSize:'16px',fontFamily:'Georgia,serif',color:'#1A1A18',background:'transparent'}}/>
            </form>
            <button onClick={()=>setSearchOpen(false)} style={{background:'transparent',border:'none',cursor:'pointer',color:'#8C8C88',display:'flex',alignItems:'center'}}><X size={20}/></button>
          </div>
        </div>
      )}
    </>
  )
}


