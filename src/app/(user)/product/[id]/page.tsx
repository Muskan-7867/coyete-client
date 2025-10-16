import SingleProductPage from "@/components/user/products/SingleProductPage";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return <SingleProductPage id={id} />;
}
