import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createPortal } from 'react-dom';
import PopupMessage from '../ui/PopupMessage';
import { GrNext, GrPrevious } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";

// ── Detail Modal ───────────────────────────────────────────────────────────
const UserDetailModal = ({ userId, token, onClose }) => {
  const [detail, setDetail]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true); setError(null);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/get-users/${userId}/`,
          { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(`Status ${res.status}`);
        setDetail(await res.json());
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };
    fetchDetail();
  }, [userId]);

  const fmt = (d) => !d ? '—' : new Date(d).toLocaleString('en-GB', { year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit' });

  const fields = detail ? [
    { label: 'Email',                value: detail.user.email },
    { label: 'Membership ID',        value: detail.user.membership_id },
    { label: 'Balance',              value: `₦${Number(detail.wallet.balance).toLocaleString()}`, green: true },
    { label: 'Status',               value: detail.user.is_active !== false ? 'Active' : 'Inactive' },
    { label: 'Account Name',         value: detail.profile.account_name ?? 'Nil' },
    { label: 'Account Number',       value: detail.profile.account_number ?? 'Nil' },
    { label: 'Bank Name',            value: detail.profile.bank_name ?? 'Nil' },
    { label: 'Phone',                value: detail.profile.phone_number ?? 'Nil' },
    { label: 'Address',              value: detail.profile.address ?? 'Nil' },
    { label: 'Loan Eligibility',     value: detail.loan_eligibility.is_eligible ? 'Eligible' : 'Not Eligible' },
    { label: 'Wallet Created',       value: fmt(detail.wallet.created_on) },
    { label: 'Wallet Updated',       value: fmt(detail.wallet.updated_on) },
    ...(detail.active_loan ? [
      { label: 'Disbursed At',           value: fmt(detail.active_loan.disbursed_at) },
      { label: 'Installments Remaining', value: `${detail.active_loan.installments_remaining}` },
      { label: 'Monthly Installment',    value: detail.active_loan.monthly_installment },
      { label: 'Principal',              value: detail.active_loan.principal },
      { label: 'Tenure',                 value: `${detail.active_loan.tenure_months} months` },
      { label: 'Due Date',               value: detail.active_loan.this_month_due_date },
      { label: 'Installment #',          value: detail.active_loan.this_month_installment_number },
      { label: 'Total Outstanding',      value: detail.active_loan.total_outstanding },
      { label: 'Total Repayable',        value: detail.active_loan.total_repayable },
    ] : []),
  ] : [];

  return createPortal(
    <div className="fixed inset-0 z-50 flex  items-center justify-center p-0 sm:p-4 bg-cooperative-dark/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-[90%] sm:max-w-lg bg-cooperative-cream rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl "
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-cooperative-dark px-5 py-4 rounded-t-2xl sm:rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cooperative-teal font-bold">Member Profile</p>
            {detail && !loading && (
              <p className="text-cooperative-cream font-bold text-base mt-0.5">{detail.user.full_name || '—'}</p>
            )}
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cooperative-cream transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4">
          {loading && (
            <div className="flex flex-col items-center py-12 gap-3">
              <div className="w-8 h-8 rounded-full border-4 border-cooperative-teal/20 border-t-cooperative-teal animate-spin"/>
              <p className="text-cooperative-dark/50 text-sm">Fetching details…</p>
            </div>
          )}
          {error && (
            <div className="text-center py-10">
              <p className="font-semibold text-red-600">Could not load details</p>
              <p className="text-sm mt-1 text-red-400">{error}</p>
            </div>
          )}
          {detail && !loading && (
            <div className="space-y-3">
              {/* Avatar + role */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-xl border border-cooperative-dark/8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0 ${detail.user.is_admin ? 'bg-cooperative-teal' : 'bg-cooperative-orange'}`}>
                  {detail.user.full_name?.charAt(0)?.toUpperCase() ?? '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-cooperative-dark truncate">{detail.user.full_name || '—'}</p>
                  <p className="text-xs text-cooperative-dark/50">@{detail.user.username || '—'}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${detail.user.is_admin ? 'bg-cooperative-teal/10 text-cooperative-teal' : 'bg-cooperative-orange/10 text-cooperative-orange'}`}>
                  {detail.user.is_admin ? 'Admin' : 'Member'}
                </span>
              </div>

              {/* Active loan section label */}
              {detail.active_loan && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-cooperative-orange pt-2 pb-1 border-t border-cooperative-dark/8">Active Loan</p>
              )}

              {/* Fields */}
              {fields.map(({ label, value, green }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-cooperative-dark/8 last:border-0">
                  <span className="text-xs text-cooperative-dark/50 font-semibold">{label}</span>
                  <span className={`text-xs font-semibold text-right max-w-[55%] break-all ${green ? 'text-cooperative-teal' : 'text-cooperative-dark'}`}>{value || '—'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// ── Main ───────────────────────────────────────────────────────────────────
const ManageMember = () => {
  const { getAccessToken } = useAuth();
  const token = getAccessToken();

  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [title, setTitle]           = useState('');
  const [message, setmessage]       = useState('');
  const [type, settype]             = useState('');
  const [open, setOpen]             = useState(false);
  const [nextPage, setNextPage]     = useState('');
  const [prevPage, setPrevPage]     = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState({});

  const getUsers = async (more = '') => {
    try {
      setLoading(true); setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/get-users${more}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      setNextPage(data.next);
      setPrevPage(data.previous);
      setTotalCount(data.count ?? 0);
      const list = Array.isArray(data) ? data : (data.results ?? []);
      const detailedUsers = await Promise.all(
        list.map(async (u) => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/api/users/get-users/${u.id}/`,
              { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) return u;
            const detail = await res.json();
            return { ...u, wallet_created_on: detail.wallet?.created_on ?? null, balance: detail.wallet?.balance };
          } catch { return u; }
        })
      );
      setUsers(detailedUsers);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const queryMore = () => {
    if (!nextPage) { setOpen(true); settype('error'); setmessage('You are on the last page'); setTitle('End of list'); return; }
    getUsers(nextPage.slice(41));
  };
  const queryPrev = () => {
    if (!prevPage) { setOpen(true); settype('error'); setmessage('You are on the first page'); setTitle('Start of list'); return; }
    getUsers(prevPage.slice(41));
  };

  useEffect(() => { getUsers(); }, []);

  
  const fmtDate = (d) => !d ? '—' : new Date(d).toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'2-digit' });

  const handleExport = () => {
    const headers = ['Full Name','Email','Username','Membership ID','Role','Status','Balance','Joined'];
    const rows = users.map((u) => [u.full_name??'', u.email??'', u.username??'', u.membership_id??'', u.is_admin?'Admin':'Member', u.is_active!==false?'Active':'Inactive', Number(u.balance).toLocaleString()??'0.00', fmtDate(u.wallet_created_on)]);
    const csv = [headers,...rows].map(r=>r.join(',')).join('\n');
    const blob = new Blob([csv],{type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='members.csv'; a.click();
    URL.revokeObjectURL(url);
  };
const handleSearch = async() =>{
 console.log(searchTerm);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/get-users/by-email/?email=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     

      const data = await res.json();
       if(!res.ok){
      throw new Error('Seems an error has occured')
      }
     setSearchValue(data);
   
      return data
    
    } catch (error) {
       console.log('Error')
    }
}
  return (
    <div className="min-h-screen bg-cooperative-cream">
      {selectedUserId && <UserDetailModal userId={selectedUserId} token={token} onClose={() => setSelectedUserId(null)} />}
        {searchValue?.user?.email && <UserDetailModal userId={searchValue?.user?.id} token={token} onClose={() => setSearchValue(null)} />}

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cooperative-teal font-bold mb-1">Administration</p>
            <h1 className="text-2xl font-bold text-cooperative-dark">Manage Members</h1>
            <p className="text-sm text-cooperative-dark/50 mt-0.5">{totalCount > 0 ? `${totalCount} total members` : 'View and manage cooperative members'}</p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-cooperative-teal text-white text-sm font-semibold rounded-lg hover:bg-cooperative-teal/90 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Export CSV
          </button>
        </div>

        {/* ── Search ── */}
        <div className="mb-5">
          
            <div className='grid grid-cols-4 gap-x-6 max-small-screen:grid-cols-1'>
            <input
              type="text"
              placeholder="Search email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm bg-white border border-cooperative-dark/12 rounded-lg text-cooperative-dark placeholder:text-cooperative-dark/35 focus:outline-none focus:border-cooperative-orange transition col-span-3 "
            />
            <button className='bg-cooperative-dark text-white rounded-md flex items-center justify-center gap-6 w-[70%] max-sm:w-[100%] max-small-screen:h-[35px] mt-2' onClick={handleSearch} >Search</button>
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center py-20 gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-cooperative-teal/20 border-t-cooperative-teal animate-spin"/>
            <p className="text-cooperative-dark/50 text-sm">Loading members…</p>
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="font-semibold text-red-600 text-sm">Failed to load members</p>
            <p className="text-xs text-red-400 mt-1">{error}</p>
            <button onClick={getUsers} className="mt-3 px-4 py-1.5 bg-cooperative-orange text-white text-sm font-semibold rounded-lg">Retry</button>
          </div>
        )}

        {/* ── Table ── */}
        {!loading && !error && (
          <div className="bg-white rounded-xl border border-cooperative-dark/10 overflow-hidden">

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cooperative-dark">
                    {['Member','Email','Membership ID','Balance','Role','Status','Joined',''].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-cooperative-cream/70 first:pl-5 last:pr-5 last:text-right">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-cooperative-dark/6">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-cooperative-cream/60 transition-colors">
                      {/* Member */}
                      <td className="px-4 py-3 pl-5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${u.is_admin ? 'bg-cooperative-teal' : 'bg-cooperative-orange'}`}>
                            {u.full_name?.charAt(0)?.toUpperCase() ?? '?'}
                          </div>
                          <div>
                            <p className="font-semibold text-cooperative-dark text-sm leading-none">{u.full_name || '—'}</p>
                            <p className="text-[11px] text-cooperative-dark/40 mt-0.5">@{u.username || '—'}</p>
                          </div>
                        </div>
                      </td>
                      {/* Email */}
                      <td className="px-4 py-3 text-cooperative-dark/70 text-xs">{u.email || '—'}</td>
                      {/* Membership */}
                      <td className="px-4 py-3 font-mono text-cooperative-dark/70 text-xs">{u.membership_id || '—'}</td>
                      {/* Balance */}
                      <td className="px-4 py-3 font-bold text-cooperative-teal text-sm">₦{Number(u.balance).toLocaleString()}</td>
                      {/* Role */}
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${u.is_admin ? 'bg-cooperative-teal/10 text-cooperative-teal' : 'bg-cooperative-orange/10 text-cooperative-orange'}`}>
                          {u.is_admin ? 'Admin' : 'Member'}
                        </span>
                      </td>
                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${u.is_active !== false ? 'bg-cooperative-teal/10 text-cooperative-teal' : 'bg-cooperative-dark/8 text-cooperative-dark/40'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.is_active !== false ? 'bg-cooperative-teal' : 'bg-cooperative-dark/30'}`}/>
                          {u.is_active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      {/* Joined */}
                      <td className="px-4 py-3 text-cooperative-dark/50 text-xs">{fmtDate(u.wallet_created_on)}</td>
                      {/* Action */}
                      <td className="px-4 py-3 pr-5 text-right">
                        <button
                          onClick={() => setSelectedUserId(u.id)}
                          className="px-3 py-1.5 bg-cooperative-dark text-cooperative-cream text-xs font-semibold rounded-lg hover:bg-cooperative-dark/80 transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-cooperative-dark/8">
              {users.map((u) => (
                <div key={u.id} className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ${u.is_admin ? 'bg-cooperative-teal' : 'bg-cooperative-orange'}`}>
                    {u.full_name?.charAt(0)?.toUpperCase() ?? '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-cooperative-dark text-sm truncate">{u.full_name || '—'}</p>
                    <p className="text-xs text-cooperative-dark/45 truncate">{u.email || '—'}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-cooperative-teal">₦{Number(u.balance).toLocaleString()}</span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${u.is_active !== false ? 'bg-cooperative-teal/10 text-cooperative-teal' : 'bg-cooperative-dark/8 text-cooperative-dark/40'}`}>
                        {u.is_active !== false ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedUserId(u.id)} className="px-3 py-1.5 bg-cooperative-dark text-cooperative-cream text-xs font-semibold rounded-lg flex-shrink-0">
                    View
                  </button>
                </div>
              ))}
            </div>

            {/* {filteredUsers.length === 0 && (
              <div className="text-center py-14">
                <p className="text-cooperative-dark/40 text-sm">No members match your search</p>
              </div>
            )} */}
            {/* Nothing is showing */}

            {/* ── Pagination footer ── */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-cooperative-dark/8 bg-cooperative-cream/40">
              <div className="flex items-center gap-2">
                <button
                  onClick={queryPrev}
                  disabled={!prevPage}
                  className="w-8 h-8 rounded-lg bg-cooperative-dark text-cooperative-cream flex items-center justify-center hover:bg-cooperative-dark/80 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <GrPrevious className="w-3 h-3"/>
                </button>
                <button
                  onClick={queryMore}
                  disabled={!nextPage}
                  className="w-8 h-8 rounded-lg bg-cooperative-dark text-cooperative-cream flex items-center justify-center hover:bg-cooperative-dark/80 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <GrNext className="w-3 h-3"/>
                </button>
              </div>
           
            </div>
          </div>
        )}
      </div>

      {createPortal(
        <PopupMessage title={title} message={message} onClose={() => setOpen(false)} isOpen={open} type={type}/>,
        document.body
      )}
    </div>
  );
};

export default ManageMember;