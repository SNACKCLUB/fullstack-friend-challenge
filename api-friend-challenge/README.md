<h1 align="center">Fullstack Senior Challenge: Friend System - API</h1>

This is a [Laravel 11](https://laravel.com/docs/11.x) project made for [Snack Tech](https://github.com/SNACKCLUB/fullstack-friend-challenge)

## Getting Started

First, run the container using docker commands:

```bash
# build or rebuild services
docker compose build

# create and start containers
docker compose up -d

# stop and remove containers, networks if needs
docker compose down
```

After that you can access bash from our application called <b>laravel</b>

```bash
docker compose exec laravel bash
```

Finally inside the container we can run our commands to start the application.

But first copy the file <b>.env.example</b> and rename it to <b>.env</b>

```bash
# run these commands inside a container
composer install

php artisan key:generate
```

Now you can access the project via the domain: http://localhost:80/api
e pgadmin http://localhost:5050

## Run initial data

We can run migrations and seeders

```bash
# run these commands inside a container
php artisan migrate

# or
php artisan migrate --seed

# or reset all migration and seeders
php artisan migrate:refresh --seed
```

If everything went well so far, you can log in normally with a test user

<b>email:</b> test@example.com
<br>
<b>password:</b> 12345678

## Run tests

```bash
# run these commands inside a container
php artisan test
```
