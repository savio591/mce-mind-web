import Link from 'next/link';
import { parseISOStringToHeadingDateInfo } from '../../utils/parseDates';

import styles from './SectionHeader.module.scss';

export interface SectionHeaderProps {
  title: string;
  date?: string;
  refDate?: string;
  anchor?: {
    name: string;
    link: string;
  };
}

export function SectionHeader({
  title,
  date,
  refDate,
  anchor,
}: SectionHeaderProps): JSX.Element {
  const headingDate = parseISOStringToHeadingDateInfo(date, refDate);

  return (
    <div className={styles.container}>
      <div>
        <h1>{title}</h1>
        <h2>{headingDate}</h2>
      </div>
      {anchor && (
        <Link href={anchor.link}>
          <a>{anchor.name}</a>
        </Link>
      )}
    </div>
  );
}
