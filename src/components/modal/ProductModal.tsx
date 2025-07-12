import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useCreateProduct } from '@/hooks/products';
import { productSchema } from '@/schema';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Btn } from '../btn';
import { useEffect } from 'react';

export const ProductModal = ({ open, toggleOpen, element }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: element?.title || '',
      category: element?.category || '',
      price: element?.price || '',
    },
  });
  const { mutate: createProduct } = useCreateProduct();
  useEffect(() => {
    reset({
      title: element.title || '',
      category: element.category || '',
      price: element.price?.toString() || '',
    });
  }, [element, reset]);

  const onSubmit = (data) => {
    const payload = element?.id ? { id: element.id, ...data } : data;
    createProduct(payload, {
      onSuccess: () => {
        toggleOpen();
        toast.success(element?.id ? 'Product updated' : 'Product created');
        reset();
      },
    });
  };

  return (
    <Dialog open={open} toggleOpen={toggleOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">
              {element?.id ? 'Update Product' : 'Create Product'}
            </DialogTitle>
            <button
              type="button"
              onClick={toggleOpen}
              className="text-gray-500 hover:text-gray-900 cursor-pointer"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </DialogHeader>

        <div className="py-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                {...register('title')}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                type="text"
                placeholder="Category"
                {...register('category')}
              />
              {errors.category && (
                <span className="text-red-500 text-xs">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="text"
                placeholder="Price"
                {...register('price', {
                  pattern: /^\d+(\.\d{1,2})?$/,
                })}
                inputMode="decimal"
                pattern="^\d*\.?\d*$"
              />
              {errors.price && (
                <span className="text-red-500 text-xs">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-10 mt-10">
              <Btn
                type="button"
                onClick={toggleOpen}
                className="bg-transparent text-black shadow-none border hover:text-white"
              >
                Cancel
              </Btn>
              <Btn
                disabled={!isValid || (element.id && !isDirty)}
                type="submit"
              >
                {element.id ? 'Update' : 'Create'}
              </Btn>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
