export default function Contact() {
  return (
    <div className=" flex items-center justify-center p-4 sm:p-8 font-sans bg-bg-light">
      {/* Main Content Card */}
      <section className="w-full max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden p-0">
        <div className="flex flex-col lg:flex-row">
          {/* LEFT COLUMN: Contact Information */}
          <div className="lg:w-1/3 p-8 sm:p-12">
            <div className="space-y-6">
              {/* Call To Us Section */}
              <div className="flex items-center space-x-4">
                {/* Replaced .icon-circle with full utility classes */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 text-red-500">
                  {/* Phone Icon (Inline SVG) */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>

                </div>
                <h2 className="text-xl font-semibold text-neutral-900">Call To Us</h2>
              </div>

              <p className="text-neutral-600 text-sm">We are available 24/7, 7 days a week.</p>
              <p className="text-neutral-800 text-sm">Phone: +8801611112222</p>

              {/* Divider */}
              <div className="h-px bg-neutral-200"></div>

              {/* Write To Us Section */}
              <div className="flex items-center space-x-4">
                {/* Replaced .icon-circle with full utility classes */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 text-red-500">
                  {/* Mail Icon (Inline SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.83 1.83 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-neutral-900">Write To Us</h2>
              </div>

              <p className="text-neutral-600 text-sm">Fill out our form and we will contact you within 24 hours.</p>
              <div className="space-y-2">
                <p className="text-neutral-800 text-sm">Emails: customer@exclusive.com</p>
                <p className="text-neutral-800 text-sm">Emails: support@exclusive.com</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:w-2/3 p-8 sm:p-12 bg-neutral-50/50">
            <form className="space-y-6">
              {/* Top Row: Name, Email, Phone (Horizontal on large screens, Stacked on small) */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Name Input (Replaced .input-style with full utility classes) */}
                <div className="sm:w-1/3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    className="w-full p-4 bg-neutral-50 border-0 rounded-md focus:ring-0 focus:outline-none focus:border-red-500 placeholder-neutral-500 text-sm"
                    required
                  />
                </div>
                {/* Email Input (Replaced .input-style with full utility classes) */}
                <div className="sm:w-1/3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    className="w-full p-4 bg-neutral-50 border-0 rounded-md focus:ring-0 focus:outline-none focus:border-red-500 placeholder-neutral-500 text-sm"
                    required
                  />
                </div>
                {/* Phone Input (Replaced .input-style with full utility classes) */}
                <div className="sm:w-1/3">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone *"
                    className="w-full p-4 bg-neutral-50 border-0 rounded-md focus:ring-0 focus:outline-none focus:border-red-500 placeholder-neutral-500 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Message Textarea (Replaced .input-style with full utility classes) */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={8}
                  className="w-full p-4 bg-neutral-50 border-0 rounded-md focus:ring-0 focus:outline-none focus:border-red-500 placeholder-neutral-500 text-sm resize-none"
                />
              </div>

              {/* Send Message Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-150 ease-in-out shadow-lg shadow-red-500/30"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
