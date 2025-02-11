import React from 'react'
import { Link } from 'react-router-dom'

// Call-to-action component encouraging users to contact for project collaboration
const CTA = () => {
  return (
    <section className='cta'>
        <p className='cta-text'>
            Have a project in mind? <br className='sm:block hidden'/>
            Let's build it together!
        </p>
        <Link to='/contact' className='btn'>
            Contact
        </Link>
    </section>
  )
}

export default CTA