import React, { useState } from "react";
import Navbar from "./../Component/Navbar.js";
import first from "./../Images/home.jpg";
import Error from "./Curiorservice/Component/Error.js";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import axios from "axios";

AOS.init({
  duration: "2500",
});

function Homepage() {
  const FirstSection = () => {
    const [drivercode, setdrivercode] = useState("");
    const [error, seterror] = useState("");

    async function DLogin() {
      const driver = {
        drivercode,
      };
      
      try {
        const result = await axios.post('/api/drivers/dlogin', driver);
        localStorage.setItem('currentdriver', JSON.stringify(result));
        window.location.href = '/j_driverprofile'
        
      } catch (error) {
        console.log(error);
        seterror(true)
      }
      
    }
    
    
    

    return (
      <div>
        <div className="flex flex-col justify-center text-white bg-white ">
          <div
            className="bg-cover  bg-center min-h-screen bg-local"
            style={{ backgroundImage: `url(${first})` }}
          >
            <Navbar />

            <div className="flex overflow-hidden  flex-col items-start px-12 py-20 w-full min-h-screen max-h-screen max-md:px-5 max-md:max-w-full">
              <div
                data-aos="zoom in"
                className="relative mt-20 text-7xl font-semibold tracking-[5.93px] max-md:mt-10 max-md:max-w-full max-md:text-4xl"
              >
                PolyCrop
              </div>
              <div
                data-aos="zoom in"
                className="relative mt-7 text-2xl font-light tracking-[2.00px] max-md:max-w-full"
              >
                Online Enclosed Polytunnel System
              </div>
              <Link to="/c_displayitem">
                <button
                  data-aos="zoom out"
                  className="relative justify-center px-12 py-4 mt-10 text-xl tracking-widest text-center rounded-3xl border-solid bg-white bg-opacity-40 border-neutral-200 max-md:px-5 max-md:my-10"
                >
                  Shop Now
                </button>
              </Link>

              {/* Driver code input field */}
              <div>
                {error &&  (<Error message = 'Invalid driver code'/>)}
                <input
                  type="text"
                  placeholder="Enter Driver Code"
                  className=" ml-58 border-2 text-black border-gray-300 rounded-md px-4 py-2 mt-4 focus:outline-none focus:border-blue-500"
                  value={drivercode}
                  onChange={(e) => {
                    setdrivercode(e.target.value);
                  }}
                />

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md mt-4 cursor-pointer hover:bg-blue-600 transition duration-300"
                  onClick={DLogin}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SecondSection = () => {
    return (
      <div className="flex flex-col items-center p-10 border border-black border-solid border-opacity-10 bg-neutral-100 max-md:px-5">
        <div
          data-aos="fade-down"
          className="mt-4 text-6xl font-light text-center text-black leading-[67.76px] tracking-[8.37px] max-md:text-4xl"
        >
          ABOUT US
        </div>
        <div className="mt-40 w-full max-w-screen-xl max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
              <div
                data-aos="fade-right"
                className="self-stretch my-auto text-sm font-light tracking-wider text-center text-black max-md:mt-10 max-md:max-w-full"
              >
                At PolyCrop, we're dedicated to revolutionizing agriculture
                through innovation and sustainability. With decades of combined
                experience in polytunnel farming, our passionate team is at the
                forefront of agricultural technology, constantly exploring new
                ways to empower farmers and nurture the planet. Our deep-rooted
                commitment to sustainability drives us to develop advanced
                solutions that not only increase productivity and profitability
                but also promote environmental stewardship.
                <br />
                At PolyCrop, we believe that success in agriculture goes hand in
                hand with sustainability. That's why we're not only focused on
                improving yields and efficiency but also on minimizing
                environmental impact and preserving natural resources for future
                generations. By harnessing the power of innovation and
                sustainability, we're committed to shaping the future of farming
                and creating a healthier, more sustainable world for all.
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
              <img
                data-aos="fade-left"
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4d622133a43ab0cc99e038233d253bab041c7156630571c72a577406aa164c9f?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d622133a43ab0cc99e038233d253bab041c7156630571c72a577406aa164c9f?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d622133a43ab0cc99e038233d253bab041c7156630571c72a577406aa164c9f?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d622133a43ab0cc99e038233d253bab041c7156630571c72a577406aa164c9f?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d622133a43ab0cc99e038233d253bab041c7156630571c72a577406aa164c9f?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d622133a43ab0cc99e038233d253bab041c7156630571c72a577406aa164c9f?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d622133a43ab0cc99e038233d253bab041c7156630571c72a577406aa164c9f?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d622133a43ab0cc99e038233d253bab041c7156630571c72a577406aa164c9f?apiKey=81b6a3261fbd4c24a49b94053c58d498&"
                className="grow w-full aspect-[1.49] max-md:mt-9 max-md:max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ThirdSection = () => {
    return (
      <div className="flex flex-col p-20 border border-black border-solid border-opacity-10 bg-neutral-100 max-md:px-5">
        <div
          data-aos="fade-down"
          className="self-center mt-4 text-6xl font-light text-center text-black leading-[67.76px] tracking-[8.37px] max-md:max-w-full max-md:text-4xl"
        >
          WHAT WE DO
        </div>
        <div className="self-start mt-44 ml-3.5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
              <img
                data-aos="fade-right"
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/41367a29364329ed30522bceac0369b8a95152d47683e71734662a06b3a3c067?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/41367a29364329ed30522bceac0369b8a95152d47683e71734662a06b3a3c067?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/41367a29364329ed30522bceac0369b8a95152d47683e71734662a06b3a3c067?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/41367a29364329ed30522bceac0369b8a95152d47683e71734662a06b3a3c067?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/41367a29364329ed30522bceac0369b8a95152d47683e71734662a06b3a3c067?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/41367a29364329ed30522bceac0369b8a95152d47683e71734662a06b3a3c067?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/41367a29364329ed30522bceac0369b8a95152d47683e71734662a06b3a3c067?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/41367a29364329ed30522bceac0369b8a95152d47683e71734662a06b3a3c067?apiKey=81b6a3261fbd4c24a49b94053c58d498&"
                className="grow w-full aspect-[1.49] max-md:mt-10 max-md:max-w-full"
              />
            </div>
            <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
              <div
                data-aos="fade-left"
                className="self-stretch my-auto text-sm font-light tracking-wider text-center text-black max-md:mt-10 max-md:max-w-full"
              >
                At PolyCrop, we're dedicated to revolutionizing agriculture
                through innovation and sustainability. With decades of combined
                experience in polytunnel farming, our passionate team is at the
                forefront of agricultural technology, constantly exploring new
                ways to empower farmers and nurture the planet. Our deep-rooted
                commitment to sustainability drives us to develop advanced
                solutions that not only increase productivity and profitability
                but also promote environmental stewardship.
                <br />
                At PolyCrop, we believe that success in agriculture goes hand in
                hand with sustainability. That's why we're not only focused on
                improving yields and efficiency but also on minimizing
                environmental impact and preserving natural resources for future
                generations. By harnessing the power of innovation and
                sustainability, we're committed to shaping the future of farming
                and creating a healthier, more sustainable world for all.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FourthSection = () => {
    return (
      <div className="flex flex-col p-20 border border-black border-solid border-opacity-10 bg-neutral-100 max-md:px-5">
        <div
          data-aos="fade-down"
          className="self-center mt-4 text-6xl font-light text-center text-black leading-[67.76px] tracking-[8.37px] max-md:max-w-full max-md:text-4xl"
        >
          CONTACT US
        </div>
        <div className="mt-36 max-md:mt-10 max-md:mr-2 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
              <div
                data-aos="fade-right"
                className="self-stretch my-auto text-sm font-light tracking-wider text-center text-black max-md:mt-10 max-md:max-w-full"
              >
                At PolyCrop, we're dedicated to revolutionizing agriculture
                through innovation and sustainability. With decades of combined
                experience in polytunnel farming, our passionate team is at the
                forefront of agricultural technology, constantly exploring new
                ways to empower farmers and nurture the planet. Our deep-rooted
                commitment to sustainability drives us to develop advanced
                solutions that not only increase productivity and profitability
                but also promote environmental stewardship.
                <br />
                At PolyCrop, we believe that success in agriculture goes hand in
                hand with sustainability. That's why we're not only focused on
                improving yields and efficiency but also on minimizing
                environmental impact and preserving natural resources for future
                generations. By harnessing the power of innovation and
                sustainability, we're committed to shaping the future of farming
                and creating a healthier, more sustainable world for all.
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
              <img
                data-aos="fade-left"
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9ed1f731261c637d48b32f0a6dc889eed542002b180ca3f89d5703b5ab7c1529?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9ed1f731261c637d48b32f0a6dc889eed542002b180ca3f89d5703b5ab7c1529?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9ed1f731261c637d48b32f0a6dc889eed542002b180ca3f89d5703b5ab7c1529?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9ed1f731261c637d48b32f0a6dc889eed542002b180ca3f89d5703b5ab7c1529?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9ed1f731261c637d48b32f0a6dc889eed542002b180ca3f89d5703b5ab7c1529?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9ed1f731261c637d48b32f0a6dc889eed542002b180ca3f89d5703b5ab7c1529?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9ed1f731261c637d48b32f0a6dc889eed542002b180ca3f89d5703b5ab7c1529?apiKey=81b6a3261fbd4c24a49b94053c58d498&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9ed1f731261c637d48b32f0a6dc889eed542002b180ca3f89d5703b5ab7c1529?apiKey=81b6a3261fbd4c24a49b94053c58d498&"
                className="grow w-full aspect-[1.49] max-md:mt-10 max-md:max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FifthSection = () => {
    return (
      <div className="flex flex-col items-center px-16 pt-6 pb-20 text-center bg-white leading-[121%] max-md:px-5">
        <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 w-full max-w-[1191px] min-h-[500px] max-md:px-5 max-md:max-w-full">
          <div className="flex">
            <div
              data-aos="fade-right"
              className=" mr-12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img className="rounded-t-lg" src={first} alt="dddd" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Collaborative Team Dynamics
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Explore how our cohesive team works together seamlessly,
                  leveraging each other's strengths to overcome challenges and
                  deliver exceptional results at every stage of the operation.
                </p>
              </div>
            </div>
            <div
              data-aos="zoom in"
              className="mr-12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img className="rounded-t-lg" src={first} alt="dddd" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Customer Care Excellence
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Discover how we prioritize customer satisfaction through
                  prompt assistance and personalized service, ensuring every
                  customer feels valued and supported.
                </p>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img className="rounded-t-lg" src={first} alt="dddd" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Efficient Delivery Solutions
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Learn about our streamlined delivery process, which optimizes
                  routes and schedules to guarantee timely transportation of
                  fresh produce from our polytunnels to customers' doorsteps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <FirstSection />
      <FifthSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </div>
  );
}

export default Homepage;
