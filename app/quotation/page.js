'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, TrashIcon, DocumentDownloadIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

const projectTypes = [
  'Residential',
  'Commercial',
  'Industrial',
  'Agricultural',
  'Government',
  'Other'
]

const defaultItems = [
  { id: 1, name: 'Solar Panels (400W)', quantity: 1, price: 22000 },
  { id: 2, name: 'Inverter (10kW)', quantity: 1, price: 150000 },
  { id: 3, name: 'BMS System', quantity: 1, price: 45000 },
]

export default function QuotationCreator() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    projectType: 'Residential',
    rooftopArea: '',
    systemCapacity: '',
    labourCost: 0,
    otherCharges: 0,
    notes: ''
  })

  const [items, setItems] = useState(defaultItems)
  const [totals, setTotals] = useState({ subtotal: 0, gst: 0, grandTotal: 0 })
  const [submitted, setSubmitted] = useState(false)
  const [generatedQuotation, setGeneratedQuotation] = useState(null)

  const calculateTotals = (itemsList, labour, charges) => {
    const subtotal = itemsList.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    const total = subtotal + labour + charges
    const gst = (total * 0.18)
    const grandTotal = total + gst

    setTotals({
      subtotal,
      gst: parseFloat(gst.toFixed(2)),
      grandTotal: parseFloat(grandTotal.toFixed(2))
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newData = { ...formData, [name]: value }
    setFormData(newData)

    if (name === 'labourCost' || name === 'otherCharges') {
      calculateTotals(items, parseFloat(newData.labourCost) || 0, parseFloat(newData.otherCharges) || 0)
    }
  }

  const updateItem = (id, field, value) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, [field]: field === 'quantity' || field === 'price' ? (parseFloat(value) || 0) : value } : item
    )
    setItems(newItems)
    calculateTotals(newItems, formData.labourCost, formData.otherCharges)
  }

  const addItem = () => {
    const newItem = {
      id: Math.max(...items.map(i => i.id), 0) + 1,
      name: '',
      quantity: 1,
      price: 0
    }
    setItems([...items, newItem])
  }

  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)
    calculateTotals(newItems, formData.labourCost, formData.otherCharges)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.clientName || !formData.clientEmail || !formData.systemCapacity) {
      alert('Please fill in all required fields')
      return
    }

    if (items.length === 0) {
      alert('Please add at least one item')
      return
    }

    try {
      const response = await axios.post(`${API_URL}/api/quotations`, {
        ...formData,
        items,
        labourCost: parseFloat(formData.labourCost) || 0,
        otherCharges: parseFloat(formData.otherCharges) || 0
      })

      setGeneratedQuotation(response.data.data)
      setSubmitted(true)
    } catch (error) {
      alert('Failed to create quotation: ' + (error.response?.data?.error?.message || error.response?.data?.message || error.message))
    }
  }

  if (submitted && generatedQuotation) {
    return <QuotationPreview quotation={generatedQuotation} onBack={() => setSubmitted(false)} />
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Quotation <span className="text-orange-500">Creator</span>
          </h1>
          <p className="text-xl text-gray-600">
            Generate professional quotations instantly with automatic GST calculation
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-8"
        >
          {/* Client Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-orange-500 pb-4">
              Client Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="client@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-orange-500 pb-4">
              Project Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                >
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  System Capacity (kW) *
                </label>
                <input
                  type="number"
                  name="systemCapacity"
                  value={formData.systemCapacity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="e.g., 10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rooftop Area (Sq. Ft.)
                </label>
                <input
                  type="number"
                  name="rooftopArea"
                  value={formData.rooftopArea}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="e.g., 500"
                />
              </div>
            </div>
          </motion.div>

          {/* Items */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center border-b-2 border-orange-500 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Items & Services
              </h2>
              <motion.button
                type="button"
                onClick={addItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                Add Item
              </motion.button>
            </div>

            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                    placeholder="Item name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Qty
                  </label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                  </p>
                </div>
                <motion.button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Charges */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-orange-500 pb-4">
              Additional Charges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Labour Cost (₹)
                </label>
                <input
                  type="number"
                  name="labourCost"
                  value={formData.labourCost}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Other Charges (₹)
                </label>
                <input
                  type="number"
                  name="otherCharges"
                  value={formData.otherCharges}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </motion.div>

          {/* Notes */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-orange-500 pb-4">
              Additional Notes
            </h2>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
              rows="4"
              placeholder="Any additional information or terms..."
            />
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Subtotal:</span>
                <span>₹{totals.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Labour Cost:</span>
                <span>₹{(formData.labourCost || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Other Charges:</span>
                <span>₹{(formData.otherCharges || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t-2 border-orange-200 pt-3 mt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">GST (18%):</span>
                  <span className="text-orange-600 font-bold">₹{totals.gst.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="border-t-2 border-orange-400 pt-3 mt-3 bg-white rounded-lg p-4">
                <div className="flex justify-between text-2xl font-bold text-orange-600">
                  <span>Grand Total:</span>
                  <span>₹{totals.grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all"
          >
            Generate Quotation
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

function QuotationPreview({ quotation, onBack }) {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -5 }}
          className="mb-8 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          ← Back to Form
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-12 border-2 border-orange-200"
        >
          {/* Header */}
          <div className="text-center mb-12 border-b-2 border-orange-500 pb-8">
            <h1 className="text-4xl font-bold text-orange-600 mb-2">QUOTATION</h1>
            <p className="text-gray-600 text-lg">Quotation No: {quotation.quotationNumber}</p>
            <p className="text-gray-500">Valid for: {quotation.validity}</p>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-700 mb-4">BILL TO:</h3>
              <p className="font-semibold text-lg">{quotation.clientName}</p>
              <p className="text-gray-600">{quotation.clientEmail}</p>
              <p className="text-gray-600">{quotation.clientPhone}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-2">Date: {new Date(quotation.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Project Type: <span className="font-semibold">{quotation.projectType}</span></p>
              <p className="text-sm text-gray-600">System Capacity: <span className="font-semibold">{quotation.systemCapacity} kW</span></p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="text-left p-3">Description</th>
                <th className="text-center p-3">Quantity</th>
                <th className="text-right p-3">Unit Price</th>
                <th className="text-right p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {(quotation.items || []).map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">{item.name}</td>
                  <td className="text-center p-3">{item.quantity ?? 0}</td>
                  <td className="text-right p-3">₹{Number(item.price || 0).toLocaleString('en-IN')}</td>
                  <td className="text-right p-3 font-semibold">₹{((item.quantity || 0) * (item.price || 0)).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80 space-y-2">
              <div className="flex justify-between p-2">
                <span>Subtotal:</span>
                <span>₹{Number(quotation.subtotal || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-2">
                <span>Labour Cost:</span>
                <span>₹{Number(quotation.labourCost || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-2">
                <span>Other Charges:</span>
                <span>₹{Number(quotation.otherCharges || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-2 border-t-2 border-orange-200">
                <span>GST (18%):</span>
                <span className="font-semibold">₹{Number(quotation.gst || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-3 bg-orange-500 text-white font-bold text-lg rounded-lg">
                <span>Grand Total:</span>
                <span>₹{Number(quotation.grandTotal || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {quotation.notes && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-bold text-gray-900 mb-2">Notes:</h4>
              <p className="text-gray-700">{quotation.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 pt-8 border-t-2">
            <p>Thank you for your interest in Winpower Solar Solutions</p>
            <p>For questions, contact: info@winpower.com | +91 98765 43210</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mt-8 justify-center"
        >
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <DocumentDownloadIcon className="w-5 h-5" />
            Download PDF
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Create Another
          </button>
        </motion.div>
      </div>
    </div>
  )
}
