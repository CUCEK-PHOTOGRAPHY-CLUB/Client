
import Gallery from "../componets/home/Gallery"
import Join from "../componets/home/Join"
import Testimonials from "../componets/home/Testimonials"
import Hero from "../componets/home/Hero"
import Event from "../componets/home/Event"
import Team from "../componets/home/Team"
import AboutSection from "../componets/home/About"
import SocialFeed from "../componets/home/SocialFeed"
import OnamBanner from "../componets/banners/OnamBanner"
// 1. Import your new EventTeaser component
import EventTeaser from "../componets/EventTeaser"


function Home() {
  return (
    <div className="font-sans antialiased text-gray-900 relative">
      <div className="bg-black text-white relative">
        <div className="bg-stone-900 text-white font-sans relative">
          <Hero />
          <div id="work" className="min-h-screen text-center relative">
            <AboutSection />
            {/* 2. Add the Halloween Contest section here */}
            <EventTeaser />
            <OnamBanner />
            <Gallery />
            <Event />
            <Team />
            <Testimonials />
            <SocialFeed />
            <Join />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home