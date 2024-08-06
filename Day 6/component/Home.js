import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import '../assets/Home.css';

const HomePage = () => {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-logo"></div>
        <div className="navbar-title">POISE</div>
        <ul className="navbar-links">
          <li><a href="#Home" className='navbar-link'>Home</a></li>
          <li><a href="#features" className='navbar-link'>Features</a></li>
          <li><a href="#testimonials" className='navbar-link'>Testimonials</a></li>
          <li><a href="#faqs" className='navbar-link'>FAQs</a></li>
          <li><a href="#contact" className='navbar-link'>Contact</a></li>
          <li><Link to="/login" className='navbar-link'>Login</Link></li>
          <li><Link to="/signup" className='navbar-link'>Sign Up</Link></li>
        </ul>
      </nav>
      <header className="header" id="Home">
        <div className="header-content">
          <h1>Driving productivity for work teams everywhere</h1>
          <p>Shift management has never been easier with Poise’s scheduling, time tracking,<br/> budgeting, and PTO tools. Available on your desktop and mobile devices.</p><br/>
          <Link to="/signup" className="cta-button">Get Started</Link>
        </div>
      </header>
      <section className="features" id="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSomxyo4J9xbZl4yw1GQe4aNnz-xkAEd_gmjw&s" alt='Track employee hours' />
            <h3>Track Employee Hours</h3>
            <p>Spend time on creative tasks, not manual work, with our employee timesheet software.</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSH8E2IozqgojHuTMd7Yy64z5xqTxrFTSg7g&s" alt='Workforce optimization' />
            <h3>Workforce Optimization</h3>
            <p>Improve customer experience and cut costs by examining analytics and removing project management barriers.</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMessgV0v6po6-sNIrWskGPM3ydjz6rTAmrQ&s" alt='Smarter Stand-up tool' />
            <h3>Smarter Stand-up Tool</h3>
            <p>Customize your Scrum Stand-ups and easily share accomplishments and roadblocks.</p>
          </div>
          <div className="feature-item">
            <img src="https://cdn.pixabay.com/photo/2019/12/01/05/00/magnifying-glass-4664721_640.jpg" alt='Reporting and analytics' />
            <h3>Reporting and Analytics</h3>
            <p>Gain insights into your team's productivity, project performance, and resource allocation.</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvHVGtmcxM8CY7Q7x_cGYwnoZy00_7qKVdIzBeTexDldWkMJm9rRQxujO8Co2A-OYqGS4&usqp=CAU" alt='A habit tracker' />
            <h3>Habit Tracker</h3>
            <p>Track the time spent on each habit and adjust your approach with detailed time reports.</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNtexRZ_-i02SXBnPAWxcV7T3mqJEW5A-ZPk3g9mcOocsJKa3C7uBewf8DCq8ZQw0MS-E&usqp=CAU" alt='Geofenced time tracking' />
            <h3>Geofenced Time Tracking</h3>
            <p>Get an overview of your team’s work at each location and make billing clients faster and more accurate.</p>
          </div>
        </div>
      </section>
      <section className="testimonials" id="testimonials">
        <h2>What Our Users Say</h2>
        <Carousel showThumbs={false} autoPlay infiniteLoop interval={3000}>
          <div className="testimonial-item">
            <p>"This software has transformed how we manage our shifts. It's intuitive and easy to use!"</p>
            <h4>- Jane Doe, Manager</h4>
          </div>
          <div className="testimonial-item">
            <p>"The time tracking feature is a game-changer. We can now accurately track and manage employee hours."</p>
            <h4>- John Smith, CEO</h4>
          </div>
          <div className="testimonial-item">
            <p>"With the reporting tools, we've gained valuable insights into our team's productivity."</p>
            <h4>- Sarah Johnson, Team Leader</h4>
          </div>
          <div className="testimonial-item">
            <p>"The user interface is clean and easy to navigate. Our team loves it!"</p>
            <h4>- Michael Brown, Supervisor</h4>
          </div>
          <div className="testimonial-item">
            <p>"Customer support is outstanding. They resolved our issues quickly and effectively."</p>
            <h4>- Emily Davis, HR</h4>
          </div>
        </Carousel>
      </section>
      <section className="faqs" id="faqs">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>What platforms is the software compatible with?</h3>
            <p>Our software is compatible with Windows, macOS, Linux, iOS, and Android, ensuring you can manage your team from any device.</p>
          </div>
          <div className="faq-item">
            <h3>Does the software integrate with other tools?</h3>
            <p>Yes, our software integrates with numerous tools including project management platforms, payroll systems, and calendar applications to streamline your workflow.</p>
          </div>
          <div className="faq-item">
            <h3>How does the software handle data security?</h3>
            <p>We implement advanced encryption and security protocols, conduct regular security audits, and comply with GDPR and other data protection regulations.</p>
          </div>
          <div className="faq-item">
            <h3>Can the software handle multiple locations?</h3>
            <p>Yes, our software supports geofenced time tracking, allowing you to monitor and manage employees across multiple locations effectively.</p>
          </div>
          <div className="faq-item">
            <h3>Is there an API available for developers?</h3>
            <p>Yes, we offer a comprehensive API that allows developers to integrate our software's features into their own applications seamlessly.</p>
          </div>
        </div>
      </section>
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Software</h3>
            <ul>
              <li>Features overview</li>
              <li>Solutions</li>
              <li>Free time tracking app</li>
              <li>Integrations</li>
              <li>Download app</li>
              <li>Demo</li>
              <li>Time tracking API</li>
              <li>Request a feature</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Learning Center</h3>
            <ul>
              <li>Time tracking resources</li>
              <li>Workforce management resources</li>
              <li>Business resources</li>
              <li>Guiding principles</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <ul>
            <li>Email: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=727722eucs126@skcet.ac.in" alt="as">727722eucs126@skcet.ac.in</a></li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 1234 Elm Street, Suite 567, Springfield, IL 62704</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Follow Us</h3>
            <ul>
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
