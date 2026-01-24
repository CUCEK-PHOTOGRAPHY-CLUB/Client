// src/components/admin/JoiningRequestsAdmin.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiMail, FiAward, FiUser, FiLoader, FiMessageSquare } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { memberApplicationsApi } from '../../services/api.js';

// Modal for Approve/Reject actions (No changes needed here)
const ActionModal = ({ isOpen, onClose, onSubmit, title, action, isLoading }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-full max-w-lg bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h3 className={`text-xl font-bold mb-4 ${action === 'approve' ? 'text-green-400' : 'text-red-400'}`}>{title}</h3>
                    <form onSubmit={onSubmit}>
                        <textarea name="adminNotes" rows="4" placeholder="Add a note for the applicant (optional)..." className="w-full bg-slate-700 rounded-md p-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"></textarea>
                        <div className="flex justify-end gap-4 mt-6">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-600 rounded-md hover:bg-slate-500 transition-colors">Cancel</button>
                            <button type="submit" disabled={isLoading} className={`px-4 py-2 font-semibold rounded-md transition-colors disabled:opacity-50 ${action === 'approve' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}>{isLoading ? 'Processing...' : `Confirm ${action}`}</button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// No changes needed for the list item's visual structure
const RequestListItem = ({ request, onApprove, onReject }) => (
    <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700 space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <div className="flex items-center gap-3"><FiUser className="text-sky-400" /><p className="font-bold text-lg text-white">{request.name}</p></div>
                <div className="flex items-center gap-3 text-sm text-slate-400 mt-1"><FiMail /><p>{request.email}</p></div>
                <div className="flex items-center gap-3 text-sm text-slate-400 mt-1"><FiAward /><p>{request.prog_year}</p></div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 md:pt-0">
                <button onClick={() => onApprove(request)} className="flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/40 transition-colors font-semibold text-sm"><FiCheck /> Approve</button>
                <button onClick={() => onReject(request)} className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/40 transition-colors font-semibold text-sm"><FiX /> Reject</button>
            </div>
        </div>
        {request.description && <div className="text-slate-300 border-t border-slate-700 pt-4 flex items-start gap-3"><FiMessageSquare className="text-slate-500 mt-1 flex-shrink-0" /><p>{request.description}</p></div>}
    </div>
);

const JoiningRequestsAdmin = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalInfo, setModalInfo] = useState({ isOpen: false, request: null, action: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await memberApplicationsApi.getPending();
            // highlight-start
            // --- FIX 1: Point to the correct array inside the response data ---
            setRequests(response.data.data.applications);
            // highlight-end
        } catch (err) {
            setError('Failed to fetch joining requests.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        const { request, action } = modalInfo;
        const adminNotes = e.target.adminNotes.value.trim() || null;

        setIsSubmitting(true);
        try {
            if (action === 'approve') {
                const response = await memberApplicationsApi.approve(request.req_id, adminNotes);

                // --- EmailJS: Send Approval Email (Frontend) ---
                const generatedPassword = response.data.data.password;

                if (generatedPassword) {
                    try {
                        await emailjs.send(
                            'service_d7cg6kh', // Service ID
                            'template_1ir9ikp', // Approval Template ID (Swapped)
                            {
                                to_name: request.name,
                                to_email: request.email,
                                password: generatedPassword,
                                login_link: window.location.origin + '/member/login' // Dynamic link
                            },
                            'aZVQJExOaotV0PhEh' // Public Key
                        );
                        console.log('✅ Approval email sent via EmailJS');
                    } catch (emailErr) {
                        console.error('❌ Failed to send approval email via EmailJS', emailErr);
                        alert('Application approved, BUT email failed to send. Please verify EmailJS quota.');
                    }
                } else {
                    console.log('User already exists, no new password sent.');
                }

            } else if (action === 'reject') {
                await memberApplicationsApi.reject(request.req_id, adminNotes);
                // Note: Rejection email template not requested/setup yet per user instructions.
            }

            setModalInfo({ isOpen: false, request: null, action: '' });
            fetchRequests(); // Refresh the list
        } catch (err) {
            console.error(err);
            alert(`Failed to ${action} application. Please try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center p-8"><FiLoader className="animate-spin text-sky-500" size={40} /></div>;
    if (error) return <div className="p-4 bg-red-900/50 text-red-300 rounded-md">{error}</div>;

    return (
        <div className="space-y-6">
            <ActionModal
                isOpen={modalInfo.isOpen}
                onClose={() => setModalInfo({ isOpen: false, request: null, action: '' })}
                onSubmit={handleModalSubmit}
                title={modalInfo.action === 'approve' ? `Approve ${modalInfo.request?.name}` : `Reject ${modalInfo.request?.name}`}
                action={modalInfo.action}
                isLoading={isSubmitting}
            />
            {requests.length > 0 ? (
                requests.map(req => (
                    <RequestListItem
                        // highlight-start
                        // --- FIX 3: Use `req_id` for the unique React key ---
                        key={req.req_id}
                        // highlight-end
                        request={req}
                        onApprove={(request) => setModalInfo({ isOpen: true, request, action: 'approve' })}
                        onReject={(request) => setModalInfo({ isOpen: true, request, action: 'reject' })}
                    />
                ))
            ) : (
                <div className="text-center py-16 px-6 bg-slate-800/30 rounded-lg border-2 border-dashed border-slate-700">
                    <div className="inline-block p-4 bg-green-500/10 rounded-full"><FiCheck size={32} className="text-green-400" /></div>
                    <h3 className="mt-4 text-xl font-semibold text-white">All Caught Up!</h3>
                    <p className="text-slate-400 mt-2">There are no new pending joining requests.</p>
                </div>
            )}
        </div>
    );
};

export default JoiningRequestsAdmin;