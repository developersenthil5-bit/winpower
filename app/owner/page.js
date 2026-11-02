'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeIcon, PhoneIcon, LinkedInIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export default function OwnerPortfolio() {
  const [owner, setOwner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchOwner()
  }, [])

  const fetchOwner = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/portfolio/owner`)
      setOwner(response.data.data)
    } catch (err) {
      setError('Failed to load owner profile')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 border-4 border-orange-500 border-t-yellow-400 rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="flex items-center gap-3 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-600 flex-shrink-0" />
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      </div>
    )
  }

  if (!owner) return null

  return (
    <div>
      {/* Hero Profile Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Profile Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto w-40 h-40 mb-8 rounded-full overflow-hidden border-4 border-orange-500 shadow-2xl"
            >
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full opacity-20" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold text-gray-900 mb-2"
            >
              {owner.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-orange-600 font-semibold mb-6"
            >
              {owner.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              {owner.bio}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4 flex-wrap"
            >
              <motion.a
                href={`tel:${owner.contact.phone}`}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <PhoneIcon className="w-5 h-5" />
                {owner.contact.phone}
              </motion.a>
              <motion.a
                href={`mailto:${owner.contact.email}`}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <EnvelopeIcon className="w-5 h-5" />
                Email
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 text-gray-900"
          >
            Areas of <span className="text-orange-500">Expertise</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {owner.expertise.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="p-6 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500"
              >
                <p className="text-lg font-semibold text-gray-900">{skill}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 text-gray-900"
          >
            Key <span className="text-orange-500">Achievements</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {owner.achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="p-6 rounded-2xl bg-white shadow-lg"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-4 text-3xl"
                >
                  ⭐
                </motion.div>
                <p className="text-gray-900 font-semibold text-center">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">
              My <span className="text-orange-500">Vision</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              I am committed to revolutionizing the solar energy industry by providing sustainable, 
              cost-effective solutions that empower businesses and households to transition to renewable energy. 
              With decades of expertise and a passion for environmental stewardship, I aim to make solar energy 
              accessible to every corner of India, creating a cleaner, greener future for generations to come.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
