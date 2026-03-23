import CSRBanner from "@/components/sections/csr/CSRBanner";    
import CSRInitiatives from "@/components/sections/csr/CSRInitiatives";
import CSRGrid from "@/components/sections/csr/CSRGrid";
import CSRHealthcare from "@/components/sections/csr/CSRHealthcare";
import CSRCommunity from "@/components/sections/csr/CSRCommunity";


export default function CSRPage() {
  return (
    <>
      <CSRBanner />
      <CSRGrid />
      <CSRHealthcare />
      <CSRCommunity />
      <CSRInitiatives />
    </>
  );
}