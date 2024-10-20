import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

function About() {
  return (
    <div>
      <div className="border-t text-2xl text-center pt-8">
        <Title text1="ABOUT" text2="US" />
      </div>
      <div className="flex my-10 gap-16 md:flex-row flex-col">
        <img
          src={assets.about_img}
          alt="about icon"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center md:w-1/2 gap-6 text-gray-600">
          <p>
            Forever was bom out at a possion for inervation and a desire to
            revolutionize thir way people shop online. Our journey began with a
            simple idee to prav de a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            corefort of their homes
          </p>
          <p>
            Since our inceptions, we&apos;ve worked tirelessly tacurate
            axdiverse selection of high-quality products that caner to every
            taste and preference, from fashion and beauty to Actronics and home
            essentials, we offer vefensive collection sourced from muted trends
            and suppliers
          </p>
          <b className="text-gray-800">Our mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We&apos;re dedicated to providing a
            seamless shopping experience that exceeds expectations, from
            browsing and ordering to delivery and beyond
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border md:px-16 px-10 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality assurance:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border md:border-t border-t-0 md:border-l-0 md:px-16 px-10 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
        <div className="border border-t-0 md:border-t md:border-l-0 md:px-16 px-10 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional customer service:</b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
}

export default About;
