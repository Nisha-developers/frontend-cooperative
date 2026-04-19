import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { TbCurrencyNaira } from "react-icons/tb";
import {
  RiMapPinLine,
  RiHeartLine,
  RiHeartFill,
  RiGroupLine,
  RiBankLine,
  RiCheckboxCircleLine,
  RiWallet3Line,
  RiCalendarLine,
  RiPlantLine,
  RiRulerLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { PiMapTrifoldLight } from "react-icons/pi";
import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';
import {
  AnimateOnScroll,
  StaggerWrapper,
  StaggerItem,
  fadeUp,
  fadeLeft,
} from '../../animations/AnimateOnScroll.jsx';
import { useSale } from '../../context/SaleContext.jsx';

const EASE = [0.22, 1, 0.36, 1];

const LandBenefits = () => (
  <AnimateOnScroll variant={fadeUp} delay={0.1} duration={0.6}>
    <div className="bg-[#FDF6EC] rounded-2xl p-6 mb-8 border border-[#F57C00]/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-[#003000] rounded-xl">
          <PiMapTrifoldLight className="text-white text-2xl" />
        </div>
        <h2 className="text-xl font-bold text-[#003000]">Why Buy Land With Us?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: <RiCheckboxCircleLine className="text-[#F57C00] text-xl flex-shrink-0 mt-1" />,
            title: "Verified Titles",
            desc: "All land listings come with verified C of O or governor's consent",
          },
          {
            icon: <RiGroupLine className="text-[#F57C00] text-xl flex-shrink-0 mt-1" />,
            title: "Cooperative Installment",
            desc: "Spread payment over months with 0% interest via cooperative",
          },
          {
            icon: <RiPlantLine className="text-[#F57C00] text-xl flex-shrink-0 mt-1" />,
            title: "Appreciate Over Time",
            desc: "Land is a solid long-term investment that grows in value",
          },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            {item.icon}
            <div>
              <h3 className="font-semibold text-[#003000]">{item.title}</h3>
              <p className="text-sm text-[#2E7D32]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AnimateOnScroll>
);

