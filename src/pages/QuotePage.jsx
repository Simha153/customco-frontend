import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { quoteAPI } from '../services/api'
import toast from 'react-hot-toast'

export default function QuotePage() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [form, setForm] = useState({
    companyName: '', contactName: '', email: '', phone: '',
    productType: '', quantity: '', budget: '', requirements: ''
  })

  const set = (k, v) => setForm(p => ({...p, [k]: v}))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.companyName || !form.email || !form.productType || !form.quantity) {
      toast.error('Please fill all required fields'); return
    }
    setLoading(true)
    try {
      await quoteAPI.submit({
        companyName: form.companyName, contactName: form.contactName,
        email: form.email, phone: form.phone, productType: form.productType,
        quantity: Number(form.quantity), budget: form.budget, requirements: form.requirements,
      })
      setSubmitted(true)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.')
    } finally { setLoading(false) }
  }

  const C = '#1B3A6B', P = '#C8372D'

  const inputStyle = {
    background:'#F5F0E8', border:'1px solid rgba(28,28,24,0.12)', color:'#1A1A18',
    padding:'11px 14px', fontFamily:'sans-serif', fontSize:'13px', outline:'none',
    transition:'border-color 0.2s', width:'100%', boxSizing:'border-box'
  }

  const Field = ({ label, required, children }) => (
    <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>
      <label style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.18em',textTransform:'uppercase',color:'#8C8C88'}}>
        {label}{required && <span style={{color:P,marginLeft:'2px'}}>*</span>}
      </label>
      {children}
    </div>
  )

  if (submitted) return (
    <div style={{background:'#F5F0E8',minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 16px'}}>
      <div style={{textAlign:'center',maxWidth:'440px'}}>
        <div style={{width:'64px',height:'64px',background:C,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px',borderRadius:'50%'}}>
          <CheckCircle size={32} color="#fff"/>
        </div>
        <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.3em',textTransform:'uppercase',color:C,marginBottom:'12px'}}>Quote submitted</p>
        <h2 style={{fontSize:'28px',color:'#1A1A18',fontWeight:400,marginBottom:'12px'}}>We'll be in touch<br/>within 24 hours.</h2>
        <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'#8C8C88',lineHeight:'1.7',marginBottom:'32px'}}>
          Thank you, <strong>{form.contactName||form.companyName}</strong>! Our team has received your quote request and will contact you at <strong>{form.email}</strong> with pricing and details.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={() => navigate('/products')}
            style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',background:C,color:'#fff',border:'none',padding:'12px 24px',cursor:'pointer',fontWeight:700}}>
            Browse Catalog
          </button>
          <button onClick={() => { setSubmitted(false); setForm({companyName:'',contactName:'',email:'',phone:'',productType:'',quantity:'',budget:'',requirements:''}) }}
            style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',background:'transparent',color:C,border:'1.5px solid '+C,padding:'12px 24px',cursor:'pointer'}}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{background:'#F5F0E8',minHeight:'80vh'}}>
      <style>{`
        .quote-hero{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;padding:48px 40px;background:#3D2314}
        .quote-stats{display:grid;grid-template-columns:1fr 1fr;gap:2px}
        .quote-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
        .quote-body{padding:48px 40px}
        .quote-footer{display:flex;align-items:center;justify-content:space-between;margin-top:20px;flex-wrap:wrap;gap:12px}
        @media(max-width:640px){
          .quote-hero{grid-template-columns:1fr!important;padding:32px 16px!important;gap:24px!important}
          .quote-stats{grid-template-columns:repeat(2,1fr)!important}
          .quote-form-grid{grid-template-columns:1fr!important}
          .quote-body{padding:24px 16px!important}
          .quote-footer{flex-direction:column!important;align-items:stretch!important}
          .quote-submit-btn{width:100%!important;justify-content:center!important}
        }
      `}</style>

      {/* Hero */}
      <div className="quote-hero">
        <div>
          <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.35em',textTransform:'uppercase',color:'rgba(245,240,232,0.45)',marginBottom:'12px'}}>Get Started</p>
          <h1 style={{fontSize:'36px',color:'#F5F0E8',fontWeight:400,lineHeight:1.1,marginBottom:'12px'}}>
            Request a<br/><em style={{color:'#C8372D',fontStyle:'italic'}}>custom quote.</em>
          </h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(245,240,232,0.55)',lineHeight:'1.7'}}>
            Tell us what you need. Our team will respond within 24 hours with pricing, timelines, and options tailored to your business.
          </p>
        </div>
        <div className="quote-stats">
          {[{n:'24h',l:'Response time'},{n:'Free',l:'Quote always'},{n:'500+',l:'Clients served'},{n:'14d',l:'Avg delivery'}].map(s => (
            <div key={s.l} style={{background:'rgba(255,255,255,0.05)',padding:'16px',borderBottom:'2px solid rgba(245,240,232,0.06)'}}>
              <div style={{fontSize:'24px',color:'#F5F0E8',fontWeight:400,marginBottom:'4px'}}>{s.n}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(245,240,232,0.4)'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="quote-body">
        <form onSubmit={handleSubmit}>
          <div style={{background:'#fff',border:'0.5px solid rgba(28,28,24,0.08)',padding:'32px 24px'}}>
            <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.25em',textTransform:'uppercase',color:C,marginBottom:'24px'}}>Company Details</p>
            <div className="quote-form-grid">
              <Field label="Company Name" required>
                <input style={inputStyle} placeholder="Acme Corp" value={form.companyName} onChange={e => set('companyName', e.target.value)}
                  onFocus={e => e.target.style.borderColor=C} onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.12)'}/>
              </Field>
              <Field label="Contact Person">
                <input style={inputStyle} placeholder="Your full name" value={form.contactName} onChange={e => set('contactName', e.target.value)}
                  onFocus={e => e.target.style.borderColor=C} onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.12)'}/>
              </Field>
              <Field label="Email Address" required>
                <input type="email" style={inputStyle} placeholder="you@company.com" value={form.email} onChange={e => set('email', e.target.value)}
                  onFocus={e => e.target.style.borderColor=C} onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.12)'}/>
              </Field>
              <Field label="Phone Number">
                <input style={inputStyle} placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)}
                  onFocus={e => e.target.style.borderColor=C} onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.12)'}/>
              </Field>
            </div>

            <div style={{height:'1px',background:'rgba(28,28,24,0.06)',margin:'24px 0'}}/>
            <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.25em',textTransform:'uppercase',color:C,marginBottom:'24px'}}>Order Requirements</p>

            <div className="quote-form-grid">
              <Field label="Product Type" required>
                <select style={{...inputStyle,appearance:'none',cursor:'pointer'}} value={form.productType} onChange={e => set('productType', e.target.value)}
                  onFocus={e => e.target.style.borderColor=C} onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.12)'}>
                  <option value="">Select product type</option>
                  {['T-Shirts','Polo Shirts','Hoodies','Jackets','Uniforms','Workwear','Caps','Bags','Kurtas','Custom'].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Quantity Required" required>
                <input type="number" style={inputStyle} placeholder="e.g. 500" min="1" value={form.quantity} onChange={e => set('quantity', e.target.value)}
                  onFocus={e => e.target.style.borderColor=C} onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.12)'}/>
              </Field>
              <Field label="Budget Range (₹)">
                <select style={{...inputStyle,appearance:'none',cursor:'pointer'}} value={form.budget} onChange={e => set('budget', e.target.value)}
                  onFocus={e => e.target.style.borderColor=C} onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.12)'}>
                  <option value="">Select budget range</option>
                  {['Under ₹50,000','₹50,000 – ₹2,00,000','₹2,00,000 – ₹5,00,000','₹5,00,000 – ₹10,00,000','Above ₹10,00,000'].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Customization Requirements">
              <textarea
                style={{...inputStyle,height:'110px',resize:'vertical'}}
                placeholder="Describe your needs: logo placement, colors, sizes breakdown, fabric preference, embroidery or print, delivery deadline..."
                value={form.requirements}
                onChange={e => set('requirements', e.target.value)}
                onFocus={e => e.target.style.borderColor=C}
                onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.12)'}
              />
            </Field>
          </div>

          <div className="quote-footer">
            <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'#8C8C88'}}>
              <span style={{color:P}}>*</span> Required fields. We'll never share your information.
            </p>
            <button type="submit" disabled={loading} className="quote-submit-btn"
              style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',background:loading?'#8C8C88':P,color:'#fff',border:'none',padding:'14px 36px',cursor:loading?'default':'pointer',fontWeight:700,display:'flex',alignItems:'center',gap:'8px',transition:'background 0.2s'}}>
              {loading ? 'Submitting...' : <><ArrowRight size={14}/> Submit Quote Request</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
