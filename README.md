# DUG Project

Description coming soon.

## Install the Project

###Frontend

* cd frontend

In the frontend directory, you can then run:

* npm install
* npm start 

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend

* cd backend

Set up a virtual environment. In the backend directory with the virtual environment activated, you can then run:

* pip install -r requirements.txt 
* python manage.py makemigrations
* python manage.py migrate
* python manage.py runserver

The backend will run on localhost:8000

To access the admin panel:

* Create a super user with: python manage.py createsuperuser
* Open [http://localhost:8000/admin/](http://localhost:8000/admin/) to view the admin panel
* Use your super user credentials to log onto the admin panel

## Work on the Project

If you work on a new feature:

* Pull the latest main
* Create a new branch for your feature: git checkout -b "feature/feature name"
* Push your changes to your feature branch, try to add descriptive commit messages 
* If a feature is done for testing 
   * merge the latest main down into your branch
   * solve any merge conflicts
   * open a pull request
   * add a small description about your feature and add a reviewer
   * After a successfull review merge your branch into the main branch
