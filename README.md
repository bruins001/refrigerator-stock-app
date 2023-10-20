# Refrigerator-stock-app
This app keeps track of the items in your refrigerator. You can add, update and remove items you have currently in your refrigerator. You can see what you have currently in your refrigerator with some details. For example, the expiration date of the food or drink.
## Installation
### Prerequisites
- [Terminal](https://github.com/microsoft/terminal) / [Terminal Linux](https://sw.kovidgoyal.net/kitty/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Text editor](https://code.visualstudio.com/)

### Installation Steps
1. Clone the repository
   ```
   git clone https://github.com/bruins001/Refrigerator-stock-app.git
   ```
  
3. Navigate to the project directory
   ```
    cd Refrigerator-stock-app
   ```
4. In order to start the project using Docker Compose, run the following command:
   ```
   docker-compose up
   ```
5. Install dependencies:   
   ```
   docker run --rm --interactive --tty \
    --volume $PWD/src:/app \
    composer install
   ```
   It will automatically delete the `composer` container. You can remove the image by
   using: `docker rmi composer` in order free some space.
   
## Contributions
Currently, we are not allowing new collaborators.
## Current maintainers and contributors.
## Maintainers
- [bruins001](https://github.com/bruins001)
## Contributors
- [QuiNz-](https://github.com/QuiNzX)
- [bruins001](https://github.com/bruins001)
