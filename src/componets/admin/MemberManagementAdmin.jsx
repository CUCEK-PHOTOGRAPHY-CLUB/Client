import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSearch, FiFilter, FiX, FiCheck, FiUserX, FiUserCheck } from 'react-icons/fi';
import { adminMembersApi } from '../../services/api';

const TEAMS = ['Tech', 'Executive', 'Documentation', 'Production', 'Leads', 'General'];
const POSITIONS = ['Team Lead', 'Co-Lead', 'Member', 'Senior Member', 'Junior Member', 'Coordinator'];
const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced', 'professional'];

const MemberManagementAdmin = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [teamFilter, setTeamFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    // Modal
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [roleFormData, setRoleFormData] = useState({
        team: '',
        position: '',
        experience_level: ''
    });

    // Fetch members
    const fetchMembers = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                page: currentPage,
                limit: 20,
                ...(searchQuery && { search: searchQuery }),
                ...(teamFilter && { team: teamFilter }),
                ...(positionFilter && { position: positionFilter }),
                ...(statusFilter && { status: statusFilter }),
            };

            const response = await adminMembersApi.getAll(params);

            if (response.data.success) {
                setMembers(response.data.data.members);
                setTotalPages(response.data.data.pagination.totalPages);
                setTotal(response.data.data.pagination.total);
            }
        } catch (err) {
            console.error('Error fetching members:', err);
            setError('Failed to load members. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [currentPage, searchQuery, teamFilter, positionFilter, statusFilter]);

    // Handle edit member
    const handleEditMember = (member) => {
        setSelectedMember(member);
        setRoleFormData({
            team: member.team || '',
            position: member.position || '',
            experience_level: member.experience_level || 'beginner'
        });
        setEditModalOpen(true);
    };

    // Update member role
    const handleUpdateRole = async (e) => {
        e.preventDefault();

        try {
            const response = await adminMembersApi.updateRole(selectedMember.id, roleFormData);

            if (response.data.success) {
                // Update local state
                setMembers(members.map(m =>
                    m.id === selectedMember.id ? { ...m, ...roleFormData } : m
                ));
                setEditModalOpen(false);
                setSelectedMember(null);
            }
        } catch (err) {
            console.error('Error updating member role:', err);
            alert('Failed to update member role. Please try again.');
        }
    };

    // Toggle member status
    const handleToggleStatus = async (member) => {
        try {
            const newStatus = !member.isActive;
            const response = await adminMembersApi.updateStatus(member.id, newStatus);

            if (response.data.success) {
                setMembers(members.map(m =>
                    m.id === member.id ? { ...m, isActive: newStatus } : m
                ));
            }
        } catch (err) {
            console.error('Error toggling status:', err);
            alert('Failed to update member status.');
        }
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery('');
        setTeamFilter('');
        setPositionFilter('');
        setStatusFilter('');
        setCurrentPage(1);
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <FiFilter /> Filters
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                    </div>

                    {/* Team Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Team</label>
                        <select
                            value={teamFilter}
                            onChange={(e) => setTeamFilter(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="">All Teams</option>
                            {TEAMS.map(team => (
                                <option key={team} value={team}>{team}</option>
                            ))}
                        </select>
                    </div>

                    {/* Position Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Position</label>
                        <select
                            value={positionFilter}
                            onChange={(e) => setPositionFilter(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="">All Positions</option>
                            {POSITIONS.map(pos => (
                                <option key={pos} value={pos}>{pos}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Clear Filters Button */}
                {(searchQuery || teamFilter || positionFilter || statusFilter) && (
                    <button
                        onClick={clearFilters}
                        className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FiX /> Clear Filters
                    </button>
                )}
            </div>

            {/* Members Table */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent"></div>
                    <p className="mt-4 text-slate-300">Loading members...</p>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-400">{error}</div>
            ) : members.length === 0 ? (
                <div className="text-center py-12 text-slate-400">No members found.</div>
            ) : (
                <>
                    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-700 border-b border-slate-600">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Member</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Team</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Position</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Experience</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {members.map(member => (
                                        <tr key={member.id} className="hover:bg-slate-700/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {member.profile_photo_url ? (
                                                        <img src={member.profile_photo_url} alt={member.username} className="w-10 h-10 rounded-full object-cover" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-semibold">
                                                            {member.username?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-white">{member.username}</p>
                                                        <p className="text-sm text-slate-400">{member.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {member.team ? (
                                                    <span className="px-2 py-1 bg-sky-500/20 text-sky-300 rounded text-sm">
                                                        {member.team}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-500">Not assigned</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {member.position ? (
                                                    <span className="text-slate-300">{member.position}</span>
                                                ) : (
                                                    <span className="text-slate-500">Not assigned</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="capitalize text-slate-300">{member.experience_level}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {member.isActive ? (
                                                    <span className="flex items-center gap-1 text-green-400">
                                                        <FiUserCheck /> Active
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-red-400">
                                                        <FiUserX /> Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEditMember(member)}
                                                        className="p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                                                        title="Edit Role"
                                                    >
                                                        <FiEdit2 />
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(member)}
                                                        className={`p-2 ${member.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition-colors`}
                                                        title={member.isActive ? 'Deactivate' : 'Activate'}
                                                    >
                                                        {member.isActive ? <FiUserX /> : <FiUserCheck />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between">
                            <p className="text-slate-400">
                                Showing {members.length} of {total} members
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 bg-slate-800 text-white rounded-lg">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Edit Role Modal */}
            {editModalOpen && selectedMember && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 rounded-lg max-w-md w-full p-6 border border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">Edit Member Role</h3>
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="mb-4 p-3 bg-slate-700 rounded-lg">
                            <p className="text-sm text-slate-400">Member</p>
                            <p className="font-medium text-white">{selectedMember.username}</p>
                            <p className="text-sm text-slate-400">{selectedMember.email}</p>
                        </div>

                        <form onSubmit={handleUpdateRole} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Team</label>
                                <select
                                    value={roleFormData.team}
                                    onChange={(e) => setRoleFormData({ ...roleFormData, team: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                >
                                    <option value="">No Team</option>
                                    {TEAMS.map(team => (
                                        <option key={team} value={team}>{team}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Position</label>
                                <select
                                    value={roleFormData.position}
                                    onChange={(e) => setRoleFormData({ ...roleFormData, position: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                >
                                    <option value="">No Position</option>
                                    {POSITIONS.map(pos => (
                                        <option key={pos} value={pos}>{pos}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Experience Level</label>
                                <select
                                    value={roleFormData.experience_level}
                                    onChange={(e) => setRoleFormData({ ...roleFormData, experience_level: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    required
                                >
                                    {EXPERIENCE_LEVELS.map(level => (
                                        <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <FiCheck /> Update Role
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemberManagementAdmin;
