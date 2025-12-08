import React, { useState } from 'react';
import '../styles/ApartmentAnywhere.css';

function ApartmentAnywhere() {
  // Search filters
  const [searchLocation, setSearchLocation] = useState('');
  const [searchMinPrice, setSearchMinPrice] = useState('');
  const [searchMaxPrice, setSearchMaxPrice] = useState('');
  const [searchBedrooms, setSearchBedrooms] = useState('');
  const [searchBathrooms, setSearchBathrooms] = useState('');

  // Form fields for posting a new listing
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [amenities, setAmenities] = useState({
    parking: false,
    laundry: false,
    petFriendly: false,
    airConditioning: false,
    heating: false,
    dishwasher: false,
    balcony: false,
    pool: false,
    gym: false,
    elevator: false,
    furnished: false
  });

  // Store all posted listings
  const [listings, setListings] = useState([]);

  // Toggle between search view and post listing view
  const [showPostForm, setShowPostForm] = useState(false);

  // Filter listings based on search criteria
  const getFilteredListings = () => {
    return listings.filter(listing => {
      // Location filter
      if (searchLocation && !listing.location.toLowerCase().includes(searchLocation.toLowerCase())) {
        return false;
      }

      // Price filters
      if (searchMinPrice && parseInt(listing.price) < parseInt(searchMinPrice)) {
        return false;
      }
      if (searchMaxPrice && parseInt(listing.price) > parseInt(searchMaxPrice)) {
        return false;
      }

      // Bedrooms filter
      if (searchBedrooms && parseInt(listing.bedrooms) < parseInt(searchBedrooms)) {
        return false;
      }

      // Bathrooms filter
      if (searchBathrooms && parseInt(listing.bathrooms) < parseInt(searchBathrooms)) {
        return false;
      }

      return true;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering happens automatically through getFilteredListings()
  };

  const handleAmenityChange = (amenity) => {
    setAmenities({
      ...amenities,
      [amenity]: !amenities[amenity]
    });
  };

  const handlePostListing = (e) => {
    e.preventDefault();

    // Create a new listing object
    const newListing = {
      id: Date.now(), // Simple unique ID
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      description,
      imageUrl,
      contactEmail,
      contactPhone,
      amenities: { ...amenities }
    };

    // Add to listings array
    setListings([...listings, newListing]);

    // Clear the form
    setTitle('');
    setLocation('');
    setPrice('');
    setBedrooms('');
    setBathrooms('');
    setDescription('');
    setImageUrl('');
    setContactEmail('');
    setContactPhone('');
    setAmenities({
      parking: false,
      laundry: false,
      petFriendly: false,
      airConditioning: false,
      heating: false,
      dishwasher: false,
      balcony: false,
      pool: false,
      gym: false,
      elevator: false,
      furnished: false
    });

    // Switch back to main view
    setShowPostForm(false);

    alert('Your listing has been posted!');
  };

  return (
    <div className="apartment-anywhere-container">
      <h1>Apartment Anywhere</h1>
      <p>Find your perfect apartment</p>

      <div className="button-group">
        <button
          onClick={() => setShowPostForm(false)}
          className={!showPostForm ? 'active-tab' : 'inactive-tab'}
        >
          Search Apartments
        </button>
        <button
          onClick={() => setShowPostForm(true)}
          className={showPostForm ? 'active-tab' : 'inactive-tab'}
        >
          Post a Listing
        </button>
      </div>

      {!showPostForm ? (
        // Search Form
        <div>
          <form onSubmit={handleSearch} className="search-form">
            <h2>Filter Apartments</h2>

            <div className="form-group">
              <label htmlFor="searchLocation">Location</label>
              <input
                type="text"
                id="searchLocation"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Enter city, state, or zip code"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="searchMinPrice">Min Price ($)</label>
                <input
                  type="number"
                  id="searchMinPrice"
                  value={searchMinPrice}
                  onChange={(e) => setSearchMinPrice(e.target.value)}
                  placeholder="500"
                />
              </div>

              <div className="form-group">
                <label htmlFor="searchMaxPrice">Max Price ($)</label>
                <input
                  type="number"
                  id="searchMaxPrice"
                  value={searchMaxPrice}
                  onChange={(e) => setSearchMaxPrice(e.target.value)}
                  placeholder="3000"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="searchBedrooms">Min Bedrooms</label>
                <input
                  type="number"
                  id="searchBedrooms"
                  value={searchBedrooms}
                  onChange={(e) => setSearchBedrooms(e.target.value)}
                  placeholder="Any"
                />
              </div>

              <div className="form-group">
                <label htmlFor="searchBathrooms">Min Bathrooms</label>
                <input
                  type="number"
                  id="searchBathrooms"
                  value={searchBathrooms}
                  onChange={(e) => setSearchBathrooms(e.target.value)}
                  placeholder="Any"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSearchLocation('');
                setSearchMinPrice('');
                setSearchMaxPrice('');
                setSearchBedrooms('');
                setSearchBathrooms('');
              }}
              className="clear-button"
            >
              Clear Filters
            </button>
          </form>
        </div>
      ) : (
        // Post Listing Form
        <form onSubmit={handlePostListing} className="post-form">
          <h2>Post Your Apartment</h2>

          <div className="form-group">
            <label htmlFor="title">Listing Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Cozy 2BR in Downtown"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State or Zip Code"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Monthly Rent ($) *</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1500"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms *</label>
              <input
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                placeholder="2"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms *</label>
              <input
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                placeholder="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your apartment..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <small>Paste a link to a photo of your apartment</small>
          </div>

          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email *</label>
            <input
              type="email"
              id="contactEmail"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactPhone">Contact Phone</label>
            <input
              type="tel"
              id="contactPhone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="form-group">
            <label>Amenities</label>
            <div className="amenities-grid">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.parking}
                  onChange={() => handleAmenityChange('parking')}
                />
                Parking
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.laundry}
                  onChange={() => handleAmenityChange('laundry')}
                />
                Laundry
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.petFriendly}
                  onChange={() => handleAmenityChange('petFriendly')}
                />
                Pet Friendly
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.airConditioning}
                  onChange={() => handleAmenityChange('airConditioning')}
                />
                Air Conditioning
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.heating}
                  onChange={() => handleAmenityChange('heating')}
                />
                Heating
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.dishwasher}
                  onChange={() => handleAmenityChange('dishwasher')}
                />
                Dishwasher
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.balcony}
                  onChange={() => handleAmenityChange('balcony')}
                />
                Balcony/Patio
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.pool}
                  onChange={() => handleAmenityChange('pool')}
                />
                Pool
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.gym}
                  onChange={() => handleAmenityChange('gym')}
                />
                Gym/Fitness
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.elevator}
                  onChange={() => handleAmenityChange('elevator')}
                />
                Elevator
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={amenities.furnished}
                  onChange={() => handleAmenityChange('furnished')}
                />
                Furnished
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Post Listing
          </button>
        </form>
      )}

      {/* Display all listings */}
      {listings.length > 0 && (
        <div className="listings-container">
          <h2>Available Apartments ({getFilteredListings().length})</h2>
          {getFilteredListings().length === 0 ? (
            <p className="no-results">No apartments match your search criteria. Try adjusting your filters.</p>
          ) : (
            <div className="listings-grid">
              {getFilteredListings().map((listing) => (
              <div key={listing.id} className="listing-card">
                {listing.imageUrl && (
                  <img src={listing.imageUrl} alt={listing.title} className="listing-image" />
                )}
                <div className="listing-content">
                  <h3>{listing.title}</h3>
                  <p className="listing-location">📍 {listing.location}</p>
                  <p className="listing-price">${listing.price}/month</p>
                  <p className="listing-details">
                    🛏️ {listing.bedrooms} bed | 🚿 {listing.bathrooms} bath
                  </p>
                  <p className="listing-description">{listing.description}</p>
                  {listing.amenities && Object.values(listing.amenities).some(val => val) && (
                    <div className="listing-amenities">
                      <p><strong>Amenities:</strong></p>
                      <div className="amenities-tags">
                        {listing.amenities.parking && <span className="amenity-tag">Parking</span>}
                        {listing.amenities.laundry && <span className="amenity-tag">Laundry</span>}
                        {listing.amenities.petFriendly && <span className="amenity-tag">Pet Friendly</span>}
                        {listing.amenities.airConditioning && <span className="amenity-tag">A/C</span>}
                        {listing.amenities.heating && <span className="amenity-tag">Heating</span>}
                        {listing.amenities.dishwasher && <span className="amenity-tag">Dishwasher</span>}
                        {listing.amenities.balcony && <span className="amenity-tag">Balcony</span>}
                        {listing.amenities.pool && <span className="amenity-tag">Pool</span>}
                        {listing.amenities.gym && <span className="amenity-tag">Gym</span>}
                        {listing.amenities.elevator && <span className="amenity-tag">Elevator</span>}
                        {listing.amenities.furnished && <span className="amenity-tag">Furnished</span>}
                      </div>
                    </div>
                  )}
                  <div className="listing-contact">
                    <p><strong>Contact:</strong></p>
                    <p>📧 {listing.contactEmail}</p>
                    {listing.contactPhone && <p>📞 {listing.contactPhone}</p>}
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ApartmentAnywhere;
