'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

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
  };
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!captchaValue) {
      alert('Please complete the CAPTCHA');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          captcha: captchaValue,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setCaptchaValue(null);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
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
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            id="firstName"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name*
          </label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            type="text"
            id="lastName"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email*
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message*
        </label>
        <textarea
          {...register('message', { required: 'Message is required' })}
          id="message"
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
          placeholder="Type your message here..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
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
        </div>
      </div>

      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={setCaptchaValue}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-navy text-white py-3 px-6 rounded-md font-semibold hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Submit'}
      </button>

      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
          Thank you for your message! I'll get back to you within 24 hours.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-md">
          Something went wrong. Please try again or contact me directly at hello@aulawell.com
        </div>
      )}
    </form>
  );
}