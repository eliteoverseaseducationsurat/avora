import React, { useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import { 
  ShoppingBag, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Check, 
  Star, 
  Eye, 
  X, 
  Filter, 
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Gift
} from 'lucide-react';

const PRODUCTS = [
  /*{
    id: 1,
    name: 'Royal Oud Impérial',
    category: 'fragrance',
    price: 14500,
    priceLabel: '₹14,500',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    notes: 'Agarwood, Damask Rose, Amber, Saffron',
    description: 'An evocative olfactory journey crafted with rare Cambodian oud and Turkish roses distilled at dawn.'
  },
  {
    id: 2,
    name: 'Santal Du Royale',
    category: 'fragrance',
    price: 12800,
    priceLabel: '₹12,800',
    tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    notes: 'Mysore Sandalwood, Cardamom, Iris, Cedarwood',
    description: 'Silky, warm Australian and Mysore sandalwood blended with subtle botanical spices.'
  },
  {
    id: 3,
    name: 'The Avora Tote - Rose Gold',
    category: 'bags',
    price: 28500,
    priceLabel: '₹28,500',
    tag: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    notes: 'Handstitched Full-Grain Calfskin & Rose Gold Hardware',
    description: 'Handcrafted by master artisans in Florence using sustainably sourced full-grain leather.'
  },
  {
    id: 4,
    name: 'Monogram Satchel - Noir',
    category: 'bags',
    price: 24000,
    priceLabel: '₹24,000',
    tag: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
    notes: 'Italian Grain Leather & Velvet Lining',
    description: 'Timeless structure meets daily elegance with custom signature Monogram turn-lock closure.'
  },
  {
    id: 5,
    name: 'Velour Lip Elixir Set',
    category: 'cosmetics',
    price: 6500,
    priceLabel: '₹6,500',
    tag: 'Essential',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
    notes: 'Hyaluronic Spheres, Damask Rose Extract, Vitamin E',
    description: 'Trio of ultra-hydrating silk plush lip elixirs in universally flattering nude hues.'
  },
  {
    id: 6,
    name: 'Lumière Gold Serum',
    category: 'cosmetics',
    price: 9200,
    priceLabel: '₹9,200',
    tag: 'Holistic Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    notes: '24K Gold Flakes, Saffron Oil, Botanical Peptides',
    description: 'A transformative facial elixir designed to restore youthful radiant luminosity naturally.'
  },*/
  {
    id: 1,
    name: 'VELVET',
    category: 'fragrance',
   

    tag: 'For Her',
    image: 'https://eliteoverseaseducation.com/wp-content/uploads/2026/10/VELVET.jpeg',
    notes: 'Almond • Coffee • Jasmine • Tuberose • Tonka',
    description: 'Creamy almond and rich coffee create an inviting opening, unfolding into the intoxicating beauty of jasmine and tuberose. Tonka adds a smooth, warm finish that feels indulgent and sophisticated.',
    variants: [
      { size: '20 ml', price: 0 },
      { size: '50 ml', price: 0 },
      { size: '100 ml', price: 0 }
    ]
  },
  {
    id: 2,
    name: 'BLOOM',
    category: 'fragrance',
    
    tag: 'For Her',
    image: 'https://eliteoverseaseducation.com/wp-content/uploads/2026/10/BLOOM.jpeg',
    notes: 'Orchid · Rose · Lily of the Valley · Violet',
    description: 'A graceful floral composition that blends the timeless romance of rose with the delicate freshness of lily of the valley. Orchid and violet add a soft, powdery elegance for a beautifully feminine finish.',
    variants: [
      { size: '20 ml', price: 0 },
      { size: '50 ml', price: 0 },
      { size: '100 ml', price: 0 }
    ]
  },
  {
    id: 3,
    name: 'BLISS',
    category: 'fragrance',
    
    tag: 'For Her',
    image: 'https://eliteoverseaseducation.com/wp-content/uploads/2026/10/BLISS.jpeg',
    notes: 'Red Berries · Peony · Jasmine · Orchid',
    description: 'Juicy passionfruit and vibrant red berries bring a playful burst of fruit, while delicate peony and jasmine add a graceful floral heart. Vanilla orchid rounds out the fragrance with a soft, creamy finish.',
    variants: [
      { size: '20 ml', price: 0 },
      { size: '50 ml', price: 0 },
      { size: '100 ml', price: 0 }
    ]
  },
  {
    id: 4,
    name: 'BRAVEN',
    category: 'fragrance',
    
    tag: 'For His',
    image: 'https://eliteoverseaseducation.com/wp-content/uploads/2026/10/BRAVEN.jpeg',
    notes: 'Cardamom · Toffee · Amberwood',
    description: 'A rich, captivating fragrance where aromatic cardamom meets the indulgent sweetness of toffee, settling into the warm depth of amberwood.',
    variants: [
      { size: '20 ml', price: 0 },
      { size: '50 ml', price: 0 },
      { size: '100 ml', price: 0 }
    ]
  },
  {
    id: 5,
    name: 'SOLVER',
    category: 'fragrance',
    
    tag: 'For His',
    image: 'https://eliteoverseaseducation.com/wp-content/uploads/2026/10/SOLVER.jpeg',
    notes: 'Bergamot · Orange Blossom · Patchouli · Ambrofix',
    description: 'Bright bergamot opens with a crisp citrus freshness, followed by the delicate elegance of orange blossom. Patchouli and a modern amber-woody base bring depth to this clean, sophisticated scent.',
    variants: [
      { size: '20 ml', price: 0 },
      { size: '50 ml', price: 0 },
      { size: '100 ml', price: 0 }
    ]
  }
];


function ProductCard({ product, onWhatsApp, onQuickView }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[0] : null
  );

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E5C1CD]/30 hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-500 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-[#FDFBF7] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 bg-[#1A1A1A]/80 backdrop-blur-md text-[#E5C1CD] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">
          {product.tag}
        </div>

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="bg-white text-[#1A1A1A] p-3 rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors shadow-md"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onWhatsApp(`${product.name} - ${selectedVariant?.size || ''} (₹${selectedVariant?.price || ''})`)}
            className="bg-[#25D366] text-white p-3 rounded-full hover:bg-[#20ba5a] transition-colors shadow-md"
            title="Inquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
            {product.category}
          </span>
          <h3 className="font-serif text-xl font-medium text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-[#1A1A1A]/60 mt-1 line-clamp-1 italic">
            {product.notes}
          </p>
        </div>

        {/* Size Variant Selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-[#E5C1CD]/20">
            <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 font-semibold block">
              Select Size
            </span>
            <div className="flex gap-1.5">
              {product.variants.map((variant) => (
                <button
                  key={variant.size}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-3 py-1 text-[11px] rounded-full border transition-all ${
                    selectedVariant?.size === variant.size
                      ? 'bg-[#1A1A1A] text-[#E5C1CD] border-[#1A1A1A] font-semibold'
                      : 'bg-[#FDFBF7] text-[#1A1A1A]/70 border-[#E5C1CD]/50 hover:border-[#D4AF37]'
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Price & Order */}
        <div className="pt-3 border-t border-[#E5C1CD]/20 flex items-center justify-between">
          <span className="font-serif text-lg font-semibold text-[#1A1A1A]">
            ₹{selectedVariant ? selectedVariant.price.toLocaleString('en-IN') : ''}
          </span>
          <button
            onClick={() => onWhatsApp(`${product.name} - ${selectedVariant?.size || ''} (₹${selectedVariant?.price || ''})`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#25D366] transition-colors"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}




export default function App() {
  const [viewMode, setViewMode] = useState('store'); // 'store' or 'admin'
  const [activeCategory, setActiveCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(30000);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVariant, setModalVariant] = useState(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: 'Perfumes',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  // If viewing admin portal, switch to AdminDashboard component
  if (viewMode === 'admin') {
    return <AdminDashboard onBackToStore={() => setViewMode('store')} />;
  }

  // Filter products based on Category and Price
 // Filter products based on Category and Price
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    // Check if any variant price fits within maxPrice (or fallback to item.price if variants aren't used)
    const matchesPrice = item.variants 
      ? item.variants.some(v => v.price <= maxPrice)
      : (item.price || 0) <= maxPrice;

    return matchesCategory && matchesPrice;
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });

    try {
      const res = await axios.post('/api/contact', formData);
      if (res.data.success) {
        setStatus({
          loading: false,
          success: 'Thank you for contacting The Avora India. Our private concierge will reach out to you shortly.',
          error: ''
        });
        setFormData({ fullName: '', email: '', phone: '', interest: 'Perfumes', message: '' });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: '',
        error: err.response?.data?.message || 'Unable to submit your inquiry. Please try again or WhatsApp us directly.'
      });
    }
  };

  const openWhatsApp = (productName = '') => {
    const message = productName 
      ? `Hello The Avora India, I am interested in inquiring about ${productName}. Please share details.` 
      : `Hello The Avora India, I would like to make an inquiry and place an order.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919081600655?text=${encoded}`, '_blank');
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] font-sans min-h-screen selection:bg-[#E5C1CD] selection:text-[#1A1A1A]">
      
      {/*{/* Top Banner 
      <div className="bg-[#1A1A1A] text-[#E5C1CD] text-xs font-light tracking-widest text-center py-2.5 uppercase px-4 border-b border-[#D4AF37]/20 flex items-center justify-center gap-2">
        <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Complimentary Bespoke Packaging & Express Pan-India Delivery on orders above ₹10,000</span>
      </div>*/}

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E5C1CD]/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://eliteoverseaseducation.com/wp-content/uploads/2026/10/Luxury-Gold-Avora-India-Logo.png" 
              alt="The Avora Logo" 
              className="h-10 w-auto object-contain" 
            />
            <div>
              <span className="font-serif text-2xl font-semibold tracking-widest text-[#1A1A1A] uppercase block leading-none">
                THE AVORA
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium block mt-1">
                INDIA
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-[#1A1A1A]/80">
            <a href="#collections" className="hover:text-[#D4AF37] transition-colors">Collections</a>
            <a href="#craftsmanship" className="hover:text-[#D4AF37] transition-colors">Craftsmanship</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Private Concierge</a>
          </div>

          {/* Direct WhatsApp Order CTA */}
          <button 
            onClick={() => openWhatsApp()}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-wider px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Order via WhatsApp</span>
          </button>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E5C1CD]/20 via-[#FDFBF7] to-[#FDFBF7] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#FDFBF7]/80 backdrop-blur-sm text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Haute Fragrance & Leathercraft</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-normal text-[#1A1A1A] leading-tight tracking-tight">
            Sensory Luxury, <br />
            <span className="italic font-light text-[#D4AF37]">Crafted for Distinction</span>
          </h1>

          <p className="text-base md:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto font-light leading-relaxed">
            Discover bespoke fine fragrances, handcrafted Italian leather bags, and indulgent botanical cosmetics created for connoisseurs of understated elegance.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#collections"
              className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] text-[#FDFBF7] text-xs uppercase tracking-widest font-medium rounded-full hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300 shadow-md text-center"
            >
              Explore Collections
            </a>
            
            <button 
              onClick={() => openWhatsApp()}
              className="w-full sm:w-auto px-8 py-4 border border-[#25D366] text-[#1A1A1A] text-xs uppercase tracking-widest font-medium rounded-full hover:bg-[#25D366] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white" />
              <span>Connect +91 9081600655</span>
            </button>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="collections" className="py-24 max-w-7xl mx-auto px-6 border-t border-[#E5C1CD]/30">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium block">
            Curated Showcase
          </span>
          <h2 className="font-serif text-4xl font-normal tracking-tight">
            The Avora Creations
          </h2>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto"></div>
        </div>

        {/* Filters Controls */}
        <div className="bg-white/80 p-6 rounded-2xl border border-[#E5C1CD]/30 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Collections' },
              { id: 'fragrance', label: 'Fine Fragrances' },
              { id: 'bags', label: 'Leather Bags' },
              { id: 'cosmetics', label: 'Cosmetics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-200 ${
                  activeCategory === tab.id
                    ? 'bg-[#1A1A1A] text-[#E5C1CD] shadow-sm'
                    : 'bg-[#FDFBF7] text-[#1A1A1A]/70 hover:bg-[#E5C1CD]/30 hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Price Range Slider Filter */}
          <div className="flex items-center gap-4 w-full md:w-72 bg-[#FDFBF7] px-4 py-2 rounded-xl border border-[#E5C1CD]/30">
            <Filter className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-[11px] uppercase tracking-wider text-[#1A1A1A]/60 mb-1 font-medium">
                <span>Max Price:</span>
                <span className="text-[#1A1A1A] font-bold">₹{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="30000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer h-1 bg-[#E5C1CD]/50 rounded-lg appearance-none"
              />
            </div>
          </div>

        </div>

        {/* Product Grid 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E5C1CD]/30 hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-500 flex flex-col"
              >
                
                <div className="relative aspect-[4/5] bg-[#FDFBF7] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-[#1A1A1A]/80 backdrop-blur-md text-[#E5C1CD] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">
                    {product.tag}
                  </div>

                  
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white text-[#1A1A1A] p-3 rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors shadow-md"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openWhatsApp(product.name)}
                      className="bg-[#25D366] text-white p-3 rounded-full hover:bg-[#20ba5a] transition-colors shadow-md"
                      title="Inquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#1A1A1A]/60 mt-1 line-clamp-1 italic">
                      {product.notes}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5C1CD]/20 flex items-center justify-between">
                    <span className="font-serif text-lg font-semibold text-[#1A1A1A]">
                      {product.priceLabel}
                    </span>
                    <button
                      onClick={() => openWhatsApp(product.name)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#25D366] transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center space-y-3">
              <p className="text-lg font-serif text-[#1A1A1A]/60">No luxury items match your chosen filter.</p>
              <button 
                onClick={() => { setActiveCategory('all'); setMaxPrice(30000); }}
                className="text-xs uppercase tracking-widest text-[#D4AF37] underline font-medium hover:text-[#1A1A1A]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div> */}






      {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onWhatsApp={(msg) => openWhatsApp(msg)}
                onQuickView={(prod) => {
                  setSelectedProduct(prod);
                  setModalVariant(prod.variants ? prod.variants[0] : null);
                }}
              />
            ))
          ) : (
            <div className="col-span-full py-16 text-center space-y-3">
              <p className="text-lg font-serif text-[#1A1A1A]/60">No luxury items match your chosen filter.</p>
              <button 
                onClick={() => { setActiveCategory('all'); setMaxPrice(30000); }}
                className="text-xs uppercase tracking-widest text-[#D4AF37] underline font-medium hover:text-[#1A1A1A]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>



      </section>

      {/* Brand Craftsmanship Section */}
      <section id="craftsmanship" className="py-24 bg-[#1A1A1A] text-[#FDFBF7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium block">
              Our Ethos
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight">
              Mastery in Every Detail
            </h2>
            <p className="text-sm text-[#FDFBF7]/70 font-light leading-relaxed">
              At The Avora India, luxury is a quiet promise. Every formula is aged to perfection, every hide selected for flawless grain, and every cosmetic crafted with botanical purity.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: 'Rare Ingredients', desc: 'Sustainably harvested oud, rose extracts, and natural essential oils.' },
              { icon: Truck, title: 'White Glove Shipping', desc: 'Temperature-controlled Pan-India delivery with custom security seals.' },
              { icon: Gift, title: 'Bespoke Packaging', desc: 'Encased in custom velvet lined rose-gold foiled luxury gift boxes.' }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
                <feature.icon className="w-8 h-8 text-[#D4AF37]" />
                <h3 className="font-serif text-lg font-medium">{feature.title}</h3>
                <p className="text-xs text-[#FDFBF7]/60 leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E-COMMERCE COMING SOON PROMO BOX */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-[#1A1A1A] via-[#2D2327] to-[#1A1A1A] text-[#FDFBF7] p-10 md:p-14 rounded-3xl border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C1CD]/10 border border-[#E5C1CD]/30 text-[10px] uppercase tracking-widest text-[#E5C1CD] font-medium">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Digital Flagship Announcement</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-normal leading-tight">
              Our Full E-Commerce Experience is <span className="text-[#D4AF37] italic">Coming Soon</span>
            </h3>
            <p className="text-xs md:text-sm text-[#FDFBF7]/70 font-light leading-relaxed">
              We are currently finalizing our online checkout portal. In the meantime, all orders and personalized consultations are exclusively fulfilled via our Private WhatsApp Concierge.
            </p>
          </div>

          <button 
            onClick={() => openWhatsApp()}
            className="shrink-0 bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-3 transition-all shadow-lg hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Connect on WhatsApp</span>
          </button>

        </div>
      </section>

      {/* Contact & Private Concierge Form */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-6 border-t border-[#E5C1CD]/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium block">
                Private Concierge
              </span>
              <h2 className="font-serif text-4xl font-normal tracking-tight">
                Connect With Us
              </h2>
              <p className="text-sm text-[#1A1A1A]/70 font-light leading-relaxed">
                Whether you require bespoke gift curation, bulk corporate ordering, or product consultations, our brand specialists are available to assist you.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              
              {/* WhatsApp Quick Connect Card */}
              <div 
                onClick={() => openWhatsApp()}
                className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 cursor-pointer hover:bg-[#25D366]/20 transition-all flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 font-semibold block">
                    Direct Order & Support
                  </span>
                  <span className="font-serif text-xl font-medium text-[#1A1A1A] group-hover:text-[#25D366] transition-colors">
                    +91 90816 00655
                  </span>
                  <p className="text-xs text-[#1A1A1A]/70 mt-0.5">Click to open instant WhatsApp chat</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-[#1A1A1A]/80 font-light">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <span>info@avoraonline.in</span>
              </div>

             {/* Instagram Row (Clickable) */}
<a 
  href="https://www.instagram.com/theavoraindia?utm_source=qr&vrfl=YnhjZ3VsM3U2cnBt" 
  target="_blank" 
  rel="noopener noreferrer"
  className="flex items-center gap-4 text-sm text-[#1A1A1A]/80 font-light hover:text-[#D4AF37] transition-colors"
>
  <svg 
    className="w-5 h-5 text-[#D4AF37] fill-none stroke-current stroke-2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
  <span>@theavoraindia</span>
</a>

              {/*<div className="flex items-center gap-4 text-sm text-[#1A1A1A]/80 font-light">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <span>• Surat</span>
              </div>*/}

            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#E5C1CD]/40 shadow-xl space-y-6">
            <h3 className="font-serif text-2xl font-medium">Send an Inquiry</h3>
            
            {status.success && (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
                {status.success}
              </div>
            )}

            {status.error && (
              <div className="p-4 rounded-xl bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200">
                {status.error}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/70 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Lady Ananya Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5C1CD]/50 bg-[#FDFBF7] text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/70 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E5C1CD]/50 bg-[#FDFBF7] text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/70 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-[#E5C1CD]/50 bg-[#FDFBF7] text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/70 font-semibold mb-1">Collection Interest</label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5C1CD]/50 bg-[#FDFBF7] text-xs focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Perfumes">Fine Fragrances</option>
                  <option value="Leather Bags">Luxury Leather Bags</option>
                  <option value="Cosmetics">Botanical Cosmetics</option>
                  <option value="Bespoke Gifting">Bespoke Corporate Gifting</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/70 font-semibold mb-1">Message *</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your inquiry or order preference..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E5C1CD]/50 bg-[#FDFBF7] text-xs focus:outline-none focus:border-[#D4AF37]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 bg-[#1A1A1A] text-[#FDFBF7] rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors shadow-md disabled:opacity-50"
              >
                {status.loading ? 'Submitting Inquiry...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-[#FDFBF7]/60 py-12 border-t border-[#D4AF37]/20 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#E5C1CD] font-serif font-bold text-sm">
              A
            </div>
            <span className="font-serif text-lg tracking-widest text-[#FDFBF7] uppercase">
              THE AVORA INDIA
            </span>
          </div>

          <p className="text-[11px] tracking-wider text-center">
            © {new Date().getFullYear()} The Avora India. All Rights Reserved. Luxury Reimagined.
          </p>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
            <span className="hover:text-[#D4AF37] cursor-pointer">Privacy</span>
            <span className="hover:text-[#D4AF37] cursor-pointer">Terms</span>
            <span 
  onClick={() => {
    const pin = prompt("Enter Admin Access PIN:");
    if (pin === "8877") { // Replace with your secret PIN
      setViewMode('admin');
    } else if (pin) {
      alert("Unauthorized Access!");
    }
  }} 
  className="text-[#D4AF37] hover:underline cursor-pointer font-bold"
>
  Admin Portal
</span>
          </div>
        </div>
      </footer>

      {/* Quick View Modal 
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] max-w-2xl w-full rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-[#1A1A1A]/80 text-[#FDFBF7] p-2 rounded-full hover:bg-[#1A1A1A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square bg-stone-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#1A1A1A]">
                    {selectedProduct.name}
                  </h3>
                  <p className="font-serif text-xl font-bold text-[#1A1A1A]">
                    {selectedProduct.priceLabel}
                  </p>
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light pt-2">
                    {selectedProduct.description}
                  </p>
                  <div className="pt-2 text-[11px] text-[#D4AF37] font-medium">
                    Notes: {selectedProduct.notes}
                  </div>
                </div>

                <button
                  onClick={() => {
                    openWhatsApp(selectedProduct.name);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-3.5 bg-[#25D366] text-white rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}*/}



    {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] max-w-2xl w-full rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-[#1A1A1A]/80 text-[#FDFBF7] p-2 rounded-full hover:bg-[#1A1A1A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square bg-stone-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#1A1A1A]">
                    {selectedProduct.name}
                  </h3>
                  <p className="font-serif text-xl font-bold text-[#1A1A1A]">
                    ₹{modalVariant ? modalVariant.price.toLocaleString('en-IN') : ''}
                  </p>

                  {/* Modal Size Selector */}
                  {selectedProduct.variants && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 font-semibold block">
                        Select Size
                      </span>
                      <div className="flex gap-1.5">
                        {selectedProduct.variants.map((variant) => (
                          <button
                            key={variant.size}
                            onClick={() => setModalVariant(variant)}
                            className={`px-3 py-1 text-[11px] rounded-full border transition-all ${
                              modalVariant?.size === variant.size
                                ? 'bg-[#1A1A1A] text-[#E5C1CD] border-[#1A1A1A] font-semibold'
                                : 'bg-white text-[#1A1A1A]/70 border-[#E5C1CD]/50 hover:border-[#D4AF37]'
                            }`}
                          >
                            {variant.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light pt-2">
                    {selectedProduct.description}
                  </p>
                  <div className="pt-1 text-[11px] text-[#D4AF37] font-medium">
                    Notes: {selectedProduct.notes}
                  </div>
                </div>

                <button
                  onClick={() => {
                    openWhatsApp(`${selectedProduct.name} - ${modalVariant?.size || ''} (₹${modalVariant?.price || ''})`);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-3.5 bg-[#25D366] text-white rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}