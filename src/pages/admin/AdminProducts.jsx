import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { productAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function AdminProducts() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [page, setPage]         = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm] = useState({ name:'', price:'', stockQuantity:'', brand:'', description:'', category:'' })

  useEffect(() => {
    if (!isAdmin) { navigate('/'); return }
    fetchProducts()
  }, [page])

  const fetchProducts = () => {
    setLoading(true)
    productAPI.getPaginated({ page, size:10, sortBy:'id', direction:'asc' })
      .then(r => {
        const d = r.data?.data
        setProducts(d?.content || [])
        setTotalPages(d?.totalPages || 0)
      })
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await productAPI.update(editing.id, { ...form, price: Number(form.price), stockQuantity: Number(form.stockQuantity) })
        toast.success('Product updated!')
      } else {
        await productAPI.create({ ...form, price: Number(form.price), stockQuantity: Number(form.stockQuantity) })
        toast.success('Product created!')
      }
      setShowForm(false); setEditing(null)
      setForm({ name:'', price:'', stockQuantity:'', brand:'', description:'', category:'' })
      fetchProducts()
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save product') }
  }

  const handleEdit = (p) => {
    setEditing(p)
    setForm({ name:p.name||'', price:p.price||'', stockQuantity:p.stockQuantity||'', brand:p.brand||'', description:p.description||'', category:p.category?.name||p.category||'' })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await productAPI.delete(id)
      toast.success('Product deleted')
      fetchProducts()
    } catch { toast.error('Failed to delete') }
  }

  const C = '#1B3A6B', P = '#C8372D'
  const inp = { background:'#F5F0E8', border:'1px solid rgba(28,28,24,0.12)', color:'#1A1A18', padding:'10px 13px', fontFamily:'sans-serif', fontSize:'13px', outline:'none', width:'100%' }
  const lbl = { fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'6px', display:'block' }

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{background:'#F5F0E8', minHeight:'80vh', padding:'40px'}}>
      <div style={{marginBottom:'28px', display:'flex', alignItems:'flex-end', justifyContent:'space-between'}}>
        <div>
          <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:C, marginBottom:'8px'}}>Admin Panel</p>
          <h1 style={{fontSize:'32px', color:'#1A1A18', fontWeight:400, fontFamily:'Georgia,serif'}}>Products</h1>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name:'', price:'', stockQuantity:'', brand:'', description:'', category:'' }) }}
          style={{background:C, color:'#fff', border:'none', padding:'10px 20px', fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', fontWeight:600, display:'flex', alignItems:'center', gap:'8px'}}>
          <Plus size={14}/> Add Product
        </button>
      </div>

      {/* Search */}
      <div style={{display:'flex', gap:'3px', marginBottom:'20px'}}>
        <div style={{position:'relative', flex:1, maxWidth:'300px'}}>
          <Search size={15} style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#8C8C88'}}/>
          <input style={{...inp, paddingLeft:'36px'}} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)', padding:'28px', marginBottom:'20px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
            <p style={{fontSize:'18px', color:'#1A1A18', fontFamily:'Georgia,serif'}}>{editing ? 'Edit Product' : 'Add New Product'}</p>
            <button onClick={() => { setShowForm(false); setEditing(null) }} style={{background:'transparent', border:'none', cursor:'pointer', fontSize:'20px', color:'#8C8C88'}}>✕</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px'}}>
              <div><label style={lbl}>Product Name *</label><input style={inp} required placeholder="e.g. Classic Work Shirt" value={form.name} onChange={e => setForm(p=>({...p, name:e.target.value}))}/></div>
              <div><label style={lbl}>Price (₹) *</label><input style={inp} type="number" required placeholder="450" value={form.price} onChange={e => setForm(p=>({...p, price:e.target.value}))}/></div>
              <div><label style={lbl}>Stock Quantity</label><input style={inp} type="number" placeholder="100" value={form.stockQuantity} onChange={e => setForm(p=>({...p, stockQuantity:e.target.value}))}/></div>
              <div><label style={lbl}>Brand</label><input style={inp} placeholder="e.g. Custom.Co" value={form.brand} onChange={e => setForm(p=>({...p, brand:e.target.value}))}/></div>
              <div><label style={lbl}>Category</label><input style={inp} placeholder="e.g. Uniforms" value={form.category} onChange={e => setForm(p=>({...p, category:e.target.value}))}/></div>
            </div>
            <div style={{marginBottom:'20px'}}><label style={lbl}>Description</label><textarea style={{...inp, height:'80px', resize:'vertical'}} placeholder="Product description..." value={form.description} onChange={e => setForm(p=>({...p, description:e.target.value}))}/></div>
            <div style={{display:'flex', gap:'10px'}}>
              <button type="submit" style={{background:C, color:'#fff', border:'none', padding:'11px 24px', fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', fontWeight:600}}>{editing ? 'Update Product' : 'Create Product'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} style={{background:'transparent', color:'#8C8C88', border:'1px solid rgba(28,28,24,0.15)', padding:'11px 24px', fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer'}}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Products table */}
      <div style={{background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)'}}>
        <div style={{display:'grid', gridTemplateColumns:'40px 1fr 100px 100px 80px 120px 80px', gap:'16px', padding:'12px 20px', borderBottom:'1px solid rgba(28,28,24,0.08)'}}>
          {['#','Name','Category','Price','Stock','Brand',''].map(h=>(
            <span key={h} style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#8C8C88'}}>{h}</span>
          ))}
        </div>
        {loading ? (
          <div style={{padding:'40px', textAlign:'center', color:'#8C8C88', fontFamily:'sans-serif', fontSize:'13px'}}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{padding:'40px', textAlign:'center', color:'#8C8C88', fontFamily:'sans-serif', fontSize:'13px'}}>No products found</div>
        ) : filtered.map(p => (
          <div key={p.id} style={{display:'grid', gridTemplateColumns:'40px 1fr 100px 100px 80px 120px 80px', gap:'16px', padding:'14px 20px', borderBottom:'0.5px solid rgba(28,28,24,0.05)', alignItems:'center'}}
            onMouseEnter={e=>e.currentTarget.style.background='#FAFAF8'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <span style={{fontFamily:'sans-serif', fontSize:'12px', color:'#8C8C88'}}>#{p.id}</span>
            <div>
              <p style={{fontSize:'13px', color:'#1A1A18', marginBottom:'2px'}}>{p.name}</p>
              {p.description && <p style={{fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'200px'}}>{p.description}</p>}
            </div>
            <span style={{fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88'}}>{p.category?.name || p.category || '—'}</span>
            <span style={{fontFamily:'sans-serif', fontSize:'13px', color:C, fontWeight:600}}>₹{Number(p.price||0).toLocaleString('en-IN')}</span>
            <span style={{fontFamily:'sans-serif', fontSize:'12px', color: p.stockQuantity<=10 ? P : '#8C8C88'}}>{p.stockQuantity ?? '—'}</span>
            <span style={{fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88'}}>{p.brand || '—'}</span>
            <div style={{display:'flex', gap:'8px'}}>
              <button onClick={() => handleEdit(p)} style={{background:'transparent', border:'none', cursor:'pointer', color:'#8C8C88', padding:'4px', display:'flex', transition:'color 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.color=C} onMouseLeave={e=>e.currentTarget.style.color='#8C8C88'}>
                <Pencil size={15}/>
              </button>
              <button onClick={() => handleDelete(p.id)} style={{background:'transparent', border:'none', cursor:'pointer', color:'#8C8C88', padding:'4px', display:'flex', transition:'color 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.color=P} onMouseLeave={e=>e.currentTarget.style.color='#8C8C88'}>
                <Trash2 size={15}/>
              </button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{display:'flex', justifyContent:'center', gap:'8px', padding:'16px'}}>
            <button disabled={page===0} onClick={()=>setPage(p=>p-1)} style={{background:page===0?'transparent':C, color:page===0?'#8C8C88':'#fff', border:'1px solid rgba(28,28,24,0.15)', padding:'7px 14px', cursor:page===0?'default':'pointer', fontFamily:'sans-serif', fontSize:'11px'}}>← Prev</button>
            <span style={{fontFamily:'sans-serif', fontSize:'12px', color:'#8C8C88', padding:'0 12px', display:'flex', alignItems:'center'}}>Page {page+1} of {totalPages}</span>
            <button disabled={page>=totalPages-1} onClick={()=>setPage(p=>p+1)} style={{background:page>=totalPages-1?'transparent':C, color:page>=totalPages-1?'#8C8C88':'#fff', border:'1px solid rgba(28,28,24,0.15)', padding:'7px 14px', cursor:page>=totalPages-1?'default':'pointer', fontFamily:'sans-serif', fontSize:'11px'}}>Next →</button>
          </div>
        )}
      </div>
    </div>
  )
}
