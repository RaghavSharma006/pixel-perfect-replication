import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Bestsellers, Categories, FAQSection, FeaturedStory, GlobalShipping, Gifts, Kitchen, Newsletter, Reviews, StorySection, TrustLine } from "@/components/home/Sections";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageMeta("Authentic Marathi Achar, Papad & Sharbat", "Aai's recipes, Marathi soul. Homemade Marathi pickles, papad, kokum sharbat and gift boxes, made in small batches in Pune and shipped worldwide.", "/"),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <TrustLine />
      <Bestsellers />
      <Categories />
      <FeaturedStory />
      <StorySection />
      <Kitchen />
      <Gifts />
      <Reviews />
      <GlobalShipping />
      <FAQSection />
      <Newsletter />
    </>
  );
}
