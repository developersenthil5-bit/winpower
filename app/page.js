'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon, SparklesIcon, CheckCircleIcon, SunIcon, BoltIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: <SunIcon className="w-8 h-8" />,
      title: 'Maximum Efficiency',
      description: 'High-efficiency solar panels that convert more sunlight into usable energy'
    },
    {
      icon: <BoltIcon className="w-8 h-8" />,
      title: 'Instant Power',
      description: 'Immediate energy production with seamless grid integration'
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8" />,
      title: 'Eco-Friendly',
      description: 'Zero emissions and sustainable energy for a greener planet'
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: 'Cost Savings',
      description: 'Reduce electricity bills by up to 90% with our solar solutions'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Video Banner */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/40 via-orange-400/30 to-blue-500/40 z-10" />
          {/* Video placeholder - replace with actual video */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              Harness the Power of the{' '}
              <span className="text-yellow-300 inline-block animate-pulse">Sun</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-md"
          >
            Transform your energy consumption with premium solar solutions designed for your future
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/quotation" className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition-all shadow-xl">
                Get Free Quotation
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/business" className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur text-white font-bold rounded-lg hover:bg-white/30 border-2 border-white transition-all">
                Explore Projects
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <motion.div className="w-1 h-2 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Why Choose Winpower?
            </h2>
            <p className="text-xl text-gray-600">
              Superior technology, reliable service, and measurable results
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-orange-100 transition-all"
              >
                <motion.div className="text-orange-500 mb-4 inline-block p-3 bg-orange-100 rounded-lg">
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Solar Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-8">
                The Future is{' '}
                <span className="text-orange-500">Solar</span>
              </h2>
              <ul className="space-y-4">
                {[
                  '30+ Years System Lifespan',
                  'Government Subsidies Available',
                  'Net Metering Enabled',
                  'Zero Maintenance Hassle',
                  '24/7 Customer Support'
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-white"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400" />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <SunIcon className="w-48 h-48 text-yellow-300 opacity-80" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Go Solar?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Join hundreds of satisfied customers saving thousands on energy bills
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/quotation" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl">
                Get Your Free Quote Now
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
