from datetime import date
from typing import Literal
from pydantic import BaseModel, Field

Category = Literal["Food", "Travel", "Shopping", "Bills", "Health", "Other"]


class ExpenseIn(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    amount: float = Field(gt=0)
    category: Category
    date: date


class ExpenseOut(ExpenseIn):
    id: str
