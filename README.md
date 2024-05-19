# user_profiles

## Table of Contents

* [Overview](#overview)

* [Getting Started](#getting-started)

* [Run Unit Tests](#run-unit-tests)

* [Tech Stack](#tech-stack)


<a  name="overview"></a>

## Overview

This is simple and straight forward application that fetches user data from https://randomuser.me/ and displays them in an interactive 3D environment.

<a  name="getting-started"></a>

## Getting Started

### Prerequisites
If you don't have python already installed you can use Homebrew to install it:

 - `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
`
 - `brew install python`
 - `brew install pipenv` -- this is a tool to manage Python project dependencies.

### Setup

1.  **Clone the repository:**

`git clone https://github.com/suryachig5/user_profiles.git` then cd into the folder `cd user_profiles`

2.  **Set up a virtual environment:**

`pipenv install django djangorestframework requests`

`pipenv shell`

3.  **Start the Django server:**

`python manage.py runserver`

Open a web browser and navigate to:

`http://127.0.0.1:8000/static/index.html`

<a  name="run-unit-tests"></a>

## Run Unit Tests

To run unit tests, we first need to install `pytest` and  `pytest-django` using `pip install pytest pytest-django` and then run the command `pytest`.

<a  name="tech-stack"></a>

## Tech Stack

* Three.js
* Django