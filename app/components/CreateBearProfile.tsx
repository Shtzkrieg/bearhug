import { useState } from 'react';

const countries = {
  Germany: ['Masowien', 'Berlin', 'Danzig', 'Silesia', 'Pomerania', 'East Prussia', 'West Prussia', 'Posen', 'Saxony', 'Thuringia', 'Hesse', 'Westphalia', 'Rhineland', 'Saarland', 'Baden', 'Württemberg', 'Bavaria'],
  Korea: ['Pyongyang','Seoul', 'Busan'],
  USA: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
  Canada: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'],
  Mexico: ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico City', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
  China: ['Taiwan','Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu', 'Guangdong', 'Guangxi', 'Guizhou', 'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hubei', 'Hunan', 'Inner Mongolia', 'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning', 'Ningxia', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanghai', 'Shanxi', 'Sichuan', 'Tianjin', 'Tibet', 'Xinjiang', 'Yunnan', 'Zhejiang']
};

type CountryKey = keyof typeof countries;

function CreateBearProfile() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState<CountryKey | ''>('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [lastSighting, setLastSighting] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { name, city, state, country, description, size, lastSighting };

    // Prevent duplicate submissions
    if (JSON.stringify(formData) === lastSubmittedData) {
      alert('No changes detected. Please modify the form before submitting again.');
      return;
    }

    setIsLoading(true);

    const response = await fetch('/api/bears', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setIsLoading(false);

    if (response.ok) {
      alert('Bear profile created successfully!');
      setLastSubmittedData(JSON.stringify(formData));
    } else {
      alert('Failed to create bear profile.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Bear Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value as CountryKey);
              setState(''); // Reset state when country changes
            }}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {country && countries[country] && (
          <div className="mb-4">
            <label className="block text-gray-700">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select State</option>
              {countries[country].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Size</option>
            <option value="Tiny">Tiny</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Huge">Huge</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Sighting</label>
          <input
            type="datetime-local"
            value={lastSighting}
            onChange={(e) => setLastSighting(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          )}
          {isLoading ? 'Submitting...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
}

export default CreateBearProfile;