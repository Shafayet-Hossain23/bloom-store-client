import React from 'react';

const Footer = () => {
    return (
        <div className='lg:mx-7 lg:mt-7 mx-2 mt-10 border border-amber-400 mb-5'>
            <footer className="footer p-10 bg-white">
                <div>
                    <img width="100" height="100" src="https://i.ibb.co/2qDVqfL/e-commerce-1-removebg-preview.png" alt="" />
                    <p>BLOOM Industries Ltd.<br />Providing reliable tech since 2001</p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;