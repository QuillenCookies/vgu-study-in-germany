// frontend/src/components/pages/train/sections/TransitOverview.tsx
import React from 'react';
import { Badge } from '../../../ui/badge';

const TransitOverview: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

                {/* Left Column: Sticky Header */}
                <div className="md:col-span-4 md:sticky top-24 self-start">
                    <Badge variant="orange" className="mb-4">The Big Picture</Badge>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A2B4C] dark:text-white mb-4 leading-tight">
                        Decoding the <br /> DB Network
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Everything you need to know before stepping onto the page.
                    </p>
                </div>

                {/* Right Column: Narrative Content */}
                <div className="md:col-span-8 flex flex-col gap-10">

                    <div>
                        <h3 className="text-2xl font-bold text-[#1A2B4C] dark:text-white mb-3 flex items-center gap-3">
                            🌍 The Lifeline of Germany
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            For an international student, the public transit network is much more than a way to get to morning lectures. It is the lifeblood of the country. With a deep commitment to eco-friendly travel, Germany's transit system connects massive urban centers like Frankfurt and Berlin to the quietest rural villages. Owning a car is entirely optional when you have absolute freedom of movement via rail and bus.
                        </p>
                    </div>

                    <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />

                    <div>
                        <h3 className="text-2xl font-bold text-[#1A2B4C] dark:text-white mb-3 flex items-center gap-3">
                            🚂 A Legacy of Engineering
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            The German railway has a rich history, beginning in 1835 with the "Adler," the country's first steam locomotive that ran between Nuremberg and Fürth. Over the centuries, through industrialization and reunification, it has grown into an engineering marvel. Today, Deutsche Bahn (DB) stands as a symbol of connectivity, operating high-speed ICE trains that cross the country at 300 km/h.
                        </p>
                    </div>

                    <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />

                    <div>
                        <h3 className="text-2xl font-bold text-[#1A2B4C] dark:text-white mb-3 flex items-center gap-3">
                            📘 How to Use This Guide
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            Navigating tariff zones, understanding the difference between an RE and an RB, and figuring out what your Semesterticket actually covers can be a steep learning curve. We built this page to be your definitive playbook. Whether you are budgeting for a weekend trip to Munich or just trying to find the right platform for your daily commute, everything you need is right here.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TransitOverview;