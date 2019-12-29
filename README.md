Tester Matcher
==========================
### This project consist of a backend and frontend application.
- **Tester Matcher Service**
- **Tester Matcher App**

Tester Matcher Service
==========================
# What is it?
[Spring Boot](https://spring.io/projects/spring-boot) Service with [H2 DB](https://www.h2database.com/html/main.html) populated by [Liquibase](https://www.liquibase.org/) from CSV files.
Serves as a tester ranker which based on search criteria returns a list of testers with bugs count.

# Requirements

- [Java 11+](https://www.oracle.com/technetwork/java/javase/downloads)

# How to run it?
From tester matcher service root directory:
If you have gradle installed and under linux/mac:
```
gradle bootRun
```

If gradle is not installed, but still under linux/mac
```
gradlew bootRun
```

And for windows without gradle
```
gradlew.bat bootRun
```
    
After the server is running, go to
```
http://localhost:8080/tester-ranks/page
```

Tester Matcher App
==========================
# What is it?
[Angular](https://angular.io/) App which presents testers rank paginated table with search criteria form.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

# How to run it?
From tester matcher app root directory:
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
