import { useEffect, useState } from 'react';
import { Btn } from '../../components/btn';
import { ProductModal } from '../../components/modal';
import { useGetProducts } from '../../hooks/products';
import { Pagination } from '../../components/pagination';
import ProductTable from '../../components/table/ProductTable';
import { LIMIT } from '../../constants/indes';
import { Product } from '@/types/product'; // Bunday type mavjud bo'lishi kerak

type ToggleOpenFn = (element?: Product) => void;
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  rating?: number;
  stock?: number;
  // qo‘shimcha maydonlar bo‘lsa, ularni ham qo‘shing
}

const ProductsPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [element, setElement] = useState<Product | {}>({});
  const [product, setProduct] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const toggleOpen: ToggleOpenFn = (element) => {
    if (element) setElement(element);
    setOpen((prev) => !prev);
  };

  const { data, isLoading } = useGetProducts({ limit: LIMIT, skip });
  const products = data?.products ?? [];

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        const sorted = sortProductsByTitle(data.products, sortOrder);
        setProduct(sorted);
      });
  }, [sortOrder]);

  const sortProductsByTitle = (
    products: Product[],
    order: 'asc' | 'desc'
  ): Product[] => {
    return [...products].sort((a, b) =>
      order === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="my-6 bg-transparent">
      <div className="mb-5 flex gap-10">
        <Btn onClick={() => toggleOpen({} as Product)}>Create</Btn>
      </div>
      <div className="pb-2 overflow-y-auto border border-gray-300 rounded-md bg-white shadow-md">
        <ProductTable
          products={products}
          isLoading={isLoading}
          toggleOpen={toggleOpen}
        />
        <div className="mt-5">
          <Pagination
            total={data?.total || 0}
            skip={skip}
            limit={LIMIT}
            setSkip={setSkip}
          />
        </div>
      </div>
      {open && (
        <ProductModal open={open} toggleOpen={toggleOpen} element={element} />
      )}
    </div>
  );
};

export default ProductsPage;
