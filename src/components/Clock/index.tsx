import { useApiRequest , useTimeTransform } from 'hooks';
import { Nullable, WorldTimeApiItemModel } from 'types';
import { dateTimeFormat } from 'utils';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'clsx';
import { useRef } from 'react';
import { Loader } from 'components/';
import styles from './styles.module.scss';
import { links } from './clock.helper';

const TIME_API_URL = 'https://worldtimeapi.org/api/timezone/Europe';

export const Clock = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const apiUrl = pathname === '/' ? `${TIME_API_URL}/Moscow` : TIME_API_URL + pathname;

  const hHandRef = useRef<Nullable<HTMLDivElement>>(null);
  const mHandRef = useRef<Nullable<HTMLDivElement>>(null);
  const sHandRef = useRef<Nullable<HTMLDivElement>>(null);

  const response = useApiRequest(apiUrl, 1) as Nullable<WorldTimeApiItemModel>;
  const actualDateTime = response?.datetime && 
    new Date(response.datetime).toLocaleString('en-US', { timeZone: response.timezone });

  const { h, m, s } = dateTimeFormat(actualDateTime && new Date(actualDateTime));
  
  useTimeTransform({ hHandRef, sHandRef, mHandRef, h, m, s });

  const handleNavigateLinkClick = (link) => {
    navigate(`/${link}`);
    window.location.reload();
  };
  return (
    <div className={styles.clockContainer}>
      {
        h && m && s ? (
          <>
          <div className={styles.currentTime}>
                      {
                        `Current time in 
                        ${pathname.slice(1, pathname.length) ? pathname.slice(1, pathname.length) : 'Moscow'}
                        is - ${ h }:${ m }:${ s }`
                      }
                </div>
                <div className={styles.countrySelector}>
                  {
                    links.map(({ link }) => (
                      <button key={link} type='button' onClick={() => handleNavigateLinkClick(link)} className={styles.link}>
                        {link}
                      </button>
                    ))
                  }
                </div>
          </>
        ) : (
          <Loader/>
        )
      }
      
      <div className={styles.clockField}>
        <div className={cn(styles.hHand, styles.hand)} ref={hHandRef}/>
        <div className={cn(styles.mHand, styles.hand)} ref={mHandRef}/>
        <div className={cn(styles.sHand, styles.hand)} ref={sHandRef}/>
        <div className={styles.center}/>
      </div>
    </div>
  );
};
