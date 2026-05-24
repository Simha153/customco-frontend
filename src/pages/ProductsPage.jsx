import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { productAPI, categoryAPI } from '../services/api'
import toast from 'react-hot-toast'

export default function ProductsPage() {
  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [keyword, setKeyword]       = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [page, setPage]             = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const size = 9

  useEffect(() => {
    setLoading(true)
    const params = { page, size, sortBy: 'id', direction: 'asc' }
    const call = keyword
      ? productAPI.search({ keyword, page, size })
      : selectedCat
        ? productAPI.getByCategory({ category: selectedCat, page, size })
        : productAPI.getPaginated(params)

    call.then(res => {
      const data = res.data?.data || res.data
      setProducts(data.content || [])
      setTotalPages(data.totalPages || 0)
      setTotalElements(data.totalElements || 0)
    }).catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false))
  }, [page, keyword, selectedCat])

  useEffect(() => {
    categoryAPI.getAll().then(r => setCategories(r.data?.data || [])).catch(() => {})
    productAPI.getBrands().then(r => r).catch(() => {})
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setKeyword(searchInput)
    setSelectedCat('')
    setPage(0)
  }

  const handleCat = (cat) => {
    setSelectedCat(cat === selectedCat ? '' : cat)
    setKeyword('')
    setSearchInput('')
    setPage(0)
  }

  const C = '#1B3A6B'

  return (
    <div style={{padding:'24px 16px', background:'#F5F0E8', minHeight:'80vh'}}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        .product-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px}
        .cart-grid{display:grid;grid-template-columns:1fr 360px;gap:3px;align-items:start}
        @media(max-width:640px){
          .product-grid{grid-template-columns:repeat(2,1fr)!important}
          .page-pad{padding:20px 14px!important}
          .page-title{font-size:28px!important}
          .search-form{max-width:100%!important;width:100%!important}
          .top-bar{flex-direction:column!important;align-items:stretch!important}
        }
      `}</style>

      <div style={{marginBottom:'24px'}}>
        <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.3em',textTransform:'uppercase',color:C,marginBottom:'8px'}}>Our Collection</p>
        <h1 className="page-title" style={{fontSize:'32px',color:'#1A1A18',fontWeight:400,lineHeight:1.1}}>
          The Catalog<br/>
          <em style={{color:'#8C8C88',fontStyle:'italic'}}>{totalElements > 0 ? `${totalElements} products` : ''}</em>
        </h1>
      </div>

      {/* Search bar */}
      <div className="top-bar" style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px',flexWrap:'wrap'}}>
        <form onSubmit={handleSearch} className="search-form" style={{display:'flex',flex:1,maxWidth:'320px'}}>
          <input
            style={{flex:1,background:'#fff',border:'1px solid rgba(28,28,24,0.12)',color:'#1A1A18',padding:'10px 14px',fontFamily:'sans-serif',fontSize:'13px',outline:'none'}}
            placeholder="Search products..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button type="submit" style={{background:C,color:'#fff',border:'none',padding:'10px 14px',cursor:'pointer'}}>
            <Search size={16}/>
          </button>
        </form>
        {(keyword || selectedCat) && (
          <button onClick={() => { setKeyword(''); setSearchInput(''); setSelectedCat(''); setPage(0) }}
            style={{fontFamily:'sans-serif',fontSize:'11px',color:'#C8372D',background:'transparent',border:'1px solid #C8372D',padding:'8px 14px',cursor:'pointer',whiteSpace:'nowrap'}}>
            Clear filters
          </button>
        )}
      </div>

      {/* Category chips — horizontally scrollable on mobile */}
      <div style={{display:'flex',gap:'8px',marginBottom:'24px',overflowX:'auto',paddingBottom:'4px',scrollbarWidth:'none',WebkitOverflowScrolling:'touch'}}>
        <style>{`.cat-chips::-webkit-scrollbar{display:none}`}</style>
        <div className="cat-chips" style={{display:'flex',gap:'8px',flexShrink:0}}>
          <div onClick={() => handleCat('')}
            style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'6px 14px',border:'1px solid rgba(28,28,24,0.15)',color:!selectedCat?C:'#8C8C88',background:!selectedCat?'#fff':'transparent',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>
            All
          </div>
          {categories.slice(0, 10).map(c => (
            <div key={c.id} onClick={() => handleCat(c.name)}
              style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'6px 14px',border:'1px solid rgba(28,28,24,0.15)',color:selectedCat===c.name?C:'#8C8C88',background:selectedCat===c.name?'#fff':'transparent',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>
              {c.name}
            </div>
          ))}
        </div>
      </div>

      {/* Products grid */}
      {loading ? (
        <div className="product-grid">
          {[...Array(6)].map((_,i) => (
            <div key={i} style={{background:'#fff',border:'0.5px solid rgba(28,28,24,0.08)',animation:'pulse 1.5s ease infinite'}}>
              <div style={{height:'160px',background:'#E3DED7'}}/>
              <div style={{padding:'12px'}}>
                <div style={{height:'10px',background:'#E3DED7',marginBottom:'8px',width:'60%'}}/>
                <div style={{height:'14px',background:'#E3DED7',marginBottom:'6px'}}/>
                <div style={{height:'12px',background:'#E3DED7',width:'40%'}}/>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px 20px',color:'#8C8C88',fontFamily:'sans-serif'}}>
          <p style={{fontSize:'32px',marginBottom:'12px'}}>🔍</p>
          <p style={{fontSize:'16px',marginBottom:'8px'}}>No products found</p>
          <p style={{fontSize:'13px'}}>Try a different search or category</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p, i) => {
            const bgs = ['#1B3A6B','#5C6B3A','#3D2314','#1B3A6B','#8C8C88','#5C6B3A','#3D2314','#1B3A6B','#5C6B3A']
            return (
              <Link key={p.id} to={`/products/${p.id}`} style={{textDecoration:'none'}}>
                <div style={{background:'#fff',border:'0.5px solid rgba(28,28,24,0.08)',cursor:'pointer',transition:'border-color 0.2s',height:'100%'}}
                  onMouseEnter={e => e.currentTarget.style.borderColor=C}
                  onMouseLeave={e => e.currentTarget.style.borderColor='rgba(28,28,24,0.08)'}>
                  <div style={{height:'160px',background:bgs[i%bgs.length],display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px',color:'rgba(255,255,255,0.12)'}}>
                    👔
                  </div>
                  <div style={{padding:'12px'}}>
                    <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.18em',textTransform:'uppercase',color:C,marginBottom:'4px'}}>{p.category?.name||p.category||'General'}</p>
                    <p style={{fontSize:'13px',color:'#1A1A18',marginBottom:'4px',lineHeight:1.3}}>{p.name}</p>
                    <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'#8C8C88'}}>₹{Number(p.price||0).toLocaleString('en-IN')} / unit</p>
                    {p.brand && <span style={{display:'inline-block',background:'#5C6B3A',color:'#fff',fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.1em',textTransform:'uppercase',padding:'3px 8px',marginTop:'6px'}}>{p.brand}</span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',marginTop:'32px'}}>
          <button style={{background:page===0?'transparent':C,color:page===0?'#8C8C88':'#fff',border:'1px solid rgba(28,28,24,0.15)',padding:'8px 14px',cursor:page===0?'default':'pointer',display:'flex',alignItems:'center',gap:'4px',fontFamily:'sans-serif',fontSize:'11px'}}
            disabled={page===0} onClick={()=>setPage(p=>p-1)}>
            <ChevronLeft size={14}/> Prev
          </button>
          <span style={{fontFamily:'sans-serif',fontSize:'12px',color:'#8C8C88',padding:'0 12px'}}>Page {page+1} of {totalPages}</span>
          <button style={{background:page>=totalPages-1?'transparent':C,color:page>=totalPages-1?'#8C8C88':'#fff',border:'1px solid rgba(28,28,24,0.15)',padding:'8px 14px',cursor:page>=totalPages-1?'default':'pointer',display:'flex',alignItems:'center',gap:'4px',fontFamily:'sans-serif',fontSize:'11px'}}
            disabled={page>=totalPages-1} onClick={()=>setPage(p=>p+1)}>
            Next <ChevronRight size={14}/>
          </button>
        </div>
      )}
    </div>
  )
}
