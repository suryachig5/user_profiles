
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

-   Python 3.12
-   Node.js and npm

###  Setup

1.  **Clone the repository:**
    
    `git clone https://github.com/suryachig5/user_profiles.git` 
    `cd user_profiles`
    
2.  **Set up a virtual environment:**
    
    `python -m venv venv
    source venv/bin/activate` 
    
3.  **Run migrations:**
    
    `python manage.py migrate` 
    
4.  **Start the Django server:**
    
    `python manage.py runserver` 
    
    Open a web browser and navigate to:
    
    `http://127.0.0.1:8000/static/index.html`

<a  name="run-unit-tests"></a>

## Run Unit Tests

To run unit tests, run the command `npm test`.  

<a  name="tech-stack"></a>

## Tech Stack

* Three.js

* Django