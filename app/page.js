import FAQs from "@/component/FAQs";
import Hero from "@/component/home/Hero";
import Sec1 from "@/component/home/Sec1";
import Sec2 from "@/component/home/Sec2";
import Sec3 from "@/component/home/Sec3";
import Sec4 from "@/component/home/Sec4";
import Sec5 from "@/component/home/Sec5";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      {/* Our printing  */}
      <Sec5/>
      {/* Our Process */}
      <Sec2 />
      {/* Our Certifications */}
      <Sec3/>
      {/* Our Top Clients */}
      <Sec1 />
      {/* Team */}
      <Sec4/>
      {/* FAQs */}
      <FAQs/>
    </>
  );
};

export default page;
