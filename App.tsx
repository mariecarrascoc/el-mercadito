
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { PromoCarousel } from './components/PromoCarousel';
import { ProductCarousel } from './components/ProductCarousel';
import { BrandCarousel } from './components/BrandCarousel';
import { GridView } from './components/GridView';
import { ProductDetail } from './components/ProductDetail';
import { CartView } from './components/CartView';
import { offerProducts, products, brands, promoBanners } from './constants';
import { Product, Brand, Category } from './types';

type View = 'home' | 'all-offers' | 'all-products' | 'all-brands' | 'cart' | 'category';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState<View>('home');
  const [viewTitle, setViewTitle] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const allProducts = useMemo(() => [...offerProducts, ...products], []);

  const recommendedProducts = useMemo(() => {
    const recommendedIds = [14, 7, 11, 1, 6, 4];
    const productMap = new Map(allProducts.map(p => [p.id, p]));
    return recommendedIds.map(id => productMap.get(id)).filter((p): p is Product => p !== undefined);
  }, [allProducts]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setSelectedProduct(null);
    if (term) {
        setCurrentView('all-products');
        setViewTitle(`Resultados para "${term}"`);
    } else {
        if(currentView !== 'category') setCurrentView('home');
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };
  
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };
  
  const handleCategoryClick = (category: Category) => {
    setCurrentView('category');
    setSelectedCategory(category);
    setViewTitle(category.name);
    setSearchTerm('');
    setSelectedProduct(null);
  };


  const filteredItems = useMemo(() => {
    if (currentView === 'home') return [];
    
    let items: (Product | Brand)[] = [];
    if (currentView === 'all-offers') {
      items = offerProducts;
    } else if (currentView === 'all-products') {
      items = allProducts;
    } else if (currentView === 'all-brands') {
      items = brands;
    } else if (currentView === 'category' && selectedCategory) {
      items = allProducts.filter(p => p.categoryId === selectedCategory.id);
    }
    
    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        if (currentView === 'all-brands') {
            return (items as Brand[]).filter(brand => brand.name.toLowerCase().includes(lowercasedTerm));
        }
        return (items as Product[]).filter(product => product.name.toLowerCase().includes(lowercasedTerm));
    }
    return items;
  }, [searchTerm, currentView, allProducts, selectedCategory]);

  const showAll = (view: View, title: string) => {
    setCurrentView(view);
    setViewTitle(title);
    setSearchTerm(''); 
    setSelectedProduct(null);
  };

  const goHome = () => {
    setCurrentView('home');
    setSearchTerm('');
    setSelectedProduct(null);
    setSelectedCategory(null);
  };

  const showCart = () => {
    setCurrentView('cart');
    setSelectedProduct(null);
  }
  
  const renderHome = () => (
    <main className="pb-16 space-y-6">
      <CategoryNav onCategoryClick={handleCategoryClick} />
      <PromoCarousel banners={promoBanners} />
      <ProductCarousel 
          title="Ofertas de la semana" 
          products={offerProducts} 
          onViewAllClick={() => showAll('all-offers', 'Ofertas de la semana')}
          onProductClick={handleProductClick}
      />
      <BrandCarousel 
          onViewAllClick={() => showAll('all-brands', 'Marcas aliadas')}
      />
      <ProductCarousel 
          title="Los más vendidos" 
          products={products} 
          onViewAllClick={() => showAll('all-products', 'Los más vendidos')}
          onProductClick={handleProductClick}
      />
      <ProductCarousel 
          title="Recomendados para ti" 
          products={recommendedProducts} 
          onViewAllClick={() => showAll('all-products', 'Recomendados para ti')}
          onProductClick={handleProductClick}
      />
    </main>
  );

  const renderGridView = () => {
    const gridType = currentView === 'all-brands' ? 'brand' : 'product';
    return (
      <main>
        <GridView 
          title={viewTitle}
          items={filteredItems}
          type={gridType}
          onBack={goHome}
          onProductClick={handleProductClick}
        />
      </main>
    );
  };

  const renderContent = () => {
    if (selectedProduct) {
        return <ProductDetail product={selectedProduct} onBack={handleCloseDetail} allProducts={allProducts} onProductClick={handleProductClick} />;
    }
    if (currentView === 'cart') {
        return <CartView allProducts={allProducts} onBack={goHome} />;
    }
    if (currentView === 'home') {
        return renderHome();
    }
    return renderGridView();
  }

  return (
    <div className="max-w-[360px] mx-auto bg-gray-50 shadow-lg min-h-screen">
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} onCartClick={showCart} onLogoClick={goHome} />
      {renderContent()}
    </div>
  );
};

export default App;