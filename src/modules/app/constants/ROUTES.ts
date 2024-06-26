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
    ALL_SIZES: "all-sizes",
    ALL_COLORS: "all-colors",
  },
  MEDICINE: {
    ROOT: "medicine",
  },
  SECTION: {
    CREATE: "create",
    UPDATE: "update/:id",
    REMOVE: "remove/:id",
    FILTER: "filter",
    TRENDING: "trending",
    NEW: "new",
    POPULAR: "popular",
    FIND: "find/:id",
    SIMILARS: "similars/:id",
    ALL_PROVIDERS: "all-providers",
  },
  ORDER: {
    ROOT: "order",
    CREATE: "create",
    GET: "",
  },
  MEDIA: {
    ROOT: "media",
    UPLOAD_IMAGES: "upload-images",
  },
  USER: {
    ROOT: "user",
    CONTACT: "contact",
    ORDERS: "orders",
    FAVORITES: "favorites",
    ADD_PRODUCT_FAVORITE: "add-product-favorite",
    DELETE_PRODUCT_FAVORITE: "delete-product-favorite",
    REFRESH: "user-token",
    FAVORITES_COUNT: "favorites-count",
    ORDERS_COUNT: "orders-count",
  },
  ADMIN_USER: {
    ROOT: "admin",
    SIGN_IN: "sign-in",
  },
} as const;
