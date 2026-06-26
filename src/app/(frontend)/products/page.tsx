import Navbar from "../components/Navbar";
import ProductsList from "./ProductsList";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#fffafc]">
      <Navbar />

      <section className="px-6 pt-32 pb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#3d1f2a]">Products</h1>
        <p className="text-[#c0849a] mt-2">
          Browse baby essentials added by our admins.
        </p>

        <ProductsList />
      </section>
    </main>
  );
}
