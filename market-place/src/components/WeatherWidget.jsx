import React, { useState, useEffect } from 'react';

const WmoIcons = {
  0: 'clear_day',
  1: 'partly_cloudy_day',
  2: 'partly_cloudy_day',
  3: 'cloud',
  45: 'foggy',
  48: 'foggy',
  51: 'rainy',
  53: 'rainy',
  55: 'rainy',
  61: 'rainy',
  63: 'rainy',
  65: 'rainy',
  71: 'snowing',
  73: 'snowing',
  75: 'snowing',
  95: 'thunderstorm'
};

const WeatherWidget = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);
  const [locationName, setLocationName] = useState("Local Area");

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
        const result = await res.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeather(lat, lon);
          
          try {
             const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
             if (geoRes.ok) {
                 const geoData = await geoRes.json();
                 setLocationName(geoData.city || geoData.locality || "Your Location");
             }
          } catch(e) {}
        },
        (error) => {
          fetchWeather(36.7783, -119.4179);
          setLocationName("Green Valley Farm, CA");
        }
      );
    } else {
      fetchWeather(36.7783, -119.4179);
      setLocationName("Green Valley Farm, CA");
    }
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-surface-container-highest p-8 rounded-xl shadow-sm flex items-center justify-center h-full min-h-[300px]">
         <div className="animate-spin material-symbols-outlined text-primary text-4xl">progress_activity</div>
      </div>
    );
  }

  const { current, daily } = data;
  const currentIcon = WmoIcons[current?.weather_code] || 'partly_cloudy_day';

  return (
    <div className="bg-surface-container-highest p-8 rounded-xl shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-on-surface">Local Conditions</h3>
          <p className="text-sm text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            {locationName}
          </p>
        </div>
        <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{currentIcon}</span>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-container-low transition-colors cursor-default">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-stone-500">device_thermostat</span>
            <span className="text-sm font-medium">Temperature</span>
          </div>
          <span className="text-lg font-bold">{current?.temperature_2m}&deg;C</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-container-low transition-colors cursor-default">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-stone-500">water_drop</span>
            <span className="text-sm font-medium">Rainfall</span>
          </div>
          <span className="text-lg font-bold">{current?.precipitation}mm</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-container-low transition-colors cursor-default">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-stone-500">humidity_percentage</span>
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <span className="text-lg font-bold">{current?.relative_humidity_2m}%</span>
        </div>
      </div>
      
      {showForecast && daily && (
        <div className="mt-6 pt-6 border-t border-stone-300 dark:border-stone-700">
          <h4 className="font-bold text-sm mb-4 text-on-surface-variant">5-Day Forecast</h4>
          <div className="space-y-3">
            {daily.time.slice(1, 6).map((timeStr, index) => {
              const d = new Date(timeStr);
              const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
              const wIcon = WmoIcons[daily.weather_code[index + 1]] || 'cloud';
              const maxT = Math.round(daily.temperature_2m_max[index + 1]);
              const minT = Math.round(daily.temperature_2m_min[index + 1]);
              
              return (
                <div key={timeStr} className="flex items-center justify-between text-sm p-2 rounded hover:bg-surface/50 cursor-pointer transition-colors">
                  <span className="w-10 font-bold">{dayName}</span>
                  <span className="material-symbols-outlined text-primary">{wIcon}</span>
                  <div className="w-20 text-right">
                     <span className="font-bold">{maxT}&deg;</span> <span className="text-stone-500 text-xs ml-1">{minT}&deg;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button 
        onClick={() => setShowForecast(!showForecast)}
        className="w-full mt-8 py-3 bg-secondary-container hover:bg-surface-variant text-on-secondary-container rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 active:scale-95"
      >
        {showForecast ? 'Hide Forecast' : 'View Full Forecast'}
        <span className="material-symbols-outlined text-[20px]">
          {showForecast ? 'expand_less' : 'expand_more'}
        </span>
      </button>
    </div>
  );
};

export default WeatherWidget;
