# Masterclaw

readme in WIP...

[![languages](https://skillicons.dev/icons?i=express,mysql,vite,sass,ts,react,mui,nodejs,mongo,js,jest,npm)](https://skillicons.dev)

## Backend

### Server

[![languages](https://skillicons.dev/icons?i=nodejs,express)](https://skillicons.dev)  
The server is responsible for authenticating users, retrieving and sending information about cards, decks and users.  
It interacts with the YGOPRODeck API according to the rules precisely defined on [API Guide](https://ygoprodeck.com/api-guide/)

- Caching of images already downloaded: Images must be stored locally after the first download.
- Minimization of API calls: All retrieved information must be stored locally to minimize API calls.
- Rate limiting: The API imposes a limit of 20 requests per second. It is crucial to respect this limit to avoid being blocked for an hour.

Fetched information is stored in a MongoDB database.  
The use of the [Mongoose ODM](https://mongoosejs.com/) helps a lot for type casting, validation, and query building.

### Database

[![languages](https://skillicons.dev/icons?i=mongo,mysql)](https://skillicons.dev)  
See here what is stored and how : [Mongoose models file](./backend/server/mongo/schemas.js)  
Since the server stores information from the API locally, i need to also store the user queries to get back the already stored information.  
I can check if any of the [substrings](https://en.wikipedia.org/wiki/Substring) of the query is stored, if so, all the cards that would have been fetched is already stored in the database, for example :  
As an user, i search `darke`,  
Any of the occurences are valid sub-queries : `darke`, `dark`, `arke`, `dar`, `rke`  
since I deliberately chose to set the minimum query length to be 3.  

### Test

[![languages](https://skillicons.dev/icons?i=jest,js)](https://skillicons.dev)
