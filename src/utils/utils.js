
export const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (/Android/i.test(userAgent)) {
    return "Android";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    if (/iPad/i.test(userAgent)) {
      return "iPad";
    } else if (/iPod/i.test(userAgent)) {
      return "iPod";
    } else {
      return "iOS";
    }
  } else if (/webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return "Mobile";
  } else if (/tablet/i.test(userAgent)) {
    return "Tablet";
  } else {
    return "Web";
  }
};

export const fetchDeviceLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      return {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        city: data.city,
        region: data.region,
        country: data.country_name
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};