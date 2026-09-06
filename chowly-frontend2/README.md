# Chowly Frontend

A React + Vite + Tailwind CSS frontend for Chowly, a food delivery platform, styled to match the Chowly brand (warm orange accent, clean white cards, rounded pills).

## Getting started

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173.

## Environment

Set your backend base URL in `.env`:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## Notes

- Every page first tries the real API (via the files in `src/api/`) and gracefully falls back to sample data in `src/mock/mockData.js` so the UI always renders something useful, even before your backend is wired up. Once your backend is live, real data will simply take over.
- Cart state lives in `src/context/CartContext.jsx` and persists to `localStorage`.
- `src/hooks/useFetch.js` is a small generic data-fetching hook used across pages.
- Theme colors (brand orange + ink grays) are defined in `tailwind.config.js`; tweak them there to adjust the whole app's palette.
- Reusable button/card/input classes live in `src/index.css` under `@layer components` (`.btn-primary`, `.card`, `.input`, etc).

## Pages implemented

Home, Restaurants (listing/search/filter), RestaurantMenu, CartPage, Checkout (with PaymentModal), Orders, OrderDetails (with Rating/Complaint modals), TrackOrder, standalone Payment/Complaint/Rating pages, and AdminDashboard.

## Connecting to the real backend (chowly Spring Boot API)

The API layer in `src/api/` is now wired to match your actual controllers
exactly (`RestaurantController`, `OrderController`, `MenuController`,
`MenuItemController`, `PaymentController`, `RatingController`,
`CustomerComplaintController`, `OrderAssignmentController`,
`WaitingTimeController`, `StaffController`, `CustomerController`).

A few things worth knowing:

1. **No auth endpoint exists yet.** `CustomerController` is plain CRUD (no
   `/login`), so `src/session.js` creates a real `Customer` via
   `POST /api/customers` the first time someone checks out, and remembers
   that id in `localStorage` for every order after. Once you add real
   auth, replace `session.js` with it.

2. **Menu items are fetched per-menu, not per-restaurant.** Your backend
   only exposes `GET /menu-items/menu/{menuId}`, so `RestaurantMenu.jsx`
   first loads a restaurant's menus (`GET /menus/restaurant/{id}`), then
   fetches items for each menu and flattens them.

3. **`/restaurants/popular` and `/restaurants/featured` don't exist.**
   `Home.jsx` now calls the real `GET /api/restaurants` once and derives
   both sections client-side (sorted by rating, etc.) until you add a
   real "featured" flag to `RestaurantResponse`.

4. **Request bodies now match your DTOs exactly** (`CreateOrderRequest`,
   `CreatePaymentRequest`, `CreateRatingRequest`, `CreateComplaintRequest`,
   `CustomerRequest`). A few things this revealed about your schema that
   the frontend now respects:
   - `Customer` has only `firstName`/`lastName`/`phoneNumber` — no email or
     address. Checkout was simplified accordingly.
   - `Order` has no delivery address or note field — an order is just a
     customer, a restaurant, and a list of `{menuItemId, quantity}`.
   - `Restaurant` is just `restaurantName` + `location` — no rating, ETA,
     or delivery fee. `RestaurantCard` now only renders those if a future
     response actually includes them, instead of faking numbers.
   - Rating uses `ratingScore`/`reviewText`, not `rating`/`comment`.
   - Complaint has one field, `complaintText` — the reason dropdown in the
     UI is folded into that string on submit.
   - `customerId`, `restaurantId`, `menuId`, `menuItemId`, and `staffId`
     are **client-generated strings** (all `@NotBlank` in their request
     DTOs, not auto-generated). `src/utils/id.js` generates them for the
     one case the customer-facing frontend creates — new customers at
     checkout.
   - `PaymentMethod` is an enum I don't have the source for — `CARD`,
     `TRANSFER`, `USSD` in `PaymentModal.jsx` are a guess at the constant
     names. Share the enum and I'll fix these exactly.

5. **CORS.** If requests fail with a network error (not a 4xx/5xx) in the
   browser console, it's almost always CORS — add
   `@CrossOrigin(origins = "http://localhost:5173")` to your controllers
   (or a global `WebMvcConfigurer` CORS config) so the browser allows the
   Vite dev server to call `localhost:8080`.
