import { FragmentType, getFragmentData, graphql } from "../gql";
import { AuthProvider_UserFragmentFragment } from "../gql/graphql";
import { login, logout, viewer } from "./queries";

export const AuthProvider_UserFragment = graphql(`
  fragment AuthProvider_UserFragment on User {
    id
    username
  }
`);

class AuthProvider {
  private userPromise?: Promise<AuthProvider_UserFragmentFragment | null>;

  async user() {
    this.userPromise =
      this.userPromise ??
      (async () => {
        try {
          const resp = await viewer();
          const user =
            resp && getFragmentData(AuthProvider_UserFragment, resp.viewer);
          return user;
        } catch (error) {
          this.userPromise = undefined;
          throw error;
        }
      })();
    return await this.userPromise;
  }

  setUser(user: FragmentType<typeof AuthProvider_UserFragment> | null) {
    this.userPromise = Promise.resolve(
      user && getFragmentData(AuthProvider_UserFragment, user)
    );
  }

  async login(username: string, password: string) {
    const resp = await login({ username, password });
    if (resp.__typename === "LoginSuccess") {
      this.setUser(resp.user);
    }
    return resp;
  }

  async logout() {
    try {
      await logout();
    } finally {
      this.setUser(null);
    }
  }
}

export const authProvider = new AuthProvider();
