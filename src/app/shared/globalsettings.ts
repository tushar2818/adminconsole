export class GlobalSettings {
  public static BASE_API_ENDPOINT_CITY = 'http://localhost:31497/api/';
  
  public static getCity(): string {
    var existingCity = localStorage.getItem('CityId');
    if (existingCity != null) {
      return existingCity.toString();
    }
    else {
      return "";
    }
  }
 
  public static HeaderStringCity = {
    'Content-Type': 'application/json',
    'ApplicationId': GlobalSettings.getCity(),
    'ApplicationToken': "2"
  };
    
}
