export function isTokenExpired() {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const now = new Date().getTime();
  
    if (!token || !tokenExpiry) {
      return true;
    }
  
    return now > tokenExpiry;
  }