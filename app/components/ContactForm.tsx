'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, AlertCircle, Phone, Mail, User } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  services: {
    tuition: boolean;
    groupTuition: boolean;
    courses: boolean;
    examMarking: boolean;
    interviewPractice: boolean;
    other: boolean;
  };
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<FormData>({ mode: 'onBlur' });

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Watch email for real-time validation
  const watchEmail = watch('email');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (watchEmail && watchEmail.length > 0) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      setEmailValid(emailRegex.test(watchEmail));
    } else {
      setEmailValid(null);
    }
  }, [watchEmail]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setShowSuccess(true);
        reset();
        // Auto-hide success message after 8 seconds
        setTimeout(() => setShowSuccess(false), 8000);
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        console.error('Form submission error:', errorData);
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('firstName', { 
                required: 'First name is required',
                minLength: { value: 2, message: 'First name must be at least 2 characters' },
                pattern: { value: /^[A-Za-z\s]+$/, message: 'First name can only contain letters' }
              })}
              type="text"
              id="firstName"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 ${
                errors.firstName 
                  ? 'border-red-300 focus:ring-red-500' 
                  : touchedFields.firstName 
                    ? 'border-green-300 focus:ring-green-500' 
                    : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {touchedFields.firstName && !errors.firstName && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
          {errors.firstName && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.firstName.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('lastName', { 
                required: 'Last name is required',
                minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                pattern: { value: /^[A-Za-z\s]+$/, message: 'Last name can only contain letters' }
              })}
              type="text"
              id="lastName"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 ${
                errors.lastName 
                  ? 'border-red-300 focus:ring-red-500' 
                  : touchedFields.lastName 
                    ? 'border-green-300 focus:ring-green-500' 
                    : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {touchedFields.lastName && !errors.lastName && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
          {errors.lastName && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.lastName.message}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              type="email"
              id="email"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 ${
                errors.email 
                  ? 'border-red-300 focus:ring-red-500' 
                  : emailValid === true
                    ? 'border-green-300 focus:ring-green-500' 
                    : emailValid === false && watchEmail
                      ? 'border-yellow-300 focus:ring-yellow-500'
                      : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {emailValid === true && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}
            {emailValid === false && watchEmail && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
            )}
          </div>
          {errors.email && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email.message}
            </div>
          )}
          {emailValid === false && watchEmail && !errors.email && (
            <div className="mt-1 flex items-center text-sm text-yellow-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              Please check your email format
            </div>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-gray-400">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('phone', {
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: 'Please enter a valid phone number'
                }
              })}
              type="tel"
              id="phone"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 ${
                errors.phone 
                  ? 'border-red-300 focus:ring-red-500' 
                  : touchedFields.phone 
                    ? 'border-green-300 focus:ring-green-500' 
                    : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                e.target.value = formatted;
              }}
            />
            {touchedFields.phone && !errors.phone && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
          {errors.phone && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.phone.message}
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message*
        </label>
        <div className="relative">
          <textarea
            {...register('message', { 
              required: 'Please tell us how we can help you',
              minLength: { value: 10, message: 'Please provide more details (at least 10 characters)' }
            })}
            id="message"
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 resize-none ${
              errors.message 
                ? 'border-red-300 focus:ring-red-500' 
                : touchedFields.message 
                  ? 'border-green-300 focus:ring-green-500' 
                  : 'border-gray-300'
            }`}
            placeholder="Tell us about your tutoring needs, your child's current level, subjects of interest, and any specific goals or challenges..."
          />
          {touchedFields.message && !errors.message && (
            <div className="absolute top-3 right-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          )}
        </div>
        {errors.message && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.message.message}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          Which service do you require?
        </p>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              {...register('services.tuition')}
              type="checkbox"
              className="rounded border-gray-300 text-gold focus:ring-gold mr-2"
            />
            <span className="text-sm text-gray-700">1-2-1 Tuition</span>
          </label>
          <label className="flex items-center">
            <input
              {...register('services.groupTuition')}
              type="checkbox"
              className="rounded border-gray-300 text-gold focus:ring-gold mr-2"
            />
            <span className="text-sm text-gray-700">Group Tuition</span>
          </label>
          <label className="flex items-center">
            <input
              {...register('services.courses')}
              type="checkbox"
              className="rounded border-gray-300 text-gold focus:ring-gold mr-2"
            />
            <span className="text-sm text-gray-700">Courses</span>
          </label>
          <label className="flex items-center">
            <input
              {...register('services.examMarking')}
              type="checkbox"
              className="rounded border-gray-300 text-gold focus:ring-gold mr-2"
            />
            <span className="text-sm text-gray-700">Exam Marking</span>
          </label>
          <label className="flex items-center">
            <input
              {...register('services.interviewPractice')}
              type="checkbox"
              className="rounded border-gray-300 text-gold focus:ring-gold mr-2"
            />
            <span className="text-sm text-gray-700">Interview Practice</span>
          </label>
          <label className="flex items-center">
            <input
              {...register('services.other')}
              type="checkbox"
              className="rounded border-gray-300 text-gold focus:ring-gold mr-2"
            />
            <span className="text-sm text-gray-700">None/Other (please specify in message)</span>
          </label>
        </div>
      </div>


      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden transform ${
          isSubmitting || !isValid
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-navy text-white hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending your message...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <Mail className="h-5 w-5 mr-2" />
            Send Message
          </span>
        )}
      </button>

      {showSuccess && submitStatus === 'success' && (
        <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm animate-fade-in">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
              <p className="text-green-700 mb-3">
                Thank you for reaching out! I've received your message and will get back to you within 24 hours.
              </p>
              <p className="text-sm text-green-600">
                You should also receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl shadow-sm">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Sending Failed</h3>
              <p className="text-red-700 mb-3">
                Something went wrong while sending your message. Please try again in a moment.
              </p>
              <p className="text-sm text-red-600">
                If the problem persists, you can reach me directly at{' '}
                <a href="mailto:hello@aulawell.com" className="font-semibold hover:underline">
                  hello@aulawell.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}