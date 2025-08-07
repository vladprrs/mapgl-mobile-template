'use client';

import React, { useState } from 'react';
import { useMapGL } from '@/hooks/useMapGL';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

interface Place {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  address: string;
  phone: string;
  website: string;
  coordinates: [number, number];
  distance: string;
  openNow: boolean;
  hours: string;
  description: string;
  features: string[];
  images: string[];
  reviews: Review[];
}

const SAMPLE_PLACES: Place[] = [
  {
    id: '1',
    name: 'GUM Department Store',
    category: 'Shopping Mall',
    rating: 4.6,
    reviewCount: 15234,
    priceLevel: '$$$$',
    address: 'Red Square, 3, Moscow, 109012',
    phone: '+7 495 788-43-43',
    website: 'gum.ru',
    coordinates: [37.6215, 55.7549],
    distance: '0.3 km',
    openNow: true,
    hours: 'Open until 10:00 PM',
    description: 'Historic luxury department store featuring high-end boutiques, restaurants, and stunning architecture dating back to 1893.',
    features: ['Wheelchair accessible', 'Free WiFi', 'Restrooms', 'ATM', 'Currency exchange', 'Tax-free shopping'],
    images: ['gum1.jpg', 'gum2.jpg', 'gum3.jpg'],
    reviews: [
      {
        id: 'r1',
        author: 'Marina Petrova',
        rating: 5,
        date: '2 days ago',
        text: 'Absolutely stunning architecture! The glass roof is magnificent. Great selection of luxury brands and nice cafes. Must visit when in Moscow.',
        avatar: '👤'
      },
      {
        id: 'r2',
        author: 'John Smith',
        rating: 4,
        date: '1 week ago',
        text: 'Beautiful building with lots of history. Prices are quite high but it\'s worth visiting just for the architecture. The fountain is lovely.',
        avatar: '👤'
      },
      {
        id: 'r3',
        author: 'Elena Ivanova',
        rating: 5,
        date: '2 weeks ago',
        text: 'My favorite place for shopping in Moscow. Always decorated beautifully for holidays. The ice cream is legendary!',
        avatar: '👤'
      }
    ]
  },
  {
    id: '2',
    name: 'Café Pushkin',
    category: 'Russian Restaurant',
    rating: 4.7,
    reviewCount: 8956,
    priceLevel: '$$$',
    address: 'Tverskoy Blvd, 26А, Moscow, 125009',
    phone: '+7 495 739-00-33',
    website: 'cafe-pushkin.ru',
    coordinates: [37.6050, 55.7649],
    distance: '1.2 km',
    openNow: true,
    hours: 'Open 24 hours',
    description: 'Legendary 24-hour restaurant serving traditional Russian cuisine in an elegant 19th-century mansion atmosphere.',
    features: ['Reservations', 'Private dining', 'Valet parking', 'Live music', 'Dress code', 'Credit cards'],
    images: ['pushkin1.jpg', 'pushkin2.jpg', 'pushkin3.jpg'],
    reviews: [
      {
        id: 'r4',
        author: 'Alexey Volkov',
        rating: 5,
        date: '3 days ago',
        text: 'Exceptional dining experience! The beef stroganoff was perfect and the service impeccable. Atmosphere takes you back in time.',
        avatar: '👤'
      },
      {
        id: 'r5',
        author: 'Sarah Johnson',
        rating: 4,
        date: '5 days ago',
        text: 'Touristy but worth it. Beautiful interior, great food, though portions could be bigger for the price. Try the honey cake!',
        avatar: '👤'
      }
    ]
  },
  {
    id: '3',
    name: 'Zaryadye Park',
    category: 'Urban Park',
    rating: 4.8,
    reviewCount: 22567,
    priceLevel: 'Free',
    address: 'Varvarka St, 6, Moscow, 119072',
    phone: '+7 495 531-05-32',
    website: 'zaryadyepark.ru',
    coordinates: [37.6284, 55.7512],
    distance: '0.5 km',
    openNow: true,
    hours: 'Open 24 hours',
    description: 'Modern urban park with floating bridge, amphitheater, and multimedia installations showcasing Russia\'s diverse landscapes.',
    features: ['Free entry', 'Wheelchair accessible', 'Photography spots', 'Concert hall', 'Ice cave', 'Restaurant'],
    images: ['zaryadye1.jpg', 'zaryadye2.jpg', 'zaryadye3.jpg'],
    reviews: [
      {
        id: 'r6',
        author: 'Dmitry Smirnov',
        rating: 5,
        date: '1 day ago',
        text: 'Best new attraction in Moscow! The floating bridge offers amazing views. Great for families and photographers.',
        avatar: '👤'
      }
    ]
  }
];

