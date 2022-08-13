import axios from 'axios';
import { useEffect, useState } from 'react';
import { delay } from 'utils';

export interface ITimeLeft{
  hours:number;
  minutes:number;
  seconds:number;
}


export const useApiRequest = (url: string, timeout?: number) => {
  const [data, setData] = useState();
  useEffect(() => {
    let timer;
    const getData = async () => {
      if (timeout) {
        timer = delay(timeout).then(() => axios.get(url).then((res) => {
          const response = res.data;
          if (!response) return;
          setData(response);
        }));
      } else {
        axios.get(url).then((res) => {
          const response = res.data;
          if (!response) return;
          setData(response);
        });
      }
    };
    getData();
    return () => clearInterval(timer);
  }, [data, timeout, url]);

  return data as unknown;
};
