import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React from 'react'
import { skills, experiences } from '../constants'
import CTA from '../components/CTA';

const About = () => {
  return (
    <main className='bg-slate-100 min-h-screen min-w-screen'>
      <section className='max-container'>
      <h1 className='head-text'>
        Hello, I'm <span className='info-btn-animated_text'>Leo</span>
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>As a passionate Software Engineer based in South Carolina, I thrive on transforming complex challenges 
        into elegant solutions. With a strong foundation in enterprise full-stack web development, I bring a 
        versatile approach to building efficient, scalable systems that make a real impact.</p>
      </div>
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>
        <div className='mt-16 flex flex-wrap gap-8 sm:gap-12 justify-center max-w-xl mx-auto'>
          {skills.map((skill) => (
            <div key={skill.name} className='block-container w-14 sm:w-20 h-14 sm:h-20 relative group'>
              <div className='btn-back-ab rounded-xl'/>
              <div className='btn-front-ab rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
              <p className='absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none'>
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Work Experience</h3>
          <div className='mt-5 flex flex-col gap-3 text-slate-500'>
            <p>My journey has been shaped by a deliberate choice to explore diverse industries, roles, and 
              technologies throughout my education and early career. This multifaceted experience has equipped 
              me with both technical expertise and essential soft skills, allowing me to quickly adapt to new 
              environments and deliver value from day one. Here's the run down:</p>
          </div>

          <div className='mt-12 flex'>
            <VerticalTimeline>
              {experiences.map((experience) => (
                <VerticalTimelineElement 
                  key={experience.company_name}
                  date={experience.date}
                  icon={<div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>}
                  iconStyle={{ 
                    background: experience.gradientType === "blue" 
                      ? 'linear-gradient(to right, var(--nav-blue-light), var(--nav-blue-dark), var(--nav-blue-light))'
                      : 'linear-gradient(to right, var(--sunset-light), var(--sunset-dark), var(--sunset-light))',
                    backgroundSize: '200% auto',
                    animation: 'shine 3s linear infinite'
                  }}
                  contentStyle={{
                    borderBottom: '8px',
                    borderStyle: 'solid',
                    borderImage: experience.gradientType === "blue" 
                      ? 'linear-gradient(to right, var(--nav-blue-light), var(--nav-blue-dark), var(--nav-blue-light)) 1'
                      : 'linear-gradient(to right, var(--sunset-light), var(--sunset-dark), var(--sunset-light)) 1',
                    boxShadow: 'none',

                  }}
                >
                  <div>
                    <h3 className='text-black text-xl font-poppins font-semibold'>{experience.title}</h3>
                    <p className='text-black-500 font-medium font-base' style={{margin:0}}>
                      {experience.company_name}
                    </p>
                  </div>
                  <ul className='my-5 list-disc ml-5 space-y-2'>
                    {experience.points.map((point, index) => (
                      <li key={`experience-point-${index}`} className='text-black-500 font-normal pl-1 text-sm'>
                        {point}
                      </li>
                    ))}
                  </ul>
                  
                  
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
      </div>
      <hr className='border-slate-200'/>
      <CTA />
    </section>
    </main>
  )
}

export default About