// src/pages/admin/UserManagementAdmin.js

import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiLock, FiEdit, FiTrash2, FiLoader } from 'react-icons/fi';
import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import { usersApi } from '../../services/api.js';

// --- Reusable UI Sub-Components ---

const ToggleSwitch = ({ enabled, onChange }) => (
    <button onClick={onChange} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${enabled ? 'bg-green-500' : 'bg-slate-600'}`}>
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const PaginationControls = ({ paginationInfo, onPageChange }) => {
    if (!paginationInfo || paginationInfo.totalPages <= 1) return null;
    // RESPONSIVE: Stacks vertically on mobile, horizontal on larger screens
    return (
        <div className="flex flex-col items-center gap-4 mt-6 sm:flex-row sm:justify-between">
            <button onClick={() => onPageChange(paginationInfo.currentPage - 1)} disabled={!paginationInfo.hasPrevPage} className="w-full sm:w-auto px-4 py-2 bg-slate-700 rounded-md text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors">Previous</button>
            <span className="text-sm text-slate-400">Page {paginationInfo.currentPage} of {paginationInfo.totalPages}</span>
            <button onClick={() => onPageChange(paginationInfo.currentPage + 1)} disabled={!paginationInfo.hasNextPage} className="w-full sm:w-auto px-4 py-2 bg-slate-700 rounded-md text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors">Next</button>
        </div>
    );
};

// --- User-Specific Components (Now Fully Responsive) ---

const UserListItem = ({ item, onEdit, onDelete, onToggleStatus, onRoleChange }) => (
    // RESPONSIVE: Switched from grid to a flexbox layout
    <div className="flex flex-col space-y-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        {/* User Info */}
        <div className="flex-1 min-w-0 pr-4">
            <p className="font-bold text-white truncate">{item.name}</p>
            <p className="text-sm text-slate-400 truncate">{item.username} ({item.email})</p>
        </div>

        {/* Details & Actions Group */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-x-6 sm:flex-wrap">
            {/* Role Dropdown */}
            <div className="w-full sm:w-32">
                <select value={item.role} onChange={(e) => onRoleChange(item, e.target.value)} className={`w-full text-xs font-semibold rounded-full border-2 bg-slate-800/50 transition-colors py-1 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${item.role === 'admin' ? 'border-sky-500/30 text-sky-300 focus:ring-sky-500' : 'border-slate-600/50 text-slate-300 focus:ring-slate-500'}`}>
                    <option value="member">member</option>
                    <option value="user">user</option>
                    <option value="moderator">moderator</option>
                    <option value="admin">admin</option>
                </select>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center gap-2">
                <ToggleSwitch enabled={item.isActive} onChange={() => onToggleStatus(item)} />
                <span className="text-sm">{item.isActive ? 'Active' : 'Inactive'}</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4 self-end sm:self-auto">
                <button onClick={() => onEdit(item)} className="text-slate-400 hover:text-sky-400 transition-colors"><FiEdit size={18} /></button>
                <button onClick={() => onDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
            </div>
        </div>
    </div>
);

// UserForm is already responsive due to its parent's grid layout, no changes needed
const UserForm = ({ currentItem, setCurrentItem, isEditing }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput id="user-full-name" label="Full Name" icon={<FiUser />} value={currentItem.name || ''} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} />
        <AdminInput id="user-username" label="Username" icon={<FiUser />} value={currentItem.username || ''} onChange={e => setCurrentItem({ ...currentItem, username: e.target.value })} />
        <AdminInput id="user-email" label="Email Address" type="email" icon={<FiMail />} value={currentItem.email || ''} onChange={e => setCurrentItem({ ...currentItem, email: e.target.value })} />
        <AdminInput id="user-password" label="Password" type="password" icon={<FiLock />} value={currentItem.password || ''} onChange={e => setCurrentItem({ ...currentItem, password: e.target.value })} placeholder={isEditing ? "Leave blank to keep current password" : "Enter a new password"} />
        <div>
            <label htmlFor="user-role" className="block text-sm font-medium text-slate-300 mb-2">Role</label>
            <select
                id="user-role"
                value={currentItem.role || 'member'}
                onChange={e => setCurrentItem({ ...currentItem, role: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
                <option value="member">Member</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
            </select>
        </div>
    </div>
);


// --- Main Page Component (No structural changes needed) ---

const UserManagementAdmin = () => {
    const [users, setUsers] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const response = await usersApi.getAll(page, 10);
            setUsers(response.data.data.users); 
            setPaginationInfo(response.data.data.pagination);
            setCurrentPage(page);
        } catch (err) {
            setError('Failed to fetch users. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(1);
    }, []);

    const handleToggleStatus = async (user) => {
        try {
            await usersApi.updateStatus(user.id, !user.isActive);
            fetchUsers(currentPage);
        } catch (err) { alert('Could not update status.'); }
    };

    const handleRoleChange = async (user, newRole) => {
        if (!window.confirm(`Change ${user.username}'s role to ${newRole}?`)) return;
        try {
            await usersApi.updateRole(user.id, newRole);
            fetchUsers(currentPage);
        } catch (err) { alert('Could not update role.'); }
    };

    const handlePageChange = (newPage) => {
        if (paginationInfo && newPage > 0 && newPage <= paginationInfo.totalPages) {
            fetchUsers(newPage);
        }
    };

    const apiWithPasswordHandling = {
        ...usersApi,
        create: (data) => {
            if (!data.password) return Promise.reject({ response: { data: { message: "Password is required for new users." } } });
            return usersApi.create(data);
        },
        update: (id, data) => {
            if (data.password === '' || data.password === undefined) {
                const { password, ...dataWithoutPassword } = data;
                return usersApi.update(id, dataWithoutPassword);
            }
            return usersApi.update(id, data);
        }
    };

    if (loading && !users.length) return <div className="flex justify-center items-center h-40"><FiLoader className="animate-spin text-sky-500" size={40} /></div>;
    if (error) return <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-md mb-4 text-sm">{error}</div>;

    return (
        <div>
            <AdminCrudController
                title="User Management"
                items={users}
                FormComponent={UserForm}
                ListItemComponent={UserListItem}
                initialFormState={{ id: null, name: '', username: '', email: '', password: '', role: 'member' }}
                api={apiWithPasswordHandling}
                onDataChange={() => fetchUsers(currentPage)}
                onToggleStatus={handleToggleStatus}
                onRoleChange={handleRoleChange}
            />
            <PaginationControls paginationInfo={paginationInfo} onPageChange={handlePageChange} />
        </div>
    );
};

export default UserManagementAdmin;