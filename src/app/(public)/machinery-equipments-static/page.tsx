import MachineryHero from "@/components/sections/CapabilityPages/machinery/MachineryHero";
import PlantCapacity from "@/components/sections/CapabilityPages/machinery/PlantCapacity";

export const metadata = {
  title: "Machinery & Equipments | Besmak Components",
  description:
    "Explore Besmak's state-of-the-art machinery and manufacturing footprint through our specialized infrastructure.",
};

export default function MachineryEquipmentsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <MachineryHero />
      <PlantCapacity />
    </main>
  );
}
