import jwt from 'jsonwebtoken';

interface ParsedToken {
  currentUser: string;
  exp: number;
  iat: number;
}

export default function useCurrentUser(): [ParsedToken, Error | null] {
  const token = sessionStorage.getItem('token') || '';
  
  try {
    const data = jwt.verify(token, 'a secret to encode the data') as ParsedToken;
    return [data, null];
  } catch (error) {
    return [{} as ParsedToken, error]
  }
}
