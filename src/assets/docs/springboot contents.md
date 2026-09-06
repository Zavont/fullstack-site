# 1. Basics

## 1.1 Introduction to Spring Boot

Spring Boot is an open-source Java-based framework used to create a microservice. It is developed by Pivotal Team and is used to build stand-alone and production-ready spring applications. This chapter will introduce you to Spring Boot and familiarize you with its basic concepts. 

The Spring framework has become the de facto standard for enterprise Java development. However, setting up a Spring application used to involve a tremendous amount of configuration, including XML files or extensive Java configuration classes, configuring servers, and setting up dependency management. Spring Boot changes all of that. It takes an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss. Most Spring Boot applications need minimal Spring configuration.

The primary goals of Spring Boot are:
- To provide a radically faster and widely accessible getting-started experience for all Spring development.
- To be opinionated out of the box but get out of the way quickly as requirements start to diverge from the defaults.
- To provide a range of non-functional features that are common to large classes of projects (such as embedded servers, security, metrics, health checks, and externalized configuration).
- Absolutely no code generation and no requirement for XML configuration.

## 1.2 Spring vs Spring Boot

While Spring and Spring Boot are related, they serve different purposes. The Spring Framework provides a comprehensive programming and configuration model for modern Java-based enterprise applications - on any kind of deployment platform. A key element of Spring is infrastructural support at the application level: Spring focuses on the "plumbing" of enterprise applications so that teams can focus on application-level business logic, without unnecessary ties to specific deployment environments.

On the other hand, Spring Boot is essentially an extension of the Spring framework which eliminated the boilerplate configurations required for setting up a Spring application. 

**Key Differences:**
- **Configuration:** Spring Framework requires explicit configuration using XML or Java annotations. Spring Boot introduces the concept of auto-configuration, which automatically configures the application based on the dependencies present in the classpath.
- **Servers:** In a standard Spring application, you have to build a WAR file and deploy it into a standalone web server like Tomcat, WebSphere, or Weblogic. Spring Boot provides an embedded server (like Tomcat, Jetty, or Undertow), allowing you to package your application as a standalone executable JAR.
- **Dependency Management:** Spring requires you to individually define dependencies and their compatible versions. Spring Boot uses "Starter POMs" that group related dependencies together, significantly simplifying the Maven or Gradle build files and reducing version conflicts.

## 1.3 Architecture of Spring Boot

Spring Boot’s architecture is built on top of the Spring framework, meaning it utilizes all of Spring's features while abstracting the complexities of configuration. The architecture consists of several layers:

1. **Presentation Layer:** This is the topmost layer where the user interface or API endpoints reside. It handles HTTP requests, translates JSON parameters to objects, authenticates the request, and transfers it to the business layer.
2. **Business Layer:** This layer contains the core business logic. It handles all the business rules, validations, and data processing. It receives requests from the presentation layer, performs operations, and may fetch data from the data access layer.
3. **Persistence Layer:** This layer is responsible for database interactions. It translates business objects into database rows and vice-versa. Technologies like Spring Data JPA or Hibernate are typically used here.
4. **Database Layer:** The actual database where data is stored (e.g., MySQL, PostgreSQL, MongoDB).

Spring Boot sits above these layers, providing an execution environment (via embedded Tomcat), automatic configuration of these layers (like automatically configuring a DataSource if a database driver is detected), and starter dependencies to easily pull in the necessary libraries for each layer.

## 1.4 Environment Setup

Setting up a Spring Boot environment is straightforward. You will need a few essential tools:

- **Java Development Kit (JDK):** Spring Boot applications are written in Java, so you need the JDK. Java 17 or Java 21 are the recommended versions for modern Spring Boot 3.x development.
- **Build Tool:** Maven or Gradle are used to manage dependencies and build the project. Maven uses an `pom.xml` file, while Gradle uses a `build.gradle` file. 
- **IDE:** An Integrated Development Environment (IDE) like IntelliJ IDEA, Eclipse, or Visual Studio Code (with Java extensions) is essential for a productive development experience.

**Dependencies (Starter, BOM, Spring Parent):**
When using Maven, a typical Spring Boot project inherits from the `spring-boot-starter-parent`. This parent POM provides default configurations, Java version settings, and plugin configurations. More importantly, it brings in a Dependency Management section (often called a BOM - Bill of Materials) that dictates the compatible versions of all Spring and third-party libraries. This means you only declare the dependency (like `spring-boot-starter-web`) without specifying a version, and the parent POM ensures you get the correct, compatible version.

