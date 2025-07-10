This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Ailoitte-Times: Your Daily Dose of Headlines

## Project Overview

Ailoitte-Times is a modern, responsive web application built with Next.js that allows users to browse top headlines, filter news by categories, and search for articles by keywords. It integrates with the NewsAPI.org to provide up-to-date news content, offering a seamless and intuitive user experience across various devices.

## Features

* **Top Headlines:** Displays the latest and trending news articles from the United States on the homepage.
* 

* **Category-based Navigation:** Users can easily filter news articles by popular categories such as Business, Technology, Sports, Entertainment, and more, providing a tailored Browse experience.

* **Search Functionality:** A robust search feature allows users to find specific news articles using keywords, leveraging the NewsAPI's comprehensive `everything` endpoint.

* **Pagination:** Seamless pagination is implemented across all news lists (homepage, categories, search results) to enable users to browse through extensive news archives efficiently.

* **News Article Details Page:** Clicking on any news article opens a dedicated page displaying the full content of the article, providing a detailed reading experience.

* **Responsive UI:** The application is designed with a mobile-first approach, ensuring a clean, intuitive, and fully responsive layout that adapts gracefully to different screen sizes, from desktops to mobile devices.

* **Loading Indicators:** Displays skeleton loading cards to provide visual feedback while news data is being fetched, enhancing perceived performance.

* **Graceful Error Handling:** Implements robust error handling for API calls, displaying user-friendly messages for various issues such as network errors, invalid API keys, or rate limiting.

## Technologies Used

* **Framework:** Next.js (React Framework)

* **Styling:** Tailwind CSS

* **API Integration:** NewsAPI.org (via `fetch` and `axios` for different pages)

* **State Management:** React Hooks (`useState`, `useEffect`, `useParams`)

## API Integration Details

Ailoitte-Times utilizes the following endpoints from NewsAPI.org:

* **Top Headlines:** `GET /v2/top-headlines?country=us&apiKey={API_KEY}`

* **Category Filter:** `GET /v2/top-headlines?category={category}&apiKey={API_KEY}`

* **Search News:** `GET /v2/everything?q={query}&apiKey={API_KEY}`

**Important:** You will need to obtain your own API key from [NewsAPI.org](https://newsapi.org/) to run this application.

## Installation & Setup

Follow these steps to get Ailoitte-Times up and running on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd ailoitte-times
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Get your NewsAPI Key:**

    * Sign up for a free API key at [NewsAPI.org](https://newsapi.org/register).

    * Once registered, you will find your API key on your dashboard.

4.  **Configure Environment Variables:**

    * Create a `.env.local` file in the root of your project.

    * Add your NewsAPI key to this file:

        ```
        NEXT_PUBLIC_NEWS_API_KEY=YOUR_NEWS_API_KEY_HERE
        ```

        Replace `YOUR_NEWS_API_KEY_HERE` with the actual API key you obtained.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun devart editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.
bun devart editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
