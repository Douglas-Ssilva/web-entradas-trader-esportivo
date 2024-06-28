export class LocalStorageUtils {

  public static getIdUser() {
    return localStorage.getItem('userId') || '0'
  }

  public static getIdBanca() {
    return localStorage.getItem('bancaId')
  }

}
