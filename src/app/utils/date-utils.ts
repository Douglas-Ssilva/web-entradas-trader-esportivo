export class DateUtils {

  static formatDate(date?: Date) {
    if(date) {
      return date.toLocaleDateString('pt-BR')
    }
    return null
  }

  static formatDateTimezone(date: Date) {
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset);
  }

  static formatDateDiaMes(date : string) {
    let mes = date.substring(5,7);
    let dia = date.substring(8,10);
    return `${dia}-${mes}`
  }

}
