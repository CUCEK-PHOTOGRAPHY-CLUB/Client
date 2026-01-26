// src/components/admin/AdminCrudController.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX } from 'react-icons/fi';

/**
 * A generic and reusable controller for handling CRUD operations in an admin panel.
 * @param {string} title - The title to display for the section (e.g., "User Management").
 * @param {Array} items - The array of data items to display.
 * @param {React.Component} FormComponent - The component to render for the add/edit form.
 * @param {React.Component} ListItemComponent - The component to render for each item in the list.
 * @param {object} initialFormState - The default state for a new item.
 * @param {object} api - An API service object with `create`, `update`, and `delete` methods.
 * @param {function} onDataChange - A function to call to refresh data in the parent component.
 * @param {object} ...rest - Any other props (like custom event handlers) are passed down to the ListItemComponent.
 */
const AdminCrudController = ({
  title,
  items = [], // Default to an empty array to prevent map errors
  FormComponent,
  ListItemComponent,
  initialFormState,
  api,
  onDataChange,
  // Any other props (like custom event handlers) are collected here
  ...rest 
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentItem(initialFormState);
    setIsFormVisible(true);
    setError(null);
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    // Use a deep copy to prevent mutating the original item in the list while editing
    setCurrentItem({ ...item });
    setIsFormVisible(true);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      try {
        await api.delete(id);
        onDataChange();
      } catch (err) {
        console.error('Failed to delete item:', err);
        setError('Failed to delete the item. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isEditing) {
        await api.update(currentItem.id, currentItem);
      } else {
        await api.create(currentItem);
      }
      onDataChange();
      handleCloseForm();
    } catch (err) {
      const errorData = err.response?.data;
      let errorMessage = errorData?.message || 'An unknown error occurred.';
      
      // If there are detailed validation errors, display them
      if (errorData?.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
        const detailedErrors = errorData.errors.map(error => 
          `${error.field}: ${error.message}`
        ).join('\n');
        errorMessage = `${errorMessage}\n\n${detailedErrors}`;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };
  
  // After the exit animation completes, then reset the form state
  const handleAnimationComplete = () => {
      if (!isFormVisible) {
          setIsEditing(false);
          setCurrentItem(initialFormState);
          setError(null);
      }
  };

  const formVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 30, scale: 0.95 },
  };

  return (
    <div className="bg-slate-900/50 p-6 md:p-8 rounded-xl border border-slate-700/50">
       <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        {/* Hide "Add New" button when form is visible for a cleaner UI */}
        {!isFormVisible && (
            <button
                onClick={handleAddNew}
                className="bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
                <FiPlus /> Add New
            </button>
        )}
      </div>
      <AnimatePresence onExitComplete={handleAnimationComplete}>
        {isFormVisible && (
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="mb-8 p-6 bg-slate-800/80 rounded-lg relative border border-slate-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-lg">{isEditing ? `Edit Item` : `Add New Item`}</h4>
              <button onClick={handleCloseForm} className="text-slate-500 hover:text-white"><FiX /></button>
            </div>
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-md mb-4 text-sm whitespace-pre-line">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <FormComponent 
                    currentItem={currentItem} 
                    setCurrentItem={setCurrentItem} 
                    isEditing={isEditing} 
                />
                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={handleCloseForm} className="px-5 py-2 bg-slate-600 rounded-md hover:bg-slate-500 transition-colors">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-5 py-2 bg-green-600 rounded-md font-semibold hover:bg-green-500 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Saving...' : (isEditing ? 'Update Changes' : 'Save New Item')}
                    </button>
                </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map(item => (
            <ListItemComponent 
                key={item.id} 
                item={item} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                // Pass down all other props (e.g., onToggleStatus, onRoleChange)
                {...rest}
            />
          ))
        ) : (
          <p className="text-slate-500 text-center py-4">No items yet. Click "Add New" to get started.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCrudController;