export function formatDate(timestamp) {
  if(!timestamp){
    return null;
  }

  const date = new Date(timestamp);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Kolkata', // GMT+5:30
    timeZoneName: 'short'
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function formatDateMin(timestamp) {
  if(!timestamp){
    return null;
  }

  const date = new Date(timestamp);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}