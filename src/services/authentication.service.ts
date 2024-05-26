import { UnauthorizedService } from 'src/api/ServerApi';
import LoginDTO from 'src/dto/authentication/LoginDTO';
import LoginResponseDTO from 'src/dto/authentication/LoginResponseDTO';

export const login = async (data: LoginDTO): Promise<LoginResponseDTO> => {
  const response = await UnauthorizedService.post('/auth/login', data);
  return response.data;
};

export const signup = async () => {
  console.error('NOT IMPLEMENTED');
};
