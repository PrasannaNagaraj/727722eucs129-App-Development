import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Home.css';
const HomePage = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-logo">POISE</div>
        <ul className="navbar-links">
          <li><Link to="/" className='navbar-link'>Home</Link></li>
          <li><a href="#features" className='navbar-link'>Features</a></li>
          <li><a href="#contact" className='navbar-link'>Contact</a></li>
          <li><Link to="/login" className='navbar-link'>Login</Link></li>
          <li><Link to="/signup" className='navbar-link'>Sign Up</Link></li>
        </ul>
      </nav>
      <header className="header">
        <h1>Streamline every shift with employee scheduling software</h1><br></br>
        <p>Shift management has never been easier with Hubstaff’s scheduling, time tracking, budgeting, and PTO tools. Available on your desktop and mobile devices.</p>
      </header>

      <section className="features" id="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSomxyo4J9xbZl4yw1GQe4aNnz-xkAEd_gmjw&s"/>
            <h3>Track employee hours</h3>
            <p>Busy work makes time tracking difficult often leading to user error, inaccuracies, or missed payroll. Our employee timesheet software means you can spend time on creative tasks, not manual work.</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSH8E2IozqgojHuTMd7Yy64z5xqTxrFTSg7g&s"/>
            <h3>Workforce optimization</h3>
            <p>Workforce optimization software helps cut operational costs and improve customer experience. By examining analytics, seeing when employees are at their most productive, and removing project management barriers</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMessgV0v6po6-sNIrWskGPM3ydjz6rTAmrQ&s"/>
            <h3>smarter Stand-up tool</h3>
            <p>Customize your Scrum Stand-ups by choosing the team involved, if they’re submitted daily or weekly, and who gets recaps emailed to them. Team members can then share accomplishments and identify roadblocks easily.</p>
          </div>
          <div className="feature-item">
            <img src="https://cdn.pixabay.com/photo/2019/12/01/05/00/magnifying-glass-4664721_640.jpg"/>
            <h3>Reporting and analytics</h3>
            <p>n today’s dynamic environment, analyzing and reporting on key data insights is essential for making informed decisions. Analytics and reporting functionality offers insights into your team's productivity, project performance, and resource allocation.</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvHVGtmcxM8CY7Q7x_cGYwnoZy00_7qKVdIzBeTexDldWkMJm9rRQxujO8Co2A-OYqGS4&usqp=CAU"/>
            <h3>A habit tracker</h3>
            <p>This habit tracker app lets you use the desktop or mobile habit tracking apps to track the time spent on each habit. Use time reports to gain insights and adjust how you approach habits.</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNtexRZ_-i02SXBnPAWxcV7T3mqJEW5A-ZPk3g9mcOocsJKa3C7uBewf8DCq8ZQw0MS-E&usqp=CAU"/>
            <h3>geofenced time tracking</h3>
            <p>Avoid guesswork and expensive errors when managing your crew. Geofenced tracking offers an overview of your team’s work at each location and gives you all the information to make billing clients faster and more accurate.</p>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <h2>Contact Us</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: (123) 456-7890</p>
      </footer>
    </div>
  );
};

export default HomePage;
