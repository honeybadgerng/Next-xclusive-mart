import { GetServerSideProps } from "next";
import Product, { IProduct } from "@/models/Product";
import dbConnect from "@/utils/dbConnect";

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();
  const { id } = context.params!;
  const product = await Product.findOne({ slug: id }).lean();
  return { props: { product: JSON.parse(JSON.stringify(product)) } };
};

export default function ProductDetails({ product }: { product: IProduct }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>₦{product.price}</p>
      {product.images.map((image, idx) => (
        <img key={idx} src={image} alt={product.name} />
      ))}
      {product.videoUrl && <video src={product.videoUrl} controls />}
    </div>
  );
}
