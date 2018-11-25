# [Where 2 Compare](https://where-2-compare.herokuapp.com/)

Compare where to go. [View App](https://where-2-compare.herokuapp.com/)

## Implimentation

- Used the Scrapy Python library to crawl 20k+ pages of a website, parse the html to extract relevant data, store Numpy & SciPy analysis of parts of the data, and then saved the results into a MongoDB collection.
- Used Node.js & Mongoose to parse NOAA's weather normals txt files and store them in a MongoDB collection
- Created a Node.js & Express server to reveal a JSON API of the stored data, and to create a user-facing web-app that allows people to visualize the weather & city information on an interactive D3.js rendered map of the US.

## [Additional Notes](notes.md)