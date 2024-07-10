# Bike List Assessment Project

This is a Bike List application built with Next.js and React. The application displays a list of bikes, allows searching by make or model, and supports sorting by different bike attributes.

## Features

- Fetches bike data from an external JSON file.
- Displays a searchable and sortable table of bikes.
- Stylish checkout button identical to the provided design.

## Technologies Used

- Next.js
- React
- Tailwind CSS

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

       git clone https://github.com/dsampson94/bike-list-next.git
       cd bike-list

2. Install the dependencies:

       npm run dev
       # or
       yarn dev

### Running the Application

    npm run dev
    # or
    yarn dev

### Project Structure
        .
    ├── public
    │   ├── favicon.ico
    │   └── vercel.svg
    ├── src
    │   ├── app
    │   │   ├── Button.tsx
    │   │   ├── TableHeader.tsx
    │   │   └── page.tsx
    │   ├── styles
    │   │   └── globals.css
    │   └── types
    │       └── Bike.ts
    ├── .eslintrc.json
    ├── .gitignore
    ├── next-env.d.ts
    ├── next.config.js
    ├── package.json
    ├── README.md
    └── tsconfig.json

### License

This project is licensed under the MIT License.