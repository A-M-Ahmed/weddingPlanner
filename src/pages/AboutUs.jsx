import React from "react";

const AboutUs = () => {
  return (
    <div>
      {/* //* hero section */}
      <div
        className={`relative min-h-[80vh] bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url("https://html.kodesolution.com/2024/lovebite-php/images/background/page-title-bg.png")`,
        }}
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 to-white/20"></div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 md:py-24 lg:px-12">
          <div className="flex flex-col items-center justify-center py-32">
            <p className="relative text-xl font-medium text-white md:text-4xl">
              {" "}
              About Us
            </p>
          </div>
        </div>
      </div>

      {/* //* feature */}
      <section>
        <div className="mx-auto max-w-7xl pt-24">
          <div>
            <h3 className="text-center text-xl font-bold text-gray-900 md:text-4xl">
              Who Are We
            </h3>
            <p className="mx-auto my-3 max-w-md text-center text-xl">
              We are The World Best Wedding planner
            </p>
          </div>
        </div>
      </section>
      {/* //* mession */}
      <section id="ourMission">
        <div className="mx-auto max-w-7xl py-12 ">
          <div className="flex relative md:space-x-0 flex-col md:flex-row space-y-12 md:space-y-0 mb-20   ">
            {/* //* text */}
            <div className="md:w-1/2 text-left px-4">
              <p className="text-xl md:text-2xl">
                At our core, we believe every couple deserves a celebration as
                unique as their story. With a deep understanding of the emotion
                behind every detail, we create weddings that not only reflect
                your personal style but also leave a lasting impression on
                everyone who attends. From the first consultation to the final
                toast, we’re by your side — calm, committed, and inspired by
                your vision. Every flower placed, every timeline set, and every
                vow whispered is part of something bigger — a day that marks the
                beginning of your forever. Our team combines elegance,
                precision, and warmth to ensure your experience is seamless,
                stress-free, and filled with joy. Because to us, it’s not just
                planning a wedding — it’s about honoring a love story that
                deserves to be remembered beautifully.
              </p>

            </div>
            {/* //*image  */}
          <div className="md:w-1/2 w-full">

              <img src="https://images.unsplash.com/photo-1734705797879-0c23e9edca21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2VkZGluZyUyMHBsYWNlfGVufDB8fDB8fHww"
              className="md:absolute top-0 left-[62.4%] w-full md:w-fit"
              alt="" />
          </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
