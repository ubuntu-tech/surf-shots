'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Camera, Users, Waves, Award } from 'lucide-react'

const AboutPage = () => {
  return (
    <main className="bg-white">
      <section className="relative h-[60vh] min-h-[400px] w-full bg-oceanBlue overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
        {/* <HeroBackground /> */}
        <Image
          src="/hero-image.avif"
          alt="Surfer at sunset"
          className="object-cover"
          fill
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-primary mb-4">
            Connecting Waves <br />with Stories
          </h1>
          <p className="text-xl text-seaFoam font-secondary max-w-2xl">
            Where perfect moments meet their perfect audience. We&apos;re building the bridge between surf photographers and wave riders.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-white to-seaFoam/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-oceanBlue font-primary mb-6">
                Our Mission
              </h2>
              <p className="text-slate font-secondary text-lg mb-6">
                At Snapline, we believe every perfect wave deserves to be captured and shared. We&apos;re here to empower photographers and surfers alike, creating a marketplace where ocean moments become lasting memories.
              </p>
              <Link 
                href="/discover"
                className="inline-flex items-center px-6 py-3 bg-sunsetGold text-white font-primary font-semibold rounded-lg hover:bg-sunsetGold/90 transition-all duration-200"
              >
                Discover Shots
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://media.audubon.org/groom_beach-1.jpg?width=1616&auto=webp&quality=90&fit=bounds&disable=upscale"
                alt="Surf photographer in action"
                className="object-cover rounded-lg shadow-xl"
                fill
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-oceanBlue font-primary text-center mb-16">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg bg-white shadow-lg border border-seaFoam">
              <div className="w-12 h-12 bg-sunsetGold/10 rounded-full flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-sunsetGold" />
              </div>
              <h3 className="text-xl font-bold text-oceanBlue font-primary mb-2">
                Authenticity
              </h3>
              <p className="text-slate font-secondary">
                True to surf culture, genuine community connections, real moments, real stories.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg border border-seaFoam">
              <div className="w-12 h-12 bg-sunsetGold/10 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-sunsetGold" />
              </div>
              <h3 className="text-xl font-bold text-oceanBlue font-primary mb-2">
                Quality
              </h3>
              <p className="text-slate font-secondary">
                Professional photography standards, high-quality user experience, excellence in service.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg border border-seaFoam">
              <div className="w-12 h-12 bg-sunsetGold/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-sunsetGold" />
              </div>
              <h3 className="text-xl font-bold text-oceanBlue font-primary mb-2">
                Community
              </h3>
              <p className="text-slate font-secondary">
                Supporting photographers, connecting surfers, building lasting relationships.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg border border-seaFoam">
              <div className="w-12 h-12 bg-sunsetGold/10 rounded-full flex items-center justify-center mb-4">
                <Waves className="w-6 h-6 text-sunsetGold" />
              </div>
              <h3 className="text-xl font-bold text-oceanBlue font-primary mb-2">
                Innovation
              </h3>
              <p className="text-slate font-secondary">
                Modern marketplace solutions, technical excellence, forward-thinking approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 bg-oceanBlue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white font-primary mb-6">
            Join the Lineup
          </h2>
          <p className="text-seaFoam font-secondary text-lg mb-8 max-w-2xl mx-auto">
            Whether you&apos;re capturing waves or riding them, Snapline is your platform to connect, share, and celebrate the surf community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/photographers"
              className="px-6 py-3 bg-sunsetGold text-white font-primary font-semibold rounded-lg hover:bg-sunsetGold/90 transition-all duration-200"
            >
              I&apos;m a Photographer
            </Link>
            <Link 
              href="/discover"
              className="px-6 py-3 bg-white text-oceanBlue font-primary font-semibold rounded-lg hover:bg-seaFoam transition-all duration-200"
            >
              I&apos;m a Surfer
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
