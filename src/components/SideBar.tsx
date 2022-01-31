import { useEffect, useState } from 'react';
import Genre from '../model/Genre.interface';
import { Button } from './Button';
import { api } from '../services/api';

interface SideBarProps {
  selectedGenreId: number;
  onChangedGenre: (id: number) => void;
}

export function SideBar({ selectedGenreId, onChangedGenre }: SideBarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>('genres').then((response: { data: Genre[] }) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onChangedGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
