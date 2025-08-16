
import Gallery from "../componets/home/Gallery"
import Join from "../componets/home/Join"
import Testimonials from "../componets/home/Testimonials"
import Hero from "../componets/home/Hero"
import Event from "../componets/home/Event"
import Team from "../componets/home/Team"
import AboutSection from "../componets/home/About"
import SocialFeed from "../componets/home/SocialFeed"

function Home() {
  return (
    <div className="font-sans antialiased text-gray-900 ">
      <div className="bg-black text-white">
        <div className="bg-stone-900 text-white font-sans">
          <Hero />
          <div id="work" className="min-h-screen text-center">
            <AboutSection />
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