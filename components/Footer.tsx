import React from 'react'
import MagicButton from './ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa'
import { socialMedia } from '../data/index';

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          <span className="text-purple">Contact</span> me
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today!
        </p>
        <a href="mailto:peter.nguyen2121@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Peter Nguyen
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((profile) => (
            <a
              key={profile.id}
              href={profile.url} // Assuming you have a URL for each profile
              target="_blank" // To open the link in a new tab
              rel="noopener noreferrer" // To improve security when opening a new tab
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={profile.img} alt={profile.id} width="20" height="20" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer
