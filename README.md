# Unmanned - Drone themed shop!

-----

# Navigation

- [Team](#team)
- [Architecture](#code-architecture)
- [Structure](#project-structure)
- [API](#api)
- [Additional: Code Style](#code-style)
- [Additional: More Info](#more-info)

-----

# Team [↑](#navigation)

- [Tereshonok Maksym](https://github.com/TereshonokMaksim) - Teamlead.
- [Mozgoviy Artem](https://github.com/MozgoviyArtem) - Team Member.
- [Tkachuk Gleb](https://github.com/Gleb-Tkachuk) - Team Member.

-----

# Code architecture [↑](#navigation)

This project has Backend and Frontend as its 2 main parts. They have unique roles and work together, to create an app.
- Backend - Everything that happens on server. Client (user) doesn't directly see what happens here, but it heavily influences how Frontend works.
- Frontend - Everything that happens on client side. Here, client sees and can interact with this site, but it doesn't have heavy logic or databases, so it depends on Backend. 

## Backend architecture

Backend architecture is based on popular, yet quite simple Onion type architecture, in which there are 4 layers:

- Router - First layer, accepts request and selects corresponding Controller function to process the request. Can also call Middleware as pre-processors.
- Controller - Second layer, makes basic request processing, has basic data validators and can interact with Service.
- Service - Third layer. There, lots of so-called Business logic happens, which is essentially just some processes that can be complicated, such as database analysis. 
- Repository - Fourth layer. It is responsible for accessing database data. It, usually, has no data processing, as it is task of Service or, sometimes, Controller.

-----

# Project structure [↑](#navigation)

This project has structure that divides it by apps. Every app has its own function.

## Backend part Structure

- /package.json - Contains base project data, list of required dependecies and scripts for quick building.
- /prisma/ - Contains Prisma ORM scheme and Database files 
- /src/ - Contains the project itself
- /src/server.ts - Server file, responsible for final packing of Routers into server, setting HOST and POST and running the server itself.

_This list will increase by the time_

-----

# API [↑](#navigation)

As this project has Frontend, it has API as well, so it can communicate with Backend. It has features such as:

- Authorization - It has authorization keys that are used to identify users between different devices and IPs.
- Actions - It allows user to perform many operations, starting from simple such as getting product page, up to creating whole order, according to info acquired from Backend.
- Optimization - It has capabulities to allow Pagination and quick filter/sort options, so user can swiftly find the product they want.

<details>
<summary><b>Product Module</b></summary>

<details>
<summary><b>Return Types</b></summary>

- __Product__
```ts
    {
        id: number,
        name: string,
        description: string,
        price: number,
        discount: number,
        media: string,
        count: number
    }
```
- __ErrorMessage__
```ts
    {
        message: string
    }
```
</details>

---

__GET /products/ - Gets all products__

Query Table

|  Parameter |  Type   |               Description                |
|------------|---------|------------------------------------------|
|    skip    | Integer |  Skips defined amount of first products  |
|    take    | Integer |     Takes defined amount of products     |
| categoryId | Integer | Gets only products from defined category |

Status Code table

| CODE |       Status Code     |    Returns   |       Description     |
|------|-----------------------|--------------|-----------------------|
|  200 |           OK          | Product List |   Request Successful  |
|  400 |       Bad Request     | ErrorMessage |   Wrong skip or take  |
|  500 | Internal Server error | ErrorMessage | Internal Server Error |



__GET /products/id - Gets product by ID__

| CODE |       Status Code     |    Returns   |           Description          |
|------|-----------------------|--------------|--------------------------------|
|  200 |           OK          |   Product    |       Request Successful       |
|  400 |       Bad Request     | ErrorMessage |          Wrong ID data         |
|  404 |        Not Found      | ErrorMessage | Product with that ID not found |
|  500 | Internal Server error | ErrorMessage |     Internal Server Error      |

__POST /products/ - Creates product with data from body__

Body should have same structure as Product without ID


| CODE |       Status Code     |    Returns   |         Description         |
|------|-----------------------|--------------|-----------------------------|
|  201 |        Created        |   Product    |    Creation Successful      |
|  401 |      Unathorized      | ErrorMessage | You need to login to create |
|  422 | Unprocessable Content | ErrorMessage |       Wrong body data       |
|  500 | Internal Server error | ErrorMessage |   Internal Server Error     |

__DELETE /products/id - Deletes products with ID__

| CODE |       Status Code     |    Returns   |           Description          |
|------|-----------------------|--------------|--------------------------------|
|  200 |           OK          |   Product    |       Request Successful       |
|  400 |      Bad Request      | ErrorMessage |          Wrong ID data         |
|  401 |      Unathorized      | ErrorMessage |  You need to login to delete   |
|  404 |       Not Found       | ErrorMessage | Product with that ID not found |
|  500 | Internal Server error | ErrorMessage |     Internal Server Error      |

</details>

----

# Additional

## Code style [↑](#navigation)

Code, written in this project has basic code styling, such as:
- 4 spaces per one tabulation
- Creating empty line between large functions
- Splitting code into different modules
- Readable and easily-understandable variable and function names

All of the above is required for better readability and code maanagement

## More info [↑](#navigation)

### Scripts

This is a list of avalaible to use scripts, which will help you to faster launch this app.

- start - Starts project. If it outputs error check whether you are on stable version and did migrations.
- migrate - Makes database migrations.
- format - Formats Prisma schema file. If you are not planning on changing schema, you can safely forget about this.
- gen - Generates Prisma files. Use if you have some unsolved problems linked with Prisma.

_Note: to use scripts you need to have installed npm with NodeJS and enter "npm run {script-name}" into terminal with opened folder of package.json_