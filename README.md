# DIVERSITY PROJECT 

## Setup Instructions

### Install Required Python Modules The Names Of Which Are Stored In 'requirements.txt' 

```bash
pip install -r requirements.txt
```

### Start Web Server

Make sure you are at the root folder (diversity_django)

```bash
python manage.py runserver
```

### Install Node Modules

1.Go inside the ```frontend``` folder 
```bash
cd frontend
```
2.Install all dependencies.
```bash
npm i
```

### Compile the Frontend

Run the production compile script
```bash
npm run build
```
or for development:
```bash
npm run dev
```