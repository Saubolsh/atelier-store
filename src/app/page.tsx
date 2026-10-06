import { AtelierStory } from "@/components/home/atelier-story";
import { CategoryRow } from "@/components/home/category-row";
import { CollectionSplit } from "@/components/home/collection-split";
import { Hero } from "@/components/home/hero";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Newsletter } from "@/components/home/newsletter";
import { Services } from "@/components/home/services";

// Catalog sections read the database; refresh the prerendered page at most
// once a minute so stock and new arrivals stay current.
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryRow />
      <CollectionSplit />
      <NewArrivals />
      <AtelierStory />
      <Services />
      <Newsletter />
    </>
  );
}
