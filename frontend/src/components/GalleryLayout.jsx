import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function GalleryLayout({ items }) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const findSlot = (slot) => items.find((it) => it.slot === slot) || null;

  const Card = ({ item, className, aosType = "fade-up" }) => {
    if (!item)
      return <div className={`bg-gray-100 rounded-2xl ${className}`} />;
    return (
      <div
        data-aos={aosType}
        onClick={() => setSelectedImage(item)}
        className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group ${className}`}
      >
        <img
          src={item.src}
          alt={item.caption}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

        {/* Using Oswald-Regular for Captions */}
        <div className="absolute bottom-5 left-5 right-5 transform transition-transform duration-500 group-hover:-translate-y-1">
          <h3 className="text-white text-lg font-OswaldRegular uppercase tracking-wider leading-tight">
            {item.caption}
          </h3>
          <div className="w-0 group-hover:w-10 h-1 bg-[#db6747] mt-2 transition-all duration-500" />
        </div>

        {/* Using LemonMilk-Regular for Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-white text-[10px] font-LemonMilkRegular uppercase tracking-[3px] px-6 py-2 border border-white/30 rounded-full backdrop-blur-md bg-white/5">
            Expand View
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 mt-12">
        {/* Changed gap for mobile (gap-4) and desktop (lg:gap-8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          
          {/* LEFT COLUMN STACK (4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-8">
            <Card
              item={findSlot("left1")}
              className="h-[300px] lg:h-[480px]"
              aosType="fade-right"
            />

            {/* Parking & Main Road - Thumbnails stack on very small screens */}
            <div className="grid grid-cols-2 gap-4 lg:gap-8 h-[150px] lg:h-[220px]">
              <Card
                item={findSlot("left2")}
                className="h-full"
                aosType="fade-up"
              />
              <Card
                item={findSlot("left3")}
                className="h-full"
                aosType="fade-up"
              />
            </div>
          </div>

          {/* RIGHT COLUMN STACK (8/12) */}
          <div className="lg:col-span-8 flex flex-col gap-4 lg:gap-8 lg:h-[732px]">
            <Card
              item={findSlot("rightTop")}
              className="h-[200px] lg:h-[250px]"
              aosType="fade-down"
            />
            {/* "Inside the Building" adjusts dynamically */}
            <Card
              item={findSlot("rightLarge")}
              className="flex-1 min-h-[350px] lg:min-h-0"
              aosType="fade-left"
            />
          </div>
        </div>
      </div>

      {/* MODAL VIEW */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-[#db6747] text-3xl">
            ✕
          </button>
          <div
            className="relative max-w-5xl w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              className="w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            <h2 className="text-[#db6747] font-OswaldRegular text-4xl uppercase mt-8 tracking-[6px]">
              {selectedImage.caption}
            </h2>
            <p className="text-white/40 font-NunitoSans uppercase tracking-[2px] mt-2">
              MGC Building Gallery
            </p>
          </div>
        </div>
      )}
    </>
  );
}