"Starters" are a set of convenient dependency descriptors you can include in your application. For example, if you want to build a web application, you simply add the `spring-boot-starter-web` dependency, which transitively pulls in Spring MVC, Jackson (for JSON), Tomcat, and other necessary libraries.

## 1.5 Application Properties

Spring Boot allows you to externalize your configuration so that you can work with the same application code in different environments (dev, test, prod). You can use properties files, YAML files, environment variables, and command-line arguments to externalize configuration.

The most common file used for configuration is `application.properties` or `application.yml`, located in the `src/main/resources` directory. 

By default, Spring Boot runs a web application on port 8080. You can easily change this by adding a single line to `application.properties`:

```properties
server.port=9090
spring.application.name=my-app
```

You can also define custom properties and inject them into your Spring Beans using the `@Value` annotation or by binding them to structured objects using `@ConfigurationProperties`. This externalized configuration is a powerful feature that makes Spring Boot applications highly adaptable to cloud environments and containerized deployments where configuration often changes between stages.


# 2. SpringBoot Core Concepts

## 2.1 Annotations

Annotations in Spring Boot are a form of metadata that provide data about a program but are not part of the program itself. They dictate how the Spring Framework should configure the application context and manage beans. The most critical annotation in a Spring Boot application is `@SpringBootApplication`.

`@SpringBootApplication` is a convenience annotation that combines three essential annotations:
- `@EnableAutoConfiguration`: Enables Spring Boot's auto-configuration mechanism.
- `@ComponentScan`: Enables `@Component` scan on the package where the application is located. It tells Spring to look for other components, configurations, and services in the specified package and its sub-packages.
- `@Configuration`: Allows to register extra beans in the context or import additional configuration classes.

Other widely used annotations include `@Component` (a generic stereotype for any Spring-managed component), `@Service` (specialization of @Component for service layer classes), `@Repository` (for Data Access Objects), and `@Controller` (for presentation layer classes). These annotations help Spring identify and register beans in the Application Context.

## 2.2 Auto-configuration

Auto-configuration is perhaps the most magical and powerful feature of Spring Boot. It attempts to automatically configure your Spring application based on the jar dependencies that you have added. For example, if `HSQLDB` is on your classpath, and you have not manually configured any database connection beans, then Spring Boot auto-configures an in-memory database.

Spring Boot analyzes the classpath, existing beans, and various property settings to deduce what the developer intends to configure. If it finds the `spring-webmvc` jar, it configures a DispatcherServlet, default error pages, and embedded Tomcat. 

This behavior is driven by `@Conditional` annotations. Auto-configuration classes use conditions like `@ConditionalOnClass`, `@ConditionalOnMissingBean`, and `@ConditionalOnProperty` to decide whether a configuration should be applied. For instance, an auto-configuration might say: "If the class `DataSource` is present, and if the user hasn't defined their own `DataSource` bean, then configure a default one." This allows developers to easily override auto-configuration by simply defining their own beans.

## 2.3 Dependency Injection and Types

Dependency Injection (DI) is a core concept of the Spring Framework. It is a design pattern that implements Inversion of Control for resolving dependencies. In traditional programming, if Class A needs Class B, Class A will instantiate Class B using the `new` keyword. With DI, the framework creates Class B and injects it into Class A. This promotes loose coupling and makes testing significantly easier.

There are primarily three types of Dependency Injection in Spring:

1. **Constructor Injection:** The dependencies are provided through a class constructor. This is the recommended approach because it ensures that the bean is initialized in a valid state (all mandatory dependencies are satisfied) and allows the fields to be marked as `final`.
2. **Setter Injection:** The dependencies are injected using setter methods. This is useful for optional dependencies that can be changed or re-injected later.
3. **Field Injection:** Dependencies are injected directly into the fields using the `@Autowired` annotation. While concise, this is generally discouraged as it makes the class tightly coupled to the Spring container and harder to unit test without reflection.

## 2.4 Inversion of Control (IoC)

Inversion of Control (IoC) is a programming principle where the control flow of a program is inverted compared to traditional procedural programming. In the context of Spring, IoC means that objects do not create other objects on which they rely to do their work. Instead, they get the objects that they need from an outside source (the Spring IoC Container).

The Spring IoC container is responsible for instantiating, configuring, and assembling beans. The container gets its instructions on what objects to instantiate, configure, and assemble by reading configuration metadata. The configuration metadata is represented in XML, Java annotations, or Java code.

The IoC container manages the lifecycle of the objects it creates. By delegating the responsibility of object creation and dependency resolution to the framework, developers can write code that is modular, decoupled, and focused purely on business logic rather than boilerplate wiring.

## 2.5 Spring Bean Lifecycle

