'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TrustBadges } from '@/components/TrustBadges'

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn: '',
    // Address
    street: '',
    city: '',
    state: '',
    zip: '',
    // Employment
    employmentStatus: '',
    employerName: '',
    monthlyIncome: '',
    payFrequency: '',
    nextPayDate: '',
    // Bank
    bankName: '',
    accountType: '',
    routingNumber: '',
    accountNumber: '',
    // Loan
    loanAmount: '',
    loanPurpose: '',
    // Consent
    agreeTerms: false,
    agreeCredit: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Apply', url: '/apply' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        throw new Error('Failed to submit application')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1"

  if (status === 'success') {
    return (
      <>
        <Breadcrumbs items={breadcrumbs} />
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl p-12 shadow-lg">
                <svg className="w-20 h-20 text-green-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-3xl font-display font-bold text-primary mb-4">
                  Application Submitted!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Thank you for applying with Lion Cash Advance. We will review your application and contact you within 15-30 minutes.
                </p>
                <p className="text-gray-600 mb-8">
                  If you have any questions, call us at <a href="tel:1-800-555-CASH" className="text-primary font-semibold">1-800-555-CASH</a>
                </p>
                <Link href="/" className="btn-primary">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="gradient-primary hero-pattern relative py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Apply for Cash Advance
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Complete this quick application to get approved in as little as 15 minutes
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 bg-background">
        <div className="container mx-auto px-4">
          <TrustBadges variant="compact" />
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[
                { num: 1, label: 'Personal Info' },
                { num: 2, label: 'Employment' },
                { num: 3, label: 'Bank Details' },
                { num: 4, label: 'Review' },
              ].map((s, index) => (
                <div key={s.num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s.num ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s.num}
                  </div>
                  <span className={`hidden sm:block ml-2 text-sm ${step >= s.num ? 'text-primary font-medium' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                  {index < 3 && (
                    <div className={`w-8 md:w-16 h-1 mx-2 ${step > s.num ? 'bg-primary' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-primary mb-6">Personal Information</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className={labelClasses}>First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClasses}>Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className={labelClasses}>Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClasses}>Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className={inputClasses}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dateOfBirth" className={labelClasses}>Date of Birth *</label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="ssn" className={labelClasses}>Last 4 of SSN *</label>
                      <input
                        type="text"
                        id="ssn"
                        required
                        maxLength={4}
                        value={formData.ssn}
                        onChange={(e) => updateFormData('ssn', e.target.value.replace(/\D/g, ''))}
                        className={inputClasses}
                        placeholder="1234"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="street" className={labelClasses}>Street Address *</label>
                    <input
                      type="text"
                      id="street"
                      required
                      value={formData.street}
                      onChange={(e) => updateFormData('street', e.target.value)}
                      className={inputClasses}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className={labelClasses}>City *</label>
                      <input
                        type="text"
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => updateFormData('city', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className={labelClasses}>State *</label>
                      <select
                        id="state"
                        required
                        value={formData.state}
                        onChange={(e) => updateFormData('state', e.target.value)}
                        className={inputClasses}
                      >
                        <option value="">Select State</option>
                        <option value="FL">Florida</option>
                        <option value="CA">California</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="zip" className={labelClasses}>ZIP Code *</label>
                      <input
                        type="text"
                        id="zip"
                        required
                        maxLength={5}
                        value={formData.zip}
                        onChange={(e) => updateFormData('zip', e.target.value.replace(/\D/g, ''))}
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Employment */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-primary mb-6">Employment Information</h2>

                  <div>
                    <label htmlFor="employmentStatus" className={labelClasses}>Employment Status *</label>
                    <select
                      id="employmentStatus"
                      required
                      value={formData.employmentStatus}
                      onChange={(e) => updateFormData('employmentStatus', e.target.value)}
                      className={inputClasses}
                    >
                      <option value="">Select Status</option>
                      <option value="employed">Employed Full-Time</option>
                      <option value="part-time">Employed Part-Time</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="benefits">Receiving Benefits</option>
                      <option value="retired">Retired</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="employerName" className={labelClasses}>Employer Name</label>
                    <input
                      type="text"
                      id="employerName"
                      value={formData.employerName}
                      onChange={(e) => updateFormData('employerName', e.target.value)}
                      className={inputClasses}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="monthlyIncome" className={labelClasses}>Monthly Income *</label>
                      <input
                        type="number"
                        id="monthlyIncome"
                        required
                        value={formData.monthlyIncome}
                        onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
                        className={inputClasses}
                        placeholder="3000"
                      />
                    </div>
                    <div>
                      <label htmlFor="payFrequency" className={labelClasses}>Pay Frequency *</label>
                      <select
                        id="payFrequency"
                        required
                        value={formData.payFrequency}
                        onChange={(e) => updateFormData('payFrequency', e.target.value)}
                        className={inputClasses}
                      >
                        <option value="">Select Frequency</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-Weekly</option>
                        <option value="semimonthly">Semi-Monthly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="nextPayDate" className={labelClasses}>Next Pay Date *</label>
                    <input
                      type="date"
                      id="nextPayDate"
                      required
                      value={formData.nextPayDate}
                      onChange={(e) => updateFormData('nextPayDate', e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Bank Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-primary mb-6">Bank Information</h2>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800 text-sm">
                      <strong>Secure:</strong> Your bank information is encrypted and protected. We use it only to deposit your loan funds.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="bankName" className={labelClasses}>Bank Name *</label>
                    <input
                      type="text"
                      id="bankName"
                      required
                      value={formData.bankName}
                      onChange={(e) => updateFormData('bankName', e.target.value)}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="accountType" className={labelClasses}>Account Type *</label>
                    <select
                      id="accountType"
                      required
                      value={formData.accountType}
                      onChange={(e) => updateFormData('accountType', e.target.value)}
                      className={inputClasses}
                    >
                      <option value="">Select Type</option>
                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="routingNumber" className={labelClasses}>Routing Number *</label>
                      <input
                        type="text"
                        id="routingNumber"
                        required
                        maxLength={9}
                        value={formData.routingNumber}
                        onChange={(e) => updateFormData('routingNumber', e.target.value.replace(/\D/g, ''))}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="accountNumber" className={labelClasses}>Account Number *</label>
                      <input
                        type="text"
                        id="accountNumber"
                        required
                        value={formData.accountNumber}
                        onChange={(e) => updateFormData('accountNumber', e.target.value.replace(/\D/g, ''))}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="loanAmount" className={labelClasses}>Requested Amount *</label>
                      <select
                        id="loanAmount"
                        required
                        value={formData.loanAmount}
                        onChange={(e) => updateFormData('loanAmount', e.target.value)}
                        className={inputClasses}
                      >
                        <option value="">Select Amount</option>
                        <option value="100">$100</option>
                        <option value="200">$200</option>
                        <option value="300">$300</option>
                        <option value="400">$400</option>
                        <option value="500">$500</option>
                        <option value="750">$750</option>
                        <option value="1000">$1,000</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="loanPurpose" className={labelClasses}>Loan Purpose</label>
                      <select
                        id="loanPurpose"
                        value={formData.loanPurpose}
                        onChange={(e) => updateFormData('loanPurpose', e.target.value)}
                        className={inputClasses}
                      >
                        <option value="">Select Purpose</option>
                        <option value="emergency">Emergency Expense</option>
                        <option value="car">Car Repair</option>
                        <option value="medical">Medical Bill</option>
                        <option value="rent">Rent/Housing</option>
                        <option value="utility">Utility Bill</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-primary mb-6">Review & Submit</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                      <p className="text-gray-700">{formData.firstName} {formData.lastName}</p>
                      <p className="text-gray-600 text-sm">{formData.email}</p>
                      <p className="text-gray-600 text-sm">{formData.phone}</p>
                      <p className="text-gray-600 text-sm">{formData.street}, {formData.city}, {formData.state} {formData.zip}</p>
                    </div>

                    <div className="bg-background rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Employment & Income</h3>
                      <p className="text-gray-700">{formData.employmentStatus}</p>
                      <p className="text-gray-600 text-sm">{formData.employerName || 'N/A'}</p>
                      <p className="text-gray-600 text-sm">${formData.monthlyIncome}/month ({formData.payFrequency})</p>
                    </div>

                    <div className="bg-background rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Bank Information</h3>
                      <p className="text-gray-700">{formData.bankName}</p>
                      <p className="text-gray-600 text-sm">{formData.accountType} account</p>
                    </div>

                    <div className="bg-background rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Loan Request</h3>
                      <p className="text-2xl font-bold text-primary">${formData.loanAmount}</p>
                      <p className="text-gray-600 text-sm">{formData.loanPurpose || 'General purpose'}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeTerms}
                        onChange={(e) => updateFormData('agreeTerms', e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>. I understand that this is an application for a loan and that submitting this form does not guarantee approval. *
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeCredit}
                        onChange={(e) => updateFormData('agreeCredit', e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        I authorize Lion Cash Advance to verify my employment and income information and to contact me regarding my application via phone, email, or text message. *
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
