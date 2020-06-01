define({ "api": [
  {
    "type": "get",
    "url": "/api/avgtemp/:cname/:month",
    "title": "Monthly report of a city",
    "version": "1.0.0",
    "name": "processMonthly",
    "group": "Weather",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Auth-Token",
            "description": "<p>Bearer-Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"auth-token:\": \"my_secure_token\",\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Some description about this API</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cname",
            "description": "<p>City name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "\"1\"",
              "\"2\"",
              "\"3\"",
              "\"12\""
            ],
            "optional": false,
            "field": "month",
            "description": "<p>Month Number</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage: return a minified response",
        "content": "curl -XGET  http://localhost/api/avgtemp/amsterdam/12",
        "type": "json"
      },
      {
        "title": "Example usage: return full response",
        "content": "curl -XGET  http://localhost/api/avgtemp/amsterdam/12?verbose=true",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The record id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_city",
            "description": "<p>The city it.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>Year num</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "month",
            "description": "<p>Month num</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Month name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avgMinTemp",
            "description": "<p>Average temperature</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"_id\": \"5ed2721de312bd2d126d580f\",\n    \"_city\": \"5ed26e0b1d567b579e9107cc\",\n    \"year\": 2020,\n    \"month\": 6,\n    \"name\": \"June\"\n    \"absMaxTemp\": 27.638666,\n    \"absMaxTempF\": 81.7,\n    \"avgDailyRainfall\": 0.5,\n    \"avgMinTemp\": 12.6,\n    \"avgMinTempF\": 54.6,\n    \"created\": \"2020-05-30T14:47:57.833Z\",\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 403 Not Allowed\n{\n  'error': 'Access is not allowed!'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/monthly.js",
    "groupTitle": "Weather"
  },
  {
    "type": "get",
    "url": "/api/currentweather/:cname",
    "title": "Current weather of a city",
    "version": "1.0.0",
    "name": "processWeather",
    "group": "Weather",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Auth-Token",
            "description": "<p>Bearer-Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"auth-token:\": \"my_secure_token\",\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Some description about this API</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cname",
            "description": "<p>City name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage: return a minified response",
        "content": "curl -XGET  http://localhost/api/currentweather/covilha",
        "type": "json"
      },
      {
        "title": "Example usage: return full response",
        "content": "curl -XGET  http://localhost/api/currentweather/covilha?verbose=true",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The record id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_city",
            "description": "<p>The city it.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "localtime",
            "description": "<p>Localtime</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "utc",
            "description": "<p>The exact UTC time in format of YYYMMDDHM</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "condition",
            "description": "<p>Weather condition object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   '_id': '5ed36500c62577e423e33a83',\n   '_city': '5ed26e0b1d567b579e9107cc',\n   'utc': 202053184,\n   'localtime': '2020-05-31 09:00',\n   'condition': {\n     'weatherIconUrl': [],\n     'weatherDesc': [{ 'value': 'Light rain shower' }],\n     'weatherCode': 353,\n     'windspeedMiles': 1,\n     'windspeedKmph': 2,\n     'winddirDegree': 1,\n     'humidity': 79,\n     'visibility': 10,\n     'visibilityMiles': 6,\n     'pressure': 1010,\n     'pressureInches': 30,\n     'cloudcover': 87,\n     'FeelsLikeC': 15,\n     'FeelsLikeF': 58,\n     'uvIndex': 7,\n     'tempC': 15,\n     'tempF': 58\n   },\n   'created': '2020-05-31T08:04:16.420Z'\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 403 Not Allowed\n{\n  'error': 'Access is not allowed!'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/weather.js",
    "groupTitle": "Weather"
  }
] });
