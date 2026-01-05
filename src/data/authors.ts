// Configuración centralizada de autores del blog
export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

export const authors: Record<string, Author> = {
  'tangara-studio': {
    id: 'tangara-studio',
    name: 'Tangara Studio',
    bio: 'We mix the perfect synergy of Art with Engineering to offer high-quality Ludic and Interactive Experiences.',
    avatar: '/images/avatars/tangara-avatar.png'
  },
  'jwilschrey': {
    id: 'jwilschrey',
    name: 'Jacob Wilschrey',
    bio: 'CEO & Creative Director at Tangara Studio. Music lover and Scifi enthusiast.',
    avatar: '/images/avatars/jwilschrey.jpg'
  }
  // Agrega más autores aquí según necesites
  // 'john-doe': {
  //   id: 'john-doe',
  //   name: 'John Doe',
  //   bio: 'Game Developer & Designer',
  //   avatar: '/images/authors/john.jpg'
  // }
};

export function getAuthor(id: string): Author | undefined {
  return authors[id.toLowerCase().replace(/\s+/g, '-')];
}
