import { useState, useEffect, useMemo } from 'react'
import {
  Building2, Plus, Edit3, Trash2, X, Check, AlertCircle,
  RefreshCw, MapPin, Phone, Clock, User, Mail, Loader2,
  ToggleLeft, ToggleRight, ExternalLink, Search, Sparkles,
  CheckCircle2, Shield
} from 'lucide-react'
import { useSiteSettings } from '../../hooks/useSiteSettings'

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
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahes Bankers'
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

  const getAuthToken = () => localStorage.getItem('adminToken') || ''

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
      const activeToken = getAuthToken()
      const res = await fetch('/api/branches/seed?force=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeToken}`,
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to seed branches')

      setSuccessMsg(`Successfully loaded all 4 official ${companyName} branches!`)
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
      const activeToken = getAuthToken()

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeToken}`,
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
      const activeToken = getAuthToken()
      const res = await fetch(`/api/branches/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${activeToken}` },
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
      const activeToken = getAuthToken()
      const res = await fetch(`/api/branches/${branch._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeToken}`,
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <RefreshCw size={28} className="text-orange-500 animate-spin" />
        <span className="text-sm font-semibold text-slate-500">Loading branch records...</span>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold tracking-wider mb-1.5 shadow-xs">
            <Shield size={12} />
            <span>REGIONAL BRANCH NETWORK</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
            <Building2 size={26} className="text-orange-600" />
            Branch Management
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your store branch locations, managers, desk phone numbers, and working hours.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchBranches}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs cursor-pointer transition-all active:scale-95"
          >
            <RefreshCw size={14} />
            Refresh
          </button>

          {branches.length < 4 && (
            <button
              onClick={handleSeedBranches}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/90 cursor-pointer transition-all shadow-xs active:scale-95"
              title={`Load all 4 official ${companyName} branches`}
            >
              <Sparkles size={14} className={seeding ? 'animate-spin' : ''} />
              {seeding ? 'Loading...' : 'Load 4 Official Branches'}
            </button>
          )}

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#FF6B00] to-[#EA580C] border-0 shadow-sm shadow-orange-500/25 cursor-pointer transition-all hover:brightness-105 active:scale-95"
          >
            <Plus size={16} />
            Add New Branch
          </button>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Branches</span>
            <span className="text-2xl font-black text-slate-900 mt-1">{branches.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center">
            <Building2 size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Locations</span>
            <span className="text-2xl font-black text-emerald-600 mt-1">{totalActive}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cities Covered</span>
            <span className="text-2xl font-black text-blue-600 mt-1">{uniqueCities}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
            <MapPin size={20} />
          </div>
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-xs">
          <Check size={18} className="text-emerald-600" />
          {successMsg}
        </div>
      )}
      {errorMsg && !modalOpen && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-rose-50 border border-rose-200 text-rose-800 shadow-xs">
          <AlertCircle size={18} className="text-rose-600" />
          {errorMsg}
          <button
            onClick={() => setErrorMsg('')}
            className="ml-auto text-rose-500 hover:text-rose-700 bg-transparent border-0 cursor-pointer p-0"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search branches, city, phone..."
            className="w-full h-9 pl-9 pr-4 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-0"
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
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all border cursor-pointer ${
                filterStatus === st
                  ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredBranches.length === 0 && (
        <div className="rounded-2xl p-12 text-center bg-white border border-slate-200 shadow-xs">
          <Building2 size={48} className="text-slate-300 mx-auto mb-4" />
          <p className="text-lg font-bold text-slate-900 mb-2">No branches match your search</p>
          <p className="text-sm text-slate-500 mb-6">
            {branches.length === 0
              ? `Click below to load the 4 official ${companyName} regional branches.`
              : 'Try clearing your search query or status filter.'}
          </p>
          {branches.length === 0 ? (
            <button
              onClick={handleSeedBranches}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#EA580C] border-0 shadow-sm shadow-orange-500/20 cursor-pointer hover:brightness-105"
            >
              <Sparkles size={18} />
              Load 4 Official Branches
            </button>
          ) : (
            <button
              onClick={() => {
                setSearchQuery('')
                setFilterStatus('all')
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 cursor-pointer hover:bg-slate-200"
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
            className={`rounded-2xl p-5 transition-all duration-200 bg-white border border-slate-200 shadow-xs hover:shadow-md ${
              branch.isActive ? 'opacity-100' : 'opacity-70 bg-slate-50'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Branch Details */}
              <div className="flex-1 min-w-0 flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-orange-50 border border-orange-200 text-orange-700">
                    {branch.city}
                  </span>
                  <h3 className="text-base font-black text-slate-900 truncate">{branch.name}</h3>
                  <span
                    className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                      branch.isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {branch.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 text-xs">
                  <div className="flex items-start gap-2 text-slate-600 sm:col-span-2 lg:col-span-1">
                    <MapPin size={14} className="shrink-0 text-orange-600 mt-0.5" />
                    <span className="leading-relaxed font-medium">{branch.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone size={14} className="shrink-0 text-orange-600" />
                    <a
                      href={`tel:${branch.phone}`}
                      className="font-bold text-slate-900 hover:text-orange-600 transition-colors no-underline"
                    >
                      {branch.phone}
                    </a>
                  </div>

                  {branch.managerName && (
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <User size={14} className="shrink-0 text-orange-600" />
                      <span>{branch.managerName}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <Clock size={14} className="shrink-0 text-orange-600" />
                    <span>{branch.operatingHours}</span>
                  </div>

                  {branch.email && (
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Mail size={14} className="shrink-0 text-orange-600" />
                      <span className="truncate">{branch.email}</span>
                    </div>
                  )}

                  {branch.mapUrl && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <ExternalLink size={14} className="shrink-0 text-orange-600" />
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline text-xs font-bold"
                      >
                        View Google Map
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Strip */}
              <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <button
                  onClick={() => handleToggleActive(branch)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer transition-colors"
                  title={branch.isActive ? 'Deactivate Branch' : 'Activate Branch'}
                  style={{ color: branch.isActive ? '#059669' : '#94A3B8' }}
                >
                  {branch.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                </button>
                <button
                  onClick={() => openEditModal(branch)}
                  className="p-2 rounded-xl text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 cursor-pointer transition-colors"
                  title="Edit Branch Details"
                >
                  <Edit3 size={16} />
                </button>
                {deleteConfirm === branch._id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(branch._id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 border-0 cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 cursor-pointer hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(branch._id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 cursor-pointer transition-colors"
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
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-[600px] max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-200 bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shadow-xs">
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    {editingBranch ? 'Edit Branch Location' : 'Add New Branch Location'}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {editingBranch ? 'Update branch address, contact details & operational hours' : 'Enter branch details, contacts and operational timings'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 cursor-pointer transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-135px)]">
              {errorMsg && modalOpen && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-rose-50 border border-rose-200 text-rose-800">
                  <AlertCircle size={16} className="shrink-0 text-rose-600" />
                  <span className="font-medium">{errorMsg}</span>
                </div>
              )}

              <form id="branch-form" onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Branch Name */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Branch Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sivakasi Main Branch & Vault"
                    required
                    className="w-full h-11 px-3.5 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
                  />
                </div>

                {/* 2. Full Address */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="No. 42/B, Kamarajar Road, Near Old Bus Stand"
                    required
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none resize-none transition-all"
                  />
                </div>

                {/* 3. City & State (Row 1) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      City / Town <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Sivakasi"
                      required
                      className="w-full h-11 px-3.5 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Tamil Nadu"
                      className="w-full h-11 px-3.5 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* 4. Phone & Email (Row 2) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Line <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 90925 48347"
                      required
                      className="w-full h-11 px-3.5 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Branch Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sivakasi@mahesbankers.com"
                      className="w-full h-11 px-3.5 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* 5. Working Hours & Google Maps Link (Row 3) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={formData.operatingHours}
                      onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                      placeholder="Mon–Sat: 9:00 AM – 6:30 PM"
                      className="w-full h-11 px-3.5 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Google Maps Link
                    </label>
                    <input
                      type="url"
                      value={formData.mapUrl}
                      onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                      placeholder="https://maps.google.com/..."
                      className="w-full h-11 px-3.5 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* 6. Active Status Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Active Status</span>
                    <span className="text-[11px] text-slate-500">
                      {formData.isActive ? 'Branch is visible to users on public pages' : 'Branch is hidden from public view'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                    className="bg-transparent border-0 cursor-pointer p-0 transition-transform active:scale-95"
                    style={{ color: formData.isActive ? '#10B981' : '#94A3B8' }}
                    title={formData.isActive ? 'Active' : 'Inactive'}
                  >
                    {formData.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>
              </form>
            </div>

            {/* Modal Footer / Sticky Actions */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={closeModal}
                className="h-11 px-5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="branch-form"
                disabled={saving}
                className="flex items-center justify-center gap-2 h-11 px-7 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#FF6B00] to-[#EA580C] border-0 cursor-pointer transition-all hover:brightness-105 shadow-sm shadow-orange-500/25 active:scale-95"
                style={{ opacity: saving ? 0.7 : 1 }}
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>{editingBranch ? 'Update Branch' : 'Add Branch'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
