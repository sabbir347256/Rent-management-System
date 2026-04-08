import React from 'react';
import TeamMember from './TeamMember';
import image1 from '../../../images/1.jpg'
import image2 from '../../../images/2.jpg'
import image3 from '../../../images/3.webp'
import image4 from '../../../images/4.jpg'


const About = () => {
    const team = [
        { name: "Tanmoy Sarker", role: "Founder & CEO", image: image1},
        { name: "Sarah Ahmed", role: "Head of Operations", image: image2},
        { name: "Rafi Khan", role: "Lead Developer", image: image3},
        { name: "Leena Roy", role: "Marketing Manager", image: image4},
    ];
    return (
        <div className="min-h-screen bg-white text-gray-700 mobileResponsiveDynamicPM">
            <div className='mt-14'>
                <header className="bg-gray-50 py-16 px-4 text-center border-b border-gray-100">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">About RentEase</h1>
                    <p className="text-lg text-gray-600">Your trusted platform to find rental properties across Dhaka</p>
                </header>

                <main className="container px-6 py-12 space-y-16">

                    <section>
                        <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
                        <p className="leading-relaxed text-gray-700 max-w-4xl">
                            At RentEase, our mission is to simplify the rental process for tenants and property managers alike.
                            We provide a transparent platform to find verified properties, compare rent prices, and explore
                            homes that fit your lifestyle.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Story</h2>
                        <p className="leading-relaxed text-gray-700 max-w-4xl">
                            Founded in 2025, RentEase started as a small initiative to connect tenants with trustworthy
                            property managers in Dhaka. Today, we serve thousands of users with detailed property listings,
                            rent prediction tools, and a seamless user experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-blue-600 mb-8">Meet the Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {team.map((member, index) => (
                                <TeamMember key={index} {...member} />
                            ))}
                        </div>
                    </section>

                    <section className="pb-12">
                        <h2 className="text-2xl font-bold text-blue-600 mb-4">Contact Us</h2>
                        <p className="text-gray-700">
                            Have questions or want to list your property? Reach out to us at{' '}
                            <a href="mailto:support@rentease.com" className="text-blue-500 hover:underline">
                                support@rentease.com
                            </a>{' '}
                            or call{' '}
                            <span className="font-semibold text-gray-800">+880 1234 567 890</span>.
                        </p>
                    </section>

                </main>
            </div>
        </div>
    );
};

export default About;