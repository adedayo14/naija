'use client';

import { useState, useEffect } from 'react';
import { Item, Category, ShippingConfig, DEFAULT_WEIGHTS, POINTS_BUDGET } from '@/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [shippingConfig, setShippingConfig] = useState<ShippingConfig | null>(null);
  const [filter, setFilter] = useState<'all' | 'unclaimed' | 'claimed'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'user'>('default');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    size: '',
    category: 'tshirt' as Category,
    imagePath: '',
    weightKg: '',
  });

  // Form state for new item
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    size: '',
    category: 'tshirt' as Category,
    imagePath: '',
    weightKg: '',
  });

  // Check if already authenticated on mount
  useEffect(() => {
    const savedSecret = localStorage.getItem('adminSecret');
    if (savedSecret) {
      setPassword(savedSecret);
      setIsAuthenticated(true);
      loadData(savedSecret);
    }
  }, []);

  const loadData = async (secret: string) => {
    setLoading(true);
    try {
      const [itemsRes, shippingRes] = await Promise.all([
        fetch('/api/admin/items', {
          headers: { 'x-admin-secret': secret },
        }),
        fetch('/api/admin/shipping', {
          headers: { 'x-admin-secret': secret },
        }),
      ]);

      if (itemsRes.status === 401 || shippingRes.status === 401) {
        handleLogout();
        return;
      }

      const [itemsData, shippingData] = await Promise.all([
        itemsRes.json(),
        shippingRes.json(),
      ]);

      setItems(itemsData);
      setShippingConfig(shippingData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Try to fetch items to validate the secret
    const res = await fetch('/api/admin/items', {
      headers: { 'x-admin-secret': password },
    });

    if (res.status === 401) {
      setError('Invalid password');
      return;
    }

    // Save to localStorage and authenticate
    localStorage.setItem('adminSecret', password);
    setIsAuthenticated(true);
    loadData(password);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSecret');
    setIsAuthenticated(false);
    setPassword('');
    setItems([]);
    setShippingConfig(null);
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const secret = localStorage.getItem('adminSecret');
    if (!secret) {
      handleLogout();
      return;
    }

    try {
      const res = await fetch('/api/admin/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret,
        },
        body: JSON.stringify({
          ...formData,
          weightKg: formData.weightKg ? parseFloat(formData.weightKg) : undefined,
        }),
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to create item');
        return;
      }

      const newItem = await res.json();
      setItems([newItem, ...items]);

      // Reset form
      setFormData({
        title: '',
        description: '',
        size: '',
        category: 'tshirt',
        imagePath: '',
        weightKg: '',
      });
    } catch (err) {
      setError('Network error');
    }
  };

  const handleDeleteItem = async (id: string) => {
    const secret = localStorage.getItem('adminSecret');
    if (!secret) {
      handleLogout();
      return;
    }

    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/items/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': secret },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (res.ok) {
        setItems(items.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleUnclaimItem = async (id: string) => {
    const secret = localStorage.getItem('adminSecret');
    if (!secret) {
      handleLogout();
      return;
    }

    if (!confirm('Are you sure you want to unclaim this item?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/items/${id}/unclaim`, {
        method: 'POST',
        headers: { 'x-admin-secret': secret },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setItems(items.map(item => item.id === id ? data.item : item));
      } else {
        alert('Failed to unclaim item');
      }
    } catch (err) {
      console.error('Error unclaiming item:', err);
      alert('Error unclaiming item');
    }
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item.id);
    setEditFormData({
      title: item.title,
      description: item.description || '',
      size: item.size,
      category: item.category,
      imagePath: item.imagePath,
      weightKg: item.weightKg.toString(),
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditFormData({
      title: '',
      description: '',
      size: '',
      category: 'tshirt',
      imagePath: '',
      weightKg: '',
    });
  };

  const handleSaveEdit = async (id: string) => {
    const secret = localStorage.getItem('adminSecret');
    if (!secret) {
      handleLogout();
      return;
    }

    try {
      const res = await fetch(`/api/admin/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret,
        },
        body: JSON.stringify({
          title: editFormData.title,
          description: editFormData.description,
          size: editFormData.size,
          category: editFormData.category,
          imagePath: editFormData.imagePath,
          weightKg: parseFloat(editFormData.weightKg),
        }),
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (res.ok) {
        const updatedItem = await res.json();
        setItems(items.map(item => item.id === id ? updatedItem : item));
        handleCancelEdit();
      } else {
        alert('Failed to update item');
      }
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Error updating item');
    }
  };

  const handleSaveShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingConfig) return;

    const secret = localStorage.getItem('adminSecret');
    if (!secret) {
      handleLogout();
      return;
    }

    try {
      const res = await fetch('/api/admin/shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret,
        },
        body: JSON.stringify(shippingConfig),
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (res.ok) {
        alert('Shipping config saved!');
      }
    } catch (err) {
      console.error('Error saving shipping config:', err);
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'unclaimed') return !item.claimedBy;
    if (filter === 'claimed') return !!item.claimedBy;
    return true;
  });

  // Sort items based on sortBy
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'user') {
      // Sort by claimedBy name, unclaimed items last
      if (!a.claimedBy && !b.claimedBy) return 0;
      if (!a.claimedBy) return 1;
      if (!b.claimedBy) return -1;
      return a.claimedBy.localeCompare(b.claimedBy);
    }
    return 0; // default order
  });

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-neutral-900">Admin sign in</h1>
            <p className="mt-2 text-sm text-neutral-600">Enter the admin password to manage items.</p>
            <form onSubmit={handleLogin} className="mt-6 space-y-3">
              <div>
                <label className="text-xs font-semibold text-neutral-600">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-900 shadow-sm outline-none focus:border-neutral-900"
                  placeholder="Admin password"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">Admin</p>
            <h1 className="text-3xl font-semibold text-neutral-900">Manage Items & Shipping</h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700"
          >
            Log out
          </button>
        </div>

        {loading && <p className="text-center text-neutral-500">Loading...</p>}

        {/* Shipping Settings */}
        {shippingConfig && (
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Points Cost per Category</h2>
            <form onSubmit={handleSaveShipping} className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-600">T-shirt</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={shippingConfig.tshirt}
                    onChange={(e) => setShippingConfig({ ...shippingConfig, tshirt: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-600">Shirt</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={shippingConfig.shirt}
                    onChange={(e) => setShippingConfig({ ...shippingConfig, shirt: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-600">Trousers</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={shippingConfig.trousers}
                    onChange={(e) => setShippingConfig({ ...shippingConfig, trousers: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-600">Jeans</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={shippingConfig.jeans}
                    onChange={(e) => setShippingConfig({ ...shippingConfig, jeans: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-600">Cardigan</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={shippingConfig.cardigan}
                    onChange={(e) => setShippingConfig({ ...shippingConfig, cardigan: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-600">Jacket</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={shippingConfig.jacket}
                    onChange={(e) => setShippingConfig({ ...shippingConfig, jacket: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-600">Shoes</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={shippingConfig.shoes}
                    onChange={(e) => setShippingConfig({ ...shippingConfig, shoes: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-600">Other</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={shippingConfig.other}
                    onChange={(e) => setShippingConfig({ ...shippingConfig, other: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-gray-900"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Save Shipping Config
              </button>
            </form>
          </div>
        )}

        {/* Create Item Form */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Add New Item</h2>
          <form onSubmit={handleCreateItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-600">Title *</label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium"
                  placeholder="e.g. Blue Uniqlo T-shirt"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-600">Image Path *</label>
                <input
                  required
                  value={formData.imagePath}
                  onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium"
                  placeholder="/items/blue-shirt.jpg"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-600">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium"
                placeholder="Optional notes"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-600">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-gray-900"
                >
                  <option value="tshirt">T-shirt</option>
                  <option value="shirt">Shirt</option>
                  <option value="trousers">Trousers</option>
                  <option value="jeans">Jeans</option>
                  <option value="cardigan">Cardigan</option>
                  <option value="jacket">Jacket</option>
                  <option value="shoes">Shoes</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-600">Size *</label>
                <input
                  required
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium"
                  placeholder="e.g. M, UK 10, 32x32"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-600">
                  Weight (kg) - default: {DEFAULT_WEIGHTS[formData.category]}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.weightKg}
                  onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium"
                  placeholder={DEFAULT_WEIGHTS[formData.category].toString()}
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Create Item
            </button>
          </form>
        </div>

        {/* Items List / Claims Overview */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-neutral-900">Items & Claims</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded text-sm font-semibold ${filter === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'}`}
                >
                  All ({items.length})
                </button>
                <button
                  onClick={() => setFilter('unclaimed')}
                  className={`px-3 py-1 rounded text-sm font-semibold ${filter === 'unclaimed' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'}`}
                >
                  Unclaimed ({items.filter(i => !i.claimedBy).length})
                </button>
                <button
                  onClick={() => setFilter('claimed')}
                  className={`px-3 py-1 rounded text-sm font-semibold ${filter === 'claimed' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'}`}
                >
                  Claimed ({items.filter(i => i.claimedBy).length})
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <button
                onClick={() => setSortBy('default')}
                className={`px-2 py-0.5 rounded text-xs font-semibold ${sortBy === 'default' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Default
              </button>
              <button
                onClick={() => setSortBy('user')}
                className={`px-2 py-0.5 rounded text-xs font-semibold ${sortBy === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                By User (for packing)
              </button>
            </div>
          </div>

{sortedItems.length === 0 ? (
            <p className="text-center text-neutral-500 py-8">No items to display.</p>
          ) : (
            <div className="space-y-3">
              {sortedItems.map((item, index) => {
                const isEditing = editingItem === item.id;
                const prevItem = index > 0 ? sortedItems[index - 1] : null;
                const showUserDivider = sortBy === 'user' && item.claimedBy &&
                  prevItem?.claimedBy !== item.claimedBy;

                return (
                  <div key={item.id}>
                    {showUserDivider && (
                      <div className="bg-blue-50 border-l-4 border-blue-500 px-3 py-2 mb-2">
                        <p className="font-bold text-blue-900">{item.claimedBy}</p>
                      </div>
                    )}
                    <div className="border rounded-lg p-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label htmlFor={`edit-title-${item.id}`} className="text-xs font-semibold text-gray-700">Title</label>
                              <input
                                id={`edit-title-${item.id}`}
                                type="text"
                                value={editFormData.title}
                                onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                                className="w-full px-3 py-2 border rounded text-sm"
                              />
                            </div>
                            <div>
                              <label htmlFor={`edit-size-${item.id}`} className="text-xs font-semibold text-gray-700">Size</label>
                              <input
                                id={`edit-size-${item.id}`}
                                type="text"
                                value={editFormData.size}
                                onChange={(e) => setEditFormData({...editFormData, size: e.target.value})}
                                className="w-full px-3 py-2 border rounded text-sm"
                              />
                            </div>
                            <div>
                              <label htmlFor={`edit-category-${item.id}`} className="text-xs font-semibold text-gray-700">Category</label>
                              <select
                                id={`edit-category-${item.id}`}
                                value={editFormData.category}
                                onChange={(e) => setEditFormData({...editFormData, category: e.target.value as Category})}
                                className="w-full px-3 py-2 border rounded text-sm"
                              >
                                <option value="tshirt">T-Shirt</option>
                                <option value="shirt">Shirt</option>
                                <option value="trousers">Trousers</option>
                                <option value="jeans">Jeans</option>
                                <option value="cardigan">Cardigan</option>
                                <option value="jacket">Jacket</option>
                                <option value="shoes">Shoes</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor={`edit-weight-${item.id}`} className="text-xs font-semibold text-gray-700">Weight (kg)</label>
                              <input
                                id={`edit-weight-${item.id}`}
                                type="number"
                                step="0.01"
                                value={editFormData.weightKg}
                                onChange={(e) => setEditFormData({...editFormData, weightKg: e.target.value})}
                                className="w-full px-3 py-2 border rounded text-sm"
                              />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor={`edit-desc-${item.id}`} className="text-xs font-semibold text-gray-700">Description</label>
                              <input
                                id={`edit-desc-${item.id}`}
                                type="text"
                                value={editFormData.description}
                                onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                                className="w-full px-3 py-2 border rounded text-sm"
                              />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor={`edit-image-${item.id}`} className="text-xs font-semibold text-gray-700">Image Path</label>
                              <input
                                id={`edit-image-${item.id}`}
                                type="text"
                                value={editFormData.imagePath}
                                onChange={(e) => setEditFormData({...editFormData, imagePath: e.target.value})}
                                className="w-full px-3 py-2 border rounded text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="px-4 py-2 rounded bg-gray-100 text-gray-700 text-sm font-semibold"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(item.id)}
                              className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-4 flex-1">
                            <img
                              src={item.imagePath.split('/').map((part, i) => i === 0 ? part : encodeURIComponent(part)).join('/')}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                              <div className="flex gap-2 mt-2 text-xs text-gray-600">
                                <span>Size: {item.size}</span>
                                <span>•</span>
                                <span className="capitalize">{item.category}</span>
                                <span>•</span>
                                <span>{item.weightKg}kg</span>
                                <>
                                  <span>•</span>
                                  <span>Shipping: £{(item.weightKg * 5.50).toFixed(2)}</span>
                                </>
                              </div>
                              {item.claimedBy && (
                                <p className="mt-2 text-sm font-semibold text-emerald-700">
                                  Claimed by {item.claimedBy} on {new Date(item.claimedAt!).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditItem(item)}
                              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                            >
                              Edit
                            </button>
                            {item.claimedBy && (
                              <button
                                type="button"
                                onClick={() => handleUnclaimItem(item.id)}
                                className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
                              >
                                Unclaim
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(item.id)}
                              className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Summary for claimed items */}
          {shippingConfig && items.some(i => i.claimedBy) && (
            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold mb-3">Claims Summary by User</h3>
              <div className="space-y-3">
                {(() => {
                  const userGroups = items.filter(i => i.claimedBy).reduce((acc, item) => {
                    const userName = item.claimedBy!;
                    if (!acc[userName]) {
                      acc[userName] = [];
                    }
                    acc[userName].push(item);
                    return acc;
                  }, {} as Record<string, Item[]>);

                  return Object.entries(userGroups).map(([userName, userItems]) => {
                    const totalPoints = userItems.reduce((sum, i) => sum + shippingConfig[i.category], 0);
                    const totalShipping = userItems.reduce((sum, i) => sum + (i.weightKg * 5.50), 0);
                    const isOverBudget = totalPoints > POINTS_BUDGET;

                    return (
                      <div key={userName} className={`p-3 rounded-lg ${isOverBudget ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{userName}</p>
                            <p className="text-xs text-gray-600">{userItems.length} items • £{totalShipping.toFixed(2)} shipping</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
                              {totalPoints} / {POINTS_BUDGET} pts
                            </p>
                            {isOverBudget && (
                              <p className="text-xs text-red-600 font-semibold">
                                Over by {totalPoints - POINTS_BUDGET}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              <div className="mt-4 pt-4 border-t text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Total Items Claimed:</span>
                  <span className="font-semibold">{items.filter(i => i.claimedBy).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Weight:</span>
                  <span className="font-semibold">
                    {items.filter(i => i.claimedBy).reduce((sum, i) => sum + i.weightKg, 0).toFixed(2)}kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Points:</span>
                  <span className="font-semibold">
                    {items.filter(i => i.claimedBy).reduce((sum, i) => sum + shippingConfig[i.category], 0)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-semibold">Total Shipping Cost:</span>
                  <span className="font-bold text-lg text-emerald-700">
                    £{items.filter(i => i.claimedBy).reduce((sum, i) => sum + (i.weightKg * 5.50), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