A Spring Bean is simply an object that is instantiated, assembled, and managed by a Spring IoC container. Understanding the lifecycle of a Spring Bean is crucial for performing custom initialization or destruction logic.

The lifecycle consists of several phases:
1. **Instantiation:** The Spring container instantiates the bean using its constructor.
2. **Populate Properties:** Spring injects the necessary dependencies (DI) based on configuration.
3. **Aware Interfaces:** If the bean implements interfaces like `BeanNameAware` or `ApplicationContextAware`, the container calls their respective methods.
4. **Pre-initialization:** The `postProcessBeforeInitialization` method of any configured `BeanPostProcessor`s is called.
5. **Initialization:** Custom initialization methods are called (e.g., methods annotated with `@PostConstruct` or the `afterPropertiesSet` method of `InitializingBean`).
6. **Post-initialization:** The `postProcessAfterInitialization` method of any configured `BeanPostProcessor`s is called. The bean is now ready for use.
7. **Destruction:** When the application context is closed, the bean is destroyed. Methods annotated with `@PreDestroy` or the `destroy` method of `DisposableBean` are executed, allowing for resource cleanup.


# 3. Database and Data JPA

## 3.1 Connecting to MySQL

Most enterprise applications need to store and retrieve data from a relational database. Spring Boot makes connecting to databases like MySQL incredibly simple through auto-configuration. To connect to MySQL, you need to add two primary dependencies to your `pom.xml`: the Spring Data JPA starter (`spring-boot-starter-data-jpa`) and the MySQL JDBC driver (`mysql-connector-j`).

Once the dependencies are in place, you only need to provide the connection details in your `application.properties` or `application.yml` file:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=secret
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Spring Boot's auto-configuration detects these properties and automatically configures a `DataSource`, an `EntityManagerFactory`, and a `TransactionManager`. The `ddl-auto=update` property tells Hibernate to automatically update the database schema based on your entity classes, which is very useful during development.

## 3.2 Entity, Repository, and CRUD Operations

In Spring Data JPA, data models are represented by **Entities**. An Entity is a simple Java POJO annotated with `@Entity`, mapping it to a database table. The `@Id` annotation specifies the primary key, and `@GeneratedValue` dictates how the ID is generated.

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    // Getters and setters
}
```

To interact with the database, you create a **Repository** interface that extends `JpaRepository`. 

```java
public interface UserRepository extends JpaRepository<User, Long> {
}
```

By simply extending this interface, Spring Data JPA automatically provides implementations for common **CRUD (Create, Read, Update, Delete)** operations. You don't need to write any SQL or boilerplate data access code. You can instantly use methods like `save()`, `findById()`, `findAll()`, and `deleteById()` in your service layer to manage data.

## 3.3 JDBC vs Spring Data JPA

Java Database Connectivity (JDBC) is the standard Java API for connecting to databases. While powerful, using raw JDBC requires writing a lot of boilerplate code: opening connections, creating statements, executing queries, iterating over result sets, handling exceptions, and closing resources. This process is error-prone and tedious.

Spring Data JPA is built on top of the Java Persistence API (JPA) and Hibernate. It abstracts away the complexities of JDBC and provides a highly productive repository-based approach to data access. 

**Key differences:**
- **Abstraction Level:** JDBC is a low-level API dealing with SQL strings and result sets. JPA deals with Java objects (Entities) and object-relational mapping (ORM).
- **Productivity:** Spring Data JPA drastically reduces boilerplate code. You declare an interface, and the framework generates the implementation. With JDBC, you write everything manually.
- **Database Independence:** JPA uses JPQL (Java Persistence Query Language), which is database agnostic. JDBC relies on database-specific SQL syntax. While JPA is generally preferred for standard CRUD and complex domain models, JDBC (or Spring's `JdbcTemplate`) might still be used for highly optimized, complex SQL queries where ORM overhead is a concern.

## 3.4 Custom Queries in Spring Data JPA

While `JpaRepository` provides standard CRUD operations, you often need to fetch data based on specific criteria. Spring Data JPA offers several ways to define custom queries without writing implementations.

**1. Query Methods (Derived Queries):**
You can define queries simply by naming your interface methods according to specific conventions. Spring Data parses the method name and generates the SQL.

```java
List<User> findByEmail(String email);
List<User> findByNameContaining(String name);
```

**2. @Query Annotation:**
For more complex queries that cannot be easily expressed via method names, you can use the `@Query` annotation to write JPQL (or native SQL) directly on the repository method.

```java
@Query("SELECT u FROM User u WHERE u.status = 'ACTIVE' AND u.age > :age")
List<User> findActiveUsersOlderThan(@Param("age") int age);

