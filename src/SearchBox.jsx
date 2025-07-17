import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';


export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
            let jsonResponse = await response.json();
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                temp_min: jsonResponse.main.temp_min,
                temp_max: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feels_like: jsonResponse.main.feels_like,
                description: jsonResponse.weather[0].description,
            };
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    };



    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("City name is: ", city);
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setError(false); // Reset error on successful fetch
            setCity("");     // ✅ Clear input after successful search
        } catch (err) {
            setError(true);  // Set error if fetch fails
        }
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="Enter place here"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange} />
                <br /> <br />
                <Button variant="contained" type='submit'>
                    Search
                </Button>
                {error && <p className="error" style={{ color: "red" }}>Place not found. Please try again.</p>}
            </form>
        </div>
    );
}