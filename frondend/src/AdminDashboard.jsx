import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Trash2 as TrashIcon, 
  RefreshCw as RefreshIcon, 
  Mail as MailIcon, 
  Phone as PhoneIcon, 
  Calendar as CalendarIcon, 
  ArrowLeft as BackIcon, 
  MessageSquare as MsgIcon, 
  Shield as ShieldIcon 
} from 'lucide-react';

export default function AdminDashboard({ onBackToStore }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterInterest, setFilterInterest] = useState('All');

  const fetchInquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/contact');
      if (res.data.success) {
        setInquiries(res.data.data);
      }
    } catch (err) {
      setError('Failed to fetch inquiries. Please check if your backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await axios.delete(`/api/contact/${id}`);
      if (res.data.success) {
        setInquiries(inquiries.filter((item) => item._id !== id));
      }
    } catch (err) {
      alert('Error deleting inquiry.');
    }
  };

  const filteredInquiries = inquiries.filter((item) => 
    filterInterest === 'All' ? true : item.interest === filterInterest
  );

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] min-h-screen p-6 md:p-12 font-sans">
      
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-[#E5C1CD]/40 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToStore}
            className="p-2.5 rounded-full bg-white border border-[#E5C1CD]/50 hover:bg-[#1A1A1A] hover:text-[#FDFBF7] transition-all shadow-sm"
            title="Back to Storefront"
          >
            <BackIcon className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <ShieldIcon className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">Private Portal</span>
            </div>
            <h1 className="font-serif text-3xl font-medium">Concierge Admin Dashboard</h1>
          </div>
        </div>

        <button 
          onClick={fetchInquiries}
          className="flex items-center gap-2 bg-[#1A1A1A] text-[#E5C1CD] px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all shadow-sm"
        >
          <RefreshIcon className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* Filter Bar & Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5C1CD]/30 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-[#1A1A1A]/70 font-medium">
            Total Inquiries: <span className="font-bold text-[#1A1A1A] text-sm ml-1">{inquiries.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/60">Category:</span>
            <select
              value={filterInterest}
              onChange={(e) => setFilterInterest(e.target.value)}
              className="px-4 py-2 rounded-xl border border-[#E5C1CD]/50 bg-[#FDFBF7] text-xs font-medium focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="All">All Categories</option>
              <option value="Perfumes">Fine Fragrances</option>
              <option value="Leather Bags">Luxury Leather Bags</option>
              <option value="Cosmetics">Botanical Cosmetics</option>
              <option value="Bespoke Gifting">Bespoke Corporate Gifting</option>
            </select>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200">
            {error}
          </div>
        )}

        {/* Inquiries List */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshIcon className="w-6 h-6 text-[#D4AF37] animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-widest text-[#1A1A1A]/60">Fetching inquiries from database...</p>
          </div>
        ) : filteredInquiries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInquiries.map((item) => (
              <div 
                key={item._id}
                className="bg-white rounded-2xl p-6 border border-[#E5C1CD]/40 hover:border-[#D4AF37]/50 transition-all shadow-sm flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#E5C1CD]/20 text-[#1A1A1A] font-semibold border border-[#E5C1CD]/40">
                      {item.interest || 'General'}
                    </span>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                      title="Delete Inquiry"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">
                      {item.fullName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/60 mt-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 text-xs text-[#1A1A1A]/80 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <MailIcon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <a href={`mailto:${item.email}`} className="hover:underline truncate">{item.email}</a>
                    </div>
                    {item.phone && (
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-[#FDFBF7] rounded-xl border border-stone-100 text-xs text-[#1A1A1A]/70 leading-relaxed italic">
                    <MsgIcon className="w-3 h-3 text-[#D4AF37] inline mr-1.5 mb-0.5" />
                    "{item.message}"
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${item.phone ? item.phone.replace(/[^0-9]/g, '') : ''}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white text-[11px] font-semibold uppercase tracking-wider text-center transition-all border border-[#25D366]/30"
                  >
                    Reply on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white py-16 rounded-2xl border border-[#E5C1CD]/30 text-center space-y-2">
            <p className="font-serif text-xl text-[#1A1A1A]/60">No inquiries found in this category.</p>
            <p className="text-xs text-[#1A1A1A]/40">Submissions from the website form will appear here automatically.</p>
          </div>
        )}

      </div>
    </div>
  );
}