export function PlaceDetails() {
  const { addMarker, centerOnLocation, clearMarkers } = useMapGL();
  const [selectedPlace, setSelectedPlace] = useState<Place>(SAMPLE_PLACES[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'photos'>('overview');
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const handlePlaceClick = async (place: Place) => {
    setSelectedPlace(place);
    clearMarkers();
    await addMarker(place.id, place.coordinates);
    centerOnLocation(place.coordinates, 16);
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '✨' : '');
  };

  return (
    <div className="pb-20">
      {/* Header with place info */}
      <div className="sticky top-0 bg-white z-10 border-b">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{selectedPlace.name}</h1>
              <p className="text-sm text-gray-600 mt-1">{selectedPlace.category}</p>
            </div>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              ❤️
            </button>
          </div>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center">
              <span className="text-lg font-semibold">{selectedPlace.rating}</span>
              <span className="ml-1 text-sm">{renderStars(selectedPlace.rating)}</span>
            </div>
            <span className="text-sm text-gray-600">({selectedPlace.reviewCount.toLocaleString()} reviews)</span>
            <span className="text-sm text-gray-600">{selectedPlace.priceLevel}</span>
            <span className="text-sm text-gray-600">{selectedPlace.distance}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'overview' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'reviews' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'photos' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Photos
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick actions */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                📍 Directions
              </button>
              <button className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                📞 Call
              </button>
              <button className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                🔗 Website
              </button>
            </div>

            {/* Status */}
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-green-600 font-medium">
                    {selectedPlace.openNow ? '🟢 Open now' : '🔴 Closed'}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">{selectedPlace.hours}</span>
                </div>
                <button className="text-sm text-blue-600 hover:underline">See all hours</button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{selectedPlace.description}</p>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-gray-500 mr-3">📍</span>
                  <span className="text-gray-700">{selectedPlace.address}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-3">📞</span>
                  <span className="text-gray-700">{selectedPlace.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-3">🌐</span>
                  <span className="text-blue-600">{selectedPlace.website}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Features & Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {(showAllFeatures ? selectedPlace.features : selectedPlace.features.slice(0, 3)).map((feature, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
                {selectedPlace.features.length > 3 && (
                  <button
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="px-3 py-1 text-blue-600 text-sm hover:underline"
                  >
                    {showAllFeatures ? 'Show less' : `+${selectedPlace.features.length - 3} more`}
                  </button>
                )}
              </div>
            </div>

            {/* Nearby places */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Nearby Places</h3>
              <div className="space-y-3">
                {SAMPLE_PLACES.filter(p => p.id !== selectedPlace.id).map((place) => (
                  <button
                    key={place.id}
                    onClick={() => handlePlaceClick(place)}
                    className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{place.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{place.category} • {place.distance}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-medium">{place.rating}</span>
                          <span className="ml-1 text-xs">{renderStars(place.rating)}</span>
                          <span className="ml-2 text-xs text-gray-500">({place.reviewCount.toLocaleString()})</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{place.priceLevel}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Business hours detail */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday</span>
                  <span className="text-gray-900">10:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tuesday</span>
                  <span className="text-gray-900">10:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wednesday</span>
                  <span className="text-gray-900">10:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thursday</span>
                  <span className="text-gray-900">10:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Friday</span>
                  <span className="text-gray-900">10:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">Saturday</span>
                  <span className="text-gray-900">10:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900">10:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {/* Review summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-3xl font-bold">{selectedPlace.rating}</div>
                  <div className="text-sm text-gray-600">{renderStars(selectedPlace.rating)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Based on</div>
                  <div className="font-semibold">{selectedPlace.reviewCount.toLocaleString()} reviews</div>
                </div>
              </div>
              
              {/* Rating breakdown */}
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-sm w-3">{stars}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400"
                        style={{ width: `${stars === 5 ? 65 : stars === 4 ? 25 : 10}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-10 text-right">
                      {stars === 5 ? '65%' : stars === 4 ? '25%' : '10%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort options */}
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Most relevant</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Newest</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Highest</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Lowest</button>
            </div>

            {/* Reviews list */}
            <div className="space-y-4">
              {selectedPlace.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{review.author}</h4>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-sm">{renderStars(review.rating)}</span>
                        <span className="ml-2 text-sm text-gray-600">{review.rating}.0</span>
                      </div>
                      <p className="mt-2 text-gray-700 text-sm leading-relaxed">{review.text}</p>
                      <div className="flex gap-3 mt-3">
                        <button className="text-sm text-gray-600 hover:text-gray-900">👍 Helpful</button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">💬 Reply</button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">⚡ Share</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Load more reviews */}
              <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Load more reviews
              </button>
            </div>

            {/* Write review CTA */}
            <div className="sticky bottom-0 p-4 bg-white border-t">
              <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                ✍️ Write a review
              </button>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div>
            {/* Photo categories */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm whitespace-nowrap">All</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Interior</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Exterior</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Food</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Menu</button>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    📷 Photo {index}
                  </div>
                </div>
              ))}
            </div>

            {/* Upload photo CTA */}
            <button className="w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              📸 Add a photo
            </button>
          </div>
        )}
      </div>

      {/* Additional scrollable content */}
      <div className="p-4 border-t">
        <h3 className="font-semibold text-gray-900 mb-3">Popular times</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Usually busy on weekends</p>
          <div className="flex items-end gap-1 h-20">
            {[20, 30, 45, 60, 80, 95, 100, 90, 75, 50, 35, 25].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-200 rounded-t"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>9 AM</span>
            <span>12 PM</span>
            <span>3 PM</span>
            <span>6 PM</span>
            <span>9 PM</span>
          </div>
        </div>
      </div>

      {/* Tips section */}
      <div className="p-4 border-t">
        <h3 className="font-semibold text-gray-900 mb-3">Tips from visitors</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">💡 &quot;Best time to visit is early morning to avoid crowds&quot;</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">💡 &quot;Don&apos;t miss the rooftop terrace - amazing views!&quot;</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">💡 &quot;Free WiFi password is posted near the entrance&quot;</p>
          </div>
        </div>
      </div>

      {/* Related searches */}
      <div className="p-4 border-t">
        <h3 className="font-semibold text-gray-900 mb-3">People also search for</h3>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            Museums nearby
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            Historic sites
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            Shopping centers
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            Restaurants
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            Parks
          </button>
        </div>
      </div>
    </div>
  );
}