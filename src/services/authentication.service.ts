import { UnauthorizedService } from 'src/api/ServerApi';
import LoginDTO from 'src/dto/authentication/LoginDTO';

export const login = async (data: LoginDTO): Promise<LoginDTO> => {
  const response = await UnauthorizedService.post('/auth/login', data);
  return response.data;
};

export const signup = async () => {
  console.error('NOT IMPLEMENTED');
};
