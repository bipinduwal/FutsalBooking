import React from 'react'

const HomeTeam = () => {
  return (
    <>
     <div className="flex-1 p-6">
            <header className="mb-6 flex items-center">
                <i className="fas fa-bars fa-2x pr-5" id="menu"></i>
                <h2 className="text-3xl font-semibold text-gray-800">Home Team</h2>
            </header>
           

            {/* <!-- Booking Table --> */}
            <section className="bg-white p-2 shadow rounded-lg">
                
                    <div className="max-w-5xl mx-auto py-12 px-6">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                           
                            <div className="bg-white p-6 shadow-lg rounded-lg box">
                                <div className="flex items-center mb-4">
                                    <img src="https://via.placeholder.com/50" alt="Player 1" className="w-12 h-12 rounded-full mr-4"/>
                                    <div>
                                        <h3 className="text-xl font-bold">Bipin</h3>
                                        <p className="text-sm text-gray-600">Team Captain</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">"Playing at this futsal has been an amazing experience! The facilities are top-notch, and the booking system is super easy to use."</p>
                                <div className="mt-4">
                                    <a href="#" className="text-blue-500 hover:underline">View Details</a>
                                </div>
                            </div>
                
                            <div className="bg-white p-6 shadow-lg rounded-lg box">
                                <div className="flex items-center mb-4">
                                    <img src="https://via.placeholder.com/50" alt="Player 2" className="w-12 h-12 rounded-full mr-4"/>
                                    <div>
                                        <h3 className="text-xl font-bold">Biplav</h3>
                                        <p className="text-sm text-gray-600">Goalkeeper</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">"Great experience every time! The staff is friendly, and the grounds are well maintained."</p>
                                <div className="mt-4">
                                    <a href="#" className="text-blue-500 hover:underline">View Details</a>
                                </div>
                            </div>
                
                            <div className="bg-white p-6 shadow-lg rounded-lg box">
                                <div className="flex items-center mb-4">
                                    <img src="https://via.placeholder.com/50" alt="Player 3" className="w-12 h-12 rounded-full mr-4"/>
                                    <div>
                                        <h3 className="text-xl font-bold">Sanjeep</h3>
                                        <p className="text-sm text-gray-600">Forward</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">"I always recommend this futsal to my friends. The booking process is straightforward, and the environment is fantastic."</p>
                                <div className="mt-4">
                                    <a href="#" className="text-blue-500 hover:underline">View Details</a>
                                </div>
                            </div>
                            <div className="bg-white p-6 shadow-lg rounded-lg box">
                                <div className="flex items-center mb-4">
                                    <img src="https://via.placeholder.com/50" alt="Player 3" className="w-12 h-12 rounded-full mr-4"/>
                                    <div>
                                        <h3 className="text-xl font-bold">Piyush</h3>
                                        <p className="text-sm text-gray-600">Forward</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">"I always recommend this futsal to my friends. The booking process is straightforward, and the environment is fantastic."</p>
                                <div className="mt-4">
                                    <a href="#" className="text-blue-500 hover:underline">View Details</a>
                                </div>
                            </div>
                            <div className="bg-white p-6 shadow-lg rounded-lg box">
                                <div className="flex items-center mb-4">
                                    <img src="https://via.placeholder.com/50" alt="Player 3" className="w-12 h-12 rounded-full mr-4"/>
                                    <div>
                                        <h3 className="text-xl font-bold">Prabesh</h3>
                                        <p className="text-sm text-gray-600">Mid-Defend</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">"I always recommend this futsal to my friends. The booking process is straightforward, and the environment is fantastic."</p>
                                <div className="mt-4">
                                    <a href="#" className="text-blue-500 hover:underline">View Details</a>
                                </div>
                            </div>
                            <div className="bg-white p-6 shadow-lg rounded-lg box">
                                <div className="flex items-center mb-4">
                                    <img src="https://via.placeholder.com/50" alt="Player 3" className="w-12 h-12 rounded-full mr-4"/>
                                    <div>
                                        <h3 className="text-xl font-bold">Unknown</h3>
                                        <p className="text-sm text-gray-600">Forward</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">"I always recommend this futsal to my friends. The booking process is straightforward, and the environment is fantastic."</p>
                                <div className="mt-4">
                                    <a href="#" className="text-blue-500 hover:underline">View Details</a>
                                </div>
                            </div>
                
                            {/* <!-- Add more testimonial cards as needed --> */}
                        </div>
                    </div>
                
            </section>
        </div> 
    </>
  )
}

export default HomeTeam
