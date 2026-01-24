import React, { useState } from 'react';
import { FiUser, FiMail, FiAward, FiMessageSquare, FiLock } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { memberApi } from '../../services/api';
import AnimatedInput from './AnimatedInput.jsx';

const RegistrationFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prog_year: '',
    description: '',
    username: '',
    password: '',
  });

  // State to manage the submission process
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Handler to update state when user types in an input field
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.prog_year || !formData.description) {
      setFeedback({ message: 'All fields are required.', type: 'error' });
      return;
    }

    setFormStatus('submitting');
    setFeedback({ message: '', type: '' });

    try {
      // Prepare the payload for the API, mapping form fields to API fields
      const apiPayload = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        prog_year: formData.prog_year,
        description: formData.description,
        password: formData.password,
      };

      const response = await memberApi.submitApplication(apiPayload);

      // --- Send Confirmation Email (Frontend) ---
      try {
        await emailjs.send(
          'service_d7cg6kh', // Service ID
          'template_gfx6ckf', // Admin Notification Template ID
          {
            to_name: 'Admin', // Addressed to Admin
            login_link: window.location.origin + '/auth', // Dynamic link
            to_email: 'cucekphotographyclub@gmail.com', // Send to Admin ONLY
            from_name: formData.name, // The applicant name
            from_email: formData.email,
            prog_year: formData.prog_year,
            message: formData.description,
          },
          'aZVQJExOaotV0PhEh' // Public Key
        );
        console.log('Confirmation email sent!');
      } catch (emailErr) {
        console.error('Failed to send confirmation email', emailErr);
      }

      // Handle success
      setFeedback({ message: response.data.message || 'Application submitted successfully! You will be notified once reviewed. ', type: 'success' });
      setFormStatus('success');
      // Reset form after successful submission
      setFormData({ name: '', username: '', email: '', password: '', prog_year: '', description: '' });

    } catch (error) {
      // Handle errors from the API
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      setFeedback({ message: errorMessage, type: 'error' });
      setFormStatus('error');
    }
  };

  return (
    <section>
      <div className="max-w-lg mx-auto bg-neutral-900/50 p-8 md:p-12 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold text-center mb-6">Join The Club</h2>

        {/* Feedback message display */}
        {feedback.message && (
          <div className={`p-4 mb-6 text-center rounded-lg ${feedback.type === 'error' ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
          <AnimatedInput id="name" label="Your Name" icon={<FiUser />} value={formData.name} onChange={handleInputChange} />
          <AnimatedInput id="username" label="Your Username" icon={<FiUser />} value={formData.username} onChange={handleInputChange} />
          <AnimatedInput id="email" label="Email Address" type="email" icon={<FiMail />} value={formData.email} onChange={handleInputChange} />
          <AnimatedInput id="password" label="Your Password" type="password" icon={<FiLock />} value={formData.password} onChange={handleInputChange} />
          <AnimatedInput id="prog_year" label="Passout Year" icon={<FiAward />} value={formData.prog_year} onChange={handleInputChange} />

          {/* New field for description */}
          <AnimatedInput
            id="description"
            label="Why do you want to join?"
            as="textarea"
            icon={<FiMessageSquare />}
            value={formData.description}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            disabled={formStatus === 'submitting'}
            className="group relative w-full flex justify-center items-center gap-2 py-3 px-5 mt-4 bg-sky-600 rounded-lg text-lg font-semibold hover:bg-sky-500 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {formStatus === 'submitting' ? 'Processing...' : formStatus === 'success' ? 'Submitted!' : 'Submit Application'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationFormSection;