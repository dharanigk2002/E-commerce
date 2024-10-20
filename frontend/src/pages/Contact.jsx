import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>
      <div className="flex flex-col justify-center my-10 md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt="contact"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="text-gray-600 font-semibold text-xl">Our store</p>
          <p className="text-gray-500">
            54807 Red hills <br />
            Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (415) 888-9999 <br /> Email:admin@forever.com
          </p>
          <p className="text-xl text-gray-600 font-semibold">
            Careers at forever
          </p>
          <p className="text-gray-500">
            Learn more about our team and job openings
          </p>
          <button className="border border-black py-4 px-8 text-sm hover:bg-black hover:text-white transition-colors duration-500 ease-in-out">
            Explore jobs
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
}

export default Contact;
