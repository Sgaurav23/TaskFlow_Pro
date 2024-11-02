import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="container">
            <div className="card">
                <h1 id="title">Welcome to Task_Flow_Pro</h1>
                <p id="info">
                    I'm Sgaurav23, the designer and creator of this web application. If you find any bugs or glitches, you can email me at <a href="mailto:sonargaurav23@gmail.com">sonargaurav23@gmail.com</a>. Your feedback will help me explore something new and provide consistent updates.
                </p>
                <div>
                    <p><strong>If it's your first visit:</strong> <Link to="/register" className="btn">Go to Register</Link></p>
                    <p><strong>If you're already here:</strong> <Link to="/login" className="btn">Go to Login</Link></p>
                </div>
                <hr />
            </div>
            <footer>
                <p>© 2024 Task_Flow_Pro. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://github.com/sgaurav23" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/gaurav-sonar-345a62239/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </footer>
        </div>
    );
}

export default Home;
