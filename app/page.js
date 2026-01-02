import Hero from "@/component/home/Hero";
import Sec1 from "@/component/home/Sec1";
import Sec2 from "@/component/home/Sec2";
import Sec3 from "@/component/home/Sec3";
import Sec4 from "@/component/home/Sec4";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      {/* Our mission */}
      <Sec1 />
      {/* Our Process */}
      <Sec2 />
      {/* Our Certifications */}
      <Sec3/>
      {/* Team */}
      <Sec4/>
    </>
  );
};

export default page;
