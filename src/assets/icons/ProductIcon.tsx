export const ProductIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M20 16v-4a8 8 0 1 0-16 0v4m16 0v2a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2ZM4 16v2a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 2Z"
      />
    </svg>
  );
};

export default ProductIcon;
