from datetime import datetime
from typing import Optional

from bson import ObjectId
from bson.errors import InvalidId
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from db import expenses
from models import ExpenseIn, ExpenseOut

app = FastAPI(title="SpendWise API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def to_out(doc) -> ExpenseOut:
    return ExpenseOut(
        id=str(doc["_id"]),
        title=doc["title"],
        amount=doc["amount"],
        category=doc["category"],
        date=doc["date"].date(),
    )


def to_doc(e: ExpenseIn) -> dict:
    d = e.model_dump()
    # Mongo stores datetime, not date
    d["date"] = datetime.combine(e.date, datetime.min.time())
    return d


def oid(id: str) -> ObjectId:
    try:
        return ObjectId(id)
    except InvalidId:
        raise HTTPException(400, "Invalid id")


@app.get("/expenses", response_model=list[ExpenseOut])
def list_expenses(category: Optional[str] = None):
    query = {"category": category} if category else {}
    return [to_out(d) for d in expenses.find(query).sort("date", -1)]


@app.post("/expenses", response_model=ExpenseOut, status_code=201)
def create_expense(e: ExpenseIn):
    doc = to_doc(e)
    result = expenses.insert_one(doc)
    doc["_id"] = result.inserted_id
    return to_out(doc)


@app.put("/expenses/{id}", response_model=ExpenseOut)
def update_expense(id: str, e: ExpenseIn):
    doc = expenses.find_one_and_update(
        {"_id": oid(id)}, {"$set": to_doc(e)}, return_document=True
    )
    if not doc:
        raise HTTPException(404, "Expense not found")
    return to_out(doc)


@app.delete("/expenses/{id}", status_code=204)
def delete_expense(id: str):
    if expenses.delete_one({"_id": oid(id)}).deleted_count == 0:
        raise HTTPException(404, "Expense not found")


@app.get("/expenses/summary")
def summary():
    pipeline = [
        {"$group": {"_id": "$category", "total": {"$sum": "$amount"}, "count": {"$sum": 1}}},
        {"$sort": {"total": -1}},
    ]
    by_category = [
        {"category": r["_id"], "total": round(r["total"], 2), "count": r["count"]}
        for r in expenses.aggregate(pipeline)
    ]
    return {
        "total": round(sum(c["total"] for c in by_category), 2),
        "by_category": by_category,
    }
