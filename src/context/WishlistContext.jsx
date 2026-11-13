import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kokare_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading wishlist from localStorage', e);
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('kokare_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const addToWishlist = useCallback((product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      showToast(`Added "${product.name}" to your Wishlist`);
      return [...prev, product];
    });
  }, [showToast]);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const item = prev.find(p => p.id === productId);
      if (item) {
        showToast(`Removed "${item.name}" from Wishlist`);
      }
      return prev.filter(item => item.id !== productId);
    });
  }, [showToast]);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to your Wishlist`);
        return [...prev, product];
      }
    });
  }, [showToast]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const value = useMemo(() => ({
    wishlist,
    wishlistCount: wishlist.length,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    toastMessage
  }), [wishlist, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, toastMessage]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

