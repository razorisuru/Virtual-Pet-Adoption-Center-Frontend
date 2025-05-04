# Virtual Pet Adoption Center

A React-based frontend application for managing a virtual pet adoption center. This application allows users to view, add, edit, and delete pets, as well as mark them as adopted.

## Features

- View all pets in an attractive card layout
- Filter pets by mood (Happy, Excited, Sad)
- Filter pets by adoption status
- Add new pets to the system
- Edit existing pet details
- Mark pets as adopted
- Delete pets from the system
- Visual indicators for pet moods using both colors and emojis
- Responsive design for all device sizes
- Animated UI elements for better user experience

## Tech Stack

- React.js (Frontend library)
- Tailwind CSS (Styling)
- Axios (API communication)
- Date-fns (Date formatting)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Backend API running at http://localhost:5000/api

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pet-adoption-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

The frontend communicates with the following backend endpoints:

- `GET /api/pets` - Get all pets
- `GET /api/pets/:id` - Get a single pet
- `POST /api/pets` - Add a new pet
- `PUT /api/pets/:id` - Update a pet
- `PATCH /api/pets/:id/adopt` - Mark a pet as adopted
- `DELETE /api/pets/:id` - Delete a pet
- `GET /api/pets/filter?mood=<mood>` - Filter pets by mood

## Project Structure

```
pet-adoption-frontend/
├── public/
│   ├── index.html
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── Badge.js
│   │   ├── FilterBar.js
│   │   ├── Layout.js
│   │   ├── LoadingSpinner.js
│   │   ├── PetCard.js
│   │   ├── PetList.js
│   │   └── PetModal.js
│   ├── pages/
│   │   └── HomePage.js
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.js
│   └── index.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Screenshots

[Add your screenshots here once the application is running]

## Future Improvements

- Add user authentication
- Implement pet personality quiz
- Generate adoption certificates
- Add search functionality
- Implement pet categories and more detailed filtering
- Add dark mode

## License

[Your License Here]