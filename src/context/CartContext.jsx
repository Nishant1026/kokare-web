import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const CartContext = createContext();

const VALID_COUPONS = {
  'FESTIVE20': { code: 'FESTIVE20', discountPercent: 20, label: 'All Festival Offer 20% Off' },
  'DIWALI20': { code: 'FESTIVE20', discountPercent: 20, label: 'All Festival Offer 20% Off' },
  'KOKARE10': { code: 'KOKARE10', discountPercent: 10, label: 'KOKARÉ Welcome 10% Off' }
};

export const normalizeCartItem = (item) => {
  if (!item) return null;
  const prod = item.product || {};
  const id = item.id || prod.id || item.cartItemId || 'prod';
  const name = item.name || prod.name || 'Festive Silhouette';
  const images = (Array.isArray(item.images) && item.images.length > 0)
    ? item.images
    : (Array.isArray(prod.images) && prod.images.length > 0)
      ? prod.images
      : [item.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80&fm=webp'];
  const price = Number(item.price || prod.price || 0);
  const size = item.selectedSize || item.size || 'Standard';
  const color = item.selectedColor || item.color || 'Original';
  const quantity = Math.max(1, Number(item.quantity || 1));
  const cartItemId = item.cartItemId || `${id}-${size}-${color}`;

  return {
    cartItemId,
    id,
    product: {
      ...prod,
      id,
      name,
      price,
      images
    },
    name,
    images,
    price,
    selectedSize: size,
    selectedColor: color,
    size,
    color,
    quantity,
    fabric: item.fabric || prod.fabric || prod.tagline || '',
    category: item.category || prod.category || 'Ethnic Wear',
    gender: item.gender || prod.gender || 'women',
    tagline: item.tagline || prod.tagline || ''
  };
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('kokare_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalizeCartItem).filter(Boolean);
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('kokare_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartToast, setCartToast] = useState(null);
  const [cartBump, setCartBump] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('kokare_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('kokare_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('kokare_coupon');
      }
    } catch (e) {
      console.error('Error saving coupon to localStorage', e);
    }
  }, [appliedCoupon]);

  const triggerCartBump = () => {
    setCartBump(true);
    setTimeout(() => {
      setCartBump(false);
    }, 1200);
  };

  const showCartToast = (message, itemData = null) => {
    setCartToast(message);
    setLastAddedItem(itemData);
    setTimeout(() => {
      setCartToast(null);
    }, 3200);
  };

  const addToCart = useCallback((product, selectedSize, selectedColor, quantity = 1, openDrawer = false) => {
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Original';
    const cartItemId = `${product.id}-${size}-${color}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.cartItemId === cartItemId ||
        (String(item.id || item.product?.id) === String(product.id) &&
         (item.selectedSize === size || item.size === size) &&
         (item.selectedColor === color || item.color === color))
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = (Number(updated[existingIndex].quantity) || 1) + quantity;
        updated[existingIndex] = normalizeCartItem({
          ...updated[existingIndex],
          quantity: newQty
        });
        return updated;
      } else {
        const newItem = normalizeCartItem({
          cartItemId,
          id: product.id,
          product,
          name: product.name,
          images: product.images,
          price: product.price,
          selectedSize: size,
          selectedColor: color,
          fabric: product.fabric,
          category: product.category,
          gender: product.gender,
          tagline: product.tagline,
          size,
          color,
          quantity
        });
        return [...prev, newItem];
      }
    });

    triggerCartBump();
    showCartToast(`Added ${quantity} × ${product.name} to Bag`, { product, size, color });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  }, []);

  const removeFromCart = useCallback((idOrCartItemId, size, color) => {
    setCart(prev =>
      prev.filter(item => {
        if (size !== undefined && color !== undefined) {
          const matchId = String(item.id || item.product?.id) === String(idOrCartItemId);
          const matchSize = item.selectedSize === size || item.size === size;
          const matchColor = item.selectedColor === color || item.color === color;
          return !(matchId && matchSize && matchColor);
        }
        return item.cartItemId !== idOrCartItemId && String(item.id || item.product?.id) !== String(idOrCartItemId);
      })
    );
  }, []);

  const updateQuantity = useCallback((idOrCartItemId, sizeOrQty, color, newQty) => {
    // If called with (cartItemId, newQty)
    if (newQty === undefined && typeof sizeOrQty === 'number') {
      const targetQty = sizeOrQty;
      if (targetQty <= 0) {
        removeFromCart(idOrCartItemId);
        return;
      }
      setCart(prev =>
        prev.map(item =>
          (item.cartItemId === idOrCartItemId || String(item.id || item.product?.id) === String(idOrCartItemId))
            ? normalizeCartItem({ ...item, quantity: targetQty })
            : item
        )
      );
      return;
    }

    // If called with (productId, size, color, newQty)
    const targetQty = newQty;
    if (targetQty <= 0) {
      removeFromCart(idOrCartItemId, sizeOrQty, color);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        const matchId = String(item.id || item.product?.id) === String(idOrCartItemId);
        const matchSize = item.selectedSize === sizeOrQty || item.size === sizeOrQty;
        const matchColor = item.selectedColor === color || item.color === color;
        return (matchId && matchSize && matchColor)
          ? normalizeCartItem({ ...item, quantity: targetQty })
          : item;
      })
    );
  }, [removeFromCart]);

  const isInCart = useCallback((productId, size, color) => {
    const targetId = String(productId || '');
    return cart.some(item => {
      const matchId = String(item.id || item.product?.id || '') === targetId;
      if (!matchId) return false;
      if (size && item.selectedSize !== size && item.size !== size) return false;
      if (color && item.selectedColor !== color && item.color !== color) return false;
      return true;
    });
  }, [cart]);

  const getProductTotalInCart = useCallback((productId) => {
    const targetId = String(productId || '');
    return cart
      .filter(item => {
        const idA = String(item.id || item.product?.id || '');
        return idA && idA === targetId;
      })
      .reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  }, [cart]);

  const getCartItemQuantity = useCallback((productId, size, color) => {
    const targetId = String(productId || '');
    // If exact variant requested:
    if (size || color) {
      const item = cart.find(item => {
        const matchId = String(item.id || item.product?.id || '') === targetId;
        if (!matchId) return false;
        if (size && item.selectedSize !== size && item.size !== size) return false;
        if (color && item.selectedColor !== color && item.color !== color) return false;
        return true;
      });
      if (item) return item.quantity;
    }
    // Return total quantity of this product in cart
    return getProductTotalInCart(productId);
  }, [cart, getProductTotalInCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback((codeStr) => {
    const clean = codeStr.trim().toUpperCase();
    if (VALID_COUPONS[clean]) {
      setAppliedCoupon(VALID_COUPONS[clean]);
      return { success: true, message: `Coupon ${clean} applied: ${VALID_COUPONS[clean].discountPercent}% off!` };
    }
    return { success: false, message: 'Invalid coupon code. Try FESTIVE20 or KOKARE10.' };
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const { totalItems, subtotal, discount, shipping, total } = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    let discount = 0;
    if (appliedCoupon && subtotal > 0) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    }

    // Free shipping threshold ₹2,999
    const shipping = subtotal === 0 || subtotal >= 2999 ? 0 : 199;
    const total = Math.max(0, subtotal - discount + shipping);

    return { totalItems, subtotal, discount, shipping, total };
  }, [cart, appliedCoupon]);

  const contextValue = useMemo(() => ({
    cart,
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    isCartOpen,
    cartToast,
    cartBump,
    lastAddedItem,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    isInCart,
    getCartItemQuantity,
    getProductTotalInCart,
    clearCart,
    applyCoupon,
    removeCoupon
  }), [
    cart,
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    isCartOpen,
    cartToast,
    cartBump,
    lastAddedItem,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    isInCart,
    getCartItemQuantity,
    getProductTotalInCart,
    clearCart,
    applyCoupon,
    removeCoupon
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

