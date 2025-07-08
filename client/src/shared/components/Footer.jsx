import React from "react";

const Footer = () => {
    return (
        <footer>
            <p>&copy; 2025 Your Company Name. All rights reserved.</p>
            <p>
                <a href="/privacy-policy">Privacy Policy</a> |
                <a href="/terms-of-service">Terms of Service</a> |
                <a href="/contact">Contact Us</a>
            </p>
            <p>
                Follow us on:
                <a href="https://facebook.com" target="_blank">
                    Facebook
                </a>
                ,
                <a href="https://twitter.com" target="_blank">
                    Twitter
                </a>
                ,
                <a href="https://instagram.com" target="_blank">
                    Instagram
                </a>
            </p>
        </footer>
    );
};

export default Footer;
