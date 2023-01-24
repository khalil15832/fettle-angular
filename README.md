# Client-side application for Fettle

The client-side part of Fettle, built with Angular. Directories further down the tree are described in more detail in their respective README files.

## Installation

1. Clone the repository
2. Install the dependencies listed in package.json using `npm install`/`npm i`
3. Run the app using `ng serve`/`npm start`

### Using Docker

1. Clone the repository
2. Build the image using `docker build -t <image_name> .`
3. Run the container using `docker run -d -p 4200:4200 <image_name>`
4. Navigate to `http://localhost:4200/`
