import React, { useEffect, useEffectEvent } from 'react'
import HeroSection from '../../components/landing/HeroSection'
import AboutSection from '../../components/landing/AboutSection'
import ServicesOverview from '../../components/landing/ServicesOverview'
import FAQ from '../../components/landing/faq'
import ContactUs from '../../components/landing/ContactUs'
import Footer from '../../components/layout/Footer'



const LandingPage = () => {
  let havePaid = false;
  if(!havePaid){
    return(
      <div className='text-red-600 font-extrabold justify-center flex items-center h-[100vh] text-center flex-col px-7'>
        <div className='mb-2 border-red-600 border-[1px] px-4 py-3 rounded-lg'>Error 404</div>
      <div className=' text-[clamp(2rem,6vw,4.5rem)] '>Oops an Error has occurred. Come back later!!! </div>
      </div>
    )
  }

  return (
    <div>
    <HeroSection />
    <AboutSection />
    <ServicesOverview />
    <FAQ />
    <ContactUs />
    <Footer/>
    </div>
  )
}

export default LandingPage