<!-- **RF** => Requisitos funcionais => Funcional requirements
eg: Usuario should be able to create a category.
eg: Usuario should be able to recover account password.

**RNF** => Requisitos não funcionais => Non-functional requirements
eg: Data should be stored on postgresDB.

**RN** => Regra de negócio => Businesses rules
eg: Should not be able to crate a category with a repeated name.
eg: Should not be able to create a category with a length smaller than three. -->


# Create car

### RF
  [x] Must be possible to  register a new car.
  <!-- - Must be possible to list all categories. -->

### RNF

### RN
 [X] Mustn't be possible to registe a car with an already existing plate.
 [x] Car must be registered as available by default.
 <!-- [] Car should only be registered by users with admin role. -->

# List cars

### RF
  - It must be possible to list all available cars.
  - Must be possible to list all available cars by category name.
  - Must be possible to list all available cars by brand.

### RN
  - User don't need to be logged in to see car list.

# Create Specification

### RF
  - Must be possible to create a specification for a car.
  - Must be possible to list all specifications.
  - Must be possible to list all cars.


### RN
  - Mustn't be able to create a specification for a inexistant car.
  - Mustn't be able to create an already existing specification for the same car.
  - 

# Registar car image

### RF
Must be possible to register a car image.
Must be possible to liaist all cars.

### RNF
Use multer for file uplaod.

### RN
User must be able to register more than one iamge per car.
User responsible for registers must be an admin.

# Car rent

### RF
Must be possible to creatae a rent.

##RN
Rent must have minimal duration of 24hr.
Mustn't be possible to register a new rent if one already exists for the same user.
Mustn't be possible to register a new rent if one already exists for the same car.