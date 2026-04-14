import React from "react";

const clients = [
  { name: "Ahmed Sweet", src: "/top_clients/ahmed_sweet.avif" },
  { name: "Anaj Pur", src: "/top_clients/anaj_pur.webp" },
  { name: "Aztec", src: "/top_clients/aztec.png" },
  { name: "Bin Hahim", src: "/top_clients/bin_hahim.jpg" },
  { name: "Bombay Dry Fruits", src: "/top_clients/bombay_dry_fruits.svg" },
  { name: "Chand Ispaghol", src: "/top_clients/chand_ispaghol.png" },
  { name: "Coco9", src: "/top_clients/coco9.avif" },
  { name: "Crispiko", src: "/top_clients/crispiko.jpg" },
  { name: "Crown Ispaghol", src: "/top_clients/crown_ispaghol.jpg" },
  { name: "Darbare Sheeren", src: "/top_clients/darbaresheeren.webp" },
  { name: "Diamond Super Mart", src: "/top_clients/diamond_super_mart.png" },
  { name: "Fresh Basket", src: "/top_clients/fresh_basket.avif" },
  // { name: "Gold Dry Fruits", src: "/top_clients/gold_dry_fruits.jpg" },
  { name: "Grao Coffee", src: "/top_clients/grao_coffee.avif" },
  { name: "Kababjees", src: "/top_clients/kababjees.webp" },
  { name: "Khan Dry Fruits", src: "/top_clients/khan_dry_fruits.webp" },
  { name: "Lals", src: "/top_clients/lals.webp" },
  { name: "Mahmood Sweets", src: "/top_clients/mahmood_sweets.webp" },
  { name: "Maqbool Ispaghol", src: "/top_clients/maqbool_ispaghol.jpg" },
  // { name: "Melbrew Coffee", src: "/top_clients/melbrew_coffee.png" },
  { name: "Nawab Ganic", src: "/top_clients/nawab_ganic.png" },
  { name: "Nomad Coffee", src: "/top_clients/nomad_coffee.png" },
  { name: "Nutibles", src: "/top_clients/nutibles.jpg" },
  { name: "Pie in the Sky", src: "/top_clients/pie_in_the_sky.webp" },
  { name: "Raaz Coffee", src: "/top_clients/raaz_coffee.svg" },
  { name: "Rehmat-e-Sheeren", src: "/top_clients/rehmat_e_sheeren.webp" },
  { name: "RM Salt", src: "/top_clients/rm_salt.png" },
  { name: "Sheikh Abdul Wahid", src: "/top_clients/sheikh_abdul_wahid.png" },
  { name: "Sunridge", src: "/top_clients/sunridge.webp" },
];

const Sec1 = () => {
  return (
    <section className="bg-brand-section py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-tight">
            Trusted by{" "}
            <span className="text-brand-orange">Industry Leaders</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Trusted by clients all over Pakistan and dealt with 50+ clients
            across various sectors.
          </p>
          <div className="mt-6 h-1 w-20 bg-brand-orange/20 mx-auto rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-orange w-1/2 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 w-[calc(50%-1rem)] sm:w-[calc(33.33%-1rem)] md:w-[calc(25%-1.5rem)] lg:w-[calc(20%-1.5rem)] xl:w-[calc(16.66%-1.5rem)] min-h-[120px]"
            >
              <img
                src={client.src}
                alt={`${client.name} logo`}
                className="max-h-16 w-full px-2 object-contain filter transition-all duration-300 ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sec1;
