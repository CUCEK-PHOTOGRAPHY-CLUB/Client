
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
    <div className="font-sans antialiased text-gray-900 relative">
      <div className="bg-black text-white relative">
        <div className="bg-stone-900 text-white font-sans relative">
          <Hero />
          <div id="work" className="min-h-screen text-center relative">
            {/* SEO: Permanent About Text for Indexing - Styled to match theme */}
            <section className="relative z-10 py-16 px-4 bg-black border-b border-white/10">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  About CUCEK Photography Club
                </h2>
                <p className="text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
                  CUCEK Photography Club is the official photography club of
                  Cochin University College of Engineering Kuttanad. We document
                  college events, student life, portraits, and creative photography
                  projects led by CUCEK students.
                </p>
              </div>
            </section>
            <AboutSection />
            {/* Events Section - Featured prominently */}
            <Event />
            {/* <OnamBanner /> */}
            <Gallery />
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