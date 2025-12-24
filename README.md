# Unmanned - Drone themed shop!

-----

# Navigation

- [Team](#team-)
- [Architecture](#code-architecture-)
- [Structure](#project-structure-)
- [API](#api-)
- [Additional: Authentication System](#authentication-system-)
- [Additional: Code Style](#code-style-)
- [Additional: More Info](#more-info-)

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
- __ProductBlock__
```ts
    {
        description: string,
        media: string,
        productId: number,
        title: string,
        align: string,
        orderNum: number,
        productDetailDatas: {
            name: string,
            orderNum: number,
            productDetailBasics: {
                orderNum: number,
                text: string
            }[],
            productDetailBolds: {
                orderNum: number,
                text: string
            }[]
        }[]
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
|  404 |       Not Found       | ErrorMessage | Wrong/Bad categoryId  |
|  500 | Internal Server error | ErrorMessage | Internal Server Error |


<details>
<summary>Successful response example</summary>

```json
[
    {
        "name": "Uraninite",
        "id": 52,
        "description": "Little pieces of Uraninite for not so cheap price",
        "price": 300,
        "categoryId": 5,
        "discount": 7,
        "media": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Uraninite-usa32abg.jpg/250px-Uraninite-usa32abg.jpg",
        "count": 1930,
    },
    {
        "name": "Garnierite",
        "id": 52,
        "description": "Garnierite ore quality batches. Not really suitable for decorations (preview is not reference to actual product)",
        "price": 15,
        "categoryId": 9,
        "discount": 0,
        "media": "https://www.le-comptoir-geologique.com/_media/img/large/garnierite.webp",
        "count": 1930,
    }
]
```

</details>

__GET /products/*id* - Gets product by ID__

| CODE |       Status Code     |    Returns   |           Description          |
|------|-----------------------|--------------|--------------------------------|
|  200 |           OK          |   Product    |       Request Successful       |
|  400 |       Bad Request     | ErrorMessage |          Wrong ID data         |
|  404 |        Not Found      | ErrorMessage | Product with that ID not found |
|  500 | Internal Server error | ErrorMessage |     Internal Server Error      |

<details>
<summary>Successful response example</summary>

```json
{
    "id": 2,
    "name": "Yellowcake",
    "description": "uhhh, is this even legal to sell online? Nah whatever.",
    "price": 6000,
    "categoryId": 2,
    "discount": 499.99,
    "media": "https://world-nuclear-news.org/images/articles/Yellowcake-U3O8-(Kazatomprom)-2018x.jpg",
    "count": 5,
    "productMainBlocks": [
        {
            "id": 1,
            "productId": 2,
            "title": "Pure testing",
            "description": "Testing block number 1 lets go error wow who could have thought???",
            "media": "https://geologyscience.com/wp-content/uploads/2023/04/139119964-torbernite-uranium-ore-from-margabal-mine-france-isolated-on-white-background.webp",
            "align": "column",
            "orderNum": 1,
            "productDetailDatas": []
        },
        {
            "id": 4,
            "productId": 2,
            "title": "Pure form of testing",
            "description": "Testing block number 2 lets go one error is behind us its much better than i imagined",
            "media": "https://geologyscience.com/wp-content/uploads/2023/04/139119964-torbernite-uranium-ore-from-margabal-mine-france-isolated-on-white-background.webp",
            "align": "rowReversed",
            "orderNum": 1,
            "productDetailDatas": [
                {
                    "id": 2,
                    "name": "of tests",
                    "orderNum": 1,
                    "productMainBlockId": 4,
                    "productDetailBasics": [],
                    "productDetailBolds": []
                },
                {
                    "id": 3,
                    "name": "uranium quality",
                    "orderNum": 1,
                    "productMainBlockId": 4,
                    "productDetailBasics": [],
                    "productDetailBolds": []
                }
            ]
        },
        {
            "id": 5,
            "productId": 2,
            "title": "Pure form of testing",
            "description": "Testing block number 2 lets go one error is behind us its much better than i imagined",
            "media": "https://geologyscience.com/wp-content/uploads/2023/04/139119964-torbernite-uranium-ore-from-margabal-mine-france-isolated-on-white-background.webp",
            "align": "rowReversed",
            "orderNum": 1,
            "productDetailDatas": [
                {
                    "id": 4,
                    "name": "of tests",
                    "orderNum": 1,
                    "productMainBlockId": 5,
                    "productDetailBasics": [],
                    "productDetailBolds": []
                },
                {
                    "id": 5,
                    "name": "uranium quality",
                    "orderNum": 1,
                    "productMainBlockId": 5,
                    "productDetailBasics": [],
                    "productDetailBolds": []
                }
            ]
        },
        {
            "id": 6,
            "productId": 2,
            "title": "Quality control",
            "description": "yeah we dont have that",
            "media": "https://upload.wikimedia.org/wikipedia/commons/8/8f/BlueRingwoodite.jpg",
            "align": "column",
            "orderNum": 2,
            "productDetailDatas": [
                {
                    "id": 6,
                    "name": "of optimization",
                    "orderNum": 1,
                    "productMainBlockId": 6,
                    "productDetailBasics": [],
                    "productDetailBolds": []
                },
                {
                    "id": 7,
                    "name": "ringwoodite purity",
                    "orderNum": 1,
                    "productMainBlockId": 6,
                    "productDetailBasics": [],
                    "productDetailBolds": []
                }
            ]
        }
    ]
}
```

</details>

__POST /products/ - Creates product with data from body__

Body should have same structure as Product without ID


<details>
<summary>Successful request Example</summary>

```json
{
    "name": "Fresh Sulfur",
    "description": "Acquired from volcano 2 hours ago. Its still hot.",
    "price": 56,
    "categoryId": 1,
    "discount": 1.99,
    "media": "https://encrypted-tbn0.gstatic.com/images,q=tbn:ANd9GcTLlW_LaUE6Lk_5grfKbk0UlLV6TIWjIhA3hA&s",
    "count": 2
}
```

</details>

| CODE |       Status Code     |    Returns   |         Description         |
|------|-----------------------|--------------|-----------------------------|
|  201 |        Created        |   Product    |    Creation Successful      |
|  401 |      Unathorized      | ErrorMessage | You need to login to create |
|  422 | Unprocessable Content | ErrorMessage |       Wrong body data       |
|  500 | Internal Server error | ErrorMessage |   Internal Server Error     |

<details>
<summary>Successful response example</summary>

```json
{
    "id": 12,
    "name": "Fresh Sulfur",
    "description": "Acquired from volcano 2 hours ago. Its still hot.",
    "price": 56,
    "categoryId": 1,
    "discount": 1.99,
    "media": "https://encrypted-tbn0.gstatic.com/images,q=tbn:ANd9GcTLlW_LaUE6Lk_5grfKbk0UlLV6TIWjIhA3hA&s",
    "count": 2
}
```

</details>

__DELETE /products/*id* - Deletes products with ID__

| CODE |       Status Code     |    Returns   |           Description          |
|------|-----------------------|--------------|--------------------------------|
|  200 |           OK          |   Product    |       Request Successful       |
|  400 |      Bad Request      | ErrorMessage |          Wrong ID data         |
|  401 |      Unathorized      | ErrorMessage |  You need to login to delete   |
|  404 |       Not Found       | ErrorMessage | Product with that ID not found |
|  500 | Internal Server error | ErrorMessage |     Internal Server Error      |


<details>
<summary>Successful response example</summary>

```json
{
    "id": 12,
    "name": "Cobaltite",
    "description": "Big chunk of cobaltite with estimated 61% purity. Mined in Germany.",
    "price": 290,
    "categoryId": 9,
    "discount": 9.99,
    "media": "https://ars.els-cdn.com/content/image/3-s2.0-B9780128020418000018-f01-18-9780128020418.jpg",
    "count": 20
}
```
</details>

__POST /products/block/ - Creates info block for product__

<details>
<summary>Successful request Example</summary>

```json
{
    "description": "Our Granite is of the highest quality, mined with advanced tools and enhanced accuracy, to ensure, stability and beauty of your rock.",
    "media": "https://preview.redd.it/f86zncthtfy51.jpg?width=1080&crop=smart&auto=webp&s=a8cd2292c15a69e46a1e715f7ea185e065cfeb6a",
    "productId": 221,
    "title": "Pure form of Rock",
    "align": "row",
    "orderNum": 1,
    "productDetailDatas": [{
        "name": "of polishing",
        "orderNum": 1,
        "productDetailBasics": [{
            "orderNum": 1,
            "text": "5 hours"
        }],
        "productDetailBolds": []
    },
    {
        "name": "of natural rock",
        "orderNum": 2,
        "productDetailBasics": [],
        "productDetailBolds": [{
            "orderNum": 1,
            "text": "100%"
        }]
    }]
}
```
</details>

| CODE |      Status Code      |   Returns    |      Description      |
|------|-----------------------|--------------|-----------------------|
| 201  |      OK, created      | ProductBlock |   Creation Succesful  |
| 400  |      Bad Request      | ErrorMessage |    Wrong body data    |
| 500  | Internal Server Error | ErrorMessage | Internal Server Error |

<details>
<summary>Successful response Example</summary>

```json
{
    "id": 132790,
    "description": "Our Granite is of the highest quality, mined with advanced tools and enhanced accuracy, to ensure, stability and beauty of your rock.",
    "media": "https://preview.redd.it/f86zncthtfy51.jpg?width=1080&crop=smart&auto=webp&s=a8cd2292c15a69e46a1e715f7ea185e065cfeb6a",
    "productId": 221,
    "title": "Pure form of Rock",
    "align": "row",
    "orderNum": 1,
    "productDetailDatas": [{
        "name": "of polishing",
        "orderNum": 1,
        "productDetailBasics": [{
            "orderNum": 1,
            "text": "5 hours"
        }],
        "productDetailBolds": []
    },
    {
        "name": "of natural rock",
        "orderNum": 2,
        "productDetailBasics": [],
        "productDetailBolds": [{
            "orderNum": 1,
            "text": "100%"
        }]
    }]
}
```
</details>

</details>

<details>
<summary><b>Category Module</b></summary>

<details>
<summary><b>Return Types</b></summary>

- __Category__
```ts
    {
        id: number,
        name: string,
        icon: string
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

__GET /categories/ - Gets all categories__

Query Table

|  Parameter |  Type   |                Description                 |
|------------|---------|--------------------------------------------|
|    skip    | Integer |  Skips defined amount of first categories  |
|    take    | Integer |     Takes defined amount of categories     |

Status Code table

| CODE |       Status Code     |    Returns    |       Description     |
|------|-----------------------|---------------|-----------------------|
|  200 |           OK          | Category List |   Request Successful  |
|  400 |       Bad Request     | ErrorMessage  |   Wrong skip or take  |
|  500 | Internal Server error | ErrorMessage  | Internal Server Error |

<details>
<summary>Successful response example</summary>

```json
[
    {
        "name": "Uranium",
        "id": 5,
        "icon": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Uranium_ore_square.jpg"
    },
    {
        "name": "Ores",
        "id": 9,
        "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Psilomelane-167850.jpg/250px-Psilomelane-167850.jpg"
    },
    {
        "name": "Sulfur",
        "id": 1,
        "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Sulfur-sample.jpg/1200px-Sulfur-sample.jpg"
    }
]
```

</details>

__POST /category/ - Creates product with data from body__

Body should have same structure as Category without ID

<details>
<summary>Successful request Example</summary>

```json
{
    "name": "Kyber",   
    "icon": "https://static.wikia.nocookie.net/starwars/images/5/5f/LightsaberCrystal-SWE.png/revision/latest?cb=20160911062335"
}
```

</details>


| CODE |       Status Code     |    Returns   |         Description         |
|------|-----------------------|--------------|-----------------------------|
|  201 |        Created        |   Category   |    Creation Successful      |
|  401 |      Unathorized      | ErrorMessage | You need to login to create |
|  422 | Unprocessable Content | ErrorMessage |       Wrong body data       |
|  500 | Internal Server error | ErrorMessage |   Internal Server Error     |

<details>
<summary>Successful response example</summary>

```json
{
    "id": 3,
    "name": "Kyber",   
    "icon": "https://static.wikia.nocookie.net/starwars/images/5/5f/LightsaberCrystal-SWE.png/revision/latest?cb=20160911062335"
}
```

</details>

__DELETE /categories/*id* - Deletes category with defined ID__

| CODE |       Status Code     |    Returns    |           Description           |
|------|-----------------------|---------------|---------------------------------|
|  200 |           OK          |   Category    |       Request Successful        |
|  400 |      Bad Request      | ErrorMessage  |          Wrong ID data          |
|  401 |      Unathorized      | ErrorMessage  |  You need to login to delete    |
|  404 |       Not Found       | ErrorMessage  | Category with that ID not found |
|  500 | Internal Server error | ErrorMessage  |     Internal Server Error       |


<details>
<summary>Successful response example</summary>

```json
{
    "name": "Domestic Drones",   
    "id": 1,
    "icon": "https://www.army-technology.com/wp-content/uploads/sites/3/2019/06/4l-image-Predator-B-MQ-9-Reaper.jpg"
}
```

</details>

---

</details>


<details>
<summary><b>User Module</b></summary>

<details>
<summary><b>Return Types</b></summary>

__User__
```ts
    id: number,
    name: string,
    surname: string,
    patronymic: string,
    email: string,
    birthday: string,
    phoneNumber: string
```

__RegisterCreds__
Register Credentials - data you need to send for registration
```ts
    email: string,
    username: string,
    password: string
```

__LogCreds__
Login Credentials - data you need to send for login (authorization)
```ts
    email: string,
    password: string
```

__AuthResponse__
Contains JWT for user identification
```ts
    token: string
```

__UserEdit__
Contains all possible data that can be edited in User
```ts
    name: string or undefined;
    surname: string or undefined;
    partonymic: string or undefined;
    email: string or undefined;
    password: string or undefined;
    birthday: Date or undefined;
    phoneNumber: string or undefined;
```

---

</details>

__POST /users/reg/ - Creates User with data from it's body (registration)__\
*For password hashing bcryptjs is used*

<details>
<summary>Successful request Example</summary>

```json
{
    "name": "Danilo",
    "email": "tetrahedron@gmail.com", 
    "password": "FlexingO42"
}
```
</details>

| CODE |      Status Code      |    Returns   |             Description             |
|------|-----------------------|--------------|-------------------------------------|
| 201  |      OK, created      | AuthResponse |     You successfully registered     |
| 400  |      Bad Request      | ErrorMessage |       You entered wrong data        |
| 409  |       Conflict        | ErrorMessage | User with this email already exists |
| 500  | Internal Server error | ErrorMessage |       Internal Server Error         |

<details>
<summary>Successful response example</summary>

```json
{
    "token": "eyJhbGciOiJIUzI1FeIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzY2MTYwMzU1LCJleHAiOjE3NjY3NjUxOTV9.OgijkTPao4x4UC40Fbiz8lHLgWJ-Uw9kWBOSAhHE27s"
}
```

</details>

---

__POST /users/log/ - Checks provided user data and, if correct, provides JWT authentication__

<details>
<summary>Successful request Example</summary>

```json
{
    "email": "myown.email@gmail.com",
    "password": "FriedPotato7"
}
```
</details>

| CODE |      Status Code      |    Returns   |         Description         |
|------|-----------------------|--------------|-----------------------------|
| 200  |          OK           | AuthResponse |   You successfully logined  |
| 404  |       Not found       | ErrorMessage |   Wrong email or password   |
| 500  | Internal Server error | ErrorMessage |   Internal Server Error     |

<details>
<summary>Successful response example</summary>

```json
{
    "token": "eyJhbGciOiJIUzI1FeIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzY2MTYwMzU1LCJleHAiOjE3NjY3NjUxOTV9.OgijkTPao4x4UC40Fbiz8lHLgWJ-Uw9kWBOSAhHE27s"
}
```

</details>

---

__GET /users/me/ - Gets user data by JWT token stored in Authorization Header__\
*User is returned __without__ password*

| CODE |      Status Code      |    Returns   |            Description           |
|------|-----------------------|--------------|----------------------------------|
| 200  |          OK           |     User     |     You get data about you       |
| 401  |      Unathorized      | ErrorMessage |          Incorrect JWT           |
| 404  |       Not found       | ErrorMessage |    Data from JWT is invalid      |
| 500  | Internal Server error | ErrorMessage |      Internal Server Error       |

<details>
<summary>Successful response example</summary>

```json
{
    "id": 45,
    "name": "Artem",
    "surname": "Neforget",
    "partonymic": "Sergeyev",
    "email": "actual.email@gmail.com",
    "birthday": "29.07.2025",
    "phoneNumber": "044-202-60-39",
    "isAdmin": true
}
```

</details>

---

__PATCH /users/profile - Allows to edit data__\
*Data is required to be sent as UserEdit*

<details>
<summary>Successful request Example</summary>

```json
{
    "surname": "Fedora", 
    "email": "Berilium@gmail.com",
    "phoneNumber": "102"
}
```
</details>

| CODE |      Status Code      |    Returns   |            Description           |
|------|-----------------------|--------------|----------------------------------|
| 200  |          OK           |   UserSafe   |        You get yourself          |
| 401  |      Unathorized      | ErrorMessage |          Incorrect JWT           |
| 404  |       Not found       | ErrorMessage |    Data from JWT is invalid      |
| 500  | Internal Server error | ErrorMessage |      Internal Server Error       |

<details>
<summary>Successful response example</summary>

```json
{
    "id": 52,
    "name": "Olexander",
    "surname": "Fedora",
    "partonymic": "Antonov",
    "email": "Berilium@gmail.com",
    "birthday": "14.07.2025",
    "phoneNumber": "102",
    "isAdmin": true
}
```

</details>

---

__POST /users/password - Allows to start process of changing password__

<details>
<summary>Successful request Example</summary>

```json
{
    "email": "itismyemail@gmail.com"
}
```
</details>

| CODE |      Status Code      |    Returns   |           Description            |
|------|-----------------------|--------------|----------------------------------|
| 200  |          OK           |     "OK"     | You have started password change |
| 400  |      Bad Request      | ErrorMessage |      Email is not specified      |
| 401  |      Unathorized      | ErrorMessage |           Incorrect JWT          |
| 500  | Internal Server error | ErrorMessage |      Internal Server Error       |

<details>
<summary>Successful response example</summary>

```json
"OK"
```

</details>

---

__GET /users/password/*code* - Verifies user password change with provided CODE__

| CODE |      Status Code      |         Returns        |             Description             |
|------|-----------------------|------------------------|-------------------------------------|
| 200  |          OK           | PasswordChangeResponse |  You get whether your code is true  |
| 400  |      Bad Request      |      ErrorMessage      |      You provided invalid code      |
| 401  |      Unathorized      |      ErrorMessage      |           Incorrect JWT             |
| 404  |       Not found       |      ErrorMessage      | You didn't ask for restoration code |
| 500  | Internal Server error |      ErrorMessage      |       Internal Server Error         |

<details>
<summary>Successful response example</summary>

```json
{
    "success": true
}
```

</details>

---

__PATCH /users/password - Sets new user password__

<details>
<summary>Successful request Example</summary>

```json
{
    "password": "VerySecurePassword"
}
```
</details>

| CODE |      Status Code      |    Returns   |             Description             |
|------|-----------------------|--------------|-------------------------------------|
| 200  |          OK           | AuthResponse |           You get new JWT           |
| 400  |      Bad Request      | ErrorMessage |       New password is missing       |
| 401  |      Unathorized      | ErrorMessage |           Incorrect JWT             |
| 403  |       Forbidden       | ErrorMessage |       Email is not verified         |
| 404  |       Not found       | ErrorMessage | You didn't ask for restoration code |
| 500  | Internal Server error | ErrorMessage |       Internal Server Error         |

<details>
<summary>Successful response example</summary>

```json
{
    "token": "eyJhbGcCgiOiJIUzI1FeIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IysoNzY2MTYwMzU1LCJleHAiOjE3NjY3NjUxOTV9.OgijkTPao4x4UC40Fbiz8lHLgWJ-Uw9kWBOSAhHE27s"
}
```

</details>

---

__POST /users/address - Creates new Address (location)__

<details>
<summary>Successful request Example</summary>

```json
{
    "city": "Dnipro",
    "street": "Izmailska",
    "houseNum": 63,
    "flatNum": 1,
    "entranceNum": 2
}
```
</details>

| CODE |       Status Code     |     Returns   |         Description         |
|------|-----------------------|---------------|-----------------------------|
|  201 |        Created        |   Address     |    Creation Successful      |
|  401 |      Unathorized      |  ErrorMessage | You need to login to create |
|  422 | Unprocessable Content |  ErrorMessage |     Incorrect body data     |
|  500 | Internal Server error |  ErrorMessage |    Internal Server Error    |

<details>
<summary>Successful response example</summary>

```json
{
    "id": 2,
    "active": true,
    "city": "Dnipro",
    "street": "Izmailska",
    "houseNum": 63,
    "flatNum": 1,
    "entranceNum": 2,
    "userId": 52
}
```

</details>

---

__PATCH /users/address/*id* - Edits address with provided ID__

<details>
<summary>Successful request Example</summary>

```json
{
    "active": true,
    "houseNum": 3,
    "flatNum": 2
}
```
</details>

| CODE |      Status Code      |    Returns   |               Description               |
|------|-----------------------|--------------|-----------------------------------------|
| 200  |          OK           |   Address    |           You get yourself              |
| 400  |      Bad Request      | ErrorMessage |               Invalid ID                |
| 401  |      Unathorized      | ErrorMessage |       You need to login to delete       |
| 403  |       Forbidden       | ErrorMessage | You cannot delete somebody else address |
| 404  |       Not found       | ErrorMessage |    Address with that id is not found    |
| 422  | Unprocessable Content | ErrorMessage |             Wrong body data             |
| 500  | Internal Server error | ErrorMessage |         Internal Server Error           |

<details>
<summary>Successful response example</summary>

```json
{
    "id": 1,
    "active": true,
    "city": "Dnipro",
    "street": "Pobedy 118",
    "houseNum": 3,
    "flatNum": 2,
    "entranceNum": 5,
    "userId": 201
}
```

</details>

---

__DELETE /users/address/*id* - Deletes address with provided ID__

| CODE |       Status Code     |    Returns   |              Description              |
|------|-----------------------|--------------|---------------------------------------|
|  200 |           OK          |    Address   |          Request Successful           |
|  400 |      Bad Request      | ErrorMessage |             Wrong ID data             |
|  401 |      Unathorized      | ErrorMessage |     You need to login to delete       |
|  403 |       Forbidden       | ErrorMessage | You cannot edit somebody else address |
|  404 |       Not Found       | ErrorMessage |    Category with that ID not found    |
|  500 | Internal Server error | ErrorMessage |        Internal Server Error          |

<details>
<summary>Successful response example</summary>

```json
{
    "id": 221,
    "active": true,
    "city": "Dnipro",
    "street": "Naberezhnaya",
    "houseNum": 103,
    "flatNum": 12,
    "entranceNum": 9,
    "userId": 19390
}
```

</details>

---

__GET /users/address - Gets all user's addresses__

| CODE |       Status Code     |    Returns   |               Description               |
|------|-----------------------|--------------|-----------------------------------------|
|  200 |           OK          |   Addresses  |         You get your addresses          |
|  401 |      Unathorized      | ErrorMessage | You need to login to get your addresses |
|  500 | Internal Server error | ErrorMessage |          Internal Server Error          |

<details>
<summary>Successful response example</summary>

```json
[
    {
        "id": 252,
        "active": false,
        "city": "Dnipro",
        "street": "Krivoy Rog Street",
        "houseNum": 1,
        "flatNum": 1,
        "entranceNum": 1,
        "userId": 1939029
    },
    {
        "id": 253,
        "active": true,
        "city": "Dnipro",
        "street": "April 10th Square",
        "houseNum": 13,
        "flatNum": 120,
        "entranceNum": 91,
        "userId": 1939029
    },
    {
        "id": 9179,
        "active": false,
        "city": "Marynka",
        "street": "Druzhba 30th Square",
        "houseNum": 1,
        "flatNum": 3,
        "entranceNum": 2,
        "userId": 1939029
    },
]
```

</details>

---

</details>

<details>
<summary><b>Order Module</b></summary>

<details>
<summary><b>Return Types</b></summary>

- __Order__
```ts
    {
        id: number,
        userId: number,
        customerName: string,
        customerPatronymic: string,
        customerPhoneNumber: string,
        customerEmail: string,
        customerComment: string,
        deliveryMethod: string,
        paymentMethod: string,
        totalPrice: number,
        totalDiscount: number,
        locationId: number
    }
```
- __OrderFull__
```ts
    {
        location: {
            id: number,
            active: boolean,
            city: string,
            street: string,
            houseNum: number,
            flatNum: number,
            entranceNum: number,
            userId: number | null
        },
        productForOrders: {
            id: number,
            productId: number,
            orderId: number,
            count: number,
            discount: number,
        }[],
        id: number,
        userId: number,
        customerName: string,
        customerPatronymic: string,
        customerPhoneNumber: string,
        customerEmail: string,
        customerComment: string,
        deliveryMethod: string,
        paymentMethod: string,
        totalPrice: number,
        totalDiscount: number,
        locationId: number
    }
```
</details>

---

__GET /orders/ - Gets all orders, which are connected to current user__

Status Code table

| CODE |       Status Code     |    Returns   |               Description            |
|------|-----------------------|--------------|-----------------------p--------------|
|  200 |           OK          |  Order List  |           Request Successful         |
|  401 |      Unathorized      | ErrorMessage | You need to login to get your orders |
|  500 | Internal Server error | ErrorMessage |         Internal Server Error        |

<details>
<summary>Successful response example</summary>

```json
[
    {
        "id": 1,
        "userId": 23,
        "customerName": "Mark",
        "customerPatronymic": "Stepanovich",
        "customerPhoneNumber": "112",
        "customerEmail": "noemail@gmail.com",
        "customerComment": "Cool",
        "deliveryMethod": "Nova Post",
        "paymentMethod": "PrivatBank",
        "totalPrice": 12930,
        "totalDiscount": 20,
        "locationId": 2
    },
    {
        "id": 2,
        "userId": 23,
        "customerName": "Mark",
        "customerPatronymic": "Stepanovich",
        "customerPhoneNumber": "112",
        "customerEmail": "noemail@gmail.com",
        "customerComment": "Cool",
        "deliveryMethod": "UkrPosta",
        "paymentMethod": "PrivatBank",
        "totalPrice": 29100,
        "totalDiscount": 2000,
        "locationId": 3
    }
]
```

</details>

__GET /orders/*id* - Gets order by specified ID__


| CODE |       Status Code     |    Returns   |              Description              |
|------|-----------------------|--------------|---------------------------------------|
|  200 |        Created        |   OrderFull  |         Request Successfull           |
|  400 |      Bad Request      | ErrorMessage |         You need to enter ID          |
|  401 |      Unathorized      | ErrorMessage |  You need to login to get your order  |
|  403 |       Forbidden       | ErrorMessage | You can't look orders of other people |
|  404 |       Not found       | ErrorMessage |   Order with that ID does not exists  |
|  422 | Unprocessable Content | ErrorMessage |           Invalid order id            |
|  500 | Internal Server error | ErrorMessage |        Internal Server Error          |

<details>
<summary>Successful response example</summary>

```json
{
    "location": {
        "id": 1,
        "active": true,
        "city": "Kyiv",
        "street": "Khreshchatyk",
        "houseNum": 1,
        "flatNum": 2,
        "entranceNum": 3,
        "userId": null
    },
    "productForOrders": [
        {
            "id": 3,
            "productId": 2,
            "orderId": 5,
            "count": 5,
            "discount": 12,
        },
        {
            "id": 4,
            "productId": 22,
            "orderId": 5,
            "count": 2,
            "discount": 2000,
        }
    ],
    "id": 5,
    "userId": 23,
    "customerName": "Mark",
    "customerPatronymic": "Stepanovich",
    "customerPhoneNumber": "112",
    "customerEmail": "noemail@gmail.com",
    "customerComment": "Cool",
    "deliveryMethod": "UkrPosta",
    "paymentMethod": "PrivatBank",
    "totalPrice": 100000,
    "totalDiscount": 4060,
    "locationId": 1
}
```

</details>

__DELETE /orders/*id* - Deletes order with defined ID__

| CODE |       Status Code     |    Returns   |               Description               |
|------|-----------------------|--------------|-----------------------------------------|
|  200 |        Created        |   OrderFull  |          Deletion Successfull           |
|  400 |      Bad Request      | ErrorMessage |          You need to enter ID           |
|  401 |      Unathorized      | ErrorMessage |  You need to login to delete your order |
|  403 |       Forbidden       | ErrorMessage | You can't delete orders of other people |
|  404 |       Not found       | ErrorMessage |    Order with that ID does not exists   |
|  422 | Unprocessable Content | ErrorMessage |            Invalid order id             |
|  500 | Internal Server error | ErrorMessage |         Internal Server Error           |


<details>
<summary>Successful response example</summary>

```json
{
    "location": {
        "id": 1,
        "active": true,
        "city": "Kyiv",
        "street": "Khreshchatyk",
        "houseNum": 1,
        "flatNum": 2,
        "entranceNum": 3,
        "userId": null
    },
    "productForOrders": [
        {
            "id": 3,
            "productId": 2,
            "orderId": 5,
            "count": 5,
            "discount": 12,
        },
        {
            "id": 4,
            "productId": 22,
            "orderId": 5,
            "count": 2,
            "discount": 2000,
        }
    ],
    "id": 5,
    "userId": 23,
    "customerName": "Mark",
    "customerPatronymic": "Stepanovich",
    "customerPhoneNumber": "112",
    "customerEmail": "noemail@gmail.com",
    "customerComment": "Cool",
    "deliveryMethod": "UkrPosta",
    "paymentMethod": "PrivatBank",
    "totalPrice": 100000,
    "totalDiscount": 4060,
    "locationId": 1
}
```

</details>

---

</details>

----

# Additional [↑](#navigation)

## Authentication System [↑](#navigation)

Authentication system in this project is made using __JWT__ *(JSON Web Token)*\
Benefits of using it are:\
- __Easy management and control__ - Doesn't require complex systems or big running times
- __Good security level__ - JWT Secret Key guarantees that it can't be created by user, only by server, which ensures safety of user data
- __Stateless Authentication__ - JWT doesn't require local storage or cookies, it is transmitted fully through headers, which increase optimisation on user side

How to use:\
1. __Get the token__ - login or register on the site (see [API](#api-))
2. __Put it as header__ - Put it as Bearer Token header
3. __Done__ - Now you are able to use user-related functions!

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