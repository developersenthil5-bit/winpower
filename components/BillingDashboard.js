'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpIcon, ArrowDownIcon, PlusIcon, TrashIcon, CheckCircleIcon, ClockIcon, LogOutIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export default function BillingDashboard({ token, onLogout }) {
  const [summary, setSummary] = useState(null)
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newRecord, setNewRecord] = useState({
    clientName: '',
    projectName: '',
    amount: '',
    description: '',
    status: 'pending'
  })

  useEffect(() => {
    fetchData()
  }, [token])

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const [summaryRes, recordsRes] = await Promise.all([
        axios.get(`${API_URL}/api/invoices`, { headers }),
        axios.get(`${API_URL}/api/invoices`, { headers })
      ])

      const records = recordsRes.data.data || []
      const paidAmount = records.filter(record => record.status === 'paid').reduce((sum, record) => sum + Number(record.amount || 0), 0)
      const pendingAmount = records.filter(record => record.status === 'pending').reduce((sum, record) => sum + Number(record.amount || 0), 0)
      setSummary({
        totalInvoices: records.length,
        totalAmount: paidAmount + pendingAmount,
        paidAmount,
        pendingAmount
      })
      setRecords(records)
    } catch (error) {
      console.error('Failed to fetch billing data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddRecord = async (e) => {
    e.preventDefault()
    if (!newRecord.clientName || !newRecord.projectName || !newRecord.amount) {
      alert('Please fill all required fields')
      return
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/invoices`,
        newRecord,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setRecords([...records, response.data.data])
      setNewRecord({
        clientName: '',
        projectName: '',
        amount: '',
        description: '',
        status: 'pending'
      })
      setShowAddForm(false)
    } catch (error) {
      alert('Failed to add record')
    }
  }

  const handleStatusChange = async (recordId, newStatus) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/invoices/${recordId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setRecords(records.map(r => r.id === recordId ? response.data.data : r))
    } catch (error) {
      alert('Failed to update record')
    }
  }

  const handleDeleteRecord = async (recordId) => {
    if (!confirm('Are you sure you want to delete this record?')) return

    try {
      await axios.delete(
        `${API_URL}/api/invoices/${recordId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setRecords(records.filter(r => r.id !== recordId))
    } catch (error) {
      alert('Failed to delete record')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 border-4 border-orange-500 border-t-yellow-400 rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Billing Dashboard</h1>
            <p className="text-orange-100">Manage invoices and payments</p>
          </div>
          <motion.button
            onClick={onLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
          >
            <LogOutIcon className="w-5 h-5" />
            Logout
          </motion.button>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {summary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[
              { label: 'Total Invoices', value: summary.totalInvoices, icon: '📊', color: 'blue' },
              { label: 'Total Amount', value: `₹${summary.totalAmount.toLocaleString('en-IN')}`, icon: '💰', color: 'green' },
              { label: 'Paid Amount', value: `₹${summary.paidAmount.toLocaleString('en-IN')}`, icon: '✅', color: 'green' },
              { label: 'Pending Amount', value: `₹${summary.pendingAmount.toLocaleString('en-IN')}`, icon: '⏳', color: 'orange' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl bg-white shadow-lg border-l-4 border-${stat.color}-500`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-8 border-b-2 border-gray-200"
        >
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'records', label: 'All Records', icon: '📋' }
          ].map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === tab.id
                  ? 'text-orange-600 border-b-4 border-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon} {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Dashboard Tab */}
        <AnimatePresence>
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Recent Invoices */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Invoices</h2>
                  <motion.button
                    onClick={() => setShowAddForm(!showAddForm)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                    Add Invoice
                  </motion.button>
                </div>

                {showAddForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    onSubmit={handleAddRecord}
                    className="mb-8 p-6 bg-gray-50 rounded-lg space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={newRecord.clientName}
                        onChange={(e) => setNewRecord({ ...newRecord, clientName: e.target.value })}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={newRecord.projectName}
                        onChange={(e) => setNewRecord({ ...newRecord, projectName: e.target.value })}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        value={newRecord.amount}
                        onChange={(e) => setNewRecord({ ...newRecord, amount: e.target.value })}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                        required
                      />
                      <select
                        value={newRecord.status}
                        onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="Description"
                      value={newRecord.description}
                      onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      rows="2"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Add Invoice
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.form>
                )}

                <div className="space-y-4">
                  {records.slice(0, 5).map((record, idx) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{record.clientName}</p>
                        <p className="text-sm text-gray-600">{record.projectName}</p>
                      </div>
                      <div className="text-right mr-8">
                        <p className="font-bold text-lg text-orange-600">₹{record.amount.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        {record.status === 'paid' ? (
                          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            <CheckCircleIcon className="w-4 h-4" /> Paid
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                            <ClockIcon className="w-4 h-4" /> Pending
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Records Tab */}
        <AnimatePresence>
          {activeTab === 'records' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Client Name</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Project</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-900">Amount</th>
                      <th className="text-center py-3 px-4 font-bold text-gray-900">Status</th>
                      <th className="text-center py-3 px-4 font-bold text-gray-900">Date</th>
                      <th className="text-center py-3 px-4 font-bold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, idx) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-gray-900 font-semibold">{record.clientName}</td>
                        <td className="py-3 px-4 text-gray-600">{record.projectName}</td>
                        <td className="py-3 px-4 text-right font-bold text-orange-600">₹{record.amount.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-4 text-center">
                          <select
                            value={record.status}
                            onChange={(e) => handleStatusChange(record.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold border-0 cursor-pointer ${
                              record.status === 'paid'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-center text-gray-600">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-center">
                          <motion.button
                            onClick={() => handleDeleteRecord(record.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
