export const ROUTES = {
  AUTH: {
    ROOT: "auth",
    LOGIN: "login",
    SIGN_UP: "sign-up",
  },
  PRODUCT: {
    ROOT: "product",
    NEW_PRODUCTS: "new-products",
    TRENDING_PRODUCTS: "trending-products",
    TOP_FAVORITE_PRODUCTS: "top-favorite-products",
    FIND_BY_ID: "find/:id",
  },
  CLOTHE: {
    ROOT: "clothe",
    CREATE: "create",
    UPDATE: "update/:id",
    REMOVE: "remove/:id",
  },
  MEDICINE: {
    ROOT: "medicine",
    CREATE: "create",
    UPDATE: "update/:id",
    REMOVE: "remove/:id",
  },
  ORDER: {
    ROOT: "order",
    CREATE: "create",
  },
  MEDIA: {
    ROOT: "media",
    UPLOAD_IMAGES: "upload-images",
  },
  USER: {
    ROOT: "user",
    CONTACT: "contact",
    ORDERS: "orders",
  },
} as const;
