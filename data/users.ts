import { AppUser } from "@/types";

export const seedUsers: AppUser[] = [
  {
    "id": "cli-1",
    "name": "Cliente Demo",
    "email": "cliente@mail.com",
    "password": "123456",
    "role": "CLIENTE",
    "city": "Madrid",
    "postalCode": "28001"
  },
  {
    "id": "pro-1",
    "name": "Carlos García",
    "email": "pro1@mail.com",
    "password": "123456",
    "role": "PROFESIONAL",
    "city": "Madrid",
    "postalCode": "28001"
  }
];
