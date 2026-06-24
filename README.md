# Hospital Management System

## Title
Hospital Management System

## Pitch
Hospital Management System lets hospitals manage patients, doctors, appointments, and medical records so that healthcare operations are organized and efficient.

## User
Hospital administrators, doctors, and reception staff who need to manage hospital data and daily operations.

## Data
Patient:
- Patient ID
- Name
- Age
- Gender
- Contact Number
- Medical History

Doctor:
- Doctor ID
- Name
- Specialization
- Availability

Appointment:
- Appointment ID
- Patient ID
- Doctor ID
- Date
- Status

## AI Feature
Model takes patient symptoms and medical history, returns possible department recommendations and appointment suggestions.
## Authentication

The system will include role-based authentication for hospital staff.

Roles:
- Admin
- Doctor
- Receptionist

## Deployment

The project is deployed using Vercel.

Deployment URL:
https://internship-umber-eight.vercel.app
## Day 3: AI / LLM Integration

This project uses the Groq LLM SDK for the AI symptom assistant.

Evidence of LLM SDK import:

```ts
import Groq from "groq-sdk";