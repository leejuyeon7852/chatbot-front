import React from 'react';

// 제품 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  image?: string;
}

// ProductList 컴포넌트의 props 타입 정의
interface ProductListProps {
  products: Product[]; // 제품 배열
  title?: string; // 선택적 제목
  onProductClick?: (product: Product) => void; // 제품 클릭 이벤트
  showStockStatus?: boolean; // 재고 상태 표시 여부
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  title = '제품 목록',
  onProductClick,
  showStockStatus = true
}) => {
  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>{title}</h2>
      
      {products.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>제품이 없습니다.</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                cursor: onProductClick ? 'pointer' : 'default',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                backgroundColor: 'white'
              }}
              onMouseEnter={(e) => {
                if (onProductClick) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (onProductClick) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginBottom: '12px'
                  }}
                />
              )}
              
              <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
                {product.name}
              </h3>
              
              <p style={{ margin: '4px 0', color: '#666' }}>
                카테고리: {product.category}
              </p>
              
              <p style={{ 
                margin: '4px 0', 
                fontSize: '18px', 
                fontWeight: 'bold',
                color: '#007bff'
              }}>
                ₩{product.price.toLocaleString()}
              </p>
              
              {showStockStatus && (
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  backgroundColor: product.inStock ? '#4caf50' : '#f44336',
                  color: 'white'
                }}>
                  {product.inStock ? '재고 있음' : '품절'}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 