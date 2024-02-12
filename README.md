[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Praxis Platform

## Description

Praxis is an innovative online platform designed to connect aspiring developers with each other and with experienced mentors through real-world projects. It provides a unique opportunity for users to enhance their skills, network, and gain practical experience in a dynamic environment that fosters sharing, mentorship, and open-source collaboration.

## Features

- **Project Posting**: Creators can post project ideas, specifying needed roles and details.
- **Team Formation**: Users can browse, express interest, and join projects as developers, designers, mentors, or researchers.
- **Social Profile**: Acts as a resume showcasing users' contributions, with a social proof mechanism through points and badges for active participation.

## Future Features

- **Mentorship**: Assign mentors to guide and assist team members, ensuring learning and project success.
- **Collaboration Tools**: Includes chat for real-time communication, task postings, and meeting coordination.
- **Integration with External Tools**: Link to project management tools like Trello or Jira for progress tracking.

## Stack

- TypeScript
- React
- Next.js (App router, initial data server-side, updates with SWR)
- Payload CMS (Backend with authentication)
- MongoDB
- AWS S3 (Cloud storage)
- SWR (Data fetching)
- Tailwind CSS
- Flowbite UI

## Web Stack and Explanation

Praxis leverages cutting-edge technologies to ensure a future-proof platform that can handle complex user relationships and data management needs. React and Next.js form the core of a dynamic UI, enhanced by Next.js 13's server components. SWR offers efficient client-side data fetching, while Payload CMS provides a customizable CMS with user authentication. Tailwind CSS and Flowbite UI support rapid, maintainable UI development, with MongoDB for scalable data storage and AWS S3 for reliable asset storage.

## Getting Started

To set up the project locally:

1. **Clone the repository**:
   ```
   git clone https://github.com/BL1133/praxis.git
   ```
2. **Install dependencies**:
   ```
   cd praxis
   npm install
   ```
3. **Run the development server**:
   ```
   npm run dev
   ```

Visit `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Ensure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
