import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { productAPI, categoryAPI } from '../services/api'
import toast from 'react-hot-toast'

export default function ProductsPage() {
  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands]         = useState([])
  const [loading, setLoading]       = useState(true)
  const [keyword, setKeyword]       = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [page, setPage]             = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const size = 9

  // Fetch products
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

  // Fetch categories & brands once
  useEffect(() => {
    categoryAPI.getAll().then(r => setCategories(r.data?.data || [])).catch(() => {})
    productAPI.getBrands().then(r => setBrands(r.data?.data || [])).catch(() => {})
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

  const S = { // styles object
    page: {padding:'40px', background:'#F5F0E8', minHeight:'80vh'},
    header: {marginBottom:'32px'},
    eyebrow: {fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:'#1B3A6B', marginBottom:'8px'},
    title: {fontSize:'36px', color:'#1A1A18', fontWeight:400, lineHeight:1.1},
    topBar: {display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px', flexWrap:'wrap'},
    searchForm: {display:'flex', flex:1, maxWidth:'320px'},
    searchInp: {flex:1, background:'#fff', border:'1px solid rgba(28,28,24,0.12)', color:'#1A1A18', padding:'10px 14px', fontFamily:'sans-serif', fontSize:'13px', outline:'none'},
    searchBtn: {background:'#1B3A6B', color:'#fff', border:'none', padding:'10px 14px', cursor:'pointer'},
    chips: {display:'flex', gap:'8px', marginBottom:'28px', flexWrap:'wrap'},
    chip: (act) => ({fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.12em', textTransform:'uppercase', padding:'6px 14px', border:'1px solid rgba(28,28,24,0.15)', color: act ? '#1B3A6B' : '#8C8C88', background: act ? '#fff' : 'transparent', cursor:'pointer', transition:'all 0.2s'}),
    grid: {display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'3px'},
    card: {background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)', cursor:'pointer', transition:'border-color 0.2s'},
    cardImg: (i) => {
      const bgs = ['#1B3A6B','#5C6B3A','#3D2314','#1B3A6B','#8C8C88','#5C6B3A','#3D2314','#1B3A6B','#5C6B3A']
      return {height:'180px', background: bgs[i % bgs.length], display:'flex', alignItems:'center', justifyContent:'center', fontSize:'40px', color:'rgba(255,255,255,0.12)'}
    },
    cardInfo: {padding:'16px'},
    cat: {fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#1B3A6B', marginBottom:'4px'},
    name: {fontSize:'14px', color:'#1A1A18', marginBottom:'4px'},
    price: {fontFamily:'sans-serif', fontSize:'12px', color:'#8C8C88'},
    badge: {display:'inline-block', background:'#5C6B3A', color:'#fff', fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.1em', textTransform:'uppercase', padding:'3px 8px', marginTop:'8px'},
    pagination: {display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginTop:'40px'},
    pgBtn: (dis) => ({background: dis ? 'transparent' : '#1B3A6B', color: dis ? '#8C8C88' : '#fff', border:'1px solid rgba(28,28,24,0.15)', padding:'8px 14px', cursor: dis ? 'default' : 'pointer', display:'flex', alignItems:'center', gap:'4px', fontFamily:'sans-serif', fontSize:'11px'}),
    pgInfo: {fontFamily:'sans-serif', fontSize:'12px', color:'#8C8C88', padding:'0 12px'},
    empty: {textAlign:'center', padding:'80px 20px', color:'#8C8C88', fontFamily:'sans-serif'},
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <p style={S.eyebrow}>Our Collection</p>
        <h1 style={S.title}>
          The Catalog<br/>
          <em style={{color:'#8C8C88', fontStyle:'italic'}}>{totalElements > 0 ? `${totalElements} products` : ''}</em>
        </h1>
      </div>

      {/* Search + filter bar */}
      <div style={S.topBar}>
        <form onSubmit={handleSearch} style={S.searchForm}>
          <input
            style={S.searchInp}
            placeholder="Search products..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button type="submit" style={S.searchBtn}><Search size={16}/></button>
        </form>
        {(keyword || selectedCat) && (
          <button onClick={() => { setKeyword(''); setSearchInput(''); setSelectedCat(''); setPage(0) }}
            style={{fontFamily:'sans-serif', fontSize:'11px', color:'#C8372D', background:'transparent', border:'1px solid #C8372D', padding:'8px 14px', cursor:'pointer'}}>
            Clear filters
          </button>
        )}
      </div>

      {/* Category chips */}
      <div style={S.chips}>
        <div style={S.chip(!selectedCat)} onClick={() => handleCat('')}>All</div>
        {categories.slice(0, 8).map(c => (
          <div key={c.id} style={S.chip(selectedCat === c.name)} onClick={() => handleCat(c.name)}>
            {c.name}
          </div>
        ))}
      </div>

      {/* Products grid */}
      {loading ? (
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'3px'}}>
          {[...Array(9)].map((_,i) => (
            <div key={i} style={{background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)', animation:'pulse 1.5s ease infinite'}}>
              <div style={{height:'180px', background:'#E3DED7'}}/>
              <div style={{padding:'16px'}}>
                <div style={{height:'10px', background:'#E3DED7', marginBottom:'8px', width:'60%'}}/>
                <div style={{height:'14px', background:'#E3DED7', marginBottom:'6px'}}/>
                <div style={{height:'12px', background:'#E3DED7', width:'40%'}}/>
              </div>
            </div>
          ))}
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
        </div>
      ) : products.length === 0 ? (
        <div style={S.empty}>
          <p style={{fontSize:'32px', marginBottom:'12px'}}>🔍</p>
          <p style={{fontSize:'16px', marginBottom:'8px'}}>No products found</p>
          <p style={{fontSize:'13px'}}>Try a different search or category</p>
        </div>
      ) : (
        <div style={S.grid}>
          {products.map((p, i) => (
            <Link key={p.id} to={`/products/${p.id}`} style={{textDecoration:'none'}}>
              <div style={S.card}
                onMouseEnter={e => e.currentTarget.style.borderColor='#1B3A6B'}
                onMouseLeave={e => e.currentTarget.style.borderColor='rgba(28,28,24,0.08)'}>
                <div style={S.cardImg(i)}>👔</div>
                <div style={S.cardInfo}>
                  <p style={S.cat}>{p.category?.name || p.category || 'General'}</p>
                  <p style={S.name}>{p.name}</p>
                  <p style={S.price}>₹{Number(p.price || 0).toLocaleString('en-IN')} / unit</p>
                  {p.stockQuantity <= 10 && p.stockQuantity > 0 && (
                    <span style={{...S.badge, background:'#C8372D'}}>Low stock</span>
                  )}
                  {p.brand && <span style={S.badge}>{p.brand}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={S.pagination}>
          <button style={S.pgBtn(page === 0)} disabled={page === 0} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft size={14}/> Prev
          </button>
          <span style={S.pgInfo}>Page {page + 1} of {totalPages}</span>
          <button style={S.pgBtn(page >= totalPages - 1)} disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
            Next <ChevronRight size={14}/>
          </button>
        </div>
      )}
    </div>
  )
}
