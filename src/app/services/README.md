# services

Contains both the services responsible for handling HTTP requests:

- `DiseaseService` - Contains methods for retrieving a disease list from the backend (or a cached version, if it exsits), to retrieve details for a specific disease, and to send a query to the backend to retrieve a list of diseases that match the queried symptoms
- `UserService` - Contains methods for user authentication/registration, and retrieving user information.
