import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Clock } from 'lucide-react';

// Vite exposes env vars via import.meta.env with VITE_ prefix
const LEAD_CAPTURE_URL = import.meta.env.VITE_LEAD_CAPTURE_URL as string | undefined;
const IS_DEV = import.meta.env.DEV;

// Request timeout in milliseconds
const REQUEST_TIMEOUT_MS = 12000;

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type TouchedFields = Partial<Record<keyof FormData, boolean>>;

type SubmitStatus = 'idle' | 'success' | 'error' | 'rate_limited' | 'validation_error';

// Extend Window interface for Umami
declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const [isEndpointMissing, setIsEndpointMissing] = useState(false);

  // Check for missing endpoint on mount (dev warning)
  useEffect(() => {
    if (!LEAD_CAPTURE_URL) {
      setIsEndpointMissing(true);
      if (IS_DEV) {
        console.warn(
          '[ContactForm] VITE_LEAD_CAPTURE_URL is not set. Form submission is disabled.\n' +
          'Add VITE_LEAD_CAPTURE_URL to your .env.local file:\n' +
          'VITE_LEAD_CAPTURE_URL=https://<func-app>.azurewebsites.net/api/contact'
        );
      }
    }
  }, []);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        break;
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        break;
      case 'phone':
        if (value.trim() && !/^[\d\s\-+()]{7,20}$/.test(value)) {
          return 'Please enter a valid phone number';
        }
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error if field was touched and is now valid
    if (touched[name as keyof FormData]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const trackSubmit = (formDataToTrack: FormData) => {
    // Track with Umami if available (guard against crashes)
    try {
      if (typeof window !== 'undefined' && window.umami?.track) {
        // Track event with full form data
        window.umami.track('contact_submit', {
          // Full form data
          firstName: formDataToTrack.firstName,
          lastName: formDataToTrack.lastName,
          email: formDataToTrack.email,
          phone: formDataToTrack.phone || '',
          message: formDataToTrack.message,
          // Additional metadata
          messageLength: formDataToTrack.message.length,
          hasPhone: !!formDataToTrack.phone,
          pageUrl: typeof window !== 'undefined' ? window.location.pathname : '',
          timestamp: new Date().toISOString(),
        });
      }
    } catch (e) {
      // Silently ignore tracking errors
      console.error('Umami tracking error:', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: TouchedFields = {
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      message: true,
    };
    setTouched(allTouched);

    if (!validateForm()) return;

    // Check if endpoint is configured
    if (!LEAD_CAPTURE_URL) {
      setServerErrorMessage('Contact form is not configured. Please try again later.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setServerErrorMessage(null);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      // Build payload with metadata
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      };

      const response = await fetch(LEAD_CAPTURE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        mode: 'cors',
        credentials: 'omit', // Don't send cookies cross-origin
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        // Success (HTTP 200-299)
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          message: '',
        });
        setTouched({});
        setErrors({});
        
        // Track successful submission with form metadata
        // Note: We use the original formData before clearing, not the cleared state
        trackSubmit(formData);
      } else if (response.status === 429) {
        // Rate limited
        setSubmitStatus('rate_limited');
      } else if (response.status === 400) {
        // Validation error from server
        try {
          const errorData = await response.json();
          setServerErrorMessage(errorData.error || errorData.message || 'Please check your input and try again.');
        } catch {
          setServerErrorMessage('Please check your input and try again.');
        }
        setSubmitStatus('validation_error');
      } else {
        // Other errors
        setSubmitStatus('error');
      }
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setServerErrorMessage('Request timed out. Please check your connection and try again.');
        } else if (error.message.includes('CORS') || error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          setServerErrorMessage('Connection error. Please check your internet connection or try again later. If the problem persists, contact us directly.');
        } else {
          setServerErrorMessage(error.message || 'Something went wrong. Please try again.');
        }
      } else {
        setServerErrorMessage('Something went wrong. Please try again.');
      }
      
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-navy/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Thanks—message sent!</h3>
        <p className="text-slate-400 mb-6">
          We'll get back to you as soon as possible. Expect a response within 24-48 hours.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="text-brand-glow hover:text-brand-light transition-colors font-medium"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  // Rate limited state
  if (submitStatus === 'rate_limited') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-navy/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
          <Clock className="w-8 h-8 text-amber-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Daily Limit Reached</h3>
        <p className="text-slate-400 mb-6">
          You've reached the daily limit. Please try again tomorrow.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="text-brand-glow hover:text-brand-light transition-colors font-medium"
        >
          Go back
        </button>
      </motion.div>
    );
  }

  const isSubmitDisabled = isSubmitting || isEndpointMissing;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-brand-navy/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Dev warning for missing endpoint */}
      {IS_DEV && isEndpointMissing && (
        <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">
            <strong>Dev:</strong> VITE_LEAD_CAPTURE_URL is not set. Form submission disabled.
          </span>
        </div>
      )}

      {/* Generic error */}
      {submitStatus === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">
            {serverErrorMessage || 'Something went wrong. Please try again.'}
          </span>
        </div>
      )}

      {/* Validation error from server */}
      {submitStatus === 'validation_error' && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{serverErrorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* First Name */}
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-300">
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              errors.firstName && touched.firstName
                ? 'border-red-500/50'
                : 'border-white/10 hover:border-white/20'
            }`}
            placeholder="John"
          />
          {errors.firstName && touched.firstName && (
            <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-slate-300">
            Last Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              errors.lastName && touched.lastName
                ? 'border-red-500/50'
                : 'border-white/10 hover:border-white/20'
            }`}
            placeholder="Doe"
          />
          {errors.lastName && touched.lastName && (
            <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-300">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          className={`w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.email && touched.email
              ? 'border-red-500/50'
              : 'border-white/10 hover:border-white/20'
          }`}
          placeholder="john@example.com"
        />
        {errors.email && touched.email && (
          <p className="text-xs text-red-400 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-slate-300">
          Phone Number <span className="text-slate-500">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          className={`w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.phone && touched.phone
              ? 'border-red-500/50'
              : 'border-white/10 hover:border-white/20'
          }`}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && touched.phone && (
          <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-slate-300">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          rows={5}
          className={`w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.message && touched.message
              ? 'border-red-500/50'
              : 'border-white/10 hover:border-white/20'
          }`}
          placeholder="Tell us about your project, timeline, and requirements..."
        />
        {errors.message && touched.message && (
          <p className="text-xs text-red-400 mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="w-full px-8 py-4 bg-brand-blue text-white font-semibold rounded-xl shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-brand-blue disabled:hover:shadow-brand-blue/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </motion.form>
  );
};

export default ContactForm;






