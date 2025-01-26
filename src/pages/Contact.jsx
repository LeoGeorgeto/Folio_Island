import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import Fox from '../models/Fox'
import Loader from '../components/Loader'

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: ''})
  const [buttonState, setButtonState] = useState({ 
    text: 'Send Message',
    isLoading: false,
    className: 'btn max-w-lg'
  });
  const [currentAnimation, setCurrentAnimation] = useState('idle')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value})
  };

  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonState({ 
      text: 'Sending...',
      isLoading: true,
      className: 'btn max-w-lg opacity-70'
    });
    setCurrentAnimation('hit');

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Leo",
        from_email: form.email,
        to_email: "leogeo95@gmail.com",
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setButtonState({ 
        text: 'Message Sent!', 
        isLoading: false,
        className: 'btn max-w-lg bg-green-500 hover:bg-green-600'
      });
      
      setTimeout(() => {
        setButtonState({ 
          text: 'Send Message',
          isLoading: false,
          className: 'btn max-w-lg'
        });
        setCurrentAnimation('idle');
        setForm({ name: '', email: '', message: ''});
      }, 3000);
    }).catch((error) => {
      console.log(error);
      setButtonState({ 
        text: 'Failed to Send', 
        isLoading: false,
        className: 'btn max-w-lg bg-red-500 hover:bg-red-600'
      });
      setCurrentAnimation('idle');
      
      setTimeout(() => {
        setButtonState({ 
          text: 'Send Message',
          isLoading: false,
          className: 'btn max-w-lg'
        });
      }, 3000);
    })
  };

  return (
    <main className='bg-slate-100 min-w-screen min-h-screen'>
      <section className="relative flex lg:flex-row flex-col max-container">
        <div className="flex-1 min-w-[50%] flex flex-col">
          <h1 className="head-text">Let's <span className='info-btn-animated_text'>Connect!</span></h1>
          <form className="w-full max-w-2x1 flex flex-col gap-7 mt-14 mx-auto"
            onSubmit={handleSubmit}
          >
            <label className='text-black-500 font-semibold'>
              Name
              <input 
                type='text'
                name='name'
                className='input max-w-lg'
                placeholder='John Smith'
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className='text-black-500 font-semibold'>
              Email
              <input 
                type='email'
                name='email'
                className='input max-w-lg'
                placeholder='john@gmail.com'
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className='text-black-500 font-semibold'>
              Your message
              <textarea 
                name='message'
                className='textarea max-w-lg'
                placeholder='Let me know how I can help you!'
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <button
              type='submit'
              className={buttonState.className}
              disabled={buttonState.isLoading}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {buttonState.text}
            </button>
          </form>
        </div>
        <div className='lg:w-1/2 w-full lg:h-auto md:h-[500px] h-[350px]'>
          <Canvas 
            camera={{
              position: [0, 0, 5],
              fov: 75,
              near: 0.1,
              far: 1000
            }}
          >
            <directionalLight intensity={2.5} position={[0, 0, 1]}/>
            <ambientLight intensity={0.5}/>
            <Suspense fallback={<Loader />}>
              <Fox 
                currentAnimation={currentAnimation} 
                position={[0.5, 0.5, 0.5]} 
                rotation={[12.6, -.6, 0]} 
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </main>
  )
}

export default Contact