// Native SQL
@Query(value = "SELECT * FROM users WHERE email_verified = true", nativeQuery = true)
List<User> findVerifiedUsers();
```

This flexibility allows developers to handle complex data retrieval scenarios efficiently while staying within the Spring Data ecosystem.


# 4. REST APIs

## 4.1 Introduction to REST APIs

REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol — almost always HTTP. RESTful applications use HTTP requests to post data (create and/or update), read data (e.g., make queries), and delete data.

In a REST architecture, the focus is on resources, which are identified by URIs (Uniform Resource Identifiers). The client interacts with these resources using standard HTTP methods:
- **GET:** Retrieve a resource.
- **POST:** Create a new resource.
- **PUT:** Update an existing resource entirely.
- **PATCH:** Update an existing resource partially.
- **DELETE:** Remove a resource.

Spring Boot is an excellent framework for building RESTful web services. It provides a robust set of annotations and tools out of the box (via `spring-boot-starter-web`) that handle request routing, parameter binding, and JSON serialization, allowing developers to focus on defining the API's behavior.

## 4.2 @RestController and @RequestMapping

In Spring MVC, a controller is a class responsible for handling incoming HTTP requests. The `@RestController` annotation is a specialized version of the standard `@Controller` annotation. It is a convenience annotation that combines `@Controller` and `@ResponseBody`. 

When a class is annotated with `@RestController`, Spring knows that the methods within this class will return data (typically JSON or XML) directly to the client, rather than returning a view name (like an HTML template). Every request handling method of the controller class automatically serializes return objects into HttpResponse.

The `@RequestMapping` annotation is used to map web requests to specific handler classes and/or handler methods. It can be applied at the class level to define a base URI for all endpoints within the controller.

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    // All endpoints here will be prefixed with /api/users
}
```

## 4.3 Handling HTTP Methods (@GetMapping, @PostMapping, etc.)

Spring provides specialized, method-level annotations for mapping specific HTTP request methods to controller methods. These are shorthand for `@RequestMapping(method = RequestMethod.GET)` and so on, making the code more readable and expressive.

- **@GetMapping:** Maps HTTP GET requests. Used to fetch data.
  ```java
  @GetMapping
  public List<User> getAllUsers() { ... }
  ```

- **@PostMapping:** Maps HTTP POST requests. Used to create new resources.
  ```java
  @PostMapping
  public User createUser(...) { ... }
  ```

- **@PutMapping:** Maps HTTP PUT requests. Used to update an entire resource.
  ```java
  @PutMapping("/{id}")
  public User updateUser(...) { ... }
  ```

- **@DeleteMapping:** Maps HTTP DELETE requests. Used to delete a resource.
  ```java
  @DeleteMapping("/{id}")
  public void deleteUser(...) { ... }
  ```

## 4.4 Data Binding (@PathVariable, @RequestParam, @RequestBody)

To process requests, your API often needs data sent by the client. Spring provides annotations to easily extract this data from various parts of the HTTP request.

- **@PathVariable:** Extracts values from the URI path. For example, in `/api/users/123`, `123` is a path variable.
  ```java
  @GetMapping("/{userId}")
  public User getUserById(@PathVariable Long userId) { ... }
  ```

- **@RequestParam:** Extracts query parameters from the URI. For example, in `/api/users?status=active`, `status` is a request param.
  ```java
  @GetMapping("/search")
  public List<User> searchUsers(@RequestParam String status) { ... }
  ```

- **@RequestBody:** Maps the body of the HTTP request to a Java object. This is crucial for POST and PUT requests where the client sends a JSON payload. Spring automatically uses a message converter (like Jackson) to deserialize the JSON into the specified Java type.
  ```java
  @PostMapping
  public User createUser(@RequestBody User newUser) { ... }
  ```

## 4.5 JSON Serialization and Deserialization

When building REST APIs with Spring Boot, data exchange is predominantly done using JSON. Spring Boot relies heavily on the Jackson library for processing JSON data. Jackson is automatically configured when you include the `spring-boot-starter-web` dependency.

- **Serialization:** The process of converting a Java object into a JSON string to send it in the HTTP response. When a `@RestController` method returns an object, Jackson automatically serializes it to JSON.
- **Deserialization:** The process of converting a JSON string from an HTTP request body into a Java object. This happens automatically when you use the `@RequestBody` annotation.

You can customize Jackson's behavior using annotations on your data models. For example, `@JsonIgnore` prevents a field (like a password) from being serialized into the JSON response. `@JsonProperty("custom_name")` changes the key name used in the JSON output, differing from the Java field name. `@JsonFormat` can be used to dictate how dates and times are formatted in the JSON payload.