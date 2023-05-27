# Task-for-Backend-Developer

## Setup For Backend

The first thing to do is to clone the repository:

```sh
$ git clone https://github.com/joy1954islam/Task-for-Backend-Developer.git
$ cd Task-for-Backend-Developer
```

Create a virtual environment to install dependencies in and activate it:

```sh
$ python -m virtualenv venv
For Windows:
$ venv\Scripts\activate
For Linux:
source env/bin/activate
```

Then install the dependencies:

```sh
(env) pip install -r requirements.txt
```
Set up the database:
```sh
python manage.py makemigrations
python manage.py migrate
```

Then Run the Server

```sh
(env) python manage.py runserver
```


## Setup For Frontend
Go to this directory
### `cd frontend`

In the project directory, you can run:

### `npm start`
