import React, { useState, useEffect } from 'react'

export default function PaymentModal({ isOpen, onClose, courses }) {
  const [step, setStep] = useState(1) // 1: Check-in, 2: Checkout, 3: Pay Now
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedType, setSelectedType] = useState('')
  const [agreedToPolicy, setAgreedToPolicy] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)
  const [checkedOut, setCheckedOut] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    customAmount: 0
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate GST and SGST (9% each = 18% total) based on custom amount
  const baseAmount = parseInt(formData.customAmount) || 0
  const gstAmount = Math.round((baseAmount * 9) / 100)
  const sgstAmount = Math.round((baseAmount * 9) / 100)
  const totalAmount = baseAmount + gstAmount + sgstAmount

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setSelectedCourse(null)
      setSelectedType('')
      setAgreedToPolicy(false)
      setCheckedIn(false)
      setCheckedOut(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        customAmount: 0
      })
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleCourseSelect = (course, type) => {
    setSelectedCourse(course)
    setSelectedType(type)
    const amount = type === 'training' 
      ? parseInt(course.price.replace(/[^0-9]/g, ''))
      : parseInt(course.internshipPrice.replace(/[^0-9]/g, ''))
    setFormData(prev => ({
      ...prev,
      customAmount: amount
    }))
  }

  const handleCheckIn = () => {
    if (!agreedToPolicy || !selectedCourse) {
      alert('Please agree to the policy and select a course')
      return
    }
    setCheckedIn(true)
    setStep(2)
  }

  const handleCheckOut = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all your details')
      return
    }
    setCheckedOut(true)
    setStep(3)
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

    // Get course title from selected course
    const courseTitle = selectedCourse?.title || 'Course Enrollment'
    const courseType = selectedType

    setIsProcessing(true)

    try {
      // Create order on backend
      const API_URL = import.meta.env.VITE_API_URL || 'https://infyron-project.onrender.com'
      const response = await fetch(`${API_URL}/api/payment/create-order`, {
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
        let errorMessage = 'Failed to create payment order'
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // Response is not JSON, possibly HTML error page
          errorMessage = `Server error (${response.status}). Please try again or contact support.`
        }
        throw new Error(errorMessage)
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
        config_id: 'config_RrPE0PuNDBGRYw', // Custom payment configuration
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          course: courseTitle,
          type: courseType,
          student_name: formData.name
        },
        handler: async function (response) {
          // Payment successful
          try {
            const API_URL = import.meta.env.VITE_API_URL || 'https://infyron-project.onrender.com'
            const verifyResponse = await fetch(`${API_URL}/api/payment/verify`, {
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
                customerPhone: formData.phone,
                acknowledgments: [
                  'Payment is non-refundable',
                  'Course access will be provided within 24 hours',
                  'Advised to consult with advisor before amount modification',
                  'GST & SGST (18% total) included in total amount',
                  'Receipt will be sent via email'
                ]
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
                customAmount: 0
              })
              setStep(1)
              setSelectedCourse(null)
              setSelectedType('')
              setAgreedToPolicy(false)
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
          color: '#6366F1',
          hide_topbar: false
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false)
          },
          escape: true,
          backdropclose: false
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full my-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 1 ? '🔐 Check-In: Select Course' : step === 2 ? '📝 Checkout: Enter Details' : '💳 Pay Now'}
            </h2>
            <p className="text-gray-600 text-sm">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Step 1: Check-In - Policy Agreement & Course Selection */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Non-Refundable Policy */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center">
                <span className="text-2xl mr-2">⚠️</span>
                Important: Non-Refundable Policy
              </h3>
              <div className="text-sm text-red-800 space-y-2 mb-4">
                <p>• <strong>All payments are non-refundable</strong> once the course has started.</p>
                <p>• By proceeding, you acknowledge and agree to this policy.</p>
                <p>• Please ensure you have selected the correct course before payment.</p>
                <p>• For any queries, contact us at: <strong>+91 8637271743</strong></p>
              </div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm font-semibold text-red-900">
                  I understand and agree to the non-refundable policy
                </span>
              </label>
            </div>

            {/* Course Selection */}
            {agreedToPolicy && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Select Your Course</h3>
                <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {courses && courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition">
                      <h4 className="font-bold text-gray-900 mb-2">{course.title}</h4>
                      <p className="text-xs text-gray-600 mb-3">{course.duration}</p>
                      
                      <div className="space-y-2">
                        <button
                          onClick={() => handleCourseSelect(course, 'training')}
                          className={`w-full text-left border rounded-lg p-3 transition ${
                            selectedCourse?.id === course.id && selectedType === 'training'
                              ? 'bg-indigo-100 border-indigo-600 ring-2 ring-indigo-500'
                              : 'bg-gray-50 hover:bg-indigo-50 border-gray-300 hover:border-indigo-500'
                          }`}
                        >
                          <p className="text-xs text-gray-600">Training Only</p>
                          <p className="text-lg font-bold text-indigo-600">{course.price}</p>
                        </button>
                        
                        <button
                          onClick={() => handleCourseSelect(course, 'internship')}
                          className={`w-full text-left border rounded-lg p-3 transition ${
                            selectedCourse?.id === course.id && selectedType === 'internship'
                              ? 'bg-purple-200 border-purple-600 ring-2 ring-purple-500'
                              : 'bg-purple-50 hover:bg-purple-100 border-purple-300 hover:border-purple-500'
                          }`}
                        >
                          <p className="text-xs text-purple-700 font-semibold">🎓 With Internship</p>
                          <p className="text-lg font-bold text-purple-700">{course.internshipPrice}</p>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Check-In Button */}
            {agreedToPolicy && selectedCourse && (
              <div className="mt-6">
                <button
                  onClick={handleCheckIn}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg hover:from-green-600 hover:to-green-700 transition text-lg font-bold flex items-center justify-center gap-2"
                >
                  <span>🔐</span>
                  CHECK IN
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Checkout - Enter Details */}
        {step === 2 && selectedCourse && (
          <div>
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">✅ Checked In</p>
              <p className="text-lg font-bold text-green-900">{selectedCourse.title}</p>
              <p className="text-sm text-gray-600">
                {selectedType === 'internship' ? '🎓 With Internship Program' : '📚 Training Only'}
              </p>
            </div>

            <form className="space-y-4">
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
                <p className="text-xs text-orange-600 mt-1">
                  ⚠️ To modify amount, please consult with our advisor first: +91 8637271743
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Base Amount: ₹{baseAmount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-600">GST (9%): ₹{gstAmount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-600">SGST (9%): ₹{sgstAmount.toLocaleString('en-IN')}</p>
                <p className="text-lg font-bold text-gray-900 mt-2 pt-2 border-t border-gray-300">Total: ₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleCheckOut}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition font-bold flex items-center justify-center gap-2"
                >
                  <span>📝</span>
                  CHECKOUT
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Pay Now */}
        {step === 3 && selectedCourse && (
          <div>
            <div className="bg-green-50 border-2 border-green-600 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-700">✅ Checked In & Checked Out</p>
              <p className="text-lg font-bold text-green-900">{selectedCourse.title}</p>
              <p className="text-sm text-gray-700">{formData.name} | {formData.email} | {formData.phone}</p>
            </div>

            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Base Amount: ₹{baseAmount.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-600">GST (9%): ₹{gstAmount.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-600">SGST (9%): ₹{sgstAmount.toLocaleString('en-IN')}</p>
              <p className="text-lg font-bold text-gray-900 mt-2 pt-2 border-t border-gray-300">Total: ₹{totalAmount.toLocaleString('en-IN')}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700 mb-6">
              <p className="font-semibold mb-2">💳 Payment Methods Available:</p>
              <ul className="space-y-1 text-xs">
                <li>• Credit/Debit Cards</li>
                <li>• UPI (Google Pay, PhonePe, Paytm)</li>
                <li>• Net Banking</li>
              </ul>
            </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              ← Back to Checkout
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition font-bold text-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Processing...
                </>
              ) : (
                <>
                  <span>💳</span>
                  PAY NOW ₹{totalAmount.toLocaleString('en-IN')}
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          🔒 Secure payment powered by Razorpay
        </p>
      </div>
    )}
  </div>
</div>
)
}
