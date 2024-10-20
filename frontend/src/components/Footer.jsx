import { assets } from "../assets/assets";

function Footer() {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] mb-10 mt-40 gap-14 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-3/2 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
            consectetur eveniet. Nam exercitationem neque odit officia nostrum.
            Aperiam, rem vel!
          </p>
        </div>
        <div>
          <p className="mb-5 font-medium text-xl">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl mb-5 font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-9987878767</li>
            <li>forever@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-center text-sm">
          &copy; {new Date().getFullYear()}@forever.com &mdash; All rights
          reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
