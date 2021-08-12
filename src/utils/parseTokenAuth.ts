type Authorization = string;
type Prefix = 'Bearer' | 'Bearer ' | 'secret' | 'secret ';

export const parseTokenAuth = (authorization: Authorization): string => {
  const prefix: Prefix = 'Bearer ';

  if (!authorization.startsWith(prefix)) {
    throw new Error('Token type is not acceptable.');
  }

  const token = authorization.split(prefix).pop();

  if (!token) {
    throw new Error('Token not found');
  }

  return token;
};
