import LoginDTO from 'src/dto/authentication/LoginDTO';
import { login } from 'src/services/authentication.service';
import { getAccountInfo } from 'src/services/account.service';
import { useAccountStore } from 'stores/account-store';

export const setAccountInfo = async () => {
  const accountStore = useAccountStore();
  const accountResponse = await getAccountInfo();
  accountStore.setAccount(accountResponse);
};

export const authenticate = async (loginRequest: LoginDTO) => {
  const loginResponse = await login(loginRequest);
  const { token, expiresIn } = loginResponse;
  const expiration = Date.now() + expiresIn;

  localStorage.setItem('token', token);
  localStorage.setItem('expiration', JSON.stringify(expiration));

  await setAccountInfo();
};

export const destroyAuthentication = () => {
  const accountStore = useAccountStore();
  localStorage.clear();
  accountStore.resetAccount();
};
