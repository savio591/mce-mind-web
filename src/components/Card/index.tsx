/* eslint-disable @next/next/no-img-element */
import { FaRegClock } from 'react-icons/fa';
import styles from './Card.module.scss';

export interface CardProps {
  name: string;
  phone?: string;
  date?: Date;
  image?: string;
  size?: 'default' | 'small';
  isClicable?: boolean;
  onClick?: () => void;
}

export function Card({
  name,
  phone,
  date,
  image,
  size,
}: CardProps): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        {image && (
          <img
            src={image}
            alt={`Foto de ${name}`}
            width={size === 'small' ? 56 : 80}
            height={size === 'small' ? 56 : 80}
          />
        )}
        <div className={styles.column}>
          <span data-size={size ?? 'default'}>{name}</span>
          {phone && <p>{phone}</p>}
        </div>
      </div>
      {date && (
        <time>
          <FaRegClock size={24} />
          {new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(
            date
          )}
          h
        </time>
      )}
    </div>
  );
}
