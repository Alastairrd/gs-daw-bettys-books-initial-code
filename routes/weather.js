// Create a new router
const express = require("express");
const request = require("request");
const router = express.Router();

const apiKey = "919166592de9d0bd9d18b4701db32808";

router.get("/", function (req, res, next) {
	//return weather details object
	//if we have a keyword, look for search results
	let weatherDetails = { present: false, location: "", result: "" };
	if (req.query.location != undefined) {
		let url = `http://api.openweathermap.org/data/2.5/weather?q=${req.query.location}&units=metric&appid=${apiKey}`;

		request(url, function (err, response, body) {
			if (err) {
				next(err);
			} else {
				var weather = JSON.parse(body);
                if(weather !== undefined && weather.main !== undefined && weather.wind !== undefined){
                    weatherDetails = Object.assign({}, weatherDetails, {
                        location: req.query.location,
                        present: true,
                        result: weather,
                    });
                    console.log(weatherDetails.result)
                    res.render("weather.ejs", weatherDetails);
                }
				else {
                    res.send("No data found!")
                }
			}
		});
	} else {
		res.render("weather.ejs", weatherDetails);
	}
});

//lab 5 weather api
router.get("/londonnow", (req, res) => {
	let city = "london";
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

	request(url, function (err, response, body) {
		if (err) {
			next(err);
		} else {
			var weather = JSON.parse(body);
			var wmsg =
				"It is " +
				weather.main.temp +
				" degrees in " +
				weather.name +
				"! <br> The humidity now is: " +
				weather.main.humidity;
			res.send(wmsg);
		}
	});
});

// Export the router object so index.js can access it
module.exports = router;
