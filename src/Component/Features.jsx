

const Features = () => {
  return (
    
    <section className="p-8 text-center">
    <br></br>
    <br></br>
    <br></br>
    <br></br><br></br><br></br>
      <h3 className="text-xl font-semibold mb-4">The all-in-one platform for seamless appointment 
      scheduling <br></br> Book, manage, and stay on track.</h3>
      <br></br>
      <br></br>
      <br></br>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl text-left">
      <div className="mt-8 max-w-5xl text-left space-y-8">
  {/* First Set of Features */}
  <div>
    <h4 className="text-blue-500 text-xl md:text-2xl font-bold">Connect your calendar</h4>
    <p className="text-lg md:text-xl text-gray-700">
    Calendly connects up to six calendars to automate 
    scheduling with real-time availability.
    </p>
  </div>

  {/* Second Set of Features (Stacked Under) */}
  <div>
    <h4 className="text-blue-500 text-xl md:text-2xl font-bold">Add your availability</h4>
    <p className="text-lg md:text-xl text-gray-700">
    Calendly connects up to six calendars to automate 
    scheduling with real-time availability.
    </p>
  </div>
  <div>
    <h4 className="text-blue-500 text-xl md:text-2xl font-bold">Connect conferencing tools</h4>
    <p className="text-lg md:text-xl text-gray-700">
    Sync your video conferencing tools and set preferences
    for in-person meetings or calls.
    </p>
  </div>
  <div>
    <h4 className="text-blue-500 text-xl md:text-2xl font-bold">Customize your event type</h4>
    <p className="text-lg md:text-xl text-gray-700">
    Choose from pre-built templates or quickly create custom
event types for any meeting you need to schedule.
    </p>
  </div>
  <div>
    <h4 className="text-blue-500 text-xl md:text-2xl font-bold">Share your scheduling link</h4>
    <p className="text-lg md:text-xl text-gray-700">
    Easily book meetings by embedding scheduling links 
on your website, landing pages, or emails.
    </p>
  </div>
  </div>
</div>



    </section>
  );
};

export default Features;