const LandCard = ({ land }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showInstallment, setShowInstallment] = useState(false);

  const totalPrice = Number(land.price);
  const monthlyInstallment =
    land.installment_duration_months && totalPrice
      ? (totalPrice / land.installment_duration_months).toFixed(2)
      : null;

  const areaSqm = Number(land.area_sqm);
  const areaHectares = (areaSqm / 10000).toFixed(2);
  const areaPlots = (areaSqm / 648).toFixed(1); // 1 plot ≈ 648 sqm (Nigerian standard)

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden group"
      whileHover={{ y: -6, boxShadow: "0 24px 48px -8px rgba(0,0,0,0.18)" }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {/* Visual Header */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] flex items-center justify-center">
        {/* Decorative land pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${land.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#003000" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${land.id})`} />
          </svg>
        </div>
        <PiMapTrifoldLight className="text-[#003000] text-7xl opacity-20 relative z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Like Button */}
        <motion.button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            key={isLiked ? "liked" : "unliked"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {isLiked ? (
              <RiHeartFill className="text-[#F57C00] text-xl" />
            ) : (
              <RiHeartLine className="text-gray-400 text-xl" />
            )}
          </motion.span>
        </motion.button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <div className="px-2 py-1 bg-[#003000] text-white text-xs font-semibold rounded-full">
            Land
          </div>
          {land.allows_installment && (
            <div className="px-2 py-1 bg-[#F57C00] text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <RiGroupLine className="text-xs" />
              <span>Installment</span>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${
              land.status === 'available'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {land.status}
          </span>
        </div>

        {/* Area display on image */}
        <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-white text-xs font-bold">
            {areaSqm.toLocaleString()} sqm
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#003000] mb-1 capitalize">{land.title}</h3>
        <p className="text-xs text-[#F57C00] uppercase tracking-wider mb-3 font-semibold">
          Land / Plot
        </p>

        {/* Location */}
        <div className="flex items-start gap-2 mb-4">
          <RiMapPinLine className="text-[#F57C00] text-lg flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#2E7D32]">
            {land.address}, {land.city}, {land.state}
          </p>
        </div>

        {/* Land Specs — sqm / hectares / plots */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#FDF6EC] flex-wrap">
          <div className="flex items-center gap-1">
            <RiRulerLine className="text-[#F57C00] text-sm" />
            <span className="text-xs font-medium text-[#003000]">
              {areaSqm.toLocaleString()} sqm
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#2E7D32]" />
          <span className="text-xs font-medium text-[#003000]">{areaHectares} ha</span>
          <div className="w-1 h-1 rounded-full bg-[#2E7D32]" />
          <span className="text-xs font-medium text-[#003000]">~{areaPlots} plots</span>
        </div>

        {/* Description */}
        {land.description && (
          <div className="pb-4 text-sm text-gray-400 leading-relaxed border-l-2 border-[#F57C00] pl-3 mb-4 break-words">
            {land.description}
          </div>
        )}

        {/* Payment Toggle — only if installment allowed */}
        {land.allows_installment && (
          <div className="flex gap-2 mb-4">
            <motion.button
              onClick={() => setShowInstallment(false)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                !showInstallment
                  ? 'bg-[#003000] text-white'
                  : 'bg-[#FDF6EC] text-[#003000]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Full Payment
            </motion.button>
            <motion.button
              onClick={() => setShowInstallment(true)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                showInstallment
                  ? 'bg-[#F57C00] text-white'
                  : 'bg-[#FDF6EC] text-[#003000]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Installment
            </motion.button>
          </div>
        )}

        {/* Price Details */}
        <div className="space-y-3 mb-5">
          {(!land.allows_installment || !showInstallment) ? (
            // Full Payment
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#FDF6EC] rounded-lg">
                  <RiBankLine className="text-[#F57C00] text-sm" />
                </div>
                <span className="text-sm text-[#2E7D32]">Total Price</span>
              </div>
              <div className="flex items-center text-base font-bold text-[#003000]">
                <TbCurrencyNaira />
                {totalPrice.toLocaleString()}
                <span className="text-xs text-[#2E7D32] ml-1 font-normal">one-time</span>
              </div>
            </div>
          ) : (
            // Installment Plan
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#FDF6EC] rounded-lg">
                    <RiMoneyDollarCircleLine className="text-[#F57C00] text-sm" />
                  </div>
                  <span className="text-sm text-[#2E7D32]">Total Price</span>
                </div>
                <div className="flex items-center text-sm font-bold text-[#003000]">
                  <TbCurrencyNaira />
                  {totalPrice.toLocaleString()}
                </div>
              </div>

              {land.minimum_initial_deposit && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-[#FDF6EC] rounded-lg">
                      <RiWallet3Line className="text-[#F57C00] text-sm" />
                    </div>
                    <span className="text-sm text-[#2E7D32]">Initial Deposit</span>
                  </div>
                  <div className="flex items-center text-sm font-bold text-[#003000]">
                    <TbCurrencyNaira />
                    {Number(land.minimum_initial_deposit).toLocaleString()}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-[#FDF6EC]">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#F57C00] rounded-lg">
                    <RiCalendarLine className="text-white text-sm" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#003000]">Monthly</span>
                    <p className="text-xs text-[#2E7D32]">
                      over {land.installment_duration_months} months
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-base font-bold text-[#F57C00]">
                    <TbCurrencyNaira />
                    {Number(monthlyInstallment).toLocaleString()}
                  </div>
                  <span className="text-xs text-[#2E7D32]">0% interest</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        <motion.button
          className={`w-full py-3 font-semibold rounded-xl shadow-lg text-white ${
            land.allows_installment && showInstallment
              ? 'bg-[#F57C00] hover:bg-[#F57C00]/90'
              : 'bg-[#003000] hover:bg-[#003000]/90'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          {land.allows_installment && showInstallment
            ? 'Join Cooperative & Pay Installment'
            : 'Purchase Land'}
        </motion.button>

        {land.allows_installment && showInstallment && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-2 text-xs text-[#2E7D32]"
          >
            New to cooperative?{' '}
            <button className="text-[#F57C00] font-semibold hover:underline">Join here</button>
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

const LandSection = () => {
  const { sales, viewDetails } = useSale();
  const [landDetails, setLandDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bg, setBg] = useState(false);

  useEffect(() => {
    setBg(true);
  }, []);

  useEffect(() => {
    if (sales.length === 0) return;

    const landIds = sales
      .filter((val) => val.property_type === 'land')
      .map((val) => val.id)
      .slice(0, 5);

    if (landIds.length === 0) {
      setLoading(false);
      return;
    }

    const getFullDetails = async () => {
      setLoading(true);
      const details = await Promise.all(landIds.map((id) => viewDetails(id)));
      setLandDetails(details.filter(Boolean));
      setLoading(false);
    };

    getFullDetails();
  }, [sales.length, viewDetails]);

  const totalLands = sales.filter((v) => v.property_type === 'land').length;

  return (
    <div className="space-y-6 mt-[6rem]">
      <div className="bg-[#003000]">
        <Navbar bgvar={bg} setbgvar={setBg} />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 px-5">
        <AnimateOnScroll variant={fadeLeft} delay={0.1} duration={0.6}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#003000] text-center mt-[10px]">
              Buy Land
            </h1>
            <p className="text-[#2E7D32] mt-1 text-center">
              Secure your future with verified land investments
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Benefits Banner */}
      <div className="px-5">
        <LandBenefits />
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-center text-[#2E7D32] py-10">Loading land listings...</p>
      ) : landDetails.length === 0 ? (
        <p className="text-center text-[#2E7D32] py-10">No land listings available.</p>
      ) : (
        <StaggerWrapper
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5"
          stagger={0.13}
          delay={0.15}
          amount={0.05}
        >
          {landDetails.map((land) => (
            <StaggerItem key={land.id} variant={fadeUp} duration={0.55}>
              <LandCard land={land} />
            </StaggerItem>
          ))}
        </StaggerWrapper>
      )}

      {/* View More — only if more than 5 */}
      {totalLands > 5 && (
        <AnimateOnScroll variant={fadeUp} delay={0.1} duration={0.6}>
          <div className="flex justify-center pt-4">
            <motion.button
              className="px-8 py-3 bg-white text-[#003000] font-semibold rounded-xl border-2 border-[#F57C00] hover:bg-[#F57C00] hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              View More Land Listings
            </motion.button>
          </div>
        </AnimateOnScroll>
      )}

      <Footer />
    </div>
  );
};

export default LandSection;