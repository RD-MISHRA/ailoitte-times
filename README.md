This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Ailoitte-Times: Your Daily Dose of Headlines

## Project Overview

Ailoitte-Times is a modern, responsive web application built with Next.js that allows users to browse top headlines, filter news by categories, and search for articles by keywords. It integrates with the NewsAPI.org to provide up-to-date news content, offering a seamless and intuitive user experience across various devices.

## Features

* **Top Headlines:** Displays the latest and trending news articles from the United States on the homepage.
* <img width="1870" height="960" alt="Screenshot 2025-07-10 171348" src="https://github.com/user-attachments/assets/a6354f53-c1be-4ae1-b3df-53ef5b26cea2" />

* 

* **Category-based Navigation:** Users can easily filter news articles by popular categories such as Business, Technology, Sports, Entertainment, and more, providing a tailored Browse experience.
* <img width="1894" height="954" alt="Screenshot 2025-07-10 171611" src="https://github.com/user-attachments/assets/be9ff979-e869-45e1-8303-1edf3793edfa" />


* **Search Functionality:** A robust search feature allows users to find specific news articles using keywords, leveraging the NewsAPI's comprehensive `everything` endpoint.
<img width="1868" height="961" alt="Screenshot 2025-07-10 171634" src="https://github.com/user-attachments/assets/54596b79-2191-4acc-afaa-84ad0b495ba4" />

* **Pagination:** Seamless pagination is implemented across all news lists (homepage, categories, search results) to enable users to browse through extensive news archives efficiently.<img width="1874" height="966" alt="Screenshot 2025-07-10 171652" src="https://github.com/user-attachments/assets/aece3aa2-81ce-4379-95ab-d36fbd232aff" />


* **News Article Details Page:** Clicking on any news article opens a dedicated page displaying the full content of the article, providing a detailed reading experience.
<img width="1890" height="967" alt="Screenshot 2025-07-10 172440" src="https://github.com/user-attachments/assets/e6fe4176-af0e-4700-b537-b40ac1d47676" />

* **Responsive UI:** The application is designed with a mobile-first approach, ensuring a clean, intuitive, and fully responsive layout that adapts gracefully to different screen sizes, from desktops to mobile devices.
<img width="1851" height="954" alt="Screenshot 2025-07-10 171723" src="https://github.com/user-attachments/assets/41f4ac96-1793-4a68-a058-b795053c6514" />
<img width="1906" height="935" alt="Screenshot 2025-07-10 171800" src="https://github.com/user-attachments/assets/fcd4bd33-4920-481c-964a-32d41350adea" />

* **Loading Indicators:** Displays skeleton loading cards to provide visual feedback while news data is being fetched, enhancing perceived performance.
<img width="1906" height="980" alt="Screenshot 2025-07-10 171933" src="https://github.com/user-attachments/assets/05df00fd-c3c6-403f-9d62-a72ef6c27a4b" />

* **Graceful Error Handling:** Implements robust error handling for API calls, displaying user-friendly messages for various issues such as network errors, invalid API keys, or rate limiting.
<img width="1902" height="869" alt="Screenshot 2025-07-10 172317" src="https://github.com/user-attachments/assets/70613d90-ef3c-401a-995b-1b7bc30d8537" />
<img width="1906" height="886" alt="Screenshot 2025-07-10 172401" src="https://github.com/user-attachments/assets/33365d81-076c-4b28-87df-ab9ccb9e1e3b" />

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
