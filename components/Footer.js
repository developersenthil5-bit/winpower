'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SunIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <SunIcon className="w-8 h-8 text-orange-500" />
              <h3 className="text-2xl font-bold">Winpower</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Leading provider of sustainable solar energy solutions for a better tomorrow.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 text-orange-500">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Home
              </Link>
              <Link href="/business" className="text-gray-400 hover:text-orange-500 transition-colors text-sm block">
                Business Portfolio
              </Link>
              <Link href="/owner" className="text-gray-400 hover:text-orange-500 transition-colors text-sm block">
                Owner Profile
              </Link>
              <Link href="/quotation" className="text-gray-400 hover:text-orange-500 transition-colors text-sm block">
                Get Quotation
              </Link>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 text-orange-500">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-orange-500" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5 text-orange-500" />
                <a href="mailto:info@winpower.com" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                  info@winpower.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-gray-400 text-sm">
                  Solar Plaza, Green Tech Park, Mumbai, India
                </p>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 text-orange-500">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe to get the latest updates on solar solutions
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-sm transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="my-8 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
        />

        {/* Bottom */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"
        >
          <motion.p variants={itemVariants}>
            © 2024 Winpower Solar Solutions. All rights reserved.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
