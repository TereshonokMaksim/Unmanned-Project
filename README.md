# Unmanned - Drone themed shop!

Дрони

Цей WEB-застосунок про дрони та нові військові технології.
Цей проєкт потрібен щоб населення знало які не секрентні технології винайшло людство, проєктувати стратегії з новими технологіями та щоб звичайні люди могли розвиватися у цих напрямках.
Користувачем цього сайиту будуть - Терешонок Максим, Мозговий Артем, Ткачук Глеб.


У цьому проєкті ми використувуємо такі технології як:
  Node.js
  Express
  Prisma
  TypeScript
  React

# Project structure

<!-- TODO -->
project/
 ├── src/
 │    ├── modules/
 │    │     ├── users/
 │    |     |     ├── users.controller.ts
 │    │     │     ├─ users.service.ts
 │    │     │     |── users.routes.ts
 |    |     |     |__ user.types.ts
 |    |     |     |__ user.repositoriy.ts
 │    │     └── posts/
 │    |__ middlewares/
 │    └── server.ts
 ├── prisma/
 │    |__ schema.prisma
 |__ package.json
 ├── README.md
 |__.gitignore

src/modules - модулі бізнес логіки
src/midldlewares - обработчик між роутером та контролером
prisma - ORM 
# Code architecture

<!-- TODO -->
Ми використовуємо модульну архітектуру:
 Кожен модуль відповідає за одну бізнес-логіку.
 Усередині кожного модуля знаходяться controller, service та роути.
 Controller приймає запити та видає помилки
 Service містить бізнес-логіку.
 Prisma працює із базою даних.

# Additional

## Code style

<!-- TODO -->

## Additional info

<!-- TODO -->