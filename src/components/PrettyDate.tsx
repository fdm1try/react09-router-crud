import React, {useState, useEffect} from 'react'

function formatNum(num: number, a = '', b = '', c = '') {
  let n = num % 100;
  if (n >= 10 && n <= 20) return c;
  n = n % 10;
  if (n > 4 || n === 0) return c;
  if (n > 1) return b;
  return a;
}



interface IPrettyDate {
  className: string;
  date: Date;
}

export const PrettyDate: React.FC<IPrettyDate> = (props) => {
  const [dateString, setDateString] = useState<string>('');

  function formatDate(date: Date): void {
    const now = new Date();
    const dif = now.getTime() - date.getTime();
    let result;
    if (dif < 60_000) {
      result = 'Менее минуты назад';
    } else if (dif < 3_600_000) {
      const minutes = Math.floor(dif / 60_000);
      result = `${minutes} минут${formatNum(minutes, 'у', 'ы')} назад`;
    } else if (dif < 86_400_000) {
      const hours = Math.floor(dif / 3_600_000);
      result = `${hours} час${formatNum(hours, '', 'а', 'ов')} назад`;
    } else {
      const days = Math.floor(dif / 86_400_000);
      result = `${days} ${formatNum(days, 'день', 'дня', 'дней')} назад`;
    }
    setDateString(result);
  }
  
  useEffect(() => formatDate(props.date), [props.date]);

  return (
    <span className={props.className}>{dateString}</span>
  )
}
