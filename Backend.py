from flask import Flask, request, jsonify
import requests

app = Flask(__name__)


@app.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required."}), 400
    api_key = (
        "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}"
    )
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
    try:
        response = requests.get(url)
        weather_data = response.json()
        if response.status_code == 200:
            temperature = weather_data["main"]["temp"]
            return jsonify({"city": city, "temperature": temperature}), 200
        else:
            error_message = weather_data["message"]
            return jsonify({"error": error_message}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
