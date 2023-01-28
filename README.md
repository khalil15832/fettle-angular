# Client-side application for Fettle

The client-side part of Fettle, built with Angular. Directories further down the tree are described in more detail in their respective README files.

## Installation

1. Clone the repository
2. Install the dependencies listed in package.json using `npm install`/`npm i`
3. Run the app using `ng serve`/`npm start`

### Using Docker

1. Clone the repository
2. Build the image using `docker build -t <image_name> .`
3. Run the container using `docker run -d -p <any_open_port>:4200 <image_name>`
4. Navigate to `http://localhost:<port_used_above>/`

## A look at the app

Look up catalogued diseases
![Screenshot from 2023-01-28 21-19-18](https://user-images.githubusercontent.com/78612244/215276380-f334f1bc-78d1-40da-a7c6-a5f775bba79c.png)

Narrow down diseases using a list of symptoms
![Screenshot from 2023-01-28 21-19-08](https://user-images.githubusercontent.com/78612244/215276409-aef94ba6-5adf-46bc-a9b1-66ad630f1917.png)

Supports basic user authorization/authentication; forms validated using Angular's Forms module
![Screenshot from 2023-01-28 21-20-40](https://user-images.githubusercontent.com/78612244/215276417-d6d28369-20af-4350-a652-196a5f47263d.png)

Bookmark diseases for future reference, once logged in
![Screenshot from 2023-01-28 21-19-46](https://user-images.githubusercontent.com/78612244/215276452-bd8966ba-cf72-41dc-8b4f-181288b11ef5.png)

![Screenshot from 2023-01-28 21-19-59](https://user-images.githubusercontent.com/78612244/215276465-eb6bc645-e2e5-4ac9-a9d6-2b51769dc618.png)
