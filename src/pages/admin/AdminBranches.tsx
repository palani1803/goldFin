import { useState, useEffect, useMemo } from 'react'
import {
  Building2, Plus, Edit3, Trash2, X, Check, AlertCircle,
  RefreshCw, MapPin, Phone, Clock, User, Mail, Loader2,
  ToggleLeft, ToggleRight, ExternalLink, Search, Sparkles,
  CheckCircle2, Shield
} from 'lucide-react'

interface Branch {
  _id: string
  name: string
  address: string
  city: string
  state: string
  phone: string
  email: string
  managerName: string
  operatingHours: string
  mapUrl: string
  isActive: boolean
  createdAt: string
}

const emptyBranch = {
  name: '',
  address: '',
  city: '',
  state: 'Tamil Nadu',
  phone: '',
  email: '',
  managerName: '',
  operatingHours: 'Mon–Sat: 9:00 AM – 6:30 PM',
  mapUrl: '',
  isActive: true,
}

export default function AdminBranches() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null)
  const [formData, setFormData] = useState(emptyBranch)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const token = localStorage.getItem('adminToken') || ''

  const fetchBranches = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/branches')
      const data = await res.json()
      setBranches(data.data || [])
    } catch {
      setErrorMsg('Failed to fetch branches from server')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBranches()
  }, [])

  const handleSeedBranches = async () => {
    setSeeding(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/branches/seed?force=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to seed branches')

      setSuccessMsg('Successfully loaded all 5 official GoldFin branches!')
      setTimeout(() => setSuccessMsg(''), 4000)
      fetchBranches()
    } catch (err: any) {
      setErrorMsg(err.message)
    } finally {
      setSeeding(false)
    }
  }

  const openAddModal = () => {
    setEditingBranch(null)
    setFormData(emptyBranch)
    setModalOpen(true)
    setErrorMsg('')
  }

  const openEditModal = (branch: Branch) => {
    setEditingBranch(branch)
    setFormData({
      name: branch.name,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      phone: branch.phone,
      email: branch.email,
      managerName: branch.managerName,
      operatingHours: branch.operatingHours,
      mapUrl: branch.mapUrl,
      isActive: branch.isActive,
    })
    setModalOpen(true)
    setErrorMsg('')
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingBranch(null)
    setFormData(emptyBranch)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrorMsg('')

    try {
      const url = editingBranch ? `/api/branches/${editingBranch._id}` : '/api/branches'
      const method = editingBranch ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to save branch')
      }

      setSuccessMsg(editingBranch ? 'Branch updated successfully!' : 'Branch created successfully!')
      setTimeout(() => setSuccessMsg(''), 3000)
      closeModal()
      fetchBranches()
    } catch (err: any) {
      setErrorMsg(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/branches/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete branch')
      }

      setSuccessMsg('Branch deleted successfully!')
      setTimeout(() => setSuccessMsg(''), 3000)
      setDeleteConfirm(null)
      fetchBranches()
    } catch (err: any) {
      setErrorMsg(err.message)
      setDeleteConfirm(null)
    }
  }

  const handleToggleActive = async (branch: Branch) => {
    try {
      const res = await fetch(`/api/branches/${branch._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !branch.isActive }),
      })

      if (!res.ok) throw new Error('Failed to update status')

      setBranches((prev) =>
        prev.map((b) =>
          b._id === branch._id ? { ...b, isActive: !b.isActive } : b
        )
      )
    } catch (err: any) {
      setErrorMsg(err.message)
    }
  }

  // Filter and search
  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const matchesSearch =
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (branch.managerName && branch.managerName.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && branch.isActive) ||
        (filterStatus === 'inactive' && !branch.isActive)

      return matchesSearch && matchesStatus
    })
  }, [branches, searchQuery, filterStatus])

  const totalActive = branches.filter((b) => b.isActive).length
  const uniqueCities = Array.from(new Set(branches.map((b) => b.city))).length

  const inputStyle = {
    background: 'rgba(15, 23, 42, 0.7)',
    border: '1.5px solid rgba(255, 255, 255, 0.08)',
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <RefreshCw size={28} className="text-orange-400 animate-spin" />
        <span className="text-sm font-medium text-slate-400">Loading branch records...</span>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wider mb-1.5">
            <Shield size={12} />
            <span>REGIONAL BRANCH NETWORK</span>
          </div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
            <Building2 size={26} className="text-orange-500" />
            Branch Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your store branch locations, managers, desk phone numbers, and working hours.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchBranches}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 border-0 cursor-pointer transition-all hover:text-white hover:bg-slate-800"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <RefreshCw size={14} />
            Refresh
          </button>

          {branches.length < 5 && (
            <button
              onClick={handleSeedBranches}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-300 border-0 cursor-pointer transition-all hover:bg-amber-500/20"
              style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
              }}
              title="Load all 5 official GoldFin branches"
            >
              <Sparkles size={14} className={seeding ? 'animate-spin' : ''} />
              {seeding ? 'Loading...' : 'Load 5 Official Branches'}
            </button>
          )}

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white border-0 cursor-pointer transition-all hover:brightness-110"
            style={{
              background: 'linear-gradient(135deg, #FF6B00 0%, #EA580C 100%)',
              boxShadow: '0 4px 15px rgba(249,115,22,0.35)',
            }}
          >
            <Plus size={16} />
            Add New Branch
          </button>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Branches</span>
            <span className="text-2xl font-black text-white mt-1">{branches.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
            <Building2 size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Locations</span>
            <span className="text-2xl font-black text-emerald-400 mt-1">{totalActive}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cities Covered</span>
            <span className="text-2xl font-black text-blue-400 mt-1">{uniqueCities}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <MapPin size={20} />
          </div>
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.2)',
            color: '#6EE7B7',
          }}
        >
          <Check size={18} />
          {successMsg}
        </div>
      )}
      {errorMsg && !modalOpen && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#FCA5A5',
          }}
        >
          <AlertCircle size={18} />
          {errorMsg}
          <button
            onClick={() => setErrorMsg('')}
            className="ml-auto text-red-400/60 hover:text-red-400 bg-transparent border-0 cursor-pointer p-0"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search branches, city, phone..."
            className="w-full h-9 pl-9 pr-4 rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none"
            style={inputStyle}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white bg-transparent border-0 cursor-pointer p-0"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['all', 'active', 'inactive'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all border-0 cursor-pointer ${
                filterStatus === st
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredBranches.length === 0 && (
        <div
          className="rounded-2xl p-12 text-center"
          style={{
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Building2 size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-bold text-white mb-2">No branches match your search</p>
          <p className="text-sm text-slate-400 mb-6">
            {branches.length === 0
              ? 'Click below to load the 5 official GoldFin regional branches.'
              : 'Try clearing your search query or status filter.'}
          </p>
          {branches.length === 0 ? (
            <button
              onClick={handleSeedBranches}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white border-0 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FF6B00 0%, #EA580C 100%)',
                boxShadow: '0 4px 15px rgba(249,115,22,0.3)',
              }}
            >
              <Sparkles size={18} />
              Load 5 Official Branches
            </button>
          ) : (
            <button
              onClick={() => {
                setSearchQuery('')
                setFilterStatus('all')
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 cursor-pointer hover:text-white"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Branches List */}
      <div className="space-y-3.5">
        {filteredBranches.map((branch) => (
          <div
            key={branch._id}
            className="rounded-2xl p-5 transition-all duration-200"
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(255,255,255,0.07)',
              opacity: branch.isActive ? 1 : 0.65,
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Branch Details */}
              <div className="flex-1 min-w-0 flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-orange-500/15 border border-orange-500/30 text-orange-400">
                    {branch.city}
                  </span>
                  <h3 className="text-base font-bold text-white truncate">{branch.name}</h3>
                  <span
                    className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                    style={
                      branch.isActive
                        ? { background: 'rgba(16,185,129,0.15)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' }
                        : { background: 'rgba(239,68,68,0.15)', color: '#F87171', border: '1px solid rgba(239,68,68,0.3)' }
                    }
                  >
                    {branch.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 text-xs">
                  <div className="flex items-start gap-2 text-slate-300 sm:col-span-2 lg:col-span-1">
                    <MapPin size={14} className="shrink-0 text-orange-400 mt-0.5" />
                    <span className="leading-relaxed">{branch.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone size={14} className="shrink-0 text-orange-400" />
                    <a
                      href={`tel:${branch.phone}`}
                      className="font-bold text-white hover:text-orange-400 transition-colors no-underline"
                    >
                      {branch.phone}
                    </a>
                  </div>

                  {branch.managerName && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <User size={14} className="shrink-0 text-orange-400" />
                      <span>{branch.managerName}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock size={14} className="shrink-0 text-orange-400" />
                    <span>{branch.operatingHours}</span>
                  </div>

                  {branch.email && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail size={14} className="shrink-0 text-orange-400" />
                      <span className="truncate">{branch.email}</span>
                    </div>
                  )}

                  {branch.mapUrl && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <ExternalLink size={14} className="shrink-0 text-orange-400" />
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:underline text-xs font-semibold"
                      >
                        View Google Map
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Strip */}
              <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                <button
                  onClick={() => handleToggleActive(branch)}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 cursor-pointer transition-colors"
                  title={branch.isActive ? 'Deactivate Branch' : 'Activate Branch'}
                  style={{ color: branch.isActive ? '#34D399' : '#94A3B8' }}
                >
                  {branch.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                </button>
                <button
                  onClick={() => openEditModal(branch)}
                  className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/80 hover:bg-blue-600/20 border border-slate-700 cursor-pointer transition-colors"
                  title="Edit Branch Details"
                >
                  <Edit3 size={16} />
                </button>
                {deleteConfirm === branch._id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(branch._id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white border-0 cursor-pointer"
                      style={{ background: '#EF4444' }}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 border-0 cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(branch._id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 bg-slate-800/80 hover:bg-red-500/20 border border-slate-700 cursor-pointer transition-colors"
                    title="Delete Branch"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div
            className="relative z-10 w-full max-w-[580px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-7"
            style={{
              background: '#1E293B',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">
                    {editingBranch ? 'Edit Branch Location' : 'Add New Branch Location'}
                  </h2>
                  <p className="text-xs text-slate-400">Enter branch details, contacts and operational timings</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800 border-0 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {errorMsg && modalOpen && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm mb-4"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: '#FCA5A5',
                }}
              >
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Branch Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Branch Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sivakasi Main Branch & Vault"
                  required
                  className="w-full h-11 px-4 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none"
                  style={inputStyle}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Address <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="No. 42/B, Kamarajar Road, Near Old Bus Stand"
                  required
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none resize-none"
                  style={inputStyle}
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    City / Town <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Sivakasi"
                    required
                    className="w-full h-11 px-4 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Tamil Nadu"
                    className="w-full h-11 px-4 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Phone Line <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 90925 48347"
                    required
                    className="w-full h-11 px-4 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Branch Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sivakasi@goldfin.in"
                    className="w-full h-11 px-4 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Manager & Hours */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Branch Head / Manager
                  </label>
                  <input
                    type="text"
                    value={formData.managerName}
                    onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                    placeholder="R. Senthil Kumar (Branch Head)"
                    className="w-full h-11 px-4 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={formData.operatingHours}
                    onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                    placeholder="Mon–Sat: 9:00 AM – 6:30 PM"
                    className="w-full h-11 px-4 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Map URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Google Maps Link
                </label>
                <input
                  type="url"
                  value={formData.mapUrl}
                  onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                  placeholder="https://maps.google.com/..."
                  className="w-full h-11 px-4 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none"
                  style={inputStyle}
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Active Status</p>
                  <p className="text-[11px] text-slate-500">Active branches are visible on public pages</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className="bg-transparent border-0 cursor-pointer p-0"
                  style={{ color: formData.isActive ? '#34D399' : '#94A3B8' }}
                >
                  {formData.isActive ? <ToggleRight size={30} /> : <ToggleLeft size={30} />}
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-white border-0 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B00 0%, #EA580C 100%)',
                    boxShadow: '0 4px 15px rgba(249,115,22,0.3)',
                    opacity: saving ? 0.6 : 1,
                  }}
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      {editingBranch ? 'Update Branch' : 'Create Branch'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-11 px-6 rounded-xl text-sm font-semibold text-slate-400 border-0 cursor-pointer hover:text-white"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
