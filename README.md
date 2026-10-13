# SpendWise – Personal Expense Tracker

A full-stack expense tracker built with **React + Material UI**, **FastAPI** and **MongoDB**.

## Features
- Add, edit and delete expenses (title, amount, category, date)
- Filter expenses by category
- Total spent and category-wise breakdown using a MongoDB aggregation pipeline
- Responsive layout with MUI Grid breakpoints
- Input validation with Pydantic (e.g. amount must be > 0)

## Tech Stack
| Layer    | Tech                              |
|----------|-----------------------------------|
| Frontend | React 18, Material UI, Axios, Vite |
| Backend  | Python, FastAPI, Pydantic         |
| Database | MongoDB (Atlas or local)          |

## API
| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| GET    | `/expenses`          | List expenses (`?category=Food`) |
| POST   | `/expenses`          | Create an expense                |
| PUT    | `/expenses/{id}`     | Update an expense                |
| DELETE | `/expenses/{id}`     | Delete an expense                |
| GET    | `/expenses/summary`  | Total + per-category totals      |

Interactive docs: `http://localhost:8000/docs`

## Run locally

### 1. Database
Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas) and copy the connection string,
or run MongoDB locally on `mongodb://localhost:27017`.

### 2. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # paste your MONGO_URI
uvicorn main:app --reload
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`.

## Project Structure
```
spendwise/
├── backend/
│   ├── main.py          # FastAPI routes + aggregation
│   ├── db.py            # MongoDB connection
│   ├── models.py        # Pydantic schemas
│   └── requirements.txt
└── frontend/
    └── src/
        ├── App.jsx
        ├── api.js
        └── components/
            ├── ExpenseForm.jsx
            ├── ExpenseList.jsx
            └── SummaryCard.jsx
```

## Possible improvements
- User authentication (JWT)
- Monthly charts
- Deploy frontend on AWS S3 + CloudFront, backend on AWS Lambda
