import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="fixed inset-0 overflow-y-auto pt-3 mt-10 bg-slate-50">
      <div className="min-h-full flex flex-col">
        {/* Main Content */}
        <div className="flex-1 px-4 py-12 sm:px-6">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-center">
            <div className="space-y-5 lg:w-1/2">
              <h1 className="text-3xl font-bold text-slate-900">
                About FindMyTurf
              </h1>
              <p className="text-sm leading-relaxed text-slate-600">
                FindMyTurf is a modern sports booking platform that connects players
                with high-quality turfs and arenas across the city. From football
                and cricket to multi-sport facilities, we help you discover
                verified venues with real-time availability and seamless booking.
              </p>
              <p className="text-sm leading-relaxed text-slate-600">
                Our mission is simple: make it effortless to book, manage and play.
                Owners get powerful tools to manage courts, slots and bookings,
                while players enjoy a smooth, mobile-friendly experience.
              </p>
            </div>

            <div className="lg:w-1/2">
              <div className="h-64 w-full overflow-hidden rounded-3xl bg-slate-900 shadow-lg">
                <div className="h-full w-full bg-[url('https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=800')] bg-cover bg-center hover:scale-105 transition-transform duration-300">
                  <div className="flex h-full w-full items-end bg-gradient-to-t from-black/70 to-black/10 p-6">
                    <p className="text-sm font-medium text-slate-50">
                      Built for sports communities, clubs and weekend warriors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}