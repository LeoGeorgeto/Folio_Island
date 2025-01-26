import React from 'react'
import { projects } from '../constants'
import { Link } from 'react-router-dom'
import CTA from '../components/CTA'

const Projects = () => {
  return (
    <main className='bg-slate-100 min-h-screen min-w-screen'>
      <section className='max-container'>
        <h1 className='head-text'>
          My <span className='info-btn-animated_text'>Projects</span>
        </h1>

        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>I'm excited to share my journey into software development through this showcase project. As a recent graduate, 
            PouncePass represents my dedication to creating meaningful solutions that solve real-world problems. While my 
            portfolio is growing, I've poured my knowledge, creativity, and passion for development into this project, 
            implementing industry best practices and modern technologies. I welcome you to explore the codebase and see 
            firsthand how I approach software development challenges. Your feedback and collaboration would be greatly 
            appreciated!</p>
        </div>

        <div className='flex flex-wrap my-20 gap-16'>
          {projects.map((project) => (
            <div className='lg:w-[400px] w-full' key={project.name}>
              <div className='block-container w-12 h-12'>
                <div className={`btn-back rounded-xl ${project.theme}`}/>
                <div className='btn-front-p rounded-xl flex justify-center items-center'/>
                <img
                  src={project.iconUrl}
                  alt='Project Icon'
                  className='w-1/2 h-1/2 object-contain brightness-0 invert absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                />
              </div>
              <div className='mt-5 flex flex-col'>
                <h4 className='text-2xl font-poppins font-semibold'>
                  {project.name}
                </h4>
                <p className='mt-2 text-slate-500'>{project.description}</p>
                <div className='mt-5 flex items-center gap-2 font-poppins'>
                  {project.link ? (
                    <Link
                      to={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-semibold blue-gradient_text hover:info-btn-animated_text'
                    >
                      Live Link
                    </Link>
                  ) : ( 
                    <span className='font-semibold animated-gradient_text'>
                      Live Link
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className='border-slate-200'/>
        <CTA />
      </section>
    </main>
  )
}

export default Projects