export const enum ClientRouteKey {
  Root = "/",
  Login = "/login",
  Home = "/home",
  User = "/user",
  Create = "/create",
  Plan = "/plan",
  OAuth = "/cmuOAuthCallback",
  Settings = "/settings",
}

export const enum ApiRouteKey {
  OAuth = "/oauth",
  MyData = "/oauth/me",
  SignOut = "/oauth/signout",
}

export const enum LocalStorageKey {
  Auth = "auth",
}

export const enum AuthKey {
  UserAuth = "user-auth",
  AdminAuth = "admin-auth",
}
