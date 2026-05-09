'use client';

import Link from 'next/link';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import { formatCategoryName } from '@utils/formatCategoryName';
import { useGetCategoriesQuery } from 'src/redux/features/categoryApi';

// Map category slugs to emoji/icon for visual flair
const CATEGORY_ICONS = {
  'telephonie': '📱',
  'telephone': '📱',
  'informatique': '💻',
  'impression': '🖨️',
  'accessoires': '🎮',
  'smartwatch': '⌚',
  'smart-watch': '⌚',
  'electromenager': '🏠',
  'électroménager': '🏠',
  'tv': '📺',
  'son': '🔊',
  'tv-son': '📺',
  'reseaux': '🌐',
  'securite': '🔒',
  'beaute': '💄',
  'bien-etre': '✨',
  'bagagerie': '🧳',
  'sport': '⚽',
  'loisirs': '🎯',
  'jeux': '🎮',
  'maison': '🏡',
  'bureau': '📋',
};

function getCategoryIcon(category) {
  if (category?.icon) return category.icon;
  const categorySlug = category?.parent || category;
  if (!categorySlug || typeof categorySlug !== 'string') return '📦';
  const lower = categorySlug.toLowerCase().replace(/[_\s]/g, '-');
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return '📦';
}

const CategoriesMegaMenu = ({ isOpen, onClose, anchorRef }) => {
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery();
  const [activeCategory, setActiveCategory] = useState(null);
  const panelRef = useRef(null);

  const categories = categoriesData?.categories || [];

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        anchorRef?.current && !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose, anchorRef]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Set first category active when opening
  useEffect(() => {
    if (isOpen && categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].parent);
    }
  }, [isOpen, categories, activeCategory]);

  if (!isOpen) return null;

  const activeCategoryData = categories.find(c => c.parent === activeCategory);

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Catégories"
        style={{
          position: 'fixed',
          top: '85px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 40px)',
          maxWidth: '1200px',
          zIndex: 9999,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
          borderRadius: '24px',
          display: 'flex',
          maxHeight: 'min(800px, 80vh)',
          overflow: 'hidden',
          animation: 'megaMenuPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformOrigin: 'top center',
        }}
      >
        <style>{`
          @keyframes megaMenuPop {
            from { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.98); }
            to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          }
          .mega-sidebar {
            width: 280px;
            background: #f8f9fa;
            border-right: 1px solid rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }
          .mega-cat-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 24px;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            font-size: 14.5px;
            font-weight: 500;
            color: #4b5563;
            text-decoration: none;
          }
          .mega-cat-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%) scaleY(0.4);
            width: 4px;
            height: 20px;
            background: linear-gradient(to bottom, #ff4e00, #ff8a00);
            border-radius: 0 4px 4px 0;
            opacity: 0;
            transition: all 0.2s;
          }
          .mega-cat-item:hover,
          .mega-cat-item.active {
            background: #fff;
            color: #e8430a;
          }
          .mega-cat-item.active::before {
            opacity: 1;
            transform: translateY(-50%) scaleY(1);
          }
          .mega-cat-icon {
            font-size: 20px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            transition: all 0.2s;
          }
          .mega-cat-item:hover .mega-cat-icon,
          .mega-cat-item.active .mega-cat-icon {
            box-shadow: 0 4px 10px rgba(232, 67, 10, 0.15);
            transform: scale(1.1);
          }
          .mega-content-area {
            flex: 1;
            padding: 32px 40px;
            overflow-y: auto;
            background: #fff;
          }
          .subcat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
            margin-top: 24px;
          }
          .subcat-card {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            background: #fdfdfd;
            border: 1px solid #f0f0f0;
            border-radius: 16px;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          .subcat-card:hover {
            background: #fff;
            border-color: #ff8a00;
            box-shadow: 0 8px 20px rgba(0,0,0,0.06);
            transform: translateY(-3px);
          }
          .subcat-card span {
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            transition: color 0.2s;
          }
          .subcat-card:hover span {
            color: #e8430a;
          }
          .promo-banner {
            margin-top: auto;
            background: linear-gradient(135deg, #2b2b2b 0%, #1a1a1a 100%);
            border-radius: 16px;
            padding: 20px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            position: relative;
          }
          .promo-banner::after {
            content: '⚡';
            position: absolute;
            right: -10px;
            bottom: -10px;
            font-size: 80px;
            opacity: 0.1;
            transform: rotate(-15deg);
          }
        `}</style>
 
        {/* Left: Category Sidebar */}
        <div className="mega-sidebar">
          <div style={{ padding: '24px 24px 12px', fontSize: '12px', fontWeight: 800, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Rayons de la boutique
          </div>
 
          <div style={{ flex: 1 }}>
            {isLoading && (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ height: 48, margin: '4px 16px', borderRadius: 12, background: '#f3f4f6', animation: 'pulse 1.2s infinite' }} />
              ))
            )}
 
            {!isLoading && !isError && categories.map((cat) => (
              <div
                key={cat._id || cat.parent}
                className={`mega-cat-item ${activeCategory === cat.parent ? 'active' : ''}`}
                onMouseEnter={() => setActiveCategory(cat.parent)}
                onClick={() => onClose()}
              >
                <div className="mega-cat-icon">{getCategoryIcon(cat)}</div>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.parent)}`}
                  style={{ color: 'inherit', textDecoration: 'none', flex: 1 }}
                  onClick={onClose}
                >
                  {formatCategoryName(cat.parent)}
                </Link>
                <span style={{ opacity: 0.3, fontSize: 18 }}>›</span>
              </div>
            ))}
          </div>
 
          {/* Sidebar Footer */}
          <div style={{ padding: '20px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <Link
              href="/shop"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ff8a00';
                e.currentTarget.style.color = '#e8430a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.color = '#374151';
              }}
            >
              <span>📂</span> Voir tout le catalogue
            </Link>
          </div>
        </div>
 
        {/* Right: Content Area */}
        <div className="mega-content-area">
          {activeCategoryData ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                    {formatCategoryName(activeCategoryData.parent)}
                  </h3>
                  <p style={{ color: '#6b7280', marginTop: 4, fontSize: '15px' }}>
                    Retrouvez notre sélection de produits dans ce rayon.
                  </p>
                </div>
                <Link
                  href={`/shop?category=${encodeURIComponent(activeCategoryData.parent)}`}
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#e8430a',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                  onClick={onClose}
                >
                  Tout voir <span style={{ fontSize: 18 }}>→</span>
                </Link>
              </div>
 
              <div className="subcat-grid">
                {activeCategoryData.children?.length > 0 ? (
                  activeCategoryData.children.map((child, j) => (
                    <Link
                      key={j}
                      href={`/shop?category=${encodeURIComponent(activeCategoryData.parent)}&subcategory=${encodeURIComponent(child)}`}
                      className="subcat-card"
                      onClick={onClose}
                    >
                      <span>{formatCategoryName(child)}</span>
                    </Link>
                  ))
                ) : (
                  <div style={{ gridColumn: '1/-1', padding: '40px', textAlign: 'center', background: '#f9fafb', borderRadius: '20px', border: '1px dashed #e5e7eb' }}>
                    <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>✨</span>
                    <p style={{ color: '#9ca3af', margin: 0 }}>Aucune sous-catégorie pour le moment.</p>
                  </div>
                )}
              </div>
 
              {/* Promo Section */}
              <div className="promo-banner" style={{ marginTop: 'auto' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ff8a00', textTransform: 'uppercase', marginBottom: 4 }}>Offre Spéciale</div>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Vente Flash de la semaine</h4>
                  <p style={{ margin: '4px 0 0', opacity: 0.7, fontSize: '14px' }}>Profitez de remises exceptionnelles jusqu'à -40%.</p>
                </div>
                <Link
                  href="/shop?category=vente-flash"
                  onClick={onClose}
                  style={{
                    background: '#ff8a00',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '13px',
                    textDecoration: 'none',
                    zIndex: 1
                  }}
                >
                  J'en profite
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af', flexDirection: 'column' }}>
              <span style={{ fontSize: '60px', marginBottom: '20px' }}>🖱️</span>
              <p>Explorez nos catégories par rayon.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoriesMegaMenu;
