import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-dark-100/10 bg-dark-900 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-lg text-dark-50 mb-3">Custom<span className="text-brand-400">.Co</span></p>
          <p className="text-dark-100/50 text-sm leading-relaxed">
            Premium B2B customized clothing for businesses that care about quality.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-dark-100/40 mb-4">Navigation</p>
          <div className="flex flex-col gap-2">
            <Link to="/products" className="text-dark-100/60 hover:text-brand-400 text-sm transition-colors">Products</Link>
            <Link to="/quote"    className="text-dark-100/60 hover:text-brand-400 text-sm transition-colors">Get Quote</Link>
            <Link to="/login"    className="text-dark-100/60 hover:text-brand-400 text-sm transition-colors">Login</Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-dark-100/40 mb-4">Contact</p>
          <p className="text-dark-100/60 text-sm">simhadri@customco.com</p>
          <p className="text-dark-100/60 text-sm mt-1">github.com/Simha153</p>
        </div>
      </div>
      <div className="border-t border-dark-100/10 px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <p className="text-dark-100/30 text-xs">© 2026 Custom.Co. All rights reserved.</p>
        <p className="text-dark-100/30 text-xs font-mono">v1.0.0</p>
      </div>
    </footer>
  )
}
