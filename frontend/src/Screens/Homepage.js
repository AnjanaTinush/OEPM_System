import React from 'react'
import { useLocation } from "react-router-dom";
import Navbar from '../Component/Navbar.js'

function Homepage() {

  const location = useLocation();

  return (
    <div>
       <Navbar/>
       <div className="inline-flex h-[982px] w-full flex-col items-start bg-white" >
      <div className="relative flex h-[4911px] flex-col items-center self-stretch pb-[2946px] pt-[982px]" >
        <div className="font-poppins absolute bottom-[532px] left-16 flex h-80 w-48 flex-shrink-0 rounded-3xl text-left leading-9 text-white" >
          <div className="flex h-full w-full flex-shrink-0 flex-col items-start overflow-clip rounded-3xl bg-white" >
            <div className="mb-[-200.47px] mr-0 flex h-[518px] w-96 flex-shrink-0 flex-col items-center gap-y-10 bg-red-500 pb-64 pl-6 pr-8 pt-9" >
              <div className="flex flex-col items-center justify-center self-stretch" >
                <div className="flex items-center self-stretch text-2xl font-medium leading-9 tracking-[-1.1px]" >
                  Paprica
                </div>
                <div className="flex h-3 flex-shrink-0 items-end self-stretch text-lg font-[275] leading-9 tracking-[-0.45px]" >
                  <div className="mb-0 flex flex-grow items-center self-stretch" >
                    Plant
                  </div>
                </div>
              </div>
              <div className="flex h-28 flex-shrink-0 items-center self-stretch px-px" >
                <div className="bg-paprika-bell-pepper-vegetable-cherry-tomato-grocery-store-acorn-squash-removebg-preview-1 w-36 flex-shrink-0 self-stretch bg-cover bg-center" />
              </div>
            </div>
          </div>
        </div>
        <div className="font-poppins absolute bottom-20 left-16 flex h-80 w-48 flex-shrink-0 rounded-3xl text-left leading-9 text-white" >
          <div className="flex h-full w-full flex-shrink-0 flex-col items-start overflow-clip rounded-3xl bg-white" >
            <div className="mb-[-200.47px] mr-0 flex h-[518px] w-96 flex-shrink-0 flex-col items-start gap-y-1 bg-red-400 pb-56 pl-6 pr-8 pt-24" >
              <div className="flex items-center self-stretch text-2xl font-medium leading-9 tracking-[-1.1px]" >
                Radicchio
              </div>
              <div className="flex w-32 items-center text-lg font-[275] leading-9 tracking-[-0.45px]" >
                Plant
              </div>
              <div className="flex h-32 flex-shrink-0 items-end self-stretch px-2.5 pt-2.5" >
                <div className="bg-image-25 w-28 flex-shrink-0 self-stretch bg-cover bg-center" />
              </div>
            </div>
          </div>
        </div>
        <div className="font-poppins absolute bottom-20 right-16 flex h-80 w-[1085px] flex-shrink-0 items-center justify-center gap-x-24 text-left leading-9 text-white" >
          <div className="flex h-80 w-48 flex-shrink-0 rounded-3xl">
            <div className="flex h-full w-full flex-shrink-0 flex-col items-start overflow-clip rounded-3xl bg-white" >
              <div className="mb-[-200.47px] mr-0 flex h-[518px] w-96 flex-shrink-0 flex-col items-start gap-y-1 bg-red-300 py-24 pl-6 pr-8" >
                <div className="flex items-center self-stretch text-2xl font-medium leading-9 tracking-[-1.1px]" >
                  Radicchio
                </div>
                <div className="flex w-32 items-center text-lg font-[275] leading-9 tracking-[-0.45px]" >
                  Plant
                </div>
                <img
                  className="h-28 w-36 flex-shrink-0 object-cover object-center"
                  src="/assets/_radish-png-raphanus-sativus-png-transparent-png-removebg-preview-1.png"
                 />
              </div>
            </div>
          </div>
          <div className="flex w-52 flex-shrink-0 items-center justify-end self-stretch pt-0.5" >
            <div className="flex h-80 w-48 flex-shrink-0 rounded-3xl">
              <div className="flex h-full w-full flex-shrink-0 flex-col items-start overflow-clip rounded-3xl bg-white" >
                <div className="mb-[-200.47px] mr-0 flex h-[518px] w-96 flex-shrink-0 flex-col items-start gap-y-1 bg-pink-300 pb-56 pl-6 pr-8 pt-24" >
                  <div className="flex items-center self-stretch text-2xl font-medium leading-9 tracking-[-1.1px]" >
                    Red cabbage
                  </div>
                  <div className="flex w-32 items-center text-lg font-[275] leading-9 tracking-[-0.45px]" >
                    Plant
                  </div>
                  <div className="flex h-32 flex-shrink-0 items-end self-stretch px-px pt-2" >
                    <div className="bg-_red-cabbage-png-red-cabbage-image-png-transparent-removebg-preview-1 w-36 flex-shrink-0 self-stretch bg-cover bg-center" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-52 flex-shrink-0 items-center justify-end self-stretch" >
            <div className="flex h-80 w-48 flex-shrink-0 rounded-3xl">
              <div className="flex h-full w-full flex-shrink-0 flex-col items-start overflow-clip rounded-3xl bg-white" >
                <div className="mb-[-200.47px] mr-0 flex h-[518px] w-96 flex-shrink-0 flex-col items-start gap-y-1 bg-pink-500 pb-56 pl-6 pr-8 pt-24" >
                  <div className="flex items-center self-stretch text-2xl font-medium leading-9 tracking-[-1.1px]" >
                    Rhubarb
                  </div>
                  <div className="flex w-32 items-center text-lg font-[275] leading-9 tracking-[-0.45px]" >
                    Plant
                  </div>
                  <div className="flex h-28 flex-shrink-0 items-center self-stretch px-px" >
                    <div className="bg-image-26 w-36 flex-shrink-0 self-stretch bg-cover bg-center" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-80 w-48 flex-shrink-0 rounded-3xl">
            <div className="flex h-full w-full flex-shrink-0 flex-col items-start overflow-clip rounded-3xl bg-white" >
              <div className="mb-[-200.47px] mr-0 flex h-[518px] w-96 flex-shrink-0 flex-col items-start gap-y-1 bg-lime-600 pb-56 pl-6 pr-8 pt-24" >
                <div className="flex items-center self-stretch text-2xl font-medium leading-9 tracking-[-1.1px]" >
                  Romanesco
                </div>
                <div className="flex w-32 items-center text-lg font-[275] leading-9 tracking-[-0.45px]" >
                  Plant
                </div>
                <div className="flex h-32 flex-shrink-0 items-end self-stretch px-3 pt-3" >
                  <div className="bg-image-27 w-36 flex-shrink-0 self-stretch bg-cover bg-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[532px] right-16 flex h-80 w-[1085px] flex-shrink-0 flex-wrap items-start justify-center gap-x-24 gap-y-24 pt-2 min-[1502.300000011921px]:flex-nowrap" >
          <div className="flex flex-grow items-center justify-center self-stretch" >
            <div className="flex flex-grow items-end justify-center self-stretch" >
              <div className="font-poppins flex w-48 flex-shrink-0 flex-col items-center justify-center self-stretch pb-[0.47px] text-left leading-9 text-white" >
                <div className="flex h-80 w-48 flex-shrink-0 rounded-3xl">
                  <div className="flex h-full w-full flex-shrink-0 flex-col items-start overflow-clip rounded-3xl bg-white" >
                    <div className="mb-[-200.47px] mr-0 flex h-[518px] w-96 flex-shrink-0 flex-col items-start gap-y-9 bg-yellow-500 pb-64 pl-3.5 pr-11 pt-10" >
                      <div className="flex flex-col items-center justify-center self-stretch" >
                        <div className="flex items-center self-stretch text-2xl font-medium leading-9 tracking-[-1.1px]" >
                          Peas
                        </div>
                        <div className="flex h-3 flex-shrink-0 items-end self-stretch text-lg font-[275] leading-9 tracking-[-0.45px]" >
                          <div className="mb-0 flex flex-grow items-center self-stretch" >
                            Plant
                          </div>
                        </div>
                      </div>
                      <div className="flex h-28 flex-shrink-0 items-center self-stretch px-3" >
                        <div className="bg-removebg-preview-1 max-h-full w-36 max-w-full flex-shrink-0 self-stretch bg-no-repeat [background-position:0px_0px] [background-size:100%_100%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-inter flex w-[562px] flex-shrink-0 flex-col items-end justify-end text-right text-5xl font-semibold leading-tight tracking-[2.4px] text-black" >
                <div className="mr-0 flex justify-end self-stretch">
                  CHECK OUR PRODUCTS?
                </div>
              </div>
              <div className="font-poppins flex w-0 flex-shrink-0 items-center self-stretch pb-[0.47px] pr-0 text-left leading-9 text-white" >
                <div className="ml-[-447.11px] flex h-80 w-48 flex-shrink-0 rounded-3xl" >
                  <div className="flex h-full w-full flex-shrink-0 flex-col items-start overflow-clip rounded-3xl bg-white" >
                    <div className="mb-[-200.47px] mr-0 flex h-[518px] w-96 flex-shrink-0 flex-col items-center gap-y-9 bg-lime-700 pb-64 pl-6 pr-8 pt-10" >
                      <div className="flex flex-col items-center justify-center self-stretch" >
                        <div className="flex items-center self-stretch text-2xl font-medium leading-9 tracking-[-1.1px]" >
                          Pole beans
                        </div>
                        <div className="flex h-3 flex-shrink-0 items-end self-stretch text-lg font-[275] leading-9 tracking-[-0.45px]" >
                          <div className="mb-0 flex flex-grow items-center self-stretch" >
                            Plant
                          </div>
                        </div>
                      </div>
                      <div className="flex h-28 flex-shrink-0 items-center self-stretch px-px" >
                        <div className="bg-product_romano_bean-removebg-preview-1 w-36 flex-shrink-0 self-stretch bg-cover bg-center" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="font-poppins flex w-12 flex-shrink-0 flex-col items-end justify-center self-stretch text-left leading-9 text-white" >
              <div className="mr-0 flex h-80 w-48 flex-shrink-0 rounded-3xl">
                <div className="flex h-full w-full flex-shrink-0 flex-col items-start overflow-clip rounded-3xl bg-white" >
                  <div className="mb-[-200.47px] mr-0 flex h-[518px] w-96 flex-shrink-0 flex-col items-start bg-yellow-500 pb-64 pl-3 pr-11 pt-11" >
                    <div className="flex flex-col items-center justify-center self-stretch" >
                      <div className="flex items-center self-stretch text-2xl font-medium leading-9 tracking-[-1.1px]" >
                        Potatoes
                      </div>
                      <div className="flex h-3 flex-shrink-0 items-end self-stretch px-px text-lg font-[275] leading-9 tracking-[-0.45px]" >
                        <div className="mb-0 flex flex-grow items-center self-stretch" >
                          Plant
                        </div>
                      </div>
                    </div>
                    <div className="flex h-36 flex-shrink-0 items-center self-stretch px-3.5" >
                      <div className="bg-image-23 w-36 flex-shrink-0 self-stretch bg-cover bg-center" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="font-poppins flex h-80 w-48 flex-shrink-0 flex-col items-center justify-center text-left leading-9 text-white" >
            <div className="mb-[-7px] flex h-80 w-48 flex-shrink-0 rounded-3xl" >
              <div className="flex h-full w-full flex-shrink-0 flex-col items-start overflow-clip rounded-3xl bg-white" >
                <div className="mb-[-200.47px] mr-0 flex h-[518px] w-96 flex-shrink-0 flex-col items-start gap-y-11 bg-yellow-300 pb-52 pl-4 pr-10 pt-12" >
                  <div className="flex flex-col items-center justify-center self-stretch" >
                    <div className="flex items-center self-stretch text-2xl font-medium leading-9 tracking-[-1.1px]" >
                      Potatoes
                    </div>
                    <div className="flex h-3 flex-shrink-0 items-end self-stretch text-lg font-[275] leading-9 tracking-[-0.45px]" >
                      <div className="mb-0 flex flex-grow items-center self-stretch" >
                        Plant
                      </div>
                    </div>
                  </div>
                  <div className="flex h-40 flex-shrink-0 items-center self-stretch px-6" >
                    <div className="bg-image-24 max-h-full w-36 max-w-full flex-shrink-0 self-stretch bg-no-repeat [background-position:0px_0px] [background-size:197%_127%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[983px] flex-shrink-0 bg-white/85" />
        <div className="absolute inset-x-0 bottom-[982px] flex h-[983px] flex-shrink-0 flex-col items-center gap-y-32 border border-solid border-black bg-white pb-52 pl-24 pr-20 pt-20 text-center font-light text-black" >
          <div className="font-inter flex items-center justify-center pr-4 text-[56px] leading-tight tracking-[2.4px]" >
            CONTACT US
          </div>
          <div className="font-poppins flex h-[500px] flex-shrink-0 items-center justify-center gap-x-12 self-stretch text-sm leading-[normal] tracking-[1.28px]" >
            <div className="flex w-[542px] flex-shrink-0 flex-col items-center justify-center pt-3" >
              <div className="flex flex-grow items-center justify-center self-stretch" >
                <span>
                  At PolyCrop, we're dedicated to revolutionizing agriculture through innovation and sustainability. With decades of combined experience in polytunnel farming, our passionate team is at the forefront of agricultural technology, constantly exploring new ways to empower farmers and nurture the planet. Our deep-rooted commitment to sustainability drives us to develop advanced solutions that not only increase productivity and profitability but also promote environmental stewardship.
                  <span className="mb-1">
                    <br />
                  </span>
                  At PolyCrop, we believe that success in agriculture goes hand in hand with sustainability. That's why we're not only focused on improving yields and efficiency but also on minimizing environmental impact and preserving natural resources for future generations. By harnessing the power of innovation and sustainability, we're committed to shaping the future of farming and creating a healthier, more sustainable world for all.
                </span>
              </div>
            </div>
            <div className="bg-firefly-polytunnel-workers-working-in-several-polytunnels-415931 w-[750px] flex-shrink-0 self-stretch rounded-3xl bg-cover bg-center" />
          </div>
        </div>
        <div className="absolute inset-x-0 inset-y-[1964px] flex flex-col items-center gap-y-40 border border-solid border-black bg-white pb-44 pl-24 pr-16 pt-20 text-center font-light text-black" >
          <div className="font-inter flex items-center justify-center pr-5 text-[56px] leading-tight tracking-[2.4px]" >
            WHAT WE DO
          </div>
          <div className="font-poppins flex h-[501px] flex-shrink-0 items-start justify-center gap-x-14 self-stretch pt-px text-sm leading-[normal] tracking-[1.28px]" >
            <div className="bg-firefly-polytunnel-men-working-in-alandscape-299871 w-[750px] flex-shrink-0 self-stretch rounded-3xl bg-cover bg-center" />
            <div className="flex w-[542px] flex-shrink-0 flex-col items-center justify-center" >
              <div className="flex flex-grow items-center justify-center self-stretch" >
                <span>
                  At PolyCrop, we're dedicated to revolutionizing agriculture through innovation and sustainability. With decades of combined experience in polytunnel farming, our passionate team is at the forefront of agricultural technology, constantly exploring new ways to empower farmers and nurture the planet. Our deep-rooted commitment to sustainability drives us to develop advanced solutions that not only increase productivity and profitability but also promote environmental stewardship.
                  <span className="mb-1">
                    <br />
                  </span>
                  At PolyCrop, we believe that success in agriculture goes hand in hand with sustainability. That's why we're not only focused on improving yields and efficiency but also on minimizing environmental impact and preserving natural resources for future generations. By harnessing the power of innovation and sustainability, we're committed to shaping the future of farming and creating a healthier, more sustainable world for all.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex h-[983px] flex-shrink-0 flex-col items-center gap-y-36 self-stretch border border-solid border-black bg-white pb-44 pl-28 pr-16 pt-20 text-center font-light text-black" >
          <div className="font-inter flex items-center justify-center self-stretch text-[56px] leading-tight tracking-[2.4px]" >
            <div className="flex items-center justify-center self-stretch pr-10" >
              ABOUT US
            </div>
          </div>
          <div className="font-poppins flex h-[500px] flex-shrink-0 items-center justify-center gap-x-9 self-stretch text-sm leading-[normal] tracking-[1.28px]" >
            <div className="flex w-[542px] flex-shrink-0 flex-col items-center justify-center pb-1" >
              <div className="flex flex-grow items-center justify-center self-stretch" >
                <span>
                  At PolyCrop, we're dedicated to revolutionizing agriculture through innovation and sustainability. With decades of combined experience in polytunnel farming, our passionate team is at the forefront of agricultural technology, constantly exploring new ways to empower farmers and nurture the planet. Our deep-rooted commitment to sustainability drives us to develop advanced solutions that not only increase productivity and profitability but also promote environmental stewardship.
                  <span className="mb-1">
                    <br />
                  </span>
                  At PolyCrop, we believe that success in agriculture goes hand in hand with sustainability. That's why we're not only focused on improving yields and efficiency but also on minimizing environmental impact and preserving natural resources for future generations. By harnessing the power of innovation and sustainability, we're committed to shaping the future of farming and creating a healthier, more sustainable world for all.
                </span>
              </div>
            </div>
            <div className="bg-firefly-polytunnel-men-and-women-workers-in-gardnening-clothes-posing-to-agroup-photo-in-alandscap-1 w-[750px] flex-shrink-0 self-stretch rounded-3xl bg-cover bg-center" />
          </div>
        </div>
        <div className="font-poppins bg-firefly-agricultural-polytunnels-from-outside-914781 absolute inset-x-[0.15px] top-0 flex h-[982px] flex-shrink-0 flex-col items-start justify-center gap-y-2 bg-cover bg-center px-12 pb-96 pt-80 text-left leading-normal text-white" >
          <div className="self-stretch text-[99px] font-semibold leading-normal tracking-wider" >
            PolyCrop
          </div>
          <div className="flex items-center pl-1 text-[22px] font-light leading-normal tracking-widest" >
            Online Enclosed Polytunnel System
          </div>
          <div className="flex h-20 w-52 flex-shrink-0 flex-col items-center justify-end pl-1 pt-8 text-xl font-normal leading-normal tracking-[1.12px]" >
            <div className="flex h-11 flex-shrink-0 items-center justify-center self-stretch" >
              <div className="flex-grow self-stretch rounded-3xl border-[0.37px] border-solid border-neutral-200 bg-neutral-300/[0.08]" />
              <div className="flex w-0 flex-shrink-0 items-center">
                <div className="mr-[-104px] flex-grow">More Info</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="font-inter flex h-0 items-end justify-center self-stretch px-[668px] pb-0 text-center text-base font-light leading-tight tracking-[2.4px] text-white" >
        <div className="mb-0 flex h-12 w-44 flex-shrink-0 flex-col items-center justify-center pr-px" >
          <div className="ml-[3px] mr-0.5 flex-grow self-stretch rounded-[55px] bg-lime-800/[0.93]" />
          <div className="flex h-2.5 flex-shrink-0 flex-col items-center justify-center self-stretch" >
            <div className="mb-[-29px] flex flex-grow justify-center self-stretch" >
              SHOP NOW!
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-0 items-end justify-center self-stretch pb-0">
        <img
          className="mt-2 h-20 w-24 flex-shrink-0 object-cover object-center"
          src="/assets/final-font-coloured-transparent-square-2.png"
         />
      </div>
    </div>

    </div>
  )
}

export default Homepage