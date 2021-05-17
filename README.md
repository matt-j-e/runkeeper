# Runkeeper

An extra project that I built after we had completed the Manchester Codes Backend module.

## Background

I wanted to have a go at building a vanilla JavaScript Frontend onto a Backend API built using Express.

I used the skills that I learned during the Backend module, and borrowed heavily from the Book Library API code, to put together a basic CRUD API with a one-table database holding details of run workouts.

## Database

A MySQL database with a single table:

COLUMN | DATA TYPE | CONSTRAINTS / VALIDATION
-------|-----------|-------------------------
date | DATE | NOT EMPTY, NOT NULL
duration | INTEGER | NOT EMPTY, NOT NULL
distance | INTEGER | NOT EMPTY, NOT NULL

## API endpoints

ACTION | URI | BODY CONTENT
-------|-----|-------------
Add RUN | `POST /runs` | date [DATE], duration (seconds) [INTEGER] & distance (metres) [INTEGER]
Edit RUN | `PATCH /runs/:runId` | date [DATE], duration (seconds) [INTEGER] or distance (metres) [INTEGER]
Delete RUN | `DELETE /runs/:runId` | n/a
Get all RUNS | `GET /runs` | n/a
Get a single RUN | `GET /runs/:runId` | n/a
get LATEST 10 RUNS | `GET /runs/latest` | n/a

## Frontend

The relevant run details are held in a HTML table that is dynamically populated with data pulled asynchronously from the database using the Fetch API to call my Express API.

The details posted to the form are intercepted by JavaScript and the table redrawn without the page having to refresh.

## New areas explored during the building of this project

* How to tell Sequelize to order data extracted from the database and limit the number of records returned
* The Fetch API
* Promises - while this wasn't a new area it was definitely one that needed looking at again.

## Project status

Of the basic CRUD operations, the frontend enables you to:

* CREATE new run workouts
* READ existing ones and
* DELETE workouts

I might add an UPDATE facility though I think I have achieved what I set out to with this project.