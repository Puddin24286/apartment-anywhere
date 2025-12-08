import React, { useState } from 'react';
import '../styles/ApartmentAnywhere.css';

function ApartmentAnywhere() {
  // Search filters
  const [searchLocation, setSearchLocation] = useState('');
  const [searchPriceRange, setSearchPriceRange] = useState('');

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

  // Store all posted listings
  const [listings, setListings] = useState([]);

  // Toggle between search view and post listing view
  const [showPostForm, setShowPostForm] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for apartments in:', searchLocation, 'Price range:', searchPriceRange);
    // Add your search logic here
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
      contactPhone
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
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label htmlFor="searchLocation">Location</label>
            <input
              type="text"
              id="searchLocation"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Enter city or zip code"
            />
          </div>

          <div className="form-group">
            <label htmlFor="searchPrice">Price Range</label>
            <input
              type="text"
              id="searchPrice"
              value={searchPriceRange}
              onChange={(e) => setSearchPriceRange(e.target.value)}
              placeholder="e.g., $1000-$2000"
            />
          </div>

          <button type="submit" className="search-button">
            Search Apartments
          </button>
        </form>
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

          <button type="submit" className="submit-button">
            Post Listing
          </button>
        </form>
      )}

      {/* Display all listings */}
      {listings.length > 0 && (
        <div className="listings-container">
          <h2>Available Apartments ({listings.length})</h2>
          <div className="listings-grid">
            {listings.map((listing) => (
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
                  <div className="listing-contact">
                    <p><strong>Contact:</strong></p>
                    <p>📧 {listing.contactEmail}</p>
                    {listing.contactPhone && <p>📞 {listing.contactPhone}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApartmentAnywhere;
