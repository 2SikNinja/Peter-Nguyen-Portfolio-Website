import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerate";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="pb-20 pt-36" id="home">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="-top-10 -left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="-top-28 -left-80 h-[80vh] w-[50vh]" fill="blue" />
      </div>
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.01] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Aspiring Software Engineer - New Grad from California Polytechnic
            University of Pomona
          </h2>

          {/* Oval Self-Portrait */}
          <div className="w-64 h-80 md:w-72 md:h-96 lg:w-96 lg:h-[28rem] overflow-hidden border-4 border-purple shadow-lg my-6 relative rounded-[50%/60%]">
            <img
              src="/peterNguyenIMG.JPG" // Replace with your image path
              alt="Self Portrait of Peter Nguyen"
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out transform hover:scale-110"
            />
          </div>

          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Peter Nguyen"
          />
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi, I&apos;m Peter, a software engineer based in Los
            Angeles with a background in Computer Science and a minor in Data
            Science. I specialize in Artificial Intelligence, Machine Learning,
            and Data Science, with experience building applications using a
            variety of technologies, including Python, Java, and Node.js.
            I&apos;m passionate about creating fast, responsive, and accessible
            applications, and I enjoy learning new technologies and sharing my
            knowledge. Oh, and I love cats!
          </p>
          <a href="https://drive.google.com/file/d/1T9P7iw7dtXBQ_omLvoo3E69z3-Wyc_Qq/view?usp=sharing">
            <MagicButton
              title="Show Resume"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
