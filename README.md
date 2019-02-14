# GoVote
This project's goal is to create a web application that the local public can use to easily view their voter registration and election candidate information based on their names and addresses.

Look up your voter status and get info on voting, voting registration, and election candidates.

For more informatation on the project, visit our [Wiki](https://github.com/codeforgso/GoVote/wiki).

## Data Sources

Voter Registration data is from the NC Board of Elections [FTP Site](https://dl.ncsbe.gov/)
The [City Council](http://data-greensboro.opendata.arcgis.com/datasets/829c58aaaf0c4bf0b59f93bfe3cb4c13_3)
and [County Commissioner](http://data-greensboro.opendata.arcgis.com/datasets/1b60f15bb4dc4d8f96bd4831a8fbf063_5) map data come from the [Greensboro Open Data Portal](http://data-greensboro.opendata.arcgis.com/)

## Contributing
Interested in contributing? Please read our [contributing guide](./.github/CONTRIBUTING.md)

## Development Site
A live version of our dev branch can be seen [here](http://govotegso-dev-1.us-east-1.elasticbeanstalk.com/)

## Steps to Deploy via Docker

In order to deploy this application, you will need to create a .env file and copy to it the contents of the sample.env file. Make sure to update the variable values with the intended values.
