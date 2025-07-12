import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { productTableData } from '@/data';
import { useDeleteProduct } from '@/hooks/products';
import { Pencil, Trash2 } from 'lucide-react';
import { ConfirmModal } from '../modal';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images?: string[];
}

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  toggleOpen: (product?: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  toggleOpen,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const { mutate: deleteProduct } = useDeleteProduct();

  const handleOpen = (id: number) => {
    setSelected(id);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (selected == null) return;
    deleteProduct(selected, {
      onSuccess: () => {
        toast.success('Product deleted successfully');
        setOpen(false);
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <>
      <Table className="w-full table-auto">
        <TableHeader>
          <TableRow className="border-b-gray-300">
            {productTableData.map((el) => (
              <TableHead
                key={el}
                className="capitalize px-3 py-1 font-bold text-sm"
              >
                {el}
              </TableHead>
            ))}
            <TableHead className="text-right capitalize font-bold py-1 text-sm px-3">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>...Loading</TableCell>
            </TableRow>
          ) : products.length > 0 ? (
            products.map((item) => (
              <TableRow key={item.id} className="border-gray-300">
                <TableCell className="px-3 py-1">{item.title}</TableCell>
                <TableCell className="px-3 py-1">{item.category}</TableCell>
                <TableCell className="px-3 py-1">
                  {item.images?.[0] ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-12 h-12"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
                      N/A
                    </div>
                  )}
                </TableCell>
                <TableCell className="px-3 py-1">{item.price}</TableCell>
                <TableCell className="px-3 py-1">{item.rating}</TableCell>
                <TableCell className="px-3 py-1">{item.stock} pcs</TableCell>
                <TableCell className="py-1 pr-3">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => toggleOpen(item)}
                      className="cursor-pointer"
                    >
                      <Pencil className="w-5 h-5 text-blue-700" />
                    </button>
                    <button
                      onClick={() => handleOpen(item.id)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ConfirmModal
        isOpen={open}
        message="Siz bu ma'lumotni o'chirmoqchimisiz?"
        onConfirm={handleConfirm}
        closeModal={handleClose}
      />
    </>
  );
};

export default ProductTable;
