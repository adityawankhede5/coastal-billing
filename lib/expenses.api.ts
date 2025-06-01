import { addDoc, collection, doc, DocumentData, DocumentSnapshot, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { EXPENSES_COLLECTION } from "@/constants/DB";
import { Expense } from "@/zustand/types";
import { CreateExpenseResponse, UpdateExpenseResponse } from "./types";

export const serializeExpense = (expenseDoc: DocumentSnapshot<DocumentData>): Expense => {
  const data = expenseDoc.data();
  if (!data) throw new Error("Expense not found");
  return {
    id: expenseDoc.id,
    createdAt: data.createdAt,
    name: data.name,
    cost: data.cost,
    paidBy: data.paidBy,
    dateTime: data.dateTime,
    description: data.description,
    deleted: data.deleted ?? false,
  }
}

export const fetchAllExpenses = async () => {
  const expensesRef = collection(db, EXPENSES_COLLECTION);
  const expensesSnapshot = await getDocs(query(expensesRef, orderBy("createdAt", "desc")));
  const expenses = expensesSnapshot.docs.map(serializeExpense);
  return expenses.filter((expense) => !expense.deleted);
}

export const createExpense = async (expense: Omit<Expense, "id">): Promise<CreateExpenseResponse> => {
  try {
    const expensesRef = collection(db, EXPENSES_COLLECTION);
    const docRef = await addDoc(expensesRef, expense);
    return { status: "success", expense: { ...expense, id: docRef.id } };
  } catch (error) {
    return { status: "error", error: error };
  }
}

export const updateExpense = async (expense: Omit<Expense, "createdAt">): Promise<UpdateExpenseResponse> => {
  try {
    const expensesRef = collection(db, EXPENSES_COLLECTION);
    await updateDoc(doc(expensesRef, expense.id), expense);
    return { status: "success", expense };
  } catch (error) {
    return { status: "error", error: error };
  }
}