import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowRightCircle, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import supabase from "../lib/supabase";
import { useAuth } from "../context/AuthProvider";
import { GiDiamondRing } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HomePage = () => {
  const [allWedding, setAllWedding] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // ** fetch all events
  const testimonials = [
    {
      name: "Alza Hydar",
      text: "Enjoy some of the most exquisite and delicious dishes. With our unique recipes we guarantee a taste you won’t forget!",
      image:
        "https://html.kodesolution.com/2024/lovebite-php/images/resource/testi3-thumb3.jpg",
    },
    {
      name: "Amelia",
      text: "Our wedding day was perfect thanks to the planning team. Everything went smoothly and beautifully!",
      image:
        "https://html.kodesolution.com/2024/lovebite-php/images/resource/testi3-thumb1.jpg",
    },
    // Add more as needed
  ];

  async function fetchAllWedding() {
    setIsLoading(true);
    try {
      // * all wedding

      const { data: weddingEventData, error: WeddingEventError } =
        await supabase
          .from("events")
          .select(
            `*,
        
        prepare : creater_id(username,avatar_url)
        `,
          )
          .order("created_at", { ascending: false })
          .limit(6);

      if (WeddingEventError) throw WeddingEventError;

      setAllWedding(weddingEventData || []);
    } catch (error) {
      console.error("Error for fetching data wedding", error);
      toast.error("Failed to fetch Data");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllWedding();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-t-purple-500 border-b-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* //* Hero section   */}

      <div
        className={`min-h-[93vh] bg-gradient-to-r from-indigo-600 to-indigo-400 bg-cover bg-center bg-no-repeat brightness-70`}
        style={{
          backgroundImage: `url(${"https://html.kodesolution.com/2024/lovebite-php/images/banner/4.jpg"})`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 md:py-24 lg:px-12">
          <div className="flex flex-col items-center justify-center py-32">
            <h1 className="my-4 text-center text-lg font-bold tracking-wide text-white sm:text-xl md:text-lg lg:text-8xl">
              Welcome to Our Planner Wedding
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-center text-2xl text-gray-100">
              Plan your dream wedding with ease. Explore expert tips,
              inspiration, and real stories from couples and professionals to
              help you every step of the way.
            </p>
            {}
            <Link
              to={user ? "/create-event" : "/signin"}
              className="my-5 rounded-full bg-gray-100 px-5 py-2 text-xl font-medium text-indigo-500 capitalize duration-300 hover:bg-gray-50"
            >
              {user ? "Create Wedding" : "browser all weddings"}
              <FiArrowRightCircle className="ml-2 inline-block h-7 w-7" />
            </Link>
          </div>
        </div>
      </div>

      {/* //* feature section */}
      <section id="feature">
        <div className="mx-auto max-w-7xl pt-28">
          <div className="flex justify-center text-center">
            <p className="text-2xl font-medium text-gray-900">
              {" "}
              <GiDiamondRing className="inline-block text-pink-500" />
              Featured Weddings
            </p>
          </div>
          {/* //* featured Article */}
          <div className="grid grid-cols-1 gap-5 py-10 md:grid-cols-2 lg:grid-cols-3">
            {allWedding.length > 0
              ? allWedding.map((eventWedd) => (
                  <EventCard eventWedd={eventWedd} key={eventWedd.id} />
                ))
              : "nothign foud"}
          </div>
        </div>
      </section>

      <section
        className="relative my-22 min-h-screen bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(https://html.kodesolution.com/2024/lovebite-php/images/background/5.jpg)`,
        }}
      >
        <div className="absolute inset-0 h-full bg-indigo-50/20 bg-gradient-to-r from-black to-transparent opacity-50"></div>

        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <div className="mx-auto mt-32 w-full lg:max-w-3xl">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              className="mx-auto max-w-3xl"
              autoplay={{ delay: 4000 }}
              loop
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="rounded-md border border-white bg-white/10 p-8 text-center text-white backdrop-blur-md">
                    <div className="mx-auto block w-20 overflow-hidden rounded-full border-4 border-white">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <p className="mt-6 text-lg font-light">{t.text}</p>
                    <p className="mt-4 font-semibold text-white">– {t.name}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
