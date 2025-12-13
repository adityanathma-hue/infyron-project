import React, { useState, useEffect } from 'react'

export default function PaymentModal({ isOpen, onClose, courseTitle, courseType, price }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    customAmount: parseInt(price.replace(/[^0-9]/g, ''))
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate GST and SGST (9% each = 18% total) based on custom amount
  const baseAmount = parseInt(formData.customAmount) || 0
  const gstAmount = Math.round((baseAmount * 9) / 100)
  const sgstAmount = Math.round((baseAmount * 9) / 100)
  const totalAmount = baseAmount + gstAmount + sgstAmount

  // Reset custom amount when modal opens with new price
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        customAmount: parseInt(price.replace(/[^0-9]/g, ''))
      }))
    }
  }, [isOpen, price])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'customAmount' ? value : value
    })
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    
    // Validate amount
    if (!formData.customAmount || formData.customAmount < 100) {
      alert('Please enter a valid amount (minimum ₹100)')
      return
    }

    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      alert('Payment system is loading. Please try again in a moment.')
      return
    }

    setIsProcessing(true)

    try {
      // Create order on backend
      const response = await fetch('https://infyron-project.onrender.com/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: totalAmount, // Total amount including GST and SGST
          baseAmount: baseAmount,
          gstAmount: gstAmount,
          sgstAmount: sgstAmount,
          courseTitle,
          courseType,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create payment order')
      }

      const order = await response.json()

      // Initialize Razorpay payment
      const options = {
        key: order.razorpayKeyId, // Razorpay Key ID from backend
        amount: order.amount,
        currency: 'INR',
        name: 'Infyron Technologies',
        description: `${courseTitle} - ${courseType === 'internship' ? 'With Internship' : 'Training Only'}`,
        order_id: order.orderId,
        handler: async function (response) {
          // Payment successful
          try {
            const verifyResponse = await fetch('https://infyron-project.onrender.com/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                courseTitle,
                courseType,
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone
              })
            })

            if (verifyResponse.ok) {
              setIsProcessing(false)
              alert('✅ Payment Successful! Check your email for the receipt. Our team will contact you shortly.')
              // Reset form
              setFormData({
                name: '',
                email: '',
                phone: '',
                customAmount: parseInt(price.replace(/[^0-9]/g, ''))
              })
              onClose()
            } else {
              setIsProcessing(false)
              alert('Payment verification failed. Please contact us with your payment details.')
            }
          } catch (error) {
            setIsProcessing(false)
            alert('Payment verification error. Please contact us with your payment details.')
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#6366F1'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response) {
        setIsProcessing(false)
        alert('Payment failed: ' + (response.error?.description || 'Please try again'))
      })
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      setIsProcessing(false)
      
      // Show specific error message
      if (error.message.includes('Failed to fetch')) {
        alert('Unable to connect to payment server. Please check your internet connection and try again.')
      } else if (error.message.includes('create payment order')) {
        alert('Payment order creation failed. Please contact us at +91 8637271743 or try again later.')
      } else {
        alert('Error: ' + error.message + '\n\nPlease contact us if this persists: +91 8637271743')
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Proceed to Payment</h2>
            <p className="text-indigo-600 font-semibold">{courseTitle}</p>
            <p className="text-gray-600 text-sm">
              {courseType === 'internship' ? 'With Internship Program' : 'Training Only'}
            </p>
            <div className="mt-3 bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Base Amount: ₹{baseAmount.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-600">GST (9%): ₹{gstAmount.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-600">SGST (9%): ₹{sgstAmount.toLocaleString('en-IN')}</p>
              <p className="text-lg font-bold text-gray-900 mt-2 pt-2 border-t border-gray-300">Total: ₹{totalAmount.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-2.5 text-gray-500">₹</span>
              <input
                type="number"
                name="customAmount"
                value={formData.customAmount}
                onChange={handleChange}
                required
                min="100"
                step="1"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-semibold"
                placeholder="Enter amount"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Suggested: ₹{parseInt(price.replace(/[^0-9]/g, '')).toLocaleString('en-IN')} (You can modify)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="10-digit mobile number"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold mb-2">💳 Payment Methods Available:</p>
            <ul className="space-y-1 text-xs">
              <li>• Credit/Debit Cards</li>
              <li>• UPI (Google Pay, PhonePe, Paytm)</li>
              <li>• Net Banking</li>
              <li>• Wallets</li>
            </ul>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:bg-indigo-400"
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          🔒 Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  )
}
