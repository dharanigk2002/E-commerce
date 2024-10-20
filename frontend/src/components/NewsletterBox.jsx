function NewsletterBox() {
  function onSubscribe(e) {
    e.preventDefault();
  }
  return (
    <div className="text-center">
      <p className="text-2xl text-gray-800 font-medium">
        Subscribe now and get 20% off
      </p>
      <p className="mt-3 text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <form
        onSubmit={onSubscribe}
        className="flex items-center w-full sm:w-1/2 gap-3 my-6 mx-auto pl-3 border"
      >
        <input
          type="email"
          className="w-full sm:flex-1 outline-none"
          placeholder="Enter your email"
          required
        />
        <button className="uppercase text-white bg-black px-10 py-4 text-xs">
          subscribe
        </button>
      </form>
    </div>
  );
}

export default NewsletterBox;
