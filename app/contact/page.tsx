import Image from '@/components/Image'
import { genPageMetadata } from 'app/seo'

import gmail from '@/data/gmail.png'
import logo from '@/data/logo.png'
import calendly from '@/data/calendly.png'

export const metadata = genPageMetadata({ title: 'Contact' })

export default function Contact() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Contact
          </h1>
        </div>

        <article className="dark:prose-dark prose max-w-none pb-8 pt-10">
          <h3>Hi!!!</h3>
          <p>Feel free to reach out to me via email or schedule a meeting using Calendly. 🙌</p>

          <h3>Email and Calendly</h3>
          <div className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-2">
            <div className="flex flex-col items-center">
              <a href="mailto:chaima.atra@gmail.com" target="_blank" rel="noopener noreferrer">
                <Image src={gmail} alt="Gmail" className="h-16 w-16" />
              </a>
              <p className="mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">Email</p>
            </div>
            <div className="flex flex-col items-center">
              <a
                href="https://calendly.com/chaima-atra/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={calendly} alt="Calendly" className="h-16 w-16" />
              </a>
              <p className="mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
                Schedule a Meeting
              </p>
            </div>
          </div>
        </article>

        {/* Centered logo at the end of the page */}
        <div className="flex justify-center pt-10">
          <Image src={logo} alt="Your Logo" className="h-32 w-32" />
        </div>
      </div>
    </>
  )
}
