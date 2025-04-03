# Call Cuisine

Call Cuisine is an AI-powered restaurant order automation system that takes customer orders via phone calls, processes them using AI-driven speech-to-text, and sends SMS notifications with order details. The system includes a backend built with Node.js and MongoDB, and a frontend built with Next.js for real-time order tracking.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **AI-Powered Voice Ordering**: Handles customer orders over the phone using AI.
- **Real-Time Dashboard**: Displays ongoing and completed orders for restaurant staff.
- **SMS Notifications**: Sends order confirmations and estimated pickup times.
- **Order Management**: Staff can process, complete, cancel, and print orders.
- **Order History**: (Planned) A page to track past orders with filters.

## Tech Stack
**Backend:** Node.js, Express.js, MongoDB, Twilio (or Retell AI for call handling), Socket.io

**Frontend:** Next.js, Tailwind CSS, React, Socket.io-client

## System Architecture
1. Customer calls the restaurant number.
2. AI processes speech-to-text and extracts order details.
3. The backend stores the order in MongoDB and sends confirmation via Twilio SMS.
4. The frontend dashboard displays orders for restaurant staff.
5. Staff members can update order statuses in real time.

---

## Setup Instructions
### Backend
#### Prerequisites
- Node.js installed
- MongoDB running locally or on a cloud provider (MongoDB Atlas)
- Twilio or Retell AI API credentials

#### Installation
```sh
# Clone the repository
git clone https://github.com/sarniraula/call-cuisine-backend.git
cd call-cuisine-backend

# Install dependencies
npm install

# Create a .env file and add the following variables
MONGO_URI=your_mongodb_connection_string
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Start the server
npm run dev
```

### Frontend
#### Prerequisites
- Node.js installed

#### Installation
```sh
# Clone the repository
git clone https://github.com/sarniraula/call-cuisine-frontend.git
cd call-cuisine-frontend

# Install dependencies
npm install

# Create a .env file and add the API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Start the development server
npm run dev
```

---

## Usage
- **Backend** runs on `http://localhost:8000`.
- **Frontend** runs on `http://localhost:3000`.
- When a customer calls, the backend processes the call and stores the order.
- Staff members log into the frontend dashboard to manage orders.

## API Endpoints
| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| POST   | `/api/orders`      | Create a new order        |
| GET    | `/api/orders/today` | Fetch today's orders      |
| PATCH  | `/api/orders/:id`  | Update an order status    |
| GET    | `/api/orders/history` | Fetch past orders       |

## Contributing
If you’d like to contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.