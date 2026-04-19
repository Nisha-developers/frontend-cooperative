import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

// ── Detail Modal ──────────────────────────────────────────────────────────────
const UserDetailModal = ({ userId, token, onClose }) => {
  const [detail, setDetail]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/get-users/${userId}/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error(`Failed with status ${res.status}`);
        const data = await res.json();
        setDetail(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [userId]);
  console.log(detail);
  console.log('hi')

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('en-GB', {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 "
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-lg rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6" style={{ color: '#003000' }}>
          Member Details
        </h2>

        {loading && (
          <div className="flex flex-col items-center py-10">
            <div
              className="w-8 h-8 border-4 rounded-full animate-spin"
              style={{ borderColor: '#003000', borderTopColor: 'transparent' }}
            />
            <p className="mt-3 text-sm" style={{ color: '#003000' }}>Fetching details…</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="font-semibold" style={{ color: '#E65100' }}>Could not load details</p>
            <p className="text-sm mt-1" style={{ color: '#BF360C' }}>{error}</p>
          </div>
        )}

        {detail && !loading && (
          <div className="space-y-4">
            {/* Avatar row */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                style={{ backgroundColor: detail.user.is_admin ? '#2E7D32' : '#F57C00' }}
              >
                {detail.user.full_name?.charAt(0)?.toUpperCase() ?? '?'}
              </div>
              <div>
                <p className="text-lg font-bold" style={{ color: '#003000' }}>{detail.user.full_name || '—'}</p>
                <p className="text-sm opacity-60" style={{ color: '#003000' }}>@{detail.user.username || '—'}</p>
              </div>
              <span
                className="ml-auto px-3 py-1 text-xs rounded-full font-semibold"
                style={{ backgroundColor: detail.user.is_admin ? '#2E7D32' : '#F57C00', color: '#fff' }}
              >
                {detail.user.is_admin ? 'Admin' : 'Member'}
              </span>
            </div>

            {/* Fields grid */}
            {[
              { label: 'Email',          value: detail.user.email },
              { label: 'Membership ID',  value: detail.user.membership_id },
              { label: 'Balance',        value: `₦${Number(detail.wallet.balance).toLocaleString() ?? '0.00'}` },
              { label: 'Status',         value: detail.user.is_active !== false ? 'Active' : 'Inactive' },
              { label: 'Account Name',        value: `${detail.profile.account_name ?? 'Nill'}` },
              { label: 'Account Number',        value: `${detail.profile.account_number ?? 'Nill'}` },
               { label: 'Bank Name',        value: `${detail.profile.bank_name ?? 'Nill'}` },
              { label: 'Phone Number',        value: `${detail.profile.phone_number ?? 'Nill'}` },
              { label: 'Location',        value: `${detail.profile.address ?? 'Nill'}` },
              { label: 'Loan Eligibility',        value: `${detail.loan_eligibility.is_eligible ? 'Eligible': 'Not Eligible'}` },
              { label: 'Created On',     value: formatDate(detail.wallet.created_on) },
              { label: 'Last Updated',   value: formatDate(detail.wallet.updated_on) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-2 border-b"
                style={{ borderColor: '#F0F0F0' }}
              >
                <span className="text-sm font-semibold opacity-60" style={{ color: '#003000' }}>
                  {label}
                </span>
                <span
                  className="text-sm font-medium text-right max-w-xs break-all"
                  style={{
                    color: label === 'Balance'
                      ? '#2E7D32'
                      : label === 'Status'
                        ? (detail.is_active !== false ? '#2E7D32' : '#9E9E9E')
                        : '#003000',
                    fontFamily: label === 'UID' || label === 'Membership ID' ? 'monospace' : 'inherit',
                  }}
                >
                  {value || '—'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const ManageMember = () => {
  const { getAccessToken } = useAuth();
  const token = getAccessToken();

  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null); // controls modal

// Replace your getUsers function with this:
const getUsers = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/get-users`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    const data = await response.json();
    const list = Array.isArray(data) ? data : (data.results ?? []);

    // Fetch detail for every user in parallel
    const detailedUsers = await Promise.all(
      list.map(async (u) => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/get-users/${u.id}/`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!res.ok) return u; // fall back to base user if detail fails
          const detail = await res.json();
          return {
            ...u,
            wallet_created_on: detail.wallet?.created_on ?? null,
            balance: detail.wallet?.balance
          };
        } catch {
          return u; // fall back gracefully
        }
      })
    );

    setUsers(detailedUsers);
  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => { getUsers(); 
  }, []);
  console.log(users);


  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.full_name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      u.username?.toLowerCase().includes(term) ||
      u.membership_id?.toLowerCase().includes(term)
    );
  });


  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      year: 'numeric', month: 'short', day: '2-digit',
    });
  };

  const handleExport = () => {
    const headers = ['Full Name', 'Email', 'Username', 'Membership ID', 'UID', 'Role', 'Status', 'Balance', 'Created On', 'Updated On'];
    const rows = users.map((u) => [
      u.full_name      ?? '',
      u.email          ?? '',
      u.username       ?? '',
      u.membership_id  ?? '',
      u.uid            ?? '',
      u.is_admin ? 'Admin' : 'Member',
      u.is_active !== false ? 'Active' : 'Inactive',
      Number(u.balance).toLocaleString() ?? '0.00',
      formatDate(u.created_on),
      formatDate(u.updated_on),
    ]);
    const csv  = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = 'members.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF6EC' }}>

      {/* Detail Modal */}
      {selectedUserId && (
        <UserDetailModal
          userId={selectedUserId}
          token={token}
          onClose={() => setSelectedUserId(null)}
        />
      )}

      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#003000' }}>
            Manage Members
          </h1>
          <p style={{ color: '#003000' }} className="opacity-80">
            View and manage all cooperative members
          </p>
        </div>
        {/* Search */}
        <div className="rounded-lg shadow-lg mb-8 p-6" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#003000' }}>Search</label>
              <input
                type="text"
                placeholder="Search by name, email, username or membership ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{ borderColor: '#E0E0E0', backgroundColor: '#FDF6EC', color: '#003000' }}
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div
              className="inline-block w-8 h-8 border-4 rounded-full animate-spin"
              style={{ borderColor: '#003000', borderTopColor: 'transparent' }}
            />
            <p className="mt-4" style={{ color: '#003000' }}>Loading members…</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-lg p-6 text-center mb-8"
            style={{ backgroundColor: '#FFF3E0', border: '1px solid #F57C00' }}>
            <p className="font-semibold" style={{ color: '#E65100' }}>Failed to load members</p>
            <p className="text-sm mt-1"  style={{ color: '#BF360C' }}>{error}</p>
            <button
              onClick={getUsers}
              className="mt-4 px-4 py-2 rounded font-semibold text-sm"
              style={{ backgroundColor: '#F57C00', color: '#FFFFFF' }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <>
            <div className="rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: '#003000' }}>
                    <tr>
                      {['Full Name','Email','Username','Membership ID','Balance','Role','Status','Joined','Actions'].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                          style={{ color: '#FDF6EC' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: '#E0E0E0' }}>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:opacity-90 transition-opacity" style={{ backgroundColor: '#FFFFFF' }}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                              style={{ backgroundColor: u.is_admin ? '#2E7D32' : '#F57C00' }}
                            >
                              {u.full_name?.charAt(0)?.toUpperCase() ?? '?'}
                            </div>
                            <div className="text-sm font-medium" style={{ color: '#003000' }}>{u.full_name || '—'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm" style={{ color: '#003000' }}>{u.email || '—'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm" style={{ color: '#003000' }}>@{u.username || '—'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-mono" style={{ color: '#003000' }}>{u.membership_id || '—'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold" style={{ color: '#2E7D32' }}>
                            ₦{Number(u.balance).toLocaleString() ?? '0.00'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className="px-2 py-1 text-xs rounded-full font-semibold"
                            style={{ backgroundColor: u.is_admin ? '#2E7D32' : '#F57C00', color: '#FFFFFF' }}
                          >
                            {u.is_admin ? 'Admin' : 'Member'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className="px-2 py-1 text-xs rounded-full font-semibold"
                            style={{ backgroundColor: u.is_active !== false ? '#2E7D32' : '#9E9E9E', color: '#FFFFFF' }}
                          >
                            {u.is_active !== false ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm" style={{ color: '#003000' }}>{formatDate(u.wallet_created_on)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="px-3 py-1 rounded text-sm font-semibold transition-all hover:scale-105"
                            style={{ backgroundColor: '#F57C00', color: '#FFFFFF' }}
                            onClick={() => setSelectedUserId(u.id)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <p style={{ color: '#003000' }} className="opacity-70">
                    No members found matching your search
                  </p>
                </div>
              )}
            </div>

            {/* Export */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleExport}
                className="px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
                style={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Members List
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ManageMember;