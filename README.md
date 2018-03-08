# GoVote
This project's goal is to create a web application that the local public can use to easily view their voter registration and election candidate information based on their names and addresses.

Look up your voter status and get info on voting, voting registration, and election candidates.

*Detailed description of the project coming soon!*

## Installation
Make sure you have [Node](https://nodejs.org/en/) >= 8 installed.

### To install:

- Fork the project 

````
    git clone https://github.com/<YOUR_GITHUB_USERNAME>/GoVote.git && cd GoVote && npm install
    npm start
````

The client application is a React app running at http://localhost:8000/.
The server is an Express API running at http://localhost:3000.  
Currently the database is an Amazon RDS Postgresql instance. Contact @blake or @schaestewart on [slack](http://slack.codeforgreensboro.org/) for DB credentials.

## Data Sources

Voter Registration data is from the NC Board of Elections [FTP Site](https://dl.ncsbe.gov/)  
The [City Council](http://data-greensboro.opendata.arcgis.com/datasets/829c58aaaf0c4bf0b59f93bfe3cb4c13_3) 
and [County Commissioner](http://data-greensboro.opendata.arcgis.com/datasets/1b60f15bb4dc4d8f96bd4831a8fbf063_5) map data come from the [Greensboro Open Data Portal](http://data-greensboro.opendata.arcgis.com/)

## Contributing
Interested in contributing? Please read our [contributing guide](./.github/CONTRIBUTING.md)