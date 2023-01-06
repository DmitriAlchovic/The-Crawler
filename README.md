# Aqua Playground

## The Crawler

## Description

The Project is online grocery store which allow user to purchase products. This project include: Client The Grocery (Simple react app for browse products in grocery store and to add them in shopping cart), API (express.js API which handle requests from front-end), Database (MySQL database)

[Demo video](https://syberrycorp-my.sharepoint.com/personal/d_alkhovich_syberry_com/_layouts/15/guestaccess.aspx?share=EV9splEU0ylIntL3IR8rMHkBagWAogyYGu0rF7FJ89hozg&e=27d5wl)

![Main page](https://i.imgur.com/Syk1nD5.png)


## Technology Stack

|  Part | Technology|  
|-------|--------------|
| Programming language | TypeScript | 
| Database | MySQL |
| API Documentation | Postman |
| Backend framework and libraries | node.js / express.js / zod / jwt / sequelize ORM / sequelize-typescript / bcrypt |
| Frontend framework and libraries | React / Redux / Redux-toolkit / SASS |
| Infrastructure | Docker |
| Testing| Jest |

## Installation

### Clone repository:

Clone repository script:

    git clone https://github.com/DmitriAlchovic/The-Crawler

### Evierment variables:

Change file name and adjust variables if needed:

    .env.example -> .env

Alsow you can crete envierment variables inside your operating system.

### To install project in docker container:
Required Docker version 20.10.18 or higher ([download](https://docs.docker.com/desktop/install/windows-install/)). User docker-compose.yml file in root directory.
Install script:

    docker-compose build
### To install parts of project:
**API installation:**
Required node.js version 18.10.0 and   npm version 8.19.2 or higher ([download](https://nodejs.org/en/download/)).

Install script:

    npm install
**Client installation:**
Required node.js version 18.10.0 and   npm version 8.19.2 or higher ([download](https://nodejs.org/en/download/)).

Install script:

    npm install
**Database installation:**
Required MySQL ([download](https://www.mysql.com/downloads/)).

**Database management tool**
Adminer version 4.8.1 ([download](https://www.adminer.org/))
## Running and testing
### To run project in docker container:
User docker-compose.yml file in root directory.
Run script:

    docker-compose up
### To run parts of project:
**Run API:**
Run script:

    npm run start
**Run client:**
Run script:

    npm start
### To run tests:
API and Client run tests script:

    npm run test



## Documentation
Here some links to project documentation:

- [Repository](https://github.com/DmitriAlchovic/The-Crawler)
- [Technical design](https://github.com/DmitriAlchovic/The-Crawler/blob/main/technical_design.md)
- [Functional requirements](https://github.com/DmitriAlchovic/The-Crawler/blob/main/functional_requirements.md)
- [Database schema](https://miro.com/app/board/uXjVPNg9a9s=/)
- [UI layout](https://www.figma.com/file/27H7MCCVlLaXYQbzbhGuDs/Grocery-website-design?node-id=0:1&t=qjLSiAtquv82iakZ-0)
- [API documentation](https://documenter.getpostman.com/view/16084360/2s8Z73xVwK#intro)

## Authors
- Dmitry Alkhovic
