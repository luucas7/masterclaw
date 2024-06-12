# Masterclaw

readme in WIP...

[![languages](https://skillicons.dev/icons?i=express,mysql,vite,sass,ts,docker,react,mui,nodejs,mongo,nginx,js,jest,npm)](https://skillicons.dev)

## Backend

### Server

[![languages](https://skillicons.dev/icons?i=nodejs,express)](https://skillicons.dev)  
The server is responsible for authenticating users, retrieving and sending information about cards, decks and users.  
It interacts with the YGOPRODeck API according to the rules precisely defined on [API Guide](https://ygoprodeck.com/api-guide/)

- Caching of images already downloaded: Images must be stored locally after the first download.
- Minimization of API calls: All retrieved information must be stored locally to minimize API calls.
- Rate limiting: The API imposes a limit of 20 requests per second.

Fetched information is stored in a MongoDB database.  
The [Mongoose ODM](https://mongoosejs.com/) helps a lot for type casting, validation, and query building.

### Database

[![languages](https://skillicons.dev/icons?i=mongo)](https://skillicons.dev)  
About the application data, see here what is stored and how : [Models file](./backend/server/mongo/schemas.js)  
Models define the structure of documents in the MongoDB database. They specify the fields and data types for each collection, as well as the relationships between different collections. MongoDB uses collections to group similar documents. 

Since the server stores information from the API locally, it also needs to store the user queries to get the stored information.  
The server checks if any of the [substrings](https://en.wikipedia.org/wiki/Substring) of the query is stored,  
if so, all the cards that would have been fetched is already stored in the database, for example :
  
As an user, i search `darke`,  
Any of the occurences are valid sub-queries : `darke`, `dark`, `arke`, `dar`, `rke`  
since I deliberately chose to set the minimum query length to be 3.

### Testing

[![languages](https://skillicons.dev/icons?i=jest,js)](https://skillicons.dev)

## Frontend
[![languages](https://skillicons.dev/icons?i=react,mui,sass,vite)](https://skillicons.dev)

## Deployement
[![languages](https://skillicons.dev/icons?i=docker)](https://skillicons.dev)

