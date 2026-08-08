# Infiniqe Dashboard

Frontend practical project — Next.js dashboard for Products, Users, and Recipes.

## Stack

- Next.js + TypeScript + Tailwind
- Axios, TanStack Query
- React Hook Form + Yup
- shadcn/ui
- DummyJSON API

## Run locally

```bash
npm install
```

Create `.env` (or copy from `_env.example`):

```env
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
```

```bash
npm run dev
```

App starts at http://localhost:3000

## Note about DummyJSON

Create / update / delete APIs on DummyJSON are only simulated. The request succeeds and returns a response, but data is **not** saved on their server.

So if you add/update/delete and then refresh, you'll see the old list again. That's an API limitation, not a frontend bug. The UI updates the current list in memory after write actions so you can still see the change until refresh.

## Products module

- List with search, sort, pagination (via API query params)
- Details / Add / Edit pages
- Delete with confirm
- List filters stay in the URL so going to details/edit and back keeps the same page state

## Users module

- Single page CRUD
- Reusable table listing + search/pagination
- Add / Edit in a modal
- Details in a right-side drawer
- Delete from the table with confirm

## Recipes module

- Card listing with debounced search + pagination
- Details page loads recipe on the server (`/recipes/[id]`)
